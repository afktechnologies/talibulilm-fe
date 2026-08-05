import { apiClient } from "../client";
import { ScholarResponse, ScholarSingleResponse } from "@/types/scholar";

export const scholarApi = {
  // Timeline sections are grouped client-side from one full list — the
  // scholar count is small and bounded (tens, not thousands), so a single
  // unpaginated fetch is simpler and more correct here than paginating a
  // set of independent per-era queries.
  getAllScholars: () =>
    apiClient.get(`scholars?limit=0&status=PUBLISHED`).json<ScholarResponse>(),

  getScholarBySlug: (slug: string) =>
    apiClient.get(`scholars/slug/${slug}`).json<ScholarSingleResponse>(),
};
