import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getPageMeta } from "@/page-meta-manifest";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "name": "Taxi Essen-Frohnhausen",
      "url": "https://taxibbessen.de/taxi-essen-frohnhausen",
      "provider": { "@id": "https://taxibbessen.de/#organization" },
      "areaServed": ["Essen-Frohnhausen", "Essen", "Nordrhein-Westfalen"],
      "description": "Taxi in Essen-Frohnhausen – zuverlässig, 24/7, Festpreis. Flughafentransfer, Krankenfahrten. Taxi B&B GmbH – 0201 707060.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
        { "@type": "ListItem", "position": 2, "name": "Taxi Essen-Frohnhausen", "item": "https://taxibbessen.de/taxi-essen-frohnhausen" },
      ],
    },
  ],
};

const sections = [
  {
    h2: "Ihr Taxiservice in Essen-Frohnhausen",
    body: (
      <>
        <p>Taxi B&B GmbH ist Ihr verlässlicher Taxiservice in <strong>Essen-Frohnhausen</strong>. Wir kennen den Stadtteil und seine Straßen genau und sind schnell bei Ihnen – egal ob tagsüber oder nachts.</p>
        <p>Von Frohnhausen aus fahren wir Sie zu allen Zielen in Essen und darüber hinaus – zum Flughafen, zum Arzt, zum Bahnhof oder einfach nach Hause.</p>
      </>
    ),
  },
  {
    h2: "Häufige Fahrtziele aus Frohnhausen",
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Flughafen Düsseldorf</strong> – Festpreis, komfortabel & pünktlich</li>
        <li><strong>Essen Hauptbahnhof</strong> – schnelle Verbindung für Zugreisende</li>
        <li><strong>Holsterhausen & Stadtmitte</strong> – kurze Wege in der Nachbarschaft</li>
        <li><strong>Kliniken & Arztpraxen</strong> – für Krankenfahrten und Therapietermine</li>
        <li><strong>Einkaufszentren</strong> – Limbecker Platz, Shoppingcenter West</li>
      </ul>
    ),
  },
  {
    h2: "Krankenfahrten & Dialyse aus Frohnhausen",
    body: (
      <>
        <p>Wir übernehmen <a href="/krankenfahrten-essen" className="text-primary hover:underline">Krankenfahrten</a> und <a href="/dialysefahrten-essen" className="text-primary hover:underline">Dialysefahrten</a> mit direkter Abrechnung bei Ihrer Krankenkasse. Gerne richten wir auch einen festen Fahrplan für regelmäßige Termine ein.</p>
      </>
    ),
  },
  {
    h2: "Taxi in Frohnhausen bestellen",
    body: (
      <>
        <p>Rufen Sie uns an: <strong>0201 707060</strong> – 24 Stunden, 7 Tage die Woche. Oder buchen Sie <a href="/book" className="text-primary hover:underline">online</a>.</p>
      </>
    ),
  },
];

const { title: _title, description: _desc } = getPageMeta('/taxi-essen-frohnhausen');

export default function TaxiFrohnhausen() {
  return (
    <ServicePageTemplate
      title={_title}
      description={_desc}
      h1="Taxi Frohnhausen"
      badge="Essen-Frohnhausen · 24/7 verfügbar"
      intro="Ihr zuverlässiges Taxi in Essen-Frohnhausen – rund um die Uhr, Festpreis. Wir bringen Sie schnell und bequem zu jedem Ziel in Essen und Umgebung."
      sections={sections}
      faq={[
        { q: "Wie schnell kommt das Taxi in Frohnhausen?", a: "In der Regel innerhalb weniger Minuten. Rufen Sie an: 0201 707060." },
        { q: "Fahren Sie auch nachts in Frohnhausen?", a: "Ja, wir sind 24/7 erreichbar – auch nachts und am Wochenende." },
        { q: "Gibt es Festpreise für Fahrten aus Frohnhausen?", a: "Ja, wir berechnen Festpreise. Rufen Sie uns für ein Angebot an: 0201 707060." },
      ]}
      stadtteileLinks={[
        { href: "/taxi-essen-hbf", label: "Taxi Essen HBF" },
        { href: "/taxi-essen-ruettenscheid", label: "Taxi Rüttenscheid" },
        { href: "/taxi-essen-holsterhausen", label: "Taxi Holsterhausen" },
        { href: "/taxi-essen-suedviertel", label: "Taxi Südviertel" },
      ]}
      relatedLinks={[
        { href: "/flughafentransfer-essen-duesseldorf", label: "Flughafentransfer Essen" },
        { href: "/krankenfahrten-essen", label: "Krankenfahrten Essen" },
        { href: "/grossraumtaxi-essen", label: "Großraumtaxi Essen" },
      ]}
      schema={schema}
      breadcrumbLabel="Taxi Frohnhausen"
    />
  );
}
