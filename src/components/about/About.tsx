// src/components/about/about.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroClouds from "@/components/hero/clouds/HeroClouds";
import BackgroundAbout from "./BackgroundAbout";

let _isScrollTriggerRegistered = false;

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register the plugin on the client and set up the scroll snapping configuration
    if (typeof window === "undefined") return;

    if (gsap && ScrollTrigger && !_isScrollTriggerRegistered) {
      try {
        gsap.registerPlugin(ScrollTrigger);
        _isScrollTriggerRegistered = true;
      } catch (e) {
        console.warn("gsap.registerPlugin failed", e);
      }
    }

    if (!sectionRef.current || typeof ScrollTrigger?.create !== "function") return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 30%", // Triggers when the top of About section reaches 30% from the bottom of viewport
      end: "top top",
      snap: {
        snapTo: 1, // Snaps 100% of the remaining distance directly to the top edge
        duration: { min: 0.5, max: 1.2 }, // Controls animation speed scale
        delay: 0.1, // Waits 0.1 seconds after the user stops scrolling before snapping
        ease: "power2.out", // Smooth cinematic ease-out curve
      },
    });

    return () => {
      if (trigger && typeof trigger.kill === "function") {
        trigger.kill(); // Essential cleanup to prevent memory leaks when navigating away
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="noise z-20 bg-blue-950 relative flex h-[120vh] items-center justify-center"
    >
      <BackgroundAbout />
      <div className="absolute top-0 left-0 right-0 w-full h-12.5 bg-[#19202F] z-30 pointer-events-none" />
      <HeroClouds baseY={-480} />
      <h1 className="relative z-40 text-white text-8xl">About</h1>
    </section>
  );
}