import { useState, useEffect } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/Layout";
import { Button, Input, Label, Card } from "@/components/ui";
import { useCreateBooking, fetchDistanceEstimate } from "@/hooks/use-bookings";
import { MapPin, Calendar, Clock, User, Phone, CheckCircle2, Users, MessageSquare, RotateCcw, PhoneCall, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/useLanguage";
import { AddressField } from "@/components/AddressField";

type LaterPickupOption = "none" | "same" | "different" | "callback";

export default function Book() {
  usePageMeta({
    title: "Taxi buchen – Taxi B&B GmbH Essen | Online Buchung",
    description: "Taxi in Essen einfach online buchen. Festpreis, sofortige Bestätigung, 24/7 verfügbar. Taxi B&B GmbH – 0201 707060.",
  });
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const createBooking = useCreateBooking();

  const bookingSchema = z.object({
    pickupLocation: z.string().min(3, t("val_pickup")),
    destination: z.string().min(3, t("val_dest")),
    isScheduled: z.boolean(),
    scheduledDate: z.string().optional(),
    scheduledTime: z.string().optional(),
    customerName: z.string().min(2, t("val_name")),
    customerLastName: z.string().min(2, t("val_lastname")),
    customerPhone: z.string().min(6, t("val_phone")),
    passengerCount: z.number().min(1).max(7),
    notes: z.string().optional(),
    laterPickup: z.enum(["none", "same", "different", "callback"]),
    returnDate: z.string().optional(),
    returnTime: z.string().optional(),
    returnType: z.enum(["dest", "pickup"]).default("dest"),
    returnPickupLocation: z.string().optional(),
    returnDestination: z.string().optional(),
    callbackDate: z.string().optional(),
    callbackTime: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (data.isScheduled) {
      if (!data.scheduledDate) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("val_date"), path: ["scheduledDate"] });
      if (!data.scheduledTime) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("val_time"), path: ["scheduledTime"] });
    }
    if (data.laterPickup === "same" || data.laterPickup === "different") {
      if (!data.returnDate) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("val_return_date"), path: ["returnDate"] });
      if (!data.returnTime) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("val_return_time"), path: ["returnTime"] });
    }
    if (data.laterPickup === "different") {
      if (data.returnType === "pickup" && (!data.returnPickupLocation || data.returnPickupLocation.length < 3)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("val_return_pickup"), path: ["returnPickupLocation"] });
      if (!data.returnDestination || data.returnDestination.length < 3) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("val_return_dest"), path: ["returnDestination"] });
    }
    if (data.laterPickup === "callback") {
      if (!data.callbackDate) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("val_callback_date"), path: ["callbackDate"] });
      if (!data.callbackTime) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("val_callback_time"), path: ["callbackTime"] });
    }
  });

  type BookingFormValues = z.infer<typeof bookingSchema>;

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      isScheduled: false,
      passengerCount: 1,
      laterPickup: "none",
      returnType: "dest",
      notes: "",
    },
    mode: "onChange",
  });

  const isScheduled = watch("isScheduled");
  const pickup = watch("pickupLocation");
  const destination = watch("destination");
  const passengerCount = watch("passengerCount");
  const laterPickup = watch("laterPickup") as LaterPickupOption;
  const returnType = watch("returnType");

  const [estimate, setEstimate] = useState<{ distance: number | null; duration: number | null }>({ distance: null, duration: null });

  useEffect(() => {
    let aborted = false;
    const timer = setTimeout(async () => {
      const result = await fetchDistanceEstimate(pickup, destination);
      if (!aborted) setEstimate(result);
    }, 500);
    return () => { aborted = true; clearTimeout(timer); };
  }, [pickup, destination]);

  useEffect(() => {
    if (laterPickup === "different" && returnType === "dest" && destination) {
      setValue("returnPickupLocation", destination, { shouldValidate: true });
    }
  }, [destination, laterPickup, returnType, setValue]);

  const onSubmit = async (data: BookingFormValues) => {
    try {
      let combinedScheduledTime = null;
      if (data.isScheduled && data.scheduledDate && data.scheduledTime) {
        combinedScheduledTime = new Date(`${data.scheduledDate}T${data.scheduledTime}`).toISOString();
      }

      let returnPickupTime = null;
      if ((data.laterPickup === "same" || data.laterPickup === "different") && data.returnDate && data.returnTime) {
        returnPickupTime = new Date(`${data.returnDate}T${data.returnTime}`).toISOString();
      }

      let callbackTime = null;
      if (data.laterPickup === "callback" && data.callbackDate && data.callbackTime) {
        callbackTime = new Date(`${data.callbackDate}T${data.callbackTime}`).toISOString();
      }

      const response = await createBooking.mutateAsync({
        data: {
          pickupLocation: data.pickupLocation,
          destination: data.destination,
          customerName: data.customerName,
          customerLastName: data.customerLastName,
          customerPhone: data.customerPhone,
          scheduledTime: combinedScheduledTime,
          estimatedDistance: estimate.distance,
          estimatedDuration: estimate.duration,
          passengerCount: data.passengerCount,
          notes: data.notes || null,
          laterPickup: data.laterPickup,
          returnPickupTime,
          returnPickupLocation: data.laterPickup === "different" ? data.returnPickupLocation || null : null,
          returnDestination: data.laterPickup === "different" ? data.returnDestination || null : null,
          callbackTime,
        },
      });
      setLocation(`/confirmation?id=${response.id}`);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };


  return (
    <Layout>
      <div className="min-h-[80vh] bg-muted/30 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-8">

          <Card className="flex-1 p-5 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1 sm:mb-2">{t("book_title")}</h1>
            <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">{t("book_sub")}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
              <div className="space-y-4 relative">
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border z-0 hidden sm:block"></div>

                <div className="relative z-10 flex gap-3 sm:gap-4 items-start">
                  <div className="mt-3 w-4 h-4 rounded-full bg-secondary border-[4px] border-background shadow-sm hidden sm:block shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="pickupLocation">{t("pickup_label")}</Label>
                    <AddressField
                      value={pickup ?? ""}
                      onChange={(val) => setValue("pickupLocation", val, { shouldValidate: true })}
                      placeholder={t("pickup_placeholder")}
                      icon={<MapPin className="h-5 w-5 text-muted-foreground" />}
                      inputClassName="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="pickupLocation"
                      name="pickupLocation"
                    />
                    {errors.pickupLocation && <p className="text-destructive text-sm mt-1">{errors.pickupLocation.message}</p>}
                  </div>
                </div>

                <div className="relative z-10 flex gap-3 sm:gap-4 items-start">
                  <div className="mt-3 w-4 h-4 rounded-none bg-primary border-[4px] border-background shadow-sm hidden sm:block shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="destination">{t("dest_label")}</Label>
                    <AddressField
                      value={destination ?? ""}
                      onChange={(val) => setValue("destination", val, { shouldValidate: true })}
                      placeholder={t("dest_placeholder")}
                      icon={<MapPin className="h-5 w-5 text-primary" />}
                      inputClassName="flex h-10 w-full rounded-md border border-primary/20 bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="destination"
                      name="destination"
                    />
                    {errors.destination && <p className="text-destructive text-sm mt-1">{errors.destination.message}</p>}
                  </div>
                </div>
              </div>

              <div className="h-px bg-border"></div>

              <div className="space-y-3 sm:space-y-4">
                <Label>{t("when_label")}</Label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setValue("isScheduled", false)}
                    className={`p-3 sm:p-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all text-sm sm:text-base ${
                      !isScheduled ? "border-primary bg-primary/5 text-foreground" : "border-border bg-transparent text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" /> {t("ride_now")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue("isScheduled", true)}
                    className={`p-3 sm:p-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all text-sm sm:text-base ${
                      isScheduled ? "border-primary bg-primary/5 text-foreground" : "border-border bg-transparent text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" /> {t("schedule")}
                  </button>
                </div>

                <AnimatePresence>
                  {isScheduled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-3 sm:gap-4 pt-2 overflow-hidden"
                    >
                      <div className="space-y-2">
                        <Label>{t("date_label")}</Label>
                        <Input type="date" {...register("scheduledDate")} min={new Date().toISOString().split("T")[0]} />
                        {errors.scheduledDate && <p className="text-destructive text-sm">{errors.scheduledDate.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>{t("time_label")}</Label>
                        <Input type="time" {...register("scheduledTime")} />
                        {errors.scheduledTime && <p className="text-destructive text-sm">{errors.scheduledTime.message}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-px bg-border"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName">{t("name_label")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input id="customerName" placeholder={t("name_placeholder")} className="pl-10" {...register("customerName")} />
                  </div>
                  {errors.customerName && <p className="text-destructive text-sm">{errors.customerName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerLastName">{t("last_name_label")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input id="customerLastName" placeholder={t("last_name_placeholder")} className="pl-10" {...register("customerLastName")} />
                  </div>
                  {errors.customerLastName && <p className="text-destructive text-sm">{errors.customerLastName.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">{t("phone_label")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input id="customerPhone" type="tel" placeholder={t("phone_placeholder")} className="pl-10" {...register("customerPhone")} />
                  </div>
                  {errors.customerPhone && <p className="text-destructive text-sm">{errors.customerPhone.message}</p>}
                </div>
              </div>

              <div className="h-px bg-border"></div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  {t("passengers_label")}
                </Label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const next = Math.max(1, (passengerCount || 1) - 1);
                      setValue("passengerCount", next, { shouldValidate: true });
                    }}
                    className="w-10 h-10 rounded-xl border-2 border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all disabled:opacity-40"
                    disabled={passengerCount <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-14 text-center">
                    <span className="text-2xl font-display font-bold">{passengerCount || 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = Math.min(7, (passengerCount || 1) + 1);
                      setValue("passengerCount", next, { shouldValidate: true });
                    }}
                    className="w-10 h-10 rounded-xl border-2 border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all disabled:opacity-40"
                    disabled={passengerCount >= 7}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-muted-foreground ml-1">max. 7</span>
                </div>
              </div>

              <div className="h-px bg-border"></div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-muted-foreground" />
                  {t("later_pickup_label")}
                </Label>
                <div className="flex gap-2">
                  {(["none", "same"] as const).map((val) => {
                    const isActive = val === "none" ? laterPickup === "none" : laterPickup !== "none";
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setValue("laterPickup", val, { shouldValidate: true })}
                        className={`flex-1 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all ${
                          isActive
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border bg-transparent text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {val === "none" ? t("later_pickup_none") : t("later_pickup_yes")}
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {laterPickup !== "none" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <select
                        value={laterPickup}
                        onChange={(e) => setValue("laterPickup", e.target.value as LaterPickupOption, { shouldValidate: true })}
                        className="w-full h-10 rounded-xl border-2 border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="same">{t("later_pickup_yes")}</option>
                        <option value="different">{t("later_pickup_yes_other")}</option>
                        <option value="callback">{t("later_pickup_maybe")}</option>
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {(laterPickup === "same" || laterPickup === "different") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-3 overflow-hidden"
                    >
                      {laterPickup === "different" && (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">{t("return_type_label")}</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setValue("returnType", "dest", { shouldValidate: true });
                                  if (destination) setValue("returnPickupLocation", destination, { shouldValidate: true });
                                }}
                                className={`p-3 rounded-xl border-2 flex items-center gap-2 font-semibold transition-all text-xs sm:text-sm text-left ${
                                  returnType === "dest"
                                    ? "border-primary bg-primary/5 text-foreground"
                                    : "border-border bg-transparent text-muted-foreground hover:border-primary/50"
                                }`}
                              >
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span className="leading-tight">{t("return_type_dest")}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setValue("returnType", "pickup", { shouldValidate: true })}
                                className={`p-3 rounded-xl border-2 flex items-center gap-2 font-semibold transition-all text-xs sm:text-sm text-left ${
                                  returnType === "pickup"
                                    ? "border-primary bg-primary/5 text-foreground"
                                    : "border-border bg-transparent text-muted-foreground hover:border-primary/50"
                                }`}
                              >
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span className="leading-tight">{t("return_type_pickup")}</span>
                              </button>
                            </div>
                          </div>

                          {returnType === "dest" && (
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label className="text-sm">{t("return_auto_pickup")}</Label>
                                <div className="flex h-10 w-full rounded-md border border-input bg-muted/40 pl-10 pr-3 py-2 text-sm text-muted-foreground relative items-center">
                                  <MapPin className="h-5 w-5 text-muted-foreground absolute left-3" />
                                  <span className="truncate">{watch("returnPickupLocation") || destination || "—"}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>{t("return_dest_label")}</Label>
                                <AddressField
                                  value={watch("returnDestination") ?? ""}
                                  onChange={(val) => setValue("returnDestination", val, { shouldValidate: true })}
                                  placeholder={t("dest_placeholder")}
                                  icon={<MapPin className="h-5 w-5 text-primary" />}
                                  inputClassName="flex h-10 w-full rounded-md border border-primary/20 bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                                  name="returnDestination"
                                />
                                {errors.returnDestination && <p className="text-destructive text-sm">{errors.returnDestination.message}</p>}
                              </div>
                            </div>
                          )}

                          {returnType === "pickup" && (
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label>{t("return_pickup_label")}</Label>
                                <AddressField
                                  value={watch("returnPickupLocation") ?? ""}
                                  onChange={(val) => setValue("returnPickupLocation", val, { shouldValidate: true })}
                                  placeholder={t("pickup_placeholder")}
                                  icon={<MapPin className="h-5 w-5 text-muted-foreground" />}
                                  inputClassName="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  name="returnPickupLocation"
                                />
                                {errors.returnPickupLocation && <p className="text-destructive text-sm">{errors.returnPickupLocation.message}</p>}
                              </div>
                              <div className="space-y-2">
                                <Label>{t("return_dest_label")}</Label>
                                <AddressField
                                  value={watch("returnDestination") ?? ""}
                                  onChange={(val) => setValue("returnDestination", val, { shouldValidate: true })}
                                  placeholder={t("dest_placeholder")}
                                  icon={<MapPin className="h-5 w-5 text-primary" />}
                                  inputClassName="flex h-10 w-full rounded-md border border-primary/20 bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                                  name="returnDestination"
                                />
                                {errors.returnDestination && <p className="text-destructive text-sm">{errors.returnDestination.message}</p>}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label>{t("return_date_label")}</Label>
                          <Input type="date" {...register("returnDate")} min={new Date().toISOString().split("T")[0]} />
                          {errors.returnDate && <p className="text-destructive text-sm">{errors.returnDate.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>{t("return_time_label")}</Label>
                          <Input type="time" {...register("returnTime")} />
                          {errors.returnTime && <p className="text-destructive text-sm">{errors.returnTime.message}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {laterPickup === "callback" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 overflow-hidden"
                    >
                      <div className="space-y-2">
                        <Label>{t("callback_date_label")}</Label>
                        <Input type="date" {...register("callbackDate")} min={new Date().toISOString().split("T")[0]} />
                        {errors.callbackDate && <p className="text-destructive text-sm">{errors.callbackDate.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>{t("callback_time_label")}</Label>
                        <Input type="time" {...register("callbackTime")} />
                        {errors.callbackTime && <p className="text-destructive text-sm">{errors.callbackTime.message}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-px bg-border"></div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  {t("notes_label")}
                </Label>
                <textarea
                  {...register("notes")}
                  placeholder={t("notes_placeholder")}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>

              <div className="lg:hidden">
                <div className="bg-secondary text-secondary-foreground rounded-2xl p-5">
                  <h3 className="font-display font-bold text-lg mb-3 text-white">{t("estimate_title")}</h3>
                  {estimate.distance ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="text-secondary-foreground/70 text-sm">{t("distance_label")}</span>
                        <span className="font-bold text-white">~{estimate.distance} km</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-foreground/70 text-sm">{t("duration_label")}</span>
                        <span className="font-bold text-white">~{estimate.duration} min</span>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-secondary-foreground/50 text-sm">{t("estimate_placeholder")}</p>
                  )}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full text-base sm:text-lg mt-4 sm:mt-8" isLoading={createBooking.isPending}>
                {createBooking.isPending ? t("submitting") : (isScheduled ? t("submit_schedule") : t("submit_now"))}
              </Button>
            </form>
          </Card>

          <div className="hidden lg:flex w-80 flex-col gap-6">
            <Card className="p-6 bg-secondary text-secondary-foreground">
              <h3 className="font-display font-bold text-xl mb-4 text-white">{t("estimate_title")}</h3>
              {estimate.distance ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-secondary-foreground/70">{t("distance_label")}</span>
                    <span className="font-bold text-lg text-white">~{estimate.distance} km</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-secondary-foreground/70">{t("duration_label")}</span>
                    <span className="font-bold text-lg text-white">~{estimate.duration} min</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-primary/80 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> {t("price_guaranteed")}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-white/10 rounded-xl">
                  <p className="text-secondary-foreground/50 text-sm">{t("estimate_placeholder")}</p>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-2">{t("need_help")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("help_desc")}</p>
              <a href="tel:0201707060" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-muted font-bold hover:bg-border transition-colors text-sm">
                <Phone className="w-4 h-4" /> {t("call_dispatch")}
              </a>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
