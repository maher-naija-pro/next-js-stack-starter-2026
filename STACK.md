# Modern Next.js Stack — 2026 Starter

An opinionated, production-proven stack. Each pick is a current default rather than a bleeding-edge gamble.

> **Latest versions verified July 2026** via web search. See the **Latest version** column below.

## Recommended Stack

| Layer | Pick | Latest version | Why |
|---|---|---|---|
| **Framework** | Next.js (App Router) + React | Next.js **16.3** (Jun 2026) · React **19.2.7** (Jun 2026) | Server Components, Server Actions, streaming. The App Router is the default, not experimental. |
| **Language** | TypeScript (strict) | **7.0** (Jul 2026) | Non-negotiable for a starter you'll build on. v7 ships the native (Go) compiler. |
| **Styling** | Tailwind CSS v4 | **4.3.2** (Jun 2026) | Faster engine, CSS-first config. |
| **UI components** | shadcn/ui | **4.13.0** (Jul 2026) | Copy-in components you own (Radix + Tailwind), not a locked dependency. |
| **Database** | PostgreSQL | **18.4** (May 2026) | The safe default. Self-host via the Docker Compose setup below (no SaaS needed) — Neon/Supabase are *optional* SaaS hosts if you'd rather not run it yourself. **UUIDv7 is native in Postgres 18** — use it for time-sortable, index-friendly primary keys. |
| **Type-safe IDs** | UUIDv7 (native in Postgres 18) | native | Already available in your Postgres version — time-sortable primary keys with no extra dependency. |
| **ORM** | Prisma ORM | **7.8.0** (Apr 2026) | Best-in-class type safety and DX, schema-first migrations, biggest ecosystem. The v7 rewrite dropped the Rust engine (bundle 14MB → 1.6MB, cold starts ~90ms). Drizzle **0.45.2** (Mar 2026) is the SQL-first, edge-light alternative. |
| **Auth** | Better Auth | **1.6.23** (Jun 2026) | Self-hosted, no SaaS. TS-first library running in-app against your own Postgres via the Prisma adapter — MIT, fully free, no feature paywalls. Built-in 2FA, passkeys/WebAuthn, org/RBAC, rate-limiting & CSRF. Vercel-backed since 2026 (Auth.js/NextAuth is now maintenance-only). Keycloak is the heavyweight self-hosted alternative if you need enterprise SSO/LDAP federation. |

| **Data/state** | TanStack Query (client) + Server Actions | **5.101.2** (Jun 2026) | Server Actions for mutations, Query for client-side caching. |
| **Client state** | Zustand (global) + nuqs (URL) + @xstate/store (flows) | Zustand **5.0.14** (May 2026) · nuqs **2.9.0** (Jun 2026) · @xstate/store **4.2.1** (Jun 2026) | Match the tool to the kind of state: **Zustand** for global client state (~1KB, no provider, RSC-friendly store factory); **nuqs** for type-safe URL state (filters/tabs/pagination, first-class App Router + RSC); **@xstate/store** for multi-step wizards/checkout (event-driven, <1KB) — escalate to full **XState v5** when a flow needs guards, parallel states, or actors. |
| **Validation** | Zod | **4.4.3** (May 2026) | Schema validation shared between client, server, and forms. |
| **Forms** | React Hook Form + Zod | **7.81.0** (Jul 2026) | Standard pairing. |
| **Testing** | Vitest (unit) + Playwright (e2e) | Vitest **4.1.10** (Jul 2026) · Playwright **1.61.1** (Jun 2026) | Vitest is fast and Jest-compatible; Playwright is the e2e standard. |
| **API mocking (tests)** | MSW | **2.15.0** (Jul 2026) | Network-level mocking for Vitest + Playwright. |
| **Test data** | @faker-js/faker + Prisma seed | **10.5.0** (2026) | Type-safe, reproducible seed/fixture data for dev and tests. |
| **Linting/format** | Biome | **2.5.3** (Jul 2026) | One fast Rust tool replacing ESLint + Prettier: single `biome.json`, ~25–56× faster, zero-dependency (smaller supply-chain surface). ESLint **10.6.0** + Prettier **3.9.5** is the alternative if you need `eslint-config-next`'s fuller `jsx-a11y`/React-Hooks rule coverage. |
| **Containerization** | Docker + Docker Compose | Docker Engine **29.6.1** (Jun 2026) · Compose **v2** plugin (`docker compose`) | Reproducible local dev and self-hosting. Pair with Next.js `output: 'standalone'` for a lean multi-stage image. Compose orchestrates app + Postgres locally. |
| **Monorepo / package manager** | Turborepo + pnpm | Turborepo **2.10.4** (Jul 2026) · pnpm **11.11.0** (Jul 2026) | pnpm for fast, disk-efficient installs with a strict node_modules; Turborepo for cached, parallel task running across apps/packages. Both MIT, free. Scales the starter from one app to a monorepo (web + api + shared packages) without re-tooling. |
| **Documentation** | Fumadocs | **16.11.1** (Jul 2026) | Next.js App Router-native docs framework (MDX, search, generated nav). MIT, free. Runs inside the same app/monorepo for product or API docs. |
| **Dependency updates** | `npm-check-updates` on a scheduled CI job | ncu **~22.x** | Apache-2.0, CLI only — run as a cron job in your existing CI, opening PRs via your git host's CLI. No daemon, no extra service, no SaaS coupling. |
| **Secrets management** | SOPS + age | SOPS **3.13.2** (Jul 2026) · age **1.3.1** (2025) | Encrypt secrets (`.env`/YAML/JSON) at rest **in the git repo**, decrypt at deploy with an `age` key. **No extra service, no vault to run** — SOPS (CNCF, MPL-2.0, permissive weak-copyleft) + age (BSD) are just CLIs. |
| **DB backups** | pgBackRest | **2.58.0** (2025) | CLI, not a service. Non-negotiable for a SaaS holding customer data. |
| **Git hooks** | lefthook | **2.1.10** (Jul 2026) | Runs Biome/typecheck pre-commit, faster than husky. |
| **Versioning** | Changesets | **2.31.0** (Apr 2026) | Monorepo-aware release notes, pairs with Turborepo. |

