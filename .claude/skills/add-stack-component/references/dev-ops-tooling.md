# Dev & Ops Tooling — integration guide

## Monorepo / package manager — Turborepo + pnpm

Only relevant once there's more than one app/package. Steps:
1. `pnpm add -D -w turbo`
2. Create `pnpm-workspace.yaml` entries for `apps/*` and `packages/*` (this repo currently has no `apps/`/`packages/` split — moving the existing app into `apps/web` is a bigger restructure; confirm with the user before doing it, it's not reversible without care).
3. Add a root `turbo.json` with pipeline tasks matching the existing `package.json` scripts (`build`, `dev`, `lint`, `test`).
4. Move root scripts to filter through turbo, e.g. `"build": "turbo run build"`.

## Documentation — Fumadocs

1. `pnpm add fumadocs-core fumadocs-ui fumadocs-mdx`
2. Fumadocs needs its own route group, e.g. `src/app/docs/`, plus a `source.config.ts` at the repo root and a `lib/source.ts`. Follow the "Manual Installation" flow from Fumadocs' own docs (App Router, `next.config.ts` needs the Fumadocs MDX plugin wrapping the existing config — don't drop the current `output: 'standalone'` setting).
3. Add an initial `content/docs/index.mdx`.

## Dependency updates — npm-check-updates

1. `pnpm add -D -w npm-check-updates`
2. Add an npm script: `"deps:check": "ncu"`, `"deps:update": "ncu -u && pnpm install"`.
3. Add a GitHub Actions workflow `.github/workflows/dependency-updates.yml` on a weekly cron that runs `ncu -u`, and opens a PR via `gh pr create` (needs `contents: write` + `pull-requests: write` permissions in the workflow).

## Secrets management — SOPS + age

1. Not an npm package — install the `sops` and `age` CLIs (system package manager or GitHub release binaries; don't try to `pnpm add` these).
2. Generate a key: `age-keygen -o key.txt` (never commit `key.txt` — add it to `.gitignore`).
3. Add a `.sops.yaml` at the repo root pointing at the public key.
4. Encrypt secrets with `sops -e .env > .env.enc` (or a dedicated `secrets.enc.yaml`); commit the encrypted file, not the plaintext.
5. Document the decrypt-at-deploy step in the README (`sops -d .env.enc > .env`).

## DB backups — pgBackRest

1. Not an npm package — it runs against the Postgres instance itself, typically as a sidecar or cron job, not inside the Next.js app.
2. For the local Docker Compose setup: add a `pgbackrest` service (or a scheduled `docker compose run` via cron/systemd timer) that mounts the same Postgres data volume and a backup destination volume.
3. Minimum viable config: a `pgbackrest.conf` defining the stanza (`[app]`), the repo path, and retention (`repo1-retention-full`). Point it at the `postgres` service's `pg_data` path.
4. This is a production-readiness item — for local dev, it's fine to document the setup without actually running it continuously.

## Git hooks — lefthook

1. `pnpm add -D -w lefthook`
2. Add `lefthook.yml` at the repo root:
   ```yaml
   pre-commit:
     commands:
       biome:
         glob: '*.{js,ts,jsx,tsx,json}'
         run: pnpm exec biome check --write {staged_files}
       typecheck:
         run: pnpm exec tsc --noEmit
   ```
3. Run `pnpm exec lefthook install` once to wire the git hook.

## Versioning — Changesets

1. `pnpm add -D -w @changesets/cli`
2. `pnpm exec changeset init` — creates `.changeset/config.json`.
3. Add npm scripts: `"changeset": "changeset"`, `"version": "changeset version"`, `"release": "changeset publish"`.
4. Only useful if this becomes a monorepo with independently versioned packages, or if you publish anything to npm — for a single deployed app, this is often skippable unless the user wants structured release notes.
