import {
  ArrowRight,
  ArrowUpCircle,
  BadgeCheck,
  BarChart3,
  Bell,
  Bot,
  Boxes,
  Braces,
  CalendarDays,
  Clock,
  Component,
  Container,
  CreditCard,
  Database,
  FileSpreadsheet,
  FileText,
  Flag,
  FlaskConical,
  GitBranch,
  GitCommitHorizontal,
  HardDriveDownload,
  KeyRound,
  Languages,
  Layers,
  LineChart,
  ListChecks,
  Lock,
  type LucideIcon,
  Mail,
  MousePointerClick,
  Network,
  Palette,
  Radio,
  RefreshCw,
  Route,
  ScrollText,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Table,
  Timer,
  Webhook,
  Workflow,
} from 'lucide-react';
import { Suspense } from 'react';

import { AuthStatus } from '@/components/auth-status';
import { ContactForm } from '@/components/contact-form';
import { Counter } from '@/components/counter';
import { ExampleQuery } from '@/components/example-query';
import { TabFilter } from '@/components/tab-filter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type StackItem = {
  name: string;
  version: string;
  desc: string;
  icon: LucideIcon;
};

type CategoryGroup = {
  id: string;
  title: string;
  tagline: string;
  accent: string; // tailwind text color for the icon
  ring: string; // tailwind border tint on hover
  items: StackItem[];
};

const CORE_STACK: StackItem[] = [
  {
    name: 'Next.js + React',
    version: '16.3 · 19.2',
    desc: 'App Router, Server Components, Server Actions, streaming.',
    icon: Layers,
  },
  {
    name: 'TypeScript',
    version: '7.0',
    desc: 'Strict mode. v7 ships the native Go compiler.',
    icon: Braces,
  },
  {
    name: 'Tailwind CSS',
    version: 'v4.3',
    desc: 'Faster engine, CSS-first config, zero runtime.',
    icon: Palette,
  },
  {
    name: 'shadcn/ui',
    version: '4.13',
    desc: 'Copy-in Radix + Tailwind components you own.',
    icon: Component,
  },
  {
    name: 'PostgreSQL',
    version: '18.4',
    desc: 'Native UUIDv7 keys. Self-host via Compose.',
    icon: Database,
  },
  {
    name: 'Prisma ORM',
    version: '7.8',
    desc: 'Type-safe, schema-first. Rust-free, ~90ms cold start.',
    icon: Boxes,
  },
  {
    name: 'Better Auth',
    version: '1.6',
    desc: '2FA, passkeys, org/RBAC — self-hosted, no SaaS.',
    icon: ShieldCheck,
  },
  {
    name: 'TanStack Query',
    version: '5.10',
    desc: 'Client caching paired with Server Actions.',
    icon: Network,
  },
  {
    name: 'Zustand · nuqs · XState',
    version: 'client state',
    desc: 'Global, URL, and flow state — the right tool for each.',
    icon: Workflow,
  },
  {
    name: 'Zod',
    version: '4.4',
    desc: 'One schema shared across client, server, and forms.',
    icon: BadgeCheck,
  },
  {
    name: 'React Hook Form',
    version: '7.81',
    desc: 'The standard forms pairing, validated with Zod.',
    icon: ListChecks,
  },
  {
    name: 'Vitest + Playwright',
    version: 'test',
    desc: 'Fast unit tests and the e2e standard, together.',
    icon: FlaskConical,
  },
  {
    name: 'MSW + Faker',
    version: 'test data',
    desc: 'Network-level mocks and reproducible fixtures.',
    icon: Sparkles,
  },
  {
    name: 'Biome',
    version: '2.5',
    desc: 'One Rust tool for lint + format. 25–56× faster.',
    icon: Sparkles,
  },
  {
    name: 'Docker + Compose',
    version: 'v2',
    desc: 'Reproducible local dev and lean standalone images.',
    icon: Container,
  },
];

