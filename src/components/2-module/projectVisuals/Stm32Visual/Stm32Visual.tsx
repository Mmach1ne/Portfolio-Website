'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Text } from '@/components/0-primitive';
import {
  CodeBlock,
  MetricBar,
  PinGrid,
  StatusDot,
  Typewriter,
  WindowChrome,
} from '@/components/1-composition';
import { useMedia } from '@/hooks/useMedia';
import { useWidgetLoop } from '@/hooks/useWidgetLoop';

const KEYSTROKE_STREAM = 'hello uart keystroke logger active';
const STM32_CODE_LINES = [
  '#include "stm32f4xx.h"',
  'int main(void) {',
  '  HAL_Init();',
  '  while (1) { HAL_Delay(500); }',
  '}',
] as const;
const DESKTOP_PINS = [true, false, true, true, false, true, false, false];
const COMPACT_PINS = [true, false, true, true];

function buildScopePath(values: number[], width: number, height: number): string {
  if (values.length === 0) return '';

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height / 2 - value * (height / 2 - 4);
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

function Stm32Telemetry({ running, compact }: { running: boolean; compact: boolean }) {
  const [pa0, setPa0] = useState(78);
  const [connection, setConnection] = useState(96);
  const [scope, setScope] = useState<number[]>(() =>
    Array.from({ length: compact ? 24 : 32 }, (_, index) => Math.sin(index / 3)),
  );
  const scopeHeight = compact ? 56 : 48;

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(
      () => {
        setPa0((value) => {
          const delta = value < 85 ? 1 : value > 85 ? -1 : 0;
          return Math.max(80, Math.min(88, value + (delta || (Math.random() > 0.5 ? 1 : -1))));
        });
        setConnection((value) => Math.min(100, value + (value < 100 ? 1 : 0)));
        setScope((current) => {
          const next = Math.sin(Date.now() / 180) * 0.65;
          return [...current.slice(1), next];
        });
      },
      compact ? 120 : 160,
    );

    return () => window.clearInterval(interval);
  }, [compact, running]);

  return (
    <>
      <svg
        viewBox={`0 0 160 ${scopeHeight}`}
        style={{
          width: '100%',
          height: scopeHeight,
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.35)',
        }}
        aria-hidden
      >
        <path
          d={buildScopePath(scope, 160, scopeHeight)}
          fill="none"
          stroke="#64ffda"
          strokeWidth={compact ? 2 : 1.5}
        />
      </svg>
      <MetricBar label="PA0" value={pa0} />
      {compact ? null : <MetricBar label="Connection" value={connection} />}
    </>
  );
}

export function Stm32Visual() {
  const isCompact = useMedia('md');
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();
  const desktopPins = useMemo(() => DESKTOP_PINS, []);
  const [compactPins, setCompactPins] = useState(COMPACT_PINS);

  return (
    <WindowChrome title="STM32F407VGT6" compact={isCompact}>
      <Box ref={ref} sx={{ display: 'grid', gap: isCompact ? 1.25 : 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Text variant="subtitle">GPIO Status</Text>
          <StatusDot status="active" />
        </Box>

        <PinGrid
          pins={isCompact ? compactPins : desktopPins}
          columns={isCompact ? 2 : 4}
          running={running}
          reducedMotion={reducedMotion}
          interactive={isCompact}
          onPinClick={
            isCompact
              ? (index) => {
                  setCompactPins((current) =>
                    current.map((active, pinIndex) => (pinIndex === index ? !active : active)),
                  );
                }
              : undefined
          }
        />
        <Stm32Telemetry running={running} compact={isCompact} />

        <Box sx={{ display: 'grid', gap: 0.5 }}>
          <Text variant="caption">UART stream</Text>
          <Box sx={isCompact ? { wordBreak: 'break-word', whiteSpace: 'pre-wrap' } : undefined}>
            <Typewriter
              text={KEYSTROKE_STREAM}
              running={running}
              reducedMotion={reducedMotion}
              speed={isCompact ? 28 : 42}
            />
          </Box>
        </Box>

        {isCompact ? null : <CodeBlock lines={STM32_CODE_LINES} />}
      </Box>
    </WindowChrome>
  );
}
