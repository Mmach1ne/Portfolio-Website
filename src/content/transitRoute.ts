export const UW_CENTER = {
  lng: -80.5449,
  lat: 43.4723,
} as const;

export const ROUTE_13_LABEL = 'Route 13';

export const route13Stops = ['DC', 'SLC', 'EV3', 'ECH', 'DC'] as const;

export type RouteCoordinate = readonly [number, number];

export const route13Coordinates: [number, number][] = [
  [-80.5425, 43.4708],
  [-80.5408, 43.4718],
  [-80.5392, 43.4732],
  [-80.541, 43.4746],
  [-80.5438, 43.475],
  [-80.5465, 43.4738],
  [-80.5478, 43.472],
  [-80.5455, 43.4705],
  [-80.5425, 43.4708],
];

export const route13GeoJson = {
  type: 'Feature' as const,
  properties: {
    name: ROUTE_13_LABEL,
  },
  geometry: {
    type: 'LineString' as const,
    coordinates: route13Coordinates,
  },
};

export function interpolateAlongRoute(
  coordinates: readonly RouteCoordinate[],
  progress: number,
): RouteCoordinate {
  if (coordinates.length < 2) {
    return coordinates[0] ?? [UW_CENTER.lng, UW_CENTER.lat];
  }

  const segments: { start: RouteCoordinate; end: RouteCoordinate; length: number }[] = [];
  let totalLength = 0;

  for (let index = 1; index < coordinates.length; index += 1) {
    const start = coordinates[index - 1];
    const end = coordinates[index];
    if (!start || !end) continue;

    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const length = Math.hypot(dx, dy);
    segments.push({ start, end, length });
    totalLength += length;
  }

  const wrapped = ((progress % 1) + 1) % 1;
  const target = wrapped * totalLength;
  let walked = 0;

  for (const segment of segments) {
    if (walked + segment.length >= target) {
      const t = segment.length === 0 ? 0 : (target - walked) / segment.length;
      return [
        segment.start[0] + (segment.end[0] - segment.start[0]) * t,
        segment.start[1] + (segment.end[1] - segment.start[1]) * t,
      ];
    }
    walked += segment.length;
  }

  const last = coordinates[coordinates.length - 1];
  return last ?? [UW_CENTER.lng, UW_CENTER.lat];
}
