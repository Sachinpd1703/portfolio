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

  return (
    <div
      ref={containerRef}
      className={`absolute left-1/2 top-[58%] z-20 w-[min(42vw,210px)] min-w-[140px] -translate-x-1/2 -translate-y-1/2 select-none sm:top-[54%] sm:w-[min(24vw,240px)] md:top-[52%] md:w-[min(22vw,280px)] lg:top-[50%] lg:w-[min(20vw,310px)] xl:w-[min(18vw,330px)] ${className}`}
      onPointerEnter={(event) =>
        setHoverExpression(resolveHoverExpression(event) ?? "focused")
      }
      onPointerMove={(event) =>
        setHoverExpression(resolveHoverExpression(event) ?? "focused")
      }
      onPointerLeave={() => setHoverExpression(null)}
      style={stageStyle}
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
