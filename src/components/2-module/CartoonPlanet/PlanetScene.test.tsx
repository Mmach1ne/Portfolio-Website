import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/theme';
import { PlanetScene } from './PlanetScene';

describe('PlanetScene', () => {
  it('renders flat SVG planets instead of a 3D canvas', () => {
    render(
      <ThemeProvider>
        <PlanetScene />
      </ThemeProvider>,
    );

    const earth = screen.getByTestId('cartoon-planet-earth');
    const ring = screen.getByTestId('cartoon-planet-ring');
    const ice = screen.getByTestId('cartoon-planet-ice');
    const gas = screen.getByTestId('cartoon-planet-gas');

    expect(earth.tagName.toLowerCase()).toBe('svg');
    expect(ring.tagName.toLowerCase()).toBe('svg');
    expect(ice.tagName.toLowerCase()).toBe('svg');
    expect(gas.tagName.toLowerCase()).toBe('svg');
    expect(screen.queryByTestId('space-canvas')).not.toBeInTheDocument();
  });
});
