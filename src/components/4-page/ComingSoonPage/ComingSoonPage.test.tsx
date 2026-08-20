import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/theme';
import { ComingSoonPage } from './ComingSoonPage';

describe('ComingSoonPage', () => {
  it('renders coming soon heading', () => {
    render(
      <ThemeProvider>
        <ComingSoonPage />
      </ThemeProvider>,
    );

    expect(screen.getByText('Not yet available, coming soon!')).toBeInTheDocument();
  });
});
