import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  schemaOrg?: Record<string, unknown>;
}

const TAXI_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "Taxi B&B GmbH Essen",
  "alternateName": "Taxi B&B",
  "description": "Ihr zuverlässiger Taxiservice in Essen seit 1992. Flughafentransfer Düsseldorf & Köln, Krankenfahrten, Großraumtaxi bis 7 Personen. 24/7 erreichbar.",
  "url": "https://taxi-bb-essen.de",
  "telephone": "+4920170706 0",
  "email": "info@taxi-bb-essen.de",
  "foundingDate": "1992",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, EC-Karte",
  "areaServed": [
    { "@type": "City", "name": "Essen" },
    { "@type": "City", "name": "Düsseldorf" },
    { "@type": "City", "name": "Köln" },
    { "@type": "State", "name": "Nordrhein-Westfalen" }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Borbecker Straße 72",
    "addressLocality": "Essen",
    "postalCode": "45355",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.4556,
    "longitude": 6.9937
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Taxiservices",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Flughafentransfer Düsseldorf" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Krankenfahrten & Rollstuhlservice" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Großraumtaxi bis 7 Personen" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Kurierfahrten & Geschäftsreisen" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.google.com/maps?cid=taxi-bb-essen"
  ]
};

const DEFAULT_META = {
  title: "Taxi B&B GmbH Essen – 24/7 Taxiservice | 0201 707060",
  description: "Taxi B&B GmbH Essen – Ihr zuverlässiger Taxiservice seit 1992. Flughafentransfer Düsseldorf, Krankenfahrten, Großraumtaxi für 7 Personen. 24/7 erreichbar: 0201 707060.",
};

export function usePageMeta({ title, description, schemaOrg }: PageMeta) {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    const schema = schemaOrg ?? TAXI_SERVICE_SCHEMA;
    let scriptEl = document.querySelector<HTMLScriptElement>('script[data-schema="taxiservice"]');
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.setAttribute("type", "application/ld+json");
      scriptEl.setAttribute("data-schema", "taxiservice");
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schema);

    return () => {
      document.title = DEFAULT_META.title;
      if (metaDesc) metaDesc.setAttribute("content", DEFAULT_META.description);
    };
  }, [title, description, schemaOrg]);
}
