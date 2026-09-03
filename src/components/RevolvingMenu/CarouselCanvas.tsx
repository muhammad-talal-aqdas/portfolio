"use client";

import { Canvas } from "@react-three/fiber";
import CarouselScene from "./CarouselScene";

interface CarouselCanvasProps {
  onCardSelect?: (label: string) => void;
}

export default function CarouselCanvas({ onCardSelect }: CarouselCanvasProps) {
  return (
    <Canvas
      className="absolute inset-0 z-0"
      camera={{ position: [0, 0.1, 8.4], fov: 38, near: 0.1, far: 30 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <CarouselScene onCardSelect={onCardSelect} />
    </Canvas>
  );
}
