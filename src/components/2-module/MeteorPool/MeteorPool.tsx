'use client';

import { useMemo, useRef } from 'react';
import { createMeteorFlight } from '@/lib/spaceScene';
import type { THREE } from '@/vendor/three';
import { useFrame } from '@/vendor/three/canvas';

type MeteorProps = {
  seed: number;
  enabled: boolean;
};

function Meteor({ seed, enabled }: MeteorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headMat = useRef<THREE.MeshBasicMaterial>(null);
  const tailMat = useRef<THREE.MeshBasicMaterial>(null);
  const flight = useMemo(() => createMeteorFlight(seed), [seed]);
  const elapsedRef = useRef(-flight.delay);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!enabled || !group) return;

    elapsedRef.current += delta;
    if (elapsedRef.current < 0) {
      group.visible = false;
      return;
    }

    const t = elapsedRef.current / flight.duration;
    if (t >= 1) {
      elapsedRef.current = -flight.delay;
      group.visible = false;
      return;
    }

    const x = flight.startX + (flight.endX - flight.startX) * t;
    const y = flight.startY + (flight.endY - flight.startY) * t;
    group.position.set(x, y, flight.z);
    group.lookAt(x + (flight.endX - flight.startX), y + (flight.endY - flight.startY), flight.z);
    group.visible = true;

    const fade = Math.sin(t * Math.PI);
    if (headMat.current) headMat.current.opacity = fade;
    if (tailMat.current) tailMat.current.opacity = fade * 0.7;
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshBasicMaterial ref={headMat} color="#ffffff" transparent opacity={0} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.85]}>
        <coneGeometry args={[0.05, 1.7, 8]} />
        <meshBasicMaterial ref={tailMat} color="#64ffda" transparent opacity={0} />
      </mesh>
    </group>
  );
}

type MeteorPoolProps = {
  count: number;
  enabled: boolean;
};

export function MeteorPool({ count, enabled }: MeteorPoolProps) {
  const seeds = useMemo(
    () => Array.from({ length: count }, (_, index) => 100 + index * 17),
    [count],
  );

  return (
    <>
      {seeds.map((seed) => (
        <Meteor key={seed} seed={seed} enabled={enabled} />
      ))}
    </>
  );
}
