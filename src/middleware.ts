import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  DEFAULT_REDIRECT_PATH,
  LOGIN_PATH,
  REFRESH_TOKEN_COOKIE,
  REGISTER_PATH,
} from "@/lib/auth/constants";

const AUTH_ONLY_PATHS = [LOGIN_PATH, REGISTER_PATH];

/**
 * Unlike the admin panel, almost this entire site is public — there's no
 * "everything requires login" gate here. The only job of this middleware
 * is to keep an already-logged-in visitor off the login/register pages
 * (bounce them home instead). Actual session validity is enforced
 * server-side by `backendFetch` (silent refresh/clear on 401) wherever a
 * future authenticated call is made, not here.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!AUTH_ONLY_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const hasSession =
    request.cookies.has(ACCESS_TOKEN_COOKIE) || request.cookies.has(REFRESH_TOKEN_COOKIE);

  if (hasSession) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_PATH, request.url));
  }

  return NextResponse.next();
}

// Next's middleware matcher is statically analyzed at build time, so it
// needs literal path strings here (not the imported constants above) —
// keep this in sync with LOGIN_PATH/REGISTER_PATH if either ever changes.
export const config = {
  matcher: ["/auth/login", "/auth/register"],
};
