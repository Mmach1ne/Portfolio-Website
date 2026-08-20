import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMedia } from '@/hooks/useMedia';
import { ThemeProvider } from '@/theme';
import { ClothingMlVisual } from './ClothingMlVisual';

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(() => false),
}));

describe('ClothingMlVisual', () => {
  it('keeps the model source visible while training ticks', () => {
    vi.mocked(useMedia).mockReturnValue(false);
    vi.useFakeTimers();

    render(
      <ThemeProvider>
        <ClothingMlVisual />
      </ThemeProvider>,
    );

    const code = screen.getByTestId('code-block');
    expect(code).toHaveTextContent('import torch');
    expect(screen.getByText('Epochs')).toBeInTheDocument();
    expect(screen.getByText('Learning rate')).toBeInTheDocument();
    expect(screen.getByText('Pullover')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(180 * 24);
    });

    expect(screen.getByTestId('code-block')).toBe(code);
    expect(code).toHaveTextContent('class FashionCNN(torch.nn.Module):');
    expect(screen.getByText('Epochs')).toBeInTheDocument();
    expect(screen.getByText('Fashion-MNIST confidence')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('drops the source and extra sliders on compact viewports', () => {
    vi.mocked(useMedia).mockReturnValue(true);

    render(
      <ThemeProvider>
        <ClothingMlVisual />
      </ThemeProvider>,
    );

    expect(screen.queryByTestId('code-block')).not.toBeInTheDocument();
    expect(screen.queryByText('Learning rate')).not.toBeInTheDocument();
    expect(screen.queryByText('Batch size')).not.toBeInTheDocument();
    expect(screen.queryByText('Pullover')).not.toBeInTheDocument();
    expect(screen.getByText('Epochs')).toBeInTheDocument();
    expect(screen.getByText('T-shirt')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Restart training' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });
});
