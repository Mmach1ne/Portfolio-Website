'use client';

import { useEffect, useState } from 'react';
import { Box } from '@/components/0-primitive';
import { tokens } from '@/theme';

type PinGridProps = {
  pins: boolean[];
  columns?: number;
  running?: boolean;
  reducedMotion?: boolean;
  activeLabel?: string;
  idleLabel?: string;
  interactive?: boolean;
  onPinClick?: (index: number) => void;
};

export function PinGrid({
  pins,
  columns = 4,
  running = true,
  reducedMotion = false,
  activeLabel = 'HIGH',
  idleLabel = 'LOW',
  interactive = false,
  onPinClick,
}: PinGridProps) {
  const [pulse, setPulse] = useState<boolean[]>(pins);

  useEffect(() => {
    setPulse(pins);
  }, [pins]);

  useEffect(() => {
    if (reducedMotion || !running) {
      setPulse(pins);
      return;
    }

    const interval = window.setInterval(() => {
      setPulse((current) =>
        current.map((active, index) => {
          if (!active) return false;
          return Math.sin(Date.now() / 220 + index) > -0.15;
        }),
      );
    }, 140);

    return () => window.clearInterval(interval);
  }, [pins, reducedMotion, running]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 0.75,
      }}
    >
      {pulse.map((active, index) => (
        <Box
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed GPIO pin slots
          key={`pin-${index}`}
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          onClick={interactive ? () => onPinClick?.(index) : undefined}
          onKeyDown={
            interactive
              ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onPinClick?.(index);
                  }
                }
              : undefined
          }
          aria-label={interactive ? `Toggle PA${index}` : undefined}
          sx={{
            px: 1,
            py: interactive ? 1.25 : 0.75,
            width: '100%',
            borderRadius: 1,
            border: '1px solid rgba(255,255,255,0.12)',
            bgcolor: active ? 'rgba(100,255,218,0.12)' : 'rgba(255,255,255,0.03)',
            boxShadow: active ? `0 0 10px ${tokens.palette.accent}55` : 'none',
            appearance: 'none',
            font: 'inherit',
            color: 'inherit',
            textAlign: 'left',
            cursor: interactive ? 'pointer' : 'default',
            WebkitTapHighlightColor: 'transparent',
            transition: reducedMotion
              ? 'none'
              : 'box-shadow 140ms ease, background-color 140ms ease',
          }}
        >
          <Box sx={{ fontSize: '0.65rem', opacity: 0.65 }}>PA{index}</Box>
          <Box
            sx={{
              fontSize: '0.75rem',
              color: active ? tokens.palette.accent : 'rgba(255,255,255,0.55)',
            }}
          >
            {active ? activeLabel : idleLabel}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
