'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { Box, Text } from '@/components/0-primitive';
import { MetricBar, StatusDot, WindowChrome } from '@/components/1-composition';
import {
  interpolateAlongRoute,
  ROUTE_13_LABEL,
  route13Coordinates,
  route13GeoJson,
  UW_CENTER,
} from '@/content/transitRoute';
import { useFinePointer } from '@/hooks/useFinePointer';
import { useWidgetLoop } from '@/hooks/useWidgetLoop';
import { mulberry32 } from '@/lib/seededRandom';
import { Layer, Map as MapGL, Marker, Source } from '@/vendor/map';

const OPEN_FREE_MAP_STYLE = 'https://tiles.openfreemap.org/styles/dark';
const BUS_COUNT = 4;

const RouteBadge = memo(function RouteBadge() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 8,
        left: 8,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        bgcolor: 'rgba(10,10,10,0.72)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <Text variant="caption">{ROUTE_13_LABEL}</Text>
    </Box>
  );
});

type BusState = {
  id: number;
  progress: number;
  speed: number;
};

function createBuses(): BusState[] {
  const random = mulberry32(13);
  return Array.from({ length: BUS_COUNT }, (_, index) => ({
    id: index + 1,
    progress: random(),
    speed: 0.00035 + random() * 0.00025,
  }));
}

function LiveFleetMap({ running, finePointer }: { running: boolean; finePointer: boolean }) {
  const [buses, setBuses] = useState<BusState[]>(() => createBuses());

  const busPositions = useMemo(
    () =>
      buses.map((bus) => ({
        ...bus,
        coordinate: interpolateAlongRoute(route13Coordinates, bus.progress),
      })),
    [buses],
  );

  useEffect(() => {
    if (!running) return;

    let frame = 0;
    const step = () => {
      setBuses((current) =>
        current.map((bus) => ({
          ...bus,
          progress: (bus.progress + bus.speed) % 1,
        })),
      );
      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [running]);

  return (
    <MapGL
      initialViewState={{
        longitude: UW_CENTER.lng,
        latitude: UW_CENTER.lat,
        zoom: 14.2,
      }}
      style={{ width: '100%', height: 220 }}
      mapStyle={OPEN_FREE_MAP_STYLE}
      scrollZoom={false}
      dragPan={finePointer}
      dragRotate={false}
      touchZoomRotate={finePointer}
      doubleClickZoom={false}
      attributionControl={false}
    >
      <Source id="route-13" type="geojson" data={route13GeoJson}>
        <Layer
          id="route-13-line"
          type="line"
          paint={{
            'line-color': '#64ffda',
            'line-width': 3,
            'line-opacity': 0.85,
          }}
        />
      </Source>
      {busPositions.map((bus) => (
        <Marker
          key={bus.id}
          longitude={bus.coordinate[0]}
          latitude={bus.coordinate[1]}
          anchor="center"
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: '#a78bfa',
              border: '2px solid #0a0a0a',
              boxShadow: '0 0 10px rgba(167,139,250,0.8)',
            }}
          />
        </Marker>
      ))}
    </MapGL>
  );
}

function FleetStats({ running }: { running: boolean }) {
  const [gpsAccuracy, setGpsAccuracy] = useState(98);
  const [fleetOnline, setFleetOnline] = useState(87);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setGpsAccuracy((value) =>
        Math.max(94, Math.min(100, value + (Math.random() > 0.5 ? 1 : -1))),
      );
      setFleetOnline((value) => Math.max(82, Math.min(92, value + (Math.random() > 0.5 ? 1 : -1))));
    }, 1800);

    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <>
      <MetricBar label="GPS Accuracy" value={gpsAccuracy} />
      <MetricBar label="Fleet Online" value={fleetOnline} />
    </>
  );
}

export function TransitVisual() {
  const finePointer = useFinePointer();
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();

  return (
    <WindowChrome title="UW Transit Live Map">
      <Box ref={ref} sx={{ display: 'grid', gap: 1.5 }}>
        <Box
          sx={{
            position: 'relative',
            minHeight: 220,
            borderRadius: 1,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <LiveFleetMap running={running} finePointer={finePointer} />
          <RouteBadge />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="caption">
            {reducedMotion ? 'Static fleet snapshot' : 'Live fleet simulation'}
          </Text>
          <StatusDot status="active" />
        </Box>
        <FleetStats running={running} />
      </Box>
    </WindowChrome>
  );
}
