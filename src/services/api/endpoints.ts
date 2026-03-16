// import { AyahResponse, AyahWithTranslationResponse, JuzResponse, PageResponse, RandomAyahResponse, SurahResponse } from "@/types/surah";
// import { apiClient } from "./client";
// import { HadithBookCollection, HadithBooks, HadithItem, HadithResponse } from "@/types/hadith";

// export const api = {
//   // All Surahs List
//   getSurahs: () => apiClient.get("surahs").json<SurahResponse>(),
//   //All Juz List
//   getSurahByJuz: () => apiClient.get("juz").json<JuzResponse>(),

//   getJuzBySurahSlug: (slug: string) => apiClient.get(`juz/surah/slug/${slug}`).json<JuzResponse>(),
//   //All Juz List
//   // getSurahByPage: () => apiClient.get("page").json<PageResponse>(),

//   getSurahByPage: (page: number = 1, limit: number = 0) => 
//     apiClient.get(`page?page=${page}&limit=${limit}`).json<PageResponse>(),

//    getAyahRandom: () =>
//     apiClient.get("ayahs/random").json<RandomAyahResponse>(),

//    getAyahBySlug: (slug: string) =>
//     apiClient.get(`/ayahs/surah/slug/${slug}`).json<AyahResponse>(),

//    getAyahTranslationBySlug: (slug: string, page: number | undefined = 1, limit: number | undefined = 0) =>
//     apiClient.get(`ayahs/surah/slug/${slug}/translation?page=${page}&limit=${limit}`).json<AyahWithTranslationResponse>(),

//    getAyahTranslationBySlugPaginated: (
//   slug: string,
//   page: number = 1,
//   limit: number = 10
// ) =>
//   apiClient
//     .get(`ayahs/surah/slug/${slug}/translation?page=${page}&limit=${limit}`)
//     .json<AyahWithTranslationResponse>(),



//   //All Hadith Book List
//   getHadithBooks: () => apiClient.get("hadith-books").json<HadithBooks>(),

//   getHadithBookBySlug: (slug: string) =>
//     apiClient.get(`hadith-books/slug/${slug}`).json<HadithBooks>(),

//   //Hadith Book Collection List
//   getHadithBookCollections: () =>
//     apiClient.get("hadith-collections").json<HadithBookCollection>(),

//   getHadithCollectionBySlug: (slug: string) =>
//     apiClient
//       .get(`hadith-collections/book/slug/${slug}`)
//       .json<HadithBookCollection>(),

//   //Hadith List
//   getHadiths: () => apiClient.get("hadiths").json<HadithItem>(),

//   getHadithByCollectionId: (collectionId: number) =>
//     apiClient.get(`hadiths/collection/${collectionId}`).json<HadithItem>(),

//   getHadithsRandom: (limit: number = 1) =>
//     apiClient.get(`hadiths/random?limit=${limit}`).json<HadithItem>(),

//   getHadithsOfTheDay: () =>
//     apiClient.get(`hadiths/random`).json<HadithResponse>(),

// };
