"use client";
import Image from "next/image";
import Link from "next/link";

type Scholar = {
  id: number;
  slug: string;
  fullName: string;
  nameArabic?: string;
  birthHijri: string;
  birthCE: string;
  deathHijri: string;
  deathCE: string;
  tagline: string;
  category: string;
  image: string;
};

interface FeaturedScholarsProps {
  scholars: Scholar[];
}

const FeaturedScholars = ({ scholars }: FeaturedScholarsProps) => {
  return (
    <section className="mb-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[#8c6f4d] text-xs tracking-[2px] font-medium">CURATED SELECTION</span>
          <h2 className="font-serif text-4xl text-[#2c2118] mt-2">Illustrious Luminaries</h2>
        </div>
        <Link
          href="#timeline"
          className="hidden sm:flex items-center gap-2 text-sm text-[#8c6f4d] hover:text-[#2c2118] transition-colors group"
        >
          View Complete Timeline
          <span className="group-hover:translate-x-1 transition">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {scholars.map((scholar) => (
          <Link
            key={scholar.id}
            href={`/scholars/${scholar.slug}`}
            className="group"
          >
            <div className="bg-white border border-[#d4c3a8] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col">
              {/* Portrait */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={scholar.image}
                  alt={scholar.fullName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Vintage cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-5 right-5 px-4 py-1 text-[10px] font-medium tracking-widest bg-white/90 text-[#2c2118] rounded-full border border-[#d4c3a8]">
                  {scholar.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex-1 flex flex-col">
                <div className="text-xs text-[#8c6f4d] font-mono tracking-wider mb-2">
                  {scholar.birthHijri}H — {scholar.deathHijri}H
                </div>

                <h3 className="font-serif text-2xl leading-tight text-[#2c2118] group-hover:text-[#8c6f4d] transition-colors duration-300">
                  {scholar.fullName}
                </h3>

                {scholar.nameArabic && (
                  <p className="text-[#8c6f4d] text-[17px] mt-1 mb-4 font-light">
                    {scholar.nameArabic}
                  </p>
                )}

                <p className="text-[#5c4e3f] leading-relaxed text-[15px] mt-2 line-clamp-3 flex-1">
                  {scholar.tagline}
                </p>

                <div className="mt-6 pt-6 border-t border-[#e8d9b8] text-xs uppercase tracking-widest text-[#8c6f4d] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explore Legacy
                  <span>↗</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedScholars;