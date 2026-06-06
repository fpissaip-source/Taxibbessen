import { useEffect } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { getPageMeta } from "@/page-meta-manifest";
import { Layout } from "@/components/Layout";

const { title: _bookTitle, description: _bookDesc } = getPageMeta('/book');

export default function Book() {
  usePageMeta({ title: _bookTitle, description: _bookDesc });

  useEffect(() => {
    window.location.replace("/#kontakt");
  }, []);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center" style={{ background: "#0b0a08" }}>
        <p className="text-white/40 text-sm">Weiterleitung…</p>
      </div>
    </Layout>
  );
}
