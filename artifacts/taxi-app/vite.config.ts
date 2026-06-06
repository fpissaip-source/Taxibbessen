import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import sitemap from "vite-plugin-sitemap";
import { indexableRoutes } from "./src/routes.ts";

const CANONICAL_ORIGIN = "https://taxibbessen.de";

// Derived from the shared route manifest in src/routes.ts — single source of truth.
// Add/remove routes there; sitemap updates automatically on the next build.
const sitemapDynamicRoutes = indexableRoutes
  .map((r) => r.path)
  .filter((p) => p !== "/");

const sitemapPriority = Object.fromEntries(
  indexableRoutes.map((r) => [r.path, r.priority]),
) as Record<string, number>;

const sitemapChangefreq = Object.fromEntries(
  indexableRoutes.map((r) => [r.path, r.changefreq]),
) as Record<string, string>;

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    sitemap({
      hostname: CANONICAL_ORIGIN,
      dynamicRoutes: sitemapDynamicRoutes,
      priority: sitemapPriority,
      changefreq: sitemapChangefreq,
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      generateRobotsTxt: false,
      readable: true,
    }),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
