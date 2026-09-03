"use client";

import { useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CAROUSEL_CONFIG } from "./constants";

interface MenuCardProps {
  index: number;
  total: number;
  label: string;
  detail: string;
  groupRotation: React.MutableRefObject<number>;
  onSelect: (index: number, label: string) => void;
}

export default function MenuCard({
  index,
  total,
  label,
  detail,
  groupRotation,
  onSelect,
}: MenuCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const angle = (index / total) * Math.PI * 2;
  const arc =
    ((Math.PI * 2) / total) * CAROUSEL_CONFIG.cardArcRatio;

  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(
      CAROUSEL_CONFIG.radius,
      CAROUSEL_CONFIG.radius,
      CAROUSEL_CONFIG.cardHeight,
      40,
      1,
      true,
      -arc / 2,
      arc,
    );
    return geo;
  }, [arc]);

  const edgeGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(
      CAROUSEL_CONFIG.radius + 0.016,
      CAROUSEL_CONFIG.radius + 0.016,
      CAROUSEL_CONFIG.cardHeight,
      40,
      1,
      true,
      -arc / 2,
      arc,
    );
    return geo;
  }, [arc]);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    const worldAngle = angle + groupRotation.current;
    const frontness = (Math.cos(worldAngle) + 1) / 2;
    const scale = 0.72 + 0.28 * frontness;

    meshRef.current.scale.set(scale, scale, scale);
    materialRef.current.opacity = 0.28 + 0.62 * frontness;
    materialRef.current.emissiveIntensity = 0.05 + 0.35 * frontness;

    if (htmlRef.current) {
      htmlRef.current.style.opacity = String(0.45 + 0.55 * frontness);
      htmlRef.current.style.transform = `scale(${0.85 + 0.15 * frontness})`;
    }
  });

  return (
    <group rotation={[0, angle, 0]}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(index, label);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "grab";
        }}
      >
        <meshPhysicalMaterial
          ref={materialRef}
          color="#0a1520"
          emissive="#00f2ff"
          transparent
          opacity={0.62}
          roughness={0.28}
          metalness={0.72}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh geometry={edgeGeometry}>
        <meshBasicMaterial
          color="#00f2ff"
          transparent
          opacity={0.08}
          wireframe
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <Html
        transform
        occlude
        distanceFactor={5.1}
        position={[0, 0, CAROUSEL_CONFIG.radius + 0.055]}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={htmlRef}
          className="revolving-menu__label flex w-[156px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center font-mono text-[11px] leading-snug tracking-[0.22em] text-[#00f2ff] uppercase select-none sm:w-[194px] sm:text-xs"
        >
          <span className="mb-1 text-[9px] tracking-[0.35em] text-white/40">
            [ · ]
          </span>
          <span className="revolving-menu__label-text">{label}</span>
          <span className="mt-2 text-[8px] tracking-[0.12em] text-white/35 normal-case">
            {detail}
          </span>
        </div>
      </Html>
    </group>
  );
}
