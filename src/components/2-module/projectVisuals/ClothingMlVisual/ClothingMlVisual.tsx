'use client';

import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Text } from '@/components/0-primitive';
import { CodeBlock, Slider, WindowChrome } from '@/components/1-composition';
import { useWidgetLoop } from '@/hooks/useWidgetLoop';

const TARGET_ACCURACY = 94;
const CLASS_LABELS = ['T-shirt', 'Trouser', 'Pullover', 'Dress', 'Coat'] as const;
const CLOTHING_CODE_LINES = [
  'import torch',
  'class FashionCNN(torch.nn.Module):',
  '    def forward(self, x):',
  '        x = self.conv(x)',
  '        return self.classifier(x)',
] as const;

type TrainingConfig = {
  epochs: number;
  learningRate: number;
  batch: number;
};

type TrainingLiveProps = {
  config: TrainingConfig;
  playing: boolean;
  running: boolean;
  reducedMotion: boolean;
  controls: ReactNode;
};

function buildCurvePoints(
  steps: number,
  target: number,
  start: number,
  config: TrainingConfig,
  kind: 'accuracy' | 'loss',
): string {
  const epochFactor = config.epochs / 20;
  const lrFactor = config.learningRate / 0.01;
  const batchFactor = 32 / config.batch;

  const points = Array.from({ length: steps }, (_, index) => {
    const t = index / (steps - 1);
    const ease = 1 - (1 - t) ** (2.2 * epochFactor * batchFactor);
    const noise = Math.sin(index * 0.7 + config.batch) * (kind === 'loss' ? 0.04 : 0.015);

    if (kind === 'accuracy') {
      const value = start + (target - start) * ease * Math.min(1.05, lrFactor);
      const y = 100 - Math.min(99, value + noise * 100);
      const x = (index / (steps - 1)) * 100;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }

    const value = 1.2 - ease * 0.95 * Math.min(1.1, lrFactor) + noise;
    const y = Math.max(8, Math.min(92, value * 55));
    const x = (index / (steps - 1)) * 100;
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  });

  return points.join(' ');
}

function TrainingLive({ config, playing, running, reducedMotion, controls }: TrainingLiveProps) {
  const [tick, setTick] = useState(0);
  const [accuracy, setAccuracy] = useState(62);
  const configRef = useRef(config);

  const accuracyPath = useMemo(
    () => buildCurvePoints(24, TARGET_ACCURACY, 58, config, 'accuracy'),
    [config],
  );
  const lossPath = useMemo(
    () => buildCurvePoints(24, TARGET_ACCURACY, 58, config, 'loss'),
    [config],
  );

  const confidences = useMemo(
    () =>
      CLASS_LABELS.map((label, index) => ({
        label,
        value: Math.max(
          8,
          Math.min(
            96,
            20 + accuracy * 0.55 + Math.sin(tick / 8 + index) * (running ? 8 : 0) + index * 3,
          ),
        ),
      })),
    [accuracy, running, tick],
  );

  useEffect(() => {
    if (configRef.current === config) return;
    configRef.current = config;
    setAccuracy(58);
    setTick(0);
  }, [config]);

  useEffect(() => {
    if (!running || !playing || reducedMotion) return;

    const interval = window.setInterval(() => {
      setTick((value) => value + 1);
      setAccuracy((value) => {
        const delta = (TARGET_ACCURACY - value) * 0.08 + 0.35;
        return Math.min(TARGET_ACCURACY, value + delta);
      });
    }, 180);

    return () => window.clearInterval(interval);
  }, [playing, reducedMotion, running]);

  return (
    <Box sx={{ display: 'contents' }}>
      <Box sx={{ display: 'grid', gap: 1 }}>
        <svg
          viewBox="0 0 100 100"
          style={{ width: '100%', height: 88, display: 'block' }}
          aria-hidden
        >
          <path d={lossPath} fill="none" stroke="#ff6b6b" strokeWidth={1.5} />
          <path d={accuracyPath} fill="none" stroke="#64ffda" strokeWidth={1.5} />
        </svg>
        <Text variant="caption">
          Accuracy {accuracy.toFixed(1)}% → {TARGET_ACCURACY}%
        </Text>
      </Box>
      {controls}
      <Box sx={{ gridColumn: '1 / -1', display: 'grid', gap: 0.75 }}>
        {confidences.map((item) => (
          <Box key={item.label}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text variant="caption">{item.label}</Text>
              <Text variant="caption">{item.value.toFixed(0)}%</Text>
            </Box>
            <Box sx={{ height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
              <Box
                sx={{
                  width: `${item.value}%`,
                  height: '100%',
                  borderRadius: 1,
                  bgcolor: '#64ffda',
                  transition: reducedMotion ? 'none' : 'width 180ms ease',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function ClothingMlVisual() {
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();
  const [epochs, setEpochs] = useState(12);
  const [learningRate, setLearningRate] = useState(0.01);
  const [batch, setBatch] = useState(32);
  const [playing, setPlaying] = useState(true);

  const config = useMemo<TrainingConfig>(
    () => ({ epochs, learningRate, batch }),
    [batch, epochs, learningRate],
  );

  return (
    <WindowChrome title="model.py">
      <Box
        ref={ref}
        sx={{
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        }}
      >
        <CodeBlock lines={CLOTHING_CODE_LINES} />
        <TrainingLive
          config={config}
          playing={playing}
          running={running}
          reducedMotion={reducedMotion}
          controls={
            <Box sx={{ gridColumn: '1 / -1', display: 'grid', gap: 1.5 }}>
              <Slider
                label="Epochs"
                min={4}
                max={24}
                step={1}
                value={epochs}
                valueLabel={epochs}
                onChange={(_, value) => {
                  setEpochs(Array.isArray(value) ? (value[0] ?? 4) : value);
                }}
              />
              <Slider
                label="Learning rate"
                min={0.001}
                max={0.02}
                step={0.001}
                value={learningRate}
                valueLabel={learningRate.toFixed(3)}
                onChange={(_, value) => {
                  setLearningRate(Array.isArray(value) ? (value[0] ?? 0.001) : value);
                }}
              />
              <Slider
                label="Batch size"
                min={8}
                max={64}
                step={8}
                value={batch}
                valueLabel={batch}
                onChange={(_, value) => {
                  setBatch(Array.isArray(value) ? (value[0] ?? 8) : value);
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text variant="caption">Fashion-MNIST confidence</Text>
                <Button variant="secondary" onClick={() => setPlaying((value) => !value)}>
                  {playing ? 'Pause' : 'Play'}
                </Button>
              </Box>
            </Box>
          }
        />
      </Box>
    </WindowChrome>
  );
}
