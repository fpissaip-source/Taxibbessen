import { usePageMeta } from "@/hooks/use-page-meta";
import { getPageMeta } from "@/page-meta-manifest";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { ArrowLeft, Shield, Clock, Heart, Award, Users, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Clock,
    title: "Seit 1992 in Essen",
    text: "Über 30 Jahre Erfahrung im Herzen des Ruhrgebiets. Was als kleines Familienunternehmen begann, ist heute ein fester Bestandteil der Essener Mobilitätslandschaft.",
  },
  {
    icon: Shield,
    title: "Festpreise. Kein Risiko.",
    text: "Bei uns wissen Sie vor der Fahrt, was Sie zahlen. Keine versteckten Kosten, keine bösen Überraschungen – nur Transparenz und Verlässlichkeit.",
  },
  {
    icon: Heart,
    title: "Persönlicher Service",
    text: "Wir kennen unsere Kunden. Viele fahren seit Jahren mit uns – weil sie wissen, dass sie sich auf uns verlassen können. Das ist kein Zufall, das ist unser Anspruch.",
  },
  {
    icon: Award,
    title: "Professionelle Flotte",
    text: "Gepflegte, moderne Fahrzeuge mit erfahrenen Fahrern. Ob Limousine, Großraumtaxi oder Krankentransport – wir haben das richtige Fahrzeug für jeden Anlass.",
  },
  {
    icon: Users,
    title: "Für jeden Bedarf",
    text: "Privatfahrten, Geschäftsreisen, Flughafentransfers, Krankenfahrten oder Kurierdienste – Taxi B&B ist Ihr Partner für alle Wege.",
  },
  {
    icon: MapPin,
    title: "Ganz Essen & Umgebung",
    text: "Ob Essen-Rüttenscheid, Steele, Altendorf oder der Flughafen Düsseldorf – wir kennen jede Straße und bringen Sie sicher ans Ziel.",
  },
];

const timeline = [
  {
    year: "1992",
    title: "Die Gründung",
    text: "Die Gründerfamilie Barger & Beige startet Taxi B&B GmbH in Essen mit dem Versprechen: Pünktlichkeit, Verlässlichkeit und ein persönliches Lächeln bei jeder Fahrt.",
  },
  {
    year: "1997",
    title: "Erstes Wachstum",
    text: "Die steigende Nachfrage erfordert eine Erweiterung der Flotte. Neue Fahrer werden eingestellt – allesamt mit lokaler Ortskenntnis und Leidenschaft für den Kundenservice.",
  },
  {
    year: "2003",
    title: "Flottenmodernisierung",
    text: "Investition in moderne Komfort-Limousinen und schrittweise Umstellung auf klimatisierte Fahrzeuge – für mehr Komfort bei jedem Wetter im Ruhrgebiet.",
  },
  {
    year: "2008",
    title: "Großraumtaxi eingeführt",
    text: "Mit dem Einstieg in das Großraumtaxi-Segment können nun auch Familien und Gruppen mit bis zu 7 Personen bequem und kostengünstig reisen.",
  },
  {
    year: "2012",
    title: "Krankenfahrten & Dialyse",
    text: "Aufnahme der genehmigungspflichtigen Krankenfahrten und Dialysefahrten. Direkte Kassenabrechnungen machen medizinische Transporte für Patienten stressfrei.",
  },
  {
    year: "Heute",
    title: "Über 30 Jahre Vertrauen",
    text: "Taxi B&B GmbH zählt zu den etablierten Taxiunternehmen in Essen. Hunderte Stammkunden, eine gepflegte Flotte und dasselbe Versprechen wie am ersten Tag.",
    highlight: true,
  },
];

const services = [
  { label: "Krankenfahrten Essen", href: "/krankenfahrten-essen" },
  { label: "Flughafentransfer Düsseldorf", href: "/flughafentransfer-essen-duesseldorf" },
  { label: "Großraumtaxi Essen", href: "/grossraumtaxi-essen" },
  { label: "Kurierdienst Essen", href: "/kurierdienst-essen" },
  { label: "Dialysefahrten Essen", href: "/dialysefahrten-essen" },
  { label: "Unsere Fahrzeuge", href: "/fahrzeuge" },
];

