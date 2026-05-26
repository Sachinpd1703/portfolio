"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { eyeSpring } from "../config/motion";
import type { EyeTrackingMotion } from "../types";

const MAX_X = 6;
const MAX_Y = 4;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isCoarsePointer() {
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

export function useEyeTracking(
  containerRef: RefObject<HTMLElement | null>,
): EyeTrackingMotion {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, eyeSpring);
  const y = useSpring(rawY, eyeSpring);

  useEffect(() => {
    if (isCoarsePointer()) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let frame = 0;
    let isTracking = false;

    const updateFromPointer = (event: PointerEvent) => {
      if (!containerRef.current || event.pointerType === "touch") return;

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height * 0.38;
        const dx = ((event.clientX - centerX) / rect.width) * 48;
        const dy = ((event.clientY - centerY) / rect.height) * 42;

        rawX.set(clamp(dx, -MAX_X, MAX_X));
        rawY.set(clamp(dy, -MAX_Y, MAX_Y));
        isTracking = true;
      });
    };

    const centerPupils = () => {
      if (!isTracking) return;
      rawX.set(0);
      rawY.set(0);
      isTracking = false;
    };

    window.addEventListener("pointermove", updateFromPointer);
    window.addEventListener("pointerleave", centerPupils);
    window.addEventListener("blur", centerPupils);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updateFromPointer);
      window.removeEventListener("pointerleave", centerPupils);
      window.removeEventListener("blur", centerPupils);
    };
  }, [containerRef, rawX, rawY]);

  return {
    x,
    y,
    isTracking: true,
  };
}
