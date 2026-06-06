import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getPageMeta } from "@/page-meta-manifest";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "name": "Krankenfahrten Essen",
      "url": "https://taxibbessen.de/krankenfahrten-essen",
      "provider": { "@id": "https://taxibbessen.de/#organization" },
      "areaServed": ["Essen", "Bochum", "Duisburg", "Nordrhein-Westfalen"],
      "description": "Zuverlässige Krankenfahrten in Essen – Dialyse, Strahlentherapie, Arzttermine. Direkte Abrechnung mit der Krankenkasse. Taxi B&B GmbH seit 1992.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
        { "@type": "ListItem", "position": 2, "name": "Krankenfahrten Essen", "item": "https://taxibbessen.de/krankenfahrten-essen" },
      ],
    },
  ],
};

const sections = [
  {
    h2: "Krankenfahrten mit direkter Krankenkassenabrechnung",
    body: (
      <>
        <p>Taxi B&B GmbH führt alle gesetzlich genehmigten Krankenfahrten in Essen und Umgebung durch. Wir rechnen direkt mit Ihrer Krankenkasse ab – <strong>kein bürokratischer Aufwand für Sie</strong>. Sie benötigen lediglich eine gültige Verordnung Ihres Arztes.</p>
        <p>Wir sind für alle gesetzlichen Krankenversicherungen zugelassen und kennen die Abrechnungsprozesse genau. Sprechen Sie uns einfach an – wir helfen Ihnen unkompliziert.</p>
      </>
    ),
  },
  {
    h2: "Für welche Fahrten eignet sich unser Service?",
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Dialysefahrten</strong> – regelmäßig, pünktlich, verlässlich</li>
        <li><strong>Strahlentherapie & Chemotherapie</strong> – einfühlsam und diskret</li>
        <li><strong>Arzttermine & Facharztkliniken</strong> – in Essen und Umgebung</li>
        <li><strong>Rehakliniken & Physiotherapie</strong> – bequem Tür zu Tür</li>
        <li><strong>Krankenhausaufnahme & Entlassung</strong> – wir sind pünktlich da</li>
      </ul>
    ),
  },
  {
    h2: "Unsere Fahrer – einfühlsam und erfahren",
    body: (
      <>
        <p>Unsere Fahrer kennen die Kliniken, Dialysezentren und Arztpraxen in Essen und der gesamten Region. <strong>Pünktlichkeit und Einfühlsamkeit</strong> stehen bei uns an erster Stelle – gerade bei Patienten, die auf regelmäßige Fahrten angewiesen sind.</p>
        <p>Wir holen Sie direkt an Ihrer Haustür ab und begleiten Sie auf Wunsch bis zur Eingangstür der Praxis oder Klinik. Nach dem Termin bringen wir Sie sicher wieder nach Hause.</p>
      </>
    ),
  },
  {
    h2: "Krankenfahrten in Essen buchen",
    body: (
      <>
        <p>Rufen Sie uns einfach an unter <strong>0201 707060</strong> – wir sind 24/7 erreichbar. Sie können Ihre Krankenfahrt auch <a href="/book" className="text-primary hover:underline">online vorbuchen</a>. Bitte halten Sie Ihre Krankenkassenkarte und die ärztliche Verordnung bereit.</p>
        <p>Für regelmäßige Fahrten (z. B. wöchentliche Dialyse) richten wir gerne einen festen Fahrplan ein – verlässlich und ohne zusätzlichen Aufwand für Sie.</p>
      </>
    ),
  },
];

const faq = [
  {
    q: "Wer übernimmt die Kosten für Krankenfahrten?",
    a: "Bei genehmigungspflichtigen Krankenfahrten (z. B. Dialyse, Strahlentherapie, bestimmte Arzttermine) übernimmt die gesetzliche Krankenversicherung die Kosten. Wir rechnen direkt mit Ihrer Kasse ab.",
  },
  {
    q: "Was brauche ich für eine genehmigte Krankenfahrt?",
    a: "Sie benötigen eine ärztliche Verordnung für Krankenbeförderung sowie die Genehmigung Ihrer Krankenkasse. Wir helfen Ihnen gerne bei Fragen zum Ablauf.",
  },
  {
    q: "Fahren Sie auch nachts oder am Wochenende?",
    a: "Ja, wir sind 24 Stunden am Tag, 7 Tage die Woche erreichbar – auch nachts, am Wochenende und an Feiertagen.",
  },
  {
    q: "Können Sie mich regelmäßig zur Dialyse fahren?",
    a: "Ja, für regelmäßige Fahrten (Dialyse, Therapie etc.) richten wir gerne einen festen Fahrplan ein. Rufen Sie uns an: 0201 707060.",
  },
];

const { title: _title, description: _desc } = getPageMeta('/krankenfahrten-essen');

export default function KrankenfahrtenEssen() {
  return (
    <ServicePageTemplate
      title={_title}
      description={_desc}
      h1="Krankenfahrten Essen"
      badge="Taxi B&B GmbH · Seit 1992"
      intro="Wir führen alle gesetzlich genehmigten Krankenfahrten in Essen durch und rechnen direkt mit Ihrer Krankenkasse ab. Einfühlsam, pünktlich und ohne bürokratischen Aufwand für Sie."
      sections={sections}
      faq={faq}
      relatedLinks={[
        { href: "/dialysefahrten-essen", label: "Dialysefahrten Essen" },
        { href: "/flughafentransfer-essen-duesseldorf", label: "Flughafentransfer Essen" },
        { href: "/grossraumtaxi-essen", label: "Großraumtaxi Essen" },
      ]}
      schema={schema}
      breadcrumbLabel="Krankenfahrten Essen"
    />
  );
}
