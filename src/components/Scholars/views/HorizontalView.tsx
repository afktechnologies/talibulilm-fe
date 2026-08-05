import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import ScholarAvatar from "../ScholarAvatar";
import { formatDates } from "../scholarFormat";
import type { ScholarList } from "@/types/scholar";

/** Horizontally scroll-snapping row — the most compact-per-vertical-pixel
 *  view, best for scanning a large generation without a long page scroll. */
export default function HorizontalView({ scholars }: { scholars: ScholarList[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {scholars.map((scholar) => (
        <Link
          key={scholar.id}
          href={`/scholars/${scholar.slug}`}
          className="group snap-start flex-shrink-0 w-[190px] flex flex-col items-center text-center bg-white border border-[#C2CDD3] rounded-2xl p-4 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,48,73,0.12)] hover:border-[#DBB346]"
        >
          <ScholarAvatar scholar={scholar} size={72} className="mb-3" />
          <p className={`${primary_font.className} text-[0.95rem] text-[#5C6357] leading-snug line-clamp-2`}>
            {scholar.name}
          </p>
          {scholar.title && (
            <p className={`${roboto.className} text-xs text-[#DBB346] font-medium mt-1 line-clamp-1`}>
              {scholar.title}
            </p>
          )}
          <span className={`${roboto.className} text-[0.7rem] text-[#8A6D59] mt-2`}>{formatDates(scholar)}</span>
        </Link>
      ))}
    </div>
  );
}
