"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import "./detail-view.css";

export interface DetailViewProps {
  title: string;
  description: string;
  media: string[];
  videoUrl?: string;
  onClose: () => void;
}

const isVideo = (path: string) => /\.(mp4|webm|mov|ogg)(?:$|\?)/i.test(path);

export default function DetailView({
  title,
  description,
  media,
  videoUrl,
  onClose,
}: DetailViewProps) {
  const [playing, setPlaying] = useState(false);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);

  const playFeaturedVideo = () => {
    setPlaying(true);
    void featuredVideoRef.current?.play();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="detail-view"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} details`}
      >
        <div className="detail-view__topbar">
          <button type="button" className="detail-view__back" onClick={onClose}>
            <span aria-hidden="true">←</span> Back to archive
          </button>
          <span className="detail-view__code">[ detail / {title.toLowerCase()} ]</span>
          <button type="button" className="detail-view__close" onClick={onClose} aria-label="Close details">
            ×
          </button>
        </div>

        <div className="detail-view__scroll">
          <div className="detail-view__intro">
            <p className="detail-view__eyebrow">[ selected project ]</p>
            <h1>{title}</h1>
            <p className="detail-view__description">{description}</p>
          </div>

          {videoUrl && (
            <div className="detail-view__featured">
              <video ref={featuredVideoRef} src={videoUrl} playsInline controls={playing} preload="metadata" />
              {!playing && (
                <button type="button" className="detail-view__play" onClick={playFeaturedVideo}>
                  <span className="detail-view__play-icon" aria-hidden="true">▶</span>
                  <span>Play featured video</span>
                </button>
              )}
            </div>
          )}

          {media.length > 0 && (
            <div className="detail-view__gallery">
              {media.map((path, index) => (
                <figure className="detail-view__media" key={`${path}-${index}`}>
                  {isVideo(path) ? (
                    <video src={path} controls preload="metadata" />
                  ) : (
                    <img src={path} alt={`${title} still ${index + 1}`} />
                  )}
                  <figcaption>0{index + 1} / {title}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
