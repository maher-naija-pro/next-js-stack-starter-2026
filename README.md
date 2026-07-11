# next-js-stack-starter-2026

A ready-to-build Next.js starter, not just a boilerplate: the core tools you need for a real app — framework, database, auth, forms, testing, Docker — come pre-installed and already wired together, so you can start on features immediately instead of gluing tools together first.

Every tool was deliberately chosen, not just defaulted to — see [STACK.md](./STACK.md) for the full list and the reasoning behind each pick.

**How it's organized:**

- ✅ **Mandatory Core Stack** — installed and working right now (see `pnpm dev` below).
- ➕ **Optional Additions** — payments, email, search, AI, charts, and 30+ more, documented in STACK.md but *not* installed. Add only what your project actually needs, on demand — see [Adding optional components](#adding-optional-components).

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

### Production deployment

`docker-compose.yml` is dev-friendly by default (exposed DB port, fallback secrets). For a real deployment, layer `docker-compose.prod.yml` on top — it requires real secrets (fails loudly if unset), removes the DB's host port, adds resource limits, log rotation, and container hardening (read-only root FS, no-new-privileges):

```bash
export POSTGRES_PASSWORD=$(openssl rand -base64 24)
export BETTER_AUTH_SECRET=$(openssl rand -base64 32)
export BETTER_AUTH_URL=https://your-real-domain.com

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

The app exposes `/api/health` (checked by the Dockerfile's `HEALTHCHECK` and useful for a load balancer/orchestrator) — it pings the DB, not just process liveness.

## Adding optional components

Everything in STACK.md's **Optional Additions** — Dev & Ops Tooling, Platform Services, UI & App Libraries — is added on demand via the `add-stack-component` Claude Code skill (`.claude/skills/add-stack-component/`), not pre-installed.

**Usage:** in Claude Code, just ask — e.g.:

```
Add Stripe and Recharts to this project
```
```
/add-stack-component
```

If you don't name specific components, it asks which category and which items interest you, then for each one:

1. Checks whether it's already installed (skips cleanly if so)
2. Installs the package(s) via `pnpm`, versioned to match STACK.md
3. Wires up minimal working integration code following this project's existing conventions — reusing `src/lib/prisma.ts` and `src/lib/auth.ts` rather than creating parallel clients, respecting the "zero-dependency default → heavier upgrade" pattern (e.g. it won't add a Redis-backed error tracker when the Postgres-only default covers it, unless you ask for the upgrade)
4. Flags before adding any **new Docker service** to `docker-compose.yml` — some optional components (GlitchTip, Umami, SeaweedFS) need one; most don't
5. Runs `pnpm lint`, a typecheck, and `pnpm build` to confirm nothing broke
6. Reports what was installed, what files changed, and any env vars you need to fill in with real values

The skill never substitutes a different tool than what STACK.md specifies — if it thinks something better exists now, it'll ask rather than silently swap it in. Per-component install/integration details live in `.claude/skills/add-stack-component/references/` (one file per category) if you want to read them yourself before asking.

## Philosophy — how the stack was chosen

Every tool in this stack was selected against the same set of principles, in priority order:

1. **Compatible with the latest Next.js & its ecosystem.** Each pick is a current default for the newest Next.js (App Router, React Server Components, Server Actions) — not a legacy choice bolted on. Tools that fight the framework were rejected in favour of ones built for it.

2. **Open source & permissively licensed.** MIT / Apache-2.0 / BSD only. No BSL, SSPL, or "open-core with a paywall" traps. You can read, fork, and self-host everything, forever, at no cost.

3. **Fewer extra dependencies.** Prefer tools that reuse what's already in the stack over ones that add new moving parts. Examples: **pg-boss** (jobs) and **Better Auth** run on your existing Postgres; outbound webhooks reuse pg-boss; search stays in Postgres (FTS + `pg_trgm`). Less surface area = fewer upgrades, fewer CVEs, less to break.

4. **No external services.** Wherever possible a need is met by an in-app library or your existing Postgres — not a separate server to deploy and operate. The minimal production footprint is just **the Next.js app + PostgreSQL**. Realtime (SSE + Postgres `LISTEN/NOTIFY`), notifications, and webhooks were all chosen to avoid extra infrastructure like Redis or MongoDB.

5. **No mandatory SaaS / hosted APIs.** Nothing forces a monthly bill or a third-party account. The two unavoidable paid dependencies — **Stripe** (card processing) and email delivery — are inherent to their job and clearly flagged; email can be swapped for self-hosted SMTP.

