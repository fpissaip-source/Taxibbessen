import { useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { Phone, Mail, User, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function Book() {
  usePageMeta({
    title: "Taxi buchen – Taxi B&B GmbH Essen | Online Anfrage",
    description: "Taxi in Essen einfach anfragen. Wir melden uns sofort. Taxi B&B GmbH – 0201 707060.",
  });

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim() || !form.firstName.trim() || !form.lastName.trim()) return;
    setState("loading");
    try {
      const res = await fetch(`${BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-primary transition-colors text-sm";

  if (state === "success") {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center px-4" style={{ background: "#0b0a08" }}>
          <div className="text-center max-w-sm">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-2xl font-display font-black text-white mb-3">Anfrage gesendet!</h1>
            <p className="text-white/60 text-sm leading-relaxed">
              Wir melden uns schnellstmöglich bei Ihnen.<br />
              Oder rufen Sie uns direkt an:
            </p>
            <a
              href="tel:+4920170706"
              className="mt-6 inline-flex items-center gap-2 bg-primary text-black font-bold px-6 py-3 rounded-xl text-sm hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              0201 707060
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12" style={{ background: "#0b0a08" }}>
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-display font-black text-white mb-1">Taxi anfragen</h1>
          <p className="text-white/50 text-sm mb-8">Wir melden uns sofort zurück.</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  className={`${inputCls} pl-10`}
                  placeholder="Vorname"
                  value={form.firstName}
                  onChange={update("firstName")}
                  required
                  autoComplete="given-name"
                />
              </div>
              <input
                className={inputCls}
                placeholder="Nachname"
                value={form.lastName}
                onChange={update("lastName")}
                required
                autoComplete="family-name"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input
                className={`${inputCls} pl-10`}
                placeholder="Telefonnummer *"
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                required
                autoComplete="tel"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input
                className={`${inputCls} pl-10`}
                placeholder="E-Mail (optional)"
                type="email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-white/30 pointer-events-none" />
              <textarea
                className={`${inputCls} pl-10 resize-none min-h-[110px]`}
                placeholder="Ihre Nachricht – z. B. Abholort, Ziel, Uhrzeit …"
                value={form.message}
                onChange={update("message")}
                rows={4}
              />
            </div>

            {state === "error" && (
              <p className="text-red-400 text-xs text-center">Etwas ist schiefgelaufen. Bitte rufen Sie uns an: 0201 707060</p>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full bg-primary text-black font-black py-3.5 rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {state === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Wird gesendet…</>
              ) : (
                "Anfrage senden"
              )}
            </button>

            <p className="text-center text-white/30 text-xs pt-1">
              Oder direkt:{" "}
              <a href="tel:+4920170706" className="text-primary underline-offset-2 hover:underline">0201 707060</a>
              {" · "}
              <a href="https://wa.me/491711111535" className="text-[#25D366] underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </p>
          </form>

          {/* SEO-Inhalt */}
          <div className="mt-14 border-t border-white/8 pt-12 space-y-8 text-sm text-white/55 leading-relaxed">
            <div>
              <h2 className="text-white/80 font-bold text-base mb-3">Was Sie in Ihrer Nachricht angeben sollten</h2>
              <ul className="space-y-1.5 list-disc list-inside marker:text-primary/60">
                <li>Abholort (Straße, Hausnummer, Ort)</li>
                <li>Zieladresse oder Zielort</li>
                <li>Gewünschte Uhrzeit oder Abfahrtszeit</li>
                <li>Anzahl der Fahrgäste</li>
                <li>Besondere Wünsche (z. B. Rollstuhl, Kindersitz, Gepäck)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white/80 font-bold text-base mb-3">Unsere Leistungen auf einen Blick</h2>
              <p className="mb-3">
                Taxi B&amp;B GmbH ist Ihr zuverlässiger Taxibetrieb in Essen – 24 Stunden täglich, 7 Tage die Woche, 365 Tage im Jahr.
                Wir bieten Fahrten zu <strong className="text-white/70">Festpreisen</strong> ohne versteckte Kosten und sind für alle Anlässe buchbar.
              </p>
              <ul className="space-y-1.5 list-disc list-inside marker:text-primary/60">
                <li><Link href="/flughafentransfer-essen-duesseldorf" className="text-white/70 hover:text-primary transition-colors font-bold">Flughafentransfer</Link> – Pünktlich zu den Flughäfen Düsseldorf, Köln/Bonn und Dortmund</li>
                <li><Link href="/krankenfahrten-essen" className="text-white/70 hover:text-primary transition-colors font-bold">Krankenfahrten</Link> – Mit Krankenkassen-Abrechnung, diskret und komfortabel</li>
                <li><Link href="/dialysefahrten-essen" className="text-white/70 hover:text-primary transition-colors font-bold">Dialysefahrten</Link> – Regelmäßige Transporte zu Dialysezentren in Essen und Umgebung</li>
                <li><Link href="/grossraumtaxi-essen" className="text-white/70 hover:text-primary transition-colors font-bold">Großraumtaxi</Link> – Bis zu 7 Personen, ideal für Gruppen, Familien und Firmenfahrten</li>
                <li><Link href="/kurierdienst-essen" className="text-white/70 hover:text-primary transition-colors font-bold">Kurierdienst</Link> – Eilige Dokumente und Pakete schnell und sicher zugestellt</li>
                <li><Link href="/taxi-essen-hbf" className="text-white/70 hover:text-primary transition-colors font-bold">Hauptbahnhof Essen</Link> · <Link href="/taxi-essen-holsterhausen" className="text-white/70 hover:text-primary transition-colors font-bold">Holsterhausen</Link> · <Link href="/taxi-essen-ruettenscheid" className="text-white/70 hover:text-primary transition-colors font-bold">Rüttenscheid</Link> · <Link href="/taxi-essen-frohnhausen" className="text-white/70 hover:text-primary transition-colors font-bold">Frohnhausen</Link> · <Link href="/taxi-essen-suedviertel" className="text-white/70 hover:text-primary transition-colors font-bold">Südviertel</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-white/80 font-bold text-base mb-3">Warum Taxi B&amp;B GmbH?</h2>
              <p>
                Seit <strong className="text-white/70">1992</strong> sind wir in Essen ansässig und kennen die Stadt wie unsere Westentasche.
                Als Familienbetrieb legen wir besonderen Wert auf persönlichen Service, Pünktlichkeit und Verlässlichkeit.
                Unsere Fahrer sind geschult, freundlich und kennen die schnellsten Routen durch Essen – auch zu Stoßzeiten.
                Festpreise gelten insbesondere für Flughafenfahrten, Krankenfahrten und Fernfahrten, sodass Sie keine bösen Überraschungen erleben.
              </p>
            </div>

            <div>
              <h2 className="text-white/80 font-bold text-base mb-3">Erreichbarkeit</h2>
              <p>
                Sie erreichen uns rund um die Uhr telefonisch unter{" "}
                <a href="tel:+4920170706" className="text-primary hover:underline">0201 707060</a>,
                per <a href="https://wa.me/491711111535" className="text-[#25D366] hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
                oder über dieses Formular. Wir melden uns schnellstmöglich zurück –
                in der Regel innerhalb weniger Minuten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
