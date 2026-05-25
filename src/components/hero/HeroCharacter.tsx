"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function HeroCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [isAngry, setIsAngry] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / 40;
      const dy = (e.clientY - centerY) / 40;

      setMousePosition({
        x: Math.max(-8, Math.min(8, dx)),
        y: Math.max(-8, Math.min(8, dy)),
      });

      const isInsideFace =
        e.clientX >= rect.left + 40 &&
        e.clientX <= rect.right - 40 &&
        e.clientY >= rect.top + 20 &&
        e.clientY <= rect.top + 180;

      setIsAngry(isInsideFace);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      animate={{
        y: [0, -10, 0],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2"
    >
      <svg width="320" height="420" viewBox="0 0 320 420" fill="none">
        {/* BODY */}
        <rect x="85" y="170" width="150" height="180" rx="70" fill="#59D9FF" />

        {/* HEAD */}
        <circle cx="160" cy="120" r="85" fill="#FFD7B5" />

        {/* HAIR */}
        <path
          d="M80 120C80 50 120 20 170 20C230 20 250 70 245 130C220 90 180 80 130 95C110 100 95 110 80 120Z"
          fill="#111111"
        />

        {/* LEFT EYE */}
        <ellipse cx="125" cy="120" rx="16" ry="18" fill="white" />

        {/* RIGHT EYE */}
        <ellipse cx="195" cy="120" rx="16" ry="18" fill="white" />

        {/* LEFT PUPIL */}
        <motion.circle
          animate={{
            cx: 125 + mousePosition.x,
            cy: 120 + mousePosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 12,
          }}
          r="7"
          fill="#111"
        />

        {/* RIGHT PUPIL */}
        <motion.circle
          animate={{
            cx: 195 + mousePosition.x,
            cy: 120 + mousePosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 12,
          }}
          r="7"
          fill="#111"
        />

        {/* EYEBROWS */}
        <motion.line
          animate={{
            rotate: isAngry ? -10 : 0,
            y: isAngry ? -4 : 0,
          }}
          x1="110"
          y1="90"
          x2="140"
          y2="95"
          stroke="#111"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <motion.line
          animate={{
            rotate: isAngry ? 10 : 0,
            y: isAngry ? -4 : 0,
          }}
          x1="180"
          y1="95"
          x2="210"
          y2="90"
          stroke="#111"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* MOUTH */}
        <motion.path
          animate={{
            d: isAngry
              ? "M135 165 Q160 145 185 165"
              : "M135 155 Q160 175 185 155",
          }}
          transition={{
            duration: 0.2,
          }}
          stroke="#111"
          strokeWidth="5"
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
    </motion.div>
  );
}
