'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';

const TABS = ['overview', 'settings'] as const;

export function TabFilter() {
  const [tab, setTab] = useQueryState('tab', parseAsStringLiteral(TABS).withDefault('overview'));

  return (
    <div className="flex gap-2">
      {TABS.map((value) => (
        <Button
          key={value}
          variant={tab === value ? 'default' : 'outline'}
          onClick={() => setTab(value)}
        >
          {value}
        </Button>
      ))}
    </div>
  );
}
