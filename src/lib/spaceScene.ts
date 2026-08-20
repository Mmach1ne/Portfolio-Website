import { mulberry32 } from '@/lib/seededRandom';

export const SPACE_STAR_COUNTS = {
  desktopTwinkle: 64,
  mobileTwinkle: 28,
} as const;

export type MeteorFlight = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  z: number;
  delay: number;
  duration: number;
};

export function createMeteorFlight(seed: number): MeteorFlight {
  const random = mulberry32(seed);
  return {
    startX: -14 + random() * 6,
    startY: 6 + random() * 5,
    endX: 8 + random() * 7,
    endY: -5 - random() * 4,
    z: -10 - random() * 3,
    delay: 1.5 + random() * 7,
    duration: 1.6 + random() * 0.7,
  };
}
