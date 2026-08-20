import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useMedia } from '@/hooks/useMedia';
import { ThemeProvider } from '@/theme';
import { Stm32Visual } from './Stm32Visual';

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(() => false),
}));

describe('Stm32Visual', () => {
  it('shows firmware source and connection telemetry on desktop', () => {
    vi.mocked(useMedia).mockReturnValue(false);

    render(
      <ThemeProvider>
        <Stm32Visual />
      </ThemeProvider>,
    );

    expect(screen.getByText('GPIO Status')).toBeInTheDocument();
    expect(screen.getByText('Connection')).toBeInTheDocument();
    expect(screen.getByTestId('code-block')).toHaveTextContent('#include "stm32f4xx.h"');
    expect(screen.queryByRole('button', { name: 'Toggle PA0' })).not.toBeInTheDocument();
  });

  it('keeps the scope and tappable pins on compact viewports', async () => {
    vi.mocked(useMedia).mockReturnValue(true);
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <Stm32Visual />
      </ThemeProvider>,
    );

    expect(screen.getByText('GPIO Status')).toBeInTheDocument();
    expect(screen.getByText('UART stream')).toBeInTheDocument();
    expect(screen.queryByText('Connection')).not.toBeInTheDocument();
    expect(screen.queryByTestId('code-block')).not.toBeInTheDocument();

    const pins = screen.getAllByRole('button', { name: /Toggle PA/ });
    expect(pins).toHaveLength(4);
    const pin = screen.getByRole('button', { name: 'Toggle PA1' });
    await user.click(pin);
    expect(pin).toBeInTheDocument();
  });
});
