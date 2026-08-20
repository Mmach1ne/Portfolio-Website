'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Text } from '@/components/0-primitive';
import { PinGrid, Sparkline, Typewriter, WindowChrome } from '@/components/1-composition';
import { useWidgetLoop } from '@/hooks/useWidgetLoop';

const TERMINAL_LINES = [
  '$ python raybot.py',
  '> Hello! How can I help?',
  '> skill: memory.load()',
  '> Response generated with context.',
] as const;

export function RaybotVisual() {
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();
  const [lineIndex, setLineIndex] = useState(0);
  const [tokens, setTokens] = useState<number[]>(() =>
    Array.from({ length: 18 }, (_, index) => 20 + index * 2),
  );

  const memorySlots = useMemo(() => [true, true, false, true, false, false, true, false], []);

  useEffect(() => {
    if (reducedMotion || !running) return;

    const interval = window.setInterval(() => {
      setLineIndex((index) => (index + 1) % TERMINAL_LINES.length);
      setTokens((current) => {
        const next = 18 + Math.round(Math.abs(Math.sin(Date.now() / 500)) * 42);
        return [...current.slice(1), next];
      });
    }, 2600);

    return () => window.clearInterval(interval);
  }, [reducedMotion, running]);

  const activeLine = TERMINAL_LINES[lineIndex] ?? TERMINAL_LINES[0];

  return (
    <WindowChrome title="raybot terminal">
      <Box ref={ref} sx={{ display: 'grid', gap: 1.5 }}>
        <Box
          sx={{
            minHeight: 96,
            p: 1.25,
            borderRadius: 1,
            bgcolor: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Typewriter
            text={activeLine}
            running={running}
            reducedMotion={reducedMotion}
            speed={24}
          />
        </Box>

        <Box sx={{ display: 'grid', gap: 0.75 }}>
          <Text variant="caption">Memory slots</Text>
          <PinGrid
            pins={memorySlots}
            columns={4}
            running={running}
            reducedMotion={reducedMotion}
            activeLabel="LOADED"
            idleLabel="EMPTY"
          />
        </Box>

        <Box sx={{ display: 'grid', gap: 0.5 }}>
          <Text variant="caption">Token throughput</Text>
          <Sparkline values={tokens} height={44} />
        </Box>
      </Box>
    </WindowChrome>
  );
}
