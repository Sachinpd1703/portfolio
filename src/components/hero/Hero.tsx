"use client";

import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroCharacter from "./HeroCharacter";
// import HeroClouds from "./HeroClouds";
import HeroClouds from "./clouds/HeroClouds";
import HeroContent from "./HeroContent";
import Navbar from "../navbar/navbar";
import BackgroundClouds from "./clouds/BackgroundClouds";

export default function Hero() {
  return (
    <section className="noise z-20 relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute left-1/2 top-1/2 z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

      <HeroBackground />

      <HeroParticles />

      <BackgroundClouds />

      <HeroContent />

      <HeroCharacter />

      <HeroClouds />

      <Navbar />

    </section>
  );
}