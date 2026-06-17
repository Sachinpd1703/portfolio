// src/components/about/ui/AboutVideo.tsx
import { Play } from "lucide-react";
import { Capriola } from "next/font/google";
import type { AboutVideoProps } from "../types/about.types";

const capriola = Capriola({
  weight: "400",
  subsets: ["latin"],
});

export default function AboutVideo({
  rootRef,
  frameRef,
  captionRef,
}: AboutVideoProps) {
  return (
    <div
      ref={rootRef}
      className="relative z-30 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-4 pt-28 opacity-0 md:px-8"
    >
      <div
        ref={frameRef}
        className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-[0_30px_100px_rgba(8,47,73,0.38)] backdrop-blur-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(103,232,249,0.28),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.52),rgba(14,116,144,0.22),rgba(30,41,59,0.62))]" />
        <div className="absolute inset-x-6 top-6 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-300" />
          <span className="h-3 w-3 rounded-full bg-amber-200" />
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
          <button
            aria-label="Video intro placeholder"
            className="grid h-20 w-20 place-items-center rounded-full border border-cyan-100/50 bg-cyan-200/20 text-cyan-50 shadow-[0_0_38px_rgba(103,232,249,0.35)] backdrop-blur-xl transition hover:scale-105 hover:bg-cyan-200/30"
            type="button"
          >
            <Play className="ml-1 h-9 w-9 fill-current" />
          </button>
          <p className="mt-6 text-xs font-bold tracking-[0.35em] text-cyan-100 uppercase">
            glass intro
          </p>
          <h2
            className={`mt-4 text-4xl tracking-normal text-white md:text-6xl ${capriola.className}`}
          >
            video mode
          </h2>
        </div>
      </div>
    </div>
  );
}
