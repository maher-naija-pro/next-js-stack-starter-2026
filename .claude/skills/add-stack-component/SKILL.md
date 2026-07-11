---
name: add-stack-component
description: Use when the user wants to add an optional component from STACK.md — payments, email, jobs, search, AI, analytics, tables, charts, etc. — to this Next.js starter. Asks which components to add, installs the packages, and wires up minimal working integration code following this project's existing conventions.
---

# Add Stack Component

This project ships with only the **Mandatory Core Stack** installed (see `STACK.md`). Everything else lives in **Optional Additions**, grouped into three categories:

- **Dev & Ops Tooling** — monorepo tooling, docs, secrets, backups, git hooks, versioning
- **Platform Services** — payments, email, jobs, logging, search, AI, analytics, notifications, etc.
- **UI & App Libraries** — tables, charts, animation, drag & drop, PDF, CSV, onboarding, API docs

This skill installs and integrates whichever of those the user asks for, without touching anything already working in the mandatory core.

## Workflow

1. **Read `STACK.md`** to get the current Optional Additions tables (categories, picks, versions). Treat it as the source of truth for *what* to install — the reference files in this skill's `references/` directory are the source of truth for *how* to integrate each one into this specific codebase.

2. **Ask what to add.** If the user already named specific components (e.g. "add Stripe and Recharts"), skip straight to step 3 for those. Otherwise use `AskUserQuestion` to ask which category they want, then which components within it (multiSelect). Don't ask about categories the user has no interest in — if they said "I need payments," just ask about Platform Services, not all three lists.

3. **For each selected component:**
   - Open the matching reference file below and find that component's entry.
   - Check whether it's already installed (search `package.json` deps and the relevant integration files) — skip cleanly if so, and say so.
   - Install the package(s) with `pnpm add` (or `pnpm add -D` for dev-only tools), matching the version in STACK.md where one is pinned.
   - Create/modify the integration files exactly as described in the reference entry, following this project's established patterns:
     - Server code and shared libs under `src/lib/`
     - Client components under `src/components/`
     - Zustand stores under `src/stores/`
     - Route handlers under `src/app/api/`
     - Reuse `src/lib/prisma.ts` for DB access and `src/lib/auth.ts` / `src/lib/auth-client.ts` for auth — don't create parallel clients.
     - Use the existing `.env` / `.env.example` pattern — add new required vars to **both** files (`.env.example` gets a placeholder, `.env` gets a working local value if one exists, e.g. an already-running local service).
   - If the component needs a **separate Docker service** (its own container, not just a package) — e.g. GlitchTip, Umami, SeaweedFS — add it to `docker-compose.yml` as a new service rather than editing the existing `app`/`postgres` services, and say so explicitly before doing it (this changes the project's infra footprint, worth a heads-up per this repo's "zero-dependency default" philosophy documented in `README.md`).

4. **Verify.** After installing, run:
   - `pnpm lint` (Biome) — fix anything it flags in the new files.
   - `./node_modules/.bin/tsc --noEmit` — confirm no type errors.
   - `pnpm build` — confirm the app still builds. If the component needs env vars that aren't set (e.g. a real Stripe key), it's fine for build to succeed with a placeholder; don't block on live external credentials the user hasn't provided.

5. **Report back**, concisely: what was installed, what files were created/changed, what env vars (if any) the user needs to fill in with real values, and a one-line pointer to where to start using it (e.g. "call `stripe.checkout.sessions.create(...)` from a Server Action — see `src/lib/stripe.ts`").

## Reference files

- `references/dev-ops-tooling.md` — Turborepo/pnpm monorepo, Fumadocs, npm-check-updates, SOPS+age, pgBackRest, lefthook, Changesets
- `references/platform-services.md` — Stripe, Resend, pg-boss jobs, Pino, env validation, ALTCHA, next-intl, realtime/SSE, notifications, webhooks, search, AI SDK, object storage, error tracking, analytics, rate limiting, RBAC, feature flags
- `references/ui-libraries.md` — TanStack Table, Recharts, Motion, dnd-kit, date-fns, PDF generation, Papa Parse, driver.js, zod-openapi+Scalar

## Principles to preserve

This starter's whole point (see `README.md` → Philosophy) is minimal footprint: open source, permissively licensed, few extra dependencies, no unnecessary external services or SaaS. When a reference entry offers a "zero-dependency default" and a "heavier upgrade," install the default unless the user specifically asked for the heavier option. Never silently swap in a different tool than what STACK.md/the reference file specifies — if you think a better option exists now, say so and ask, don't just substitute it.
