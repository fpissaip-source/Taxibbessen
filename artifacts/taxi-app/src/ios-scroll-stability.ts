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
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      transform: translate3d(0, var(--ios-header-shift, 0px), 0) !important;
      -webkit-transform: translate3d(0, var(--ios-header-shift, 0px), 0) !important;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      will-change: transform;
      isolation: isolate;
    }

    html.${ROOT_CLASS} header.${HEADER_CLASS} > div.absolute {
      -webkit-backdrop-filter: none !important;
      backdrop-filter: none !important;
      background-color: rgba(0, 0, 0, 0.56) !important;
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
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

  let posterLocked = false;
  let scheduled = false;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const findImage = (fragment: string) =>
    Array.from(document.images).find(
      (image) => image.currentSrc.includes(fragment) || image.src.includes(fragment),
    );

  // Pin the header to the top of the *visible* area.
  //
  // `visualViewport.offsetTop` reflects how far the visible viewport is offset
  // from the layout viewport (e.g. while Safari's address/tool bar animates, or
  // during rubber-band overscroll / when the keyboard appears). We translate the
  // header by exactly that amount so it tracks the visible top instead of jumping.
  //
  // IMPORTANT: the shift is read DIRECTLY from offsetTop on every frame and never
  // accumulated. The previous implementation measured the header's own (already
  // shifted) position and added that "drift" back into the correction, which fed
  // into its own measurement and ran away to the clamp limit — dropping the header
  // into the middle of the screen. Reading offsetTop directly is self-correcting
  // and bounded, so it can never drift.
  const applyHeaderShift = (header: HTMLElement) => {
    const offsetTop = window.visualViewport?.offsetTop ?? 0;
    const shift = clamp(offsetTop, 0, 120);
    header.style.setProperty("--ios-header-shift", `${shift}px`);
  };

  const refresh = () => {
    scheduled = false;

    const header = document.querySelector<HTMLElement>("header");
    if (header) {
      header.classList.add(HEADER_CLASS);
      applyHeaderShift(header);
    }

    const heroLogo = document.getElementById("hero-logo");
    heroLogo?.closest("section")?.classList.add(HERO_SECTION_CLASS);

    if (posterLocked) return;

    const poster = findImage("hero-sharp");
    const sequence = findImage("hero-frames/");
    if (!poster || !sequence || !sequence.complete || sequence.naturalWidth === 0) return;

    const posterOpacity = Number.parseFloat(poster.style.opacity || "1");
    if (!Number.isFinite(posterOpacity) || posterOpacity > 0.05) return;

    sequence.decoding = "sync";
    void sequence.decode().catch(() => undefined).finally(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          poster.classList.add(POSTER_CLASS);
          posterLocked = true;
        });
      });
    });
  };

  const scheduleRefresh = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(refresh);
  };

  // Keep the header glued to the visible top in real time during scroll / bar
  // animation. This runs every frame the viewport moves but only writes a CSS
  // variable, so it stays cheap.
  const pinHeader = () => {
    const header = document.querySelector<HTMLElement>("header");
    if (header) applyHeaderShift(header);
  };

  window.addEventListener(
    "scroll",
    () => {
      pinHeader();
      scheduleRefresh();
    },
    { passive: true },
  );
  window.addEventListener("resize", scheduleRefresh, { passive: true });
  window.visualViewport?.addEventListener("resize", () => { pinHeader(); scheduleRefresh(); }, { passive: true });
  window.visualViewport?.addEventListener("scroll", pinHeader, { passive: true });

  const observer = new MutationObserver(scheduleRefresh);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "style"],
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRefresh, { once: true });
  } else {
    scheduleRefresh();
  }
}
