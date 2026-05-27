// src/components/hero/character/hooks/useBlink.ts
"use client";

import { useEffect, useRef, useState } from "react";
import type { BlinkFrame, BlinkState, EyeSide } from "../types";

// ─── Manual timing adjustment ─────────────────────────────────────────────────
// Edit these values to tune the blink feel.
//
//  minDelayMs   — shortest time between blinks  (ms)
//  maxDelayMs   — longest  time between blinks  (ms)
//  minCloseMs   — shortest eye-closed hold time (ms)
//  maxCloseMs   — longest  eye-closed hold time (ms)
//
// Typical human blink: ~100–400ms closed, every 3–8 seconds.
// ─────────────────────────────────────────────────────────────────────────────
export const BLINK_CONFIG = {
  minDelayMs:  3500,   // ← lower = blinks more often
  maxDelayMs:  7000,   // ← raise = longer gaps between blinks
  minCloseMs:    60,   // ← lower = faster blink snap
  maxCloseMs:   250,   // ← raise = longer eye-closed hold
} as const;

export type BlinkConfig = Partial<typeof BLINK_CONFIG>;

// ─────────────────────────────────────────────────────────────────────────────

const sides: EyeSide[] = ["left", "right"];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function useBlink(overrides?: BlinkConfig): BlinkState {
  const cfg = { ...BLINK_CONFIG, ...overrides };

  const [blinkState, setBlinkState] = useState<BlinkState>({
    left: "open",
    right: "open",
  });
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timers = timersRef.current;

    const setBothEyes = (frame: BlinkFrame) => {
      setBlinkState((current) => {
        if (current.left === frame && current.right === frame) {
          return current;
        }
        return { left: frame, right: frame };
      });
    };

    const scheduleBlink = () => {
      const delay = randomBetween(cfg.minDelayMs, cfg.maxDelayMs);

      const timer = window.setTimeout(() => {
        const closeMs = randomBetween(cfg.minCloseMs, cfg.maxCloseMs);

        // Blink: open → closed → open
        // Mid frame is intentionally skipped to avoid opacity-transition gaps.
        setBothEyes("closed");

        timers.push(
          window.setTimeout(() => {
            setBothEyes("open");
            scheduleBlink();
          }, closeMs),
        );
      }, delay);

      timers.push(timer);
    };

    scheduleBlink();

    return () => {
      timers.forEach(window.clearTimeout);
      timersRef.current = [];
    };
  // Re-run only if numeric config values actually change.
  }, [cfg.minDelayMs, cfg.maxDelayMs, cfg.minCloseMs, cfg.maxCloseMs]);

  return blinkState;
}
