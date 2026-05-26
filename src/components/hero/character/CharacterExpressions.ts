import type { Expression } from "./types";

export type CharacterExpressionConfig = {
  mouth: "neutral" | "smile" | "angry";
  eyeOpenness: "open" | "mid";
  headTilt: number;
  eyebrow: {
    left: { x: number; y: number; rotate: number };
    right: { x: number; y: number; rotate: number };
  };
};

export const characterExpressions: Record<Expression, CharacterExpressionConfig> =
  {
    idle: {
      mouth: "neutral",
      eyeOpenness: "open",
      headTilt: 0,
      eyebrow: {
        left: { x: 0, y: 0, rotate: 0 },
        right: { x: 0, y: 0, rotate: 0 },
      },
    },
    happy: {
      mouth: "smile",
      eyeOpenness: "open",
      headTilt: -0.8,
      eyebrow: {
        left: { x: 0, y: -5, rotate: -2 },
        right: { x: 0, y: -5, rotate: 2 },
      },
    },
    focused: {
      mouth: "neutral",
      eyeOpenness: "open",
      headTilt: 0.7,
      eyebrow: {
        left: { x: 1, y: 4, rotate: 4 },
        right: { x: -1, y: 4, rotate: -4 },
      },
    },
    angry: {
      mouth: "angry",
      eyeOpenness: "mid",
      headTilt: 1,
      eyebrow: {
        left: { x: 5, y: 7, rotate: 8 },
        right: { x: -5, y: 7, rotate: -8 },
      },
    },
  };
