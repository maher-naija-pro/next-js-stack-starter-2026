'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { authClient, useSession } from '@/lib/auth-client';

export function AuthStatus() {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  if (isPending) return <p className="text-sm text-muted-foreground">Loading session…</p>;

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <p className="text-sm" data-testid="auth-status">
          Signed in as {session.user.email}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            setLoading(true);
            await authClient.signOut();
            setLoading(false);
          }}
          disabled={loading}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <p className="text-sm text-muted-foreground" data-testid="auth-status">
      Not signed in — see{' '}
      <code className="rounded bg-muted px-1 py-0.5">src/lib/auth-client.ts</code> to wire up a
      sign-in form.
    </p>
  );
}
