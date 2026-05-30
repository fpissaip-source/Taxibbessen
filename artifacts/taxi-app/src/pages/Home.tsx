import { useRef, useEffect, type ComponentType } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { HeroBookingWidget } from "@/components/HeroBookingWidget";
import { Button } from "@/components/ui";
import { Phone, Shield, Sparkles, Navigation, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/useLanguage";

const glassCard = "backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]";

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

  return (
    <div>
      {/* ── Scroll-Reveal: alle 6 Leistungen ── */}
      <div className="max-w-xl mx-auto">
        {SERVICE_ITEMS.map(({ src, titleKey, descKey }) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="py-14 text-center border-b border-white/[0.06] last:border-0"
          >
            <motion.div
              whileInView={{ scale: [0.85, 1.04, 1] }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <img
                src={`${base}icons/${src}`}
                alt={t(titleKey)}
                className="h-24 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 18px rgba(255,193,7,0.55))" }}
              />
            </motion.div>

            <h3
              className="font-display font-black text-white uppercase tracking-tighter mb-4 leading-none"
              style={{ fontSize: "clamp(1.8rem,3.8vw,2.8rem)" }}
            >
              {t(titleKey)}
            </h3>

            <p className="text-white/45 font-medium leading-relaxed mx-auto text-base max-w-sm">
              {t(descKey)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const scrub = () => {
      if (!video.duration) return;
      const servicesEl = servicesRef.current;
      // scrollEnd = absolute document Y of services section top
      // video reaches last frame exactly when services section scrolls to top of viewport
      const servicesTop = servicesEl
        ? servicesEl.getBoundingClientRect().top + window.scrollY
        : window.innerHeight * 1.5;
      const progress = Math.min(Math.max(window.scrollY / Math.max(servicesTop, 1), 0), 1);
      video.currentTime = progress * video.duration;
    };

    // Once metadata is loaded, enable scrubbing
    const onReady = () => { video.pause(); scrub(); };
    video.addEventListener("loadedmetadata", onReady);
    if (video.readyState >= 1) onReady(); // already loaded

    window.addEventListener("scroll", scrub, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrub);
      video.removeEventListener("loadedmetadata", onReady);
    };
  }, []);


  return (
    <Layout>
      <div>
        {/* ─── FIXED VIDEO BACKGROUND — spans Hero + Services ─── */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}hero-video-v2.mp4`}
            poster={`${import.meta.env.BASE_URL}taxi-poster.jpg`}
            autoPlay muted playsInline preload="auto"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center", opacity: 0.6 }}
          />
        </div>

        {/* ─── HERO ─── */}
        {/* -mt-20 pulls this section up behind the fixed nav */}
        <div className="relative -mt-20" style={{ zIndex: 2 }}>
          {/* Dark overlays for readability */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.0) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, rgba(0,0,0,0.45) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ zIndex: 0, background: "linear-gradient(to bottom, transparent 0%, hsl(220,20%,4%) 100%)" }} />

          <section className="relative min-h-screen flex items-start lg:items-center py-10 pt-24 lg:pt-28 overflow-hidden" style={{ zIndex: 1 }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-20">

              {/* ── Logo als Überschrift ── */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
              >
                <img
                  id="hero-logo"
                  src={`${import.meta.env.BASE_URL}bb-logo-v2-transparent.png`}
                  alt="Taxi B&B"
                  className="mx-auto w-auto"
                  style={{
                    maxHeight: "clamp(65px, 10vw, 120px)",
                    filter: "drop-shadow(0 4px 32px rgba(255,193,7,0.35))",
                  }}
                />
                {/* Subtitle */}
                <p className="text-center font-display font-bold uppercase tracking-[0.18em] text-white/80 mt-2 mb-1" style={{ fontSize: "clamp(0.7rem, 2vw, 1rem)" }}>
                  Taxi-Service Essen
                </p>

                {/* Slogan */}
                <div className="flex items-center justify-center gap-3 mt-2">
                  <div className="h-px w-8 bg-primary/50 shrink-0" />
                  <span className="text-[8px] font-light tracking-[0.35em] text-primary uppercase whitespace-nowrap">
                    {t("hero_tagline")}
                  </span>
                  <div className="h-px w-8 bg-primary/50 shrink-0" />
                </div>
              </motion.div>

              {/* ── Widget + Icons — rechtsbündig auf Desktop ── */}
              <div className="flex justify-center lg:justify-end mt-16 sm:mt-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-full lg:w-5/12"
                >
                  <HeroBookingWidget />

                  {/* Service Icons 3+3 under booking widget */}
                  <div className="mt-6 grid grid-cols-3 gap-x-2 gap-y-5">
                    {[
                      { src: "krankenfahrten.png",    label: t("hero_service2_title") },
                      { src: "geschaeftsfahrten.png", label: t("hero_service1_title") },
                      { src: "flughafentransfer.png", label: t("hero_service3_title") },
                      { src: "kurierdokumente.png",   label: t("hero_service4_title") },
                      { src: "kurierdienst.png",      label: t("hero_service5_title") },
                      { src: "hauszuhaus.png",        label: t("hero_service6_title") },
                    ].map(({ src, label }) => (
                      <div key={src} className="flex flex-col items-center text-center gap-2.5 group px-1">
                        <div className="h-16 flex items-center justify-center">
                          <img
                            src={`${import.meta.env.BASE_URL}icons/${src}`}
                            alt={label}
                            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            style={{ filter: "drop-shadow(0 0 8px rgba(255,193,7,0.5))" }}
                          />
                        </div>
                        <span className="text-[9px] font-black tracking-wide text-white/65 uppercase leading-tight group-hover:text-primary transition-colors">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decorative watermark */}
            <div className="absolute top-1/3 right-0 pointer-events-none opacity-[0.03] select-none hidden xl:block">
              <span className="font-display font-black leading-none" style={{ fontSize: "28vw" }}>B&B</span>
            </div>
          </section>
        </div>

        {/* ─── SERVICES ─── */}
        {/* Fixed video (at last frame) shines through as background */}
        <section id="leistungen" ref={servicesRef} className="py-24 lg:py-32 relative overflow-hidden" style={{ zIndex: 2 }}>
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
                { src: "icons/247.jpeg",        label: "24 Std., 7 Tage\ndie Woche",        delay: 0 },
                { src: "icons/grossraum7.jpeg", label: "Großraum-Taxi's\nfür 7 Personen",   delay: 0.2 },
                { src: "icons/bundesweit.jpeg", label: "Essen, Bundesweit\n& Ausland",       delay: 0.4 },
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
        <section id="geschichte" className="py-24 lg:py-40 relative" style={{ background: "hsl(220 18% 6%)", zIndex: 2 }}>
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
        <section id="bewertungen" className="py-20 sm:py-28 bg-background relative" style={{ zIndex: 2 }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-3">
                {t("reviews_title")}
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
        <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "hsl(220 18% 6%)", zIndex: 2 }}>
          <div className="absolute inset-0 opacity-[0.035]">
            <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,193,7,0.4) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tighter mb-4">
              {t("cta_title")}
            </h2>
            <p className="text-base sm:text-lg mb-10 max-w-xl mx-auto text-muted-foreground leading-relaxed">
              {t("cta_sub")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/book">
                <Button size="lg" className="text-base px-8 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                  {t("cta_btn")}
                </Button>
              </Link>
              <a href="tel:0201707060">
                <Button size="lg" variant="outline" className="text-base px-8 border-white/10 hover:bg-white/5">
                  {t("hero_call_btn")}
                </Button>
              </a>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
