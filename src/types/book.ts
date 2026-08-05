export enum BookCategory {
  TAFSIR = "TAFSIR",
}

export interface BookList {
  id: number;
  nameEn: string;
  nameAr: string | null;
  slug: string;
  category: BookCategory;
  author: string | null;
  about: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookResponse {
  message: string;
  code: number;
  data: BookList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
