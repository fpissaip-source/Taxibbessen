import { ServicePageTemplate } from "@/components/ServicePageTemplate";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "name": "Großraumtaxi Essen",
      "url": "https://taxibbessen.de/grossraumtaxi-essen",
      "provider": { "@id": "https://taxibbessen.de/#organization" },
      "areaServed": ["Essen", "Ruhrgebiet", "Düsseldorf", "Nordrhein-Westfalen"],
      "description": "Großraumtaxi Essen für bis zu 7 Personen – Mercedes V-Klasse, Flughafentransfer, Gruppenfahrten. Kindersitze auf Anfrage. Taxi B&B GmbH – 24/7.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
        { "@type": "ListItem", "position": 2, "name": "Großraumtaxi Essen", "item": "https://taxibbessen.de/grossraumtaxi-essen" },
      ],
    },
  ],
};

const sections = [
  {
    h2: "Mercedes V-Klasse – Platz für 7 Personen",
    body: (
      <>
        <p>Unser Großraumtaxi in Essen ist die <strong>Mercedes V-Klasse</strong> – mit Platz für bis zu 7 Personen und reichlich Kofferraumplatz. Ob Familie mit Kindern, Reisegruppe oder Firmenteam: Sie reisen bequem, klimatisiert und ohne Stress.</p>
        <p>Alle Sitze sind bequem und bieten ausreichend Beinfreiheit auch für Langstrecken. Das Fahrzeug ist regelmäßig gewartet und gepflegt.</p>
      </>
    ),
  },
  {
    h2: "Wann brauchen Sie ein Großraumtaxi?",
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Flughafentransfer für Gruppen</strong> – alle kommen gemeinsam an</li>
        <li><strong>Familienausflüge</strong> – mit Kindersitzen und Kinderwagen</li>
        <li><strong>Firmenfahrten & Delegationen</strong> – professionell und diskret</li>
        <li><strong>Hochzeiten & Events</strong> – stilvoll und pünktlich</li>
        <li><strong>Gruppenreisen</strong> – gemeinsam zum Bahnhof, Konzert oder Hotel</li>
      </ul>
    ),
  },
  {
    h2: "Kindersitze & Sonderausstattung",
    body: (
      <>
        <p>Für Familien mit kleinen Kindern stellen wir auf Anfrage <strong>Kindersitze</strong> bereit. Bitte geben Sie bei der Buchung Alter und Gewicht der Kinder an, damit wir den richtigen Sitz bereitstellen können.</p>
        <p>Haben Sie besondere Anforderungen – zum Beispiel Platz für einen Rollator oder Sportgeräte? Sprechen Sie uns an – wir finden eine Lösung.</p>
      </>
    ),
  },
  {
    h2: "Großraumtaxi Essen buchen",
    body: (
      <>
        <p>Rufen Sie uns an unter <strong>0201 707060</strong> oder <a href="/book" className="text-primary hover:underline">buchen Sie online</a>. Bitte geben Sie die Personenanzahl und ggf. Gepäck bei der Buchung an, damit wir das richtige Fahrzeug für Sie einplanen.</p>
        <p>Wir sind 24 Stunden am Tag, 7 Tage die Woche erreichbar – auch für kurzfristige Buchungen.</p>
      </>
    ),
  },
];

const faq = [
  {
    q: "Wie viele Personen passen in das Großraumtaxi?",
    a: "Unsere Mercedes V-Klasse fasst bis zu 7 Personen inklusive Fahrer. Mit ausreichend Kofferraumplatz auch für größere Gepäckstücke.",
  },
  {
    q: "Gibt es Kindersitze im Großraumtaxi?",
    a: "Ja, Kindersitze sind auf Anfrage verfügbar. Bitte Alter und Gewicht der Kinder bei der Buchung angeben.",
  },
  {
    q: "Kann ich das Großraumtaxi für einen Flughafentransfer buchen?",
    a: "Ja, das ist eine der häufigsten Buchungen. Wir fahren Gruppen komfortabel zu allen Flughäfen – Düsseldorf, Köln/Bonn, Frankfurt, Dortmund.",
  },
  {
    q: "Was kostet ein Großraumtaxi in Essen?",
    a: "Wir berechnen Festpreise. Rufen Sie uns an (0201 707060) oder buchen Sie online für ein genaues Angebot.",
  },
];

export default function GrossraumtaxiEssen() {
  return (
    <ServicePageTemplate
      title="Großraumtaxi Essen – 7 Personen | Mercedes V-Klasse | Taxi B&B"
      description="Großraumtaxi Essen für bis zu 7 Personen mit Mercedes V-Klasse. Flughafentransfer, Gruppenfahrten, Kindersitze auf Anfrage. Taxi B&B GmbH – 0201 707060."
      h1="Großraumtaxi Essen"
      badge="Bis zu 7 Personen · Mercedes V-Klasse"
      intro="Platz für die ganze Gruppe: Unsere Mercedes V-Klasse fasst bis zu 7 Personen mit Gepäck – ideal für Flughafentransfers, Familienausflüge und Firmenfahrten in Essen und Umgebung."
      sections={sections}
      faq={faq}
      relatedLinks={[
        { href: "/flughafentransfer-essen-duesseldorf", label: "Flughafentransfer Essen" },
        { href: "/krankenfahrten-essen", label: "Krankenfahrten Essen" },
        { href: "/kurierdienst-essen", label: "Kurierdienst Essen" },
      ]}
      schema={schema}
      breadcrumbLabel="Großraumtaxi Essen"
    />
  );
}