const certifications = [
  "Konzession Personenbeförderungsgesetz (PBefG)",
  "Zulassung für Krankenfahrten & Dialysefahrten",
  "Mitglied bei taxi.de – Deutsches Taxi- und Mietwagengewerbe",
  "Eingetragen im Handelsregister: HRB 36284 Amtsgericht Essen",
  "Regelmäßige Hauptuntersuchungen & Fahrzeuginspektionen (TÜV)",
  "Alle Fahrer mit amtlichem Personenbeförderungsschein (P-Schein)",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function UeberUns() {
  const { title, description } = getPageMeta('/ueber-uns');
  usePageMeta({ title, description });
  return (
    <Layout>
      <div className="min-h-screen bg-background">

        <div className="relative bg-gradient-to-b from-white/5 to-transparent border-b border-white/5 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <Reveal>
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Startseite
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-5">
                Über Taxi B&amp;B GmbH<br />
                <span className="text-primary">in Essen</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Wir sind kein anonymes Fahrdienst-Portal, kein Algorithmus und keine App, die Sie vergisst, sobald die Fahrt endet.
                Wir sind ein Essener Familienunternehmen – und das spürt man.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-14 sm:py-20 space-y-14">

          {/* Unternehmensgeschichte */}
          <section className="space-y-5">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Unsere Geschichte</h2>
            </Reveal>
            <div className="space-y-4 text-[15px] sm:text-base text-foreground/80 leading-relaxed">
              <Reveal delay={0.05}>
                <p>
                  Taxi B&B GmbH wurde 1992 in Essen gegründet – in einer Zeit, als ein Taxi noch mehr war als eine Fahrt von A nach B.
                  Es war eine Verbindung zwischen Menschen. Diese Philosophie tragen wir bis heute in uns.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Was damals mit einem Fahrzeug und dem festen Willen begann, Passagiere pünktlich, sicher und freundlich zu befördern,
                  ist heute ein eingespieltes Team aus erfahrenen Fahrern, einer gepflegten Flotte und einem Kundenstamm, der uns seit
                  Jahrzehnten treu ist. Viele unserer Fahrgäste sind keine Kunden mehr – sie sind Stammgäste. Familien, die ihre Kinder zum
                  Flughafen schicken. Senioren, die uns für ihre Arzttermine vertrauen. Geschäftsleute, die uns anrufen, bevor sie überhaupt
                  den Termin eingetragen haben.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Im Laufe der Jahrzehnte wurde die Flotte kontinuierlich modernisiert und erweitert: Komfort-Limousinen für
                  Geschäftsreisende, die Mercedes V-Klasse als Großraumtaxi für bis zu 7 Personen, und speziell ausgestattete
                  Fahrzeuge für Kranken- und Dialysefahrten. Heute decken wir das gesamte Spektrum der Personenbeförderung ab –
                  von der nächtlichen Heimfahrt bis zum internationalen Flughafentransfer.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Das ist kein Zufall. Das ist das Ergebnis von über drei Jahrzehnten gelebtem Vertrauen.
                </p>
              </Reveal>
            </div>
          </section>

          {/* Zitat */}
          <Reveal>
            <section className="bg-primary/5 border border-primary/10 rounded-2xl p-7 sm:p-10">
              <p className="text-lg sm:text-xl font-display italic text-foreground/90 leading-relaxed">
                „Unser Ziel war von Anfang an einfach: Jeder Fahrgast soll das Taxi verlassen und denken –
                <span className="text-primary font-semibold"> das war genau richtig so.</span>"
              </p>
              <p className="mt-4 text-sm text-muted-foreground">— Gründerfamilie Barger & Beige, Essen</p>
            </section>
          </Reveal>

          {/* Timeline */}
          <section className="space-y-6">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Meilensteine seit 1992</h2>
            </Reveal>
            <div className="relative">
              <div className="absolute left-[18px] top-3 bottom-3 w-px bg-border" aria-hidden="true" />
              <ol className="space-y-0">
                {timeline.map((item, i) => (
                  <Reveal key={item.year} delay={i * 0.07}>
                    <li className="relative flex gap-5 pb-8 last:pb-0">
                      <div className="relative z-10 flex-shrink-0 mt-0.5">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                            item.highlight
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-primary border-primary/40"
                          }`}
                        >
                          {item.highlight ? "★" : item.year.slice(-2)}
                        </div>
                      </div>
                      <div className="pt-1 pb-1">
                        <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
                          <span className={`text-xs font-semibold tracking-widest uppercase ${item.highlight ? "text-primary" : "text-muted-foreground"}`}>
                            {item.year}
                          </span>
                          <h3 className="font-bold text-sm sm:text-base">{item.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          {/* Was uns ausmacht */}
          <section className="space-y-5">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Was uns ausmacht</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <Reveal key={v.title} delay={i * 0.07}>
                    <div className="bg-card border border-border rounded-xl p-5 space-y-2.5 h-full">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-primary" style={{ width: "18px", height: "18px" }} />
                      </div>
                      <h3 className="font-bold text-sm">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* Warum Kunden wiederkommen */}
          <section className="space-y-5">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Warum Kunden wiederkommen</h2>
            </Reveal>
            <div className="space-y-4 text-[15px] sm:text-base text-foreground/80 leading-relaxed">
              <Reveal delay={0.05}>
                <p>
                  In einer Welt, in der Fahrdienste oft austauschbar sind und der nächste Fahrer ein Fremder bleibt,
                  setzen wir auf Kontinuität. Unsere Fahrer kennen die Stadt. Sie kennen die Staus, die Abkürzungen,
                  die Eigenheiten des Ruhrgebiets – und oft kennen sie auch Sie.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Wir haben keine Algorithmen, die Sie in eine Warteschlange einreihen. Wenn Sie anrufen, spricht ein Mensch
                  mit Ihnen. Wenn Sie ankommen, steht ein gepflegtes Fahrzeug bereit. Pünktlichkeit ist für uns keine Floskel –
                  sie ist die Grundlage unserer Arbeit.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Vertrauen lässt sich nicht kaufen. Es entsteht durch Verlässlichkeit, durch Respekt und durch die kleinen Dinge:
                  Das aufgehaltene Gepäck, der freundliche Morgengruß, die Route, die wir kennen, ohne dass Sie sie erklären müssen.
                </p>
              </Reveal>
            </div>
          </section>

          {/* Lizenzen & Mitgliedschaften */}
          <section className="space-y-5">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Lizenzen & Mitgliedschaften</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-[15px] sm:text-base text-foreground/80 leading-relaxed">
                Als konzessioniertes Taxiunternehmen erfüllen wir alle gesetzlichen Anforderungen des
                Personenbeförderungsgesetzes (PBefG). Unsere Fahrer sind geprüft, unsere Fahrzeuge regelmäßig inspiziert –
                damit Sie jederzeit sicher und legal befördert werden.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 gap-2.5">
              {certifications.map((item, i) => (
                <Reveal key={item} delay={i * 0.05}>
                  <div className="flex items-start gap-3 bg-card border border-border rounded-xl px-4 py-3.5">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80 leading-snug">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Unsere Leistungen – interne Links */}
          <section className="space-y-5">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Unsere Leistungen</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-[15px] sm:text-base text-foreground/80 leading-relaxed">
                Ob Krankenfahrt, Flughafentransfer oder Großraumtaxi – entdecken Sie das vollständige Angebot von Taxi B&B GmbH:
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((s, i) => (
                <Reveal key={s.href} delay={i * 0.06}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-3 bg-card hover:bg-primary/5 border border-border hover:border-primary/30 rounded-xl px-4 py-3.5 text-sm font-medium text-foreground transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 text-primary rotate-180 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                    {s.label}
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

          {/* CTA */}
          <Reveal>
            <section className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-7 sm:p-10 text-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold">Bereit, uns kennenzulernen?</h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                Fragen Sie Ihre nächste Fahrt an – ganz unverbindlich, per WhatsApp, Telefon oder E-Mail.
                Wir freuen uns auf Sie.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href="https://wa.me/491711111535"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  WhatsApp schreiben
                </a>
                <a
                  href="tel:0201707060"
                  className="inline-flex items-center justify-center gap-2 bg-card hover:bg-white/5 border border-border text-foreground font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  0201 707060 anrufen
                </a>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  Online buchen
                </Link>
              </div>
            </section>
          </Reveal>

        </div>
      </div>
    </Layout>
  );
}
