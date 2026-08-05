/** Mirrors talibulilm-be `src/articles/entities/article.entity.ts`. */
export enum ArticleStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface ArticleList {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  author: string | null;
  category: string | null;
  status: ArticleStatus;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  tags: string[] | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleResponse {
  message: string;
  code: number;
  data: ArticleList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ArticleSingleResponse {
  message: string;
  code: number;
  data: ArticleList;
}
