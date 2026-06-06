import { ServicePageTemplate } from "@/components/ServicePageTemplate";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "name": "Dialysefahrten Essen",
      "url": "https://taxibbessen.de/dialysefahrten-essen",
      "provider": { "@id": "https://taxibbessen.de/#organization" },
      "areaServed": ["Essen", "Bochum", "Gelsenkirchen", "Nordrhein-Westfalen"],
      "description": "Zuverlässige Dialysefahrten in Essen – regelmäßig, pünktlich, direkte Abrechnung mit der Krankenkasse. Taxi B&B GmbH – 0201 707060.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
        { "@type": "ListItem", "position": 2, "name": "Dialysefahrten Essen", "item": "https://taxibbessen.de/dialysefahrten-essen" },
      ],
    },
  ],
};

const sections = [
  {
    h2: "Regelmäßige Dialysefahrten in Essen",
    body: (
      <>
        <p>Dialysepatienten sind auf <strong>zuverlässige, regelmäßige Fahrten</strong> angewiesen – meist dreimal pro Woche, immer zur gleichen Zeit. Taxi B&B GmbH übernimmt diese Verantwortung mit Sorgfalt und Pünktlichkeit.</p>
        <p>Wir kennen die Dialysezentren und Kliniken in Essen und Umgebung genau und stellen sicher, dass Sie immer rechtzeitig dort ankommen und sicher nach Hause gebracht werden.</p>
      </>
    ),
  },
  {
    h2: "Direkte Abrechnung mit der Krankenkasse",
    body: (
      <>
        <p>Dialysefahrten werden in der Regel von der gesetzlichen Krankenversicherung übernommen. <strong>Wir rechnen direkt mit Ihrer Krankenkasse ab</strong> – kein Vorschuss, keine Erstattungsanträge für Sie.</p>
        <p>Sie benötigen eine gültige ärztliche Verordnung zur Krankenbeförderung. Sprechen Sie uns an, wenn Sie Fragen zum Ablauf oder zur Genehmigung haben – wir helfen Ihnen gerne.</p>
      </>
    ),
  },
  {
    h2: "Fester Fahrplan & persönlicher Fahrer",
    body: (
      <>
        <p>Für regelmäßige Dialysefahrten richten wir gerne einen <strong>festen Fahrplan</strong> für Sie ein. So wissen Sie immer, wann wir kommen – ohne jedes Mal neu anrufen zu müssen. Viele unserer Dialysepatienten werden seit Jahren von denselben Fahrern betreut.</p>
        <p>Unsere Fahrer sind einfühlsam, geduldig und vertraut mit den besonderen Bedürfnissen von Dialysepatienten. Wir helfen beim Ein- und Aussteigen und tragen auf Wunsch auch das Gepäck.</p>
      </>
    ),
  },
  {
    h2: "Dialysefahrten in Essen buchen",
    body: (
      <>
        <p>Rufen Sie uns an unter <strong>0201 707060</strong> oder <a href="/book" className="text-primary hover:underline">schreiben Sie uns online</a>. Wir besprechen gemeinsam Ihren Fahrplan und kümmern uns um alles Weitere. 24/7 erreichbar – auch für kurzfristige Änderungen.</p>
      </>
    ),
  },
];

const faq = [
  {
    q: "Übernimmt die Krankenkasse die Kosten für Dialysefahrten?",
    a: "Ja, Dialysefahrten werden in der Regel von der gesetzlichen Krankenversicherung übernommen. Sie benötigen eine ärztliche Verordnung. Wir rechnen direkt mit Ihrer Kasse ab.",
  },
  {
    q: "Können wir einen festen Fahrplan einrichten?",
    a: "Ja, für regelmäßige Dialysefahrten richten wir gerne einen festen Wochenplan ein. So müssen Sie nicht jedes Mal neu anrufen.",
  },
  {
    q: "Was passiert, wenn ich kurzfristig absagen muss?",
    a: "Rufen Sie uns bitte so früh wie möglich an: 0201 707060. Wir sind flexibel und passen den Fahrplan an Ihre Bedürfnisse an.",
  },
  {
    q: "Fahren Sie auch von Essen in umliegende Städte zur Dialyse?",
    a: "Ja, wir fahren auch in Dialysezentren in Bochum, Gelsenkirchen, Duisburg und der gesamten Region. Sprechen Sie uns an.",
  },
];

export default function DialogsefahrtenEssen() {
  return (
    <ServicePageTemplate
      title="Dialysefahrten Essen | Krankenkasse | Taxi B&B GmbH – 0201 707060"
      description="Zuverlässige Dialysefahrten in Essen – regelmäßig, pünktlich, direkte Abrechnung mit der Krankenkasse. Fester Fahrplan möglich. Taxi B&B GmbH – 0201 707060."
      h1="Dialysefahrten Essen"
      badge="Regelmäßig · Pünktlich · Krankenkasse"
      intro="Zuverlässige Dialysefahrten in Essen mit direkter Abrechnung bei Ihrer Krankenkasse. Wir richten gerne einen festen Fahrplan ein – dreimal die Woche, immer pünktlich."
      sections={sections}
      faq={faq}
      relatedLinks={[
        { href: "/krankenfahrten-essen", label: "Krankenfahrten Essen" },
        { href: "/flughafentransfer-essen-duesseldorf", label: "Flughafentransfer Essen" },
        { href: "/grossraumtaxi-essen", label: "Großraumtaxi Essen" },
      ]}
      schema={schema}
      breadcrumbLabel="Dialysefahrten Essen"
    />
  );
}
