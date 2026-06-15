"use client";

import { Html, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef, useState } from "react";
import type { Mesh } from "three";
import type { NewsItem } from "@/types/news";

interface NewsPlanetProps {
  item: NewsItem;
  onSelect: (item: NewsItem) => void;
}

export const NewsPlanet = memo(function NewsPlanet({
  item,
  onSelect,
}: NewsPlanetProps) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const emissive = useMemo(() => item.color, [item.color]);
  const visualRadius = useMemo(
    () => item.radius * (0.85 + item.impactScore / 120),
    [item.impactScore, item.radius],
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.003 + item.impactScore / 80000;
    ref.current.position.y =
      item.position[1] +
      Math.sin(clock.elapsedTime * 0.65 + visualRadius * 8) * 0.14;
    const target = hovered ? 1.18 : 1;
    ref.current.scale.lerp({ x: target, y: target, z: target }, 0.08);
  });

  return (
    <group position={item.position}>
      <Sphere
        ref={ref}
        args={[visualRadius, 36, 36]}
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
      <Sphere args={[visualRadius * 1.55, 24, 24]}>
        <meshBasicMaterial
          color={item.color}
          transparent
          opacity={hovered ? 0.18 : 0.07}
          depthWrite={false}
        />
      </Sphere>
      {hovered ? (
        <Html center distanceFactor={8}>
          <div className="pointer-events-none w-48 rounded-2xl border border-white/15 bg-slate-950/80 p-3 text-center text-xs text-white shadow-2xl backdrop-blur-xl">
            <strong className="block text-sm">
              {item.source} · Impact {item.impactScore}
            </strong>
            <span className="text-slate-300">{item.title}</span>
          </div>
        </Html>
      ) : null}
    </group>
  );
});
