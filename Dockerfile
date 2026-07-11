# syntax=docker/dockerfile:1
# Pins Dockerfile syntax so the --mount=type=cache lines below are available.

# ---------------------------------------------------------------------------
# Stage: base — shared foundation for every other stage.
# ---------------------------------------------------------------------------
FROM node:24-alpine AS base
# Alpine/musl keeps the image small and matches Prisma's engine binary target used at build time.

RUN corepack enable
# Resolves `pnpm` to the version pinned in package.json instead of whatever's on the host.

# ---------------------------------------------------------------------------
# Stage: deps — install dependencies in their own cacheable layer.
# ---------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy only lockfile-related files first so this layer is cached until they change.

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile --ignore-scripts
# Cache mount persists pnpm's store across builds; --frozen-lockfile fails loudly on drift; --ignore-scripts skips native postinstall hooks (Prisma fetches its own engine at `generate` time regardless, so nothing is lost) since they require interactive approval pnpm can't get in a non-TTY build.

# ---------------------------------------------------------------------------
# Stage: builder — compile the app using the deps installed above.
# ---------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
# Disables Next.js's anonymous build-time telemetry.

COPY --from=deps /app/node_modules ./node_modules
# Reuse the node_modules installed in the deps stage.

COPY . .
# Requires .dockerignore (node_modules, .env*, .git, .next) or this overwrites/leaks them.

RUN pnpm db:generate
# Generates the Prisma client on the same Alpine/musl base the app will run on.

RUN pnpm build
# Produces .next/standalone + .next/static; only those are copied into the runner stage.

# ---------------------------------------------------------------------------
# Stage: runner — the actual production image. Small, non-root, minimal.
# ---------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache tini
# tini as PID 1 properly forwards signals and reaps zombies, unlike Node.

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
# Dedicated unprivileged user so a compromised dependency doesn't get root.

COPY --from=builder /app/public ./public
# Static assets aren't bundled into the standalone server output.

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Chowned up front so USER nextjs below can actually read/execute these files.

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Client-side JS/CSS bundles, served at /_next/static.

USER nextjs
# Drop root privileges for every instruction from here on, including CMD.

EXPOSE 3000
# Informational only — actual publishing happens in docker-compose.yml.

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Must be 0.0.0.0, not "localhost", or the server is unreachable from outside the container.

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1
# 127.0.0.1, not "localhost" — Alpine resolves that to ::1 first, which the server isn't listening on. Checks DB connectivity too (see src/app/api/health/route.ts), not just process liveness.

ENTRYPOINT ["tini", "--"]
# Signals (SIGTERM on `docker stop`) now correctly reach node for a clean shutdown.

CMD ["node", "server.js"]
