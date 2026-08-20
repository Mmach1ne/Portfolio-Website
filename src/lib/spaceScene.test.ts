import { describe, expect, it } from 'vitest';
import { createMeteorFlight, SPACE_STAR_COUNTS } from './spaceScene';

describe('spaceScene', () => {
  it('keeps the twinkle field sparse', () => {
    expect(SPACE_STAR_COUNTS.desktopTwinkle).toBeLessThanOrEqual(80);
    expect(SPACE_STAR_COUNTS.mobileTwinkle).toBeLessThan(SPACE_STAR_COUNTS.desktopTwinkle);
  });

  it('gives each meteor a visible streak duration instead of a flash', () => {
    const flight = createMeteorFlight(100);
    expect(flight.duration).toBeGreaterThanOrEqual(1.5);
    expect(Math.hypot(flight.endX - flight.startX, flight.endY - flight.startY)).toBeGreaterThan(8);
  });
});
