"use client";

import { createContext, useContext } from "react";
import type { AuthUser } from "@/types/auth";

/**
 * Unlike the admin panel's `AuthUserContext` (which throws if there's no
 * user, since every admin page requires login), this one is nullable —
 * almost the entire public site works logged out, so `useAuthUser()` here
 * just tells you whether anyone is signed in.
 */
const AuthUserContext = createContext<AuthUser | null>(null);

export function AuthUserProvider({
  user,
  children,
}: {
  user: AuthUser | null;
  children: React.ReactNode;
}) {
  return <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>;
}

export function useAuthUser(): AuthUser | null {
  return useContext(AuthUserContext);
}
