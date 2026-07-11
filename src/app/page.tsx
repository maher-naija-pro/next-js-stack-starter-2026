import { Suspense } from 'react';

import { AuthStatus } from '@/components/auth-status';
import { ContactForm } from '@/components/contact-form';
import { Counter } from '@/components/counter';
import { ExampleQuery } from '@/components/example-query';
import { TabFilter } from '@/components/tab-filter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Next.js Stack Starter 2026</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Mandatory core stack wired up — see{' '}
          <code className="rounded bg-muted px-1 py-0.5">STACK.md</code> for what's here and what's
          optional.
        </p>
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle>Forms — React Hook Form + Zod</CardTitle>
          <CardDescription>Validated client-side with a shared Zod schema.</CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}
