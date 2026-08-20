import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { HarmoniVisual } from './HarmoniVisual';

describe('HarmoniVisual', () => {
  it('keeps chat lines on screen after they appear', () => {
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

    vi.useRealTimers();
  });
});
