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
  // Eye open states (contain pupil, sclera, reflections)
  | "eye-open-left"
  | "eye-open-right"
  // Eye mid-close overlay layers
  | "eye-mid-left"
  | "eye-mid-right"
  // Eye fully-closed overlay layers
  | "eye-closed-left"
  | "eye-closed-right"
  // Individual sub-elements (eye tracking + blink opacity)
  | "eye-highlight-left"
  | "eye-highlight-right"
  // Specular reflection groups (move with pupil)
  | "eye-reflection-left"
  | "eye-reflection-right"
  | "eyebrow-left"
  | "eyebrow-right"
  | "spectacles"
  | "mouth-neutral"
  | "mouth-smile"
  | "mouth-angry";
