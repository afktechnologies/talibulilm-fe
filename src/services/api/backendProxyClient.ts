interface ProxyApiError {
  message?: string;
}

/**
 * Calls one of this app's own `/api/*` route handlers — never the external
 * backend directly. Used for anything that needs the logged-in user's
 * session (auth routes, `/api/backend/[...path]` proxy calls), since the
 * access/refresh tokens live in httpOnly cookies this app's own server
 * attaches, not something client code ever holds.
 */
export async function requestJson<TResponse>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<TResponse> {
  const { method = "GET", body } = options;

  const response = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (responseBody as ProxyApiError | null)?.message ?? "Something went wrong";
    throw new Error(message);
  }

  return responseBody as TResponse;
}

/** Convenience wrapper for the common POST-with-JSON-body case. */
export function postJson<TResponse>(path: string, payload: unknown): Promise<TResponse> {
  return requestJson<TResponse>(path, { method: "POST", body: payload });
}
