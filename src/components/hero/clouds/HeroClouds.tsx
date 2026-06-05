// src/components/hero/clouds/HeroClouds.tsx

"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import useMousePosition from "@/hooks/useMousePosition";

import HeroCloudsSvg from "./svg/hero-clouds.svg";

type HeroCloudsProps = {
  baseY?: number;
};

export default function HeroClouds({ baseY }: HeroCloudsProps) {
  const { x, y } = useMousePosition();
  // Start with deterministic values to avoid SSR/client hydration mismatches
  const [center, setCenter] = useState({ x: 0, y: 0 });

  // =========================
  // MANUAL TUNING CONTROLS
  // =========================

  // overall SVG scale
  const CLOUD_SCALE = 0.8;

  // default positioning
  const BASE_X = -15;
  const BASE_Y = baseY ?? 300;

  // cursor movement strength
  const MOVE_STRENGTH_X = 0.1;
  const MOVE_STRENGTH_Y = 0.1;

  // =========================

  // On client mount, measure the viewport center once
  useEffect(() => {
    if (typeof window === "undefined") return;
    setCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }, []);

  const moveX = (x - center.x) * MOVE_STRENGTH_X;
  const moveY = (y - center.y) * MOVE_STRENGTH_Y;

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
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-40">
      <motion.div
        style={{
          x: springX,
          y: springY,
          scale: CLOUD_SCALE,
        }}
        className="absolute top-1/2 left-1/2 h-[160vh] w-[160vw] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <HeroCloudsSvg className="h-full w-full text-[#19202F] opacity-100 mix-blend-normal" />
      </motion.div>
    </div>
  );
}
