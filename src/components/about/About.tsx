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

      // --- SCROLL ENTRY / EXIT ANIMATIONS ---
      let hasPulsed = false;
      let stormTriggered = false;
      let stormTl: gsap.core.Timeline | null = null;

      // 1. Snapping between Hero and About
      ScrollTrigger.create({
        trigger: "#hero-section",
        start: "top top",
        end: "bottom top",
        snap: {
          snapTo: [0, 1],
          duration: { min: 0.5, max: 0.8 },
          delay: 0.1,
          ease: "power1.inOut",
        },
      });

      // 2. Main About Interaction & Pinning
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=5000", 
        pin: true,
        // Scrolling DOWN into About
        onEnter: () => {
          setIsMenuVisible(true);
          if (!hasEnteredRef.current) {
            hasEnteredRef.current = true;
            setHasEntered(true);
          } else {
            activeTimelineRef.current?.timeScale(1).play(0);
          }
        },
        onUpdate: (self) => {
          // Trigger the EXPANSION and PULSE only after scrolling ~15%
          if (self.progress > 0.15 && !hasPulsed) {
            hasPulsed = true;
            window.dispatchEvent(new Event("force-menu-open"));
            gsap.fromTo(
              "#about-floating-menu",
              { boxShadow: "0px 0px 0px rgba(34,211,238,0)" },
              { 
                boxShadow: "0px 0px 40px rgba(34,211,238,0.8)", 
                yoyo: true, 
                repeat: 3, 
                duration: 0.2, 
                ease: "power2.out" 
              }
            );
          }
        },
        // Scrolling UP into About (From Projects section)
        onEnterBack: () => {
          setIsMenuVisible(true);
          activeTimelineRef.current?.timeScale(1).play(0);

          // User scrolled back up! Fix the stuck storm wipe!
          if (stormTriggered) {
            stormTriggered = false;
            if (stormTl) stormTl.kill(); 
            gsap.to("#storm-wipe", { opacity: 0, scale: 0, duration: 0.5, ease: "power2.out" });
          }
        },
        onLeave: () => {
          // Reverse the animation smoothly to hide it
          activeTimelineRef.current?.timeScale(1.5).reverse();

          // Trigger the Storm Wipe transition as we leave
          if (!stormTriggered) {
            stormTriggered = true;
            stormTl = gsap.timeline();
            stormTl.to("#storm-wipe", {
              opacity: 1,
              scale: 150, 
              duration: 1.2,
              ease: "expo.inOut"
            }, 0)
            .to("#storm-wipe", {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut"
            }, "+=0.2"); 
          }
        },
        // Scrolling UP away from About (Back to Hero)
        onLeaveBack: () => {
          activeTimelineRef.current?.timeScale(1.5).reverse();
          hasPulsed = false; // Reset pulse so it can trigger again next time
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
      });
    }, sectionRef);

    return () => {
      activeTimelineRef.current?.kill();
      context.revert();
    };
  }, []);

  // --- TAB SWITCHING EXIT ANIMATION ---
  useEffect(() => {
    if (activePersonality === renderedPersonality) return;

    let isCancelled = false;

    // If it hasn't loaded yet, swap instantly
    if (!hasEntered || !rootRef.current) {
      setRenderedPersonality(activePersonality);
      return;
    }

    // Explicit, highly-visible Exit Animation
    gsap.to(rootRef.current, {
      y: 40,               // Drops down
      opacity: 0,          // Fades out
      scale: 0.95,         // Shrinks slightly
      filter: "blur(8px)", // Cinematic blur
      duration: 0.35,      // Fast but perceptible
      ease: "power2.in",   // Accelerates out
      onComplete: () => {
        if (!isCancelled) {
          // Once the exit is done, swap the component!
          // The new component's entry animation will automatically reset the blur/opacity.
          setRenderedPersonality(activePersonality);
        }
      },
    });

    return () => {
      isCancelled = true;
      gsap.killTweensOf(rootRef.current);
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
      id="about-section"
      ref={sectionRef}
      className="noise relative z-20 flex h-screen items-center justify-center overflow-hidden bg-blue-950"
    >
      <BackgroundAbout />
      {/* <div className="pointer-events-none absolute top-0 right-0 left-0 z-30 h-12.5 w-full bg-[#19202F]" /> */}
      <HeroClouds baseY={-500} />
      {renderPersonality()}
      <AboutFloatingMenu
        activePersonality={activePersonality}
        isVisible={isMenuVisible}
        setActivePersonality={setActivePersonality}
      />
    </section>
  );
}
