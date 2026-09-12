"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CAROUSEL_CONFIG, MENU_CARDS } from "./constants";
import MenuCard from "./MenuCard";

interface CarouselSceneProps {
  onCardSelect?: (label: string) => void;
}

const cardYOffset = (index: number) =>
  (index - (MENU_CARDS.length - 1) / 2) * CAROUSEL_CONFIG.spiralRise;

const TOTAL_SPAN =
  (MENU_CARDS.length - 1) * CAROUSEL_CONFIG.spiralRise;

export default function CarouselScene({ onCardSelect }: CarouselSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef(0);
  const targetRotationRef = useRef<number | null>(null);
  const velocityRef = useRef<number>(CAROUSEL_CONFIG.autoRotateSpeed);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const scrollOffsetRef = useRef(0);
  const targetScrollOffsetRef = useRef(0);

  const { gl } = useThree();

  // Helical guide rail: a thin tube that follows the same path the cards
  // are strung along, so the spiral shape is legible even between cards.
  const helixGeometry = useMemo(() => {
    const segments = 220;
    const turnsPerCard =
      (1 / MENU_CARDS.length) + CAROUSEL_CONFIG.spiralTwist / (Math.PI * 2);
    const totalTurns = turnsPerCard * (MENU_CARDS.length - 1);
    const startY = cardYOffset(0);
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * totalTurns * Math.PI * 2;
      const y = startY + t * TOTAL_SPAN;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * (CAROUSEL_CONFIG.radius + 0.04),
          y,
          Math.sin(angle) * (CAROUSEL_CONFIG.radius + 0.04),
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, segments, 0.018, 8, false);
  }, []);

  useFrame((_, delta) => {
    scrollOffsetRef.current = THREE.MathUtils.damp(
      scrollOffsetRef.current,
      targetScrollOffsetRef.current,
      5,
      delta,
    );

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
      // Scrolling climbs the spiral: the whole formation rises/falls so a
      // new card settles toward the focal band one section at a time.
      groupRef.current.position.y = scrollOffsetRef.current;
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

      targetScrollOffsetRef.current +=
        event.deltaY * CAROUSEL_CONFIG.scrollClimbFactor;

      const bound = TOTAL_SPAN / 2 + CAROUSEL_CONFIG.spiralRise;
      targetScrollOffsetRef.current = Math.max(
        -bound,
        Math.min(bound, targetScrollOffsetRef.current),
      );
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
    const angle =
      (index / MENU_CARDS.length) * Math.PI * 2 +
      index * CAROUSEL_CONFIG.spiralTwist;
    const turns = Math.round((rotationRef.current + angle) / (Math.PI * 2));
    targetRotationRef.current = -angle + turns * Math.PI * 2;
    // Bring the selected card's height to the focal band at the centre.
    targetScrollOffsetRef.current = -cardYOffset(index);
    onCardSelect?.(label);
  };

  return (
    <>
      <fog attach="fog" args={["#050a0e", 6, 20]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 4, 8]} intensity={1.8} color="#00f2ff" />
      <pointLight position={[-5, -2, -4]} intensity={0.5} color="#6b2bff" />
      <pointLight position={[5, 2, -3]} intensity={0.4} color="#ff6b2b" />
      <spotLight position={[0, 5, 10]} angle={0.3} penumbra={0.5} intensity={0.8} color="#ffffff" />

      <group ref={groupRef}>
        <mesh geometry={helixGeometry}>
          <meshBasicMaterial color="#00f2ff" transparent opacity={0.55} />
        </mesh>

        {MENU_CARDS.map((card, index) => (
          <MenuCard
            key={card.id}
            index={index}
            total={MENU_CARDS.length}
            label={card.label}
            detail={card.detail}
            image={card.image}
            yOffset={cardYOffset(index)}
            groupRotation={rotationRef}
            onSelect={handleSelect}
          />
        ))}

        {[cardYOffset(0) - CAROUSEL_CONFIG.spiralRise * 0.5, cardYOffset(MENU_CARDS.length - 1) + CAROUSEL_CONFIG.spiralRise * 0.5].map(
          (y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[CAROUSEL_CONFIG.radius + 0.02, 0.02, 8, 64]} />
              <meshBasicMaterial color="#00f2ff" transparent opacity={0.35} />
            </mesh>
          ),
        )}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, cardYOffset(0) - CAROUSEL_CONFIG.spiralRise, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshBasicMaterial
          color="#00f2ff"
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>

      <gridHelper
        args={[14, 28, "#00f2ff", "#12303a"]}
        position={[0, cardYOffset(0) - CAROUSEL_CONFIG.spiralRise, 0]}
      />
    </>
  );
}
