# Platform Services — integration guide

Assumes the mandatory core is already installed: Prisma client at `src/lib/prisma.ts`, Better Auth at `src/lib/auth.ts` / `src/lib/auth-client.ts`, Postgres reachable via `DATABASE_URL`.

## Payments / billing — Stripe

1. `pnpm add stripe` (server SDK) and `pnpm add @stripe/stripe-js` if a client-side Checkout redirect is needed.
2. `src/lib/stripe.ts`:
   ```ts
   import Stripe from 'stripe';
   export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
   ```
3. Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to `.env.example` (placeholders) and `.env` (leave blank/instruct the user to fill in their own test key — never invent a fake key that looks real).
4. Webhook receiver at `src/app/api/webhooks/stripe/route.ts` — verify with `stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!)`. Next.js route handlers give you the raw body via `await req.text()`.
5. Checkout: a Server Action calling `stripe.checkout.sessions.create(...)`, redirecting to `session.url`.

## Transactional email — Resend + React Email

1. `pnpm add resend react-email @react-email/components`
2. `src/lib/resend.ts`: `export const resend = new Resend(process.env.RESEND_API_KEY!);`
3. Email templates live in `emails/` at the repo root (React Email's convention) as `.tsx` files exporting a default component.
4. Send via `resend.emails.send({ from, to, subject, react: <MyEmail /> })`.
5. Add `RESEND_API_KEY` to `.env.example`. If the user wants the self-hosted-SMTP swap instead of Resend, use `nodemailer` against their SMTP creds instead of the `resend` package — ask which they want before installing.

## Background jobs / cron — pg-boss

1. `pnpm add pg-boss`
2. `src/lib/queue.ts`:
   ```ts
   import PgBoss from 'pg-boss';
   export const boss = new PgBoss(process.env.DATABASE_URL!);
   ```
3. pg-boss manages its own schema in the same Postgres DB — no new service, no new migration needed (it self-migrates on `boss.start()`).
4. Start it once at app boot (e.g. in `instrumentation.ts` using Next.js's `register()` hook) and define handlers with `boss.work('job-name', handler)`.

## Logging — Pino

1. `pnpm add pino` (+ `pnpm add -D pino-pretty` for readable local dev output).
2. `src/lib/logger.ts`:
   ```ts
   import pino from 'pino';
   export const logger = pino(
     process.env.NODE_ENV === 'development' ? { transport: { target: 'pino-pretty' } } : {},
   );
   ```
3. Use `logger.info(...)` / `logger.error(...)` in Server Actions and route handlers instead of `console.log`.

## Env validation — @t3-oss/env-nextjs + Zod

Zod is already installed (mandatory core).
1. `pnpm add @t3-oss/env-nextjs`
2. `src/lib/env.ts`:
   ```ts
   import { createEnv } from '@t3-oss/env-nextjs';
   import { z } from 'zod';

   export const env = createEnv({
     server: {
       DATABASE_URL: z.string().url(),
       BETTER_AUTH_SECRET: z.string().min(1),
     },
     client: {},
     experimental__runtimeEnv: {},
   });
   ```
3. Add every server env var actually used in the project as you go; import `env` instead of reading `process.env` directly in new code.

## Bot protection / CAPTCHA — ALTCHA

1. `pnpm add altcha altcha-lib`
2. Challenge endpoint: `src/app/api/altcha/route.ts`, generating a challenge via `altcha-lib`'s `createChallenge` with a server-side secret (`ALTCHA_HMAC_KEY` in `.env`).
3. Client widget: the `altcha` web component, mounted in the relevant form (e.g. sign-up) with `challengeurl="/api/altcha"`.
4. Verify submitted solutions server-side (in the Server Action / route handler that receives the form) with `verifySolution` from `altcha-lib` before proceeding.

## i18n / localization — next-intl

1. `pnpm add next-intl`
2. Needs a `[locale]` dynamic segment: move `src/app/*` into `src/app/[locale]/*`, add `src/i18n/routing.ts` and `src/i18n/request.ts` per next-intl's App Router setup, and wrap `next.config.ts` with `createNextIntlPlugin()`.
3. Add `messages/en.json` (and others) with translation keys; use `useTranslations()` in client components, `getTranslations()` in server code.
4. This changes the URL structure of every route — confirm with the user before restructuring `src/app/`.

## Realtime / live updates — SSE + Postgres LISTEN/NOTIFY

No new package.
1. Route handler `src/app/api/events/route.ts` returning a `ReadableStream`, using the `pg` client (already installed for Prisma's driver adapter) to run `LISTEN channel_name` and push `NOTIFY` payloads into the stream as SSE (`data: ...\n\n`).
2. Client: a `useEffect` opening `new EventSource('/api/events')`.
3. To emit: `NOTIFY channel_name, 'payload'` via a raw Prisma query (`prisma.$executeRawUnsafe`) after a relevant mutation.

## Notifications — Postgres table + SSE inbox + React Email

1. Add a `Notification` model to `prisma/schema.prisma` (id, userId, type, payload Json, readAt, createdAt) and run `pnpm db:migrate`.
2. Write notifications from Server Actions via `prisma.notification.create(...)`, then `NOTIFY` on the realtime channel above so the inbox updates live.
3. Inbox UI: a client component subscribed to the SSE stream from the Realtime entry, falling back to a TanStack Query fetch of `/api/notifications` for the initial list.
4. Email leg reuses whatever Transactional email integration is installed (Resend or SMTP) — don't create a second email client.

## Outbound webhooks — pg-boss + standard-webhooks

Requires pg-boss (see above).
1. `pnpm add standardwebhooks`
2. Add `WebhookEndpoint` and `WebhookDelivery` models to `prisma/schema.prisma` (endpoint URL, secret, event types; delivery status/attempts).
3. On the relevant domain event, enqueue a pg-boss job (`boss.send('webhook-delivery', payload)`).
4. Worker signs the payload with `standardwebhooks`'s `Webhook` class using the endpoint's secret, POSTs it, and records success/failure — retry via pg-boss's built-in retry/backoff options.

## Search — Postgres FTS + pgvector (+ pg_trgm)

1. Enable extensions once via a raw migration: `CREATE EXTENSION IF NOT EXISTS pg_trgm; CREATE EXTENSION IF NOT EXISTS vector;` (add as a `prisma migrate dev --create-only` migration, since Prisma doesn't manage extensions declaratively well).
2. Add a generated `tsvector` column + GIN index to the searchable model via raw SQL in a migration.
3. Query with `prisma.$queryRaw` using `to_tsquery` / `similarity()` (pg_trgm) as needed.
4. For semantic search, `pnpm add pgvector` isn't a thing — pgvector is a Postgres extension, not an npm package; store embeddings in a `vector` column (raw SQL migration) and generate them with the AI SDK (see below).
5. Only reach for `orama` (`pnpm add @orama/orama`) for a small/static in-process index (e.g. docs search) — not for large mutable app data.

## AI / LLM — Vercel AI SDK

1. `pnpm add ai @ai-sdk/anthropic` (swap the provider package for whichever the user wants — `@ai-sdk/openai`, etc. — or point at a self-hosted Ollama via `@ai-sdk/openai-compatible` pointed at the Ollama endpoint).
2. Confirm with the user which provider before installing — this always needs either a paid API key or a running Ollama instance; don't assume.
3. Route handler `src/app/api/chat/route.ts` using `streamText`/`generateText` from `ai`.

## Object storage — local disk (default) → SeaweedFS

Default (no install needed): write files under a `storage/` directory (gitignored) via Node's `fs`, referenced by a relative path stored in Postgres.
Upgrade to SeaweedFS only if the user needs S3 compatibility:
1. Add a `seaweedfs` service to `docker-compose.yml` (master+volume+filer, or the all-in-one `chrislusf/seaweedfs server` command).
2. `pnpm add @aws-sdk/client-s3` (SeaweedFS's S3 gateway is S3-API-compatible) and point the client's `endpoint` at the SeaweedFS filer.

## Error tracking — Pino + Postgres (default) → GlitchTip

Default: an `ErrorLog` Prisma model + a small helper in `src/lib/logger.ts` that writes caught errors there in addition to logging via Pino.
Upgrade to GlitchTip only if the user wants a full Sentry-compatible UI:
1. Add `glitchtip` (web+worker+beat) + `redis` services to `docker-compose.yml` — this is a real infra addition, flag it before doing it.
2. `pnpm add @sentry/nextjs`, point `SENTRY_DSN` at the self-hosted GlitchTip instance.

## Analytics — Postgres pageview table (default) → Umami

Default: a `PageView` Prisma model, written to from a lightweight route handler (`src/app/api/track/route.ts`) called from a client-side `useEffect` on route change.
Upgrade to Umami only if the user wants a dashboard UI:
1. Add a `umami` service (+ its own Postgres/MySQL — don't point it at the app's DB) to `docker-compose.yml`.
2. Add the Umami tracking script to `src/app/layout.tsx` per Umami's install snippet.

## Rate limiting — rate-limiter-flexible

1. `pnpm add rate-limiter-flexible`
2. `src/lib/rate-limit.ts`:
   ```ts
   import { RateLimiterPostgres } from 'rate-limiter-flexible';
   import { prisma } from '@/lib/prisma';
   // RateLimiterPostgres needs a raw pg Pool/Client, not the Prisma client directly —
   // reuse the same connection string as src/lib/prisma.ts.
   ```
3. Apply in Server Actions / route handlers that need protection (login, signup, public API endpoints) — key by IP or user id, consume points before proceeding.

## Authorization / RBAC — Better Auth org/admin plugins + CASL

1. Enable the `organization` and/or `admin` plugins in `src/lib/auth.ts`'s `betterAuth({ plugins: [...] })` config — regenerate the schema afterward with `npx @better-auth/cli generate --config src/lib/auth.ts --output prisma/schema.prisma -y` (this is the same command used to originally generate the auth schema; it's additive/safe to rerun).
2. `pnpm add @casl/ability`
3. `src/lib/ability.ts` defining `defineAbilityFor(user)` returning a CASL `Ability` instance built from the user's role/org membership.
4. Check with `ability.can('update', 'Post')` in Server Actions before mutating.

## Feature flags — DB table + Vercel flags SDK

1. Add a `FeatureFlag` Prisma model (key, enabled, rules Json).
2. `pnpm add flags`
3. Define flags in `src/lib/flags.ts` using the `flags` SDK's `flag()` helper, backed by a Prisma lookup instead of the SDK's default providers.
