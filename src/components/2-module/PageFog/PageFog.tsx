import { motion, useScroll, useTransform } from '@/vendor';

export function PageFog() {
  const { scrollY } = useScroll();
  const fogOpacity = useTransform(scrollY, [0, 500], [0.45, 0]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background:
          'radial-gradient(circle at center, rgba(10,10,10,0.22) 0%, rgba(10,10,10,0.62) 100%)',
        opacity: fogOpacity,
      }}
    />
  );
}
