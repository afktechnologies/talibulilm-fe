import { NextResponse, type NextRequest } from "next/server";
import { backendFetch } from "@/lib/auth/backend";

/**
 * Generic authenticated proxy to the NestJS backend, for any future
 * user-account-scoped call (profile, bookmarks-by-account, etc).
 *
 * Public content reads (surahs, hadiths, qna, ...) don't need this — they
 * go straight from the browser to the backend via `apiClient`
 * (`NEXT_PUBLIC_API_BASE_URL`), since those endpoints are public and
 * unauthenticated. This route exists so anything that *does* need the
 * logged-in user's session never has to touch the access/refresh tokens
 * directly (they live in httpOnly cookies) — it attaches the Authorization
 * header server-side and transparently refreshes the session on a 401.
 */

type RouteParams = { params: Promise<{ path: string[] }> };

async function handler(request: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  const search = request.nextUrl.search;
  const targetPath = `/${path.join("/")}${search}`;

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const body = hasBody ? await request.text() : undefined;

  const response = await backendFetch(targetPath, {
    method: request.method,
    headers: {
      "Content-Type": request.headers.get("content-type") ?? "application/json",
    },
    body: body && body.length > 0 ? body : undefined,
  });

  const responseBody = await response.text();

  return new NextResponse(responseBody, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PATCH,
  handler as PUT,
  handler as DELETE,
};