const OPTIONAL_GROUPS: CategoryGroup[] = [
  {
    id: 'devops',
    title: 'Dev & Ops Tooling',
    tagline: 'Scale from one app to a monorepo, ship safely.',
    accent: 'text-sky-500',
    ring: 'group-hover:border-sky-500/40',
    items: [
      {
        name: 'Turborepo + pnpm',
        version: '2.10 · 11.11',
        desc: 'Cached, parallel tasks; fast strict installs.',
        icon: Boxes,
      },
      {
        name: 'Fumadocs',
        version: '16.11',
        desc: 'App Router-native MDX docs with search.',
        icon: FileText,
      },
      {
        name: 'npm-check-updates',
        version: '~22.x',
        desc: 'Scheduled CI job that opens update PRs.',
        icon: ArrowUpCircle,
      },
      {
        name: 'SOPS + age',
        version: '3.13 · 1.3',
        desc: 'Encrypt secrets at rest, in the repo.',
        icon: Lock,
      },
      {
        name: 'pgBackRest',
        version: '2.58',
        desc: 'Production-grade Postgres backups. CLI only.',
        icon: HardDriveDownload,
      },
      {
        name: 'lefthook',
        version: '2.1',
        desc: 'Fast pre-commit hooks for Biome + typecheck.',
        icon: GitBranch,
      },
      {
        name: 'Changesets',
        version: '2.31',
        desc: 'Monorepo-aware versioning and release notes.',
        icon: GitCommitHorizontal,
      },
    ],
  },
  {
    id: 'platform',
    title: 'Platform Services',
    tagline: 'Self-host-first — most run on your existing Postgres.',
    accent: 'text-emerald-500',
    ring: 'group-hover:border-emerald-500/40',
    items: [
      {
        name: 'Stripe',
        version: '22.3',
        desc: 'Subscriptions and checkout via webhooks.',
        icon: CreditCard,
      },
      {
        name: 'Resend + React Email',
        version: '6.17',
        desc: 'JSX email templates, provider-agnostic.',
        icon: Mail,
      },
      {
        name: 'pg-boss',
        version: '12.25',
        desc: 'Jobs, cron, and retries on your Postgres.',
        icon: Clock,
      },
      {
        name: 'Pino',
        version: '10.3',
        desc: 'Fast structured JSON logs to any collector.',
        icon: ScrollText,
      },
      {
        name: 'SSE + LISTEN/NOTIFY',
        version: 'native',
        desc: 'Realtime live updates, no Redis or WS server.',
        icon: Radio,
      },
      {
        name: 'Notifications inbox',
        version: 'native',
        desc: 'Postgres table + SSE + React Email.',
        icon: Bell,
      },
      {
        name: 'Outbound webhooks',
        version: 'standard',
        desc: 'Signed delivery: pg-boss + standard-webhooks.',
        icon: Webhook,
      },
      {
        name: 'Search: FTS + pgvector',
        version: '0.8',
        desc: 'Full-text, fuzzy, and semantic — all in Postgres.',
        icon: Search,
      },
      {
        name: 'Vercel AI SDK',
        version: '7.0',
        desc: 'Streaming, tool calls, structured output.',
        icon: Bot,
      },
      {
        name: 'next-intl',
        version: '4.13',
        desc: 'App Router-native i18n and formatting.',
        icon: Languages,
      },
      {
        name: 'ALTCHA',
        version: '3.2',
        desc: 'Privacy-friendly proof-of-work CAPTCHA.',
        icon: Shield,
      },
      {
        name: 'rate-limiter-flexible',
        version: '11.2',
        desc: 'In-process / Postgres-backed, no Redis.',
        icon: Timer,
      },
      {
        name: 'CASL + Better Auth RBAC',
        version: '7.0',
        desc: 'Fine-grained can(user, action, resource).',
        icon: KeyRound,
      },
      {
        name: 'Feature flags',
        version: '4.2',
        desc: 'Flags in your own Postgres, Vercel flags SDK.',
        icon: Flag,
      },
    ],
  },
  {
    id: 'ui-libs',
    title: 'UI & App Libraries',
    tagline: 'Reach for these when a feature actually needs them.',
    accent: 'text-amber-500',
    ring: 'group-hover:border-amber-500/40',
    items: [
      {
        name: 'TanStack Table',
        version: '8.21',
        desc: 'Headless, fully typed data grids.',
        icon: Table,
      },
      {
        name: 'Recharts',
        version: '3.9',
        desc: 'Composable React charts for dashboards.',
        icon: BarChart3,
      },
      {
        name: 'Motion',
        version: '12.42',
        desc: 'Declarative animations and gestures.',
        icon: Sparkles,
      },
      {
        name: 'dnd-kit',
        version: '6.3',
        desc: 'Accessible drag & drop — lists, kanban.',
        icon: MousePointerClick,
      },
      {
        name: 'date-fns',
        version: '4.4',
        desc: 'Tree-shakeable, timezone-aware dates.',
        icon: CalendarDays,
      },
      {
        name: 'pdf-lib / react-pdf',
        version: '4.5',
        desc: 'Generate PDFs, reusing Playwright too.',
        icon: FileText,
      },
      {
        name: 'Papa Parse',
        version: '5.5',
        desc: 'Streaming CSV import/export with workers.',
        icon: FileSpreadsheet,
      },
      {
        name: 'driver.js',
        version: '1.6',
        desc: '5KB framework-agnostic onboarding tours.',
        icon: Route,
      },
      {
        name: 'zod-openapi + Scalar',
        version: '6.0',
        desc: 'Public API docs from schemas you already have.',
        icon: LineChart,
      },
    ],
  },
];

