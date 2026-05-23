import HeroBackground from "./HeroBackground";
import HeroCharacter from "./HeroCharacter";
import HeroClouds from "./HeroClouds";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <HeroBackground />

      <HeroContent />

      <HeroCharacter />

      <HeroClouds />
    </section>
  );
}