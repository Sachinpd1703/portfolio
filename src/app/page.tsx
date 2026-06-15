// src/app/page.tsx
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Project from "@/components/projects/Projects";

export default function Home() {
  return (
    <main className="relative">
      <div
        id="storm-wipe"
        className="pointer-events-none fixed top-0 right-0 z-[100] h-[50px] w-[50px] origin-top-right scale-0 rounded-bl-full bg-blue-600 opacity-0 transition-none"
      />
      <Navbar />
      <Hero />
      <About />
      <Project />
    </main>
  );
}
