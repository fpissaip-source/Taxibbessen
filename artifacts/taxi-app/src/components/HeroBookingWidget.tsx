import { useState } from "react";
import { Button } from "@/components/ui";
import { Phone, Mail, CheckCircle2, AlertCircle, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateBooking } from "@/hooks/use-bookings";

export function HeroBookingWidget() {
  const createBooking = useCreateBooking();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [phone, setPhone]         = useState("");
  const [email, setEmail]         = useState("");
  const [message, setMessage]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState(false);

  const valid = firstName.trim().length >= 2 && lastName.trim().length >= 2 && phone.trim().length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setError(false);
    try {
      await createBooking.mutateAsync({
        data: {
          customerName:      firstName.trim(),
          customerLastName:  lastName.trim(),
          customerPhone:     phone.trim(),
          destination:       message.trim() || "–",
          pickupLocation:    email.trim()   || "–",
          scheduledTime:     null,
          estimatedDistance: null,
          estimatedDuration: null,
          foundVia:          null,
        } as Parameters<typeof createBooking.mutateAsync>[0]["data"],
      });
      setSubmitted(true);
    } catch {
      setError(true);
    }
  };

  const field =
    "w-full h-12 px-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all";
  const fieldIcon =
    "w-full h-12 pl-11 pr-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
        <div className="p-5 sm:p-6">

          <div className="mb-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white leading-snug">
              Stellen Sie jetzt Ihre Anfrage
            </h2>
            <p className="text-sm sm:text-base font-semibold text-primary/90 mt-1.5">
              zum günstigsten Festpreis.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-3 py-6 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-primary" />
                <p className="text-white font-semibold text-lg leading-snug">
                  Vielen Dank!
                </p>
                <p className="text-white/60 text-sm">
                  Wir melden uns so schnell wie möglich bei Ihnen.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-3"
              >
                {/* Vorname / Nachname */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-white/35 pointer-events-none" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Vorname"
                      autoComplete="given-name"
                      className={fieldIcon}
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-white/35 pointer-events-none" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Nachname"
                      autoComplete="family-name"
                      className={fieldIcon}
                    />
                  </div>
                </div>

                {/* Telefon / E-Mail */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-white/35 pointer-events-none" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Telefonnummer"
                      autoComplete="tel"
                      className={fieldIcon}
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-white/35 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-Mail (optional)"
                      autoComplete="email"
                      className={fieldIcon}
                    />
                  </div>
                </div>

                {/* Nachricht */}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Schreiben Sie eine kurze Nachricht und wir melden uns bei Ihnen!"
                  className={`${field} resize-none py-3.5 h-auto leading-relaxed`}
                />

                {error && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/15 border border-red-500/20 text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Fehler beim Senden – bitte rufen Sie uns direkt an.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={!valid || createBooking.isPending}
                  className="w-full text-base font-bold"
                  isLoading={createBooking.isPending}
                >
                  {createBooking.isPending ? "Wird gesendet…" : "Anfrage absenden"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
