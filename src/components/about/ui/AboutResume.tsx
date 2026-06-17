// src/components/about/ui/AboutResume.tsx
"use client";

import { useState, useRef } from "react";
import { Capriola } from "next/font/google";
import { Download, ExternalLink, Briefcase, GraduationCap, ChevronDown } from "lucide-react";
import type { AboutResumeProps } from "../types/about.types";

const capriola = Capriola({
  weight: "400",
  subsets: ["latin"],
});

const skills = [
  "Java",
  "Python",
  "Data Structure and Algorithum",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
];

const fullSkillsList = [
  { category: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "C"] },
  { category: "Web Dev", items: ["React.js", "Next.js", "Node.js", "REST APIs", "Tailwind CSS"] },
  { category: "CS Core", items: ["DSA", "OOP", "DBMS", "OS", "System Design"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"] },
  { category: "Tools", items: ["Git", "GitHub Actions", "CI/CD", "VS Code"] },
  { category: "Methods", items: ["Agile", "SDLC"] },
];

export default function AboutResume({
  rootRef,
  panelRef,
  detailsRef,
}: AboutResumeProps) {
  
  const [expandedCard, setExpandedCard] = useState<'experience' | 'skills' | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ==========================================
  // RESUME CARD CONTROL PANEL
  // ==========================================
  const resumeControls = {
    scale: 0.9,               
    xOffset: 0,             
    yOffset: -50,            
    contentTopPadding: 180, 
  };
  // ==========================================

  const handleMouseEnter = (card: 'experience' | 'skills') => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setExpandedCard(card);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setExpandedCard(null);
    }, 400); 
  };

  return (
    <div
      ref={rootRef}
      className="relative z-0 mx-auto flex min-h-screen w-full max-w-[85rem] items-center justify-center px-4 pt-28 opacity-0 md:px-8"
    >
      <div
        ref={panelRef}
        style={{
          transform: `scale(${resumeControls.scale}) translate(${resumeControls.xOffset}px, ${resumeControls.yOffset}px)`,
          paddingTop: `${resumeControls.contentTopPadding}px`
        }}
        className="w-full overflow-hidden rounded-[2.5rem] border border-white/20 border-2 shadow-[0_30px_100px_rgba(0,0,0,0.4)] p-8 md:px-16 md:pb-16"
      >
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 h-full">

          {/* ========================================
              LEFT COLUMN: SUMMARY & ACTIONS
              ======================================== */}
          <div className="flex flex-col justify-start min-h-[460px]">
            <h2 className={`text-5xl md:text-7xl font-bold text-white mb-6 ${capriola.className}`}>
              Summary
            </h2>

            <p className="max-w-md text-base leading-relaxed text-blue-100 mb-12">
              Computer Science undergraduate with freelance experience building
              scalable, full-stack web applications. Seeking a Software
              Engineering Internship to contribute to ambitious production
              systems.
            </p>

            <div className="flex flex-wrap gap-5 mt-auto">
              <a
                href="/Sachin_Prasad.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full border border-white/25 bg-[#223a6a9c] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#2d426c] hover:scale-105"
              >
                Open Resume <ExternalLink className="h-[18px] w-[18px]" />
              </a>
              <a
                href="/Sachin_Prasad.pdf"
                download="Sachin_Prasad_Resume.pdf"
                className="flex items-center gap-3 rounded-full border border-white/25 bg-[#223a6a9c] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2d426c] hover:scale-105"
              >
                 <Download className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* ========================================
              RIGHT COLUMN: HOVER CARDS
              ======================================== */}
          {/* Removed absolute positioning and strictly locked the height to avoid pushing clouds */}
          <div 
            ref={detailsRef} 
            className="flex flex-col h-full max-h-[460px] w-full" 
            onMouseLeave={handleMouseLeave}
          >
            
            {/* 1. Education Box */}  
            <div className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center gap-5 rounded-2xl shadow-inner shrink-0
              ${expandedCard ? 'h-0 opacity-0 p-0 mb-0 border-0 pointer-events-none' : 'h-[90px] opacity-100 p-5 mb-5 border border-white/15'}`}
            >
              <div className="flex shrink-0 items-center justify-center">
                <GraduationCap className="h-8 w-8 text-[#ffffff]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base text-white">
                  <strong className="font-bold">Parul University,</strong> <span className="text-blue-100">B.Tech Computer Science</span>
                </h3>
                <p className="mt-1 text-sm text-blue-200/70">
                  08/2023 - 08/2027 | Vadodara, Gujarat
                </p>
              </div>
            </div>

            {/* 2. Experience Box */}
            <div 
              onMouseEnter={() => handleMouseEnter('experience')}
              className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-col rounded-2xl shadow-inner cursor-default
                ${expandedCard === 'skills' ? 'h-0 opacity-0 p-0 mb-0 border-0 pointer-events-none' : 
                  expandedCard === 'experience' ? 'flex-1 opacity-100 p-6 mb-0 border border-white/25 bg-[#223a6a9c]' : 
                  'h-[90px] opacity-100 p-5 mb-5 border border-white/10 shrink-0'}`}
            >
              <div className="flex justify-between items-center shrink-0">
                <div className="flex items-center gap-5">
                  <div className="flex shrink-0 items-center justify-center">
                    <Briefcase className="h-7 w-7 text-[#ffffff]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Freelance Full-Stack Developer</h3>
                    <p className="mt-1 text-sm text-blue-200/70">08/2025 – 02/2026 | Suggapanchhi</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-white/50 transition-transform duration-500 ${expandedCard === 'experience' ? 'rotate-180 opacity-0 hidden md:block' : 'rotate-0 opacity-100 hidden md:block'}`} />
              </div>

              <div className={`transition-opacity duration-500 ease-in-out overflow-y-auto pr-2 flex-1
                [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full
                ${expandedCard === 'experience' ? 'opacity-100 mt-6' : 'opacity-0 mt-0 hidden'}`}
              >
                <ul className="list-disc list-outside ml-4 text-sm text-blue-100 space-y-3 leading-relaxed">
                  <li>Developed full-stack business management application to digitize inventory and billing.</li>
                  <li>Engineered secure RESTful APIs integrated with Role-Based Access Control (RBAC) middleware.</li>
                  <li>Optimized PostgreSQL database schema with Prisma ORM for performance.</li>
                  <li>Reduced dashboard load time by 40% through parallel API fetching.</li>
                </ul>
              </div>
            </div>

            {/* 3. Skills Box */}
            <div 
              onMouseEnter={() => handleMouseEnter('skills')}
              className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-col rounded-2xl shadow-inner cursor-default
                ${expandedCard === 'experience' ? 'h-0 opacity-0 p-0 mb-0 border-0 pointer-events-none' : 
                  expandedCard === 'skills' ? 'flex-1 opacity-100 p-6 mb-0 border border-white/25 bg-[#223a6a9c]' : 
                  'flex-1 opacity-100 p-6 mb-0 border border-white/10 shrink-0 min-h-[140px]'}`}
            >
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h3 className="text-base font-bold text-white tracking-wide">Skills :</h3>
                <ChevronDown className={`h-5 w-5 text-white/50 transition-transform duration-500 ${expandedCard === 'skills' ? 'rotate-180 opacity-0 hidden md:block' : 'rotate-0 opacity-100 hidden md:block'}`} />
              </div>

              {/* Default View */}
              <div className={`transition-opacity duration-500 ease-in-out ${expandedCard === 'skills' ? 'h-0 opacity-0 overflow-hidden' : 'opacity-100'}`}>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span key={skill} className="rounded-lg border border-white/15 bg-[#253659]/10 px-4 py-2 text-sm font-medium text-white shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded View */}
              <div className={`transition-opacity duration-500 ease-in-out overflow-y-auto pr-2 flex-1
                [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full
                ${expandedCard === 'skills' ? 'opacity-100 mt-2' : 'h-0 opacity-0 mt-0 hidden'}`}
              >
                <div className="flex flex-col gap-5 pb-2">
                  {fullSkillsList.map((group) => (
                    <div key={group.category} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <p className="text-[11px] font-bold text-blue-200/60 uppercase tracking-widest min-w-[110px]">{group.category}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                          <span key={skill} className="rounded-md border border-white/15 bg-[#253659]/10 px-2.5 py-1.5 text-xs text-blue-50 shadow-sm">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}