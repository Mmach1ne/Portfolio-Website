import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('submit calls fetch with form-name=contact', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ContactForm />
      </ThemeProvider>,
    );

    await user.type(screen.getByLabelText('Name'), 'Ray Xue');
    await user.type(screen.getByLabelText('Email'), 'ray@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello');
    await user.click(screen.getByRole('button', { name: 'SUBMIT' }));

    expect(fetchMock).toHaveBeenCalled();
    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/__forms.html');
    expect(options.body).toContain('form-name=contact');
  });
});
