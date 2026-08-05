import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import ScholarAvatar from "../ScholarAvatar";
import { formatDates } from "../scholarFormat";
import type { ScholarList } from "@/types/scholar";

/** Dense, scannable view — one compact row per scholar with a left rail,
 *  minimizing vertical scroll for sections with many entries. */
export default function ListView({ scholars }: { scholars: ScholarList[] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#DBB346]/30" />
      <ul className="flex flex-col gap-1">
        {scholars.map((scholar) => (
          <li key={scholar.id} className="relative">
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-[#DBB346] border-2 border-white shadow-[0_0_0_2px_rgba(219,179,70,0.25)]" />
            <Link
              href={`/scholars/${scholar.slug}`}
              className="group flex items-center gap-3 py-2.5 px-3 rounded-xl transition-colors duration-150 hover:bg-[#f8f7f4]"
            >
              <ScholarAvatar scholar={scholar} size={40} textSizeClassName="text-sm" />
              <div className="min-w-0 flex-1 flex items-center justify-between gap-3 max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-0.5">
                <div className="min-w-0">
                  <p
                    className={`${primary_font.className} text-[0.95rem] text-[#5C6357] truncate transition-colors duration-150 group-hover:text-[#8A6D59]`}
                  >
                    {scholar.name}
                  </p>
                  {scholar.title && (
                    <p className={`${roboto.className} text-xs text-[#8A6D59] truncate`}>{scholar.title}</p>
                  )}
                </div>
                <span className={`${roboto.className} text-xs text-[#7D887A] flex-shrink-0 whitespace-nowrap`}>
                  {formatDates(scholar)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
