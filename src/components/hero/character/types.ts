import type { MotionValue } from "framer-motion";

export type Expression = "idle" | "happy" | "focused" | "angry";

export type EyeSide = "left" | "right";

export type BlinkFrame = "open" | "mid" | "closed";

export type EyeTrackingMotion = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  isTracking: boolean;
};

export type BlinkState = Record<EyeSide, BlinkFrame>;

export type CharacterSvgGroupId =
  | "character"
  | "hoodie"
  | "hoodie-string-left"
  | "hoodie-string-right"
  | "hair"
  | "pupil-left"
  | "pupil-right"
  | "eye-left"
  | "eye-right"
  | "eye-close-mid-left"
  | "eye-close-mid-right"
  | "eye-close-full-left"
  | "eye-close-full-right"
  | "eye-highlight-left"
  | "eye-highlight-right"
  | "eyebrow-left"
  | "eyebrow-right"
  | "mouth-neutral"
  | "mouth-smile"
  | "mouth-angry";
