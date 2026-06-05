import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist/public');
const CANONICAL_DOMAIN = 'https://taxibbessen.de';

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
        "text": "Taxi B&B GmbH ist seit 1992 für Pünktlichkeit und Zuverlässigkeit bekannt – mit 5-Sterne-Bewertungen und 30+ Jahren Erfahrung. Wir sind 24/7 für Sie da: 0201 707060."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel kostet ein Taxi zum Flughafen Düsseldorf aus Essen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir berechnen transparente Festpreise ohne böse Überraschungen. Die Strecke Essen–Flughafen Düsseldorf beträgt ca. 35–40 km. Rufen Sie uns für ein konkretes Angebot an: 0201 707060."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich ein Großraumtaxi für 7 Personen buchen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Unsere Mercedes V-Klasse bietet Platz für bis zu 7 Personen – ideal für Gruppen, Familien und Firmenausflüge. Kindersitze auf Anfrage. Jetzt buchen: 0201 707060."
      }
    },
    {
      "@type": "Question",
      "name": "Bieten Sie Krankenfahrten und Dialysefahrten an?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, wir führen Krankenfahrten, Dialysefahrten und Therapiefahrten in Essen und Umgebung durch. Wir arbeiten mit Krankenkassen zusammen und holen Sie pünktlich ab."
      }
    },
    {
      "@type": "Question",
      "name": "Ist Taxi B&B GmbH wirklich 24 Stunden erreichbar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolut – 24 Stunden, 7 Tage die Woche, 365 Tage im Jahr. Egal ob Nachtflug oder Frühschicht: Wir sind da. Rufen Sie einfach an: 0201 707060."
      }
    },
    {
      "@type": "Question",
      "name": "Fahren Sie auch ins Ausland oder bundesweit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Wir fahren bundesweit und ins europäische Ausland. Amsterdam, Zürich, Wien – kein Problem. Festpreise auf Anfrage."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Fahrzeuge hat Taxi B&B GmbH?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unsere Flotte umfasst den Mercedes E-Klasse Kombi, den Mercedes E 300 e Hybrid (elektrisch) und die Mercedes V-Klasse für Gruppen. Alle Fahrzeuge sind klimatisiert und regelmäßig gewartet."
      }
    },
    {
      "@type": "Question",
      "name": "Wie schnell kommt das Taxi nach meiner Bestellung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In der Regel sind wir innerhalb weniger Minuten bei Ihnen in Essen. Rufen Sie uns an oder buchen Sie direkt über das Formular auf dieser Seite."
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

  const tags = [];

  if (route.noindex) {
    tags.push(`    <meta name="robots" content="noindex, nofollow" />`);
  } else {
    tags.push(
      `    <link rel="canonical" href="${canonicalUrl}" />`,
      `    <meta property="og:url" content="${canonicalUrl}" />`,
      `    <meta property="og:title" content="${title}" />`,
      `    <meta property="og:description" content="${desc}" />`,
      `    <meta name="twitter:title" content="${title}" />`,
      `    <meta name="twitter:description" content="${desc}" />`,
    );
  }

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
