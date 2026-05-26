"use client";

import { motion } from "framer-motion";
import useMousePosition from "@/hooks/useMousePosition";

export default function HeroContent() {
  const { x, y } = useMousePosition();

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-between overflow-hidden px-6">
      {/* GRADIENT GLOW */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(
            600px at ${x}px ${y}px,
            rgba(255,255,255,0.12),
            transparent 80%
          )`,
        }}
      />

      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 max-w-xl"
      >

        {/* GREETING */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-lg tracking-wide text-white/60"
        >
          Hey, I&apos;m
        </motion.p>

        {/* MAIN NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl font-black leading-none tracking-tight text-white md:text-7xl"
        >
          Sachin
        </motion.h1>

        {/* ROLE */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-3 text-2xl font-medium text-white/80 md:text-3xl"
        >
          Creative Frontend Developer
        </motion.h2>

      </motion.div>

      {/* BIG TYPOGRAPHY */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          className="text-[22vw] font-black uppercase leading-none tracking-[-0.08em] text-white"
        >
          SACHIN
        </motion.h1>
      </div>

      {/* FLOATING BLUR ORBS */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-20 top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl"
      />
    </div>
  );
}