export function mediaPerformancePlugin() {
  return {
    name: "taxi-media-performance",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/pages/Home.tsx")) return null;

      let output = code;

      output = output.replace(
        "const loadFrames = () => {\n      if (framesLoaded) return;",
        `const shouldReduceMedia =\n      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||\n      (navigator).connection?.saveData === true;\n\n    const loadFrames = () => {\n      if (framesLoaded || shouldReduceMedia) return;`,
      );

      output = output.replaceAll(
        "      observer.disconnect();\n      for (let i = 1; i <=",
        `      observer.disconnect();\n      const shouldReduceMedia =\n        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||\n        (navigator).connection?.saveData === true;\n      if (shouldReduceMedia) return;\n      for (let i = 1; i <=`,
      );

      output = output
        .replace("{ rootMargin: '500% 0px' }", "{ rootMargin: '100% 0px' }")
        .replace("{ rootMargin: '300% 0px' }", "{ rootMargin: '100% 0px' }");

      return { code: output, map: null };
    },
  };
}
