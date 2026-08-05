import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PagedResponse<T> {
  data: T[];
  meta?: PaginationMeta;
}

interface UseInfinitePagedListOptions<T> {
  /** Base query key — the current page number is appended internally. */
  queryKey: QueryKey;
  fetchPage: (page: number, limit: number) => Promise<PagedResponse<T>>;
  limit?: number;
}

/**
 * Backs a "load more on scroll" list: accumulates pages into a flat array,
 * triggers the next page when a sentinel element scrolls into view, and
 * silently prefetches the page after that into the query cache so the
 * *next* scroll-triggered fetch resolves instantly instead of showing a
 * network-bound gap.
 */
export function useInfinitePagedList<T>({
  queryKey,
  fetchPage,
  limit = 10,
}: UseInfinitePagedListOptions<T>) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const appendedPagesRef = useRef<Set<number>>(new Set());

  // Callers pass `queryKey` as an array literal, so it's a new reference on
  // every render — freeze the first one for this hook instance so derived
  // keys stay stable rather than churning every render.
  const baseKeyRef = useRef(queryKey);
  const pageKey = (p: number) => [...baseKeyRef.current, "page", p, limit];

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: pageKey(page),
    queryFn: () => fetchPage(page, limit),
    staleTime: 5 * 60 * 1000,
  });

  // Append each page's rows exactly once, in order — guards against
  // StrictMode's double-invoke and re-renders re-triggering an append.
  useEffect(() => {
    if (!data || appendedPagesRef.current.has(page)) return;
    appendedPagesRef.current.add(page);
    setItems((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
    setHasMore(Boolean(data.meta?.hasNextPage));
  }, [data, page]);

  // Preload the following page in the background, ahead of the user
  // actually reaching it, so scrolling never has to wait on the network.
  useEffect(() => {
    if (!data?.meta?.hasNextPage) return;
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: pageKey(nextPage),
      queryFn: () => fetchPage(nextPage, limit),
      staleTime: 5 * 60 * 1000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, page, limit, fetchPage, queryClient]);

  // `inView` is a live boolean (not just an enter/exit event), so this
  // effect re-checks the condition on every relevant state change — in
  // particular when `isFetching` flips back to false after a page loads
  // while the sentinel is *still* in view (e.g. a short page didn't push
  // it below the fold). An onChange-only approach only fires on the
  // enter/exit transition itself, so it would miss exactly that case and
  // require the user to scroll away and back to get another chance.
  const { ref: sentinelRef, inView } = useInView({ rootMargin: "400px 0px" });

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isFetching]);

  return {
    items,
    isInitialLoading: isLoading && page === 1,
    isFetchingMore: isFetching && page > 1,
    hasMore,
    sentinelRef,
    error,
  };
}
