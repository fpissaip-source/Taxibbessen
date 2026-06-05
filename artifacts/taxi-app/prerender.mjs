import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist/public');
const CANONICAL_DOMAIN = 'https://taxibb-essen.de';

const HOMEPAGE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "de",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Welches Taxiunternehmen ist in Essen am zuverlässigsten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Taxi B&B GmbH in Essen ist seit 1992 bekannt für Zuverlässigkeit, Pünktlichkeit und Sauberkeit. Mit einer 5-Sterne-Bewertung und über 30 Jahren Erfahrung sind wir 24 Stunden täglich, 7 Tage die Woche für Sie erreichbar. Rufen Sie uns an: 0201 707060."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel kostet ein Taxi vom Essener Hauptbahnhof zum Flughafen Düsseldorf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Taxi von Essen Hauptbahnhof zum Flughafen Düsseldorf kostet bei Taxi B&B GmbH einen transparenten Festpreis – ohne böse Überraschungen. Die Strecke beträgt ca. 35–40 km. Für ein konkretes Angebot kontaktieren Sie uns: 0201 707060 oder via WhatsApp."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich ein Großraumtaxi für 7 Personen in Essen buchen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Taxi B&B GmbH bietet Großraumtaxis mit Mercedes V-Klasse für bis zu 7 Passagiere an – ideal für Familienausflüge, Gruppenreisen und Flughafentransfers. Kindersitze sind auf Anfrage verfügbar. Jetzt buchen: 0201 707060."
      }
    },
    {
      "@type": "Question",
      "name": "Bieten Sie Krankenfahrten und Dialysefahrten in Essen an?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Taxi B&B GmbH führt Krankenfahrten, Dialysefahrten und Fahrten zur Strahlentherapie in Essen und Umgebung durch. Wir arbeiten mit Krankenkassen zusammen und holen Sie pünktlich ab. Kontakt: 0201 707060."
      }
    },
    {
      "@type": "Question",
      "name": "Ist Taxi B&B GmbH 24 Stunden erreichbar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Taxi B&B GmbH ist 24 Stunden am Tag, 7 Tage die Woche und 365 Tage im Jahr für Sie erreichbar. Rufen Sie jederzeit an unter 0201 707060 oder schreiben Sie uns via WhatsApp."
      }
    },
    {
      "@type": "Question",
      "name": "Wie kann ich in Essen schnell ein Taxi bestellen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sie können bei Taxi B&B GmbH Essen auf drei Wegen buchen: (1) Anrufen: 0201 707060, (2) WhatsApp: direkt über den Button auf der Website, (3) Online-Formular: Zieladresse eingeben auf dieser Seite. Wir sind innerhalb weniger Minuten bei Ihnen."
      }
    },
    {
      "@type": "Question",
      "name": "Fahren Sie auch Langstrecken und ins Ausland?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Taxi B&B GmbH fährt bundesweit und ins europäische Ausland. Ob Amsterdam, Paris oder Wien – wir bringen Sie sicher ans Ziel. Festpreise auf Anfrage: 0201 707060."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Fahrzeuge hat Taxi B&B GmbH?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Taxi B&B GmbH betreibt eine moderne Flotte mit Mercedes-Fahrzeugen: den E-Klasse T-Modell Kombi für komfortable Alltagsfahrten, den Mercedes E 300 e Hybrid für emissionsfreie Fahrten und die Mercedes V-Klasse für Gruppen bis 7 Personen. Alle Fahrzeuge sind klimatisiert und regelmäßig gewartet."
      }
    }
  ]
};

const routes = [
  {
    path: '/',
    title: 'Taxi B&B GmbH Essen – 24/7 Taxiservice | 0201 707060',
    description: 'Ihr zuverlässiger Taxiservice in Essen seit 1992. Flughafentransfer Düsseldorf, Krankenfahrten, Großraumtaxi für 7 Personen. Jetzt buchen: 0201 707060.',
    schemaOrg: HOMEPAGE_FAQ_SCHEMA,
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
    title: 'Taxi buchen – Taxi B&B GmbH Essen | Online Buchung',
    description: 'Taxi in Essen einfach online buchen. Festpreis, sofortige Bestätigung, 24/7 verfügbar. Taxi B&B GmbH – 0201 707060.',
  },
  {
    path: '/fahrtstatus',
    title: 'Fahrtstatus – Taxi B&B GmbH Essen | Buchung verfolgen',
    description: 'Verfolgen Sie Ihren Fahrstatus bei Taxi B&B GmbH Essen. Buchungsnummer eingeben und Echtzeit-Status abrufen.',
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
];

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHeadTags(route) {
  const canonicalUrl = route.path === '/'
    ? CANONICAL_DOMAIN
    : `${CANONICAL_DOMAIN}${route.path}`;
  const title = escapeAttr(route.title);
  const desc = escapeAttr(route.description);

  const tags = [
    `    <link rel="canonical" href="${canonicalUrl}" />`,
    `    <meta property="og:url" content="${canonicalUrl}" />`,
    `    <meta property="og:title" content="${title}" />`,
    `    <meta property="og:description" content="${desc}" />`,
    `    <meta name="twitter:title" content="${title}" />`,
    `    <meta name="twitter:description" content="${desc}" />`,
  ];

  if (route.schemaOrg) {
    tags.push(
      `    <script type="application/ld+json">\n    ${JSON.stringify(route.schemaOrg, null, 2).replace(/\n/g, '\n    ')}\n    </script>`,
    );
  }

  return tags.join('\n');
}

function renderRoute(shellHtml, route) {
  let html = shellHtml;

  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeAttr(route.title)}</title>`,
  );

  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${escapeAttr(route.description)}$2`,
  );

  html = html.replace(
    /(<meta name="title" content=")[^"]*(")/,
    `$1${escapeAttr(route.title)}$2`,
  );

  const injection = buildHeadTags(route);
  html = html.replace('  </head>', `${injection}\n  </head>`);

  return html;
}

function main() {
  const shellPath = join(DIST, 'index.html');
  if (!existsSync(shellPath)) {
    console.error(`Build output not found: ${shellPath}`);
    console.error('Run `pnpm build` before prerendering.');
    process.exit(1);
  }

  const shell = readFileSync(shellPath, 'utf-8');

  for (const route of routes) {
    const rendered = renderRoute(shell, route);

    if (route.path === '/') {
      writeFileSync(shellPath, rendered, 'utf-8');
      console.log(`✓ /  →  dist/public/index.html`);
    } else {
      const dir = join(DIST, route.path.slice(1));
      mkdirSync(dir, { recursive: true });
      const outPath = join(dir, 'index.html');
      writeFileSync(outPath, rendered, 'utf-8');
      console.log(`✓ ${route.path}  →  dist/public${route.path}/index.html`);
    }
  }

  console.log(`\nPrerendered ${routes.length} routes.`);
}

main();
