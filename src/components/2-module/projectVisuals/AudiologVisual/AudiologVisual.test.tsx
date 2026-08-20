import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMedia } from '@/hooks/useMedia';
import { ThemeProvider } from '@/theme';
import { AudiologVisual } from './AudiologVisual';

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(() => false),
}));

describe('AudiologVisual', () => {
  it('shows the full pipeline meters on desktop', () => {
    vi.mocked(useMedia).mockReturnValue(false);

    render(
      <ThemeProvider>
        <AudiologVisual />
      </ThemeProvider>,
    );

    expect(screen.getByText('Capture')).toBeInTheDocument();
    expect(screen.getByText('Transcription')).toBeInTheDocument();
    expect(screen.getByText('TTS Queue')).toBeInTheDocument();
  });

  it('keeps capture and a wrapped status line on compact viewports', () => {
    vi.mocked(useMedia).mockReturnValue(true);

    render(
      <ThemeProvider>
        <AudiologVisual />
      </ThemeProvider>,
    );

    expect(screen.getByText('Capture')).toBeInTheDocument();
    expect(screen.queryByText('Transcription')).not.toBeInTheDocument();
    expect(screen.queryByText('TTS Queue')).not.toBeInTheDocument();
    expect(screen.getByText('Capture mic input at 48 kHz')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cycle pipeline status' })).toBeInTheDocument();
  });
});
