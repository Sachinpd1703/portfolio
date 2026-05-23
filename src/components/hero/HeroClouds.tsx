export default function HeroClouds() {
  return (
    <>
      {/* LEFT CLOUD */}
      <div className="absolute bottom-[-120px] left-[-120px] z-30 h-[420px] w-[420px] rounded-full bg-[#111111]" />

      {/* CENTER CLOUD */}
      <div className="absolute bottom-[-180px] left-1/2 z-30 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#111111]" />

      {/* RIGHT CLOUD */}
      <div className="absolute bottom-[-120px] right-[-120px] z-30 h-[420px] w-[420px] rounded-full bg-[#111111]" />
    </>
  );
}