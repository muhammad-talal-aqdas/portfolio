"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DetailView } from "@/components/DetailView";
import { ScatteredGrid, type ScatteredGridItem } from "@/components/ScatteredGrid";
import { projectVideo } from "@/data/portfolio";
import "./scattered-category-page.css";

interface ScatteredCategoryPageProps {
  title: string;
  category: string;
  items: ScatteredGridItem[];
  snapshots?: boolean;
}

export default function ScatteredCategoryPage({ title, category, items, snapshots = false }: ScatteredCategoryPageProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<ScatteredGridItem | null>(null);

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
        <ScatteredGrid items={items} onSelect={setSelected} />
      </section>

      <AnimatePresence>
        {snapshots && selected && (
          <motion.div className="snapshot-viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="snapshot-viewer__close" onClick={() => setSelected(null)}>× <span>Close</span></button>
            <figure>
              <motion.img src={selected.image} alt={selected.title} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }} />
              <figcaption>{selected.title}</figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>

      {!snapshots && selected && (
        <DetailView
          title={selected.title}
          description={`A placeholder case study for ${selected.title}. This project explores a focused digital experience through considered interaction, visual systems, and a little bit of controlled chaos.`}
          videoUrl={selected.id === "nexora" ? projectVideo : undefined}
          media={[selected.image]}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}
