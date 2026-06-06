// src/components/about/about.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroClouds from "@/components/hero/clouds/HeroClouds";
import BackgroundAbout from "./BackgroundAbout";
import AboutFloatingMenu from "./AboutFloatingMenu";
import {
  playResumeEntry,
  playSplitEntry,
  playVideoEntry,
} from "./animations/aboutAnimations";
import type { AboutPersonality } from "./types/about.types";
import AboutResume from "./ui/AboutResume";
import AboutSplit from "./ui/AboutSplit";
import AboutVideo from "./ui/AboutVideo";

let isScrollTriggerRegistered = false;

export default function About() {
  const [activePersonality, setActivePersonality] =
    useState<AboutPersonality>("split");
  const [renderedPersonality, setRenderedPersonality] =
    useState<AboutPersonality>("split");
  const [hasEntered, setHasEntered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);
  const menuVisibleRef = useRef(false);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const splitLeftRef = useRef<HTMLDivElement>(null);
  const splitAvatarRef = useRef<HTMLDivElement>(null);
  const splitRightRef = useRef<HTMLDivElement>(null);
  const resumePanelRef = useRef<HTMLDivElement>(null);
  const resumeDetailsRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoCaptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const context = gsap.context(() => {
      if (!isScrollTriggerRegistered) {
        gsap.registerPlugin(ScrollTrigger);
        isScrollTriggerRegistered = true;
      }

      if (!sectionRef.current) return;

      const updateMenuVisibility = () => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, window.innerHeight);
        const visiblePixels = Math.max(0, visibleBottom - visibleTop);
        const visibleRatio = visiblePixels / rect.height;
        const shouldShowMenu = visibleRatio >= 0.6;

        // Show the fixed menu only after 60% of the About section is visible.
        if (menuVisibleRef.current !== shouldShowMenu) {
          menuVisibleRef.current = shouldShowMenu;
          setIsMenuVisible(shouldShowMenu);
        }
      };

      // --- SCROLL ENTRY / EXIT EFFECT ---
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        end: "top top",
        snap: {
          snapTo: 1,
          duration: { min: 0.9, max: 3.2 },
          delay: 0.1,
          ease: "power2.out",
        },
        onEnter: () => {
          if (!hasEnteredRef.current) {
            // First time loading: set states to trigger the component builds
            hasEnteredRef.current = true;
            setHasEntered(true);
          } else {
            // Re-entering from Hero section: Play forward at normal speed
            activeTimelineRef.current?.timeScale(1).play();
          }
        },
        onLeaveBack: () => {
          // Scrolling back up to Hero: Reverse the animation smoothly!
          // 1.5x speed is slightly faster than normal, but slower than tab switching
          activeTimelineRef.current?.timeScale(1.5).reverse();
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onRefresh: updateMenuVisibility,
        onToggle: updateMenuVisibility,
        onUpdate: updateMenuVisibility,
      });

      updateMenuVisibility();
    }, sectionRef);

    return () => {
      activeTimelineRef.current?.kill();
      context.revert();
    };
  }, []);

  // --- TAB SWITCHING EFFECT ---
  useEffect(() => {
    if (activePersonality === renderedPersonality) return;

    let isCancelled = false;

    // If it hasn't entered yet, just swap instantly
    if (!hasEntered || !activeTimelineRef.current) {
      setRenderedPersonality(activePersonality);
      return;
    }

    const tl = activeTimelineRef.current;

    // 1. Clear any previous reverse callbacks to prevent bugs
    tl.eventCallback("onReverseComplete", null);

    // 2. Play the entry animation backwards! (Speed it up 2.5x for snappy UI)
    tl.timeScale(2.5).reverse();

    // 3. Wait for the reverse to finish, then swap the UI component
    tl.eventCallback("onReverseComplete", () => {
      if (!isCancelled) {
        setRenderedPersonality(activePersonality);
      }
    });

    return () => {
      isCancelled = true;
      tl.eventCallback("onReverseComplete", null);
    };
  }, [activePersonality, renderedPersonality, hasEntered]);

  useEffect(() => {
    if (!hasEntered) return;

    activeTimelineRef.current?.kill();

    if (renderedPersonality === "split") {
      activeTimelineRef.current = playSplitEntry({
        rootRef,
        leftRef: splitLeftRef,
        avatarRef: splitAvatarRef,
        rightRef: splitRightRef,
      });
    }

    if (renderedPersonality === "resume") {
      activeTimelineRef.current = playResumeEntry({
        rootRef,
        panelRef: resumePanelRef,
        detailsRef: resumeDetailsRef,
      });
    }

    if (renderedPersonality === "video") {
      activeTimelineRef.current = playVideoEntry({
        rootRef,
        frameRef: videoFrameRef,
        captionRef: videoCaptionRef,
      });
    }

    return () => {
      activeTimelineRef.current?.kill();
    };
  }, [renderedPersonality, hasEntered]);

  const renderPersonality = () => {
    if (renderedPersonality === "resume") {
      return (
        <AboutResume
          rootRef={rootRef}
          panelRef={resumePanelRef}
          detailsRef={resumeDetailsRef}
        />
      );
    }

    if (renderedPersonality === "video") {
      return (
        <AboutVideo
          rootRef={rootRef}
          frameRef={videoFrameRef}
          captionRef={videoCaptionRef}
        />
      );
    }

    return (
      <AboutSplit
        rootRef={rootRef}
        leftRef={splitLeftRef}
        avatarRef={splitAvatarRef}
        rightRef={splitRightRef}
      />
    );
  };

  return (
    <section
      ref={sectionRef}
      className="noise relative z-20 flex min-h-[120vh] items-center justify-center overflow-hidden bg-blue-950"
    >
      <BackgroundAbout />
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-30 h-12.5 w-full bg-[#19202F]" />
      <HeroClouds baseY={-460} />
      {renderPersonality()}
      <AboutFloatingMenu
        activePersonality={activePersonality}
        isVisible={isMenuVisible}
        setActivePersonality={setActivePersonality}
      />
    </section>
  );
}