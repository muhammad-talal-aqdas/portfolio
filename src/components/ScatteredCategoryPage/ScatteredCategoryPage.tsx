"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function ScatteredCategoryPage({ title, category, items, snapshots = false }: ScatteredCategoryPageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  return (
    <main className="category-page">
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
        <ScatteredGrid items={items} onSelect={(item) => setSelected(item as PortfolioItem)} />
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
