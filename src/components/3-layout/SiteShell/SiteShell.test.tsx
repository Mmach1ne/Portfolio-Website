import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { SiteShell } from './SiteShell';

vi.mock('@/components/2-module/Navigation', () => ({
  Navigation: () => <nav>nav</nav>,
}));

describe('SiteShell', () => {
  it('does not paint an opaque background over the space canvas', () => {
    render(
      <ThemeProvider>
        <SiteShell>
          <div>content</div>
        </SiteShell>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('site-shell')).toHaveClass('bg-transparent');
  });
});
