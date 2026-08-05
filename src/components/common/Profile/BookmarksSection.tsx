"use client";

import { useMemo } from "react";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import { useAppSelector } from "@/store/hooks";
import { useAllSurahs } from "@/services/hooks/quran";
import type { AyahListWithTranslation } from "@/types/surah";
import type { HadithItemList } from "@/types/hadith";
import type { QnaEntry } from "@/components/Qna/QnaCard";
import type { DuaEntry } from "@/components/Supplication/Dua/DuaCard";

const cardCls =
  "block bg-white border border-[#C2CDD3] rounded-[10px] p-4 transition-colors duration-200 hover:border-[#DBB346] hover:bg-[rgba(219,179,70,0.06)]";

function BookmarkGroup({
  title,
  browseHref,
  count,
  children,
}: {
  title: string;
  browseHref: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className={`${primary_font.className} text-[1.1rem] text-[#5C6357]`}>
          {title} <span className="text-[#7D887A] text-sm font-normal">({count})</span>
        </h3>
        <Link href={browseHref} className={`${roboto.className} text-xs text-[#8A6D59] hover:underline`}>
          Browse all
        </Link>
      </div>

      {count === 0 ? (
        <p className={`${roboto.className} text-sm text-[#7D887A]`}>No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
      )}
    </div>
  );
}

function QuranBookmarkCard({
  ayah,
  surahSlug,
}: {
  ayah: AyahListWithTranslation;
  surahSlug: string | undefined;
}) {
  // Same route/params/highlight-scroll mechanism as RecentlyReadSection's
  // Quran cards (`mode=translation&verse=`) — falls back to the general
  // Quran page only while the Surah-number→slug lookup is still loading.
  const href = surahSlug
    ? `/quran/${surahSlug}?mode=translation&verse=${ayah.ayahNumber}`
    : "/quran";

  return (
    <Link href={href} className={cardCls}>
      <p className={`${roboto.className} text-xs text-[#8A6D59] mb-1`}>
        Surah {ayah.surahNumber}:{ayah.ayahNumber}
      </p>
      <p className={`${roboto.className} text-sm text-[#5C6357] line-clamp-2`}>
        {ayah.translations?.[0]?.translationText ?? ayah.arabicText}
      </p>
    </Link>
  );
}

function HadithBookmarkCard({ hadith }: { hadith: HadithItemList }) {
  const bookSlug = hadith.hadithCollection?.hadithBook?.slug;
  const href = bookSlug ? `/hadith/${bookSlug}/${hadith.collectionId}` : "/hadith";
  return (
    <Link href={href} className={cardCls}>
      <p className={`${roboto.className} text-xs text-[#8A6D59] mb-1`}>{hadith.ref}</p>
      <p className={`${roboto.className} text-sm text-[#5C6357] line-clamp-2`}>{hadith.bodyEn}</p>
    </Link>
  );
}

function QnaBookmarkCard({ entry }: { entry: QnaEntry }) {
  return (
    <Link href={`/qna#question-${entry.id}`} className={cardCls}>
      <p className={`${roboto.className} text-xs text-[#8A6D59] mb-1`}>{entry.categoryLabel}</p>
      <p className={`${roboto.className} text-sm text-[#5C6357] line-clamp-2`}>{entry.question}</p>
    </Link>
  );
}

function SupplicationBookmarkCard({ dua }: { dua: DuaEntry }) {
  return (
    <Link href="/supplication" className={cardCls}>
      <p className={`${roboto.className} text-xs text-[#8A6D59] mb-1`}>{dua.reference}</p>
      <p className={`${roboto.className} text-sm text-[#5C6357] line-clamp-2`}>{dua.title}</p>
    </Link>
  );
}

export default function BookmarksSection() {
  const quranItems = useAppSelector((state) => state.quranBookmark.items);
  const hadithItems = useAppSelector((state) => state.hadithBookmark.items);
  const qnaItems = useAppSelector((state) => state.qnaBookmark.items);
  const supplicationItems = useAppSelector((state) => state.supplicationBookmark.items);

  // Bookmarked ayahs only carry surahNumber (not a slug) — resolve it the
  // same way the reading page's own Surah picker does, via the full Surah
  // list, rather than changing what gets stored at bookmark-time.
  const { data: allSurahs } = useAllSurahs();
  const slugBySurahNumber = useMemo(
    () => new Map(allSurahs?.map((surah) => [surah.surahNumber, surah.slug])),
    [allSurahs]
  );

  return (
    <div className="flex flex-col gap-8 bg-white border border-[#C2CDD3] rounded-[14px] p-6 sm:p-8">
      <h2 className={`${primary_font.className} text-[1.3rem] text-[#5C6357]`}>Bookmarks</h2>

      <BookmarkGroup title="Quran" browseHref="/quran" count={quranItems.length}>
        {quranItems.map((ayah) => (
          <QuranBookmarkCard
            key={ayah.id}
            ayah={ayah}
            surahSlug={slugBySurahNumber.get(ayah.surahNumber)}
          />
        ))}
      </BookmarkGroup>

      <BookmarkGroup title="Hadith" browseHref="/hadith" count={hadithItems.length}>
        {hadithItems.map((hadith) => (
          <HadithBookmarkCard key={hadith.id} hadith={hadith} />
        ))}
      </BookmarkGroup>

      <BookmarkGroup title="Q&A" browseHref="/qna" count={qnaItems.length}>
        {qnaItems.map((entry) => (
          <QnaBookmarkCard key={entry.id} entry={entry} />
        ))}
      </BookmarkGroup>

      <BookmarkGroup title="Supplications" browseHref="/supplication" count={supplicationItems.length}>
        {supplicationItems.map((dua) => (
          <SupplicationBookmarkCard key={dua.id} dua={dua} />
        ))}
      </BookmarkGroup>
    </div>
  );
}
