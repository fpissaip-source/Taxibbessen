export function mediaPerformancePlugin() {
  return {
    name: "taxi-media-performance",
    enforce: "pre",
    transform(code, id) {
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
