const HeroSection = ({ liveCount }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a3d2e] via-[#0a2a3a] to-[#0a1535]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#00e676] blur-[120px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#1a3a6e] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              <span className="block text-white">WATCH FOOTBALL</span>
              <span className="block text-[#00e676]">LIVE &amp; FREE</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
              Legal streaming links for top football competitions worldwide. No account needed.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-lg border border-[#3a1830] bg-[#1a1020] px-4 py-2.5 md:self-end">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            <span className="text-sm font-bold text-red-400">{liveCount} Live Now</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
