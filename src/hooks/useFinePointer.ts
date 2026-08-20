import { useEffect, useState } from 'react';

export function useFinePointer(): boolean {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const handler = (event: MediaQueryListEvent) => setFinePointer(event.matches);
    setFinePointer(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  return finePointer;
}
