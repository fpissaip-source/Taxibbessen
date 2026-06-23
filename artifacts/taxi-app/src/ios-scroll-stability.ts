const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

if (isIOS) {
  const ROOT_CLASS = "ios-scroll-stability";
  const HEADER_CLASS = "ios-stable-header";
  const HERO_SECTION_CLASS = "ios-stable-hero-section";
  const POSTER_CLASS = "ios-hero-poster-locked";

  document.documentElement.classList.add(ROOT_CLASS);

  const style = document.createElement("style");
  style.dataset.iosScrollStability = "true";
  style.textContent = `
    html.${ROOT_CLASS} header.${HEADER_CLASS} {
      position: fixed !important;
      inset: 0 0 auto 0 !important;
      width: 100% !important;
      height: 72px !important;
      min-height: 72px !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: visible !important;
      transform: translate3d(0, var(--ios-header-shift, 0px), 0) !important;
      -webkit-transform: translate3d(0, var(--ios-header-shift, 0px), 0) !important;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      will-change: transform;
      isolation: isolate;
    }

    html.${ROOT_CLASS} header.${HEADER_CLASS} > div.relative {
      position: absolute !important;
      top: 16px !important;
      right: 0 !important;
      left: 0 !important;
      height: 40px !important;
      min-height: 40px !important;
      transform: none !important;
      -webkit-transform: none !important;
    }

    html.${ROOT_CLASS} header.${HEADER_CLASS} > div.absolute {
      top: 0 !important;
      bottom: 0 !important;
      opacity: 0 !important;
      -webkit-backdrop-filter: none !important;
      backdrop-filter: none !important;
      background: transparent !important;
      mask-image: none !important;
      -webkit-mask-image: none !important;
      transform: none !important;
      -webkit-transform: none !important;
    }

    @media (max-width: 767px) {
      html.${ROOT_CLASS} header.${HEADER_CLASS} .animate-call-glow,
      html.${ROOT_CLASS} header.${HEADER_CLASS} .animate-call-glow-delay {
        display: none !important;
        animation: none !important;
      }

      html.${ROOT_CLASS} header.${HEADER_CLASS} a[href^="tel:"] .w-10.h-10 {
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        background: transparent !important;
        box-shadow: none !important;
        transition: none !important;
      }

      html.${ROOT_CLASS} header.${HEADER_CLASS} a[href^="tel:"] svg {
        color: hsl(45 100% 51%) !important;
        transition: none !important;
      }
    }

    html.${ROOT_CLASS} .${HERO_SECTION_CLASS} {
      min-height: 100lvh !important;
    }

    html.${ROOT_CLASS} img.${POSTER_CLASS} {
      opacity: 0 !important;
      transition: none !important;
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);

  let baselineViewportOffset: number | null = null;
  let baselineControlsTop: number | null = null;
  let manualCorrection = 0;
  let posterLocked = false;
  let posterMonitorId = 0;
  let scheduled = false;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const findImage = (fragment: string) =>
    Array.from(document.images).find(
      (image) => image.currentSrc.includes(fragment) || image.src.includes(fragment),
    );

  const getHeader = () => document.querySelector<HTMLElement>("header");

  const getHeaderControls = (header: HTMLElement) =>
    header.querySelector<HTMLElement>(":scope > div.relative");

  const applyHeaderShift = (header: HTMLElement) => {
    const viewportOffset = window.visualViewport?.offsetTop ?? 0;
    if (baselineViewportOffset === null) baselineViewportOffset = viewportOffset;

    const viewportCorrection = viewportOffset - baselineViewportOffset;
    const totalShift = clamp(viewportCorrection + manualCorrection, -80, 80);
    header.style.setProperty("--ios-header-shift", `${totalShift}px`);
  };

  const stabilizeHeader = () => {
    const header = getHeader();
    if (!header) return;

    header.classList.add(HEADER_CLASS);
    applyHeaderShift(header);

    const controls = getHeaderControls(header);
    if (!controls) return;

    requestAnimationFrame(() => {
      const currentTop = controls.getBoundingClientRect().top;
      if (baselineControlsTop === null) {
        baselineControlsTop = currentTop;
        return;
      }

      const drift = baselineControlsTop - currentTop;
      if (Math.abs(drift) < 0.35) return;

      manualCorrection = clamp(manualCorrection + drift, -80, 80);
      applyHeaderShift(header);
    });
  };

  const stabilizeHeroHeight = () => {
    const heroLogo = document.getElementById("hero-logo");
    heroLogo?.closest("section")?.classList.add(HERO_SECTION_CLASS);
  };

  const monitorHeroPoster = () => {
    if (posterLocked) return;

    const poster = findImage("hero-sharp");
    const sequence = findImage("hero-frames/");

    if (
      poster &&
      sequence &&
      sequence.complete &&
      sequence.naturalWidth > 0 &&
      Number.parseFloat(poster.style.opacity || "1") <= 0.05
    ) {
      sequence.decoding = "sync";
      void sequence.decode().catch(() => undefined).finally(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            poster.classList.add(POSTER_CLASS);
            posterLocked = true;
          });
        });
      });
      return;
    }

    posterMonitorId = requestAnimationFrame(monitorHeroPoster);
  };

  const scheduleRefresh = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      stabilizeHeader();
      stabilizeHeroHeight();
    });
  };

  const startPosterMonitor = () => {
    if (posterLocked || posterMonitorId) return;
    posterMonitorId = requestAnimationFrame(() => {
      posterMonitorId = 0;
      monitorHeroPoster();
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      scheduleRefresh();
      startPosterMonitor();
    },
    { passive: true },
  );
  window.addEventListener("resize", scheduleRefresh, { passive: true });
  window.visualViewport?.addEventListener("resize", scheduleRefresh, { passive: true });
  window.visualViewport?.addEventListener("scroll", scheduleRefresh, { passive: true });

  const observer = new MutationObserver(scheduleRefresh);
  observer.observe(document.body, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRefresh, { once: true });
  } else {
    scheduleRefresh();
  }
}