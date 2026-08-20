'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@/components/0-primitive';
import { useFinePointer } from '@/hooks/useFinePointer';
import { tokens } from '@/theme';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();

  useEffect(() => {
    if (!finePointer) return;

    document.documentElement.classList.add('fine-pointer-cursor');

    let ticking = false;
    const updateCursorPosition = (event: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${event.clientX}px`;
            cursorRef.current.style.top = `${event.clientY}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', updateCursorPosition, { passive: true });
    return () => {
      document.documentElement.classList.remove('fine-pointer-cursor');
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <Box
      ref={cursorRef}
      data-testid="custom-cursor"
      sx={{
        position: 'fixed',
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `1px solid rgba(255,255,255,0.35)`,
        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
        boxShadow: `0 0 15px rgba(100, 255, 218, 0.25)`,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: tokens.zIndex.cursor,
        mixBlendMode: 'screen',
      }}
    />
  );
}
