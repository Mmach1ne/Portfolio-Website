import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/theme';
import { ThermalVisual } from './ThermalVisual';

describe('ThermalVisual', () => {
  it('keeps the study caption and stat labels stable beside the heatmap', () => {
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
});
