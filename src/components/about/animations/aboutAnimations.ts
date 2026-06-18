import gsap from "gsap";
import type {
  AboutDivRef,
  ResumeAnimationRefs,
  SplitAnimationRefs,
  VideoAnimationRefs,
} from "../types/about.types";

const node = (ref: AboutDivRef) => ref.current;

export function playSplitEntry({
  rootRef,
  leftRef,
  avatarRef,
  rightRef,
}: SplitAnimationRefs) {
  const timeline = gsap.timeline({
    defaults: { duration: 2, ease: "power3.out" },
  });

  timeline.set(node(rootRef), {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  });
  timeline.fromTo(
    node(leftRef),
    { autoAlpha: 0, x: -100, rotate: -2 },
    { autoAlpha: 1, x: 0, rotate: 0 },
    0,
  );
  timeline.fromTo(
    node(rightRef),
    { autoAlpha: 0, x: 100, rotate: 2 },
    { autoAlpha: 1, x: 0, rotate: 0 },
    0,
  );
  timeline.fromTo(
    node(avatarRef),
    { autoAlpha: 0, y: 150, scale: 0.82 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.1,
      ease: "back.out(1.7)",
    },
    0.04,
  );

  return timeline;
}

export function playResumeEntry({
  rootRef,
  panelRef,
  detailsRef,
}: ResumeAnimationRefs) {
  const timeline = gsap.timeline({
    defaults: { duration: 0.75, ease: "power3.out" },
  });

  timeline.set(node(rootRef), {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  });
  timeline.fromTo(
    node(panelRef),
    { autoAlpha: 0, y: 40, scale: 0.85, filter: "blur(14px)" },
    { autoAlpha: 1, y: -40, scale: 0.9, filter: "blur(0px)" },
    0,
  );
  timeline.fromTo(
    node(detailsRef),
    { autoAlpha: 0, y: 36 },
    { autoAlpha: 1, y: 0, duration: 0.65 },
    0.28,
  );

  return timeline;
}

export function playVideoEntry({
  rootRef,
  frameRef,
  captionRef,
}: VideoAnimationRefs) {
  const timeline = gsap.timeline({
    defaults: { duration: 0.8, ease: "power3.out" },
  });

  timeline.set(node(rootRef), {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  });
  timeline.fromTo(
    node(frameRef),
    { autoAlpha: 0, y: 90, scale: 0.9, rotateX: 10 },
    { autoAlpha: 1, y: 0, scale: 1, rotateX: 0 },
    0,
  );
  timeline.fromTo(
    node(captionRef),
    { autoAlpha: 0, y: 28 },
    { autoAlpha: 1, y: 0, duration: 0.55 },
    0.32,
  );

  return timeline;
}

export function playExitAnimation(rootRef: AboutDivRef) {
  return gsap.to(node(rootRef), {
    autoAlpha: 0,
    y: -28,
    scale: 0.98,
    filter: "blur(8px)",
    duration: 0.38,
    ease: "power2.inOut",
  });
}