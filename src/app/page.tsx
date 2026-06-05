// src/app/page.tsx
import Navbar from "@/components/navbar/navbar"
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";

export default function Home() {
  return (
    <main className="relative bg-slate-900">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}