// src/components/hero/character/hooks/useBlink.ts
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

  const setBothEyes = (frame: BlinkFrame) => {
    setBlinkState((current) => {
      if (
        current.left === frame &&
        current.right === frame
      ) { 
        return current;
      }

      return {
        left: frame,
        right: frame,
      };
    });
  };

  const scheduleBlink = () => {
    const delay = randomBetween(
      BLINK_MIN_DELAY,
      BLINK_MAX_DELAY,
    );

    const timer = window.setTimeout(() => {
      const frameDelay = randomBetween(
        FRAME_MIN_DELAY,
        FRAME_MAX_DELAY,
      );

      setBothEyes("mid");

      timers.push(
        window.setTimeout(
          () => setBothEyes("closed"),
          frameDelay,
        ),

        window.setTimeout(
          () => setBothEyes("mid"),
          frameDelay * 2,
        ),

        window.setTimeout(() => {
          setBothEyes("open");
          scheduleBlink();
        }, frameDelay * 3),
      );
    }, delay);

    timers.push(timer);
  };

  scheduleBlink();

  return () => {
    timers.forEach(window.clearTimeout);
    timersRef.current = [];
  };
}, []);

  return blinkState;
}
