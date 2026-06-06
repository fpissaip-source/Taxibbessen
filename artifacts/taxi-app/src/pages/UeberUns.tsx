import { usePageMeta } from "@/hooks/use-page-meta";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { ArrowLeft, Shield, Clock, Heart, Award, Users, MapPin } from "lucide-react";
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
  usePageMeta({
    title: "Über uns – Taxi B&B GmbH Essen | Seit 1992",
    description: "Taxi B&B GmbH – Ihr Familienbetrieb in Essen seit 1992. 30+ Jahre Erfahrung, Festpreise, 24/7 Erreichbarkeit. Lernen Sie uns kennen.",
  });
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

            <h1 className="sr-only">Taxiunternehmen in Essen seit 1992 – Geschichte und Team</h1>
            <Reveal delay={0.05}>
              <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-5">
                Mehr als ein Taxi –<br />
                <span className="text-primary">ein Versprechen.</span>
              </h2>
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
                  Das ist kein Zufall. Das ist das Ergebnis von über drei Jahrzehnten gelebtem Vertrauen.
                </p>
              </Reveal>
            </div>
          </section>

          <Reveal>
            <section className="bg-primary/5 border border-primary/10 rounded-2xl p-7 sm:p-10">
              <p className="text-lg sm:text-xl font-display italic text-foreground/90 leading-relaxed">
                „Unser Ziel war von Anfang an einfach: Jeder Fahrgast soll das Taxi verlassen und denken –
                <span className="text-primary font-semibold"> das war genau richtig so.</span>"
              </p>
              <p className="mt-4 text-sm text-muted-foreground">— Gründerfamilie Barger & Beige, Essen</p>
            </section>
          </Reveal>

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
              </div>
            </section>
          </Reveal>

        </div>
      </div>
    </Layout>
  );
}
