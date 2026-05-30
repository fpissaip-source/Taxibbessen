# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

- Be token/cost-efficient: think before coding, make surgical changes (touch only what the request needs, don't refactor unrelated code), avoid speculative features. When counting/auditing across many files, write a script instead of reading them all into context. (From the user's "Nexus Brain" init doc — applied the engineering principles; the external `/api/memories` API and `.claude/` file scheme don't exist in this project and aren't used here.)
- VISUAL TRANSITIONS MUST ALWAYS BE SMOOTH — never any abrupt edges, hard seams, or visible bands between sections, gradients, or video layers. Any gradient overlay must use long, gradual fades on BOTH ends (no short transparent→dark→transparent spans that create a floating "bar"). This is a hard, non-negotiable rule the user has repeated emphatically.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
