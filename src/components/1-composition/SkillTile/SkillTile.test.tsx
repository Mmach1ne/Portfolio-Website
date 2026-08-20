import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/theme';
import { SkillTile } from './SkillTile';

describe('SkillTile', () => {
  it('draws a 2px white outline around the logo card', () => {
    render(
      <ThemeProvider>
        <SkillTile file="git.png" label="Git" />
      </ThemeProvider>,
    );

    const tile = screen.getByText('Git').closest('[data-testid="skill-tile"]');
    expect(tile).toBeTruthy();
    expect(tile).toHaveClass('border-2');
    expect(tile).toHaveClass('border-white');
  });
});
