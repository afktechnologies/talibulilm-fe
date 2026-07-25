"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  era: string;
};

interface ScholarsTimelineProps {
  scholars: Scholar[];
}

const ScholarsTimeline = ({ scholars }: ScholarsTimelineProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Sort chronologically (oldest first)
  const sortedScholars = [...scholars].sort((a, b) => {
    const yearA = parseInt(a.birthHijri);
    const yearB = parseInt(b.birthHijri);
    return yearA - yearB;
  });

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline Center Line */}
      <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#8c6f4d] to-transparent hidden lg:block" />

      <div className="space-y-16">
        {sortedScholars.map((scholar, index) => {
          const isEven = index % 2 === 0;
          const isHovered = hoveredId === scholar.id;

          return (
            <div
              key={scholar.id}
              className={`group relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              onMouseEnter={() => setHoveredId(scholar.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Year Marker */}
              <div className="absolute left-1/2 -translate-x-1/2 -mt-3 z-20 hidden lg:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full border-4 border-[#f8f5f0] bg-[#8c6f4d] shadow-md" />
                <div className="text-[11px] font-mono tracking-widest text-[#8c6f4d] mt-2">
                  {scholar.birthHijri}H
                </div>
              </div>

              {/* Card */}
              <Link
                href={`/scholars/${scholar.slug}`}
                className="flex-1 w-full lg:w-auto group-hover:scale-[1.015] transition-all duration-500"
              >
                <div className="bg-white border border-[#d4c3a8] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 relative">
                  {/* Subtle parchment texture overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e8d9b8_0.8px,transparent_1px)] [background-size:4px_4px] opacity-30 pointer-events-none" />

                  <div className="flex flex-col md:flex-row">
                    {/* Portrait */}
                    <div className="relative w-full md:w-48 h-56 md:h-auto bg-[#2c2118]">
                      <Image
                        src={scholar.image}
                        alt={scholar.fullName}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      {/* Vintage overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-7 md:p-8 flex flex-col">
                      {/* Category Badge */}
                      <div className="inline-flex w-fit px-4 py-1 text-[10px] font-medium tracking-widest border border-[#8c6f4d]/30 text-[#8c6f4d] bg-[#f8f5f0] rounded mb-4">
                        {scholar.category}
                      </div>

                      {/* Name */}
                      <h3 className="font-serif text-2xl leading-tight text-[#2c2118] mb-1 group-hover:text-[#8c6f4d] transition-colors">
                        {scholar.fullName}
                      </h3>

                      {scholar.nameArabic && (
                        <p className="text-[#8c6f4d] text-lg font-light mb-3">
                          {scholar.nameArabic}
                        </p>
                      )}

                      {/* Years */}
                      <div className="text-sm text-[#6b5c47] mb-4">
                        {scholar.birthHijri} – {scholar.deathHijri} H /{" "}
                        {scholar.birthCE} – {scholar.deathCE} CE
                      </div>

                      {/* Tagline */}
                      <p className="text-[#5c4e3f] leading-relaxed line-clamp-3">
                        {scholar.tagline}
                      </p>

                      {/* Read more indicator */}
                      <div className="mt-auto pt-6 flex items-center text-xs uppercase tracking-widest text-[#8c6f4d] font-medium group-hover:gap-2 transition-all">
                        View Full Profile
                        <span className="text-base leading-none translate-y-px">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Mobile Year */}
              <div className="lg:hidden text-center text-xs font-mono text-[#8c6f4d] tracking-widest">
                {scholar.birthHijri}H
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Ornament */}
      <div className="flex justify-center mt-20">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#8c6f4d]/40 to-transparent" />
      </div>
    </div>
  );
};

export default ScholarsTimeline;