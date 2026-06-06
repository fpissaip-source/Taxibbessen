import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getPageMeta } from "@/page-meta-manifest";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "name": "Taxi Essen Hauptbahnhof",
      "url": "https://taxibbessen.de/taxi-essen-hbf",
      "provider": { "@id": "https://taxibbessen.de/#organization" },
      "areaServed": ["Essen", "Essen Hauptbahnhof", "Essen-Stadtmitte"],
      "description": "Taxi am Essen Hauptbahnhof – schnell, zuverlässig, 24/7. Vorbestellung möglich. Taxi B&B GmbH – 0201 707060.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
        { "@type": "ListItem", "position": 2, "name": "Taxi Essen Hauptbahnhof", "item": "https://taxibbessen.de/taxi-essen-hbf" },
      ],
    },
  ],
};

const sections = [
  {
    h2: "Taxi am Essen Hauptbahnhof – immer verfügbar",
    body: (
      <>
        <p>Der Essen Hauptbahnhof ist einer der wichtigsten Verkehrsknotenpunkte im Ruhrgebiet – hier kommen täglich tausende Reisende an. Taxi B&B GmbH ist <strong>24 Stunden am Tag</strong> erreichbar und bringt Sie vom Essen HBF schnell und bequem zu Ihrem Ziel.</p>
        <p>Ob Hotel, Geschäftstermin, Messe oder Privatadresse – wir kennen Essen und bringen Sie ohne Umwege dorthin. Vorbestellung empfohlen, damit Ihr Taxi bei der Ankunft schon wartet.</p>
      </>
    ),
  },
  {
    h2: "Vom Essen HBF zu allen Zielen",
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Hotels in Essen</strong> – z. B. Mövenpick, Sheraton, ATLANTIC</li>
        <li><strong>Messe Essen</strong> – direkte Fahrt zur Messe und zurück</li>
        <li><strong>Flughafen Düsseldorf</strong> – komfortabler Weiterflug-Transfer</li>
        <li><strong>Stadtteile Essen</strong> – Rüttenscheid, Holsterhausen, Frohnhausen und mehr</li>
        <li><strong>Kliniken & Arztpraxen</strong> – Universitätsklinikum, St. Josef-Krankenhaus</li>
      </ul>
    ),
  },
  {
    h2: "Vorbestellung – Ihr Taxi wartet auf Sie",
    body: (
      <>
        <p>Reisen Sie mit dem ICE oder RE nach Essen? <strong>Bestellen Sie Ihr Taxi einfach im Voraus</strong> – rufen Sie uns an oder buchen Sie online. Wir stehen pünktlich bei Ihrer Ankunft bereit.</p>
        <p>Mit der Angabe Ihrer Zugnummer können wir Verspätungen einkalkulieren. Kein Warten, kein Suchen – Ihr Fahrer erwartet Sie direkt am Ausgang.</p>
      </>
    ),
  },
  {
    h2: "Auch mit Gepäck kein Problem",
    body: (
      <>
        <p>Großer Koffer, Sporttasche oder Kinderwagen? Unser Fahrer hilft Ihnen gerne beim Verladen. Für Gruppen oder besonders viel Gepäck steht unsere <a href="/grossraumtaxi-essen" className="text-primary hover:underline">Mercedes V-Klasse</a> mit bis zu 7 Sitzplätzen bereit.</p>
      </>
    ),
  },
];

const faq = [
  {
    q: "Wie bestelle ich ein Taxi am Essen Hauptbahnhof?",
    a: "Rufen Sie uns an: 0201 707060 – wir sind 24/7 erreichbar. Oder buchen Sie online und geben Sie 'Essen Hauptbahnhof' als Abholort an.",
  },
  {
    q: "Wie lange dauert die Fahrt vom Essen HBF nach Düsseldorf Flughafen?",
    a: "Ca. 35–45 Minuten, je nach Verkehr. Wir berechnen Festpreise ohne Taktung.",
  },
  {
    q: "Fahren Sie auch nachts vom Hauptbahnhof?",
    a: "Ja, wir sind 24 Stunden am Tag, 7 Tage die Woche erreichbar – auch für Spät- und Nachtzüge.",
  },
];

const { title: _title, description: _desc } = getPageMeta('/taxi-essen-hbf');

export default function TaxiEssenHbf() {
  return (
    <ServicePageTemplate
      title={_title}
      description={_desc}
      h1="Taxi Essen Hauptbahnhof"
      badge="24/7 · Vorbestellung möglich"
      intro="Ihr Taxi am Essen Hauptbahnhof – pünktlich, wenn Ihr Zug ankommt. Wir bringen Sie direkt zu Ihrem Ziel in Essen, zum Flughafen oder in die gesamte Region."
      sections={sections}
      faq={faq}
      relatedLinks={[
        { href: "/flughafentransfer-essen-duesseldorf", label: "Flughafentransfer Essen" },
        { href: "/grossraumtaxi-essen", label: "Großraumtaxi Essen" },
        { href: "/taxi-essen-ruettenscheid", label: "Taxi Rüttenscheid" },
      ]}
      schema={schema}
      breadcrumbLabel="Taxi Essen Hauptbahnhof"
    />
  );
}
