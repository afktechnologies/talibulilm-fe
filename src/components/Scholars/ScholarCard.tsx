import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import ScholarAvatar from "./ScholarAvatar";
import { excerptOf, formatDates } from "./scholarFormat";
import type { ScholarList } from "@/types/scholar";

interface ScholarCardProps {
  scholar: ScholarList;
}

export default function ScholarCard({ scholar }: ScholarCardProps) {
  const dates = formatDates(scholar);

  return (
    <Link
      href={`/scholars/${scholar.slug}`}
      className="group flex flex-col h-full bg-white border border-[#C2CDD3] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-[transform,box-shadow,border-color] duration-[250ms] ease-in-out hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(0,48,73,0.14)] hover:border-[#DBB346]"
    >
      <div className="flex items-start gap-4 p-5">
        <ScholarAvatar scholar={scholar} size={64} />

        <div className="min-w-0 flex-1">
          <h3
            className={`${primary_font.className} text-[1.05rem] text-[#5C6357] leading-snug line-clamp-2 min-h-[2.6rem]`}
          >
            {scholar.name}
          </h3>
          {scholar.nameAr && (
            <p className={`${roboto.className} text-[0.85rem] text-[#8A6D59] italic mt-0.5`}>
              {scholar.nameAr}
            </p>
          )}
          {scholar.title && (
            <p className={`${roboto.className} text-xs text-[#DBB346] font-medium mt-1`}>
              {scholar.title}
            </p>
          )}
        </div>
      </div>

      {scholar.biographySummary && (
        <p className={`${roboto.className} text-sm text-[#7D887A] leading-relaxed px-5 pb-4`}>
          {excerptOf(scholar.biographySummary)}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 px-5 py-3 border-t border-[#C2CDD3]/60 bg-[#f8f7f4]">
        <span className={`${roboto.className} text-xs text-[#8A6D59]`}>{dates}</span>
        {scholar.region && (
          <span className={`${roboto.className} text-xs text-[#7D887A] italic truncate max-w-[45%]`}>
            {scholar.region}
          </span>
        )}
      </div>
    </Link>
  );
}
