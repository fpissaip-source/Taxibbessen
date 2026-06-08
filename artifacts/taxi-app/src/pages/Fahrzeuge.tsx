import { useState, useCallback, useEffect, useRef } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { getPageMeta } from "@/page-meta-manifest";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import {
  ArrowLeft, ChevronLeft, ChevronRight,
  Wind, ShieldCheck, Wrench, Star, Users, Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const glassCard = "backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]";

const qualityItems = [
  { icon: Wind, title: "Frische-Garantie", desc: "Regelmäßige Belüftung und professionelle Desinfektion nach jeder Schicht." },
  { icon: ShieldCheck, title: "Wartungs-Exzellenz", desc: "Strikte Einhaltung aller Service-Intervalle durch zertifizierte Fachbetriebe." },
  { icon: Wrench, title: "Pannensicherheit", desc: "Modernste Sensorik und regelmäßige Technik-Checks für maximale Zuverlässigkeit." },
];

const CARS = [
  {
    image: "car-kombi2.webp",
    category: "CLASSIC",
    tag: "Mercedes E-Klasse T-Modell",
    title: "Kombi",
    desc: "Eleganz trifft Raum. Für komfortable Alltagsfahrten und Gepäcktransporte.",
    specs: ["Großer Kofferraum", "Klimaanlage", "Executive-Sitze", "USB-Ladung"],
    icon: Star,
    objectPosition: "center 45%",
    bookLabel: "Kombi anfragen",
    bookMsg: "Ich möchte den Kombi (Mercedes E-Klasse) anfragen.",
  },
  {
    image: "car-grossraum2.webp",
    category: "VAN",
    tag: "Mercedes V-Klasse",
    title: "Großraumtaxi",
    desc: "Bis zu 7 Passagiere. Ideal für Familien, Gruppenreisen & Flughafentransfers.",
    specs: ["7 Passagiere", "Kindersitze", "WLAN"],
    icon: Users,
    objectPosition: "center 45%",
    bookLabel: "Großraumtaxi anfragen",
    bookMsg: "Ich möchte das Großraumtaxi (Mercedes V-Klasse) anfragen.",
  },
  {
    image: "car-elektro2.webp",
    category: "ELECTRIC",
    tag: "Mercedes E 300 e",
    title: "Hybrid & Elektro",
    desc: "Leise, sauber, zukunftssicher. Modernste Antriebstechnik für emissionsfreie Fahrten.",
    specs: ["Emissionsarm", "Silent Drive", "Modernste Technik"],
    icon: Zap,
    objectPosition: "center 45%",
    bookLabel: "Hybrid-Taxi anfragen",
    bookMsg: "Ich möchte das Hybrid-/Elektrotaxi (Mercedes E 300 e) anfragen.",
  },
];

const N = CARS.length;
function mod(n: number, m: number) { return ((n % m) + m) % m; }

function getCardProps(position: number) {
  if (position === 0) {
    return { x: "0%", scale: 1, opacity: 1, zIndex: 20, dim: false, clickable: false };
  }
  if (Math.abs(position) === 1) {
    const dir = position > 0 ? 1 : -1;
    return { x: `${dir * 63}%`, scale: 0.8, opacity: 0.55, zIndex: 10, dim: true, clickable: true };
  }
  const dir = position > 0 ? 1 : -1;
  return { x: `${dir * 115}%`, scale: 0.7, opacity: 0, zIndex: 1, dim: true, clickable: false };
}

const { title: _fzTitle, description: _fzDesc } = getPageMeta('/fahrzeuge');

export default function Fahrzeuge() {
  usePageMeta({ title: _fzTitle, description: _fzDesc });
  const [active, setActive] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const navigate = useCallback((newIdx: number) => setActive(mod(newIdx, N)), []);
  const prev = () => navigate(active - 1);
  const next = () => navigate(active + 1);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const onDragStart = (clientX: number) => setDragStartX(clientX);
  const onDragEnd = (clientX: number) => {
    if (dragStartX === null) return;
    const diff = dragStartX - clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setDragStartX(null);
  };

  return (
    <Layout>
      <div className="bg-background">

        {/* ── Compact header ── */}
        <div className="flex items-center justify-between px-6 lg:px-12 pt-10 pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
          <div className="text-center">
            <h1
              className="font-display font-black uppercase tracking-tighter leading-none select-none sr-only"
            >
              Unsere Fahrzeugflotte – Taxi &amp; Großraumtaxi in Essen
            </h1>
            <span
              aria-hidden="true"
              className="font-display font-black uppercase tracking-tighter leading-none select-none"
              style={{ fontSize: "clamp(2rem,6vw,4.5rem)" }}
            >
              SHOW<span className="text-primary italic">ROOM</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            {CARS.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Tab labels OUTSIDE the slider (no overlap possible) ── */}
        <div className="flex justify-center gap-6 pb-4 px-6">
          {CARS.map((c, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              className={`font-display font-black uppercase tracking-widest text-xs lg:text-sm transition-all duration-300 ${
                i === active ? "text-primary" : "text-white/30 hover:text-white/60"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* ── Slider Stage ── */}
        <div
          className="relative w-full overflow-hidden select-none"
          style={{ height: "clamp(520px, 80vh, 860px)" }}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onMouseLeave={() => setDragStartX(null)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          {CARS.map((c, i) => {
            const position = mod(i - active + Math.floor(N / 2), N) - Math.floor(N / 2);
            const props = getCardProps(position);
            const base = import.meta.env.BASE_URL;
            const Icon = c.icon;
            const isActive = position === 0;

            return (
              <motion.div
                key={c.image}
                animate={{ x: props.x, scale: props.scale, opacity: props.opacity, zIndex: props.zIndex }}
                transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.9 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-[24px] lg:rounded-[32px] overflow-hidden cursor-pointer flex flex-col"
                style={{ width: "78%", height: "100%" }}
                onClick={() => props.clickable && navigate(i)}
              >
                {/* ── TOP: Photo (fills ~62% of card height) ── */}
                <div className="relative flex-none" style={{ height: "62%" }}>
                  <img
                    src={`${base}${c.image}`}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: c.objectPosition }}
                    draggable={false}
                  />

                  {/* Dim overlay for non-active cards */}
                  {!isActive && <div className="absolute inset-0 bg-black/55" />}

                  {/* Soft bottom fade into info area */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f1117] to-transparent" />

                  {/* Category pill + icon — active only */}
                  {isActive && (
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                      <span className="bg-primary text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {c.category}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  )}
                </div>

                {/* ── BOTTOM: Info area (fills ~38% of card height) ── */}
                <div className="flex-1 bg-[#0f1117] border-t border-white/[0.06]">
                  {isActive ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="h-full flex flex-col justify-between p-5 lg:p-8"
                      >
                        <div>
                          <p className="text-white/35 text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">{c.tag}</p>
                          <h2
                            className="font-display font-black uppercase leading-none text-white"
                            style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}
                          >
                            {c.title}
                          </h2>
                          <p className="text-white/55 text-xs lg:text-sm mt-1.5 leading-snug line-clamp-2">{c.desc}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1.5">
                            {c.specs.map((s) => (
                              <span
                                key={s}
                                className="bg-white/8 border border-white/10 text-white/70 text-[9px] lg:text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          <Link
                            href="/#anfrage"
                            className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] lg:text-xs group hover:gap-4 transition-all duration-300"
                          >
                            <span className="w-5 h-px bg-primary group-hover:w-8 transition-all duration-300" />
                            {c.bookLabel}
                          </Link>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    /* Dimmed placeholder for non-active */
                    <div className="h-full bg-black/30" />
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* ── Navigation arrows ── */}
          <button
            onClick={prev}
            className="absolute left-3 lg:left-6 top-[31%] -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-primary/40 transition-all duration-200 group"
          >
            <ChevronLeft className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 lg:right-6 top-[31%] -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-primary/40 transition-all duration-200 group"
          >
            <ChevronRight className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
          </button>


        </div>

        {/* ── Fahrzeugdetails (SEO-Textblock) ── */}
        <div className="container mx-auto px-4 lg:px-8 mt-16">
          <div className="max-w-3xl mx-auto space-y-10 pb-16">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter mb-6">
                Unsere <span className="text-primary">Fahrzeuge</span> im Detail
              </h2>
            </div>

            {/* Mercedes E-Klasse */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">CLASSIC</span>
                <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Mercedes E-Klasse T-Modell</span>
              </div>
              <h3 className="font-display font-black text-xl text-white">Kombi – Eleganz trifft Raum</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Unser meistgebuchtes Fahrzeug: der Mercedes E-Klasse Kombi verbindet Businessklasse-Komfort mit großzügigem Kofferraumvolumen.
                Bis zu 4 Personen reisen entspannt in Executive-Sitzen mit Klimaanlage und USB-Ladeanschluss. Der Kombi ist die erste Wahl für
                Geschäftsreisen, Flughafentransfers und komfortable Alltagsfahrten quer durch Essen und das Ruhrgebiet.
              </p>
              <ul className="grid grid-cols-2 gap-2 pt-1">
                {["4 Personen", "Großer Kofferraum", "Klimaanlage", "USB-Ladung", "Executive-Sitze", "Flughafentransfer"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[11px] text-white/50 font-semibold">
                    <span className="w-1 h-1 rounded-full bg-primary inline-block flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mercedes V-Klasse */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">VAN</span>
                <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Mercedes V-Klasse</span>
              </div>
              <h3 className="font-display font-black text-xl text-white">Großraumtaxi – bis zu 7 Personen</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Die Mercedes V-Klasse ist unser Großraumtaxi für Familien, Gruppen und Firmenteams. Mit Platz für bis zu 7 Passagiere und
                reichlich Gepäckraum meistert dieses Fahrzeug jede Herausforderung: Familienurlaub-Anreise zum Flughafen Düsseldorf,
                Firmendelegationen, Hochzeiten oder Gruppenreisen im Ruhrgebiet. Kindersitze stehen auf Anfrage bereit.
                WLAN an Bord für produktive Fahrten.
              </p>
              <ul className="grid grid-cols-2 gap-2 pt-1">
                {["7 Personen", "Viel Gepäckraum", "Kindersitze", "WLAN", "Klimaanlage", "Gruppenreisen"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[11px] text-white/50 font-semibold">
                    <span className="w-1 h-1 rounded-full bg-primary inline-block flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mercedes E 300 e Hybrid */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">ELECTRIC</span>
                <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Mercedes E 300 e</span>
              </div>
              <h3 className="font-display font-black text-xl text-white">Hybrid &amp; Elektro – leise und sauber</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Modernste Antriebstechnik für emissionsarme Fahrten in Essen: Der Mercedes E 300 e fährt im Stadtbereich rein elektrisch –
                geräuschlos, umweltschonend und ohne Reichweitenangst dank Hybridantrieb. Ideal für Fahrgäste, die Wert auf
                Nachhaltigkeit legen, ohne auf Businessklasse-Komfort zu verzichten. Perfekt für ruhige Fahrten zu Kliniken, Hotels
                oder innerstädtischen Zielen.
              </p>
              <ul className="grid grid-cols-2 gap-2 pt-1">
                {["Emissionsarm", "Silent Drive", "Hybridantrieb", "Modernste Technik", "Stadtfahrten", "Klimaanlage"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[11px] text-white/50 font-semibold">
                    <span className="w-1 h-1 rounded-full bg-primary inline-block flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Entscheidungshilfe */}
            <div className="border border-primary/20 rounded-2xl p-6 sm:p-8 space-y-5" style={{ background: "hsl(220 15% 7%)" }}>
              <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tighter text-white">
                Welches Fahrzeug <span className="text-primary">passt zu Ihnen?</span>
              </h2>
              <div className="space-y-3.5 text-sm text-white/60 leading-relaxed">
                <div className="flex gap-3">
                  <span className="text-primary font-black flex-shrink-0 mt-0.5">→</span>
                  <p><strong className="text-white/80">Alleinreisend oder zu zweit?</strong> Der Mercedes E-Klasse Kombi ist Ihr optimales Fahrzeug – komfortabel, gepflegt und mit viel Platz für Gepäck.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-black flex-shrink-0 mt-0.5">→</span>
                  <p><strong className="text-white/80">3 bis 7 Personen oder viel Gepäck?</strong> Das Großraumtaxi (Mercedes V-Klasse) ist die richtige Wahl – alle kommen gemeinsam und entspannt ans Ziel.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-black flex-shrink-0 mt-0.5">→</span>
                  <p><strong className="text-white/80">Umweltbewusst unterwegs?</strong> Der Mercedes E 300 e Hybrid fährt emissionsarm und leise – ideal für innerstädtische Fahrten in Essen.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-black flex-shrink-0 mt-0.5">→</span>
                  <p><strong className="text-white/80">Unsicher?</strong> Rufen Sie uns einfach an – wir beraten Sie persönlich und setzen das passende Fahrzeug für Sie ein: <a href="tel:+4920170706" className="text-primary hover:underline">0201 707060</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quality Banner ── */}
        <div className="container mx-auto px-4 lg:px-8 mt-0 pb-32">
          <div className="relative rounded-[40px] p-8 md:p-16 overflow-hidden border border-white/5" style={{ background: "hsl(220 15% 8%)" }}>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="font-display font-black uppercase tracking-tighter mb-10" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                  Qualität ohne Kompromisse
                </h2>
                <div className="space-y-8">
                  {qualityItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex gap-5">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-black text-white text-base mb-1">{item.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={`${glassCard} rounded-3xl p-8`}>
                <div className="text-center mb-8">
                  <div className="font-display font-black text-primary mb-1" style={{ fontSize: "5rem", lineHeight: 1 }}>5.0</div>
                  <div className="text-xs uppercase font-black tracking-widest text-muted-foreground">/5 Flottenbewertung</div>
                </div>
                <div className="space-y-5">
                  {[["Sauberkeit", "100%"], ["Pünktlichkeit", "100%"], ["Komfort", "100%"]].map(([label, pct]) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span>{label}</span>
                        <span className="text-primary">{pct}</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="w-full h-full bg-primary rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
