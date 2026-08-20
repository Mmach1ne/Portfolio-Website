'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@/components/0-primitive';

type HeatMapCanvasProps = {
  cols?: number;
  rows?: number;
  intensity?: number;
  running?: boolean;
  reducedMotion?: boolean;
  seed?: number;
  width?: number;
  height?: number;
};

function heatColor(value: number): string {
  const clamped = Math.max(0, Math.min(1, value));
  if (clamped < 0.5) {
    const t = clamped / 0.5;
    const r = Math.round(59 + (100 - 59) * t);
    const g = Math.round(130 + (255 - 130) * t);
    const b = Math.round(246 + (218 - 246) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const t = (clamped - 0.5) / 0.5;
  const r = Math.round(100 + (245 - 100) * t);
  const g = Math.round(255 + (158 - 255) * t);
  const b = Math.round(218 + (11 - 218) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function seededGrid(cols: number, rows: number, seed: number, intensity: number): number[][] {
  let state = seed;
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => {
      state = (state * 1103515245 + 12345) & 0x7fffffff;
      const noise = state / 0x7fffffff;
      const centerBias = 1 - Math.hypot(col - cols / 2, row - rows / 2) / (cols / 1.4);
      return Math.max(0, Math.min(1, noise * 0.45 + centerBias * 0.55 * intensity));
    }),
  );
}

export function HeatMapCanvas({
  cols = 24,
  rows = 16,
  intensity = 0.65,
  running = true,
  reducedMotion = false,
  seed = 42,
  width = 240,
  height = 160,
}: HeatMapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = width;
    canvas.height = height;

    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    const draw = () => {
      const grid = seededGrid(cols, rows, seed, intensity);
      phaseRef.current += reducedMotion || !running ? 0 : 0.015;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const base = grid[row]?.[col] ?? 0;
          const pulse =
            reducedMotion || !running
              ? 0
              : Math.sin(phaseRef.current + col * 0.35 + row * 0.2) * 0.08;
          context.fillStyle = heatColor(base + pulse);
          context.fillRect(col * cellWidth, row * cellHeight, cellWidth + 0.5, cellHeight + 0.5);
        }
      }

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
  }, [cols, rows, intensity, reducedMotion, running, seed, width, height]);

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
        width={width}
        height={height}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </Box>
  );
}
