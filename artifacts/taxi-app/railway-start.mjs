import { createServer } from "http";
import { readFileSync, existsSync, statSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT || 3000;
const distDir = join(__dirname, "dist/public");

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

const server = createServer((req, res) => {
  const urlPath = req.url.split("?")[0];
  let filePath = join(distDir, urlPath === "/" ? "index.html" : urlPath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(distDir, "index.html");
  }

  try {
    const content = readFileSync(filePath);
    const ct = mime[extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": ct, "Cache-Control": "public, max-age=31536000, immutable" });
    if (filePath.endsWith("index.html")) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
    }
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Taxi B&B static server running on port ${PORT}`);
  console.log(`Serving from: ${distDir}`);
});
