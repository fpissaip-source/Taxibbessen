import { useLocation, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Card, Button, Badge } from "@/components/ui";
import { useGetBooking, getGetBookingQueryKey } from "@workspace/api-client-react";
import { CheckCircle2, MapPin, Calendar, ArrowRight, Loader2, Euro, Edit2, Timer, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/i18n/useLanguage";
import { calculateTaxiPrice } from "@/hooks/use-bookings";

export default function Confirmation() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam, 10) : null;

  const { data: booking, isLoading, isError } = useGetBooking(id as number, {
    query: { queryKey: getGetBookingQueryKey(id as number), enabled: !!id },
  });

  if (!id) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4 px-4">
          <h2 className="text-2xl font-bold text-center">{t("admin_no_bookings")}</h2>
          <Button onClick={() => setLocation("/book")}>{t("nav_book")}</Button>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (isError || !booking) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4 px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-destructive text-center">Buchung nicht gefunden</h2>
          <Button onClick={() => setLocation("/book")}>{t("conf_new_booking")}</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[80vh] bg-muted/30 py-10 sm:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-5 sm:mb-6 shadow-xl shadow-green-500/20">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3 sm:mb-4">{t("conf_title")}</h1>
            <p className="text-base sm:text-lg text-muted-foreground">{t("conf_sub")}</p>
          </div>

          {/* Booking Card */}
          <Card className="p-0 overflow-hidden border-2 border-primary/20">
            <div className="bg-primary/5 p-5 sm:p-6 border-b border-border flex justify-between items-center gap-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">{t("conf_booking_nr_label")}</p>
                <p className="text-xl sm:text-2xl font-mono font-bold">TBB-{booking.id.toString().padStart(6, "0")}</p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{t("conf_booking_id")} #{booking.id.toString().padStart(5, "0")}</p>
              </div>
              <Badge variant="warning" className="text-xs sm:text-sm px-3 py-1 uppercase tracking-wider shrink-0">
                {t("conf_status_new")}
              </Badge>
            </div>

            <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
              {/* Route */}
              <div className="relative">
                <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-border z-0"></div>
                <div className="space-y-5 sm:space-y-6 relative z-10">
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 w-6 h-6 rounded-full bg-secondary border-[4px] border-background shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-semibold mb-1">{t("conf_pickup")}</p>
                      <p className="text-base sm:text-lg font-medium">{booking.pickupLocation}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 w-6 h-6 rounded-none bg-primary border-[4px] border-background shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-semibold mb-1">{t("conf_dest")}</p>
                      <p className="text-base sm:text-lg font-medium">{booking.destination}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-border">
                <div className="bg-muted rounded-xl p-4 flex gap-3 items-center">
                  <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t("conf_time")}</p>
                    <p className="font-semibold text-sm">
                      {booking.scheduledTime
                        ? format(new Date(booking.scheduledTime), "dd.MM.yyyy HH:mm")
                        : t("conf_asap")}
                    </p>
                  </div>
                </div>
                {booking.estimatedDuration && (
                  <div className="bg-muted rounded-xl p-4 flex gap-3 items-center">
                    <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t("distance_label")}</p>
                      <p className="font-semibold text-sm">{booking.estimatedDistance} km · {booking.estimatedDuration} min</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              {(() => {
                const price = booking.estimatedDistance ? calculateTaxiPrice(booking.estimatedDistance) : null;
                if (!price) return null;
                return (
                  <div className="pt-4 sm:pt-6 border-t border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Euro className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-base sm:text-lg">{t("conf_price_title")}</h3>
                    </div>
                    <div className="bg-muted rounded-xl p-4 sm:p-5 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{t("conf_base_fee")}</span>
                        <span className="font-medium">{price.baseFee.toFixed(2).replace(".", ",")} €</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          {Number.isInteger(price.distanceKm) ? price.distanceKm : price.distanceKm.toFixed(1).replace(".", ",")} km × {price.perKmRate.toFixed(2).replace(".", ",")} €
                        </span>
                        <span className="font-medium">{price.distanceCost.toFixed(2).replace(".", ",")} €</span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-base">{t("conf_total_price")}</span>
                        <span className="font-bold text-lg text-primary">{price.totalPrice.toFixed(2).replace(".", ",")} €</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 ml-1">{t("conf_price_note")}</p>
                  </div>
                );
              })()}

              {/* Status hint — klickbarer Link */}
              <div className="pt-4 sm:pt-6 border-t border-border">
                <Link
                  href={`/fahrtstatus?booking_nr=${encodeURIComponent(`TBB-${booking.id.toString().padStart(6, "0")}`)}`}
                  className="group block bg-primary/8 border border-primary/20 hover:border-primary/50 hover:bg-primary/12 rounded-xl p-4 transition-all cursor-pointer"
                >
                  <div className="flex gap-3 items-start">
                    <span className="text-2xl shrink-0">🔍</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                        {t("conf_status_hint")}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-primary/50 group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
                  </div>
                </Link>
              </div>

              {/* 5-Minuten Bearbeitungs-Hinweis — klickbarer Link */}
              <div className="pt-4 sm:pt-6 border-t border-border">
                <Link
                  href="/?edit=1"
                  className="group block rounded-xl overflow-hidden border border-primary/15 hover:border-primary/40 transition-all cursor-pointer"
                >
                  <div className="bg-primary/10 group-hover:bg-primary/15 px-4 py-3 flex items-center gap-2 transition-colors">
                    <Edit2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-bold text-primary flex-1">Buchung nachträglich ändern</span>
                    <ExternalLink className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="px-4 py-3 flex gap-3 items-start">
                    <Timer className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                      Sie haben <strong className="text-foreground">5 Minuten</strong> nach der Buchung Zeit, Ihre Details zu ändern — Abholort, Ziel, Name, Telefonnummer oder Abholzeit. Öffnen Sie dazu das Menü (☰) und wählen Sie <strong className="text-foreground">„Buchung ändern"</strong>.
                    </p>
                  </div>
                </Link>
              </div>

              {/* Next steps */}
              <div className="pt-4 sm:pt-6 border-t border-border">
                <h3 className="font-bold text-base sm:text-lg mb-4">{t("conf_what_next")}</h3>
                <ol className="space-y-3">
                  {[t("conf_step1"), t("conf_step2"), t("conf_step3")].map((step, i) => (
                    <li key={i} className="flex gap-3 items-start text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button onClick={() => setLocation("/book")} className="w-full sm:w-auto">
              {t("conf_new_booking")}
            </Button>
            <Button variant="outline" onClick={() => setLocation("/fahrtstatus")} className="gap-2 w-full sm:w-auto">
              {t("nav_status")} <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => setLocation("/")} className="gap-2 w-full sm:w-auto">
              {t("conf_home")} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
