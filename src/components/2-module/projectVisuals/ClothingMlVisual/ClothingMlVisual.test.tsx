import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { ClothingMlVisual } from './ClothingMlVisual';

describe('ClothingMlVisual', () => {
  it('keeps the model source visible while training ticks', () => {
    vi.useFakeTimers();

    render(
      <ThemeProvider>
        <ClothingMlVisual />
      </ThemeProvider>,
    );

    const code = screen.getByTestId('code-block');
    expect(code).toHaveTextContent('import torch');
    expect(screen.getByText('Epochs')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(180 * 24);
    });

    expect(screen.getByTestId('code-block')).toBe(code);
    expect(code).toHaveTextContent('class FashionCNN(torch.nn.Module):');
    expect(screen.getByText('Epochs')).toBeInTheDocument();
    expect(screen.getByText('Fashion-MNIST confidence')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
