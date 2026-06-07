import type { Dispatch, RefObject, SetStateAction } from "react";

export type AboutPersonality = "split" | "resume" | "video";

export type AboutDivRef = RefObject<HTMLDivElement | null>;

export interface AboutFloatingMenuProps {
  activePersonality: AboutPersonality;
  isVisible: boolean;
  setActivePersonality: Dispatch<SetStateAction<AboutPersonality>>;
}

export interface AboutSplitProps {
  rootRef: AboutDivRef;
  leftRef: AboutDivRef;
  avatarRef: AboutDivRef;
  rightRef: AboutDivRef;
}

export interface AboutResumeProps {
  rootRef: AboutDivRef;
  panelRef: AboutDivRef;
  detailsRef: AboutDivRef;
}

export interface AboutVideoProps {
  rootRef: AboutDivRef;
  frameRef: AboutDivRef;
  captionRef: AboutDivRef;
}

export interface SplitAnimationRefs {
  rootRef: AboutDivRef;
  leftRef: AboutDivRef;
  avatarRef: AboutDivRef;
  rightRef: AboutDivRef;
}

export interface ResumeAnimationRefs {
  rootRef: AboutDivRef;
  panelRef: AboutDivRef;
  detailsRef: AboutDivRef;
}

export interface VideoAnimationRefs {
  rootRef: AboutDivRef;
  frameRef: AboutDivRef;
  captionRef: AboutDivRef;
}