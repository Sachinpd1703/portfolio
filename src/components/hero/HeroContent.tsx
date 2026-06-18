// src/components/hero/HeroContent.tsx

"use client";

import { motion } from "framer-motion";

export function HeroLeftContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="
        absolute
        left-[10%]
        top-1/4
        z-50
        -translate-y-1/2
      "
    >
      <p className="text-3xl font-light leading-tight text-white md:text-4xl">
        Hey,
      </p>
      <h2 className="text-4xl font-light leading-tight text-white md:text-6xl">
        I&apos;M Sachin
      </h2>
    </motion.div>
  );
}

export function HeroRightContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 1,
        ease: "easeOut",
      }}
      className="
        absolute
        bottom-[15%]
        right-[10%]
        z-60
        text-right
      "
    >
      <p className="text-2xl font-light leading-snug text-white md:text-4xl">
        Software Developer
        <br />
        and Full stack developer
      </p>
    </motion.div>
  );
}

export default function HeroContent() {
  return (
    <div
      className="
        relative
        mx-auto
        flex
        h-full
        w-full
        max-w-7xl
        items-center
        justify-center
        overflow-hidden
        px-6
      "
    >
      <HeroLeftContent />
      <HeroRightContent />
    </div>
  );
}
