"use client";

import { animate, useMotionValueEvent } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { characterExpressions } from "./CharacterExpressions";
import type {
  BlinkFrame,
  BlinkState,
  CharacterSvgGroupId,
  Expression,
  EyeSide,
  EyeTrackingMotion,
} from "./types";
import CharacterMaster from "./svg/character-master.svg";

type CharacterSvgProps = {
  expression: Expression;
  blink: BlinkState;
  pupils: EyeTrackingMotion;
  motionConfig: ReturnType<
    typeof import("./hooks/useCharacterMotion").useCharacterMotion
  >;
};

type SvgTarget = SVGGraphicsElement | SVGSVGElement;

const mouthIds = ["mouth-neutral", "mouth-smile", "mouth-angry"] as const;
const characterArtworkViewBox = "210 130 720 1080";

const eyeIds: Record<EyeSide, { open: string; mid: string; closed: string }> = {
  left: {
    open: "eye-left",
    mid: "eye-close-mid-left",
    closed: "eye-close-full-left",
  },
  right: {
    open: "eye-right",
    mid: "eye-close-mid-right",
    closed: "eye-close-full-right",
  },
};

function setSvgTransformDefaults(element: SvgTarget | null) {
  if (!element) return;

  element.style.transformBox = "fill-box";
  element.style.transformOrigin = "center";
  element.style.willChange = "transform, opacity";
}

function setOpacity(element: Element | null, opacity: number) {
  if (!(element instanceof SVGElement)) return;

  element.style.opacity = String(opacity);
  element.style.transition = "opacity 90ms ease-out";
}

function frameToKey(frame: BlinkFrame) {
  return frame === "closed" ? "closed" : frame;
}

function CharacterSvg({
  expression,
  blink,
  pupils,
  motionConfig,
}: CharacterSvgProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const expressionConfig = characterExpressions[expression];
  const activeMouthId = `mouth-${expressionConfig.mouth}`;

  const getById = useCallback((id: CharacterSvgGroupId) => {
    return rootRef.current?.querySelector<SvgTarget>(`#${id}`) ?? null;
  }, []);

  const fallbackCharacterGroup = useCallback(() => {
    return (
      getById("character") ??
      rootRef.current?.querySelector<SvgTarget>("svg > g") ??
      null
    );
  }, [getById]);

  const eyeFrames = useMemo(
    () => ({
      left:
        blink.left === "open" && expressionConfig.eyeOpenness === "mid"
          ? "mid"
          : blink.left,
      right:
        blink.right === "open" && expressionConfig.eyeOpenness === "mid"
          ? "mid"
          : blink.right,
    }),
    [blink.left, blink.right, expressionConfig.eyeOpenness],
  );

  useEffect(() => {
    const animatedTargets = [
      fallbackCharacterGroup(),
      getById("hoodie"),
      getById("hoodie-string-left"),
      getById("hoodie-string-right"),
      getById("hair"),
      getById("pupil-left"),
      getById("pupil-right"),
      getById("eyebrow-left"),
      getById("eyebrow-right"),
    ];

    animatedTargets.forEach(setSvgTransformDefaults);
  }, [fallbackCharacterGroup, getById]);

  useEffect(() => {
    const character = fallbackCharacterGroup();
    const hoodie = getById("hoodie");
    const leftString = getById("hoodie-string-left");
    const rightString = getById("hoodie-string-right");
    const hair = getById("hair");

    const controls = [
      character
        ? animate(character, motionConfig.head.animate, {
            ...motionConfig.head.transition,
            rotate: { duration: 0.45, ease: "easeOut" },
          })
        : null,
      hoodie
        ? animate(hoodie, motionConfig.hoodie.animate, motionConfig.hoodie.transition)
        : null,
      leftString
        ? animate(
            leftString,
            motionConfig.stringLeft.animate,
            motionConfig.stringLeft.transition,
          )
        : null,
      rightString
        ? animate(
            rightString,
            motionConfig.stringRight.animate,
            motionConfig.stringRight.transition,
          )
        : null,
      hair ? animate(hair, motionConfig.hair.animate, motionConfig.hair.transition) : null,
    ];

    return () => {
      controls.forEach((control) => control?.stop());
    };
  }, [fallbackCharacterGroup, getById, motionConfig]);

  useEffect(() => {
    const character = fallbackCharacterGroup();
    const leftEyebrow = getById("eyebrow-left");
    const rightEyebrow = getById("eyebrow-right");

    const controls = [
      character
        ? animate(character, { rotate: expressionConfig.headTilt }, { duration: 0.45 })
        : null,
      leftEyebrow
        ? animate(leftEyebrow, expressionConfig.eyebrow.left, { duration: 0.18 })
        : null,
      rightEyebrow
        ? animate(rightEyebrow, expressionConfig.eyebrow.right, { duration: 0.18 })
        : null,
    ];

    mouthIds.forEach((id) => setOpacity(rootRef.current?.querySelector(`#${id}`) ?? null, 0));
    setOpacity(rootRef.current?.querySelector(`#${activeMouthId}`) ?? null, 1);

    return () => {
      controls.forEach((control) => control?.stop());
    };
  }, [activeMouthId, expressionConfig, fallbackCharacterGroup, getById]);

  useEffect(() => {
    (["left", "right"] as EyeSide[]).forEach((side) => {
      const activeFrame = frameToKey(eyeFrames[side]);
      const ids = eyeIds[side];

      setOpacity(rootRef.current?.querySelector(`#${ids.open}`) ?? null, activeFrame === "open" ? 1 : 0);
      setOpacity(rootRef.current?.querySelector(`#${ids.mid}`) ?? null, activeFrame === "mid" ? 1 : 0);
      setOpacity(
        rootRef.current?.querySelector(`#${ids.closed}`) ?? null,
        activeFrame === "closed" ? 1 : 0,
      );
      setOpacity(getById(side === "left" ? "pupil-left" : "pupil-right"), activeFrame === "closed" ? 0 : 1);
    });
  }, [eyeFrames, getById]);

  useMotionValueEvent(pupils.x, "change", (x) => {
    const y = pupils.y.get();

    [getById("pupil-left"), getById("pupil-right")].forEach((pupil) => {
      if (!pupil) return;
      pupil.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  });

  useMotionValueEvent(pupils.y, "change", (y) => {
    const x = pupils.x.get();

    [getById("pupil-left"), getById("pupil-right")].forEach((pupil) => {
      if (!pupil) return;
      pupil.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  });

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full items-center justify-center overflow-visible"
    >
      <CharacterMaster
        aria-hidden="true"
        focusable="false"
        className="block h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        viewBox={characterArtworkViewBox}
      />
    </div>
  );
}

export default memo(CharacterSvg);
