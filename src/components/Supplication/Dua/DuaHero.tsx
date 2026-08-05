import Link from "next/link";

interface DuaHeroProps {
  title: string;
  arabicTitle: string;
  description: string;
  backgroundImage: string;
  totalDuas: number;
}

const DuaHero = ({
  title,
  arabicTitle,
  description,
  backgroundImage,
  totalDuas,
}: DuaHeroProps) => {
  return (
    <section className="relative w-full min-h-[22rem] md:min-h-[28rem] flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Layered dark overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/40 via-[#0d1a2e]/60 to-[#0d1a2e]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a2e]/50 via-transparent to-[#0d1a2e]/30" />

      {/* Decorative crescent & star motif */}
      <div className="absolute top-6 right-8 md:right-16 opacity-20 select-none pointer-events-none">
        <span className="text-[5rem] md:text-[7rem] text-amber-200 leading-none">☽</span>
      </div>
      <div className="absolute top-10 right-28 md:right-44 opacity-15 select-none pointer-events-none">
        <span className="text-[1.5rem] text-amber-100 leading-none">✦</span>
      </div>
      <div className="absolute top-16 right-20 md:right-36 opacity-10 select-none pointer-events-none">
        <span className="text-[0.8rem] text-amber-100 leading-none">✦</span>
      </div>

      {/* Content — same max-width + padding as the page body so columns align */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pb-10 md:pb-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/50 mb-5 md:mb-7 font-medium tracking-wider uppercase">
          <Link href="/" className="hover:text-amber-300 transition-colors duration-200">
            Home
          </Link>
          <span className="text-white/30">›</span>
          <Link href="/supplication" className="hover:text-amber-300 transition-colors duration-200">
            Supplications
          </Link>
          <span className="text-white/30">›</span>
          <span className="text-amber-300/80">{title}</span>
        </nav>

        {/* Arabic title */}
        <p className="text-amber-300/70 text-xl md:text-2xl font-light mb-2 text-right md:text-left direction-rtl">
          {arabicTitle}
        </p>

        {/* Main title */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
          {title}
        </h1>

        {/* Gold divider */}
        <div className="w-14 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-5" />

        {/* Description */}
        <p className="text-white/65 text-sm md:text-base max-w-2xl leading-relaxed mb-7">
          {description}
        </p>

        {/* Stats chips */}
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {totalDuas} Supplications
          </span>
        </div>
      </div>
    </section>
  );
};

export default DuaHero;