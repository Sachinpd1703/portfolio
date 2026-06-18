// src/components/hero/Hero.tsx
"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroCharacter from "./HeroCharacter";
import HeroClouds from "./clouds/HeroClouds";
import { HeroLeftContent, HeroRightContent } from "./HeroContent";
import BackgroundClouds from "./clouds/BackgroundClouds";

export default function Hero() {
  return (
    /* THE INVISIBLE SPACER
       This is a normal relative section that takes up exactly 1 screen height.
       'overflow-hidden' and 'max-w-full' ensure no scrollbars are triggered.
    */
    <section 
      id="hero-section" 
      className="relative h-screen w-full max-w-full overflow-hidden z-0"
    >
      
      {/* LAYER 1: BACK FROZEN LAYER
          'fixed inset-0' handles full screen coverage more reliably than h-screen w-full.
      */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <HeroBackground />
        <HeroParticles />
        <BackgroundClouds />
        
        {/* BIG BACKGROUND TYPOGRAPHY */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1.5 }}
            className="text-[24vw] font-black uppercase leading-none tracking-[-0.08em] text-white"
          >
            SACHIN
          </motion.h1>
        </div>

        {/* Character */}
        <div className="relative z-20 flex h-full w-full items-center justify-center overflow-hidden">
          <HeroCharacter />
        </div>

        {/* Left Content (Behind clouds) */}
        <div className="absolute inset-0 z-30 overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-7xl px-6">
            <HeroLeftContent />
          </div>
        </div>
      </div>

      {/* LAYER 2: SCROLLING FOREGROUND CLOUDS */}
      <HeroClouds />

      {/* LAYER 3: FRONT FROZEN LAYER
          'fixed inset-0' ensures right content stays on top of the clouds (z-10).
      */}
      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        <div className="relative h-full w-full overflow-hidden">
          <div className="mx-auto h-full w-full max-w-7xl px-6">
            <HeroRightContent />
          </div>
        </div>
      </div>

    </section>
  );
}
