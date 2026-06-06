import { ServicePageTemplate } from "@/components/ServicePageTemplate";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "name": "Flughafentransfer Essen Düsseldorf",
      "url": "https://taxibbessen.de/flughafentransfer-essen-duesseldorf",
      "provider": { "@id": "https://taxibbessen.de/#organization" },
      "areaServed": ["Essen", "Düsseldorf", "Köln", "Dortmund", "Frankfurt"],
      "description": "Zuverlässiger Flughafentransfer von Essen zu allen Flughäfen – Düsseldorf, Köln/Bonn, Frankfurt, Dortmund. Festpreis, 24/7, Flugverfolgung inklusive.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
        { "@type": "ListItem", "position": 2, "name": "Flughafentransfer Essen Düsseldorf", "item": "https://taxibbessen.de/flughafentransfer-essen-duesseldorf" },
      ],
    },
  ],
};

const sections = [
  {
    h2: "Von Essen zu allen großen Flughäfen",
    body: (
      <>
        <p>Taxi B&B GmbH bringt Sie bequem und pünktlich von Essen zu allen wichtigen Flughäfen der Region. Die beliebteste Strecke ist der <strong>Flughafentransfer Essen – Düsseldorf (DUS)</strong> mit ca. 35–40 km Entfernung. Wir fahren Sie aber auch zum Flughafen Köln/Bonn (CGN), Dortmund (DTM) und Frankfurt (FRA).</p>
        <p>Festpreise, keine bösen Überraschungen. Einfach anrufen oder online buchen – wir bestätigen Ihren Transfer sofort.</p>
      </>
    ),
  },
  {
    h2: "Flugverfolgung & kostenlose Wartezeit",
    body: (
      <>
        <p>Ihr Flug hat Verspätung? Kein Problem. Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit automatisch an. <strong>Wartezeit ist selbstverständlich kostenfrei</strong> – wir sind da, wenn Sie ankommen, nicht vorher und nicht zu spät.</p>
        <p>Bei der Ankunft stehen wir mit Ihrem Namen am Terminal und helfen Ihnen mit dem Gepäck. Diskret, professionell, ohne Stress.</p>
      </>
    ),
  },
  {
    h2: "Großraumtaxi für Gruppen & viel Gepäck",
    body: (
      <>
        <p>Reisen Sie mit Familie, Kollegen oder viel Gepäck? Unsere <strong>Mercedes V-Klasse fasst bis zu 7 Personen</strong> und hat reichlich Kofferraumplatz. Ideal für Gruppenreisen, Firmendelegationen oder Familien mit Kinderwagen und mehreren Koffern.</p>
        <p>Kindersitze sind auf Anfrage verfügbar – einfach bei der Buchung angeben.</p>
      </>
    ),
  },
  {
    h2: "Warum Taxi B&B für Ihren Flughafentransfer?",
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Festpreis:</strong> Kein Taxameter, kein Staurisiko – Sie wissen den Preis vorab.</li>
        <li><strong>24/7 erreichbar:</strong> Früher Abflug um 4 Uhr oder Spätlandung um Mitternacht – wir sind da.</li>
        <li><strong>Seit 1992:</strong> 30+ Jahre Erfahrung in Essen und der gesamten Region.</li>
        <li><strong>Mercedes-Flotte:</strong> Klimatisiert, gepflegt, komfortabel für jede Strecke.</li>
      </ul>
    ),
  },
];

const faq = [
  {
    q: "Wie viel kostet ein Taxi von Essen zum Flughafen Düsseldorf?",
    a: "Wir berechnen Festpreise – rufen Sie uns an (0201 707060) oder buchen Sie online für ein konkretes Angebot. Die Strecke Essen–Düsseldorf beträgt ca. 35–40 km.",
  },
  {
    q: "Warten Sie auch, wenn mein Flug Verspätung hat?",
    a: "Ja, wir verfolgen Ihren Flug in Echtzeit. Wartezeit durch Flugverspätungen ist kostenlos – wir sind da, wenn Sie landen.",
  },
  {
    q: "Kann ich ein Großraumtaxi für 6 Personen zum Flughafen buchen?",
    a: "Ja! Unsere Mercedes V-Klasse bietet Platz für bis zu 7 Personen mit Gepäck. Einfach bei der Buchung angeben.",
  },
  {
    q: "Fahren Sie auch nach Frankfurt oder Köln/Bonn?",
    a: "Ja, wir fahren zu allen großen Flughäfen: Düsseldorf (DUS), Köln/Bonn (CGN), Dortmund (DTM) und Frankfurt (FRA). Festpreis auf Anfrage.",
  },
];

export default function FlughafentransferEssen() {
  return (
    <ServicePageTemplate
      title="Flughafentransfer Essen Düsseldorf | Taxi B&B GmbH – 0201 707060"
      description="Zuverlässiger Flughafentransfer von Essen nach Düsseldorf, Köln/Bonn, Frankfurt und Dortmund. Festpreis, Flugverfolgung, 24/7. Taxi B&B GmbH – 0201 707060."
      h1="Flughafentransfer Essen Düsseldorf"
      badge="Taxi B&B GmbH · Essen"
      intro="Pünktlich, komfortabel und zum Festpreis – wir bringen Sie von Essen zu allen Flughäfen der Region. Mit Echtzeit-Flugverfolgung und kostenloser Wartezeit."
      sections={sections}
      faq={faq}
      relatedLinks={[
        { href: "/grossraumtaxi-essen", label: "Großraumtaxi Essen" },
        { href: "/krankenfahrten-essen", label: "Krankenfahrten Essen" },
        { href: "/kurierdienst-essen", label: "Kurierdienst Essen" },
      ]}
      schema={schema}
      breadcrumbLabel="Flughafentransfer Essen Düsseldorf"
    />
  );
}
