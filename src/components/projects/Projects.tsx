// src/components/projects/Projects.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger if not already done globally
    gsap.registerPlugin(ScrollTrigger);

    // Use gsap.context for safe React cleanup
    const ctx = gsap.context(() => {
      // Grab all the individual project panels
      const panels = gsap.utils.toArray(".project-panel");

      // Initial state: hidden and container to the right
      gsap.set(sectionRef.current, { autoAlpha: 0 });
      gsap.set(slideContainerRef.current, { x: "100%" });

      // Master timeline for the entire Projects sequence
      // We use the same trigger as About to stay perfectly in sync
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-section", // Target the About section trigger
          start: "top top",
          pin: false, // About component handles the pin
          scrub: 1,
          // Match the About section end (5000px)
          end: "+=5000", 
        },
      });

      // Stage 1: Interaction Window (Wait 2000px)
      tl.to({}, { duration: 2 }); 

      // Stage 2: Slide the entire section in from the right (1000px)
      tl.to(sectionRef.current, { autoAlpha: 1, duration: 0.1 })
        .to(slideContainerRef.current, {
          x: 0,
          ease: "none",
          duration: 1, 
        });

      // Stage 3: Panning through the individual project panels (2000px)
      tl.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        duration: 2, 
      });

    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    // 1. The Pinned Container: Fixed inset-0 to stay on top of the pinned About section.
    // Initial invisible/autoAlpha handled by GSAP.
    <section 
      ref={sectionRef} 
      className="pointer-events-none fixed inset-0 h-screen w-full overflow-hidden bg-transparent z-50"
    >
      {/* 2. The Entrance Slide Container: Starts off-screen to the right. 
          pointer-events-auto restores interaction once this layer slides in. */}
      <div 
        ref={slideContainerRef}
        className="pointer-events-auto h-full w-full bg-slate-900"
      >
        {/* 3. The Horizontal Track: Contains all the panels */}
        <div 
          ref={scrollWrapperRef} 
          className="flex h-full w-[300vw]"
        >
          
          {/* Panel 1 */}
          <div className="project-panel flex h-screen w-screen items-center justify-center border-r border-white/10 bg-[#17243e]">
            <h1 className="text-5xl font-bold text-white">Project 1: FocusFlow</h1>
          </div>

          {/* Panel 2 */}
          <div className="project-panel flex h-screen w-screen items-center justify-center border-r border-white/10 bg-[#1e2d4a]">
            <h1 className="text-5xl font-bold text-white">Project 2: Suggapanchhi</h1>
          </div>

          {/* Panel 3 */}
          <div className="project-panel flex h-screen w-screen items-center justify-center bg-[#17243e]">
            <h1 className="text-5xl font-bold text-white">Project 3: MetaGuard</h1>
          </div>

        </div>
      </div>
    </section>
  );
}