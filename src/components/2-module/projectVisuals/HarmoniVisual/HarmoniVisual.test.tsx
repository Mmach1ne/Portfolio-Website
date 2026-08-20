import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMedia } from '@/hooks/useMedia';
import { ThemeProvider } from '@/theme';
import { HarmoniVisual } from './HarmoniVisual';

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(() => false),
}));

describe('HarmoniVisual', () => {
  it('keeps chat lines on screen after they appear', () => {
    vi.mocked(useMedia).mockReturnValue(false);
    vi.useFakeTimers();

    render(
      <ThemeProvider>
        <HarmoniVisual />
      </ThemeProvider>,
    );

    expect(screen.getByText('🎵 Share your current track?')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1600);
    });
    expect(screen.getByText('AI: Based on your mood, try this playlist.')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1600);
    });
    expect(screen.getByText('Add more indie tracks for focus.')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1600 * 6);
    });
    expect(screen.getByText('🎵 Share your current track?')).toBeInTheDocument();
    expect(screen.getByText('AI: Based on your mood, try this playlist.')).toBeInTheDocument();
    expect(screen.getByText('Add more indie tracks for focus.')).toBeInTheDocument();
    expect(screen.getByText('Live Session')).toBeInTheDocument();
    expect(screen.getByText('Engagement')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('keeps two chat lines and a scrubbable track on compact viewports', () => {
    vi.mocked(useMedia).mockReturnValue(true);
    vi.useFakeTimers();

    render(
      <ThemeProvider>
        <HarmoniVisual />
      </ThemeProvider>,
    );

    expect(screen.getByText('🎵 Share your current track?')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1600 * 8);
    });

    expect(screen.getByText('AI: Based on your mood, try this playlist.')).toBeInTheDocument();
    expect(screen.queryByText('Add more indie tracks for focus.')).not.toBeInTheDocument();
    expect(screen.queryByText('Engagement')).not.toBeInTheDocument();
    expect(screen.getByText('Track progress')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Skip ahead in the track' })).toBeInTheDocument();

    vi.useRealTimers();
  });
});
