// src/components/hero/clouds/HeroClouds.tsx

"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";

// import { useMousePosition } from "@/hooks/useMousePosition";
import useMousePosition from "@/hooks/useMousePosition";

// IMPORTANT:
// Configure SVGR import if not already configured.
import HeroCloudsSvg from "./svg/hero-clouds.svg";

export default function HeroClouds() {
  const { x, y } = useMousePosition();

  // viewport center
  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;

  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  // subtle cinematic movement
  const moveX = (x - centerX) * 0.015;
  const moveY = (y - centerY) * 0.015;

  // smooth spring motion
  const springX = useSpring(moveX, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  const springY = useSpring(moveY, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    springX.set(moveX);
    springY.set(moveY);
  }, [moveX, moveY, springX, springY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 w-[140vw] max-w-none -translate-x-1/2 -translate-y-1/2">
        <HeroCloudsSvg className="h-full w-full text-[#19202F] opacity-100 mix-blend-normal" />
      </div>
    </motion.div>
  );
}
