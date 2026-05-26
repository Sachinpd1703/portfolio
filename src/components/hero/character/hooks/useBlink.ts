"use client";

import { useEffect, useRef, useState } from "react";
import type { BlinkFrame, BlinkState, EyeSide } from "../types";

const BLINK_MIN_DELAY = 3500;
const BLINK_MAX_DELAY = 7000;
const FRAME_MIN_DELAY = 42;
const FRAME_MAX_DELAY = 72;
const sides: EyeSide[] = ["left", "right"];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function useBlink(): BlinkState {
  const [blinkState, setBlinkState] = useState<BlinkState>({
    left: "open",
    right: "open",
  });
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timers = timersRef.current;

    const setEyeFrame = (side: EyeSide, frame: BlinkFrame) => {
      setBlinkState((current) => {
        if (current[side] === frame) return current;
        return { ...current, [side]: frame };
      });
    };

    const scheduleBlink = (side: EyeSide) => {
      const delay = randomBetween(BLINK_MIN_DELAY, BLINK_MAX_DELAY);

      const timer = window.setTimeout(() => {
        const frameDelay = randomBetween(FRAME_MIN_DELAY, FRAME_MAX_DELAY);

        setEyeFrame(side, "mid");
        timers.push(
          window.setTimeout(() => setEyeFrame(side, "closed"), frameDelay),
          window.setTimeout(() => setEyeFrame(side, "mid"), frameDelay * 2),
          window.setTimeout(() => {
            setEyeFrame(side, "open");
            scheduleBlink(side);
          }, frameDelay * 3),
        );
      }, delay + (side === "right" ? randomBetween(0, 90) : 0));

      timers.push(timer);
    };

    sides.forEach(scheduleBlink);

    return () => {
      timers.forEach(window.clearTimeout);
      timersRef.current = [];
    };
  }, []);

  return blinkState;
}
