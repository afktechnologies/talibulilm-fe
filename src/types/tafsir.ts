import { BookList } from "./book";

export interface TafsirList {
  id: string;
  ayahId: string;
  bookId: number;
  book: BookList;
  languageCode: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  surahNumber?: number | null;
  ayahNumber?: number | null;
  surahNameEn?: string | null;
  surahNameAr?: string | null;
}

export interface TafsirResponse {
  message: string;
  code: number;
  data: TafsirList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
