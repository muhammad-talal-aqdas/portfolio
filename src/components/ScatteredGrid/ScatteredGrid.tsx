"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import "./scattered-grid.css";

export interface ScatteredGridItem {
  image?: string;
  title: string;
  teaser?: string;
  id: string;
}

const isVideo = (path: string) => /\.(mp4|webm|mov|ogg)(?:$|\?)/i.test(path);

interface ScatteredGridProps {
  items: ScatteredGridItem[];
  className?: string;
  onSelect?: (item: ScatteredGridItem) => void;
}

interface Placement {
  x: number;
  y: number;
  rotate: number;
  width: number;
  delay: number;
  duration: number;
}

// Rounded so server and client render identical style strings.
const round = (value: number) => Math.round(value * 1000) / 1000;

function getColumns(count: number) {
  if (count <= 4) return 2;
  if (count <= 9) return 3;
  if (count <= 20) return 4;
  return 5;
}

// A seeded layout keeps cards scattered without jumping every time React renders.
function getPlacements(count: number): Placement[] {
  const columns = getColumns(count);
  const rows = Math.ceil(count / columns);
  const columnSpan = 100 / columns;
  const rowSpan = 100 / rows;

  return Array.from({ length: count }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const phase = index * 1.618;
    const width = columnSpan * 0.74;

    return {
      x: round(column * columnSpan + (columnSpan - width) / 2 + Math.sin(phase) * columnSpan * 0.1),
      y: round(row * rowSpan + Math.cos(phase) * rowSpan * 0.12),
      rotate: round(Math.sin(phase) * 5.5),
      width: round(width),
      delay: (index % 4) * 0.65,
      duration: 7 + (index % 3) * 1.5,
    };
  });
}

export default function ScatteredGrid({ items, className = "", onSelect }: ScatteredGridProps) {
  const placements = useMemo(() => getPlacements(items.length), [items.length]);

  return (
    <div
      className={`scattered-grid ${className}`}
      style={{ "--grid-rows": Math.ceil(items.length / getColumns(items.length)) } as React.CSSProperties}
    >
      {items.map((item, index) => {
        const placement = placements[index];

        return (
          <motion.button
            key={item.id}
            type="button"
            className="scattered-grid__card"
            style={
              {
                "--card-x": `${placement.x}%`,
                "--card-y": `${placement.y}%`,
                "--card-width": `${placement.width}%`,
                "--card-rotate": `${placement.rotate}deg`,
                zIndex: index + 1,
              } as React.CSSProperties
            }
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            whileHover={{ scale: 1.08, zIndex: 20 }}
            whileTap={{ scale: 1.03 }}
            onClick={() => onSelect?.(item)}
            aria-label={`Open ${item.title}`}
          >
            <motion.span
              className="scattered-grid__float"
              animate={{ y: [0, -7, 2, 0], x: [0, 3, -2, 0], rotate: [0, 1.2, -0.8, 0] }}
              transition={{
                duration: placement.duration,
                delay: placement.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {item.image ? (
                isVideo(item.image) ? (
                  <video className="scattered-grid__image" src={item.image} muted playsInline preload="metadata" />
                ) : (
                  <img className="scattered-grid__image" src={item.image} alt="" />
                )
              ) : (
                <span className="scattered-grid__placeholder">
                  <span className="scattered-grid__placeholder-title">{item.title}</span>
                  {item.teaser && <span className="scattered-grid__placeholder-teaser">{item.teaser}</span>}
                </span>
              )}
              <span className="scattered-grid__caption">{item.title}</span>
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
