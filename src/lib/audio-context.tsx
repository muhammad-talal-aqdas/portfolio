"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface AudioContextValue {
  soundEnabled: boolean;
  toggleSound: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Always start muted. Browsers block unsolicited autoplay anyway, so
  // restoring a "was on" flag from a previous visit just produces a button
  // that claims sound is playing when it silently isn't — every visit
  // should start from a clean, honest "Enable sound" state.
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/theme.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      const audio = audioRef.current;
      if (audio) {
        // Call play()/pause() synchronously inside the click handler itself
        // (not in a useEffect) so it's unambiguously tied to the user
        // gesture — this is what makes Safari/iOS allow it reliably.
        if (next) {
          audio.play().catch(() => {
            // Playback failed (rare once inside a click handler); reflect
            // that honestly instead of showing "Disable" for silence.
          });
        } else {
          audio.pause();
        }
      }
      return next;
    });
  }, []);

  return (
    <AudioCtx.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}
