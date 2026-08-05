import { useEffect } from "react";
import { useInfinitePagedList } from "@/services/hooks/useInfinitePagedList";
import { quranApi } from "@/services/api/endpoints/quran";
import JuzCard from "../Cards/juzCard";
import { JuzList } from "@/types/surah";
import JuzAndPageSkeleton from "@/components/skeleton/quran/juzAndPageSkeleton";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

interface JuzContentProps {
  searchQuery: string;
  onResultsChange: (hasResults: boolean) => void;
}

const JUZ_PAGE_LIMIT = 10;

const JuzContent = ({ searchQuery, onResultsChange }: JuzContentProps) => {
  const { items, isInitialLoading, isFetchingMore, hasMore, sentinelRef, error } =
    useInfinitePagedList<JuzList>({
      queryKey: ["juz", "infinite", searchQuery || "browse"],
      fetchPage: (page, limit) => quranApi.getJuzPaged(page, limit, searchQuery || undefined),
      limit: JUZ_PAGE_LIMIT,
    });

  useEffect(() => {
    if (!isInitialLoading) onResultsChange(items.length > 0);
  }, [items, isInitialLoading, onResultsChange]);

  if (isInitialLoading) return <JuzAndPageSkeleton />;

  if (error)
    return (
      <div>
        <FallbackError />
      </div>
    );

  return (
    <>
      <JuzCard juzData={items} />

      {/* The sentinel itself has zero visual footprint so the layout below
          the list is unchanged from before pagination existed; the spinner
          only takes up space while an additional page is actually loading.
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

export default JuzContent;
