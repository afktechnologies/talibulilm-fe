/**
 * Public API base URL, read from `NEXT_PUBLIC_API_BASE_URL` (see
 * `.env.local`/`.env.example`). Must use the `NEXT_PUBLIC_` prefix — this
 * value is inlined into the client bundle and used by `apiClient` for
 * direct, unauthenticated content reads that run in the browser.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
