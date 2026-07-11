'use client';

import { useQuery } from '@tanstack/react-query';

async function fetchExample(): Promise<{ message: string }> {
  const res = await fetch('/api/example');
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

export function ExampleQuery() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['example'],
    queryFn: fetchExample,
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (isError) return <p className="text-sm text-destructive">Failed to load.</p>;

  return (
    <p data-testid="query-result" className="text-sm">
      {data?.message}
    </p>
  );
}
