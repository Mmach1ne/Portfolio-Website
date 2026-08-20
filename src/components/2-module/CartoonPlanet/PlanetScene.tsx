'use client';

import { Box } from '@/components/0-primitive';
import { useMedia } from '@/hooks/useMedia';
import { motion, useScroll, useTransform } from '@/vendor/motion';
import styles from './CartoonPlanet.module.css';
import { PlanetEarth } from './PlanetEarth';
import { PlanetGas } from './PlanetGas';
import { PlanetIce } from './PlanetIce';
import { PlanetRing } from './PlanetRing';

export function PlanetScene() {
  const isMobile = useMedia('md');
  const { scrollY } = useScroll();
  const size = isMobile ? 'w-[min(16vh,150px)]' : 'w-[min(22vh,220px)]';
  const ringSize = isMobile ? 'w-[min(22vh,190px)]' : 'w-[min(30vh,280px)]';

  const earthOpacity = useTransform(scrollY, [200, 600], [0, 1]);
  const earthY = useTransform(scrollY, [200, 600], [36, 0]);
  const ringOpacity = useTransform(scrollY, [800, 1200], [0, 1]);
  const ringY = useTransform(scrollY, [800, 1200], [36, 0]);
  const iceOpacity = useTransform(scrollY, [1600, 2000], [0, 1]);
  const iceY = useTransform(scrollY, [1600, 2000], [36, 0]);
  const gasOpacity = useTransform(scrollY, [2400, 2800], [0, 1]);
  const gasY = useTransform(scrollY, [2400, 2800], [36, 0]);

  return (
    <Box
      data-testid="planet-scene"
      sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}
    >
      <motion.div
        className={`absolute top-[8%] left-[2%] ${size}`}
        style={{ opacity: earthOpacity, y: earthY }}
      >
        <div className={styles.bob}>
          <PlanetEarth />
        </div>
      </motion.div>
      <motion.div
        className={`absolute top-[22%] right-[1%] ${ringSize}`}
        style={{ opacity: ringOpacity, y: ringY }}
      >
        <div className={styles.bob}>
          <PlanetRing />
        </div>
      </motion.div>
      <motion.div
        className={`absolute top-[48%] left-[6%] ${size}`}
        style={{ opacity: iceOpacity, y: iceY }}
      >
        <div className={styles.bob}>
          <PlanetIce />
        </div>
      </motion.div>
      <motion.div
        className={`absolute top-[68%] right-[4%] ${size}`}
        style={{ opacity: gasOpacity, y: gasY }}
      >
        <div className={styles.bob}>
          <PlanetGas />
        </div>
      </motion.div>
    </Box>
  );
}
