import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/theme';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  it('renders duplicate lines with unique line numbers', () => {
    render(
      <ThemeProvider>
        <CodeBlock lines={['return x', 'return x', 'return y']} />
      </ThemeProvider>,
    );

    expect(screen.getAllByText('1')).toHaveLength(1);
    expect(screen.getAllByText('2')).toHaveLength(1);
    expect(screen.getAllByText('3')).toHaveLength(1);
    expect(screen.getAllByText('return x')).toHaveLength(2);
  });
});
