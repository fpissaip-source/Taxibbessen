import { localeOverrides } from "./locale-overrides/index.mjs";

function replaceStringProperty(source, key, value) {
  const pattern = new RegExp(`(\\b${key}\\s*:\\s*)"(?:[^"\\\\]|\\\\.)*"`, "g");
  return source.replace(pattern, `$1${JSON.stringify(value)}`);
}

export function localeContentPlugin() {
  return {
    name: "taxi-safe-locale-content",
    enforce: "pre",
    transform(code, id) {
      const match = id.match(/\/src\/i18n\/locales\/(de|en|fr|tr|ar)\.ts$/);
      if (!match) return null;

      let output = code;
      for (const [key, value] of Object.entries(localeOverrides[match[1]] ?? {})) {
        output = replaceStringProperty(output, key, value);
      }

      output = output.replaceAll("https://taxibbessen.de", "https://www.taxibbessen.de");
      return { code: output, map: null };
    },
  };
}
