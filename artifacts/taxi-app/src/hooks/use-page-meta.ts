import { useEffect } from "react";

const CANONICAL_DOMAIN = "https://taxibbessen.de";

interface PageMeta {
  title: string;
  description: string;
  schemaOrg?: Record<string, unknown>;
  noindex?: boolean;
}

const DEFAULT_META = {
  title: "Taxi B&B GmbH Essen – 24/7 Taxiservice | 0201 707060",
  description: "Taxi B&B GmbH Essen – Ihr zuverlässiger Taxiservice seit 1992. Flughafentransfer Düsseldorf, Krankenfahrten, Großraumtaxi für 7 Personen. 24/7 erreichbar: 0201 707060.",
};

function setMetaContent(selector: string, createAttrs: [string, string], content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(createAttrs[0], createAttrs[1]);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, schemaOrg, noindex }: PageMeta) {
  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const canonicalUrl = path === "/" ? CANONICAL_DOMAIN : `${CANONICAL_DOMAIN}${path}`;

    document.title = title;

    setMetaContent('meta[name="description"]', ["name", "description"], description);

    // noindex pages: add noindex directive and strip canonical/OG/Twitter
    let noindexEl = document.querySelector<HTMLMetaElement>('meta[name="robots"][data-page-meta]');
    if (noindex) {
      if (!noindexEl) {
        noindexEl = document.createElement("meta");
        noindexEl.setAttribute("name", "robots");
        noindexEl.setAttribute("data-page-meta", "1");
        document.head.appendChild(noindexEl);
      }
      noindexEl.setAttribute("content", "noindex, nofollow");

      // Remove canonical/OG/Twitter for noindex pages to avoid stale tags
      document.querySelector('link[rel="canonical"]')?.removeAttribute("href");
      return () => {
        noindexEl?.remove();
        document.title = DEFAULT_META.title;
        setMetaContent('meta[name="description"]', ["name", "description"], DEFAULT_META.description);
      };
    } else {
      noindexEl?.remove();
    }

    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // hreflang — signals primary language (de) + x-default for crawlers
    const HREFLANG_LANGS = ["de", "x-default"] as const;
    for (const lang of HREFLANG_LANGS) {
      let hEl = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!hEl) {
        hEl = document.createElement("link");
        hEl.setAttribute("rel", "alternate");
        hEl.setAttribute("hreflang", lang);
        document.head.appendChild(hEl);
      }
      hEl.setAttribute("href", canonicalUrl);
    }

    setMetaContent('meta[property="og:url"]', ["property", "og:url"], canonicalUrl);
    setMetaContent('meta[property="og:title"]', ["property", "og:title"], title);
    setMetaContent('meta[property="og:description"]', ["property", "og:description"], description);

    setMetaContent('meta[name="twitter:title"]', ["name", "twitter:title"], title);
    setMetaContent('meta[name="twitter:description"]', ["name", "twitter:description"], description);

    let scriptEl = document.querySelector<HTMLScriptElement>('script[data-schema="page-specific"]');
    if (schemaOrg) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.setAttribute("type", "application/ld+json");
        scriptEl.setAttribute("data-schema", "page-specific");
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schemaOrg);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      document.title = DEFAULT_META.title;
      setMetaContent('meta[name="description"]', ["name", "description"], DEFAULT_META.description);
      setMetaContent('meta[property="og:title"]', ["property", "og:title"], DEFAULT_META.title);
      setMetaContent('meta[property="og:description"]', ["property", "og:description"], DEFAULT_META.description);
      setMetaContent('meta[name="twitter:title"]', ["name", "twitter:title"], DEFAULT_META.title);
      setMetaContent('meta[name="twitter:description"]', ["name", "twitter:description"], DEFAULT_META.description);
      document.querySelector<HTMLScriptElement>('script[data-schema="page-specific"]')?.remove();
    };
  }, [title, description, schemaOrg, noindex]);
}
