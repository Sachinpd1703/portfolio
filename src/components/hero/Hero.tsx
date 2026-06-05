// src/components/hero/Hero.tsx
"use client";

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
    <section className="relative w-full h-screen z-0">
      
      {/* THE FROZEN LAYER
          'fixed inset-0' pins this entire block exactly to the user's monitor.
          '-z-10' ensures it stays safely behind the scrolling clouds and the About section.
      */}
      <div className="fixed inset-0 w-full h-screen -z-10 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute left-1/2 top-1/2 z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

        <HeroBackground />

        <HeroParticles />

        <BackgroundClouds />
        
        <div className="relative z-20 flex h-full flex-col items-center justify-center">
          <HeroContent />
          <HeroCharacter />
        </div>

      </div>


      <HeroClouds />

    </section>
  );
}