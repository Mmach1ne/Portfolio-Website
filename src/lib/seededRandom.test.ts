import { describe, expect, it } from 'vitest';
import { mulberry32 } from './seededRandom';

describe('seededRandom', () => {
  it('same seed produces same sequence', () => {
    const first = mulberry32(42);
    const second = mulberry32(42);

    const firstSequence = Array.from({ length: 5 }, () => first());
    const secondSequence = Array.from({ length: 5 }, () => second());

    expect(firstSequence).toEqual(secondSequence);
  });
});
