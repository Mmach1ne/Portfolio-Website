'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@/components/0-primitive';
import { tokens } from '@/theme';

type WaveformCanvasProps = {
  barCount?: number;
  running?: boolean;
  reducedMotion?: boolean;
  seed?: number;
};

function seededBars(count: number, seed: number): number[] {
  let state = seed;
  return Array.from({ length: count }, () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return 0.15 + (state / 0xffffffff) * 0.85;
  });
}

export function WaveformCanvas({
  barCount = 48,
  running = true,
  reducedMotion = false,
  seed = 99,
}: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const phaseRef = useRef(0);
  const barsRef = useRef(seededBars(barCount, seed));

  useEffect(() => {
    barsRef.current = seededBars(barCount, seed);
  }, [barCount, seed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const draw = () => {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(255,255,255,0.04)';
      context.fillRect(0, 0, width, height);

      const barWidth = width / barCount;
      phaseRef.current += reducedMotion || !running ? 0 : 0.08;

      barsRef.current.forEach((base, index) => {
        const wave =
          reducedMotion || !running
            ? base
            : base * (0.55 + Math.abs(Math.sin(phaseRef.current + index * 0.35)) * 0.45);
        const barHeight = wave * height * 0.85;
        const x = index * barWidth + barWidth * 0.15;
        const y = (height - barHeight) / 2;

        context.fillStyle = tokens.palette.accent;
        context.globalAlpha = 0.45 + wave * 0.55;
        context.fillRect(x, y, barWidth * 0.7, barHeight);
      });

      context.globalAlpha = 1;

      if (!reducedMotion && running) {
        frameRef.current = window.requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [barCount, reducedMotion, running]);

  return (
    <Box
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(0,0,0,0.35)',
      }}
    >
      <canvas
        ref={canvasRef}
        width={320}
        height={96}
        style={{ width: '100%', height: 96, display: 'block' }}
      />
    </Box>
  );
}
