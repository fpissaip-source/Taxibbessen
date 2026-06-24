function removeBetween(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  if (start < 0) return source;
  const end = source.indexOf(endMarker, start);
  if (end < 0) return source;
  return source.slice(0, start) + source.slice(end);
}

export function mediaPerformancePlugin() {
  return {
    name: "taxi-content-and-media-normalization",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith("/src/components/Layout.tsx")) {
        const output = removeBetween(
          code,
          "          {/* Zahlungsarten */}",
          '          <div className="mt-6 pt-5 border-t border-white/5',
        );
        return output === code ? null : { code: output, map: null };
      }

      if (!id.endsWith("/src/pages/Home.tsx")) return null;

      let output = code;

      output = output.replace(
        `  {
    q: "Muss ich die Fahrt vorab bezahlen?",
    a: "Nein – Sie bezahlen bequem nach der Fahrt. Wir akzeptieren Bargeld, EC-Karte und Kreditkarte (Visa/Mastercard). Bei Krankenfahrten rechnen wir direkt mit Ihrer Krankenkasse ab.",
  },
`,
        "",
      );

      output = output
        .replace(
          '{ src: "geschaeftsfahrten.webp", titleKey: "hero_service1_title", descKey: "hero_service1_desc", href: "/grossraumtaxi-essen" }',
          '{ src: "geschaeftsfahrten.webp", titleKey: "hero_service1_title", descKey: "hero_service1_desc", href: "/book" }',
        )
        .replace(
          '{ src: "kurierdokumente.webp",   titleKey: "hero_service4_title", descKey: "hero_service4_desc", href: "/dialysefahrten-essen" }',
          '{ src: "kurierdokumente.webp",   titleKey: "hero_service4_title", descKey: "hero_service4_desc", href: "/kurierdienst-essen" }',
        )
        .replace(
          '{ src: "hauszuhaus.webp",        titleKey: "hero_service6_title", descKey: "hero_service6_desc", href: "/taxi-essen-hbf" }',
          '{ src: "hauszuhaus.webp",        titleKey: "hero_service6_title", descKey: "hero_service6_desc", href: "/book" }',
        );

      output = output.replace(
        "const loadFrames = () => {\n      if (framesLoaded) return;",
        `const shouldReduceMedia =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator).connection?.saveData === true;

    const loadFrames = () => {
      if (framesLoaded || shouldReduceMedia) return;`,
      );

      output = output.replaceAll(
        "      observer.disconnect();\n      for (let i = 1; i <=",
        `      observer.disconnect();
      const shouldReduceMedia =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        (navigator).connection?.saveData === true;
      if (shouldReduceMedia) return;
      for (let i = 1; i <=`,
      );

      output = output
        .replace("{ rootMargin: '500% 0px' }", "{ rootMargin: '100% 0px' }")
        .replace("{ rootMargin: '300% 0px' }", "{ rootMargin: '100% 0px' }");

      return { code: output, map: null };
    },
  };
}
