import { ServicePageTemplate } from "@/components/ServicePageTemplate";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "name": "Kurierdienst Essen",
      "url": "https://taxibbessen.de/kurierdienst-essen",
      "provider": { "@id": "https://taxibbessen.de/#organization" },
      "areaServed": ["Essen", "Ruhrgebiet", "Nordrhein-Westfalen"],
      "description": "Schneller Kurierdienst in Essen – Dokumente, Pakete, vertrauliche Unterlagen. Express, diskret, zuverlässig. Taxi B&B GmbH – 0201 707060.",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://taxibbessen.de/" },
        { "@type": "ListItem", "position": 2, "name": "Kurierdienst Essen", "item": "https://taxibbessen.de/kurierdienst-essen" },
      ],
    },
  ],
};

const sections = [
  {
    h2: "Schnelle Kurierfahrten in Essen & Region",
    body: (
      <>
        <p>Taxi B&B GmbH übernimmt für Sie <strong>Express-Kurierfahrten in Essen</strong> und der gesamten Region. Wir liefern direkt von Absender zu Empfänger – ohne Umwege, ohne Wartezeiten.</p>
        <p>Ideal für Unternehmen, Kanzleien, Arztpraxen und Privatpersonen mit zeitkritischen Sendungen. Wir sind 24/7 erreichbar und fahren auch kurzfristig los.</p>
      </>
    ),
  },
  {
    h2: "Was wir transportieren",
    body: (
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Vertragsdokumente & Rechtsakten</strong> – diskret und sicher</li>
        <li><strong>Unternehmenspakete & Muster</strong> – pünktlich beim Empfänger</li>
        <li><strong>Medizinische Proben & Unterlagen</strong> – mit Sorgfalt</li>
        <li><strong>Schlüssel, Ersatzteile, Kleinlieferungen</strong> – schnell und direkt</li>
        <li><strong>Persönliche Gegenstände</strong> – diskret und vertraulich</li>
      </ul>
    ),
  },
  {
    h2: "Diskretion & Verlässlichkeit",
    body: (
      <>
        <p>Vertraulichkeit steht bei uns an erster Stelle. <strong>Alle Kurierfahrten werden diskret und professionell</strong> durchgeführt. Wir unterzeichnen auf Wunsch Verschwiegenheitserklärungen für sensible Sendungen.</p>
        <p>Jede Sendung wird persönlich übergeben – keine Paketautomaten, keine anonymen Abgaben. Der Empfänger bekommt seine Sendung direkt in die Hand.</p>
      </>
    ),
  },
  {
    h2: "Kurierdienst in Essen beauftragen",
    body: (
      <>
        <p>Rufen Sie uns an unter <strong>0201 707060</strong> – wir nehmen Ihren Auftrag sofort an und fahren schnellstmöglich los. Auch WhatsApp-Buchung möglich.</p>
        <p>Für regelmäßige Kurierfahrten (z. B. tägliche Dokumentenlieferungen zwischen Standorten) bieten wir gerne auch Rahmenverträge an.</p>
      </>
    ),
  },
];

const faq = [
  {
    q: "Wie schnell können Sie mit dem Kurierdienst losfahren?",
    a: "In der Regel sind wir innerhalb kürzester Zeit startbereit. Rufen Sie uns an: 0201 707060 – wir fahren so schnell wie möglich.",
  },
  {
    q: "Fahren Sie auch Kurierdienste außerhalb von Essen?",
    a: "Ja, wir liefern auch in Bochum, Gelsenkirchen, Duisburg, Dortmund und in der gesamten Region. Bundesweite Kurierfahrten auf Anfrage.",
  },
  {
    q: "Kann ich den Kurierdienst auch abends oder nachts nutzen?",
    a: "Ja, wir sind 24/7 erreichbar – auch nachts, am Wochenende und an Feiertagen.",
  },
  {
    q: "Was transportieren Sie nicht?",
    a: "Wir transportieren keine gefährlichen Güter (Gefahrgut), verderbliche Lebensmittel (ohne Kühlung) oder illegale Waren. Für Fragen wenden Sie sich an uns.",
  },
];

export default function KurierdienstEssen() {
  return (
    <ServicePageTemplate
      title="Kurierdienst Essen – Express & Diskret | Taxi B&B GmbH – 0201 707060"
      description="Schneller Kurierdienst in Essen – Dokumente, Pakete, vertrauliche Unterlagen. Express, diskret, zuverlässig. Taxi B&B GmbH – 24/7 erreichbar – 0201 707060."
      h1="Kurierdienst Essen"
      badge="Express · Diskret · Zuverlässig"
      intro="Schnelle, diskrete Kurierfahrten in Essen und der gesamten Region. Wir liefern direkt von Absender zu Empfänger – Dokumente, Pakete, vertrauliche Unterlagen – 24/7."
      sections={sections}
      faq={faq}
      relatedLinks={[
        { href: "/flughafentransfer-essen-duesseldorf", label: "Flughafentransfer Essen" },
        { href: "/grossraumtaxi-essen", label: "Großraumtaxi Essen" },
        { href: "/krankenfahrten-essen", label: "Krankenfahrten Essen" },
      ]}
      schema={schema}
      breadcrumbLabel="Kurierdienst Essen"
    />
  );
}
