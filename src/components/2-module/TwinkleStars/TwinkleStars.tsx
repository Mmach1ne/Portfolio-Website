'use client';

import { useMemo, useRef } from 'react';
import { mulberry32 } from '@/lib/seededRandom';
import { THREE } from '@/vendor/three';
import { useFrame } from '@/vendor/three/canvas';

const SEED = 42;

type TwinkleStarsProps = {
  count: number;
};

export function TwinkleStars({ count }: TwinkleStarsProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const random = mulberry32(SEED);
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (random() - 0.5) * 48;
      positions[index * 3 + 1] = (random() - 0.5) * 48;
      positions[index * 3 + 2] = -12 - random() * 18;
      phases[index] = random() * Math.PI * 2;
      sizes[index] = random() < 0.12 ? 1.35 : random() < 0.4 ? 0.95 : 0.65;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float aPhase;
          attribute float aSize;
          uniform float uTime;
          varying float vOpacity;
          void main() {
            vOpacity = 0.22 + 0.38 * (0.5 + 0.5 * sin(uTime * 0.55 + aPhase));
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (110.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying float vOpacity;
          void main() {
            vec2 c = gl_PointCoord - vec2(0.5);
            float d = length(c);
            if (d > 0.5) discard;
            gl_FragColor = vec4(1.0, 1.0, 1.0, smoothstep(0.5, 0.1, d) * vOpacity);
          }
        `,
      }),
    [],
  );

  useFrame(({ clock }) => {
    const uniform = materialRef.current?.uniforms?.uTime;
    if (uniform) {
      uniform.value = clock.getElapsedTime();
    }
  });

  return (
    <points
      geometry={geometry}
      material={material}
      ref={(node) => {
        materialRef.current = node?.material as THREE.ShaderMaterial;
      }}
    />
  );
}
