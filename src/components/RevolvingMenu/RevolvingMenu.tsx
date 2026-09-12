"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import "./revolving-menu.css";

const CarouselCanvas = dynamic(() => import("./CarouselCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#050a0e] font-mono text-xs tracking-[0.3em] text-[#00f2ff]/60 uppercase">
      [ · Initializing · ]
    </div>
  ),
});

export interface RevolvingMenuProps {
  onCardSelect?: (label: string) => void;
}

export default function RevolvingMenu({ onCardSelect }: RevolvingMenuProps) {
  const router = useRouter();

  const handleCardSelect = useCallback(
    (label: string) => {
      const routes: Record<string, string> = {
        "About Me": "/about",
        "My Projects": "/projects",
        "My Experience": "/experience",
        "My Snapshots": "/snapshots",
        "Contact Me": "/contact",
      };
      const route = routes[label];
      if (route) router.push(route);
      onCardSelect?.(label);
    }, [onCardSelect, router],
  );

  return (
    <section
      className="revolving-menu relative h-screen w-full overflow-hidden bg-[#050a0e]"
      aria-label="Main navigation menu"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(107,43,255,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_80%_20%,rgba(0,242,255,0.08)_0%,transparent_40%)]" />

      <CarouselCanvas onCardSelect={handleCardSelect} />

      <div className="revolving-menu__scanlines pointer-events-none absolute inset-0 z-10" />
      <div className="revolving-menu__vignette pointer-events-none absolute inset-0 z-10" />

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-6">
        <div className="revolving-menu__guide mx-auto h-px w-full max-w-5xl" />
      </div>

      <div className="pointer-events-none absolute left-6 top-7 z-20 font-mono uppercase sm:left-10 sm:top-9">
        <p className="text-[9px] tracking-[0.38em] text-[#00f2ff]/70 sm:text-[10px]">
          [ portfolio / navigation ]
        </p>
        <h1 className="mt-3 text-xs tracking-[0.24em] text-white/80 sm:text-sm">
          Select a channel
        </h1>
      </div>

      <div className="pointer-events-none absolute right-6 top-7 z-20 hidden text-right font-mono uppercase sm:right-10 sm:top-9 sm:block">
        <p className="text-[9px] tracking-[0.24em] text-white/35">system online</p>
        <span className="revolving-menu__status-dot mt-2 inline-block" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center">
        <p className="font-mono text-[10px] tracking-[0.35em] text-white/30 uppercase sm:text-xs">
          [ · Drag or scroll to rotate · ]
        </p>
      </div>
    </section>
  );
}
