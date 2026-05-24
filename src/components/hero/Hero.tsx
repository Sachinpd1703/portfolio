import HeroBackground from "./HeroBackground";
import HeroCharacter from "./HeroCharacter";
import HeroClouds from "./HeroClouds";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute left-1/2 top-1/2 z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
      <HeroBackground />

      <HeroContent />

      <HeroCharacter />

      <HeroClouds />
    </section>
  );
}