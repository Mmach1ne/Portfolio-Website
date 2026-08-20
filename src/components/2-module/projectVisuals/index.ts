import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy } from 'react';
import type { ProjectVisual } from '@/content';

const visualMap: Record<ProjectVisual, LazyExoticComponent<ComponentType<object>>> = {
  stm32: lazy(() => import('./Stm32Visual').then((module) => ({ default: module.Stm32Visual }))),
  clothingMl: lazy(() =>
    import('./ClothingMlVisual').then((module) => ({ default: module.ClothingMlVisual })),
  ),
  harmoni: lazy(() =>
    import('./HarmoniVisual').then((module) => ({ default: module.HarmoniVisual })),
  ),
  thermal: lazy(() =>
    import('./ThermalVisual').then((module) => ({ default: module.ThermalVisual })),
  ),
  raybot: lazy(() => import('./RaybotVisual').then((module) => ({ default: module.RaybotVisual }))),
  transit: lazy(() =>
    import('./TransitVisual').then((module) => ({ default: module.TransitVisual })),
  ),
  audiolog: lazy(() =>
    import('./AudiologVisual').then((module) => ({ default: module.AudiologVisual })),
  ),
};

export function getProjectVisual(visual: ProjectVisual) {
  return visualMap[visual];
}
