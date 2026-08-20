'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { WebGlFallback } from '@/components/2-module/WebGlFallback';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { isWebGLAvailable } from '@/lib/webgl';

const DynamicSpaceScene = dynamic(
  () => import('./SpaceSceneContent').then((module) => module.SpaceSceneContent),
  { ssr: false },
);

export function SpaceCanvas() {
  const reducedMotion = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  if (reducedMotion || !webgl) {
    return <WebGlFallback />;
  }

  return <DynamicSpaceScene />;
}
