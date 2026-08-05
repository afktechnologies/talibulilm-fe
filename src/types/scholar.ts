/** Mirrors talibulilm-be `src/scholars/entities/scholar.entity.ts`. */
export enum ScholarEra {
  SAHABAH = "SAHABAH",
  TABIUN = "TABIUN",
  TABI_TABIIN = "TABI_TABIIN",
  CLASSICAL = "CLASSICAL",
  MEDIEVAL = "MEDIEVAL",
  CONTEMPORARY = "CONTEMPORARY",
}

export enum ScholarStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

/**
 * Sahabah tagged with these carve out the "Rightly Guided Caliphs" and
 * "Ashara Mubashshara" timeline sections — there's no dedicated era for
 * them in the backend enum since both are subsets of SAHABAH, not a
 * separate generation.
 */
export const KHULAFA_TAG = "khulafa-rashidun";
export const ASHARA_TAG = "ashara-mubashshara";

export interface ScholarArticleRef {
  id: number;
  slug: string;
  title: string;
}

export interface ScholarTimelineEvent {
  year: string;
  event: string;
}

export interface ScholarList {
  id: number;
  name: string;
  nameAr: string | null;
  slug: string;
  title: string | null;
  birthYearHijri: number | null;
  deathYearHijri: number | null;
  birthYearGregorian: number | null;
  deathYearGregorian: number | null;
  era: ScholarEra;
  region: string | null;
  /** Short excerpt shown on the /scholars listing cards. */
  biographySummary: string | null;
  /** Full-length narrative shown on the detail page. */
  biography: string | null;
  /** Era/political-context paragraph — detail page's "Historical Background". */
  historicalContext: string | null;
  /** Key contributions bullet list — detail page's "Key Contributions". */
  contributions: string[] | null;
  /** Life-event timeline shown on the detail page. */
  timeline: ScholarTimelineEvent[] | null;
  image: string | null;
  notableWorks: string[] | null;
  teachers: string[] | null;
  students: string[] | null;
  tags: string[] | null;
  status: ScholarStatus;
  displayOrder: number;
  articleId: number | null;
  article?: ScholarArticleRef | null;
  createdAt: string;
  updatedAt: string;
}

export interface ScholarResponse {
  message: string;
  code: number;
  data: ScholarList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ScholarSingleResponse {
  message: string;
  code: number;
  data: ScholarList;
}
