'use client';

import { Button } from '@/components/ui/button';
import { useCounterStore } from '@/stores/counter-store';

export function Counter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="icon" onClick={decrement} aria-label="Decrement">
        -
      </Button>
      <span data-testid="count" className="w-8 text-center font-mono">
        {count}
      </span>
      <Button variant="outline" size="icon" onClick={increment} aria-label="Increment">
        +
      </Button>
    </div>
  );
}
