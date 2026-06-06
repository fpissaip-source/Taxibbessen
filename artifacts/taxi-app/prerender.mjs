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

  // ── Service-Unterseiten ──────────────────────────────────────────────────
  {
    path: '/flughafentransfer-essen-duesseldorf',
    title: 'Flughafentransfer Essen Düsseldorf | Taxi B&B GmbH – 0201 707060',
    description: 'Zuverlässiger Flughafentransfer von Essen nach Düsseldorf, Köln/Bonn, Frankfurt und Dortmund. Festpreis, Flugverfolgung, 24/7. Taxi B&B GmbH – 0201 707060.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Flughafentransfer Essen Düsseldorf – Pünktlich &amp; Komfortabel</h1>
        <p>Taxi B&amp;B GmbH bringt Sie bequem und pünktlich von Essen zu allen wichtigen Flughäfen der Region. Die beliebteste Strecke ist der Flughafentransfer Essen–Düsseldorf (DUS) mit ca. 35–40 km Entfernung. Wir fahren Sie auch zum Flughafen Köln/Bonn (CGN), Dortmund (DTM) und Frankfurt (FRA). Festpreise, keine bösen Überraschungen. Einfach anrufen oder <a href="/book">online buchen</a>.</p>
        <h2>Von Essen zu allen großen Flughäfen</h2>
        <p>Ob Düsseldorf, Köln/Bonn, Frankfurt oder Dortmund – wir fahren Sie zu jedem Flughafen in der Region. Unsere klimatisierte Mercedes-Flotte sorgt für maximalen Komfort auf jeder Strecke. Für Gruppen steht unsere <a href="/grossraumtaxi-essen">Mercedes V-Klasse</a> mit bis zu 7 Sitzplätzen bereit.</p>
        <h2>Flugverfolgung &amp; kostenlose Wartezeit</h2>
        <p>Ihr Flug hat Verspätung? Kein Problem. Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit automatisch an. Wartezeit durch Flugverspätungen ist kostenlos – wir sind da, wenn Sie ankommen. Bei der Ankunft stehen wir mit Ihrem Namen am Terminal.</p>
        <h2>Warum Taxi B&amp;B für den Flughafentransfer?</h2>
        <ul>
          <li>Festpreis: Kein Taxameter, kein Staurisiko – Preis ist vorher bekannt.</li>
          <li>24/7 erreichbar: Früher Abflug um 4 Uhr oder Spätlandung um Mitternacht – wir sind da.</li>
          <li>Seit 1992: Über 30 Jahre Erfahrung in Essen und der gesamten Region.</li>
          <li>Mercedes-Flotte: Klimatisiert, gepflegt, komfortabel für jede Strecke.</li>
          <li>Kindersitze auf Anfrage für Familien mit Kindern.</li>
        </ul>
        <h2>Großraumtaxi für Gruppen &amp; viel Gepäck</h2>
        <p>Reisen Sie mit Familie, Kollegen oder viel Gepäck? Unsere Mercedes V-Klasse fasst bis zu 7 Personen und hat reichlich Kofferraumplatz. Ideal für Gruppenreisen, Firmendelegationen oder Familien mit Kinderwagen. Jetzt <a href="/book">online buchen</a> oder anrufen: 0201 707060.</p>
        <h2>Weitere Leistungen</h2>
        <p><a href="/krankenfahrten-essen">Krankenfahrten Essen</a> · <a href="/grossraumtaxi-essen">Großraumtaxi Essen</a> · <a href="/kurierdienst-essen">Kurierdienst Essen</a></p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/krankenfahrten-essen',
    title: 'Krankenfahrten Essen | Taxi B&B GmbH – Krankenkasse & Dialyse',
    description: 'Zuverlässige Krankenfahrten in Essen – Dialyse, Strahlentherapie, Arzttermine. Direkte Abrechnung mit der Krankenkasse. Taxi B&B GmbH – 0201 707060.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Krankenfahrten Essen – Zuverlässig &amp; mit Krankenkassenabrechnung</h1>
        <p>Taxi B&amp;B GmbH führt alle gesetzlich genehmigten Krankenfahrten in Essen und Umgebung durch. Wir rechnen direkt mit Ihrer Krankenkasse ab – kein bürokratischer Aufwand für Sie. Sie benötigen lediglich eine gültige Verordnung Ihres Arztes. Wir sind für alle gesetzlichen Krankenversicherungen zugelassen und kennen die Abrechnungsprozesse genau.</p>
        <h2>Für welche Fahrten eignet sich unser Service?</h2>
        <ul>
          <li>Dialysefahrten – regelmäßig, pünktlich, verlässlich</li>
          <li>Strahlentherapie und Chemotherapie – einfühlsam und diskret</li>
          <li>Arzttermine und Facharztkliniken – in Essen und Umgebung</li>
          <li>Rehakliniken und Physiotherapie – bequem Tür zu Tür</li>
          <li>Krankenhausaufnahme und Entlassung – wir sind pünktlich da</li>
        </ul>
        <h2>Unsere Fahrer – einfühlsam und erfahren</h2>
        <p>Unsere Fahrer kennen die Kliniken, Dialysezentren und Arztpraxen in Essen und der gesamten Region. Pünktlichkeit und Einfühlsamkeit stehen bei uns an erster Stelle – gerade bei Patienten, die auf regelmäßige Fahrten angewiesen sind. Wir holen Sie direkt an Ihrer Haustür ab und begleiten Sie auf Wunsch bis zur Eingangstür.</p>
        <h2>Krankenfahrten in Essen buchen</h2>
        <p>Rufen Sie uns einfach an unter 0201 707060 – wir sind 24/7 erreichbar. Sie können Ihre Krankenfahrt auch <a href="/book">online vorbuchen</a>. Für regelmäßige Fahrten (z. B. wöchentliche Dialyse) richten wir gerne einen festen Fahrplan ein. Weitere Informationen: <a href="/dialysefahrten-essen">Dialysefahrten Essen</a>.</p>
        <h2>Weitere Leistungen</h2>
        <p><a href="/dialysefahrten-essen">Dialysefahrten Essen</a> · <a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer Essen</a> · <a href="/grossraumtaxi-essen">Großraumtaxi Essen</a></p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/grossraumtaxi-essen',
    title: 'Großraumtaxi Essen – 7 Personen | Mercedes V-Klasse | Taxi B&B',
    description: 'Großraumtaxi Essen für bis zu 7 Personen mit Mercedes V-Klasse. Flughafentransfer, Gruppenfahrten, Kindersitze auf Anfrage. Taxi B&B GmbH – 0201 707060.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Großraumtaxi Essen – Mercedes V-Klasse für bis zu 7 Personen</h1>
        <p>Unser Großraumtaxi in Essen ist die Mercedes V-Klasse – mit Platz für bis zu 7 Personen und reichlich Kofferraumplatz. Ob Familie mit Kindern, Reisegruppe oder Firmenteam: Sie reisen bequem, klimatisiert und ohne Stress. Das Fahrzeug ist regelmäßig gewartet und gepflegt. Einfach anrufen: 0201 707060 oder <a href="/book">online buchen</a>.</p>
        <h2>Wann brauchen Sie ein Großraumtaxi?</h2>
        <ul>
          <li>Flughafentransfer für Gruppen – alle kommen gemeinsam an</li>
          <li>Familienausflüge – mit Kindersitzen und Kinderwagen</li>
          <li>Firmenfahrten und Delegationen – professionell und diskret</li>
          <li>Hochzeiten und Events – stilvoll und pünktlich</li>
          <li>Gruppenreisen – gemeinsam zum Bahnhof, Konzert oder Hotel</li>
        </ul>
        <h2>Kindersitze &amp; Sonderausstattung</h2>
        <p>Für Familien mit kleinen Kindern stellen wir auf Anfrage Kindersitze bereit. Bitte geben Sie bei der Buchung Alter und Gewicht der Kinder an. Haben Sie besondere Anforderungen – zum Beispiel Platz für einen Rollator oder Sportgeräte? Sprechen Sie uns an – wir finden eine Lösung.</p>
        <h2>Großraumtaxi für den Flughafentransfer</h2>
        <p>Der häufigste Buchungswunsch: <a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer nach Düsseldorf</a> mit der ganzen Gruppe. Wir fahren komfortabel, pünktlich und zum Festpreis – egal ob früh morgens oder spät nachts. Kindersitze auf Anfrage verfügbar.</p>
        <h2>Weitere Leistungen</h2>
        <p><a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer Essen</a> · <a href="/krankenfahrten-essen">Krankenfahrten Essen</a> · <a href="/kurierdienst-essen">Kurierdienst Essen</a></p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/dialysefahrten-essen',
    title: 'Dialysefahrten Essen | Krankenkasse | Taxi B&B GmbH – 0201 707060',
    description: 'Zuverlässige Dialysefahrten in Essen – regelmäßig, pünktlich, direkte Abrechnung mit der Krankenkasse. Fester Fahrplan möglich. Taxi B&B GmbH – 0201 707060.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Dialysefahrten Essen – Regelmäßig, Pünktlich &amp; Zuverlässig</h1>
        <p>Dialysepatienten sind auf zuverlässige, regelmäßige Fahrten angewiesen – meist dreimal pro Woche, immer zur gleichen Zeit. Taxi B&amp;B GmbH übernimmt diese Verantwortung mit Sorgfalt und Pünktlichkeit. Wir kennen die Dialysezentren und Kliniken in Essen und Umgebung genau. Anrufen: 0201 707060 oder <a href="/book">online buchen</a>.</p>
        <h2>Direkte Abrechnung mit der Krankenkasse</h2>
        <p>Dialysefahrten werden in der Regel von der gesetzlichen Krankenversicherung übernommen. Wir rechnen direkt mit Ihrer Krankenkasse ab – kein Vorschuss, keine Erstattungsanträge für Sie. Sie benötigen eine gültige ärztliche Verordnung zur Krankenbeförderung. Sprechen Sie uns an, wenn Sie Fragen zum Ablauf oder zur Genehmigung haben.</p>
        <h2>Fester Fahrplan &amp; persönlicher Fahrer</h2>
        <p>Für regelmäßige Dialysefahrten richten wir gerne einen festen Fahrplan für Sie ein. So wissen Sie immer, wann wir kommen – ohne jedes Mal neu anrufen zu müssen. Viele unserer Dialysepatienten werden seit Jahren von denselben Fahrern betreut. Unsere Fahrer sind einfühlsam, geduldig und helfen beim Ein- und Aussteigen.</p>
        <h2>Dialysefahrten in Essen, Bochum und Gelsenkirchen</h2>
        <p>Wir fahren in alle Dialysezentren in Essen und der gesamten Region – auch in Bochum, Gelsenkirchen und Duisburg. Rufen Sie uns an: 0201 707060. Weitere Informationen: <a href="/krankenfahrten-essen">Krankenfahrten Essen</a>.</p>
        <h2>Weitere Leistungen</h2>
        <p><a href="/krankenfahrten-essen">Krankenfahrten Essen</a> · <a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer Essen</a> · <a href="/grossraumtaxi-essen">Großraumtaxi Essen</a></p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/kurierdienst-essen',
    title: 'Kurierdienst Essen – Express & Diskret | Taxi B&B GmbH – 0201 707060',
    description: 'Schneller Kurierdienst in Essen – Dokumente, Pakete, vertrauliche Unterlagen. Express, diskret, zuverlässig. Taxi B&B GmbH – 24/7 erreichbar – 0201 707060.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Kurierdienst Essen – Schnell, Diskret &amp; Zuverlässig</h1>
        <p>Taxi B&amp;B GmbH übernimmt für Sie Express-Kurierfahrten in Essen und der gesamten Region. Wir liefern direkt von Absender zu Empfänger – ohne Umwege, ohne Wartezeiten. Ideal für Unternehmen, Kanzleien, Arztpraxen und Privatpersonen mit zeitkritischen Sendungen. Wir sind 24/7 erreichbar. Rufen Sie an: 0201 707060 oder <a href="/book">online buchen</a>.</p>
        <h2>Was wir transportieren</h2>
        <ul>
          <li>Vertragsdokumente und Rechtsakten – diskret und sicher</li>
          <li>Unternehmenspakete und Muster – pünktlich beim Empfänger</li>
          <li>Medizinische Proben und Unterlagen – mit Sorgfalt</li>
          <li>Schlüssel, Ersatzteile, Kleinlieferungen – schnell und direkt</li>
          <li>Persönliche Gegenstände – diskret und vertraulich</li>
        </ul>
        <h2>Diskretion &amp; Verlässlichkeit</h2>
        <p>Vertraulichkeit steht bei uns an erster Stelle. Alle Kurierfahrten werden diskret und professionell durchgeführt. Wir unterzeichnen auf Wunsch Verschwiegenheitserklärungen für sensible Sendungen. Jede Sendung wird persönlich übergeben – keine Paketautomaten, keine anonymen Abgaben.</p>
        <h2>Kurierdienst in Essen und Region</h2>
        <p>Wir liefern auch in Bochum, Gelsenkirchen, Duisburg, Dortmund und der gesamten Region. Bundesweite Kurierfahrten auf Anfrage. Für regelmäßige Kurierfahrten bieten wir auch Rahmenverträge an. Anrufen: 0201 707060.</p>
        <h2>Weitere Leistungen</h2>
        <p><a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer Essen</a> · <a href="/grossraumtaxi-essen">Großraumtaxi Essen</a> · <a href="/krankenfahrten-essen">Krankenfahrten Essen</a></p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/taxi-essen-hbf',
    title: 'Taxi Essen Hauptbahnhof – 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi am Essen Hauptbahnhof – schnell, zuverlässig, 24/7 erreichbar. Vorbestellung empfohlen. Taxi B&B GmbH bringt Sie zu jedem Ziel in Essen und Umgebung.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Taxi Essen Hauptbahnhof – Immer da wenn Sie ankommen</h1>
        <p>Der Essen Hauptbahnhof ist einer der wichtigsten Verkehrsknotenpunkte im Ruhrgebiet – hier kommen täglich tausende Reisende an. Taxi B&amp;B GmbH ist 24 Stunden am Tag erreichbar und bringt Sie vom Essen HBF schnell und bequem zu Ihrem Ziel. Ob Hotel, Geschäftstermin, Messe oder Privatadresse – wir kennen Essen und bringen Sie ohne Umwege dorthin. Rufen Sie an: 0201 707060 oder <a href="/book">online vorbestellen</a>.</p>
        <h2>Vom Essen HBF zu allen Zielen</h2>
        <ul>
          <li>Hotels in Essen – z. B. Mövenpick, Sheraton, ATLANTIC</li>
          <li>Messe Essen – direkte Fahrt zur Messe und zurück</li>
          <li>Flughafen Düsseldorf – komfortabler Weiterflug-Transfer</li>
          <li>Stadtteile Essen – Rüttenscheid, Holsterhausen, Frohnhausen und mehr</li>
          <li>Kliniken und Arztpraxen – Universitätsklinikum, St. Josef-Krankenhaus</li>
        </ul>
        <h2>Vorbestellung – Ihr Taxi wartet auf Sie</h2>
        <p>Reisen Sie mit dem ICE oder RE nach Essen? Bestellen Sie Ihr Taxi einfach im Voraus – rufen Sie uns an oder buchen Sie online. Wir stehen pünktlich bei Ihrer Ankunft bereit. Mit Angabe Ihrer Zugnummer können wir Verspätungen einkalkulieren. Kein Warten, kein Suchen – Ihr Fahrer erwartet Sie direkt am Ausgang.</p>
        <h2>Auch mit Gepäck kein Problem</h2>
        <p>Großer Koffer, Sporttasche oder Kinderwagen? Unser Fahrer hilft Ihnen gerne beim Verladen. Für Gruppen steht unsere <a href="/grossraumtaxi-essen">Mercedes V-Klasse</a> mit bis zu 7 Sitzplätzen bereit. Weitere Stadtteile: <a href="/taxi-essen-ruettenscheid">Rüttenscheid</a> · <a href="/taxi-essen-holsterhausen">Holsterhausen</a>.</p>
        <h2>Weitere Leistungen</h2>
        <p><a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer Essen</a> · <a href="/grossraumtaxi-essen">Großraumtaxi Essen</a> · <a href="/krankenfahrten-essen">Krankenfahrten Essen</a></p>
        ${CONTACT_BLOCK}
      </article>`,
  },

  // ── Stadtteil-Unterseiten ────────────────────────────────────────────────
  {
    path: '/taxi-essen-holsterhausen',
    title: 'Taxi Essen-Holsterhausen | 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi in Essen-Holsterhausen – zuverlässig, 24/7, Festpreis. Flughafentransfer, Krankenfahrten, Großraumtaxi. Taxi B&B GmbH – Ihr lokaler Taxiservice.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Taxi Holsterhausen – Ihr Taxiservice in Essen-Holsterhausen</h1>
        <p>Taxi B&amp;B GmbH ist Ihr zuverlässiger Taxiservice direkt in Essen-Holsterhausen. Unser Unternehmen sitzt in der Menzelstraße 8–10 – mitten im Stadtgebiet und damit schnell bei Ihnen. Wir kennen Holsterhausen und die umliegenden Straßen wie unsere Westentasche. Von der Abholung an der Haustür bis zur Ankunft am Ziel – wir bringen Sie komfortabel und pünktlich dorthin. 24 Stunden am Tag, 7 Tage die Woche. Rufen Sie an: 0201 707060 oder <a href="/book">online buchen</a>.</p>
        <h2>Typische Fahrtziele aus Holsterhausen</h2>
        <ul>
          <li>Flughafen Düsseldorf (DUS) – ca. 35–40 km, Festpreis auf Anfrage</li>
          <li>Essen Hauptbahnhof – schnelle Verbindung in die Innenstadt</li>
          <li>Universitätsklinikum Essen – für Arzttermine und Behandlungen</li>
          <li>Messe Essen – für Besucher und Aussteller</li>
          <li>Rüttenscheid, Frohnhausen, Stadtmitte – alle Stadtteile erreichbar</li>
        </ul>
        <h2>Krankenfahrten &amp; Dialyse in Holsterhausen</h2>
        <p>Wir übernehmen <a href="/krankenfahrten-essen">Krankenfahrten</a> und <a href="/dialysefahrten-essen">Dialysefahrten</a> aus Holsterhausen mit direkter Abrechnung bei Ihrer Krankenkasse. Gerne richten wir auch einen festen Fahrplan für regelmäßige Termine ein. Für Gruppen steht unsere <a href="/grossraumtaxi-essen">Mercedes V-Klasse</a> mit bis zu 7 Sitzplätzen bereit.</p>
        <h2>Weitere Stadtteile &amp; Leistungen</h2>
        <p><a href="/taxi-essen-ruettenscheid">Taxi Rüttenscheid</a> · <a href="/taxi-essen-frohnhausen">Taxi Frohnhausen</a> · <a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer Essen</a></p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/taxi-essen-ruettenscheid',
    title: 'Taxi Essen-Rüttenscheid | 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi in Essen-Rüttenscheid – zuverlässig, 24/7, Festpreis. Flughafentransfer, Nachttaxi, Krankenfahrten. Taxi B&B GmbH – Ihr lokaler Taxiservice im Rü.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Taxi Rüttenscheid – Ihr Taxiservice in Essen-Rüttenscheid</h1>
        <p>Essen-Rüttenscheid ist eines der beliebtesten Viertel der Stadt – bekannt für seine Restaurants, Cafés und das lebhafte Nachtleben auf der Rüttenscheider Straße. Taxi B&amp;B GmbH ist Ihr verlässlicher Partner für alle Fahrten im und aus dem Rü. Ob nach dem Restaurantbesuch nach Hause, zum Flughafen oder zum Arzttermin – wir sind rund um die Uhr für Sie erreichbar. Rufen Sie an: 0201 707060 oder <a href="/book">online buchen</a>.</p>
        <h2>Beliebte Fahrtziele aus Rüttenscheid</h2>
        <ul>
          <li>Flughafen Düsseldorf – ca. 35 km, Festpreis auf Anfrage</li>
          <li>Essen Hauptbahnhof – schnelle Verbindung</li>
          <li>Museum Folkwang – für Kulturbegeisterte</li>
          <li>Universitätsklinikum Essen – für Behandlungen und Arzttermine</li>
          <li>Holsterhausen, Frohnhausen, Stadtmitte – alle Stadtteile erreichbar</li>
        </ul>
        <h2>Nachttaxi &amp; Abholservice in Rüttenscheid</h2>
        <p>Genießen Sie das Nachtleben auf der Rüttenscheider Straße und kommen Sie sicher nach Hause? Wir fahren 24 Stunden, auch nachts und am Wochenende. Ein kurzer Anruf genügt – wir sind schnell bei Ihnen. Für Gruppen steht unsere <a href="/grossraumtaxi-essen">Mercedes V-Klasse</a> mit bis zu 7 Sitzplätzen bereit – perfekt nach einem gemeinsamen Abend im Restaurant.</p>
        <h2>Weitere Stadtteile &amp; Leistungen</h2>
        <p><a href="/taxi-essen-holsterhausen">Taxi Holsterhausen</a> · <a href="/taxi-essen-frohnhausen">Taxi Frohnhausen</a> · <a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer Essen</a></p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/taxi-essen-frohnhausen',
    title: 'Taxi Essen-Frohnhausen | 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi in Essen-Frohnhausen – zuverlässig, 24/7, Festpreis. Flughafentransfer, Krankenfahrten, Großraumtaxi. Taxi B&B GmbH – Ihr lokaler Taxiservice.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Taxi Frohnhausen – Ihr Taxiservice in Essen-Frohnhausen</h1>
        <p>Taxi B&amp;B GmbH ist Ihr verlässlicher Taxiservice in Essen-Frohnhausen. Wir kennen den Stadtteil und seine Straßen genau und sind schnell bei Ihnen – egal ob tagsüber oder nachts. Von Frohnhausen aus fahren wir Sie zu allen Zielen in Essen und darüber hinaus – zum Flughafen, zum Arzt, zum Bahnhof oder einfach nach Hause. 24/7 erreichbar. Rufen Sie an: 0201 707060 oder <a href="/book">online buchen</a>.</p>
        <h2>Häufige Fahrtziele aus Frohnhausen</h2>
        <ul>
          <li>Flughafen Düsseldorf – Festpreis, komfortabel und pünktlich</li>
          <li>Essen Hauptbahnhof – schnelle Verbindung für Zugreisende</li>
          <li>Holsterhausen und Stadtmitte – kurze Wege in der Nachbarschaft</li>
          <li>Kliniken und Arztpraxen – für Krankenfahrten und Therapietermine</li>
          <li>Einkaufszentren – Limbecker Platz, Shoppingcenter West</li>
        </ul>
        <h2>Krankenfahrten &amp; Dialyse aus Frohnhausen</h2>
        <p>Wir übernehmen <a href="/krankenfahrten-essen">Krankenfahrten</a> und <a href="/dialysefahrten-essen">Dialysefahrten</a> mit direkter Abrechnung bei Ihrer Krankenkasse. Gerne richten wir auch einen festen Fahrplan für regelmäßige Termine ein. Für Gruppen: <a href="/grossraumtaxi-essen">Großraumtaxi</a> mit bis zu 7 Sitzplätzen.</p>
        <h2>Weitere Stadtteile &amp; Leistungen</h2>
        <p><a href="/taxi-essen-holsterhausen">Taxi Holsterhausen</a> · <a href="/taxi-essen-ruettenscheid">Taxi Rüttenscheid</a> · <a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer Essen</a></p>
        ${CONTACT_BLOCK}
      </article>`,
  },
  {
    path: '/taxi-essen-suedviertel',
    title: 'Taxi Essen-Südviertel | 24/7 | Taxi B&B GmbH – 0201 707060',
    description: 'Taxi in Essen-Südviertel – zuverlässig, 24/7, Festpreis. Flughafentransfer Düsseldorf, Krankenfahrten, Großraumtaxi. Taxi B&B GmbH – Ihr lokaler Service.',
    noscriptBody: `<article lang="de" style="${NOSCRIPT_STYLE}">
        <h1>Taxi Südviertel Essen – Ihr Taxiservice im Essener Südviertel</h1>
        <p>Das Essener Südviertel liegt zentral und gut angebunden – und Taxi B&amp;B GmbH ist schnell bei Ihnen. Ob morgens zum Termin, mittags zum Einkaufen oder abends sicher nach Hause – wir fahren Sie 24/7. Als alteingesessenes Taxiunternehmen aus Essen kennen wir das Südviertel und die gesamte Stadt genau. Kurze Wartezeiten, Festpreise, klimatisierte Fahrzeuge. Rufen Sie an: 0201 707060 oder <a href="/book">online buchen</a>.</p>
        <h2>Wohin fahren wir Sie aus dem Südviertel?</h2>
        <ul>
          <li>Flughafen Düsseldorf, Köln/Bonn, Frankfurt – Festpreis, Flugverfolgung inklusive</li>
          <li>Essen Hauptbahnhof – kurze, direkte Verbindung</li>
          <li>Rüttenscheid und Holsterhausen – Nachbarstadtteile in Minuten</li>
          <li>Universitätsklinikum und St. Josef-Krankenhaus – für Arzttermine</li>
          <li>Messe Essen und Hotels – für Geschäftsreisende</li>
        </ul>
        <h2>Flughafentransfer aus dem Südviertel</h2>
        <p>Der beliebteste Fahrtwunsch aus dem Südviertel: <a href="/flughafentransfer-essen-duesseldorf">Flughafentransfer nach Düsseldorf</a>. Wir fahren Sie komfortabel, pünktlich und zum Festpreis. Für Gruppen steht unsere <a href="/grossraumtaxi-essen">Mercedes V-Klasse</a> mit bis zu 7 Sitzplätzen bereit.</p>
        <h2>Weitere Stadtteile &amp; Leistungen</h2>
        <p><a href="/taxi-essen-ruettenscheid">Taxi Rüttenscheid</a> · <a href="/taxi-essen-holsterhausen">Taxi Holsterhausen</a> · <a href="/krankenfahrten-essen">Krankenfahrten Essen</a></p>
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
