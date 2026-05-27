// src/components/hero/character/hooks/useEyeTracking.ts
"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { eyeSpring } from "../config/motion";
import type { EyeTrackingMotion } from "../types";

const MAX_PUPIL_X = 3.5;
const MAX_PUPIL_Y = 2.5;
const CENTER_DEAD_ZONE = 18;
const IDLE_DRIFT_RANGE = 0.8;
const IDLE_DRIFT_INTERVAL = 3200;
const IDLE_THRESHOLD = 1800;
const CENTER_DELAY = 120;
const MOVEMENT_FACTOR_X = 0.012;
const MOVEMENT_FACTOR_Y = 0.01;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isCoarsePointer() {
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

function randomDrift() {
  return (Math.random() * 2 - 1) * IDLE_DRIFT_RANGE;
}

export function useEyeTracking(
  containerRef: RefObject<HTMLElement | null>,
): EyeTrackingMotion {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, eyeSpring);
  const y = useSpring(rawY, eyeSpring);

  const targetX = useRef(0);
  const targetY = useRef(0);
  const driftX = useRef(0);
  const driftY = useRef(0);
  const lastPointerAt = useRef(0);
  const isPointerActive = useRef(false);
  const centerTimeout = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  const applyMotionValues = useCallback(() => {
    rawX.set(clamp(targetX.current + driftX.current, -MAX_PUPIL_X, MAX_PUPIL_X));
    rawY.set(clamp(targetY.current + driftY.current, -MAX_PUPIL_Y, MAX_PUPIL_Y));
  }, [rawX, rawY]);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || isCoarsePointer()) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const clearCenterTimeout = () => {
      if (centerTimeout.current !== null) {
        window.clearTimeout(centerTimeout.current);
        centerTimeout.current = null;
      }
    };

    const setCenterAfterDelay = () => {
      clearCenterTimeout();
      centerTimeout.current = window.setTimeout(() => {
        isPointerActive.current = false;
        targetX.current = 0;
        targetY.current = 0;
        driftX.current = 0;
        driftY.current = 0;
        applyMotionValues();
        centerTimeout.current = null;
      }, CENTER_DELAY);
    };

    const scheduleIdleDrift = () => {
      if (idleTimer.current !== null) return;
      idleTimer.current = window.setInterval(() => {
        const now = performance.now();
        const isIdle = now - lastPointerAt.current > IDLE_THRESHOLD;
        if (!isIdle || !isPointerActive.current) return;

        driftX.current = randomDrift();
        driftY.current = randomDrift() * 0.65;
        applyMotionValues();
      }, IDLE_DRIFT_INTERVAL);
    };

    const updateFromPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      lastPointerAt.current = performance.now();
      isPointerActive.current = true;
      driftX.current = 0;
      driftY.current = 0;
      clearCenterTimeout();

      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }

      rafId.current = window.requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;

        // Apply dead zone
        const deadDx = Math.abs(dx) <= CENTER_DEAD_ZONE ? 0 : dx - Math.sign(dx) * CENTER_DEAD_ZONE;
        const deadDy = Math.abs(dy) <= CENTER_DEAD_ZONE ? 0 : dy - Math.sign(dy) * CENTER_DEAD_ZONE;

        // Calculate movement with clamping
        targetX.current = clamp(deadDx * MOVEMENT_FACTOR_X, -MAX_PUPIL_X, MAX_PUPIL_X);
        targetY.current = clamp(deadDy * MOVEMENT_FACTOR_Y, -MAX_PUPIL_Y, MAX_PUPIL_Y);
        applyMotionValues();
      });
    };

    const handlePointerLeave = () => setCenterAfterDelay();
    const handleWindowBlur = () => setCenterAfterDelay();

    window.addEventListener("pointermove", updateFromPointer);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handleWindowBlur);

    scheduleIdleDrift();

    return () => {
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
      clearCenterTimeout();
      if (idleTimer.current !== null) {
        window.clearInterval(idleTimer.current);
        idleTimer.current = null;
      }
      window.removeEventListener("pointermove", updateFromPointer);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [containerRef, rawX, rawY, applyMotionValues]);

  return {
    x,
    y,
    isTracking: true,
  };
}
