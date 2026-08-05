import type { ArticleList } from "@/types/article";

const RELATED_LIMIT = 4;

export interface ArticleRelations {
  related: ArticleList[];
  previous: ArticleList | null;
  next: ArticleList | null;
}

function scoreRelevance(current: ArticleList, candidate: ArticleList): number {
  let score = 0;
  if (current.category && candidate.category === current.category) score += 1;
  const currentTags = new Set(current.tags ?? []);
  const tagOverlap = (candidate.tags ?? []).filter((tag) => currentTags.has(tag)).length;
  score += tagOverlap * 2;
  return score;
}

function byRecencyDesc(a: ArticleList, b: ArticleList): number {
  const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
  const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
  return dateB - dateA;
}

/**
 * Related Articles (by category/tag overlap, falling back to most-recent so
 * the section is never sparse) + Prev/Next neighbors in the listing's
 * newest-first order. Computed client-side-free, server-rendered from one
 * unpaginated fetch (`articleApi.getAllArticles`) — no new backend endpoint
 * needed since article counts are small and bounded.
 */
export function computeArticleRelations(current: ArticleList, all: ArticleList[]): ArticleRelations {
  const others = all.filter((article) => article.id !== current.id);

  const scored = others
    .map((article) => ({ article, score: scoreRelevance(current, article) }))
    .sort((a, b) => b.score - a.score || byRecencyDesc(a.article, b.article));

  const related: ArticleList[] = [];
  const usedIds = new Set<number>();

  for (const { article, score } of scored) {
    if (related.length >= RELATED_LIMIT || score === 0) break;
    related.push(article);
    usedIds.add(article.id);
  }

  if (related.length < RELATED_LIMIT) {
    const filler = others.filter((article) => !usedIds.has(article.id)).sort(byRecencyDesc);
    for (const article of filler) {
      if (related.length >= RELATED_LIMIT) break;
      related.push(article);
    }
  }

  const chronological = [...all].sort(byRecencyDesc);
  const currentIndex = chronological.findIndex((article) => article.id === current.id);
  const previous = currentIndex > 0 ? chronological[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < chronological.length - 1
      ? chronological[currentIndex + 1]
      : null;

  return { related, previous, next };
}