const STATS = [
  { value: '15', label: 'Core stack layers' },
  { value: '30+', label: 'Optional add-ons' },
  { value: 'Self-host', label: 'First, by default' },
  { value: 'Jul 2026', label: 'Versions verified' },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="font-heading mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      {/* ---- Sticky glass navbar ---- */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="font-heading flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="size-4" />
            </span>
            <span>Stack&nbsp;2026</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#core">
              Core
            </a>
            <a className="transition-colors hover:text-foreground" href="#optional">
              Optional
            </a>
            <a className="transition-colors hover:text-foreground" href="#ai">
              AI
            </a>
            <a className="transition-colors hover:text-foreground" href="#philosophy">
              Philosophy
            </a>
            <a className="transition-colors hover:text-foreground" href="#live">
              Live demos
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Star className="size-3.5" />
                GitHub
              </a>
            </Button>
            <Button asChild size="sm">
              <a href="#live">
                Get started
                <ArrowRight className="size-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-dotgrid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
          <div
            className="glow-blob left-1/4 top-[-6rem] size-72 bg-indigo-500/40"
            aria-hidden="true"
          />
          <div className="glow-blob right-1/4 top-10 size-72 bg-violet-500/30" aria-hidden="true" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center sm:pt-28">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href="#ai"
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 shadow-sm backdrop-blur transition-colors hover:bg-indigo-500/15 dark:text-indigo-300"
              >
                <Sparkles className="size-3.5" />
                AI-optimized
              </a>
              <a
                href="#optional"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                Latest versions verified July 2026
              </a>
            </div>

            <h1 className="font-heading mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              The Next.js stack that <span className="text-brand-gradient">ships</span>,
              <br className="hidden sm:block" /> not the one that gambles.
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              An opinionated, production-proven foundation for 2026. A mandatory core to build,
              test, and ship anything — plus every optional add-on, grouped so you add only what a
              feature actually needs.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 px-5 text-sm">
                <a href="#core">
                  Explore the stack
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-5 text-sm">
                <a href="#live">See it running live</a>
              </Button>
            </div>

            <code className="mt-8 rounded-lg border border-border/70 bg-muted/50 px-4 py-2 font-mono text-sm text-muted-foreground">
              <span className="text-emerald-500">$</span> pnpm create next-app --stack 2026
            </code>

            {/* Stats strip */}
            <dl className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-background px-4 py-6 text-center">
                  <dt className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- Mandatory Core Stack ---- */}
        <section id="core" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24">
          <SectionHeading
            eyebrow="Mandatory Core"
            title="Everything you need to ship, wired up"
            description="Fifteen layers that every app on this stack shares — each pick a current default rather than a bleeding-edge gamble."
          />

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_STACK.map((item, i) => {
              const Icon = item.icon;
              const wide = i === 0 ? 'lg:col-span-2' : '';
              return (
                <div
                  key={item.name}
                  className={`group relative flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5 ${wide}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border border-border/60 bg-muted/40 text-indigo-500 transition-colors group-hover:border-indigo-500/30">
                      <Icon className="size-5" />
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
                      {item.version}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold tracking-tight">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---- Optional Additions ---- */}
        <section id="optional" className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <SectionHeading
              eyebrow="Optional Additions"
              title="Add only what a feature needs"
              description="Thirty-plus battle-tested picks, grouped by category. Most lean on infrastructure you already run — your Postgres, your CI — before reaching for a SaaS."
            />

            <div className="mt-14 flex flex-col gap-16">
              {OPTIONAL_GROUPS.map((group) => (
                <div key={group.id}>
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3">
                    <h3 className="font-heading text-xl font-semibold tracking-tight">
                      {group.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{group.tagline}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className={`group flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${group.ring}`}
                        >
                          <span
                            className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-border/60 bg-muted/40 ${group.accent}`}
                          >
                            <Icon className="size-4.5" />
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                              <h4 className="text-sm font-semibold leading-tight tracking-tight">
                                {item.name}
                              </h4>
                              <span className="shrink-0 font-mono text-[0.65rem] text-muted-foreground">
                                {item.version}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Philosophy ---- */}
        <section id="philosophy" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24">
          <SectionHeading
            eyebrow="The through-line"
            title="Self-host-first, SaaS only when it earns it"
            description="Every optional pick has a zero-dependency default that runs on infrastructure you already own. Reach for a hosted service only when scale or expertise demands it."
          />
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: Database,
                title: 'One database does a lot',
                body: 'Jobs, search, realtime, notifications, analytics, rate limits — all backed by your existing Postgres. No Redis, no Mongo, no sprawl.',
              },
              {
                icon: Lock,
                title: 'You own your data & auth',
                body: 'Better Auth runs in-app against your Postgres. Secrets stay encrypted in the repo with SOPS. No feature paywalls, no vendor lock-in.',
              },
              {
                icon: RefreshCw,
                title: 'A clear upgrade path',
                body: 'Start on the free default; graduate to Inngest, GlitchTip, or Umami when you outgrow it. The escape hatch is documented, not a surprise.',
              },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-heading mt-4 text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---- AI-optimized ---- */}
        <section id="ai" className="scroll-mt-20 border-t border-border/60 py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300">
                <Sparkles className="size-3.5" />
                AI-optimized
              </span>
              <h2 className="font-heading mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Built to be built <span className="text-brand-gradient">with AI</span>
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                Two ways this stack meets AI where it is — a codebase that coding agents navigate
                cleanly, and first-class primitives for shipping AI product features.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  icon: Braces,
                  title: 'Agent-friendly by design',
                  body: 'Strict TypeScript, Zod schemas, and generated Prisma types give AI coding agents a tight, type-checked feedback loop. Biome lints in milliseconds and conventions stay consistent — so generated code fits right in.',
                },
                {
                  icon: Sparkles,
                  title: 'Ships with a Claude Code skill',
                  body: 'The add-stack-component skill installs and wires optional pieces on demand — payments, email, search — following the repo’s own patterns. Extend the stack by asking, not gluing.',
                },
                {
                  icon: Bot,
                  title: 'AI features are first-class',
                  body: 'The Vercel AI SDK (streaming, tool calls, structured output) plus pgvector for embeddings and hybrid RAG search — build chat, semantic search, and agents on the Postgres you already run.',
                },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5"
                  >
                    <span className="grid size-11 place-items-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-heading mt-4 text-lg font-semibold tracking-tight">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---- Live demos (the wired components) ---- */}
        <section id="live" className="scroll-mt-20 border-t border-border/60 bg-muted/30 py-24">
          <div className="mx-auto w-full max-w-5xl px-6">
            <SectionHeading
              eyebrow="Running in this starter"
              title="Not a mockup — it's live"
              description="These aren't screenshots. Each card below is the core stack wired up and running on this very page. Clone the repo and it works out of the box."
            />

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Auth — Better Auth</CardTitle>
                  <CardDescription>Session state from the Better Auth client.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AuthStatus />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client state — Zustand</CardTitle>
                  <CardDescription>Global store, no provider needed.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Counter />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>URL state — nuqs</CardTitle>
                  <CardDescription>Type-safe state synced to the query string.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={null}>
                    <TabFilter />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Server state — TanStack Query</CardTitle>
                  <CardDescription>Fetches `/api/example`, cached client-side.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExampleQuery />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Forms — React Hook Form + Zod</CardTitle>
                  <CardDescription>Validated client-side with a shared Zod schema.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-primary px-6 py-16 text-center text-primary-foreground">
            <div
              className="glow-blob left-1/2 top-0 size-72 -translate-x-1/2 bg-violet-500/40"
              aria-hidden="true"
            />
            <h2 className="font-heading relative mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Stop assembling boilerplate. Start shipping.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-primary-foreground/80">
              Clone the repo, read <code className="font-mono">STACK.md</code>, and add optional
              components with the built-in <code className="font-mono">add-stack-component</code>{' '}
              workflow.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="h-11 px-5 text-sm">
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <Star className="size-4" />
                  Clone on GitHub
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 border-primary-foreground/30 bg-transparent px-5 text-sm text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href="#core">Review the stack</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground">
              <Layers className="size-3.5" />
            </span>
            <span>Next.js Stack Starter — 2026 edition</span>
          </div>
          <p>Opinionated. Production-proven. Self-host-first.</p>
        </div>
      </footer>
    </div>
  );
}
