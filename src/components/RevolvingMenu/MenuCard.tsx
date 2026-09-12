"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CAROUSEL_CONFIG } from "./constants";

interface MenuCardProps {
  index: number;
  total: number;
  label: string;
  detail: string;
  image: string;
  yOffset: number;
  groupRotation: React.MutableRefObject<number>;
  onSelect: (index: number, label: string) => void;
}

export default function MenuCard({
  index,
  total,
  label,
  detail,
  image,
  yOffset,
  groupRotation,
  onSelect,
}: MenuCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(image, (loadedTexture) => {
      loadedTexture.colorSpace = THREE.SRGBColorSpace;
      setTexture(loadedTexture);
    }, undefined, (error) => {
      console.error(`Failed to load texture: ${image}`, error);
    });
  }, [image]);

  const angle =
    (index / total) * Math.PI * 2 + index * CAROUSEL_CONFIG.spiralTwist;
  const arc =
    ((Math.PI * 2) / total) * CAROUSEL_CONFIG.cardArcRatio;

  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(
      CAROUSEL_CONFIG.radius,
      CAROUSEL_CONFIG.radius,
      CAROUSEL_CONFIG.cardHeight,
      48,
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
    materialRef.current.opacity = 0.3 + 0.7 * frontness;

    if (htmlRef.current) {
      htmlRef.current.style.opacity = String(0.45 + 0.55 * frontness);
      htmlRef.current.style.transform = `scale(${0.85 + 0.15 * frontness})`;
    }
  });

  return (
    <group position={[0, yOffset, 0]} rotation={[0, angle, 0]}>
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
        <meshBasicMaterial
          ref={materialRef}
          map={texture}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <Html
        transform
        occlude
        distanceFactor={5.1}
        position={[0, -CAROUSEL_CONFIG.cardHeight / 2 - 0.3, CAROUSEL_CONFIG.radius + 0.055]}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={htmlRef}
          className="flex w-[156px] -translate-x-1/2 flex-col items-center justify-center text-center font-mono text-[11px] leading-snug tracking-[0.22em] text-[#00f2ff] uppercase select-none sm:w-[194px] sm:text-xs"
        >
          <span className="revolving-menu__label-text">{label}</span>
        </div>
      </Html>
    </group>
  );
}
