# SEO Strategy

## In scope
- Public marketing homepage (`/`)
- Public service and trust pages (`/fahrzeuge`, `/ueber-uns`)
- Public transactional/support pages (`/book`, `/fahrtstatus`)
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
- Core public routes now get build-time prerendered head tags through `artifacts/taxi-app/prerender.mjs`.
- The public routes are still not fully SSR/SSG pages: route body content and H1s remain React-rendered after hydration unless specifically added to the static HTML shell.
- Utility confirmation URLs (`/confirmation?id=...`) are transactional pages, not intended as search landing pages.

## Dismissed categories
- (None yet)
