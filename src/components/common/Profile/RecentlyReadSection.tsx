"use client";

import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import { useAppSelector } from "@/store/hooks";
import type { QuranLastReadItem } from "@/store/slice/quranLastReadSlice";
import type { HadithLastReadItem } from "@/store/slice/hadithLastReadSlice";

const cardCls =
  "block bg-white border border-[#C2CDD3] rounded-[10px] p-4 transition-colors duration-200 hover:border-[#DBB346] hover:bg-[rgba(219,179,70,0.06)]";

function QuranLastReadCard({ item }: { item: QuranLastReadItem }) {
  return (
    <Link href={`/quran/${item.surahSlug}?mode=translation&verse=${item.ayahNumber}`} className={cardCls}>
      <p className={`${roboto.className} text-sm text-[#5C6357]`}>
        {item.surahNameEn} <span className="text-[#7D887A]">— Ayah {item.ayahNumber}</span>
      </p>
    </Link>
  );
}

function HadithLastReadCard({ item }: { item: HadithLastReadItem }) {
  const href = item.bookSlug ? `/hadith/${item.bookSlug}/${item.collectionId}` : "/hadith";
  return (
    <Link href={href} className={cardCls}>
      <p className={`${roboto.className} text-sm text-[#5C6357]`}>
        {item.bookName ?? "Hadith"} <span className="text-[#7D887A]">— Chapter {item.chapterNumber}</span>
      </p>
    </Link>
  );
}

export default function RecentlyReadSection() {
  const quranItems = useAppSelector((state) => state.quranLastRead.items);
  const hadithItems = useAppSelector((state) => state.hadithLastRead.items);

  const hasAny = quranItems.length > 0 || hadithItems.length > 0;

  return (
    <div className="flex flex-col gap-6 bg-white border border-[#C2CDD3] rounded-[14px] p-6 sm:p-8">
      <h2 className={`${primary_font.className} text-[1.3rem] text-[#5C6357]`}>Recently Read</h2>

      {!hasAny && <p className={`${roboto.className} text-sm text-[#7D887A]`}>Nothing read yet.</p>}

      {quranItems.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className={`${primary_font.className} text-[1rem] text-[#5C6357]`}>Quran</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quranItems.slice(0, 5).map((item) => (
              <QuranLastReadCard key={item.surahNumber} item={item} />
            ))}
          </div>
        </div>
      )}

      {hadithItems.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className={`${primary_font.className} text-[1rem] text-[#5C6357]`}>Hadith</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hadithItems.slice(0, 5).map((item) => (
              <HadithLastReadCard key={item.bookSlug} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
