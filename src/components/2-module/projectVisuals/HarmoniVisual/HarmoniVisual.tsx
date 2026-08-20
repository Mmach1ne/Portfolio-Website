'use client';

import { memo, useEffect, useState } from 'react';
import { Box, Text } from '@/components/0-primitive';
import {
  EqualizerBars,
  MetricBar,
  Slider,
  StatusDot,
  WindowChrome,
} from '@/components/1-composition';
import { useWidgetLoop } from '@/hooks/useWidgetLoop';

const CHAT_LINES = [
  { speaker: 'You', text: '🎵 Share your current track?' },
  { speaker: 'Harmoni', text: 'AI: Based on your mood, try this playlist.' },
  { speaker: 'You', text: 'Add more indie tracks for focus.' },
] as const;

const SessionHeader = memo(function SessionHeader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Text variant="caption">Live Session</Text>
      <StatusDot status="active" />
    </Box>
  );
});

function ChatThread({ running, reducedMotion }: { running: boolean; reducedMotion: boolean }) {
  const [visibleLines, setVisibleLines] = useState(reducedMotion ? CHAT_LINES.length : 1);
  const allVisible = visibleLines >= CHAT_LINES.length;

  useEffect(() => {
    if (reducedMotion) {
      setVisibleLines(CHAT_LINES.length);
      return;
    }

    if (!running || allVisible) return;

    const interval = window.setInterval(() => {
      setVisibleLines((count) => Math.min(CHAT_LINES.length, count + 1));
    }, 1600);

    return () => window.clearInterval(interval);
  }, [allVisible, reducedMotion, running]);

  return (
    <Box sx={{ display: 'grid', gap: 1 }}>
      {CHAT_LINES.slice(0, visibleLines).map((line) => (
        <Box
          key={`${line.speaker}-${line.text}`}
          sx={{
            alignSelf: line.speaker === 'You' ? 'flex-end' : 'flex-start',
            maxWidth: '88%',
            px: 1.25,
            py: 1,
            borderRadius: 2,
            bgcolor: line.speaker === 'You' ? 'rgba(100,255,218,0.12)' : 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Text variant="caption" sx={{ opacity: 0.65, display: 'block', mb: 0.25 }}>
            {line.speaker}
          </Text>
          <Text variant="body">{line.text}</Text>
        </Box>
      ))}
    </Box>
  );
}

function SessionMeters({ running, reducedMotion }: { running: boolean; reducedMotion: boolean }) {
  const [engagement, setEngagement] = useState(88);
  const [trackProgress, setTrackProgress] = useState(34);

  useEffect(() => {
    if (reducedMotion || !running) return;

    const interval = window.setInterval(() => {
      setEngagement((value) => Math.max(88, Math.min(95, value + (Math.random() > 0.5 ? 1 : -1))));
      setTrackProgress((value) => (value >= 100 ? 12 : value + 2));
    }, 1600);

    return () => window.clearInterval(interval);
  }, [reducedMotion, running]);

  return (
    <>
      <Slider
        label="Track progress"
        min={0}
        max={100}
        value={trackProgress}
        valueLabel={`${trackProgress}%`}
        disabled
      />
      <MetricBar label="Engagement" value={engagement} />
    </>
  );
}

export function HarmoniVisual() {
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();

  return (
    <WindowChrome title="Harmoni Chat">
      <Box ref={ref} sx={{ display: 'grid', gap: 1.5 }}>
        <SessionHeader />
        <ChatThread running={running} reducedMotion={reducedMotion} />
        <EqualizerBars running={running} reducedMotion={reducedMotion} seed={24} />
        <SessionMeters running={running} reducedMotion={reducedMotion} />
      </Box>
    </WindowChrome>
  );
}
