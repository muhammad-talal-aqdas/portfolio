"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DetailView } from "@/components/DetailView";
import { ScatteredGrid } from "@/components/ScatteredGrid";
import type { PortfolioItem } from "@/data/portfolio";
import "./scattered-category-page.css";

interface ScatteredCategoryPageProps {
  title: string;
  category: string;
  items: PortfolioItem[];
  snapshots?: boolean;
}

const isVideo = (path: string) => /\.(mp4|webm|mov|ogg)(?:$|\?)/i.test(path);

const BACKDROP_COUNT = 14;
const BACKDROP_SHIFT = 18;
const FOREGROUND_SHIFT = 4;

interface BackdropPlacement {
  src: string;
  x: number;
  y: number;
  width: number;
  rotate: number;
}

function getBackdropPlacements(items: PortfolioItem[]): BackdropPlacement[] {
  const images = items.map((item) => item.image).filter((src): src is string => Boolean(src) && !isVideo(src as string));
  if (images.length === 0) return [];

  return Array.from({ length: Math.min(BACKDROP_COUNT, images.length * 2) }, (_, index) => {
    const phase = index * 2.399;
    return {
      src: images[(index * 7) % images.length],
      x: (index / BACKDROP_COUNT) * 100 + Math.sin(phase) * 8,
      y: 8 + ((Math.cos(phase) + 1) / 2) * 76,
      width: 16 + ((Math.sin(phase * 1.7) + 1) / 2) * 12,
      rotate: Math.sin(phase) * 9,
    };
  });
}

export default function ScatteredCategoryPage({ title, category, items, snapshots = false }: ScatteredCategoryPageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const backdrop = useMemo(() => (snapshots ? getBackdropPlacements(items) : []), [snapshots, items]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 20 });
  const backdropX = useTransform(smoothX, [-1, 1], [BACKDROP_SHIFT, -BACKDROP_SHIFT]);
  const backdropY = useTransform(smoothY, [-1, 1], [BACKDROP_SHIFT, -BACKDROP_SHIFT]);
  const foregroundX = useTransform(smoothX, [-1, 1], [-FOREGROUND_SHIFT, FOREGROUND_SHIFT]);
  const foregroundY = useTransform(smoothY, [-1, 1], [-FOREGROUND_SHIFT, FOREGROUND_SHIFT]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!snapshots) return;
    pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
    pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <main className={`category-page${snapshots ? " category-page--atmospheric" : ""}`} onPointerMove={handlePointerMove}>
      {snapshots && (
        <>
          <motion.div className="category-page__backdrop" style={{ x: backdropX, y: backdropY }} aria-hidden="true">
            {backdrop.map((placement, index) => (
              <img
                key={`${placement.src}-${index}`}
                className="category-page__backdrop-image"
                src={placement.src}
                alt=""
                style={{
                  left: `${placement.x}%`,
                  top: `${placement.y}%`,
                  width: `${placement.width}vw`,
                  transform: `translate(-50%, -50%) rotate(${placement.rotate}deg)`,
                }}
              />
            ))}
          </motion.div>
          <div className="category-page__vignette" aria-hidden="true" />
        </>
      )}
      <header className="category-page__header">
        <button type="button" className="category-page__back" onClick={() => router.push("/")}>
          <span aria-hidden="true">←</span> Back to menu
        </button>
        <span className="category-page__meta">[ {category} / archive ]</span>
      </header>
      <section className="category-page__content">
        <p className="category-page__eyebrow">[ portfolio / {category} ]</p>
        <h1>{title}</h1>
        <p className="category-page__hint">{snapshots ? "Select a frame to enlarge it" : "Select a frame to open the case study"}</p>
        <motion.div style={snapshots ? { x: foregroundX, y: foregroundY } : undefined}>
          <ScatteredGrid items={items} onSelect={(item) => setSelected(item as PortfolioItem)} />
        </motion.div>
      </section>

      <AnimatePresence>
        {snapshots && selected && (
          <motion.div className="snapshot-viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="snapshot-viewer__close" onClick={() => setSelected(null)}>× <span>Close</span></button>
            <figure>
              {selected.image && isVideo(selected.image) ? (
                <motion.video src={selected.image} controls autoPlay loop initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }} />
              ) : (
                <motion.img src={selected.image} alt={selected.title} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }} />
              )}
              <figcaption>{selected.title}</figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>

      {!snapshots && selected && (
        <DetailView
          title={selected.title}
          eyebrow={`[ ${category} ]`}
          teaser={selected.teaser}
          description={selected.description}
          poetry={selected.poetry}
          videoUrl={selected.videoUrl}
          media={selected.media ?? []}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}
