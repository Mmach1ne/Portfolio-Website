import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { PageBackdrop } from './PageBackdrop';

vi.mock('@/hooks/useFinePointer', () => ({
  useFinePointer: () => true,
}));

vi.mock('@/components/2-module/SpaceCanvas', () => ({
  SpaceCanvas: () => <div data-testid="space-canvas" />,
}));

vi.mock('@/components/2-module/PageFog', () => ({
  PageFog: () => <div data-testid="page-fog" />,
}));

describe('PageBackdrop', () => {
  it('keeps the custom cursor outside the z-index 0 scene', () => {
    render(
      <ThemeProvider>
        <PageBackdrop />
      </ThemeProvider>,
    );

    const scene = screen.getByTestId('page-backdrop-scene');
    const cursor = screen.getByTestId('custom-cursor');

    expect(scene).not.toContainElement(cursor);
  });
});
