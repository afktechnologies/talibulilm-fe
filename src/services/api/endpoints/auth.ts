import type { AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";
import { postJson } from "../backendProxyClient";

/**
 * Unlike every other endpoint file in `services/api/endpoints`, these calls
 * target this app's own `/api/auth/*` route handlers — not the external
 * backend via `apiClient` — because that's where the httpOnly session
 * cookies get set/read. The browser never sees a token directly.
 */
export const authApi = {
  login: (payload: LoginPayload) => postJson<{ user: AuthUser }>("/api/auth/login", payload),
  register: (payload: RegisterPayload) =>
    postJson<{ user: AuthUser }>("/api/auth/register", payload),
  logout: () => postJson<{ message: string }>("/api/auth/logout", {}),
};
