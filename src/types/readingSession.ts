import type { AyahListWithTranslation } from "@/types/surah";
import type { HadithItemList } from "@/types/hadith";
import type { QuranLastReadItem } from "@/store/slice/quranLastReadSlice";
import type { HadithLastReadItem } from "@/store/slice/hadithLastReadSlice";
import type { QnaEntry } from "@/components/Qna/QnaCard";
import type { DuaEntry } from "@/components/Supplication/Dua/DuaCard";

/**
 * Mirrors the shape of the Redux slices that make up a reading session
 * (bookmarks + last-read position, per content domain) — this is exactly
 * what gets persisted to/restored from `GET/PUT /reading-session` on the
 * backend, which stores it as an opaque JSONB blob. Keep this in sync with
 * `src/store/index.ts`'s persisted slices if either changes.
 */
export interface ReadingSessionData {
  quranBookmarks: AyahListWithTranslation[];
  quranLastRead: QuranLastReadItem[];
  hadithBookmarks: HadithItemList[];
  hadithLastRead: HadithLastReadItem[];
  supplicationBookmarks: DuaEntry[];
  qnaBookmarks: QnaEntry[];
}

export const EMPTY_READING_SESSION: ReadingSessionData = {
  quranBookmarks: [],
  quranLastRead: [],
  hadithBookmarks: [],
  hadithLastRead: [],
  supplicationBookmarks: [],
  qnaBookmarks: [],
};
