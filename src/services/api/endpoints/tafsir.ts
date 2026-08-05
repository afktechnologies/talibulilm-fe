import { apiClient } from "../client";
import { TafsirResponse } from "@/types/tafsir";

export const tafsirApi = {
  // limit=0 fetches every tafsir entry (across books/languages) for the
  // ayah in one page — the frontend Tafsir page derives its Book/Language
  // pickers from whatever comes back rather than a hardcoded list.
  getTafsirsByAyahId: (ayahId: string | number) =>
    apiClient.get(`tafsirs?ayahId=${ayahId}&limit=0`).json<TafsirResponse>(),
};
