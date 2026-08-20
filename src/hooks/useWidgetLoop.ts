'use client';

import { useEffect, useState } from 'react';
import { useInView } from './useInView';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useWidgetLoop<T extends Element = HTMLDivElement>() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView<T>();
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  const running = inView && pageVisible && !reducedMotion;

  return { ref, running, reducedMotion };
}
