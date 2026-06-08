const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ?? "";
const STORAGE_KEY = "taxi-bb-cookie-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function isGranted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
}

let gaLoaded = false;

function loadGAScript() {
  if (gaLoaded || !GA_ID) return;
  gaLoaded = true;
  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);
}

export function initGA() {
  if (!GA_ID) return;
  ensureGtag();
  window.gtag("js", new Date());
  window.gtag("consent", "default", { analytics_storage: "denied" });
  if (isGranted()) {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    loadGAScript();
    window.gtag("config", GA_ID, {
      page_path: window.location.pathname,
      anonymize_ip: true,
    });
  }
}

export function grantAnalytics() {
  if (!GA_ID) return;
  ensureGtag();
  window.gtag("consent", "update", { analytics_storage: "granted" });
  loadGAScript();
  window.gtag("config", GA_ID, {
    page_path: window.location.pathname,
    anonymize_ip: true,
  });
}

export function trackPageView(path: string) {
  if (!GA_ID || !isGranted()) return;
  ensureGtag();
  window.gtag("event", "page_view", { page_path: path });
}
