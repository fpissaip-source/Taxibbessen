import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const DIST = join(__dirname, 'dist/public');

const app = express();

app.use(compression({ level: 6 }));

app.use(express.static(DIST, {
  index: 'index.html',
  etag: true,
  lastModified: true,
  maxAge: '1h',
  redirect: true,
}));

app.use((_req, res) => {
  res.sendFile(join(DIST, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Taxi B&B static server on :${PORT} (gzip/brotli enabled)`);
});