## Platform Services

| Category | Pick | Version | Why |
|---|---|---|---|
| **Payments / billing** | Stripe (`stripe` Node SDK) | **22.3.0** (Jun 2026) | The default for subscriptions and checkout. No real self-host equivalent; use Stripe Checkout + webhooks. |
| **Transactional email** | Resend + React Email | Resend **6.17.2** (Jul 2026) · React Email **6.6.8** (Jul 2026) | React Email authors templates as JSX (provider-agnostic); Resend delivers them. Swap to SMTP/Postmark to stay fully self-hosted. |
| **Background jobs / cron** | pg-boss | **12.25.1** (Jul 2026) | Queues, scheduling and retries backed by your **existing Postgres** — zero extra infra. Reach for Inngest/BullMQ only at higher scale. |
| **Logging** | Pino | **10.3.1** (Feb 2026) | Fast structured JSON logs; pipe to Loki/Grafana or any collector. |
| **Env validation** | `@t3-oss/env-nextjs` + Zod | **0.13.11** (Mar 2026) | Type-safe, fail-fast validation of env vars at build/boot — catches missing config before runtime. |
| **Bot protection / CAPTCHA** | ALTCHA | **3.2.0** (Jul 2026) | Privacy-friendly, proof-of-work CAPTCHA — **no extra service, no SaaS**. Your server issues and verifies the challenge in-app (no external calls, GDPR-friendly, no tracking). MIT widget + server verification lib; guards signup/login/forms. Reserve reCAPTCHA/Turnstile only if you need managed threat scoring. |
| **i18n / localization** | next-intl | **4.13.2** (Jul 2026) | App Router-native internationalization (messages, formatting, routing). |
| **Realtime / live updates** | SSE + Postgres `LISTEN/NOTIFY` | native | Server-Sent Events via a Next.js route handler, fanned out across instances with Postgres `NOTIFY`. **No extra service** (reuses your Postgres), no Redis, no WebSocket server. One-directional server→client — ideal for live updates and the in-app notification inbox. |
| **Notifications** | Postgres table + SSE inbox + React Email | native | Store notifications in a Prisma-managed Postgres table, push in-app over the SSE channel above. **In-app leg needs no extra service** — replaces Novu's Mongo+Redis stack with infra you already run (you build the workflow/preferences logic yourself). ⚠️ The **email** leg inherits whichever transport you picked in Transactional email — Resend (SaaS) by default, or self-hosted SMTP if you swapped it. |
| **Outbound webhooks** | pg-boss + `standard-webhooks` | pg-boss **12.25.1** (Jul 2026) · standard-webhooks **1.0.0** (2024, stable spec) | Reliable signed webhook delivery with **no extra service**: pg-boss (already in the stack) queues deliveries with retries/backoff on your Postgres; `standard-webhooks` (the open spec) does HMAC signing/verification. Replaces Svix's server+Postgres+Redis. |
| **Search** | Postgres FTS + pgvector (+ `pg_trgm`) | pgvector **0.8.3** (Jun 2026) | **No extra service** — native full-text search (`tsvector` + GIN) with `pg_trgm` for typo-tolerant/fuzzy matching, plus **pgvector** for semantic/hybrid (embeddings) search — all in your existing Postgres. Pairs with the Vercel AI SDK for generating embeddings. Only leave Postgres for **Orama** (in-process) when the index is small/static (e.g. docs search). |
| **AI / LLM** | Vercel AI SDK (`ai`) | **7.0.22** (Jul 2026) | TypeScript toolkit for LLM features — streaming, tool calling, structured output, and a provider-agnostic API. MIT, free — but the SDK does nothing alone: ⚠️ **you always need a model provider**, which is either an external API (Anthropic/OpenAI = SaaS, billed per token) or a **self-hosted Ollama** service (extra infra, your own GPU/CPU). There is no zero-dependency option for AI features. |
| **Object storage** | Local disk/volume + sharp (default) → SeaweedFS if S3-compat needed | sharp **0.35.3** (Jul 2026) | Apache-2.0 (sharp) and Apache-2.0 (SeaweedFS, confirmed). No object store until you outgrow a volume. |
| **Error tracking** | Pino + Postgres error log table (default) → GlitchTip if you need a full Sentry-compatible UI | GlitchTip **6.2.0** (Jun 2026) | **Zero-dependency default**: capture errors via Pino, store in a Postgres table, view via a simple admin page — no extra service. **GlitchTip** (MIT) is the fallback for source-map grouping/alerting/a real UI, but it needs its own Postgres+Redis+Celery — an added service, not free. |
| **Analytics** | Pageview table in Postgres (default) → Umami if you want a dashboard UI | Umami **3.2.0** (Jun 2026) | **Zero-dependency default**: log pageviews/events to a Postgres table from a tiny route handler — no extra service. **Umami** (MIT) gives you a full dashboard UI, but ⚠️ it runs as its **own separate container** with its own Postgres/MySQL — an added service, not free. |
| **Rate limiting** | rate-limiter-flexible | **11.2.0** (Jun 2026) | In-process / Postgres-backed, no Redis. Protects login, API, webhooks. |
| **Authorization / RBAC** | Better Auth org/admin plugins + CASL | @casl/ability **7.0.1** (Jul 2026) | Fine-grained `can(user, action, resource)` checks shared client + server. |
| **Feature flags** | DB table + Vercel flags SDK | `flags` **4.2.0** (Jun 2026) | Flags live in your own Postgres. |

