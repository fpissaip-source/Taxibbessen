import { ServicePageTemplate } from "@/components/ServicePageTemplate";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Taxi",
  "name": "Taxi Essen-Südviertel",
  "url": "https://taxibbessen.de/taxi-essen-suedviertel",
  "provider": { "@id": "https://taxibbessen.de/#organization" },
  "areaServed": ["Essen-Südviertel", "Essen", "Nordrhein-Westfalen"],
  "description": "Taxi in Essen-Südviertel – zuverlässig, 24/7, Festpreis. Flughafentransfer, Krankenfahrten. Taxi B&B GmbH – 0201 707060.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
      { "@type": "ListItem", "position": 2, "name": "Taxi Essen-Südviertel", "item": "https://taxibbessen.de/taxi-essen-suedviertel" },
    ],
  },
};

const sections = [
  {
    h2: "Taxi im Essener Südviertel",
    body: (
      <>
        <p>Das <strong>Essener Südviertel</strong> liegt zentral und gut angebunden – und Taxi B&B GmbH ist schnell bei Ihnen. Ob morgens zum Termin, mittags zum Einkaufen oder abends sicher nach Hause – wir fahren Sie 24/7.</p>
        <p>Als alteingesessenes Taxiunternehmen aus Essen kennen wir das Südviertel und die gesamte Stadt genau. Kurze Wartezeiten, Festpreise, klimatisierte Fahrzeuge.</p>
      </>
    ),
  },
  {
    h2: "Wohin fahren wir Sie aus dem Südviertel?",
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Flughafen Düsseldorf, Köln/Bonn, Frankfurt</strong> – Festpreis, Flugverfolgung inklusive</li>
        <li><strong>Essen Hauptbahnhof</strong> – kurze, direkte Verbindung</li>
        <li><strong>Rüttenscheid & Holsterhausen</strong> – Nachbarstadtteile in Minuten</li>
        <li><strong>Universitätsklinikum & St. Josef-Krankenhaus</strong> – für Arzttermine</li>
        <li><strong>Messe Essen & Hotels</strong> – für Geschäftsreisende</li>
      </ul>
    ),
  },
  {
    h2: "Flughafentransfer aus dem Südviertel",
    body: (
      <>
        <p>Der beliebteste Fahrtwunsch aus dem Südviertel: <a href="/flughafentransfer-essen-duesseldorf" className="text-primary hover:underline">Flughafentransfer nach Düsseldorf</a>. Wir fahren Sie komfortabel, pünktlich und zum Festpreis – egal ob früh morgens oder spät nachts.</p>
        <p>Für Gruppen steht unsere <a href="/grossraumtaxi-essen" className="text-primary hover:underline">Mercedes V-Klasse</a> mit bis zu 7 Sitzplätzen bereit.</p>
      </>
    ),
  },
  {
    h2: "Taxi im Südviertel bestellen",
    body: (
      <>
        <p>Anrufen genügt: <strong>0201 707060</strong> – 24 Stunden erreichbar. Oder <a href="/book" className="text-primary hover:underline">online buchen</a>.</p>
      </>
    ),
  },
];

export default function TaxiSuedviertel() {
  return (
    <ServicePageTemplate
      title="Taxi Essen-Südviertel | 24/7 | Taxi B&B GmbH – 0201 707060"
      description="Taxi in Essen-Südviertel – zuverlässig, 24/7, Festpreis. Flughafentransfer Düsseldorf, Krankenfahrten, Großraumtaxi. Taxi B&B GmbH – Ihr lokaler Service."
      h1="Taxi Südviertel Essen"
      badge="Essen-Südviertel · 24/7 verfügbar"
      intro="Ihr zuverlässiger Taxiservice im Essener Südviertel – rund um die Uhr, pünktlich und zum Festpreis. Wir kennen den Stadtteil und bringen Sie überall hin."
      sections={sections}
      faq={[
        { q: "Wie schnell kommt das Taxi im Südviertel?", a: "In der Regel innerhalb weniger Minuten. Rufen Sie an: 0201 707060." },
        { q: "Fahren Sie auch nachts im Südviertel?", a: "Ja, wir sind 24/7 erreichbar – auch nachts und am Wochenende." },
        { q: "Was kostet ein Taxi vom Südviertel zum Flughafen Düsseldorf?", a: "Wir berechnen Festpreise. Rufen Sie uns für ein genaues Angebot an: 0201 707060." },
      ]}
      relatedLinks={[
        { href: "/taxi-essen-ruettenscheid", label: "Taxi Rüttenscheid" },
        { href: "/taxi-essen-holsterhausen", label: "Taxi Holsterhausen" },
        { href: "/flughafentransfer-essen-duesseldorf", label: "Flughafentransfer Essen" },
        { href: "/krankenfahrten-essen", label: "Krankenfahrten Essen" },
      ]}
      schema={schema}
      breadcrumbLabel="Taxi Südviertel Essen"
    />
  );
}
