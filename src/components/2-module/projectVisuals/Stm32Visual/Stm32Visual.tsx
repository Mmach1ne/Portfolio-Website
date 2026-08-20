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
import { useWidgetLoop } from '@/hooks/useWidgetLoop';

const KEYSTROKE_STREAM = 'hello uart keystroke logger active';
const STM32_CODE_LINES = [
  '#include "stm32f4xx.h"',
  'int main(void) {',
  '  HAL_Init();',
  '  while (1) { HAL_Delay(500); }',
  '}',
] as const;

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

function Stm32Telemetry({ running }: { running: boolean }) {
  const [pa0, setPa0] = useState(78);
  const [connection, setConnection] = useState(96);
  const [scope, setScope] = useState<number[]>(() =>
    Array.from({ length: 32 }, (_, index) => Math.sin(index / 3)),
  );

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setPa0((value) => {
        const delta = value < 85 ? 1 : value > 85 ? -1 : 0;
        return Math.max(80, Math.min(88, value + (delta || (Math.random() > 0.5 ? 1 : -1))));
      });
      setConnection((value) => Math.min(100, value + (value < 100 ? 1 : 0)));
      setScope((current) => {
        const next = Math.sin(Date.now() / 180) * 0.65;
        return [...current.slice(1), next];
      });
    }, 160);

    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <>
      <svg
        viewBox="0 0 160 48"
        style={{
          width: '100%',
          height: 48,
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.35)',
        }}
        aria-hidden
      >
        <path d={buildScopePath(scope, 160, 48)} fill="none" stroke="#64ffda" strokeWidth={1.5} />
      </svg>
      <MetricBar label="PA0" value={pa0} />
      <MetricBar label="Connection" value={connection} />
    </>
  );
}

export function Stm32Visual() {
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();
  const pins = useMemo(() => [true, false, true, true, false, true, false, false], []);

  return (
    <WindowChrome title="STM32F407VGT6">
      <Box ref={ref} sx={{ display: 'grid', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Text variant="subtitle">GPIO Status</Text>
          <StatusDot status="active" />
        </Box>

        <PinGrid pins={pins} columns={4} running={running} reducedMotion={reducedMotion} />
        <Stm32Telemetry running={running} />

        <Box sx={{ display: 'grid', gap: 0.5 }}>
          <Text variant="caption">UART stream</Text>
          <Typewriter
            text={KEYSTROKE_STREAM}
            running={running}
            reducedMotion={reducedMotion}
            speed={42}
          />
        </Box>

        <CodeBlock lines={STM32_CODE_LINES} />
      </Box>
    </WindowChrome>
  );
}
