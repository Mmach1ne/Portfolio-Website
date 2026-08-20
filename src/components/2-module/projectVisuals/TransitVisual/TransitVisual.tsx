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
import { useMedia } from '@/hooks/useMedia';
import { useWidgetLoop } from '@/hooks/useWidgetLoop';
import { mulberry32 } from '@/lib/seededRandom';
import { Layer, Map as MapGL, Marker, Source } from '@/vendor/map';

const OPEN_FREE_MAP_STYLE = 'https://tiles.openfreemap.org/styles/dark';
const DESKTOP_BUS_COUNT = 4;
const COMPACT_BUS_COUNT = 3;

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

function createBuses(count: number): BusState[] {
  const random = mulberry32(13);
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    progress: random(),
    speed: 0.00035 + random() * 0.00025,
  }));
}

function LiveFleetMap({
  running,
  finePointer,
  compact,
  selectedBusId,
  onSelectBus,
}: {
  running: boolean;
  finePointer: boolean;
  compact: boolean;
  selectedBusId: number | null;
  onSelectBus: (id: number) => void;
}) {
  const busCount = compact ? COMPACT_BUS_COUNT : DESKTOP_BUS_COUNT;
  const mapHeight = compact ? 168 : 220;
  const markerSize = compact ? 16 : 12;
  const [buses, setBuses] = useState<BusState[]>(() => createBuses(busCount));

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
        zoom: compact ? 13.35 : 14.2,
      }}
      style={{ width: '100%', height: mapHeight }}
      mapStyle={OPEN_FREE_MAP_STYLE}
      scrollZoom={false}
      dragPan={finePointer}
      dragRotate={false}
      touchZoomRotate={compact ? false : finePointer}
      doubleClickZoom={false}
      attributionControl={false}
    >
      <Source id="route-13" type="geojson" data={route13GeoJson}>
        <Layer
          id="route-13-line"
          type="line"
          paint={{
            'line-color': '#64ffda',
            'line-width': compact ? 4 : 3,
            'line-opacity': 0.85,
          }}
        />
      </Source>
      {busPositions.map((bus) => {
        const selected = compact && selectedBusId === bus.id;

        return (
          <Marker
            key={bus.id}
            longitude={bus.coordinate[0]}
            latitude={bus.coordinate[1]}
            anchor="center"
            onClick={
              compact
                ? (event) => {
                    event.originalEvent.stopPropagation();
                    onSelectBus(bus.id);
                  }
                : undefined
            }
          >
            <Box
              sx={{
                width: markerSize,
                height: markerSize,
                borderRadius: '50%',
                bgcolor: selected ? '#64ffda' : '#a78bfa',
                border: '2px solid #0a0a0a',
                boxShadow: '0 0 10px rgba(167,139,250,0.8)',
                transform: selected ? 'scale(1.25)' : 'none',
              }}
            />
          </Marker>
        );
      })}
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
  const isCompact = useMedia('md');
  const { ref, running, reducedMotion } = useWidgetLoop<HTMLDivElement>();
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);

  return (
    <WindowChrome title="UW Transit Live Map" compact={isCompact}>
      <Box ref={ref} sx={{ display: 'grid', gap: 1.5 }}>
        <Box
          sx={{
            position: 'relative',
            minHeight: isCompact ? 168 : 220,
            borderRadius: 1,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <LiveFleetMap
            key={isCompact ? 'compact' : 'desktop'}
            running={running}
            finePointer={finePointer}
            compact={isCompact}
            selectedBusId={selectedBusId}
            onSelectBus={setSelectedBusId}
          />
          <RouteBadge />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="caption">
            {isCompact && selectedBusId
              ? `Bus ${selectedBusId} selected`
              : reducedMotion
                ? 'Static fleet snapshot'
                : 'Live fleet simulation'}
          </Text>
          <StatusDot status="active" />
        </Box>
        {isCompact ? null : <FleetStats running={running} />}
      </Box>
    </WindowChrome>
  );
}
