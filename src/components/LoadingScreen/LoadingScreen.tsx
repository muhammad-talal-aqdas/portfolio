"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAudio } from "@/lib/audio-context";
import "./loading-screen.css";

const GLITCH_CHARS = "≈√∫∂Δμåæ¶£<>/\\|{}[]#@&%*";

export interface LoadingScreenProps {
  children?: ReactNode;
  /** Total time in ms to count from 0% to 100%. */
  duration?: number;
  onComplete?: () => void;
}

function GlitchText({
  text,
  className = "",
  glowClass = "loading-screen__glow-cyan",
  intensity = "normal",
  progress = 100,
}: {
  text: string;
  className?: string;
  glowClass?: string;
  intensity?: "normal" | "strong";
  progress?: number;
}) {
  const [display, setDisplay] = useState(text);
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.72) {
        const currentText = textRef.current;
        const chars = currentText.split("");
        
        // Calculate how many characters should be glitched based on progress
        // At 0% progress: more glitching, at 100%: no glitching
        const glitchProbability = Math.max(0, 1 - (progress / 100));
        const glitchCount = Math.max(1, Math.floor(chars.length * 0.15 * glitchProbability));
        
        for (let i = 0; i < glitchCount; i++) {
          const idx = Math.floor(Math.random() * chars.length);
          if (chars[idx] !== " " && chars[idx] !== "·") {
            chars[idx] =
              GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] ??
              chars[idx];
          }
        }
        setDisplay(chars.join(""));
        setTimeout(() => setDisplay(textRef.current), 60 + Math.random() * 80);
      }
    }, intensity === "strong" ? 120 : 200);

    return () => clearInterval(interval);
  }, [text, intensity, progress]);

  return (
    <motion.span
      className={`relative inline-block ${glowClass} ${className}`}
      animate={{
        x: [0, -1.5, 2, -1, 0],
        skewX: [0, 1.5, -2, 0.5, 0],
        opacity: [1, 0.92, 1, 0.88, 1],
      }}
      transition={{
        duration: 0.12,
        repeat: Infinity,
        repeatDelay: intensity === "strong" ? 0.8 : 1.6,
        ease: "linear",
      }}
      aria-hidden={display !== text}
    >
      <span className="relative z-10">{display}</span>
      <span
        className="pointer-events-none absolute inset-0 text-[#ff006e] opacity-0"
        style={{
          transform: "translateX(-2px)",
          animation: "none",
        }}
      >
        {display}
      </span>
    </motion.span>
  );
}

