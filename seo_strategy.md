# SEO Strategy

## In scope
- Public marketing homepage (`/`)
- Public service and trust pages (`/fahrzeuge`, `/ueber-uns`)
- Public transactional landing page (`/book`)
- Public support utility route (`/fahrtstatus`), but it is intentionally noindexed and not treated as a search landing page
- Public legal pages (`/impressum`, `/datenschutz`, `/agb`)

## Out of scope
- Authenticated or internal admin surface (`/admin`)
- API endpoints under `/api/**`

## Target audience
- People in Essen and the surrounding region looking for taxi rides, airport transfers, medical transport, and group transport.

## Primary keywords
- taxi essen
- taxiservice essen
- flughafentransfer essen
- krankenfahrten essen
- großraumtaxi essen

## Notes
- Frontend is a Vite + React + Wouter single-page application.
- Core public routes now get build-time prerendered head tags through `artifacts/taxi-app/prerender.mts`.
- The public routes are still not fully SSR/SSG pages: route body content and H1s remain React-rendered after hydration unless specifically added to the static HTML shell.
- Utility confirmation URLs (`/confirmation?id=...`) are transactional pages, not intended as search landing pages.
- `/fahrtstatus` is intentionally excluded from the sitemap and indexable route set, so scans should not treat it as a page that needs internal-link equity for ranking.

## Dismissed categories
- (None yet)
