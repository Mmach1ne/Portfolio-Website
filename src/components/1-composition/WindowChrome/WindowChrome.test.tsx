import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/theme';
import { WindowChrome } from './WindowChrome';

describe('WindowChrome', () => {
  it('uses a frosted panel so widget content stays readable over the space scene', () => {
    render(
      <ThemeProvider>
        <WindowChrome title="demo">
          <span>inside</span>
        </WindowChrome>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('window-chrome')).toHaveClass('bg-[#0c1018]/85');
  });
});
