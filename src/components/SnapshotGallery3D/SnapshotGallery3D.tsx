"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import "./snapshot-gallery-3d.css";

export interface CaveMediaItem {
  id: string;
  image: string;
  title: string;
  parentId: string;
}

interface SnapshotGallery3DProps {
  items: CaveMediaItem[];
  onSelect: (parentId: string) => void;
  onHoverChange: (title: string | null) => void;
}

// Loads an image and draws it down to a capped resolution on an offscreen
// canvas before handing it to three.js as a texture. These are full-size
// source photos with no resizing pipeline — without this step, showing
// every photo in a folder (rather than a handful) is heavy on GPU memory
// and load time. Capping the longest edge keeps quality plenty sharp for a
// gallery frame while cutting memory per image by 5-10x.
function loadDownscaledTexture(src: string, maxEdge = 640): Promise<THREE.Texture | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      resolve(texture);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

interface PlaneDatum {
  item: CaveMediaItem;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  texture: THREE.Texture;
}

function Scene({ items, onSelect, onHoverChange }: SnapshotGallery3DProps) {
  const { camera, gl } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  // Drag look-around: accumulates on top of the subtle cursor-position
  // parallax below, so dragging lets you turn much further to either side
  // than just moving the mouse does.
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const dragDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);
  const [textures, setTextures] = useState<Record<string, THREE.Texture | null>>({});

  // Only real images can be textured onto a plane — video files are
  // filtered out here, but every folder still has at least one image
  // (posters were generated for video-only folders) so nothing is
  // unreachable.
  const imageItems = useMemo(
    () => items.filter((item) => !/\.(mp4|webm|mov|ogg)(?:$|\?)/i.test(item.image)),
    [items],
  );

  useEffect(() => {
    let cancelled = false;
    const loaded: Record<string, THREE.Texture | null> = {};

    Promise.all(
      imageItems.map(async (item) => {
        const texture = await loadDownscaledTexture(item.image);
        loaded[item.id] = texture;
      }),
    ).then(() => {
      if (!cancelled) setTextures({ ...loaded });
    });

    return () => {
      cancelled = true;
      Object.values(loaded).forEach((texture) => texture?.dispose());
    };
  }, [imageItems]);

  const planes = useMemo<PlaneDatum[]>(() => {
    if (Object.keys(textures).length === 0) return [];

    const arcAngle = Math.PI * 1.5;
    const spacing = arcAngle / (imageItems.length + 1);

    return imageItems
      .map((item, index) => {
        const texture = textures[item.id];
        if (!texture) return null;

        const seed = index * 137.51;
        const rand = (offset: number) => {
          const v = Math.sin(seed + offset) * 43758.5453;
          return v - Math.floor(v);
        };

        const angle = -arcAngle / 2 + spacing * (index + 1) + (rand(1) - 0.5) * 0.16;
        const depth = 7 + rand(2) * 8; // 7..15 — close enough to read clearly
        const x = Math.sin(angle) * depth;
        // Negative Z puts these planes in front of the default camera
        // (which looks down -Z) instead of behind it.
        const z = -Math.cos(angle) * depth;
        const y = (rand(3) - 0.5) * 8;
        const rotateY = -angle + (rand(4) - 0.5) * 0.25;
        const rotateZ = (rand(5) - 0.5) * 0.1;
        const scale = 0.68 + rand(6) * 0.68;

        return {
          item,
          position: [x, y, z] as [number, number, number],
          rotation: [0, rotateY, rotateZ] as [number, number, number],
          scale,
          texture,
        };
      })
      .filter((plane): plane is PlaneDatum => plane !== null);
  }, [imageItems, textures]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Click-and-drag to look around, in addition to the subtle cursor
  // parallax above. Also tracks how far a drag travelled so a real drag
  // doesn't get misread as a click on whatever frame it started over.
  useEffect(() => {
    const canvas = gl.domElement;
    const maxDragX = 1.3;
    const maxDragY = 0.5;

    const handlePointerDown = (event: PointerEvent) => {
      isDraggingRef.current = true;
      dragDistanceRef.current = 0;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - lastPointerRef.current.x;
      const deltaY = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      dragDistanceRef.current += Math.abs(deltaX) + Math.abs(deltaY);

      // Sensitivity scaled to the viewport's own size rather than a fixed
      // pixel count — on a ~390px-wide phone screen, a fixed pixel
      // constant tuned for a ~1500px desktop window barely moved anything,
      // which is why this felt unresponsive on mobile specifically.
      const sensitivityX = 3.1 / window.innerWidth;
      const sensitivityY = 3.1 / window.innerHeight;

      dragOffsetRef.current = {
        x: Math.max(-maxDragX, Math.min(maxDragX, dragOffsetRef.current.x - deltaX * sensitivityX)),
        y: Math.max(-maxDragY, Math.min(maxDragY, dragOffsetRef.current.y - deltaY * sensitivityY)),
      };
    };

    const handlePointerUp = (event: PointerEvent) => {
      isDraggingRef.current = false;
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      // A drag of more than a few pixels shouldn't also fire a click on
      // whatever frame happened to be under the cursor when it settled.
      if (dragDistanceRef.current > 6) {
        suppressClickRef.current = true;
      }
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [gl]);

  useFrame(() => {
    const maxPanX = 0.45;
    const maxPanY = 0.18;

    targetRotationRef.current = {
      x: -mouseRef.current.x * maxPanX + dragOffsetRef.current.x,
      y: mouseRef.current.y * maxPanY + dragOffsetRef.current.y,
    };

    // Snappier, closer-to-1:1 tracking while actively dragging; the softer
    // damping is only for the passive cursor-position parallax when idle.
    const damping = isDraggingRef.current ? 0.32 : 0.08;
    currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * damping;
    currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * damping;

    camera.rotation.y = currentRotationRef.current.x;
    camera.rotation.x = currentRotationRef.current.y;
  });

  return (
    <>
      <fog attach="fog" args={["#03070a", 10, 26]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[10, 10, 10]} intensity={0.7} />
      <pointLight position={[-10, -4, -10]} intensity={0.4} color="#00f2ff" />

      {planes.map((plane) => (
        <CaveFrame
          key={plane.item.id}
          plane={plane}
          onSelect={() => onSelect(plane.item.parentId)}
          onHoverStart={() => {
            onHoverChange(plane.item.title);
            if (!isDraggingRef.current) gl.domElement.style.cursor = "pointer";
          }}
          onHoverEnd={() => {
            onHoverChange(null);
            if (!isDraggingRef.current) gl.domElement.style.cursor = "grab";
          }}
          suppressClickRef={suppressClickRef}
        />
      ))}
    </>
  );
}

function CaveFrame({
  plane,
  onSelect,
  onHoverStart,
  onHoverEnd,
  suppressClickRef,
}: {
  plane: PlaneDatum;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  suppressClickRef: { current: boolean };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={plane.position}
      rotation={plane.rotation}
      scale={hovered ? plane.scale * 1.08 : plane.scale}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (suppressClickRef.current) {
          suppressClickRef.current = false;
          return;
        }
        onSelect();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        onHoverStart();
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(false);
        onHoverEnd();
      }}
    >
      <planeGeometry args={[4, 3]} />
      <meshBasicMaterial
        map={plane.texture}
        transparent
        opacity={hovered ? 1 : 0.92}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function SnapshotGallery3D({ items, onSelect, onHoverChange }: SnapshotGallery3DProps) {
  return (
    <div className="snapshot-gallery-3d">
      <Canvas camera={{ position: [0, 0, 0], fov: 62 }}>
        <Scene items={items} onSelect={onSelect} onHoverChange={onHoverChange} />
      </Canvas>
    </div>
  );
}
