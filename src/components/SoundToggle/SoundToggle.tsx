"use client";

import { useAudio } from "@/lib/audio-context";
import "./sound-toggle.css";

export default function SoundToggle() {
  const { soundEnabled, toggleSound } = useAudio();

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggleSound}
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
      title={soundEnabled ? "Disable sound" : "Enable sound"}
    >
      <span className="sound-toggle__dot" data-active={soundEnabled} />
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        {soundEnabled ? (
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <>
            <line x1="17" y1="9" x2="22" y2="15" />
            <line x1="22" y1="9" x2="17" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}
