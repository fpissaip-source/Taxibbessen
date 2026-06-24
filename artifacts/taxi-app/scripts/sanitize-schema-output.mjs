import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)), "dist", "public");
const routes = [
  "index.html",
  "book/index.html",
  "flughafentransfer-essen-duesseldorf/index.html",
  "krankenfahrten-essen/index.html",
  "grossraumtaxi-essen/index.html",
  "dialysefahrten-essen/index.html",
  "kurierdienst-essen/index.html",
  "taxi-essen-hbf/index.html",
  "fahrzeuge/index.html",
  "ueber-uns/index.html",
  "taxi-essen-holsterhausen/index.html",
  "taxi-essen-ruettenscheid/index.html",
  "taxi-essen-frohnhausen/index.html",
  "taxi-essen-suedviertel/index.html",
  "impressum/index.html",
  "agb/index.html",
  "datenschutz/index.html",
  "confirmation/index.html",
  "admin/index.html",
];

function sanitize(value) {
  if (Array.isArray(value)) return value.map(sanitize);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !["aggregateRating", "review", "geo"].includes(key))
      .map(([key, child]) => [key, sanitize(child)]),
  );
}

function sanitizeHtml(html) {
  return html.replace(
    /(<script[^>]+type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (block, open, body, close) => {
      try {
        const data = JSON.parse(body.trim());
        if (data?.["@id"]?.endsWith?.("#founder")) return "";
        return `${open}\n${JSON.stringify(sanitize(data), null, 2)}\n${close}`;
      } catch {
        return block;
      }
    },
  );
}

for (const relativePath of routes) {
  const path = join(root, relativePath);
  if (!existsSync(path)) continue;
  writeFileSync(path, sanitizeHtml(readFileSync(path, "utf8")), "utf8");
}

console.log("Structured data sanitized");
