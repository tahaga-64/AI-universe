"use client";

import { Html, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { Vector3 } from "three";
import type { NewsItem } from "@/types/news";

interface NewsPlanetProps {
  item: NewsItem;
  onSelect: (item: NewsItem) => void;
}

export const NewsPlanet = memo(function NewsPlanet({
  item,
  onSelect,
}: NewsPlanetProps) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const emissive = useMemo(() => item.color, [item.color]);
  const targetScale = useMemo(() => new Vector3(1, 1, 1), []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003 + item.impactScore / 80000;
    }

    if (!groupRef.current) return;

    groupRef.current.position.y =
      item.position[1] +
      Math.sin(clock.elapsedTime * 0.65 + item.radius * 8) * 0.14;

    const target = hovered ? 1.18 : 1;
    targetScale.setScalar(target);
    groupRef.current.scale.lerp(targetScale, 0.08);
  });

  return (
    <group ref={groupRef} position={item.position}>
      <Sphere
        ref={meshRef}
        args={[item.radius, 32, 32]}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(item);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={item.color}
          roughness={0.62}
          metalness={0.18}
          emissive={emissive}
          emissiveIntensity={hovered ? 0.34 : 0.12}
        />
      </Sphere>
      <Sphere args={[item.radius * 1.45, 24, 24]}>
        <meshBasicMaterial
          color={item.color}
          transparent
          opacity={hovered ? 0.15 : 0.055}
          depthWrite={false}
        />
      </Sphere>
      {hovered ? (
        <Html center distanceFactor={8}>
          <div className="pointer-events-none w-48 rounded-2xl border border-white/15 bg-slate-950/80 p-3 text-center text-xs text-white shadow-2xl backdrop-blur-xl">
            <strong className="block text-sm">{item.source}</strong>
            <span className="text-slate-300">{item.title}</span>
          </div>
        </Html>
      ) : null}
    </group>
  );
});
