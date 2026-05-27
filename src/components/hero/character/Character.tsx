"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import CharacterSvg from "./CharacterSvg";
import { useBlink } from "./hooks/useBlink";
import { useCharacterMotion } from "./hooks/useCharacterMotion";
import { useEyeTracking } from "./hooks/useEyeTracking";
import type { Expression } from "./types";

type CharacterProps = {
  expression?: Expression;
  className?: string;
  left?: string;
  top?: string;
  width?: string;
  minWidth?: string;
  translateX?: string;
  translateY?: string;
  scale?: number;
};

function resolveHoverExpression(event: React.PointerEvent<HTMLDivElement>) {
  if (event.pointerType === "touch") return null;

  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  const isFaceHover = x > 0.28 && x < 0.72 && y > 0.18 && y < 0.62;

  return isFaceHover ? "angry" : "focused";
}

export default function Character({
  expression = "idle",
  className = "",
  left = "50%",
  top = "60%",
  width = "min(52vw,210px)",
  minWidth = "160px",
  translateX = "-50%",
  translateY = "-50%",
  scale = 2,
}: CharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverExpression, setHoverExpression] = useState<Expression | null>(
    null,
  );
  const motionConfig = useCharacterMotion();
  const pupils = useEyeTracking(containerRef);
  const blink = useBlink();
  const activeExpression = hoverExpression ?? expression;

  const stageStyle = useMemo(
    () => ({
      aspectRatio: "720 / 1070",
    }),
    [],
  );

  const containerStyle: React.CSSProperties = {
    ...stageStyle,
    left,
    top,
    width,
    minWidth,
    transform: `translate(${translateX}, ${translateY}) scale(${scale})`,
    transformOrigin: "center",
  };

  return (
    <div
      ref={containerRef}
      className={`absolute z-20 select-none ${className}`}
      onPointerEnter={(event) =>
        setHoverExpression(resolveHoverExpression(event) ?? "focused")
      }
      onPointerMove={(event) =>
        setHoverExpression(resolveHoverExpression(event) ?? "focused")
      }
      onPointerLeave={() => setHoverExpression(null)}
      style={containerStyle}
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full"
        animate={motionConfig.stage.animate}
        transition={motionConfig.stage.transition}
        style={{ transformOrigin: "50% 48%" }}
      >
        <CharacterSvg
          expression={activeExpression}
          blink={blink}
          pupils={pupils}
          motionConfig={motionConfig}
        />
      </motion.div>
    </div>
  );
}
