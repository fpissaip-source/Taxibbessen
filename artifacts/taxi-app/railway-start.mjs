import express from "express";
import compression from "compression";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const distDir = join(__dirname, "dist/public");

console.log(`Starting server on port ${PORT}`);
console.log(`Serving from: ${distDir}`);

const app = express();

app.use(compression({ level: 6 }));

app.use(express.static(distDir, {
  index: "index.html",
  etag: true,
  lastModified: true,
  setHeaders(res, path) {
    if (path.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-cache");
    } else {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  },
}));

app.use((_req, res) => {
  res.sendFile(join(distDir, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ready on port ${PORT} (gzip compression enabled)`);
});
