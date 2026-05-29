import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";
import { useCreateBooking, fetchDistanceEstimate, calculateTaxiPrice } from "@/hooks/use-bookings";
import { MapPin, Navigation, Phone, Loader2, Euro, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/useLanguage";
import { AddressField } from "@/components/AddressField";

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=de`
    );
    const data = await res.json();
    if (data?.address) {
      const { road, house_number, postcode, city, town, village, suburb } = data.address;
      const street = [road, house_number].filter(Boolean).join(" ");
      const place = city || town || village || "";
      const sub = suburb ? `${suburb}, ` : "";
      const parts = [street, `${sub}${[postcode, place].filter(Boolean).join(" ")}`].filter(Boolean);
      return parts.join(", ") || data.display_name;
    }
  } catch {}
  return `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
}

export function HeroBookingWidget() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const createBooking = useCreateBooking();
  const [step, setStep] = useState<1 | 2>(1);
  const [locating, setLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState(false);
  const [foundVia, setFoundVia] = useState("");
  const autoExpandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const widgetSchema = z.object({
    destination: z.string().min(3, t("val_dest")),
    pickupLocation: z.string().min(3, t("val_pickup")),
    firstName: z.string().min(2, t("val_firstname")),
    lastName: z.string().min(2, t("val_lastname")),
    phone: z.string().min(6, t("val_phone")),
  });

  type WidgetForm = z.infer<typeof widgetSchema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<WidgetForm>({
    resolver: zodResolver(widgetSchema),
    defaultValues: { destination: "", pickupLocation: "", firstName: "", lastName: "", phone: "" },
    mode: "onChange",
  });

  const destination = watch("destination");
  const pickup = watch("pickupLocation");

  const [estimate, setEstimate] = useState<{ distance: number | null; duration: number | null }>({
    distance: null,
    duration: null,
  });

  useEffect(() => {
    let aborted = false;
    const timer = setTimeout(async () => {
      const result = await fetchDistanceEstimate(pickup, destination);
      if (!aborted) setEstimate(result);
    }, 400);
    return () => { aborted = true; clearTimeout(timer); };
  }, [pickup, destination]);

  useEffect(() => {
    if (step === 1 && destination.length >= 3) {
      if (autoExpandTimerRef.current) clearTimeout(autoExpandTimerRef.current);
      autoExpandTimerRef.current = setTimeout(async () => {
        const valid = await trigger("destination");
        if (valid) setStep(2);
      }, 700);
    }
    return () => {
      if (autoExpandTimerRef.current) clearTimeout(autoExpandTimerRef.current);
    };
  }, [destination, step, trigger]);

  const priceBreakdown = estimate.distance ? calculateTaxiPrice(estimate.distance) : null;

  const handleGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }
    setLocating(true);
    setLocationStatus("idle");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const address = await reverseGeocode(latitude, longitude);
        setValue("pickupLocation", address, { shouldValidate: true });
        setLocating(false);
        setLocationStatus("success");
        setTimeout(() => setLocationStatus("idle"), 3000);
      },
      () => {
        setLocating(false);
        setLocationStatus("error");
        setTimeout(() => setLocationStatus("idle"), 3000);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [setValue]);

  const onSubmit = async (data: WidgetForm) => {
    setSubmitError(false);
    try {
      const response = await createBooking.mutateAsync({
        data: {
          pickupLocation: data.pickupLocation,
          destination: data.destination,
          customerName: data.firstName,
          customerLastName: data.lastName,
          customerPhone: data.phone,
          scheduledTime: null,
          estimatedDistance: estimate.distance,
          estimatedDuration: estimate.duration,
          foundVia: foundVia || null,
        } as Parameters<typeof createBooking.mutateAsync>[0]["data"],
      });
      setLocation(`/confirmation?id=${response.id}`);
    } catch (error) {
      console.error("Booking failed:", error);
      setSubmitError(true);
    }
  };

  const inputCls =
    "w-full h-12 pl-11 pr-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/65 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white leading-snug">
              {t("widget_title")}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-primary/90 mt-1.5">zum günstigsten Festpreis.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <AddressField
                value={destination}
                onChange={(val) => setValue("destination", val, { shouldValidate: true })}
                placeholder={t("widget_dest_placeholder")}
                icon={<MapPin className="h-5 w-5 text-primary" />}
                inputClassName={inputCls}
                houseNumberInputClassName="w-full h-10 pl-9 pr-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/65 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all"
              />
            </div>
            {errors.destination && step === 1 && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.destination.message}</p>
            )}

            {step === 1 && (
              <div className="mt-2.5">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleGeolocation}
                    disabled={locating}
                    className="flex items-center gap-2 text-xs text-white/40 hover:text-primary transition-colors ml-1 disabled:opacity-50"
                  >
                    {locating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Navigation className="w-3.5 h-3.5" />
                    )}
                    {t("widget_location_btn")}
                  </button>
                  <a
                    href="https://wa.me/491711111535"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 shrink-0 bg-[#25D366]/15 hover:bg-[#25D366]/25 active:bg-[#25D366]/35 text-[#25D366] border border-[#25D366]/30 px-3 py-1.5 rounded-2xl transition-colors backdrop-blur-sm font-bold"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-wide leading-none">WhatsApp</span>
                  </a>
                </div>
                {locationStatus === "success" && (
                  <p className="text-green-400 text-xs mt-1 ml-1">{t("widget_location_detected")}</p>
                )}
                {locationStatus === "error" && (
                  <p className="text-red-400 text-xs mt-1 ml-1">{t("widget_location_error")}</p>
                )}
              </div>
            )}

            <AnimatePresence>
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-3">
                    <div>
                      <AddressField
                        value={pickup}
                        onChange={(val) => setValue("pickupLocation", val, { shouldValidate: true })}
                        placeholder={t("widget_pickup_placeholder")}
                        icon={<Navigation className="h-5 w-5 text-white/50" />}
                        inputClassName={inputCls}
                        houseNumberInputClassName="w-full h-10 pl-9 pr-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/65 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleGeolocation}
                        disabled={locating}
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-primary/80 hover:text-primary transition-colors ml-1 disabled:opacity-50"
                      >
                        {locating ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Navigation className="w-3 h-3" />
                        )}
                        {t("widget_location_btn")}
                      </button>
                      {locationStatus === "success" && (
                        <p className="text-green-400 text-xs mt-0.5 ml-1">{t("widget_location_detected")}</p>
                      )}
                      {locationStatus === "error" && (
                        <p className="text-red-400 text-xs mt-0.5 ml-1">{t("widget_location_error")}</p>
                      )}
                      {errors.pickupLocation && (
                        <p className="text-red-400 text-xs mt-1 ml-1">{errors.pickupLocation.message}</p>
                      )}
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-white/40 font-medium mb-1 block ml-1">
                          {t("widget_firstname")}
                        </label>
                        <input
                          {...register("firstName")}
                          placeholder={t("widget_firstname_placeholder")}
                          className="w-full h-11 px-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/65 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all"
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-xs mt-0.5 ml-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-white/40 font-medium mb-1 block ml-1">
                          {t("widget_lastname")}
                        </label>
                        <input
                          {...register("lastName")}
                          placeholder={t("widget_lastname_placeholder")}
                          className="w-full h-11 px-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/65 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all"
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-xs mt-0.5 ml-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-white/40 font-medium mb-1 block ml-1">
                        {t("widget_phone")}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 h-4 w-4 text-white/40" />
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder={t("widget_phone_placeholder")}
                          className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/65 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-0.5 ml-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <AnimatePresence>
                      {priceBreakdown && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-primary/15 border border-primary/20"
                        >
                          <div className="flex items-center gap-2">
                            <Euro className="w-4 h-4 text-primary" />
                            <span className="text-xs text-white/60">{t("widget_price_label")}</span>
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {t("widget_price_approx")} {priceBreakdown.totalPrice.toFixed(2).replace(".", ",")} €
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-white/40 font-medium mb-1 block ml-1">
                        Wie haben Sie uns gefunden? <span className="normal-case tracking-normal opacity-60">(optional)</span>
                      </label>
                      <select
                        value={foundVia}
                        onChange={(e) => setFoundVia(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
                      >
                        <option value="" className="bg-neutral-900">– Bitte wählen –</option>
                        <option value="google" className="bg-neutral-900">Google-Suche</option>
                        <option value="ki" className="bg-neutral-900">ChatGPT / KI-Assistent</option>
                        <option value="empfehlung" className="bg-neutral-900">Persönliche Empfehlung</option>
                        <option value="whatsapp" className="bg-neutral-900">WhatsApp</option>
                        <option value="stammkunde" className="bg-neutral-900">Ich bin Stammkunde</option>
                        <option value="sonstiges" className="bg-neutral-900">Sonstiges</option>
                      </select>
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/15 border border-red-500/20 text-red-400 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{t("widget_error")}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-base font-bold mt-1"
                      isLoading={createBooking.isPending}
                    >
                      {createBooking.isPending ? t("widget_submitting") : t("widget_submit")}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
