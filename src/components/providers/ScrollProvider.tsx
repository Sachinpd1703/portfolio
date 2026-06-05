"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Register the ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2, // Higher numbers = smoother/slower momentum
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom cinematic easing curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // 3. Connect Lenis to GSAP's ticker so they sync perfectly frame-by-frame
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}