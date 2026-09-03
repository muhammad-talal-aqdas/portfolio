"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import "./scattered-grid.css";

export interface ScatteredGridItem {
  image: string;
  title: string;
  id: string;
}

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

// A seeded layout keeps cards scattered without jumping every time React renders.
function getPlacements(count: number): Placement[] {
  const anchors = [
    [7, 10],
    [34, 2],
    [66, 11],
    [16, 44],
    [47, 35],
    [75, 42],
    [4, 74],
    [33, 70],
    [64, 72],
  ];

  return Array.from({ length: count }, (_, index) => {
    const [x, y] = anchors[index % anchors.length];
    const phase = index * 1.618;
    return {
      x,
      y,
      rotate: Math.sin(phase) * 5.5,
      width: 20 + (index % 3) * 2.5,
      delay: (index % 4) * 0.65,
      duration: 7 + (index % 3) * 1.5,
    };
  });
}

export default function ScatteredGrid({ items, className = "", onSelect }: ScatteredGridProps) {
  const placements = useMemo(() => getPlacements(items.length), [items.length]);

  return (
    <div className={`scattered-grid ${className}`}>
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
              <img className="scattered-grid__image" src={item.image} alt="" />
              <span className="scattered-grid__caption">{item.title}</span>
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
