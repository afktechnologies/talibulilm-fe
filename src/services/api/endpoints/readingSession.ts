import { requestJson } from "../backendProxyClient";
import type { ReadingSessionData } from "@/types/readingSession";

/**
 * Goes through this app's own session-aware proxy (`/api/backend/...`),
 * never the external backend directly — the backend's `/reading-session`
 * route requires the logged-in user's access token, which only this app's
 * server holds (httpOnly cookies).
 */
export const readingSessionApi = {
  get: () =>
    requestJson<{ message: string; data: Partial<ReadingSessionData> }>(
      "/api/backend/reading-session",
    ),
  update: (data: ReadingSessionData) =>
    requestJson<{ message: string; data: ReadingSessionData }>("/api/backend/reading-session", {
      method: "PUT",
      body: data,
    }),
};
