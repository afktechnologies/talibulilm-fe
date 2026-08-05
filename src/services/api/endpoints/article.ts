import { apiClient } from "../client";
import { ArticleResponse, ArticleSingleResponse } from "@/types/article";

export const articleApi = {
  // Public site only ever shows published articles — draft/archived stay
  // admin-only via the same `/articles` endpoint (see backend ArticlesController).
  getArticlesPaged: (page: number, limit: number = 9) =>
    apiClient
      .get(`articles?page=${page}&limit=${limit}&status=PUBLISHED`)
      .json<ArticleResponse>(),

  getArticleBySlug: (slug: string) =>
    apiClient.get(`articles/slug/${slug}`).json<ArticleSingleResponse>(),

  // Full, unpaginated published list — used server-side by the article
  // detail page to compute Related Articles (by tag/category overlap) and
  // Prev/Next navigation. Article counts are small and bounded (same
  // reasoning as `scholarApi.getAllScholars`), so one unpaginated fetch is
  // simpler and cheaper than N ad-hoc filtered queries.
  getAllArticles: () =>
    apiClient.get(`articles?limit=0&status=PUBLISHED`).json<ArticleResponse>(),
};
