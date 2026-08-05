"use client";

import { useInfinitePagedList } from "@/services/hooks/useInfinitePagedList";
import { articleApi } from "@/services/api/endpoints/article";
import ArticleCard from "./ArticleCard";
import ArticleCardSkeleton from "@/components/skeleton/articleCardSkeleton";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import { primary_font, roboto } from "@/app/font/font";
import type { ArticleList } from "@/types/article";

const ARTICLES_PAGE_LIMIT = 9;

export default function ArticlesList() {
  const { items, isInitialLoading, isFetchingMore, hasMore, sentinelRef, error } =
    useInfinitePagedList<ArticleList>({
      queryKey: ["articles", "infinite"],
      fetchPage: articleApi.getArticlesPaged,
      limit: ARTICLES_PAGE_LIMIT,
    });

  if (isInitialLoading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
        <ArticleCardSkeleton />
      </div>
    );
  }

  if (error) {
    return <FallbackError />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-2 py-20 px-4">
        <h3 className={`${primary_font.className} text-[1.3rem] text-[#5C6357]`}>
          No articles published yet
        </h3>
        <p className={`${roboto.className} text-sm text-[#7D887A]`}>
          Check back soon — new articles will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Sentinel has zero visual footprint; the spinner only takes up
          space while an additional page is actually loading. */}
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
}
