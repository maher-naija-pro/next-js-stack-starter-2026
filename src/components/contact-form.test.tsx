import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ContactForm } from '@/components/contact-form';

describe('ContactForm', () => {
  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/at least 2 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
  });

  it('submits successfully with valid input', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByTestId('form-success')).toBeInTheDocument();
  });
});
