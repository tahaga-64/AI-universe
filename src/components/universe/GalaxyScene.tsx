'use client';

import { Float, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, memo, useMemo, useRef } from 'react';
import type { Points } from 'three';
import { BufferAttribute, BufferGeometry, PointsMaterial } from 'three';
import type { NewsItem } from '@/types/news';
import { NewsPlanet } from './NewsPlanet';

interface GalaxySceneProps { items: NewsItem[]; onSelect: (item: NewsItem) => void; }

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    camera.position.x = Math.sin(clock.elapsedTime * 0.12) * 0.7;
    camera.position.y = Math.cos(clock.elapsedTime * 0.1) * 0.35;
    camera.lookAt(0, 0, -6);
  });
  return null;
}

function ParticleField() {
  const points = useRef<Points>(null);
  const geometry = useMemo(() => {
    const count = 650;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const seed = i + 1;
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      const y = Math.sin(seed * 78.233) * 24634.6345;
      const z = Math.sin(seed * 37.719) * 14375.8541;
      positions[i * 3] = ((x - Math.floor(x)) - 0.5) * 18;
      positions[i * 3 + 1] = ((y - Math.floor(y)) - 0.5) * 10;
      positions[i * 3 + 2] = -(z - Math.floor(z)) * 16 - 1;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    return geo;
  }, []);
  const material = useMemo(() => new PointsMaterial({ color: '#c7d2fe', size: 0.018, transparent: true, opacity: 0.56 }), []);
  useFrame(() => { if (points.current) points.current.rotation.y += 0.0008; });
  return <points ref={points} geometry={geometry} material={material} />;
}

export const GalaxyScene = memo(function GalaxyScene({ items, onSelect }: GalaxySceneProps) {
  return (
    <Canvas dpr={[1, 1.7]} camera={{ position: [0, 0, 6.5], fov: 52 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#03040a']} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-4, -2, 2]} intensity={1.2} color="#7dd3fc" />
      <Suspense fallback={null}>
        <Stars radius={60} depth={32} count={2200} factor={4} saturation={0} fade speed={0.3} />
        <ParticleField />
        <Float speed={0.85} rotationIntensity={0.08} floatIntensity={0.16}>
          {items.map((item) => <NewsPlanet key={item.id} item={item} onSelect={onSelect} />)}
        </Float>
      </Suspense>
      <CameraDrift />
    </Canvas>
  );
});
