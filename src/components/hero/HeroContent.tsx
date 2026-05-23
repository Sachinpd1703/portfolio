export default function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6">
      {/* LEFT CONTENT */}
      <div className="max-w-md">
        <p className="mb-3 text-lg text-white/80">
          Hey,
        </p>

        <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">
          I&apos;m Sachin
        </h2>

        <p className="mt-4 text-white/70">
          Creative Frontend Developer crafting immersive and interactive web
          experiences.
        </p>
      </div>

      {/* BIG TYPOGRAPHY */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none">
        <h1 className="text-[22vw] font-black uppercase leading-none tracking-[-0.08em] text-white/90">
          SACHIN
        </h1>
      </div>
    </div>
  );
}