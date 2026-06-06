// src/components/about/ui/AboutSplit.tsx
import Image from "next/image";
import { Capriola } from "next/font/google";
import aboutAvatar from "@/assets/about-avatar.png";
import type { AboutSplitProps } from "../types/about.types";

const capriola = Capriola({
  weight: "400",
  subsets: ["latin"],
});

export default function AboutSplit({
  rootRef,
  leftRef,
  avatarRef,
  rightRef,
}: AboutSplitProps) {
  return (
    <div
      ref={rootRef}
      className="relative z-40 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 pt-28 pb-24 opacity-0 md:flex-row md:px-8"
    >
      <div
        ref={leftRef}
        className="order-2 mt-8 w-full text-center md:order-1 md:mt-0 md:w-1/3 md:pr-8 md:text-right"
      >
        <h2
          className={`mb-4 text-5xl tracking-normal text-white md:text-7xl ${capriola.className}`}
        >
          designer <span className="text-cyan-400">.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xs text-center text-sm leading-relaxed text-blue-100 md:mr-0 md:ml-auto md:text-justify md:text-base">
          Web designer with a passion for crafting beautiful, mobile-first, and
          highly interactive user interfaces. I believe web apps should feel
          alive.
        </p>
      </div>

      <div
        ref={avatarRef}
        className="z-10 order-1 flex w-full justify-center md:order-2 md:w-1/3"
      >
        <div className="relative h-[360px] w-[270px] md:h-[500px] md:w-[380px]">
          <Image
            src={aboutAvatar}
            alt="Sachin - Designer and Coder"
            fill
            priority
            sizes="(min-width: 768px) 380px, 270px"
            className="scale-[1.7] object-contain object-bottom drop-shadow-[0_0_30px_rgba(34,211,238,0.18)]"
          />
        </div>
      </div>

      <div
        ref={rightRef}
        className="order-3 mt-8 w-full text-center md:mt-0 md:w-1/3 md:pl-8 md:text-left"
      >
        <h2
          className={`mb-4 text-5xl text-white md:text-7xl ${capriola.className}`}
        >
          {"<coder>"}
        </h2>
        <p className="mx-auto mt-8 max-w-xs text-center text-sm leading-relaxed text-blue-100 md:mr-auto md:ml-0 md:text-justify md:text-base">
          Full-stack developer architecting scalable systems with Next.js,
          TypeScript, and PostgreSQL. Strict type safety and clean architecture.
        </p>
      </div>
    </div>
  );
}
