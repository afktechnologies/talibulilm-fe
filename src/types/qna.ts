export interface QnaCategoryList {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QnaCategoryResponse {
  message: string;
  code: number;
  data: QnaCategoryList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface QnaList {
  id: number;
  question: string;
  shortAnswer?: string;
  answer: string;
  answeredBy?: string;
  references?: string[];
  similar?: number[];
  viewCount: number;
  category?: QnaCategoryList;
  categoryId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface QnaResponse {
  message: string;
  code: number;
  data: QnaList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
