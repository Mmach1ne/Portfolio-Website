'use client';

import { Box } from '@/components/0-primitive';
import { PlanetScene } from '@/components/2-module/CartoonPlanet';
import { CustomCursor } from '@/components/2-module/CustomCursor';
import { PageFog } from '@/components/2-module/PageFog';
import { SpaceCanvas } from '@/components/2-module/SpaceCanvas';

export function PageBackdrop() {
  return (
    <>
      <Box
        data-testid="page-backdrop-scene"
        sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <SpaceCanvas />
        <PageFog />
        <PlanetScene />
      </Box>
      <CustomCursor />
    </>
  );
}
