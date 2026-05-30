import { useRef, useEffect, useState, type ComponentType } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { HeroBookingWidget } from "@/components/HeroBookingWidget";
import { Button } from "@/components/ui";
import { Phone, Shield, Sparkles, Navigation, ArrowRight, Mail, Globe, MessageCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLanguage } from "@/i18n/useLanguage";
import depotPoster from "@assets/IMG_1642_1780001838765.png";
import brushStroke from "@assets/brush-stroke.png";

const glassCard = "backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]";

const ctaGlowContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
type CtaGlow = { glow: string; bgDim: string; bgLit: string };
const ctaGlowItem = {
  hidden: (c: CtaGlow) => ({
    opacity: 0.5,
    y: 14,
    boxShadow: "0 0 0px rgba(0,0,0,0)",
    backgroundColor: c.bgDim,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
  show: (c: CtaGlow) => ({
    opacity: 1,
    y: 0,
    boxShadow: c.glow,
    backgroundColor: c.bgLit,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function ServiceCard({ title, sub, index, icon: Icon }: { title: string; sub: string; index: number; icon: ComponentType<{ className?: string }> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`${glassCard} p-8 rounded-[32px] group hover:border-primary/40 transition-all cursor-default relative overflow-hidden h-full flex flex-col justify-between`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-[0.12] transition-opacity translate-x-4 -translate-y-4 pointer-events-none select-none">
        <span className="text-[100px] font-display font-black leading-none">0{index + 1}</span>
      </div>
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <div>
        <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-2">{title}</h3>
        <p className="text-2xl font-black text-white leading-tight">{sub}</p>
      </div>
    </motion.div>
  );
}

const SERVICE_ITEMS = [
  { src: "krankenfahrten.png",    titleKey: "hero_service2_title", descKey: "hero_service2_desc" },
  { src: "geschaeftsfahrten.png", titleKey: "hero_service1_title", descKey: "hero_service1_desc" },
  { src: "flughafentransfer.png", titleKey: "hero_service3_title", descKey: "hero_service3_desc" },
  { src: "kurierdokumente.png",   titleKey: "hero_service4_title", descKey: "hero_service4_desc" },
  { src: "kurierdienst.png",      titleKey: "hero_service5_title", descKey: "hero_service5_desc" },
  { src: "hauszuhaus.png",        titleKey: "hero_service6_title", descKey: "hero_service6_desc" },
] as const;

function ServicesRevealSection() {
  const { t } = useLanguage();
  const base = import.meta.env.BASE_URL;
  const [activeIdx, setActiveIdx] = useState(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const check = () => {
      const viewCenter = window.scrollY + window.innerHeight / 2;
      let bestIdx = -1;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const elCenter = top + el.offsetHeight / 2;
        const dist = Math.abs(viewCenter - elCenter);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });
      setActiveIdx(bestDist < window.innerHeight * 0.26 ? bestIdx : -1);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);

  return (
    <div>
      {/* ── Scroll-Reveal: alle 6 Leistungen — 1 Spalte ── */}
      <div className="grid grid-cols-1 gap-y-12 lg:gap-y-20">
        {SERVICE_ITEMS.map(({ src, titleKey, descKey }, i) => (
          <div
            key={src}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="py-6 text-center relative"
          >
            {/* Glass tile — visible only when this item is nearest viewport center */}
            <div
              className="absolute inset-x-[-1rem] sm:inset-x-[-1.5rem] lg:inset-x-[-3rem] inset-y-0 rounded-2xl border border-white/[0.18] bg-white/[0.09] backdrop-blur-md shadow-[0_8px_48px_rgba(0,0,0,0.45)] pointer-events-none"
              style={{
                opacity: activeIdx === i ? 1 : 0,
                transition: activeIdx === i
                  ? "opacity 0.45s 0.18s cubic-bezier(0.4,0,0.2,1)"
                  : "opacity 0.3s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center"
              style={{
                transform: activeIdx === i ? "scale(1.03)" : "scale(1)",
                transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <motion.div
                whileInView={{ scale: [0.85, 1.04, 1] }}
                viewport={{ once: false }}
                transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                className="flex justify-center mb-5 lg:mb-7"
              >
                <img
                  src={`${base}icons/${src}`}
                  alt={t(titleKey)}
                  className="h-20 lg:h-32 w-auto object-contain"
                  style={{ filter: "drop-shadow(0 0 18px rgba(255,193,7,0.55))" }}
                />
              </motion.div>

              <h3
                className="font-display font-black text-white uppercase tracking-tighter mb-3 leading-none"
                style={{ fontSize: "clamp(1.1rem,2.4vw,2rem)" }}
              >
                {t(titleKey)}
              </h3>

              <p className="font-medium leading-relaxed mx-auto text-sm lg:text-base max-w-[240px] lg:max-w-sm text-white/75">
                {t(descKey)}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    q: "Welches Taxiunternehmen ist in Essen am zuverlässigsten?",
    a: "Taxi B&B GmbH ist seit 1992 für Pünktlichkeit und Zuverlässigkeit bekannt – mit 5-Sterne-Bewertungen und 30+ Jahren Erfahrung. Wir sind 24/7 für Sie da: 0201 707060.",
  },
  {
    q: "Wie viel kostet ein Taxi zum Flughafen Düsseldorf aus Essen?",
    a: "Wir berechnen transparente Festpreise ohne böse Überraschungen. Die Strecke Essen–Flughafen Düsseldorf beträgt ca. 35–40 km. Rufen Sie uns für ein konkretes Angebot an: 0201 707060.",
  },
  {
    q: "Kann ich ein Großraumtaxi für 7 Personen buchen?",
    a: "Ja! Unsere Mercedes V-Klasse bietet Platz für bis zu 7 Personen – ideal für Gruppen, Familien und Firmenausflüge. Kindersitze auf Anfrage. Jetzt buchen: 0201 707060.",
  },
  {
    q: "Bieten Sie Krankenfahrten und Dialysefahrten an?",
    a: "Ja, wir führen Krankenfahrten, Dialysefahrten und Therapiefahrten in Essen und Umgebung durch. Wir arbeiten mit Krankenkassen zusammen und holen Sie pünktlich ab.",
  },
  {
    q: "Ist Taxi B&B GmbH wirklich 24 Stunden erreichbar?",
    a: "Absolut – 24 Stunden, 7 Tage die Woche, 365 Tage im Jahr. Egal ob Nachtflug oder Frühschicht: Wir sind da. Rufen Sie einfach an: 0201 707060.",
  },
  {
    q: "Fahren Sie auch ins Ausland oder bundesweit?",
    a: "Ja! Wir fahren bundesweit und ins europäische Ausland. Amsterdam, Zürich, Wien – kein Problem. Festpreise auf Anfrage.",
  },
  {
    q: "Welche Fahrzeuge hat Taxi B&B GmbH?",
    a: "Unsere Flotte umfasst den Mercedes E-Klasse Kombi, den Mercedes E 300 e Hybrid (elektrisch) und die Mercedes V-Klasse für Gruppen. Alle Fahrzeuge sind klimatisiert und regelmäßig gewartet.",
  },
  {
    q: "Wie schnell kommt das Taxi nach meiner Bestellung?",
    a: "In der Regel sind wir innerhalb weniger Minuten bei Ihnen in Essen. Rufen Sie uns an oder buchen Sie direkt über das Formular auf dieser Seite.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 relative"
      style={{ zIndex: 2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="text-[13px] font-black text-primary uppercase tracking-[0.45em] mb-4 block">
            Häufige Fragen & Unsere Antworten
          </span>
          <h2
            className="font-display font-black uppercase tracking-tighter leading-none"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            Ihre Fragen —<br />
            <span className="text-white/70">unsere Antworten</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-md overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.28)] divide-y divide-white/[0.06]">
          {FAQ_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className={`transition-colors ${
                openIdx === idx ? "bg-white/[0.045]" : "hover:bg-white/[0.025]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-start justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left group"
                aria-expanded={openIdx === idx}
              >
                <span className="text-sm sm:text-base font-bold text-white/85 group-hover:text-white transition-colors leading-snug pr-2">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-primary/80 transition-transform duration-300 mt-0.5 ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-white/60 leading-relaxed px-5 sm:px-6 pb-5">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const imgRef = useRef<HTMLImageElement>(null);
  const sharpOverlayRef = useRef<HTMLImageElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaInView = useInView(ctaHeadingRef, { amount: 0.3, margin: "0px 0px 5% 0px" });
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const storyImgRef = useRef<HTMLImageElement>(null);
  const storyLayerRef = useRef<HTMLDivElement>(null);
  const storySectionRef = useRef<HTMLElement>(null);
  const reviewsSectionRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaImgRef = useRef<HTMLImageElement>(null);
  const ctaLayerRef = useRef<HTMLDivElement>(null);

  usePageMeta({
    title: "Taxi B&B GmbH Essen – 24/7 Taxiservice | 0201 707060",
    description: "Ihr zuverlässiger Taxiservice in Essen seit 1992. Flughafentransfer Düsseldorf, Krankenfahrten, Großraumtaxi für 7 Personen. Jetzt buchen: 0201 707060.",
  });

  // Image-sequence scrubber — bulletproof on iOS Safari, no <video> black-frame issues
  const FRAME_COUNT = 77;
  const framePath = (n: number) =>
    `${import.meta.env.BASE_URL}hero-frames/frame_${String(n).padStart(3, "0")}.jpg`;

  useEffect(() => {
    const img = imgRef.current;
    const heroLayer = heroLayerRef.current;
    if (!img) return;

    let heroTargetOpacity = 1;

    // Hero fades out on its OWN scroll progress — fully decoupled from the
    // story effect so there is zero coupling / silver-bleed risk.
    const getHeroOpacity = () => {
      const servicesEl = servicesRef.current;
      const servicesTop = servicesEl
        ? servicesEl.getBoundingClientRect().top + window.scrollY
        : window.innerHeight * 1.5;
      const vh = window.innerHeight;
      return Math.min(Math.max(1 - (window.scrollY - (servicesTop - vh * 0.5)) / (vh * 0.4), 0), 1);
    };

    const PRIORITY_COUNT = 20;
    const frames: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const f = new Image();
      if (i <= PRIORITY_COUNT) (f as HTMLImageElement & { fetchpriority: string }).fetchpriority = "high";
      f.src = framePath(i);
      frames.push(f);
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let lastFrame = -1;
    let rafId: number;
    let started = false;

    const getProgress = () => {
      const servicesEl = servicesRef.current;
      const servicesTop = servicesEl
        ? servicesEl.getBoundingClientRect().top + window.scrollY
        : window.innerHeight * 1.5;
      return Math.min(Math.max(window.scrollY / Math.max(servicesTop, 1), 0), 1);
    };

    const isReady = (f: HTMLImageElement) => f.complete && f.naturalWidth > 0;

    // Find the closest already-loaded frame to the target index so we never
    // "skip" to start/end when intermediate frames haven't downloaded yet.
    const nearestReady = (target: number) => {
      if (isReady(frames[target])) return target;
      for (let d = 1; d < FRAME_COUNT; d++) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= 0 && isReady(frames[lo])) return lo;
        if (hi < FRAME_COUNT && isReady(frames[hi])) return hi;
      }
      return -1;
    };

    const rafLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1))),
      );
      if (idx !== lastFrame) {
        const ready = nearestReady(idx);
        if (ready >= 0) {
          img.src = frames[ready].src;
          lastFrame = idx;
        }
      }
      if (sharpOverlayRef.current) {
        const sharpOpacity = Math.max(0, 1 - currentProgress * 25);
        sharpOverlayRef.current.style.opacity = String(sharpOpacity);
      }
      if (heroLayer) heroLayer.style.opacity = String(heroTargetOpacity);
      rafId = requestAnimationFrame(rafLoop);
    };

    const onScroll = () => {
      targetProgress = getProgress();
      heroTargetOpacity = getHeroOpacity();
    };

    const startLoop = () => {
      if (started) return;
      started = true;
      targetProgress = getProgress();
      heroTargetOpacity = getHeroOpacity();
      currentProgress = targetProgress;
      window.addEventListener("scroll", onScroll, { passive: true });
      rafId = requestAnimationFrame(rafLoop);
    };

    const priorityDecodes = frames.slice(0, PRIORITY_COUNT).map((f) =>
      f.decode ? f.decode().catch(() => {}) : Promise.resolve()
    );

    Promise.all(priorityDecodes).then(startLoop);

    const fallback = setTimeout(startLoop, 800);

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ─── Story-section scroll video — second image-sequence, fades in at the
  // story section and reaches its last frame at the CTA section ───
  const STORY_FRAME_COUNT = 97;
  const storyFramePath = (n: number) =>
    `${import.meta.env.BASE_URL}story-frames/frame_${String(n).padStart(3, "0")}.jpg`;

  useEffect(() => {
    const img = storyImgRef.current;
    const layer = storyLayerRef.current;
    if (!img || !layer) return;

    const PRIORITY_COUNT = 16;
    const frames: HTMLImageElement[] = [];
    for (let i = 1; i <= STORY_FRAME_COUNT; i++) {
      const f = new Image();
      if (i <= PRIORITY_COUNT) (f as HTMLImageElement & { fetchpriority: string }).fetchpriority = "high";
      f.src = storyFramePath(i);
      frames.push(f);
    }

    const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

    let targetProgress = 0;
    let currentProgress = 0;
    let targetOpacity = 0;
    let currentOpacity = 0;
    let lastFrame = -1;
    let rafId: number;
    let started = false;

    const isReady = (f: HTMLImageElement) => f.complete && f.naturalWidth > 0;
    const nearestReady = (target: number) => {
      if (isReady(frames[target])) return target;
      for (let d = 1; d < STORY_FRAME_COUNT; d++) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= 0 && isReady(frames[lo])) return lo;
        if (hi < STORY_FRAME_COUNT && isReady(frames[hi])) return hi;
      }
      return -1;
    };

    const measure = () => {
      const servicesEl = servicesRef.current;
      const s = storySectionRef.current;
      const vh = window.innerHeight;
      const servicesTop = servicesEl ? servicesEl.getBoundingClientRect().top + window.scrollY : 0;
      const storyTop = s ? s.getBoundingClientRect().top + window.scrollY : servicesTop + vh * 3;
      // Hero fades out via its own decoupled opacity — story can now safely
      // rise AFTER servicesTop (heading area covered by the black band) without
      // any silver-taxi bleed risk.
      const opacity = clamp((window.scrollY - servicesTop) / (vh * 0.35), 0, 1);
      // Start scrubbing once the heading's black band has scrolled up off the
      // top (the cards are on screen and enough of the frame is visible).
      const appear = servicesTop + vh * 0.4;
      // Reaches its last frame just ABOVE the story section's taxi-sign photo.
      const finish = storyTop;
      const progress = clamp((window.scrollY - appear) / Math.max(finish - appear, 1), 0, 1);
      return { progress, opacity };
    };

    const update = () => {
      const m = measure();
      targetProgress = m.progress;
      targetOpacity = m.opacity;
    };

    const rafLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;
      // Opacity is NOT lerped — the measure() ramp already gives a smooth
      // linear fade; lerping on top just adds lag that lets the silver hero
      // bleed through at fast scroll speeds.
      currentOpacity = targetOpacity;
      const idx = Math.min(
        STORY_FRAME_COUNT - 1,
        Math.max(0, Math.round(currentProgress * (STORY_FRAME_COUNT - 1))),
      );
      if (idx !== lastFrame) {
        const ready = nearestReady(idx);
        if (ready >= 0) {
          img.src = frames[ready].src;
          lastFrame = idx;
        }
      }
      layer.style.opacity = String(currentOpacity);
      rafId = requestAnimationFrame(rafLoop);
    };

    const onScroll = () => update();
    const onResize = () => update();

    const startLoop = () => {
      if (started) return;
      started = true;
      update();
      currentProgress = targetProgress;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      rafId = requestAnimationFrame(rafLoop);
    };

    const priorityDecodes = frames.slice(0, PRIORITY_COUNT).map((f) =>
      f.decode ? f.decode().catch(() => {}) : Promise.resolve()
    );
    Promise.all(priorityDecodes).then(startLoop);
    const fallback = setTimeout(startLoop, 800);

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ─── Third image-sequence — the "second video". Softly crossfades IN over
  // the story clip around the reviews section and scrubs through to the CTA,
  // where it holds its last frame. ───
  const CTA_FRAME_COUNT = 97;
  const ctaFramePath = (n: number) =>
    `${import.meta.env.BASE_URL}cta-frames/frame_${String(n).padStart(3, "0")}.jpg`;

  useEffect(() => {
    const img = ctaImgRef.current;
    const layer = ctaLayerRef.current;
    if (!img || !layer) return;

    const PRIORITY_COUNT = 16;
    const frames: HTMLImageElement[] = [];
    for (let i = 1; i <= CTA_FRAME_COUNT; i++) {
      const f = new Image();
      if (i <= PRIORITY_COUNT) (f as HTMLImageElement & { fetchpriority: string }).fetchpriority = "high";
      f.src = ctaFramePath(i);
      frames.push(f);
    }

    const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

    let targetProgress = 0;
    let currentProgress = 0;
    let targetOpacity = 0;
    let currentOpacity = 0;
    let lastFrame = -1;
    let rafId: number;
    let started = false;

    const isReady = (f: HTMLImageElement) => f.complete && f.naturalWidth > 0;
    const nearestReady = (target: number) => {
      if (isReady(frames[target])) return target;
      for (let d = 1; d < CTA_FRAME_COUNT; d++) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= 0 && isReady(frames[lo])) return lo;
        if (hi < CTA_FRAME_COUNT && isReady(frames[hi])) return hi;
      }
      return -1;
    };

    const measure = () => {
      const s = storySectionRef.current;
      const faqEl = document.getElementById("faq");
      const vh = window.innerHeight;
      const storyTop = s ? s.getBoundingClientRect().top + window.scrollY : 0;
      const faqRect = faqEl ? faqEl.getBoundingClientRect() : null;
      const faqTop = faqRect ? faqRect.top + window.scrollY : storyTop + vh * 4;
      // The last clip takes over right BELOW the story section's taxi-sign photo.
      // Start the fade early enough that it is fully opaque BEFORE the photo
      // bottom — while the photo still covers the background — so the story clip
      // is completely replaced; directly below the photo only this clip shows.
      const appear = storyTop + vh * 0.25;
      const finish = Math.max(faqTop - vh * 0.1, appear + vh);
      const progress = clamp((window.scrollY - appear) / Math.max(finish - appear, 1), 0, 1);
      // Reaches full opacity quickly (within the photo area), no lerp lag.
      const opacity = clamp((window.scrollY - appear) / (vh * 0.25), 0, 1);
      return { progress, opacity };
    };

    const update = () => {
      const m = measure();
      targetProgress = m.progress;
      targetOpacity = m.opacity;
    };

    const rafLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;
      // Opacity is NOT lerped — the measure() ramp is the smooth transition.
      currentOpacity = targetOpacity;
      const idx = Math.min(
        CTA_FRAME_COUNT - 1,
        Math.max(0, Math.round(currentProgress * (CTA_FRAME_COUNT - 1))),
      );
      if (idx !== lastFrame) {
        const ready = nearestReady(idx);
        if (ready >= 0) {
          img.src = frames[ready].src;
          lastFrame = idx;
        }
      }
      layer.style.opacity = String(currentOpacity);
      rafId = requestAnimationFrame(rafLoop);
    };

    const onScroll = () => update();
    const onResize = () => update();

    const startLoop = () => {
      if (started) return;
      started = true;
      update();
      currentProgress = targetProgress;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      rafId = requestAnimationFrame(rafLoop);
    };

    const priorityDecodes = frames.slice(0, PRIORITY_COUNT).map((f) =>
      f.decode ? f.decode().catch(() => {}) : Promise.resolve()
    );
    Promise.all(priorityDecodes).then(startLoop);
    const fallback = setTimeout(startLoop, 800);

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);


  return (
    <Layout>
      <div>
        {/* ─── FIXED IMAGE-SEQUENCE BACKGROUND — spans Hero + Services ─── */}
        <div ref={heroLayerRef} className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <img
            ref={imgRef}
            src={framePath(1)}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
            style={{ objectPosition: "center", opacity: 0.75 }}
          />
          <img
            ref={sharpOverlayRef}
            src={`${import.meta.env.BASE_URL}hero-sharp.jpg`}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center", opacity: 1 }}
          />
        </div>

        {/* ─── STORY SCROLL-VIDEO BACKGROUND — fades in at the story section, ─── */}
        {/* ─── scrubs through story → reviews → CTA, last frame at the CTA   ─── */}
        <div
          ref={storyLayerRef}
          className="fixed inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 1, opacity: 0 }}
        >
          <img
            ref={storyImgRef}
            src={storyFramePath(1)}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
            style={{ objectPosition: "center", opacity: 0.9 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(8,10,16,0.62) 0%, rgba(8,10,16,0.42) 45%, rgba(8,10,16,0.72) 100%)" }}
          />
        </div>

        {/* ─── SECOND VIDEO BACKGROUND — softly crossfades in over the story ─── */}
        {/* ─── clip around the reviews section, holds last frame at the CTA  ─── */}
        <div
          ref={ctaLayerRef}
          className="fixed inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 1, opacity: 0 }}
        >
          <img
            ref={ctaImgRef}
            src={ctaFramePath(1)}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
            style={{ objectPosition: "center", opacity: 0.9 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(8,10,16,0.62) 0%, rgba(8,10,16,0.42) 45%, rgba(8,10,16,0.72) 100%)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: "35vh", background: "linear-gradient(to top, hsl(220,20%,4%) 0%, transparent 100%)" }}
          />
        </div>

        {/* ─── HERO ─── */}
        {/* -mt-20 pulls this section up behind the fixed nav */}
        <div className="relative -mt-20" style={{ zIndex: 2 }}>
          {/* Dark overlays for readability — exakt wie deployed */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.0) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, rgba(0,0,0,0.45) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{ zIndex: 0, background: "linear-gradient(to bottom, transparent 0%, hsl(220,20%,4%) 75%, hsl(220,20%,4%) 100%)" }} />

          <section className="relative min-h-screen flex flex-col overflow-hidden pt-20 pb-8" style={{ zIndex: 1 }}>

            {/* ── Logo + Subtitle + Slogan ── */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-20 pt-6 pb-0">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <img
                  id="hero-logo"
                  src={`${import.meta.env.BASE_URL}bb-logo-v7-transparent.png`}
                  alt="Taxi B&B"
                  className="mx-auto w-auto"
                  style={{
                    maxHeight: "clamp(68px, 11vw, 130px)",
                    filter: "drop-shadow(0 4px 32px rgba(255,193,7,0.35))",
                  }}
                />
                <p className="text-center font-display font-bold uppercase tracking-[0.18em] text-white/80 mt-1.5 mb-1" style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.95rem)" }}>
                  Taxi-Service Essen
                </p>
                <div className="flex items-center justify-center gap-3 mt-1.5">
                  <div className="h-px w-8 bg-primary/70 shrink-0" />
                  <span className="text-[9px] font-semibold tracking-[0.28em] text-primary uppercase whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {t("hero_tagline")}
                  </span>
                  <div className="h-px w-8 bg-primary/70 shrink-0" />
                </div>
              </motion.div>
            </div>

            {/* ── Widget — über dem Taxischild ── */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-20 flex justify-center mt-2 sm:mt-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full lg:w-[82%] lg:max-w-5xl"
              >
                <HeroBookingWidget />
              </motion.div>
            </div>

            {/* ── Service Icons — absolut über Kennzeichen ── */}
            <div className="absolute bottom-[24%] left-0 right-0 z-20 px-4 sm:px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="grid grid-cols-3 gap-x-2 gap-y-4 lg:gap-x-8 w-full lg:w-[82%] lg:max-w-5xl mx-auto"
              >
                {[
                  { src: "krankenfahrten.png",    label: t("hero_service2_title") },
                  { src: "geschaeftsfahrten.png", label: t("hero_service1_title") },
                  { src: "flughafentransfer.png", label: t("hero_service3_title") },
                  { src: "kurierdokumente.png",   label: t("hero_service4_title") },
                  { src: "kurierdienst.png",      label: t("hero_service5_title") },
                  { src: "hauszuhaus.png",        label: t("hero_service6_title") },
                ].map(({ src, label }) => (
                  <div key={src} className="flex flex-col items-center text-center gap-1.5 group px-1">
                    <div className="h-14 lg:h-20 flex items-center justify-center">
                      <img
                        src={`${import.meta.env.BASE_URL}icons/${src}`}
                        alt={label}
                        className="h-12 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        style={{ filter: "drop-shadow(0 0 10px rgba(255,193,7,0.55))" }}
                      />
                    </div>
                    <span className="text-[9px] lg:text-[11px] font-black tracking-wide text-white/65 uppercase leading-tight group-hover:text-primary transition-colors">
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Decorative watermark */}
            <div className="absolute top-1/3 right-0 pointer-events-none opacity-[0.03] select-none hidden xl:block">
              <span className="font-display font-black leading-none" style={{ fontSize: "28vw" }}>B&B</span>
            </div>
          </section>
        </div>

        {/* ─── SERVICES ─── */}
        {/* Fixed video (at last frame) shines through as background */}
        <section id="leistungen" ref={servicesRef} className="py-24 lg:py-32 relative" style={{ zIndex: 2 }}>
          {/* Voll deckende Abdunklung — exakt wie deployed, dunkel→leicht→dunkel, kein schwebendes Band */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, hsl(220,20%,4%) 0%, rgba(8,10,16,0.68) 15%, rgba(8,10,16,0.72) 85%, hsl(220,20%,4%) 100%)" }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h2 className="font-display font-black uppercase tracking-tighter mb-4 leading-none" style={{ fontSize: "clamp(3rem,8vw,6rem)" }}>
                  {t("feat_title")}
                </h2>
                <p className="text-lg text-white/40 font-bold italic max-w-md">
                  {t("feat_subtitle")}
                </p>
              </div>
              <div className="flex gap-4 items-center shrink-0">
                <div className="w-14 h-0.5 bg-primary" />
                <div className="w-14 h-0.5 bg-white/10" />
              </div>
            </div>

            <ServicesRevealSection />

            {/* ── 3 Badge-Logos am Ende der Services-Section ── */}
            <div className="mt-16 pt-10 border-t border-white/[0.07] grid grid-cols-3 gap-6">
              {[
                { src: "icons/247.png",        label: "24 Std., 7 Tage\ndie Woche",        delay: 0 },
                { src: "icons/grossraum7.png", label: "Großraum-Taxi's\nfür 7 Personen",   delay: 0.2 },
                { src: "icons/bundesweit.png", label: "Essen, Bundesweit\n& Ausland",       delay: 0.4 },
              ].map(({ src, label, delay }) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 28, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${src}`}
                    alt={label}
                    className="h-16 w-auto object-contain"
                    style={{ mixBlendMode: "screen", filter: "contrast(2) brightness(1.1)" }}
                  />
                  <span className="text-[10px] font-bold tracking-wide text-white/60 leading-tight whitespace-pre-line uppercase">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── STORY SECTION ─── */}
        <section id="geschichte" ref={storySectionRef} className="py-24 lg:py-40 relative" style={{ zIndex: 2 }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-muted">
                  <img
                    src={`${import.meta.env.BASE_URL}story-bg.jpg`}
                    alt="Taxi B&B"
                    className="w-full h-full object-cover transition-all duration-1000"
                  />
                </div>
                <div className="absolute -bottom-8 -right-6 lg:-right-10 w-44 h-44 rounded-[28px] p-6 flex flex-col justify-end shadow-2xl"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <span className="text-5xl font-display font-black leading-none mb-1" style={{ color: "#FFC107" }}>30+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#FFC107CC" }}>Jahre Erfahrung</span>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="rounded-[32px] border border-white/[0.1] bg-white/[0.05] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 lg:p-12"
              >
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.45em] mb-6 block">
                  {t("story_pre")}
                </span>
                <h2 className="font-display font-black uppercase tracking-tighter mb-8 leading-[0.9]" style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}>
                  {t("story_h1")}<br />
                  <span className="text-white/25">{t("story_h2")}</span>
                </h2>
                <p className="text-lg text-white/55 leading-relaxed mb-10 font-medium">
                  {t("story_text")}
                </p>
                <Link href="/ueber-uns" className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] hover:text-primary transition-colors group">
                  {t("story_cta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ─── REVIEWS ─── */}
        <section id="bewertungen" ref={reviewsSectionRef} className="py-20 sm:py-28 relative" style={{ zIndex: 2 }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="relative inline-block text-3xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-3">
                <img
                  src={brushStroke}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[165%] max-w-none h-[210%] pointer-events-none select-none"
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.7 }}
                />
                <span className="relative" style={{ color: "#FFC107", WebkitTextStroke: "2px black", textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}>{t("reviews_title")}</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                {t("reviews_sub")}
              </p>
            </motion.div>
          </div>
          {/* Full-bleed: Tiles laufen über den Bildschirmrand hinaus */}
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
            <ReviewCarousel />
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section ref={ctaSectionRef} className="py-20 sm:py-28 relative overflow-hidden" style={{ zIndex: 2 }}>
          <div className="absolute inset-0 opacity-[0.035]">
            <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,193,7,0.4) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-block rounded-[32px] border border-white/[0.1] bg-white/[0.05] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 lg:p-12 mb-10 max-w-full">
            {/* Word-by-word reveal heading */}
            <h2
              ref={ctaHeadingRef}
              className="font-display font-black uppercase tracking-tighter mb-6 leading-[1.05]"
              style={{ fontSize: "clamp(1.85rem, 6.8vw, 5rem)" }}
            >
              {/* Lines 1 & 2 — static, no scroll reveal */}
              <span className="block text-white/90 whitespace-nowrap">Fragen Sie Jetzt</span>
              <span className="block text-white/90 whitespace-nowrap">Ihre Nächste Fahrt</span>
              {/* Line 3 — only "AN!" reveals on scroll: comes in later & stronger */}
              <span className="block overflow-hidden pt-[0.08em] pb-[0.14em]">
                <motion.span
                  className="inline-block text-primary"
                  initial={{ y: "130%", scale: 0.9 }}
                  animate={ctaInView ? { y: "0%", scale: 1 } : { y: "130%", scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 170, damping: 12, delay: 0.1 }}
                >
                  An!
                </motion.span>
              </span>
            </h2>
            <p className="text-base sm:text-lg max-w-xl text-muted-foreground leading-relaxed">
              {t("cta_sub")}
            </p>
            </div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
              variants={ctaGlowContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.5, margin: "-40% 0px 0px 0px" }}
            >
              {/* E-Mail */}
              <motion.a
                variants={ctaGlowItem}
                custom={{ glow: "0 0 26px rgba(255,193,7,0.5)", bgDim: "rgba(255,255,255,0.04)", bgLit: "rgba(255,255,255,0.22)" }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.28)", scale: 1.03 }}
                href="mailto:taxibb@outlook.com"
                className="group flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border border-primary/30 hover:border-primary/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white/85 group-hover:text-white transition-colors">E-Mail</span>
              </motion.a>

              {/* Telefon */}
              <motion.a
                variants={ctaGlowItem}
                custom={{ glow: "0 0 26px rgba(255,193,7,0.5)", bgDim: "rgba(255,255,255,0.04)", bgLit: "rgba(255,255,255,0.22)" }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.28)", scale: 1.03 }}
                href="tel:0201707060"
                className="group flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border border-primary/30 hover:border-primary/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white/85 group-hover:text-white transition-colors">Telefon</span>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                variants={ctaGlowItem}
                custom={{ glow: "0 0 26px rgba(37,211,102,0.55)", bgDim: "rgba(37,211,102,0.06)", bgLit: "rgba(37,211,102,0.32)" }}
                whileHover={{ backgroundColor: "rgba(37,211,102,0.4)", scale: 1.03 }}
                href="https://wa.me/491711111535"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border border-[#25D366]/40 hover:border-[#25D366]/70 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/25 flex items-center justify-center group-hover:bg-[#25D366]/35 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#25D366] group-hover:text-[#25D366] transition-colors">WhatsApp</span>
              </motion.a>

              {/* Online */}
              <motion.button
                variants={ctaGlowItem}
                custom={{ glow: "0 0 26px rgba(255,193,7,0.55)", bgDim: "rgba(255,193,7,0.06)", bgLit: "rgba(255,193,7,0.32)" }}
                whileHover={{ backgroundColor: "rgba(255,193,7,0.4)", scale: 1.03 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border border-primary/40 hover:border-primary/70 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/25 flex items-center justify-center group-hover:bg-primary/35 transition-colors">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-primary group-hover:text-primary transition-colors">Online</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <FAQSection />

      </div>
    </Layout>
  );
}
