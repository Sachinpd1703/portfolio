import { Capriola } from "next/font/google";
import type { AboutResumeProps } from "../types/about.types";

const capriola = Capriola({
  weight: "400",
  subsets: ["latin"],
});

const skills = ["Next.js", "TypeScript", "GSAP", "Tailwind", "PostgreSQL"];

export default function AboutResume({
  rootRef,
  panelRef,
  detailsRef,
}: AboutResumeProps) {
  return (
    <div
      ref={rootRef}
      className="relative z-40 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 pt-28 pb-24 opacity-0 md:px-8"
    >
      <div
        ref={panelRef}
        className="w-full overflow-hidden rounded-[2rem] border border-cyan-200/25 bg-white/10 shadow-[0_30px_100px_rgba(8,47,73,0.35)] backdrop-blur-2xl"
      >
        <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/15 bg-slate-950/35 p-6 md:border-r md:border-b-0 md:p-10">
            <p className="text-xs font-bold tracking-[0.35em] text-cyan-200 uppercase">
              tech specs
            </p>
            <h2
              className={`mt-5 text-4xl tracking-normal text-white md:text-6xl ${capriola.className}`}
            >
              resume mode
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-blue-100 md:text-base">
              A practical snapshot of the stack, systems, and creative front-end
              instincts I bring into production work.
            </p>
          </div>

          <div ref={detailsRef} className="p-6 md:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm text-cyan-100">Focus</p>
                <p className="mt-3 text-2xl font-bold text-white">
                  Interactive UI
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                <p className="text-sm text-cyan-100">Architecture</p>
                <p className="mt-3 text-2xl font-bold text-white">
                  Typed systems
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-sm font-semibold text-cyan-50"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 text-sm leading-7 text-blue-100 md:grid-cols-2">
              <p>
                Builds playful interfaces with serious fundamentals:
                accessibility, performance, responsive layout, and clean
                component boundaries.
              </p>
              <p>
                Enjoys animation systems, product polish, and developer
                workflows that keep ambitious ideas maintainable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
