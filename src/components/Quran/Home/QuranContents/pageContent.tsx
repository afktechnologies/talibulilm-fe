import { useEffect } from "react";
import { useInfinitePagedList } from "@/services/hooks/useInfinitePagedList";
import { quranApi } from "@/services/api/endpoints/quran";
import { PageList } from "@/types/surah";
import PageCard from "../Cards/pageCard";
import JuzAndPageSkeleton from "@/components/skeleton/quran/juzAndPageSkeleton";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

interface PageContentProps {
  searchQuery: string;
  onResultsChange: (hasResults: boolean) => void;
}

const PAGE_LIMIT = 10;

const PageContent = ({ searchQuery, onResultsChange }: PageContentProps) => {
  const { items, isInitialLoading, isFetchingMore, hasMore, sentinelRef, error } =
    useInfinitePagedList<PageList>({
      queryKey: ["page", "infinite", searchQuery || "browse"],
      fetchPage: (page, limit) => quranApi.getPagesPaged(page, limit, searchQuery || undefined),
      limit: PAGE_LIMIT,
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

  const grouped = Object.entries(
    items.reduce<Record<string, PageList[]>>((groups, item) => {
      const surah = item.surahInfo.nameEn;
      if (!groups[surah]) groups[surah] = [];
      groups[surah].push(item);
      return groups;
    }, {})
  );

  return (
    <div className="w-full flex flex-col gap-4 px-5 m-0 max-[780px]:py-5 max-[780px]:px-[10px] max-[530px]:p-0">
      {grouped.map(([surah, items]) => (
        <div key={surah} style={{ marginTop: "2rem" }}>
          {items.map((item, index) => (
            <div key={item.id} style={{ marginTop: index === 0 ? "0" : ".8rem" }}>
              <PageCard item={item} />
            </div>
          ))}
        </div>
      ))}

      {/* The sentinel itself has zero visual footprint; the spinner only
          takes up space while an additional page is actually loading.
          Pagination now works identically whether browsing or searching,
          since search results come back paginated from the server too. */}
      {hasMore && <div ref={sentinelRef} aria-hidden />}
      {isFetchingMore && (
        <div className="w-full flex justify-center py-6">
          <svg className="w-5 h-5 animate-spin text-[#7D887A]" fill="none" viewBox="0 0 24 24">
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
    </div>
  );
};

export default PageContent;
