import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMedia } from '@/hooks/useMedia';
import { ThemeProvider } from '@/theme';
import { RaybotVisual } from './RaybotVisual';

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(() => false),
}));

describe('RaybotVisual', () => {
  it('shows memory slots beside the terminal on desktop', () => {
    vi.mocked(useMedia).mockReturnValue(false);

    render(
      <ThemeProvider>
        <RaybotVisual />
      </ThemeProvider>,
    );

    expect(screen.getByText('Memory slots')).toBeInTheDocument();
    expect(screen.getByText('Token throughput')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Advance terminal line' })).not.toBeInTheDocument();
  });

  it('drops memory slots and makes the terminal tappable on compact viewports', () => {
    vi.mocked(useMedia).mockReturnValue(true);

    render(
      <ThemeProvider>
        <RaybotVisual />
      </ThemeProvider>,
    );

    expect(screen.queryByText('Memory slots')).not.toBeInTheDocument();
    expect(screen.getByText('Token throughput')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Advance terminal line' })).toBeInTheDocument();
  });
});
