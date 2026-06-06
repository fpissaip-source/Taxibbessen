import { ServicePageTemplate } from "@/components/ServicePageTemplate";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "name": "Taxi Essen-Rüttenscheid",
      "url": "https://taxibbessen.de/taxi-essen-ruettenscheid",
      "provider": { "@id": "https://taxibbessen.de/#organization" },
      "areaServed": ["Essen-Rüttenscheid", "Essen", "Nordrhein-Westfalen"],
      "description": "Taxi in Essen-Rüttenscheid – zuverlässig, 24/7. Flughafentransfer, Krankenfahrten, Großraumtaxi. Taxi B&B GmbH – 0201 707060.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
        { "@type": "ListItem", "position": 2, "name": "Taxi Essen-Rüttenscheid", "item": "https://taxibbessen.de/taxi-essen-ruettenscheid" },
      ],
    },
  ],
};

const sections = [
  {
    h2: "Taxi in Essen-Rüttenscheid",
    body: (
      <>
        <p><strong>Essen-Rüttenscheid</strong> ist eines der beliebtesten Viertel der Stadt – bekannt für seine Restaurants, Cafés und das lebhafte Nachtleben auf der Rüttenscheider Straße. Taxi B&B GmbH ist Ihr verlässlicher Partner für alle Fahrten im und aus dem Rü.</p>
        <p>Ob nach dem Restaurantbesuch nach Hause, zum Flughafen oder zum Arzttermin – wir sind rund um die Uhr für Sie erreichbar.</p>
      </>
    ),
  },
  {
    h2: "Beliebte Fahrtziele aus Rüttenscheid",
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Flughafen Düsseldorf</strong> – ca. 35 km, Festpreis auf Anfrage</li>
        <li><strong>Essen Hauptbahnhof</strong> – schnelle Verbindung</li>
        <li><strong>Museum Folkwang</strong> – für Kulturbegeisterte</li>
        <li><strong>Universitätsklinikum Essen</strong> – für Behandlungen und Arzttermine</li>
        <li><strong>Holsterhausen, Frohnhausen, Stadtmitte</strong> – alle Stadtteile erreichbar</li>
      </ul>
    ),
  },
  {
    h2: "Nachttaxi & Abholservice in Rüttenscheid",
    body: (
      <>
        <p>Genießen Sie das Nachtleben auf der Rüttenscheider Straße und kommen Sie sicher nach Hause? Wir fahren <strong>24 Stunden, auch nachts und am Wochenende</strong>. Ein kurzer Anruf genügt – wir sind schnell bei Ihnen.</p>
        <p>Auch für Gruppen: Unsere Mercedes V-Klasse fasst bis zu 7 Personen – ideal nach einem gemeinsamen Abend im Restaurant oder Club.</p>
      </>
    ),
  },
  {
    h2: "Taxi in Rüttenscheid bestellen",
    body: (
      <>
        <p>Rufen Sie uns an: <strong>0201 707060</strong> – wir sind rund um die Uhr erreichbar. Oder buchen Sie <a href="/book" className="text-primary hover:underline">online</a> mit Rüttenscheider Adresse als Abholpunkt.</p>
      </>
    ),
  },
];

export default function TaxiRuettenscheid() {
  return (
    <ServicePageTemplate
      title="Taxi Essen-Rüttenscheid | 24/7 | Taxi B&B GmbH – 0201 707060"
      description="Taxi in Essen-Rüttenscheid – zuverlässig, 24/7, Festpreis. Flughafentransfer, Nachttaxi, Krankenfahrten. Taxi B&B GmbH – Ihr lokaler Taxiservice im Rü."
      h1="Taxi Rüttenscheid"
      badge="Essen-Rüttenscheid · 24/7 verfügbar"
      intro="Ihr Taxi im Rü – schnell, zuverlässig, rund um die Uhr. Taxi B&B GmbH bringt Sie aus Essen-Rüttenscheid zu jedem Ziel – Flughafen, HBF oder sicher nach Hause nach dem Abend."
      sections={sections}
      faq={[
        { q: "Wie schnell kommt das Taxi in Rüttenscheid?", a: "In der Regel innerhalb weniger Minuten. Rufen Sie an: 0201 707060." },
        { q: "Fahren Sie auch nachts im Rü?", a: "Ja, wir sind 24/7 erreichbar – ideal für den Heimweg nach dem Abendessen oder Nachtleben." },
        { q: "Gibt es ein Großraumtaxi für Gruppen in Rüttenscheid?", a: "Ja, unsere Mercedes V-Klasse fasst bis zu 7 Personen – perfekt für Gruppen." },
      ]}
      relatedLinks={[
        { href: "/taxi-essen-holsterhausen", label: "Taxi Holsterhausen" },
        { href: "/taxi-essen-frohnhausen", label: "Taxi Frohnhausen" },
        { href: "/flughafentransfer-essen-duesseldorf", label: "Flughafentransfer Essen" },
        { href: "/grossraumtaxi-essen", label: "Großraumtaxi Essen" },
      ]}
      schema={schema}
      breadcrumbLabel="Taxi Rüttenscheid"
    />
  );
}
