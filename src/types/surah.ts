export interface SurahList {
  id: number;
  surahNumber: number;
  revelationNumber: number;
  nameAr: string;
  nameEn: string;
  nameEnMeaning: string;
  slug:string;
  revelationType: string;
  verseCount: number;
  juzNumber:number;
  startingPage: number;
  endingPage: number;
  createdAt: string;
  updatedAt: string;
}

export interface SurahResponse {
  message: string;
  code: number;
  data: SurahList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface AyahList {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  wordsCount: number | null;
  pageNumber: number;
  juzNumber: number;
  createdAt: string;  
  updatedAt: string;  
}

export interface AyahListWithTranslation {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  wordsCount: number | null;
  juzNumber: number;
  pageNumber: number;
  createdAt: string;  
  updatedAt: string;
  translations: TranslationList[];
}

export interface AyahResponse {
  message: string;
  code: number;
  data: AyahList[];
}

export interface AyahSingleResponse {
  message: string;
  code: number;
  data: AyahList;
}

export interface AyahWithTranslationResponse {
  message: string;
  code: number;
  data: AyahListWithTranslation[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface JuzList {
  id: number;
  juzNumber: number;
  juzNameAr:string;
  surahNumber: number;
  ayahNumber: number[];
  surahInfo: SurahList;
}

export interface JuzResponse {
  message: string;
  code: number;
  data: JuzList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface PageList {
  id: number;
  pageNumber: number;
  surahNumber: number;
  ayahNumber: number[];// tuple: start and end ayah
  surahInfo: SurahList;
}

export interface PageResponse {
  message: string;
  code: number;
  data: PageList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface TranslationList {
  ayahId: string;
  translatorName: string | null;
  translationText: string;
}

export interface AyahRandomList {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  juzNumber: number;
  pageNumber: number;
  arabicText: string;
  wordsCount: number | null;
  createdAt: string;  
  updatedAt: string;  
  translations: TranslationList[];
}

export interface RandomAyahResponse {
  message: string;
  code: number;
  data: AyahRandomList;
}