function NameReveal({ progress }: { progress: number }) {
  const targetName = "Muhammad Talal Aqdas";
  const [display, setDisplay] = useState(targetName);
  
  useEffect(() => {
    // Calculate glitch probability based on progress
    // At 0%: high glitch probability, at 100%: no glitching
    const glitchProbability = Math.max(0, 1 - (progress / 90)); // No glitching after 90%
    
    const chars = targetName.split("");
    const newChars = chars.map((char) => {
      if (char === " ") return char; // Keep spaces
      if (Math.random() > glitchProbability) {
        return char; // Keep original character
      } else {
        // Use glitch character
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] ?? char;
      }
    });
    
    setDisplay(newChars.join(""));
  }, [progress]);

  return (
    <motion.p
      className="text-2xl sm:text-3xl md:text-4xl tracking-[0.15em] text-[#00f2ff] uppercase font-bold"
      animate={{
        opacity: [0.85, 1, 0.9, 1],
        scale: [0.98, 1.01, 0.99, 1],
      }}
      transition={{
        duration: 0.15,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
    >
      {display}
    </motion.p>
  );
}

function CircuitPaths() {
  const paths = useMemo(
    () => [
      { d: "M 80 120 H 160 V 200 H 240", stroke: "rgba(0,242,255,0.22)" },
      { d: "M 920 80 H 840 V 160 H 760 V 240", stroke: "rgba(0,242,255,0.18)" },
      { d: "M 120 680 H 200 V 600 H 280", stroke: "rgba(255,107,43,0.2)" },
      { d: "M 880 620 H 800 V 540 H 720 V 460", stroke: "rgba(255,60,60,0.18)" },
      { d: "M 400 100 H 480 V 180 H 560", stroke: "rgba(0,242,255,0.12)" },
      { d: "M 600 700 H 680 V 620 H 760", stroke: "rgba(255,183,0,0.15)" },
      { d: "M 960 400 H 880 V 320 H 800", stroke: "rgba(0,242,255,0.14)" },
      { d: "M 60 400 H 140 V 480 H 220 V 560", stroke: "rgba(255,107,43,0.12)" },
    ],
    [],
  );

  return (
    <svg
      className="loading-screen__circuit pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {paths.map((path, i) => (
        <motion.path
          key={path.d}
          d={path.d}
          stroke={path.stroke}
          strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: 8 + i * 1.2,
            repeat: Infinity,
            delay: i * 0.9,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

function CornerDecorations() {
  const corners = ["tl", "tr", "bl", "br"] as const;

  return (
    <>
      {corners.map((corner) => (
        <motion.div
          key={corner}
          className={`loading-screen__corner loading-screen__corner--${corner}`}
          animate={{ opacity: [0.35, 0.65, 0.4, 0.55] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: corners.indexOf(corner) * 0.4,
          }}
        >
          <span
            className="loading-screen__corner-tick"
            style={{
              width: corner.includes("r") ? 6 : 4,
              height: 1,
              top: corner.includes("t") ? -1 : undefined,
              bottom: corner.includes("b") ? -1 : undefined,
              right: corner.includes("r") ? -8 : undefined,
              left: corner.includes("l") ? -8 : undefined,
            }}
          />
          <span
            className="loading-screen__corner-tick"
            style={{
              width: 1,
              height: corner.includes("b") ? 6 : 4,
              left: corner.includes("l") ? -1 : undefined,
              right: corner.includes("r") ? -1 : undefined,
              top: corner.includes("t") ? -8 : undefined,
              bottom: corner.includes("b") ? -8 : undefined,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[#00f2ff]"
      aria-hidden
    >
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      {muted ? (
        <>
          <line x1="18" y1="8" x2="22" y2="16" />
          <line x1="22" y1="8" x2="18" y2="16" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      )}
    </svg>
  );
}

export default function LoadingScreen({
  children,
  duration = 3800,
  onComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  const { soundEnabled, toggleSound } = useAudio();

  const handleExitComplete = useCallback(() => {
    setDone(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);

      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), 500);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration]);

  const paddedProgress = String(progress).padStart(2, " ");

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {visible && (
          <motion.div
            key="loading-screen"
            className="loading-screen fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050a0e] font-mono text-[#00f2ff]"
            initial={{ opacity: 1 }}
            exit={{
              opacity: [1, 1, 0],
              clipPath: [
                "inset(0% 0% 0% 0%)",
                "inset(0% 0% 0% 0%)",
                "inset(100% 0% 0% 0%)",
              ],
              filter: [
                "brightness(1) contrast(1)",
                "brightness(1.8) contrast(1.4) hue-rotate(10deg)",
                "brightness(0.6) contrast(1.2)",
              ],
              x: [0, -6, 8, -4, 0],
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.35, 1],
              ease: "easeInOut",
            }}
          >
            <div className="loading-screen__scanlines pointer-events-none absolute inset-0 z-30" />
            <div className="loading-screen__grid pointer-events-none absolute inset-0 z-10 opacity-60" />
            <div className="loading-screen__vignette pointer-events-none absolute inset-0 z-20" />
            <CircuitPaths />
            <CornerDecorations />

            <div className="relative z-40 flex flex-col items-center gap-10 px-6">
              <div className="flex flex-col items-center gap-6">
                <img 
                  src="/logo-mta.png" 
                  alt="MTA Logo" 
                  className="loading-screen__logo w-24 h-24 sm:w-32 sm:h-32 object-contain"
                />
                <p className="text-sm tracking-[0.35em] text-[#00f2ff] uppercase sm:text-base">
                  <GlitchText text="[ · LOADING · ]" progress={progress} />
                </p>

                <motion.div
                  className="loading-screen__h-line w-[min(92vw,680px)]"
                  animate={{
                    opacity: [0.5, 1, 0.6, 0.95],
                    scaleX: [0.98, 1.01, 0.99, 1],
                  }}
                  transition={{
                    duration: 0.08,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                  }}
                />

                <p className="text-sm tracking-[0.35em] text-[#ffb700] uppercase sm:text-base">
                  <motion.span
                    className="loading-screen__glow-amber inline-block"
                    key={progress}
                    initial={{ opacity: 0.7, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.05 }}
                  >
                    <GlitchText
                      text={`[ · ${paddedProgress} % · ]`}
                      glowClass="loading-screen__glow-amber"
                      className="text-[#ffb700]"
                      progress={progress}
                    />
                  </motion.span>
                </p>
              </div>

              <NameReveal progress={progress} />

              <motion.button
                type="button"
                className="loading-screen__sound-btn loading-screen__glow-cyan-strong flex items-center gap-4 text-xs tracking-[0.2em] text-[#00f2ff] uppercase sm:text-sm"
                onClick={toggleSound}
                aria-pressed={soundEnabled}
                aria-label={
                  soundEnabled ? "Disable sound" : "Enable sound"
                }
                animate={{
                  x: [0, -3, 4, -2, 0],
                  opacity: [1, 0.85, 1, 0.9, 1],
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                }}
              >
                <SpeakerIcon muted={!soundEnabled} />
                <GlitchText
                  text={
                    soundEnabled
                      ? "[ DISABLE | SOUND ]"
                      : "[ ENABLE | SOUND ]"
                  }
                  glowClass="loading-screen__glow-cyan-strong"
                  intensity="strong"
                  progress={progress}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
