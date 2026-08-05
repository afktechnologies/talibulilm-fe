import "server-only";
import type { RefreshResponse } from "@/types/auth";
import { destroySession, getAccessToken, getRefreshToken, updateTokens } from "./session";

export function getBackendUrl(): string {
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("BACKEND_URL is not defined in environment variables");
  }
  return url;
}

/**
 * Calls the backend `/auth/refresh` endpoint using the current refresh token
 * cookie and persists the rotated tokens. Returns the new access token, or
 * null if the refresh token is missing/invalid (session cannot be renewed).
 */
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch(`${getBackendUrl()}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!response.ok) {
    await destroySession();
    return null;
  }

  const tokens = (await response.json()) as RefreshResponse;
  await updateTokens(tokens);
  return tokens.accessToken;
}

/**
 * Server-side fetch against the backend that attaches the current access
 * token and transparently retries once after a silent refresh on 401.
 */
export async function backendFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const url = `${getBackendUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  let accessToken = await getAccessToken();

  const doFetch = (token: string | undefined) =>
    fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

  let response = await doFetch(accessToken);

  if (response.status === 401) {
    accessToken = (await refreshAccessToken()) ?? undefined;
    if (accessToken) {
      response = await doFetch(accessToken);
    }
  }

  return response;
}
