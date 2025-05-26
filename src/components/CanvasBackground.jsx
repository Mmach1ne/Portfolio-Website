import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const Fireflies = () => {
  const firefliesRef = useRef();
  const texture = new TextureLoader().load('/assets/firefly.png');

  useEffect(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    firefliesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    firefliesRef.current.userData.velocities = velocities;
  }, []);

  useFrame(() => {
    const positions = firefliesRef.current.geometry.attributes.position.array;
    const velocities = firefliesRef.current.userData.velocities;
    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(positions[i * 3]) > 25 || Math.abs(positions[i * 3 + 2]) > 25) {
        velocities[i * 3] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    firefliesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={firefliesRef}>
      <bufferGeometry />
      <pointsMaterial
        map={texture}
        size={0.3}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const CanvasBackground = () => {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
      camera={{ position: [0, 0, 50], fov: 75 }}
    >
      <Fireflies />
    </Canvas>
  );
};

export default CanvasBackground;