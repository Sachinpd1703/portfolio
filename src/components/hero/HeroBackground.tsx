export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500 via-purple-700 to-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff22,transparent_55%)]" />

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute left-[-10%] top-[10%] h-[300px] w-[300px] rounded-full bg-pink-500/20 blur-3xl" />

      <div className="absolute right-[-10%] top-[20%] h-[300px] w-[300px] rounded-full bg-cyan-400/20 blur-3xl" />
    </>
  );
}