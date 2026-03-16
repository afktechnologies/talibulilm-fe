import { apiClient } from "../client";
import {
  HadithBookCollection,
  HadithBookCollection2,
  HadithBooks,
  HadithItem,
  HadithResponse,
} from "@/types/hadith";

export const hadithApi = {
  // All Hadith Book List
  getHadithBooks: () => apiClient.get("hadith-books").json<HadithBooks>(),

  getHadithBookBySlug: (slug: string) =>
    apiClient.get(`hadith-books/slug/${slug}`).json<HadithBooks>(),

  // Hadith Book Collection List
  getHadithBookCollections: () =>
    apiClient.get("hadith-collections").json<HadithBookCollection>(),

  getHadithCollectionBySlug: (slug: string) =>
    apiClient
      .get(`hadith-collections/book/slug/${slug}`)
      .json<HadithBookCollection>(),

  // Hadith List
  getHadiths: () => apiClient.get("hadiths").json<HadithItem>(),

  getHadithByCollectionId: (collectionId: number) =>
    apiClient.get(`hadiths/collection/${collectionId}`).json<HadithItem>(),

  getHadithsRandom: (limit: number = 1) =>
    apiClient.get(`hadiths/random?limit=${limit}`).json<HadithItem>(),

  getHadithsOfTheDay: () =>
    apiClient.get(`hadiths/random`).json<HadithResponse>(),

  getCollectionById: (collectionId: number) => apiClient.get(`hadith-collections/${collectionId}`).json<HadithBookCollection2>()
};
