import { useState, useCallback, useEffect, useRef } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
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

export default function Fahrzeuge() {
  usePageMeta({
    title: "Unsere Fahrzeuge – Taxi B&B GmbH Essen | Mercedes Flotte",
    description: "Moderne Mercedes-Flotte bei Taxi B&B GmbH: E-Klasse Kombi, E 300 e Hybrid und V-Klasse Großraumtaxi für bis zu 7 Personen. Komfortabel, klimatisiert, zuverlässig.",
  });
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
          <h1
            className="font-display font-black uppercase tracking-tighter leading-none select-none"
            style={{ fontSize: "clamp(2rem,6vw,4.5rem)" }}
          >
            SHOW<span className="text-primary italic">ROOM</span>
          </h1>
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
                          <a
                            href="https://wa.me/491711111535"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] lg:text-xs group hover:gap-4 transition-all duration-300"
                          >
                            <span className="w-5 h-px bg-primary group-hover:w-8 transition-all duration-300" />
                            Fahrt anfragen
                          </a>
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

          {/* ── Car name strip ── */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-[78%] flex items-center justify-around pb-4 px-8">
            {CARS.map((c, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                className={`text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  i === active ? "text-primary" : "text-white/20 hover:text-white/45"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Quality Banner ── */}
        <div className="container mx-auto px-4 lg:px-8 mt-16 pb-32">
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
