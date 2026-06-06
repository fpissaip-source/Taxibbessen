import { useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { getPageMeta } from "@/page-meta-manifest";
import { Layout } from "@/components/Layout";
import { Link, useSearch } from "wouter";
import { Phone, Mail, User, MessageSquare, CheckCircle2, Loader2, Info, Car } from "lucide-react";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const { title: _bookTitle, description: _bookDesc } = getPageMeta('/book');

export default function Book() {
  usePageMeta({ title: _bookTitle, description: _bookDesc });

  const search = useSearch();
  const preMsg = new URLSearchParams(search).get("msg") ?? "";

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: preMsg });
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

  const inputCls = "w-full bg-white/8 border border-white/25 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors text-sm";

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
          <h1 className="text-3xl font-display font-black text-white mb-1">Taxi in Essen buchen</h1>
          <p className="text-white/70 text-base font-semibold mb-1">online oder per Telefon</p>
          <p className="text-white/50 text-sm mb-8">Wir melden uns sofort zurück.</p>

          {/* Ergänzende Links */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <Link
              href="/ueber-uns"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-primary font-bold transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              Mehr über uns
            </Link>
            <span className="text-white/20 text-xs">·</span>
            <Link
              href="/fahrzeuge"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-primary font-bold transition-colors"
            >
              <Car className="w-3.5 h-3.5" />
              Unsere Fahrzeuge
            </Link>
          </div>

          {/* Zwei Buchungswege */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 space-y-1.5">
              <p className="text-primary font-black text-xs uppercase tracking-widest">Sofortbuchung</p>
              <p className="text-white font-bold text-sm">Telefon &amp; WhatsApp</p>
              <p className="text-white/50 text-xs leading-snug">Direktkontakt – Fahrt in wenigen Minuten</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
              <p className="text-white/60 font-black text-xs uppercase tracking-widest">Vorbestellung</p>
              <p className="text-white font-bold text-sm">Online-Formular</p>
              <p className="text-white/50 text-xs leading-snug">Termin vorplanen – Bestätigung per E-Mail</p>
            </div>
          </div>

          {/* 3-Schritt-Ablauf */}
          <div className="flex items-start gap-3 mb-8">
            {[
              { n: "1", label: "Anfrage", sub: "Anrufen, WhatsApp oder Formular" },
              { n: "2", label: "Bestätigung", sub: "Wir bestätigen sofort" },
              { n: "3", label: "Abholung", sub: "Fahrer steht pünktlich bereit" },
            ].map((step, i, arr) => (
              <div key={step.n} className="flex items-start gap-2 flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-primary text-black font-black text-xs flex items-center justify-center flex-shrink-0">{step.n}</div>
                  {i < arr.length - 1 && <div className="w-px flex-1 bg-white/10 mt-1 h-6" />}
                </div>
                <div className="pt-0.5">
                  <p className="text-white font-bold text-xs">{step.label}</p>
                  <p className="text-white/40 text-[10px] leading-snug">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>

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

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href="tel:0201707060"
                className="flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-primary text-black font-black text-sm tracking-wide transition-all duration-300 shadow-[0_4px_24px_rgba(255,193,7,0.45)] hover:shadow-[0_4px_32px_rgba(255,193,7,0.7)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Anrufen</span>
              </a>
              <a
                href="https://wa.me/491711111535"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-[#25D366] text-white font-black text-sm tracking-wide transition-all duration-300 shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_32px_rgba(37,211,102,0.65)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <WaIcon />
                <span>WhatsApp</span>
              </a>
            </div>
          </form>

          {/* Vertrauenssignale */}
          <div className="mt-6 bg-white/[0.03] border border-white/8 rounded-2xl px-5 py-4">
            <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-3">Warum Taxi B&amp;B?</p>
            <ul className="space-y-2">
              {[
                "Über 30 Jahre Erfahrung in Essen – seit 1992",
                "24/7 erreichbar – auch nachts, sonn- und feiertags",
                "Festpreis-Garantie – kein Taxameter-Risiko bei Stau",
                "Mercedes-Flotte – klimatisiert, gepflegt, komfortabel",
                "Direkte Kassenabrechnung für Krankenfahrten",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-white/55">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-px" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

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
