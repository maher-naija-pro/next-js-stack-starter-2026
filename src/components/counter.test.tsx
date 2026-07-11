import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { Counter } from '@/components/counter';
import { useCounterStore } from '@/stores/counter-store';

describe('Counter', () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });

  it('renders the initial count', () => {
    render(<Counter />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('increments and decrements via the Zustand store', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByLabelText('Increment'));
    await user.click(screen.getByLabelText('Increment'));
    expect(screen.getByTestId('count')).toHaveTextContent('2');

    await user.click(screen.getByLabelText('Decrement'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });
});
