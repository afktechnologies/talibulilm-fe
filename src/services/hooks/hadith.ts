import { useQuery } from "@tanstack/react-query";
import { hadithApi } from "../api/endpoints/index";

export const useHadithBooks = (options = {}) => {
  return useQuery({
    queryKey: ["hadith-books"],
    queryFn: () => hadithApi.getHadithBooks(),
    select: (response) => response.data,
    ...options,
  });
};

export const useHadithBookBySlug = (slug: string, options = {}) => {
  return useQuery({
    queryKey: ["hadith-books", slug],
    queryFn: () => hadithApi.getHadithBookBySlug(slug),
    select: (response) => response.data,
    ...options,
  });
}

export const useHadithBookCollections = (options = {}) => {
  return useQuery({
    queryKey: ["hadith-collections"],
    queryFn: () => hadithApi.getHadithBookCollections(),
    select: (response) => response.data,
    ...options,
  });
};

export const useHadithCollectionBySlug = (slug: string, options = {}) => {
  return useQuery({
    queryKey: ["hadith-collections", slug],
    queryFn: () => hadithApi.getHadithCollectionBySlug(slug),
    select: (response) => response.data,
    ...options,
  });
};


export const useHadiths = (options = {}) => {
  return useQuery({
    queryKey: ["hadiths"],
    queryFn: () => hadithApi.getHadiths(),
    select: (response) => response.data,
    ...options,
  });

};

export const useHadithByCollectionId = (collectionId: number, options = {}) => {
  return useQuery({
    queryKey: ["hadiths", collectionId],
    queryFn: () => hadithApi.getHadithByCollectionId(collectionId),
    select: (response) => response.data,
    ...options,
  });
}

export const useHadithsRandom = (limit: number = 1, options = {}) => {
  return useQuery({
    queryKey: ["hadiths", limit],
    queryFn: () => hadithApi.getHadithsRandom(limit),
    select: (response) => response.data,
    ...options,
  });
};

export const useHadithsOfTheDay = ( options = {}) => {
  // Keying on today's date means a new calendar day (or a fresh page load
  // after midnight) naturally requests fresh data instead of serving a
  // stale cached "yesterday" response for the rest of the session.
  const today = new Date().toISOString().slice(0, 10);
  return useQuery({
    queryKey: ["hadiths", "daily", today],
    queryFn: () => hadithApi.getHadithsOfTheDay(),
    select: (response) => response.data,
    ...options,
  });
};

export const useCollectionById = (collectionId: number,  options = {}) => {
  return useQuery({
    queryKey: ["hadith-books", collectionId],
    queryFn: () => hadithApi.getCollectionById(collectionId),
    select: (response) => response.data,
    ...options,
  });
};