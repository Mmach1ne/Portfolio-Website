'use client';

import { useMemo } from 'react';
import { mulberry32 } from '@/lib/seededRandom';
import styles from './WebGlFallback.module.css';

const SEED = 42;
const STAR_COUNT = 120;

export function WebGlFallback() {
  const stars = useMemo(() => {
    const random = mulberry32(SEED);
    return Array.from({ length: STAR_COUNT }, (_, index) => ({
      id: index,
      left: random() * 100,
      top: random() * 100,
      size: 1 + random() * 2,
      opacity: 0.25 + random() * 0.75,
    }));
  }, []);

  return (
    <div className={styles.root} aria-hidden>
      {stars.map((star) => (
        <span
          key={star.id}
          className={styles.star}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
