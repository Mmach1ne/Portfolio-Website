import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/theme';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders hero heading', () => {
    render(
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: "Hi, I'm Ray" })).toBeInTheDocument();
  });
});
