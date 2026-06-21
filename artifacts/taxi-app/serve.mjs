import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const DIST = join(__dirname, 'dist/public');

// Load the set of valid SPA routes written by prerender.mts at build time.
// Falls back to null (permissive: all paths get 200) if the file is absent.
let knownPaths = null;
const routesJsonPath = join(DIST, '_routes.json');
if (existsSync(routesJsonPath)) {
  knownPaths = new Set(JSON.parse(readFileSync(routesJsonPath, 'utf-8')));
}

const app = express();

app.use(compression({ level: 6 }));

app.use(express.static(DIST, {
  index: 'index.html',
  etag: true,
  lastModified: true,
  maxAge: '1h',
  redirect: true,
}));

// Catch-all: serve SPA shell only for known routes; return 404 for everything else.
// Normalise the path by stripping any trailing slash (except for root "/") so
// "/fahrzeuge/" and "/fahrzeuge" both match the route manifest entry "/fahrzeuge".
app.use((req, res) => {
  const normalizedPath = req.path === '/' ? '/' : req.path.replace(/\/$/, '');
  const isKnown = !knownPaths || knownPaths.has(normalizedPath);

  if (isKnown) {
    res.sendFile(join(DIST, 'index.html'));
  } else {
    res.status(404).sendFile(join(DIST, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Taxi B&B static server on :${PORT} (gzip/brotli enabled)`);
});
