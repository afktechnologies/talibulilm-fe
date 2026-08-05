import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/auth/backend";
import { createSession } from "@/lib/auth/session";
import type { LoginResponse, RegisterPayload } from "@/types/auth";

export async function POST(request: Request) {
  let payload: RegisterPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(`${getBackendUrl()}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach the server. Please try again." },
      { status: 502 },
    );
  }

  const body = await backendResponse.json().catch(() => null);

  if (!backendResponse.ok) {
    const message = Array.isArray(body?.message)
      ? body.message.join(", ")
      : (body?.message ?? "Unable to create your account");
    return NextResponse.json({ message }, { status: backendResponse.status });
  }

  // Registration logs the user in immediately (backend returns the same
  // shape as /auth/login), so we start a session right away too.
  const auth = body as LoginResponse;
  await createSession(auth);

  return NextResponse.json({ user: auth.user }, { status: 201 });
}
