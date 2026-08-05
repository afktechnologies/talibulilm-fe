import { useEffect, useMemo } from "react";
import Link from "next/link";
import SurahCard from "../Cards/surahCard";
import { useInfinitePagedList } from "@/services/hooks/useInfinitePagedList";
import { quranApi } from "@/services/api/endpoints/quran";
import { SurahList } from "@/types/surah";
import SurahSkeleton from "@/components/skeleton/quran/surahSkeleton";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

interface SurahContentProps {
  searchQuery: string;
  onResultsChange: (hasResults: boolean) => void;
}

const SURAH_PAGE_LIMIT = 10;

const SurahContent = ({ searchQuery, onResultsChange }: SurahContentProps) => {
  const { items, isInitialLoading, isFetchingMore, hasMore, sentinelRef, error } =
    useInfinitePagedList<SurahList>({
      queryKey: ["surahs", "infinite", searchQuery || "browse"],
      fetchPage: (page, limit) => quranApi.getSurahsPaged(page, limit, searchQuery || undefined),
      limit: SURAH_PAGE_LIMIT,
    });

  // The backend already returns exactly the matching rows for `searchQuery`
  // — no client-side filtering needed, just project the fields SurahCard uses.
  const displayData = useMemo(
    () =>
      items.map((surah) => ({
        surahNumber: surah.surahNumber,
        nameEn: surah.nameEn,
        nameEnMeaning: surah.nameEnMeaning,
        verseCount: surah.verseCount,
        juzNumber: surah.juzNumber,
        slug: surah.slug,
      })),
    [items]
  );

  useEffect(() => {
    if (!isInitialLoading) onResultsChange(displayData.length > 0);
  }, [displayData, isInitialLoading, onResultsChange]);

  if (isInitialLoading) return <SurahSkeleton />;
  if (error)
    return (
      <div>
        <FallbackError />
      </div>
    );

  return (
    <>
      <div className="w-[95%] grid grid-cols-1 gap-6 mt-4 max-[1000px]:grid-cols-2 max-[1000px]:gap-4 max-[600px]:grid-cols-1 max-[600px]:gap-4">
        {displayData.map((item) => (
          <Link href={`/quran/${item.slug}`} key={item.surahNumber}>
            <SurahCard item={item} />
          </Link>
        ))}
      </div>

      {/* The sentinel itself has zero visual footprint; the spinner only
          takes up space while an additional page is actually loading.
          Pagination now works identically whether browsing or searching,
          since search results come back paginated from the server too. */}
      {hasMore && <div ref={sentinelRef} aria-hidden />}
      {isFetchingMore && (
        <div className="w-full flex justify-center py-6">
          <svg
            className="w-5 h-5 animate-spin text-[#7D887A]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default SurahContent;
