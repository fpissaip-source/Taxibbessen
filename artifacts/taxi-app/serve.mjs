import express from "express";
import compression from "compression";
import { fileURLToPath } from "url";
import { dirname, extname, join } from "path";
import { readFileSync, existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const DIST = join(__dirname, "dist/public");

let knownPaths = null;
const routesJsonPath = join(DIST, "_routes.json");
if (existsSync(routesJsonPath)) {
  knownPaths = new Set(JSON.parse(readFileSync(routesJsonPath, "utf-8")));
}

const app = express();
const longCacheExtensions = new Set([
  ".avif",
  ".css",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".mp4",
  ".png",
  ".svg",
  ".webm",
  ".webp",
  ".woff",
  ".woff2",
]);

app.use(compression({ level: 6 }));

app.use(express.static(DIST, {
  index: "index.html",
  etag: true,
  lastModified: true,
  redirect: true,
  setHeaders(res, filePath) {
    const extension = extname(filePath).toLowerCase();

    if (extension === ".html") {
      res.setHeader("Cache-Control", "no-cache, must-revalidate");
      return;
    }

    if (longCacheExtensions.has(extension)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return;
    }

    res.setHeader("Cache-Control", "public, max-age=3600");
  },
}));

app.use((req, res) => {
  const normalizedPath = req.path === "/" ? "/" : req.path.replace(/\/$/, "");
  const isKnown = !knownPaths || knownPaths.has(normalizedPath);

  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  if (isKnown) {
    res.sendFile(join(DIST, "index.html"));
  } else {
    res.status(404).sendFile(join(DIST, "index.html"));
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Taxi B&B static server on :${PORT} (compression + cache headers enabled)`);
});
