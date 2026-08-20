'use client';

import { useEffect, useState } from 'react';
import { Box, Text } from '@/components/0-primitive';
import { MetricBar, WaveformCanvas, WindowChrome } from '@/components/1-composition';
import { useMedia } from '@/hooks/useMedia';
import { useWidgetLoop } from '@/hooks/useWidgetLoop';

const CAPTIONS = [
  'Capture mic input at 48 kHz',
  'Whisper transcription queue draining',
  'TTS synthesis warming up',
  'Latency holding under 120 ms',
] as const;

export function AudiologVisual() {
  const isCompact = useMedia('md');
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();
  const [capture, setCapture] = useState(76);
  const [transcription, setTranscription] = useState(64);
  const [ttsQueue, setTtsQueue] = useState(41);
  const [captionIndex, setCaptionIndex] = useState(0);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(
      () => {
        setCapture((value) => Math.max(68, Math.min(86, value + (Math.random() > 0.5 ? 2 : -2))));
        setTranscription((value) =>
          Math.max(58, Math.min(78, value + (Math.random() > 0.5 ? 2 : -1))),
        );
        setTtsQueue((value) => Math.max(24, Math.min(52, value + (Math.random() > 0.5 ? -2 : 1))));
        setCaptionIndex((index) => (index + 1) % CAPTIONS.length);
      },
      isCompact ? 1100 : 1400,
    );

    return () => window.clearInterval(interval);
  }, [isCompact, running]);

  const cycleCaption = () => setCaptionIndex((index) => (index + 1) % CAPTIONS.length);

  return (
    <WindowChrome title="AUDILOG Dashboard" compact={isCompact}>
      <Box ref={ref} sx={{ display: 'grid', gap: 1.5 }}>
        <Box
          role={isCompact ? 'button' : undefined}
          tabIndex={isCompact ? 0 : undefined}
          onClick={isCompact ? cycleCaption : undefined}
          onKeyDown={
            isCompact
              ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    cycleCaption();
                  }
                }
              : undefined
          }
          aria-label={isCompact ? 'Cycle pipeline status' : undefined}
          sx={{
            p: 0,
            m: 0,
            border: 0,
            bgcolor: 'transparent',
            cursor: isCompact ? 'pointer' : 'default',
            WebkitTapHighlightColor: 'transparent',
            width: '100%',
          }}
        >
          <WaveformCanvas
            running={running}
            reducedMotion={reducedMotion}
            seed={55}
            barCount={isCompact ? 22 : 48}
            height={isCompact ? 80 : 96}
          />
        </Box>
        <MetricBar label="Capture" value={capture} />
        {isCompact ? null : (
          <>
            <MetricBar label="Transcription" value={transcription} />
            <MetricBar label="TTS Queue" value={ttsQueue} />
          </>
        )}
        <Box
          sx={{
            overflow: 'hidden',
            borderRadius: 1,
            border: '1px solid rgba(255,255,255,0.08)',
            bgcolor: 'rgba(255,255,255,0.03)',
            px: 1.25,
            py: 0.75,
          }}
        >
          <Text
            variant="caption"
            sx={
              isCompact
                ? { display: 'block', whiteSpace: 'normal' }
                : {
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    animation:
                      reducedMotion || !running ? 'none' : 'audiolog-ticker 8s linear infinite',
                    '@keyframes audiolog-ticker': {
                      '0%': { transform: 'translateX(0)' },
                      '100%': { transform: 'translateX(-12%)' },
                    },
                  }
            }
          >
            {CAPTIONS[captionIndex]}
          </Text>
        </Box>
      </Box>
    </WindowChrome>
  );
}
