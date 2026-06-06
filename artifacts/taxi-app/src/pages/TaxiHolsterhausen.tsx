import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getPageMeta } from "@/page-meta-manifest";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "name": "Taxi Essen-Holsterhausen",
      "url": "https://taxibbessen.de/taxi-essen-holsterhausen",
      "provider": { "@id": "https://taxibbessen.de/#organization" },
      "areaServed": ["Essen-Holsterhausen", "Essen", "Nordrhein-Westfalen"],
      "description": "Taxi in Essen-Holsterhausen – schnell, zuverlässig, 24/7. Flughafentransfer, Krankenfahrten, Großraumtaxi. Taxi B&B GmbH – 0201 707060.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
        { "@type": "ListItem", "position": 2, "name": "Taxi Essen-Holsterhausen", "item": "https://taxibbessen.de/taxi-essen-holsterhausen" },
      ],
    },
  ],
};

const sections = [
  {
    h2: "Ihr Taxidienst in Essen-Holsterhausen",
    body: (
      <>
        <p>Taxi B&B GmbH ist Ihr zuverlässiger Taxiservice direkt in <strong>Essen-Holsterhausen</strong>. Unser Unternehmen sitzt in der Menzelstraße 8–10 – mitten im Stadtgebiet und damit schnell bei Ihnen. Wir kennen Holsterhausen und die umliegenden Straßen wie unsere Westentasche.</p>
        <p>Von der Abholung an der Haustür bis zur Ankunft am Ziel – wir bringen Sie komfortabel und pünktlich dorthin. 24 Stunden am Tag, 7 Tage die Woche.</p>
      </>
    ),
  },
  {
    h2: "Typische Fahrtziele aus Holsterhausen",
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Flughafen Düsseldorf (DUS)</strong> – ca. 35–40 km, Festpreis auf Anfrage</li>
        <li><strong>Essen Hauptbahnhof</strong> – schnelle Verbindung in die Innenstadt</li>
        <li><strong>Universitätsklinikum Essen</strong> – für Arzttermine und Behandlungen</li>
        <li><strong>Messe Essen</strong> – für Besucher und Aussteller</li>
        <li><strong>Rüttenscheid, Frohnhausen, Stadtmitte</strong> – alle Stadtteile erreichbar</li>
      </ul>
    ),
  },
  {
    h2: "Krankenfahrten & Dialyse in Holsterhausen",
    body: (
      <>
        <p>Benötigen Sie regelmäßige <a href="/krankenfahrten-essen" className="text-primary hover:underline">Krankenfahrten</a> oder <a href="/dialysefahrten-essen" className="text-primary hover:underline">Dialysefahrten</a> aus Holsterhausen? Wir rechnen direkt mit Ihrer Krankenkasse ab und richten auf Wunsch einen festen Fahrplan ein.</p>
      </>
    ),
  },
  {
    h2: "Taxi in Holsterhausen bestellen",
    body: (
      <>
        <p>Einfach anrufen: <strong>0201 707060</strong> – wir sind sofort für Sie da. Oder buchen Sie bequem <a href="/book" className="text-primary hover:underline">online</a> und geben Sie Ihre Adresse in Holsterhausen als Abholpunkt an.</p>
      </>
    ),
  },
];

const { title: _title, description: _desc } = getPageMeta('/taxi-essen-holsterhausen');

export default function TaxiHolsterhausen() {
  return (
    <ServicePageTemplate
      title={_title}
      description={_desc}
      h1="Taxi Holsterhausen"
      badge="Essen-Holsterhausen · 24/7 verfügbar"
      intro="Ihr zuverlässiges Taxi in Essen-Holsterhausen – direkt vor Ihrer Tür. Taxi B&B GmbH kennt den Stadtteil und bringt Sie schnell an jedes Ziel."
      sections={sections}
      faq={[
        { q: "Wie schnell kommt das Taxi in Holsterhausen?", a: "In der Regel sind wir innerhalb weniger Minuten bei Ihnen. Rufen Sie an: 0201 707060." },
        { q: "Fahren Sie auch nachts in Holsterhausen?", a: "Ja, wir sind 24/7 erreichbar – auch nachts und am Wochenende." },
        { q: "Gibt es Festpreise für Fahrten aus Holsterhausen?", a: "Ja, wir berechnen Festpreise. Rufen Sie uns für ein Angebot an: 0201 707060." },
      ]}
      relatedLinks={[
        { href: "/taxi-essen-ruettenscheid", label: "Taxi Rüttenscheid" },
        { href: "/taxi-essen-frohnhausen", label: "Taxi Frohnhausen" },
        { href: "/flughafentransfer-essen-duesseldorf", label: "Flughafentransfer Essen" },
        { href: "/krankenfahrten-essen", label: "Krankenfahrten Essen" },
      ]}
      schema={schema}
      breadcrumbLabel="Taxi Holsterhausen"
    />
  );
}
