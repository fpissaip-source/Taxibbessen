export type PageMetaEntry = {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
};

export const PAGE_META_MANIFEST: PageMetaEntry[] = [
  {
    path: '/',
    title: 'Taxi B&B GmbH Essen – 24/7 Taxiservice | 0201 707060',
    description: 'Ihr zuverlässiger Taxiservice in Essen seit 1992. Flughafentransfer Düsseldorf, Krankenfahrten, Großraumtaxi für 7 Personen. Jetzt buchen: 0201 707060.',
  },
  {
    path: '/fahrzeuge',
    title: 'Unsere Fahrzeuge – Taxi B&B GmbH Essen | Mercedes Flotte',
    description: 'Moderne Mercedes-Flotte bei Taxi B&B GmbH: E-Klasse Kombi, E 300 e Hybrid und V-Klasse Großraumtaxi für bis zu 7 Personen. Komfortabel, klimatisiert, zuverlässig.',
  },
  {
    path: '/ueber-uns',
    title: 'Über uns – Taxi B&B GmbH Essen | Seit 1992',
    description: 'Taxi B&B GmbH – Ihr Familienbetrieb in Essen seit 1992. 30+ Jahre Erfahrung, Festpreise, 24/7 Erreichbarkeit. Lernen Sie uns kennen.',
  },
  {
    path: '/book',
    title: 'Taxi buchen – Taxi B&B GmbH Essen | Online Anfrage',
    description: 'Taxi in Essen einfach anfragen. Wir melden uns sofort. Taxi B&B GmbH – 0201 707060.',
  },
  {
    path: '/confirmation',
    title: 'Buchungsbestätigung – Taxi B&B GmbH Essen',
    description: 'Ihre Buchung bei Taxi B&B GmbH wurde erfolgreich übermittelt.',
    noindex: true,
  },
  {
    path: '/impressum',
    title: 'Impressum – Taxi B&B GmbH Essen',
    description: 'Impressum der Taxi B&B GmbH Essen. Angaben gemäß § 5 TMG.',
  },
  {
    path: '/datenschutz',
    title: 'Datenschutz – Taxi B&B GmbH Essen',
    description: 'Datenschutzerklärung der Taxi B&B GmbH Essen gemäß DSGVO. Informationen zur Verarbeitung Ihrer personenbezogenen Daten.',
  },
  {
    path: '/agb',
    title: 'AGB – Taxi B&B GmbH Essen | Allgemeine Geschäftsbedingungen',
    description: 'Allgemeine Geschäftsbedingungen der Taxi B&B GmbH Essen für Taxifahrten und Beförderungsleistungen.',
  },
  {
    path: '/fahrtstatus',
    title: 'Fahrtstatus – Taxi B&B GmbH Essen | Buchung verfolgen',
    description: 'Verfolgen Sie Ihren Fahrstatus bei Taxi B&B GmbH Essen. Buchungsnummer eingeben und Echtzeit-Status abrufen.',
    noindex: true,
  },

  // ── Service-Unterseiten ──────────────────────────────────────────────────
  {
    path: '/flughafentransfer-essen-duesseldorf',
    title: 'Flughafentransfer Essen Düsseldorf | Taxi B&B GmbH – 0201 707060',
    description: 'Zuverlässiger Flughafentransfer von Essen nach Düsseldorf, Köln/Bonn, Frankfurt und Dortmund. Festpreis, Flugverfolgung, 24/7. Taxi B&B GmbH – 0201 707060.',
  },
  {
    path: '/krankenfahrten-essen',
    title: 'Krankenfahrten Essen | Taxi B&B GmbH – Krankenkasse & Dialyse',
    description: 'Zuverlässige Krankenfahrten in Essen – Dialyse, Strahlentherapie, Arzttermine. Direkte Abrechnung mit der Krankenkasse. Taxi B&B GmbH – 0201 707060.',
  },
  {
    path: '/grossraumtaxi-essen',
    title: 'Großraumtaxi Essen – 7 Personen | Mercedes V-Klasse | Taxi B&B',
    description: 'Großraumtaxi Essen für bis zu 7 Personen mit Mercedes V-Klasse. Flughafentransfer, Gruppenfahrten, Kindersitze auf Anfrage. Taxi B&B GmbH – 0201 707060.',
  },
  {
    path: '/dialysefahrten-essen',
    title: 'Dialysefahrten Essen | Krankenkasse | Taxi B&B GmbH – 0201 707060',
    description: 'Zuverlässige Dialysefahrten in Essen – regelmäßig, pünktlich, direkte Abrechnung mit der Krankenkasse. Fester Fahrplan möglich. Taxi B&B GmbH – 0201 707060.',
  },
  {
    path: '/kurierdienst-essen',
    title: 'Kurierdienst Essen – Express & Diskret | Taxi B&B GmbH – 0201 707060',
    description: 'Schneller Kurierdienst in Essen – Dokumente, Pakete, vertrauliche Unterlagen. Express, diskret, zuverlässig. Taxi B&B GmbH – 24/7 erreichbar – 0201 707060.',
  },
  {
    path: '/taxi-essen-hbf',
    title: 'Taxi Essen Hauptbahnhof – 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi am Essen Hauptbahnhof – schnell, zuverlässig, 24/7 erreichbar. Vorbestellung empfohlen. Taxi B&B GmbH bringt Sie zu jedem Ziel in Essen und Umgebung.',
  },

  // ── Stadtteil-Unterseiten ────────────────────────────────────────────────
  {
    path: '/taxi-essen-holsterhausen',
    title: 'Taxi Essen-Holsterhausen | 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi in Essen-Holsterhausen – zuverlässig, 24/7, Festpreis. Flughafentransfer, Krankenfahrten, Großraumtaxi. Taxi B&B GmbH – Ihr lokaler Taxiservice.',
  },
  {
    path: '/taxi-essen-ruettenscheid',
    title: 'Taxi Essen-Rüttenscheid | 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi in Essen-Rüttenscheid – zuverlässig, 24/7, Festpreis. Flughafentransfer, Nachttaxi, Krankenfahrten. Taxi B&B GmbH – Ihr lokaler Taxiservice im Rü.',
  },
  {
    path: '/taxi-essen-frohnhausen',
    title: 'Taxi Essen-Frohnhausen | 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi in Essen-Frohnhausen – zuverlässig, 24/7, Festpreis. Flughafentransfer, Krankenfahrten, Großraumtaxi. Taxi B&B GmbH – Ihr lokaler Taxiservice.',
  },
  {
    path: '/taxi-essen-suedviertel',
    title: 'Taxi Essen-Südviertel | 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi in Essen-Südviertel – zuverlässig, 24/7, Festpreis. Flughafentransfer Düsseldorf, Krankenfahrten, Großraumtaxi. Taxi B&B GmbH – Ihr lokaler Service.',
  },
];

export function getPageMeta(path: string): PageMetaEntry {
  const entry = PAGE_META_MANIFEST.find((m) => m.path === path);
  if (!entry) {
    throw new Error(
      `Kein Eintrag in page-meta-manifest.ts für Pfad: "${path}". Bitte dort ergänzen.`,
    );
  }
  return entry;
}
