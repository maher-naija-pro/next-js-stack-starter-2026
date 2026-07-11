# next-js-stack-starter-2026

An opinionated, production-ready Next.js starter stack for 2026. See [STACK.md](./STACK.md) for the full pick-by-pick breakdown.

Only the **Mandatory Core Stack** from STACK.md is installed here. Everything under **Optional Additions** is added on demand — see [Adding optional components](#adding-optional-components) below.

## Getting started

```bash
pnpm install

# Start local Postgres (18)
docker compose up -d postgres

cp .env.example .env   # adjust if you changed the Postgres port/credentials

pnpm db:migrate         # applies prisma/migrations
pnpm db:seed            # seeds a demo user

pnpm dev                # http://localhost:5002
```

Other useful scripts:

```bash
pnpm lint          # Biome check
pnpm lint:fix       # Biome check --write
pnpm test           # Vitest unit tests
pnpm test:e2e        # Playwright e2e tests (starts its own dev server)
pnpm build           # production build (Next.js standalone output)
pnpm db:studio        # Prisma Studio
```

To run the whole thing in Docker (app + Postgres):

```bash
docker compose up -d
```

## Adding optional components

Ask Claude Code to install and wire up anything from STACK.md's **Optional Additions** section — Dev & Ops Tooling, Platform Services, or UI & App Libraries — using the `add-stack-component` skill (see `.claude/skills/`). It will ask which components you want, install them, and integrate the minimal working code.

## Philosophy — how the stack was chosen

Every tool in this stack was selected against the same set of principles, in priority order:

1. **Compatible with the latest Next.js & its ecosystem.** Each pick is a current default for the newest Next.js (App Router, React Server Components, Server Actions) — not a legacy choice bolted on. Tools that fight the framework were rejected in favour of ones built for it.

2. **Open source & permissively licensed.** MIT / Apache-2.0 / BSD only. No BSL, SSPL, or "open-core with a paywall" traps. You can read, fork, and self-host everything, forever, at no cost.

3. **Fewer extra dependencies.** Prefer tools that reuse what's already in the stack over ones that add new moving parts. Examples: **pg-boss** (jobs) and **Better Auth** run on your existing Postgres; outbound webhooks reuse pg-boss; search stays in Postgres (FTS + `pg_trgm`). Less surface area = fewer upgrades, fewer CVEs, less to break.

4. **No external services.** Wherever possible a need is met by an in-app library or your existing Postgres — not a separate server to deploy and operate. The minimal production footprint is just **the Next.js app + PostgreSQL**. Realtime (SSE + Postgres `LISTEN/NOTIFY`), notifications, and webhooks were all chosen to avoid extra infrastructure like Redis or MongoDB.

5. **No mandatory SaaS / hosted APIs.** Nothing forces a monthly bill or a third-party account. The two unavoidable paid dependencies — **Stripe** (card processing) and email delivery — are inherent to their job and clearly flagged; email can be swapped for self-hosted SMTP.

### The result

A stack you fully own: **app + Postgres** covers the core, everything is permissively licensed and free, and each added capability was weighed for whether it earns its dependency. Heavier or hosted alternatives are noted in STACK.md for the cases where you genuinely outgrow the lightweight default.
