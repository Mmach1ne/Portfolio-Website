'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { Box, Text } from '@/components/0-primitive';
import {
  HeatMapCanvas,
  Slider,
  Sparkline,
  StatGrid,
  WindowChrome,
} from '@/components/1-composition';
import { useMedia } from '@/hooks/useMedia';
import { useWidgetLoop } from '@/hooks/useWidgetLoop';

const HISTORY_CAP = 60;

const ThermalCaption = memo(function ThermalCaption() {
  return <Text variant="caption">Heatsink Dissipation Study</Text>;
});

function lerp(min: number, max: number, t: number): number {
  return min + (max - min) * t;
}

function ThermalSim({
  running,
  reducedMotion,
  compact,
}: {
  running: boolean;
  reducedMotion: boolean;
  compact: boolean;
}) {
  const [fanRpm, setFanRpm] = useState(reducedMotion ? 50 : 35);
  const [history, setHistory] = useState<number[]>(() => Array.from({ length: 20 }, () => 72));

  const stats = useMemo(() => {
    const cooling = fanRpm / 100;
    const tMax = lerp(88, 46, cooling);
    const tAvg = tMax * 0.84;
    return {
      tMax: tMax.toFixed(1),
      tAvg: tAvg.toFixed(1),
      cfm: `${Math.round(fanRpm * 0.92)}`,
    };
  }, [fanRpm]);

  const items = useMemo(
    () =>
      compact
        ? [
            { label: 'T_max (°C)', value: stats.tMax },
            { label: 'Fan RPM', value: `${fanRpm}%` },
          ]
        : [
            { label: 'T_max (°C)', value: stats.tMax },
            { label: 'T_avg (°C)', value: stats.tAvg },
            { label: 'CFM', value: stats.cfm },
            { label: 'Fan RPM', value: `${fanRpm}%` },
          ],
    [compact, fanRpm, stats.cfm, stats.tAvg, stats.tMax],
  );

  useEffect(() => {
    const nextAverage = Number.parseFloat(stats.tAvg);
    setHistory((current) => {
      const last = current[current.length - 1];
      if (last === nextAverage) return current;
      return [...current.slice(-(HISTORY_CAP - 1)), nextAverage];
    });
  }, [stats.tAvg]);

  return (
    <>
      <HeatMapCanvas
        intensity={fanRpm / 100}
        running={running}
        reducedMotion={reducedMotion}
        seed={7}
        cols={compact ? 16 : 24}
        rows={compact ? 10 : 16}
        width={240}
        height={compact ? 110 : 160}
      />
      <Slider
        label="Fan RPM"
        value={fanRpm}
        min={0}
        max={100}
        valueLabel={`${fanRpm}%`}
        touchFriendly={compact}
        onChange={(_, value) => setFanRpm(Array.isArray(value) ? (value[0] ?? 0) : value)}
      />
      <StatGrid items={items} />
      {compact ? null : <Sparkline values={history} height={48} />}
    </>
  );
}

export function ThermalVisual() {
  const isCompact = useMedia('md');
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();

  return (
    <WindowChrome title="ThermalDynamic.pdf" compact={isCompact}>
      <Box ref={ref} sx={{ display: 'grid', gap: 1.5 }}>
        <ThermalCaption />
        <ThermalSim running={running} reducedMotion={reducedMotion} compact={isCompact} />
      </Box>
    </WindowChrome>
  );
}
