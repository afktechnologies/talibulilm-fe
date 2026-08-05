import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/auth/backend";
import { destroySession, getAccessToken } from "@/lib/auth/session";

export async function POST() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    try {
      await fetch(`${getBackendUrl()}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      });
    } catch {
      // Best-effort: still clear the local session even if the backend call fails.
    }
  }

  await destroySession();
  return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
}
