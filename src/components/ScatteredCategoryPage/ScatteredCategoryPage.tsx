"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DetailView } from "@/components/DetailView";
import SnapshotGallery3D, { type CaveMediaItem } from "@/components/SnapshotGallery3D/SnapshotGallery3D";
import type { PortfolioItem } from "@/data/portfolio";
import "./scattered-category-page.css";

interface ScatteredCategoryPageProps {
  title: string;
  category: string;
  items: PortfolioItem[];
  snapshots?: boolean;
}

const isVideo = (path: string) => /\.(mp4|webm|mov|ogg)(?:$|\?)/i.test(path);

export default function ScatteredCategoryPage({ title, category, items, snapshots = false }: ScatteredCategoryPageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  // Flatten every folder's full media set into individual cave frames, so a
  // folder with 10 photos shows all 10 in the cave (not just its cover).
  // Hovering any frame shows the folder/project name at the bottom;
  // clicking it opens that folder's full detail page regardless of which
  // specific photo was hit.
  const flatItems = useMemo<CaveMediaItem[]>(() => {
    return items.flatMap((item) => {
      const media = item.media && item.media.length > 0 ? item.media : item.image ? [item.image] : [];
      return media.map((src, index) => ({
        id: `${item.id}__${index}`,
        image: src,
        title: item.title,
        parentId: item.id,
      }));
    });
  }, [items]);

  const handleSelect = (parentId: string) => {
    const parent = items.find((item) => item.id === parentId);
    if (parent) setSelected(parent);
  };

  return (
    <main className="category-page category-page--atmospheric">
      <SnapshotGallery3D items={flatItems} onSelect={handleSelect} onHoverChange={setHoveredTitle} />
      <div className="category-page__vignette" aria-hidden="true" />
      <header className="category-page__header">
        <button type="button" className="category-page__back" onClick={() => router.push("/")}>
          <span aria-hidden="true">←</span> Back to menu
        </button>
        <span className="category-page__meta">[ {category} / archive ]</span>
      </header>
      <section className="category-page__content category-page__content--overlay">
        <p className="category-page__eyebrow">[ portfolio / {category} ]</p>
        <h1>{title}</h1>
        <p className="category-page__hint">Move your cursor to look around — click any frame to open it</p>
      </section>

      <AnimatePresence>
        {hoveredTitle && !selected && (
          <motion.div
            className="category-page__hover-label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {hoveredTitle}
          </motion.div>
        )}
      </AnimatePresence>

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
