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
import { useMedia } from '@/hooks/useMedia';
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

function ChatThread({
  running,
  reducedMotion,
  maxLines,
}: {
  running: boolean;
  reducedMotion: boolean;
  maxLines: number;
}) {
  const lines = CHAT_LINES.slice(0, maxLines);
  const [visibleLines, setVisibleLines] = useState(reducedMotion ? lines.length : 1);
  const allVisible = visibleLines >= lines.length;

  useEffect(() => {
    if (reducedMotion) {
      setVisibleLines(lines.length);
      return;
    }

    if (!running || allVisible) return;

    const interval = window.setInterval(() => {
      setVisibleLines((count) => Math.min(lines.length, count + 1));
    }, 1600);

    return () => window.clearInterval(interval);
  }, [allVisible, lines.length, reducedMotion, running]);

  return (
    <Box sx={{ display: 'grid', gap: 1 }}>
      {lines.slice(0, visibleLines).map((line) => (
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

function SessionMix({
  running,
  reducedMotion,
  compact,
}: {
  running: boolean;
  reducedMotion: boolean;
  compact: boolean;
}) {
  const [engagement, setEngagement] = useState(88);
  const [trackProgress, setTrackProgress] = useState(34);

  useEffect(() => {
    if (reducedMotion || !running) return;

    const interval = window.setInterval(
      () => {
        setEngagement((value) =>
          Math.max(88, Math.min(95, value + (Math.random() > 0.5 ? 1 : -1))),
        );
        setTrackProgress((value) => (value >= 100 ? 12 : value + 2));
      },
      compact ? 1100 : 1600,
    );

    return () => window.clearInterval(interval);
  }, [compact, reducedMotion, running]);

  return (
    <>
      <Box
        role={compact ? 'button' : undefined}
        tabIndex={compact ? 0 : undefined}
        onClick={
          compact ? () => setTrackProgress((value) => (value >= 82 ? 12 : value + 18)) : undefined
        }
        onKeyDown={
          compact
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setTrackProgress((value) => (value >= 82 ? 12 : value + 18));
                }
              }
            : undefined
        }
        aria-label={compact ? 'Skip ahead in the track' : undefined}
        sx={{
          p: 0,
          m: 0,
          border: 0,
          bgcolor: 'transparent',
          color: 'inherit',
          cursor: compact ? 'pointer' : 'default',
          WebkitTapHighlightColor: 'transparent',
          width: '100%',
        }}
      >
        <EqualizerBars
          running={running}
          reducedMotion={reducedMotion}
          seed={24}
          height={compact ? 64 : 48}
          barCount={compact ? 10 : 12}
        />
      </Box>
      <Slider
        label="Track progress"
        min={0}
        max={100}
        value={trackProgress}
        valueLabel={`${trackProgress}%`}
        disabled={!compact}
        touchFriendly={compact}
        onChange={
          compact
            ? (_, value) => setTrackProgress(Array.isArray(value) ? (value[0] ?? 0) : value)
            : undefined
        }
      />
      {compact ? null : <MetricBar label="Engagement" value={engagement} />}
    </>
  );
}

export function HarmoniVisual() {
  const isCompact = useMedia('md');
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();

  return (
    <WindowChrome title="Harmoni Chat" compact={isCompact}>
      <Box ref={ref} sx={{ display: 'grid', gap: 1.5 }}>
        <SessionHeader />
        <ChatThread
          running={running}
          reducedMotion={reducedMotion}
          maxLines={isCompact ? 2 : CHAT_LINES.length}
        />
        <SessionMix running={running} reducedMotion={reducedMotion} compact={isCompact} />
      </Box>
    </WindowChrome>
  );
}
