"use client";

import HeroClouds from "@/components/hero/clouds/HeroClouds";
// Import the new background component (adjust path if needed)
import BackgroundAbout from "./BackgroundAbout"; 

export default function About() {
  return (

    <section className="noise z-20 bg-blue-950 relative flex h-[120vh] items-center justify-center">
      
      {/* 1. MOVING BACKGROUND CLOUDS */}
      <BackgroundAbout />

      {/* 2. Color strip to match cloud - adjust h-[XXpx] for height */}
      {/* Added pointer-events-none so it doesn't accidentally block clicks */}
      <div className="absolute top-0 left-0 right-0 w-full h-12.5 bg-[#19202F] z-30 pointer-events-none" />
      
      {/* 3. FOREGROUND CLOUDS */}
      {/* Ensure HeroClouds has a high enough z-index internally to sit in front of the background clouds */}
      <HeroClouds baseY={-480} />
      
      {/* <div className="absolute left-1/2 top-1/2 z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" /> */}
      
      {/* Changed to relative z-40 so it stays above all the absolute positioned elements */}
      <h1 className="relative z-40 text-white text-8xl">About</h1>
      
    </section>
  );
}