'use client';

import { useEffect, useState } from 'react';
import { usePathname } from '@/vendor/router';

const SECTIONS = ['home', 'about', 'projects', 'contact'] as const;

export type HashSection = (typeof SECTIONS)[number];

export function useHashSection(): HashSection {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<HashSection>('home');

  useEffect(() => {
    if (pathname !== '/') return;

    let frame = 0;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;
      let current: HashSection = 'home';

      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          current = section;
          break;
        }
      }

      setActiveSection(current);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        updateActiveSection();
        frame = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return activeSection;
}
