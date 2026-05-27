// src/components/hero/clouds/BackgroundClouds.tsx

"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import useMousePosition from "@/hooks/useMousePosition";

import BackCloudsSvg from "./svg/back-clouds.svg";

export default function BackgroundClouds() {
  const { x, y } = useMousePosition();

  // =========================================
  // MANUAL TUNING CONTROLS
  // =========================================

  // overall background cloud scale
  const CLOUD_SCALE = 0.8;

  // default positioning
  const BASE_X = -50;
  const BASE_Y = 50;

  // subtle distant movement
  const MOVE_STRENGTH_X = 0.06;
  const MOVE_STRENGTH_Y = 0.06;

  // background cloud transparency
  const CLOUD_OPACITY = 0.5;

  // =========================================

  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCenter({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }, []);

  const moveX = (x - center.x) * MOVE_STRENGTH_X;
  const moveY = (y - center.y) * MOVE_STRENGTH_Y;

  const springX = useSpring(BASE_X + moveX, {
    stiffness: 35,
    damping: 20,
    mass: 1,
  });

  const springY = useSpring(BASE_Y + moveY, {
    stiffness: 35,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    springX.set(BASE_X + moveX);
    springY.set(BASE_Y + moveY);
  }, [moveX, moveY, springX, springY]);

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
        z-[5]
      "
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          scale: CLOUD_SCALE,
          opacity: CLOUD_OPACITY,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[160vh]
          w-[160vw]
          -translate-x-1/2
          -translate-y-1/2
          will-change-transform
        "
      >
        <BackCloudsSvg
          className="
            h-full
            w-full
            mix-blend-normal
          "
        />
      </motion.div>
    </div>
  );
}