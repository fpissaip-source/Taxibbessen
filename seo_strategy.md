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
- Static crawler-visible HTML comes from `artifacts/taxi-app/index.html`.
- Route-level titles and descriptions are updated client-side via `src/hooks/use-page-meta.ts`.

## Dismissed categories
- (None yet)
