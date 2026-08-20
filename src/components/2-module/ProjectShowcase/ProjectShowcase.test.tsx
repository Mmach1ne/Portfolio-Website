import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { ProjectShowcase } from './ProjectShowcase';

vi.mock('../projectVisuals', () => ({
  getProjectVisual: () => () => <div data-testid="project-visual">visual</div>,
}));

const project = {
  id: 'stm32',
  slug: 'stm32-comms',
  title: 'STM32 Comms',
  subtitle: 'Dual Channel Communication System',
  description: 'Embedded system.',
  tech: ['C'],
  links: [{ kind: 'github' as const, href: 'https://example.com', label: 'VIEW CODE' }],
  visual: 'stm32' as const,
};

describe('ProjectShowcase', () => {
  it('uses a two-column layout from md up', () => {
    render(
      <ThemeProvider>
        <ProjectShowcase project={project} index={0} />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('project-showcase-grid')).toHaveClass('md:grid-cols-2');
  });

  it('places copy on the left for odd-indexed projects', () => {
    render(
      <ThemeProvider>
        <ProjectShowcase project={project} index={1} />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('project-showcase-copy')).toHaveClass('md:order-first');
  });

  it('sits on a frosted panel so copy stays readable over the backdrop', () => {
    render(
      <ThemeProvider>
        <ProjectShowcase project={project} index={0} />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('project-showcase')).toHaveClass('bg-[#0a0a0a]/75');
  });
});
