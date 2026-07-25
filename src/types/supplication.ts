export interface SupplicationCategoryList {
  id: number;
  name: string;
  slug: string;
  nameAr?: string;
  description?: string;
  tags?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplicationCategoryListResponse {
  message: string;
  code: number;
  data: SupplicationCategoryList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SupplicationCategoryResponse {
  message: string;
  code: number;
  data: SupplicationCategoryList;
}

export interface SupplicationList {
  id: number;
  categoryId: number;
  category?: SupplicationCategoryList;
  title: string;
  slug: string;
  arText: string;
  counter: number;
  benefit?: string;
  reference?: string;
  similarSupplications?: number[];
  createdAt: string;
  updatedAt: string;
}

export interface SupplicationListResponse {
  message: string;
  code: number;
  data: SupplicationList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SupplicationResponse {
  message: string;
  code: number;
  data: SupplicationList;
}

export interface SupplicationTranslationList {
  id: number;
  supplicationId: number;
  languageCode: string;
  translationText: string;
}

export interface SupplicationTranslationResponse {
  message: string;
  code: number;
  data: SupplicationTranslationList[];
}

export interface SupplicationTransliterationList {
  id: number;
  supplicationId: number;
  languageCode: string;
  transliterationText: string;
}

export interface SupplicationTransliterationResponse {
  message: string;
  code: number;
  data: SupplicationTransliterationList[];
}
