import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)), "dist", "public");
const files = [
  "index.html",
  "sitemap.xml",
  "robots.txt",
  "llms.txt",
];

for (const relativePath of files) {
  const path = join(root, relativePath);
  let content = readFileSync(path, "utf8");
  content = content.replaceAll("https://taxibbessen.de", "https://www.taxibbessen.de");
  if (relativePath === "sitemap.xml") {
    content = content.replace(/^\s*<lastmod>[^<]*<\/lastmod>\s*\r?\n/gm, "");
  }
  writeFileSync(path, content, "utf8");
}
