'use client';

import { Suspense, useEffect, useState } from 'react';
import { MeteorPool } from '@/components/2-module/MeteorPool';
import { TwinkleStars } from '@/components/2-module/TwinkleStars';
import { useMedia } from '@/hooks/useMedia';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SPACE_STAR_COUNTS } from '@/lib/spaceScene';
import { Canvas } from '@/vendor/three/canvas';
import { AdaptiveDpr, PerformanceMonitor } from '@/vendor/three/drei';

function SceneInner({ twinkleCount, meteorCount }: { twinkleCount: number; meteorCount: number }) {
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <>
      <PerformanceMonitor flipflops={3} onDecline={() => undefined} />
      <AdaptiveDpr />
      <TwinkleStars count={twinkleCount} />
      {!reducedMotion ? <MeteorPool count={meteorCount} enabled={visible} /> : null}
    </>
  );
}

export function SpaceSceneContent() {
  const isMobile = useMedia('md');
  const reducedMotion = usePrefersReducedMotion();
  const twinkleCount = isMobile
    ? SPACE_STAR_COUNTS.mobileTwinkle
    : SPACE_STAR_COUNTS.desktopTwinkle;
  const meteorCount = isMobile ? 2 : 3;

  return (
    <Canvas
      gl={{ alpha: true, antialias: !isMobile }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      frameloop={reducedMotion ? 'never' : 'always'}
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <SceneInner twinkleCount={twinkleCount} meteorCount={meteorCount} />
      </Suspense>
    </Canvas>
  );
}
