// src/components/about/AboutFloatingMenu.tsx
"use client";

import Image from "next/image";
import { CircleUserRound, FileText, PlayCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import aboutMiniAvatar from "@/assets/about-mini-avtar.jpeg";
import type {
  AboutFloatingMenuProps,
  AboutPersonality,
} from "./types/about.types";

const menuItems: Array<{
  id: AboutPersonality;
  label: string;
  Icon: typeof CircleUserRound;
}> = [
  { id: "split", label: "Who I Am", Icon: CircleUserRound },
  { id: "resume", label: "Resume", Icon: FileText },
  { id: "video", label: "Video Intro", Icon: PlayCircle },
];

export default function AboutFloatingMenu({
  activePersonality,
  isVisible,
  setActivePersonality,
}: AboutFloatingMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const isMenuExpanded = isVisible && isExpanded;

  // Prevent multiple delayed-close timers from stacking while the pointer moves.
  const clearCloseTimer = () => {
    if (closeTimerRef.current === null) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const openMenu = () => {
    clearCloseTimer();
    setIsExpanded(true);
  };

  const closeMenuAfterDelay = () => {
    clearCloseTimer();
    // The small delay makes hover exits feel forgiving instead of twitchy.
    closeTimerRef.current = window.setTimeout(() => {
      setIsExpanded(false);
      closeTimerRef.current = null;
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className={[
        "fixed bottom-8 left-8 z-50 flex h-14 items-center overflow-hidden border border-cyan-300/40 bg-slate-950/70 text-white shadow-[0_0_34px_rgba(34,211,238,0.45)] backdrop-blur-xl transition-all duration-500 ease-out",
        isVisible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-95 opacity-0",
        isMenuExpanded
          ? "w-[min(88vw,28rem)] rounded-full px-2"
          : "w-14 rounded-full px-0",
      ].join(" ")}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMenuAfterDelay();
        }
      }}
      onFocus={openMenu}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenuAfterDelay}
    >
      <button
        aria-label="Toggle about menu"
        aria-expanded={isMenuExpanded}
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
        type="button"
        onClick={() => {
          clearCloseTimer();
          setIsExpanded((value) => !value);
        }}
      >
        <span className="relative block h-11 w-11 overflow-hidden rounded-full border border-cyan-100/50 shadow-[0_0_22px_rgba(103,232,249,0.5)]">
          <Image
            src={aboutMiniAvatar}
            alt="About menu avatar"
            fill
            sizes="44px"
            className="animate-spin object-cover [animation-duration:6s]"
          />
        </span>
      </button>

      <div
        className={[
          "flex min-w-0 flex-1 items-center gap-1 transition-opacity duration-200",
          isMenuExpanded ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        {menuItems.map(({ id, label, Icon }) => {
          const isActive = activePersonality === id;

          return (
            <button
              key={id}
              className={[
                "flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold transition sm:text-sm",
                isActive
                  ? "bg-[#6175cf] text-slate-950 shadow-[0_0_18px_rgba(103,232,249,0.45)]"
                  : "text-cyan-100 hover:bg-white/10 hover:text-white",
              ].join(" ")}
              type="button"
              onClick={() => setActivePersonality(id)}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
