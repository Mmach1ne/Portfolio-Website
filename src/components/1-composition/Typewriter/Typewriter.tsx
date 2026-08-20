'use client';

import { useEffect, useState } from 'react';
import { Text } from '@/components/0-primitive';

type TypewriterProps = {
  text: string;
  speed?: number;
  running?: boolean;
  reducedMotion?: boolean;
  cursor?: boolean;
  variant?: 'body' | 'caption' | 'code';
};

export function Typewriter({
  text,
  speed = 28,
  running = true,
  reducedMotion = false,
  cursor = true,
  variant = 'code',
}: TypewriterProps) {
  const [visibleCount, setVisibleCount] = useState(reducedMotion ? text.length : 0);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(text.length);
      return;
    }

    if (!running) return;

    if (visibleCount >= text.length) return;

    const timer = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + 1, text.length));
    }, speed);

    return () => window.clearTimeout(timer);
  }, [reducedMotion, running, speed, text.length, visibleCount]);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(text.length);
      return;
    }

    setVisibleCount(0);
  }, [reducedMotion, text]);

  const display = text.slice(0, visibleCount);

  return (
    <Text variant={variant} component="span" sx={{ fontFamily: 'inherit' }}>
      {display}
      {cursor && !reducedMotion && running && visibleCount < text.length ? (
        <Text variant={variant} component="span" sx={{ opacity: 0.7 }}>
          ▌
        </Text>
      ) : null}
    </Text>
  );
}
