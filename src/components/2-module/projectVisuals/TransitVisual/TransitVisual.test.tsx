import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useMedia } from '@/hooks/useMedia';
import { ThemeProvider } from '@/theme';
import { TransitVisual } from './TransitVisual';

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(() => false),
}));

vi.mock('@/vendor/map', () => ({
  Map: ({ children, style }: { children: ReactNode; style?: { height?: number } }) => (
    <div data-testid="transit-map" data-height={style?.height}>
      {children}
    </div>
  ),
  Source: ({ children }: { children: ReactNode }) => <>{children}</>,
  Layer: () => null,
  Marker: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('TransitVisual', () => {
  it('shows fleet telemetry under the map on desktop', () => {
    vi.mocked(useMedia).mockReturnValue(false);

    render(
      <ThemeProvider>
        <TransitVisual />
      </ThemeProvider>,
    );

    expect(screen.getByText('Route 13')).toBeInTheDocument();
    expect(screen.getByText('GPS Accuracy')).toBeInTheDocument();
    expect(screen.getByText('Fleet Online')).toBeInTheDocument();
    expect(screen.getByTestId('transit-map')).toHaveAttribute('data-height', '220');
  });

  it('zooms the map out and drops meters on compact viewports', () => {
    vi.mocked(useMedia).mockReturnValue(true);

    render(
      <ThemeProvider>
        <TransitVisual />
      </ThemeProvider>,
    );

    expect(screen.getByText('Route 13')).toBeInTheDocument();
    expect(screen.getByText('Live fleet simulation')).toBeInTheDocument();
    expect(screen.queryByText('GPS Accuracy')).not.toBeInTheDocument();
    expect(screen.queryByText('Fleet Online')).not.toBeInTheDocument();
    expect(screen.getByTestId('transit-map')).toHaveAttribute('data-height', '168');
  });
});
