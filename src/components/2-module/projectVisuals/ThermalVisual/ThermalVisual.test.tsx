import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMedia } from '@/hooks/useMedia';
import { ThemeProvider } from '@/theme';
import { ThermalVisual } from './ThermalVisual';

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(() => false),
}));

describe('ThermalVisual', () => {
  it('keeps the study caption and stat labels stable beside the heatmap', () => {
    vi.mocked(useMedia).mockReturnValue(false);

    render(
      <ThemeProvider>
        <ThermalVisual />
      </ThemeProvider>,
    );

    expect(screen.getByText('Heatsink Dissipation Study')).toBeInTheDocument();
    expect(screen.getByText('T_max (°C)')).toBeInTheDocument();
    expect(screen.getByText('T_avg (°C)')).toBeInTheDocument();
    expect(screen.getByText('CFM')).toBeInTheDocument();
  });

  it('keeps the heatmap and fan control on compact viewports', () => {
    vi.mocked(useMedia).mockReturnValue(true);

    render(
      <ThemeProvider>
        <ThermalVisual />
      </ThemeProvider>,
    );

    expect(screen.getByText('Heatsink Dissipation Study')).toBeInTheDocument();
    expect(screen.getByText('T_max (°C)')).toBeInTheDocument();
    expect(screen.getAllByText('Fan RPM').length).toBeGreaterThan(0);
    expect(screen.queryByText('T_avg (°C)')).not.toBeInTheDocument();
    expect(screen.queryByText('CFM')).not.toBeInTheDocument();
  });
});
