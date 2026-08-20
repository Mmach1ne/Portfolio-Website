'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box } from '@/components/0-primitive';
import { tokens } from '@/theme';

type EqualizerBarsProps = {
  barCount?: number;
  running?: boolean;
  reducedMotion?: boolean;
  seed?: number;
  height?: number;
};

function seededHeights(count: number, seed: number): number[] {
  let state = seed;
  return Array.from({ length: count }, () => {
    state = (state * 9301 + 49297) % 233280;
    return 25 + (state / 233280) * 75;
  });
}

export function EqualizerBars({
  barCount = 12,
  running = true,
  reducedMotion = false,
  seed = 17,
  height = 48,
}: EqualizerBarsProps) {
  const baseHeights = useMemo(() => seededHeights(barCount, seed), [barCount, seed]);
  const [heights, setHeights] = useState(baseHeights);

  useEffect(() => {
    if (reducedMotion || !running) {
      setHeights(baseHeights);
      return;
    }

    const interval = window.setInterval(() => {
      setHeights((current) =>
        current.map((height, index) => {
          const delta = (Math.sin(Date.now() / 180 + index) + 1) * 12;
          return Math.max(12, Math.min(100, height * 0.65 + delta));
        }),
      );
    }, 120);

    return () => window.clearInterval(interval);
  }, [baseHeights, reducedMotion, running]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5, height }}>
      {heights.map((height, index) => (
        <Box
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed bar slots
          key={`bar-${index}`}
          sx={{
            flex: 1,
            height: `${height}%`,
            borderRadius: 0.5,
            bgcolor: tokens.palette.accent,
            opacity: 0.55 + (height / 100) * 0.45,
            transition: reducedMotion ? 'none' : 'height 120ms ease',
          }}
        />
      ))}
    </Box>
  );
}
