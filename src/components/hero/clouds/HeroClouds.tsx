// src/components/hero/clouds/HeroClouds.tsx

"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";

import useMousePosition from "@/hooks/useMousePosition";

import HeroCloudsSvg from "./svg/hero-clouds.svg";

export default function HeroClouds() {
  const { x, y } = useMousePosition();

  // =========================
  // MANUAL TUNING CONTROLS
  // =========================

  // overall SVG scale
  const CLOUD_SCALE = 0.8;

  // default positioning
  const BASE_X = -15;
  const BASE_Y = 300;

  // cursor movement strength
  const MOVE_STRENGTH_X = 0.1;
  const MOVE_STRENGTH_Y = 0.1;

  // =========================

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;

  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  const moveX = (x - centerX) * MOVE_STRENGTH_X;
  const moveY = (y - centerY) * MOVE_STRENGTH_Y;

  const springX = useSpring(BASE_X + moveX, {
    stiffness: 45,
    damping: 18,
    mass: 1,
  });

  const springY = useSpring(BASE_Y + moveY, {
    stiffness: 45,
    damping: 18,
    mass: 1,
  });

  useEffect(() => {
    springX.set(BASE_X + moveX);
    springY.set(BASE_Y + moveY);
  }, [moveX, moveY, springX, springY]);

  return (
    <div className="pointer-events-none absolute inset-0 isolate overflow-hidden z-50">
      <motion.div
        style={{
          x: springX,
          y: springY,
          scale: CLOUD_SCALE,
        }}
        className="absolute top-1/2 left-1/2 h-[160vh] w-[160vw] -translate-x-1/2 -translate-y-1/2 will-change-transform z-40"
      >
        <HeroCloudsSvg className="h-full w-full text-[#19202F] opacity-100 mix-blend-normal" />
      </motion.div>
    </div>
  );
}
