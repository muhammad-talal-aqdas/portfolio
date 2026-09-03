"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CAROUSEL_CONFIG, MENU_CARDS } from "./constants";
import MenuCard from "./MenuCard";

interface CarouselSceneProps {
  onCardSelect?: (label: string) => void;
}

export default function CarouselScene({ onCardSelect }: CarouselSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef(0);
  const targetRotationRef = useRef<number | null>(null);
  const velocityRef = useRef<number>(CAROUSEL_CONFIG.autoRotateSpeed);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  const { gl } = useThree();

  useFrame((_, delta) => {
    if (targetRotationRef.current !== null && !isDraggingRef.current) {
      rotationRef.current = THREE.MathUtils.damp(
        rotationRef.current,
        targetRotationRef.current,
        7,
        delta,
      );
      if (Math.abs(rotationRef.current - targetRotationRef.current) < 0.002) {
        rotationRef.current = targetRotationRef.current;
        targetRotationRef.current = null;
      }
    } else if (!isDraggingRef.current) {
      velocityRef.current = THREE.MathUtils.lerp(
        velocityRef.current,
        CAROUSEL_CONFIG.autoRotateSpeed,
        delta * 1.5,
      );
    } else {
      velocityRef.current = THREE.MathUtils.lerp(velocityRef.current, 0, delta * 6);
    }

    rotationRef.current += velocityRef.current * delta;

    if (groupRef.current) {
      groupRef.current.rotation.y = rotationRef.current;
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerDown = (event: PointerEvent) => {
      isDraggingRef.current = true;
      targetRotationRef.current = null;
      pointerIdRef.current = event.pointerId;
      lastPointerXRef.current = event.clientX;
      canvas.setPointerCapture(event.pointerId);
      document.body.style.cursor = "grabbing";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - lastPointerXRef.current;
      lastPointerXRef.current = event.clientX;
      rotationRef.current += deltaX * CAROUSEL_CONFIG.dragSensitivity;
      velocityRef.current = deltaX * CAROUSEL_CONFIG.dragSensitivity * 60;
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) return;
      isDraggingRef.current = false;
      pointerIdRef.current = null;
      canvas.releasePointerCapture(event.pointerId);
      document.body.style.cursor = "grab";
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      targetRotationRef.current = null;
      rotationRef.current += event.deltaY * CAROUSEL_CONFIG.scrollSensitivity;
      velocityRef.current =
        event.deltaY * CAROUSEL_CONFIG.scrollSensitivity * 40;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [gl]);

  const handleSelect = (index: number, label: string) => {
    const angle = (index / MENU_CARDS.length) * Math.PI * 2;
    const turns = Math.round((rotationRef.current + angle) / (Math.PI * 2));
    targetRotationRef.current = -angle + turns * Math.PI * 2;
    onCardSelect?.(label);
  };

  return (
    <>
      <fog attach="fog" args={["#050a0e", 6, 16]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 3, 6]} intensity={1.35} color="#00f2ff" />
      <pointLight position={[-4, -2, -3]} intensity={0.4} color="#6b2bff" />
      <pointLight position={[4, 1, -2]} intensity={0.35} color="#ff6b2b" />

      <group ref={groupRef}>
        <mesh>
          <cylinderGeometry
            args={[
              CAROUSEL_CONFIG.radius - 0.1,
              CAROUSEL_CONFIG.radius - 0.1,
              CAROUSEL_CONFIG.cylinderHeight,
              64,
              1,
              true,
            ]}
          />
          <meshStandardMaterial
            color="#07111a"
            transparent
            opacity={0.16}
            roughness={0.5}
            metalness={0.8}
            side={THREE.BackSide}
          />
        </mesh>

        {MENU_CARDS.map((card, index) => (
          <MenuCard
            key={card.id}
            index={index}
            total={MENU_CARDS.length}
            label={card.label}
            detail={card.detail}
            groupRotation={rotationRef}
            onSelect={handleSelect}
          />
        ))}

        {[-CAROUSEL_CONFIG.cylinderHeight / 2, CAROUSEL_CONFIG.cylinderHeight / 2].map(
          (y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[CAROUSEL_CONFIG.radius + 0.015, 0.025, 8, 64]} />
              <meshBasicMaterial color="#00f2ff" transparent opacity={0.45} />
            </mesh>
          ),
        )}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.45, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial
          color="#00f2ff"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>

      <gridHelper args={[12, 24, "#00f2ff", "#12303a"]} position={[0, -3.43, 0]} />
    </>
  );
}
