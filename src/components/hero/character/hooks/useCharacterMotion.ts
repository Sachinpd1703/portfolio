"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import {
  characterMotionConfig,
  reducedCharacterMotion,
} from "../config/motion";

export function useCharacterMotion() {
  const prefersReducedMotion = useReducedMotion();

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        stage: reducedCharacterMotion,
        head: reducedCharacterMotion,
        hoodie: reducedCharacterMotion,
        stringLeft: reducedCharacterMotion,
        stringRight: reducedCharacterMotion,
        hair: reducedCharacterMotion,
      };
    }

    return characterMotionConfig;
  }, [prefersReducedMotion]);
}
