// src/components/hero/Hero.tsx
"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroCharacter from "./HeroCharacter";
import HeroClouds from "./clouds/HeroClouds";
import HeroContent from "./HeroContent";
import BackgroundClouds from "./clouds/BackgroundClouds";

export default function Hero() {
  return (
    /* THE INVISIBLE SPACER
       This is a normal relative section that takes up exactly 1 screen height (h-screen). 
       Because it is relative and NOT sticky, it will scroll up naturally.
    */
    <section id="hero-section" className="relative w-full h-screen z-0">
      
      {/* LAYER 1: BACK FROZEN LAYER
          '-z-10' pins this entire block exactly to the user's monitor.
      */}
      <div className="fixed inset-0 w-full h-screen -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <HeroBackground />
        <HeroParticles />
        <BackgroundClouds />
        
        {/* BIG BACKGROUND TYPOGRAPHY - Now behind the character */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-10
            -translate-x-1/2
            -translate-y-1/2
            select-none
          "
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1.5 }}
            className="
              text-[24vw]
              font-black
              uppercase
              leading-none
              tracking-[-0.08em]
              text-white
            "
          >
            SACHIN
          </motion.h1>
        </div>

        {/* Character stays in the back, behind the foreground clouds */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center">
          <HeroCharacter />
        </div>
      </div>

      {/* LAYER 2: SCROLLING FOREGROUND CLOUDS
          Currently set to z-10 in HeroClouds.tsx
      */}
      <HeroClouds />

      {/* LAYER 3: FRONT FROZEN LAYER
          'fixed z-20' ensures text stays on top of the clouds (z-10)
      */}
      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        <div className="relative h-full w-full">
          <div className="pointer-events-auto h-full w-full">
            <HeroContent />
          </div>
        </div>
      </div>

    </section>
  );
}
