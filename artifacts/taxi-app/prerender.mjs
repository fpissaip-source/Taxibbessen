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

const NOSCRIPT_STYLE = 'font-family:sans-serif;max-width:800px;margin:2rem auto;padding:1rem;color:#111';
const CONTACT_BLOCK = `
        <h2>Kontakt</h2>
        <address>
          Taxi B&amp;B GmbH · Menzelstraße 8-10 · 45147 Essen<br>
          Telefon: <a href="tel:+4920170706">0201 707060</a><br>
          E-Mail: <a href="mailto:taxibb@outlook.com">taxibb@outlook.com</a>
        </address>`;

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
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Mercedes-Flotte in Essen – Limousinen, Kombis und Großraumtaxi für bis zu 7 Personen</h1>
        <p>Taxi B&amp;B GmbH betreibt eine moderne, gepflegte Fahrzeugflotte aus dem Hause Mercedes-Benz. Alle Fahrzeuge sind klimatisiert, regelmäßig gewartet und bieten höchsten Fahrkomfort. <a href="/book">Jetzt Fahrt buchen</a> oder <a href="/ueber-uns">mehr über uns erfahren</a>.</p>
        <h2>Mercedes E-Klasse Kombi</h2>
        <p>Unser Standardfahrzeug für Einzel- und Kleingruppenfahrten. Großzügiger Kofferraum, bequeme Sitze und modernste Sicherheitstechnik – ideal für <a href="https://www.dus.com">Flughafentransfers Düsseldorf</a> und Geschäftsreisen.</p>
        <h2>Mercedes E 300 e Hybrid</h2>
        <p>Unser umweltfreundlicher Hybrid-Taxi. Der E 300 e fährt im Stadtbereich rein elektrisch und reduziert so Emissionen und Lärm – ohne Abstriche beim Komfort.</p>
        <h2>Mercedes V-Klasse – Großraumtaxi für bis zu 7 Personen</h2>
        <p>Für Gruppen, Familien und Firmenreisende: Die V-Klasse bietet Platz für 7 Personen plus Gepäck. Kindersitze auf Anfrage verfügbar. Ideal für Flughafentransfers in der Gruppe. <a href="/book">Jetzt Großraumtaxi buchen</a>.</p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/ueber-uns',
    title: 'Über uns – Taxi B&B GmbH Essen | Seit 1992',
    description: 'Taxi B&B GmbH – Ihr Familienbetrieb in Essen seit 1992. 30+ Jahre Erfahrung, Festpreise, 24/7 Erreichbarkeit. Lernen Sie uns kennen.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Taxiunternehmen in Essen seit 1992 – Geschichte und Team</h1>
        <p>Taxi B&amp;B GmbH wurde 1992 in Essen gegründet. Wir sind kein anonymes Fahrdienst-Portal, kein Algorithmus und keine App, die Sie vergisst, sobald die Fahrt endet. Wir sind ein Essener Familienunternehmen – und das spürt man.</p>
        <h2>Unsere Geschichte</h2>
        <p>Taxi B&amp;B GmbH wurde 1992 in Essen gegründet – in einer Zeit, als ein Taxi noch mehr war als eine Fahrt von A nach B. Was damals mit einem Fahrzeug und dem festen Willen begann, Passagiere pünktlich, sicher und freundlich zu befördern, ist heute ein eingespieltes Team aus erfahrenen Fahrern, einer <a href="/fahrzeuge">gepflegten Mercedes-Flotte</a> und einem Kundenstamm, der uns seit Jahrzehnten treu ist.</p>
        <h2>Was uns ausmacht</h2>
        <ul>
          <li><strong>Pünktlichkeit:</strong> Wir holen Sie zur vereinbarten Zeit ab – ohne Ausreden.</li>
          <li><strong>Festpreise:</strong> Transparente Preise ohne böse Überraschungen. Kein Taxameter-Risiko bei Stau.</li>
          <li><strong>24/7 Erreichbarkeit:</strong> Tag und Nacht, 365 Tage im Jahr für Sie da: 0201 707060.</li>
          <li><strong>Erfahrung:</strong> Über 30 Jahre Taxiservice in Essen. Bewertungen auf <a href="https://www.provenexpert.com/de-de/taxi-bb-gmbh/">ProvenExpert</a>.</li>
        </ul>
        <p><a href="/book">Jetzt Fahrt buchen</a> oder telefonisch unter 0201 707060.</p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/book',
    title: 'Taxi buchen – Taxi B&B GmbH Essen | Online Buchung',
    description: 'Taxi in Essen einfach online buchen. Festpreis, sofortige Bestätigung, 24/7 verfügbar. Taxi B&B GmbH – 0201 707060.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Taxi online buchen in Essen – Festpreis, Flughafentransfer und Krankenfahrten</h1>
        <p>Buchen Sie Ihr Taxi in Essen schnell und einfach online. Wählen Sie Abholadresse, Ziel, Datum und Uhrzeit – wir bestätigen Ihre Buchung umgehend. <a href="/ueber-uns">Seit 1992</a> Ihr zuverlässiger Taxiservice.</p>
        <h2>So buchen Sie</h2>
        <ol>
          <li>Abholadresse und Ziel angeben</li>
          <li>Datum, Uhrzeit und Personenanzahl wählen</li>
          <li>Kontaktdaten eingeben und absenden</li>
          <li>Buchungsbestätigung per E-Mail erhalten</li>
        </ol>
        <h2>Oder direkt anrufen</h2>
        <p>Rund um die Uhr erreichbar: <a href="tel:+4920170706"><strong>0201 707060</strong></a>. Wir nehmen Ihre Buchung sofort entgegen.</p>
        <h2>Unsere Leistungen</h2>
        <ul>
          <li>Flughafentransfer <a href="https://www.dus.com">Düsseldorf</a>, Köln/Bonn, Frankfurt</li>
          <li>Krankenfahrten und Dialysefahrten</li>
          <li><a href="/fahrzeuge">Großraumtaxi für bis zu 7 Personen</a></li>
          <li>Privat- und Geschäftsfahrten</li>
          <li>Kurierdienst Essen</li>
        </ul>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/fahrtstatus',
    title: 'Fahrtstatus – Taxi B&B GmbH Essen | Buchung verfolgen',
    description: 'Verfolgen Sie Ihren Fahrstatus bei Taxi B&B GmbH Essen. Buchungsnummer eingeben und Echtzeit-Status abrufen.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Fahrtstatus prüfen – Ihre Taxibuchung bei Taxi B&B Essen verfolgen</h1>
        <p>Geben Sie Ihre Buchungsnummer ein, um den aktuellen Status Ihrer Taxifahrt bei Taxi B&amp;B GmbH Essen abzurufen.</p>
        <p>Sie haben keine Buchungsnummer zur Hand oder benötigen sofortige Auskunft? Rufen Sie uns direkt an:</p>
        <p><a href="tel:+4920170706"><strong>0201 707060</strong></a> – 24 Stunden, 7 Tage die Woche.</p>
        <p>Noch keine Fahrt gebucht? <a href="/book">Jetzt Taxi online buchen</a> oder <a href="/ueber-uns">mehr über uns erfahren</a>.</p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/confirmation',
    title: 'Buchungsbestätigung – Taxi B&B GmbH Essen',
    description: 'Ihre Buchung bei Taxi B&B GmbH wurde erfolgreich übermittelt.',
    noindex: true,
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Buchungsbestätigung – Taxi B&amp;B GmbH Essen</h1>
        <p>Ihre Buchungsanfrage wurde erfolgreich übermittelt. Sie erhalten in Kürze eine Bestätigung.</p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/impressum',
    title: 'Impressum – Taxi B&B GmbH Essen',
    description: 'Impressum der Taxi B&B GmbH Essen. Angaben gemäß § 5 TMG.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Impressum</h1>
        <p>Angaben gemäß § 5 TMG</p>
        <h2>Unternehmensangaben</h2>
        <address>
          Taxi B&amp;B GmbH<br>
          Vertreten durch: Lukman AL-Dlemy<br>
          Menzelstraße 8-10<br>
          45147 Essen<br>
          Telefon: <a href="tel:+4920170706">0201 707060</a><br>
          E-Mail: <a href="mailto:taxibb@outlook.com">taxibb@outlook.com</a>
        </address>
        <h2>Registereintrag</h2>
        <p>Eingetragen im Handelsregister. Registergericht: Amtsgericht Essen.</p>
        <h2>Aufsichtsbehörde</h2>
        <p>Stadt Essen, Ordnungsamt – Taxikonzession gemäß PBefG.</p>
        <h2>Haftungshinweis</h2>
        <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
      </article>`,
  },
  {
    path: '/datenschutz',
    title: 'Datenschutz – Taxi B&B GmbH Essen',
    description: 'Datenschutzerklärung der Taxi B&B GmbH Essen gemäß DSGVO. Informationen zur Verarbeitung Ihrer personenbezogenen Daten.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Datenschutzerklärung</h1>
        <p>Taxi B&amp;B GmbH – Essen · Gemäß DSGVO &amp; TDDDG</p>
        <h2>Verantwortlicher</h2>
        <address>
          Taxi B&amp;B GmbH<br>
          Menzelstraße 8-10, 45147 Essen<br>
          Telefon: <a href="tel:+4920170706">0201 707060</a><br>
          E-Mail: <a href="mailto:taxibb@outlook.com">taxibb@outlook.com</a>
        </address>
        <h2>Erhebung und Verarbeitung personenbezogener Daten</h2>
        <p>Wir erheben personenbezogene Daten nur, soweit dies zur Erbringung unserer Dienstleistungen erforderlich ist (z. B. Name, Adresse, Telefonnummer für Buchungen). Die Daten werden nicht an Dritte weitergegeben, es sei denn, dies ist zur Vertragserfüllung notwendig.</p>
        <h2>Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Wenden Sie sich dazu an: <a href="mailto:taxibb@outlook.com">taxibb@outlook.com</a>.</p>
        <h2>Cookies</h2>
        <p>Diese Website verwendet ausschließlich technisch notwendige Cookies und keine Tracking- oder Analyse-Cookies von Drittanbietern.</p>
      </article>`,
  },
  {
    path: '/agb',
    title: 'AGB – Taxi B&B GmbH Essen | Allgemeine Geschäftsbedingungen',
    description: 'Allgemeine Geschäftsbedingungen der Taxi B&B GmbH Essen für Taxifahrten und Beförderungsleistungen.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Allgemeine Geschäftsbedingungen</h1>
        <p>Taxi B&amp;B GmbH – Essen</p>
        <h2>§ 1 Geltungsbereich</h2>
        <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Beförderungsleistungen der Taxi B&amp;B GmbH, Menzelstraße 8-10, 45147 Essen.</p>
        <h2>§ 2 Vertragsschluss</h2>
        <p>Der Beförderungsvertrag kommt durch die Bestellung des Fahrgastes und die Annahme durch Taxi B&amp;B GmbH zustande. Die Buchung kann telefonisch, schriftlich oder über das Online-Formular erfolgen.</p>
        <h2>§ 3 Preise und Zahlung</h2>
        <p>Es gelten die jeweils gültigen Festpreise oder Tarifpreise gemäß dem amtlichen Taxitarif der Stadt Essen. Zahlungen sind in bar, per EC-Karte oder Kreditkarte möglich.</p>
        <h2>§ 4 Stornierung</h2>
        <p>Stornierungen sind bis 2 Stunden vor der vereinbarten Abholzeit kostenfrei. Bei kurzfristigeren Absagen können Stornogebühren anfallen.</p>
        <h2>§ 5 Haftung</h2>
        <p>Taxi B&amp;B GmbH haftet für Schäden im Rahmen der gesetzlichen Vorschriften des Personenbeförderungsgesetzes (PBefG). Für Gegenstände, die im Fahrzeug vergessen werden, übernehmen wir keine Haftung.</p>
        ${CONTACT_BLOCK}
      </article>`,
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

  if (route.noscriptBody) {
    html = html.replace(
      /<noscript>[\s\S]*?<\/noscript>/,
      `<noscript>\n      ${route.noscriptBody}\n    </noscript>`,
    );
  }

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