## UI & App Libraries

| Category | Pick | Version | Why |
|---|---|---|---|
| **Tables / data grids** | TanStack Table | **8.21.3** (2025) | Headless, fully typed; pairs cleanly with shadcn/ui markup. |
| **Charts / dataviz** | Recharts | **3.9.2** (Jul 2026) | Composable React charts for dashboards; sensible default before reaching for visx/D3. |
| **Animation** | Motion (formerly Framer Motion) | **12.42.2** (Jul 2026) | Declarative animations and gestures for React. |
| **Drag & drop** | dnd-kit | **6.3.1** (2024) | Accessible, performant DnD (sortable lists, kanban, builders). |
| **Dates** | date-fns | **4.4.0** (Jun 2026) | Tree-shakeable date utilities; timezone-aware. |
| **PDF generation** | pdf-lib / @react-pdf/renderer (+ Playwright for complex layouts) | pdf-lib **1.17.1** (2021) · @react-pdf/renderer **4.5.1** (Apr 2026) | Reuses Playwright already in the stack. pdf-lib is feature-stable/low-churn — check for maintenance activity before relying on it long-term. |
| **CSV import/export** | Papa Parse | **5.5.4** (Jun 2026) | Streaming, worker support. |
| **Onboarding tours** | driver.js | **1.6.0** (Jun 2026) | 5KB, framework-agnostic. |
| **Public API docs** | zod-openapi + Scalar | zod-openapi **6.0.0** (Jun 2026) · @scalar/nextjs-api-reference **0.11.8** (Jul 2026) | Only if exposing a public API; generates from Zod schemas you already have. |
