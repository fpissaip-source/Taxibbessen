import { Phone } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { getPageMeta } from "@/page-meta-manifest";
import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";

const { title: _bookTitle, description: _bookDesc } = getPageMeta('/book');

export default function Book() {
  usePageMeta({ title: _bookTitle, description: _bookDesc });

  return (
    <Layout>
      <div className="min-h-[80vh] py-20 px-4" style={{ background: "#0b0a08" }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-primary text-xs font-semibold tracking-widest uppercase mb-5">
              <Phone className="w-3.5 h-3.5" />
              Taxi anfragen
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
              Taxi buchen in Essen
            </h1>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm mx-auto">
              Füllen Sie das Formular aus oder rufen Sie uns direkt an – wir melden uns sofort.
              Taxi B&amp;B GmbH ist 24/7 für Sie erreichbar.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
