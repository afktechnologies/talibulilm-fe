"use client";

import { useEffect } from "react";

const RELOAD_FLAG = "tlm-chunk-reload-attempted";

function isChunkLoadFailure(reason: unknown): boolean {
  if (!reason) return false;
  const name = (reason as { name?: string }).name;
  const message = (reason as { message?: string }).message ?? String(reason);
  return (
    name === "ChunkLoadError" ||
    /Loading chunk [\w.-]+ failed/i.test(message) ||
    /Loading CSS chunk [\w.-]+ failed/i.test(message)
  );
}

/**
 * Next's client-side router fetches route chunks via a dynamic import();
 * if a chunk hash the browser already has (from before a new deploy, or a
 * dev-server rebuild) no longer exists on the server, that import rejects
 * with a ChunkLoadError *outside* React's render tree, so a route's
 * error.tsx boundary never sees it and the page is stuck until the user
 * manually refreshes. A single full reload re-fetches the current build's
 * manifest and resolves it; the sessionStorage flag stops a genuinely
 * broken deployment from reloading forever.
 */
export default function ChunkErrorRecovery() {
  useEffect(() => {
    const recover = (reason: unknown) => {
      if (!isChunkLoadFailure(reason)) return;
      if (sessionStorage.getItem(RELOAD_FLAG)) return;
      sessionStorage.setItem(RELOAD_FLAG, "1");
      window.location.reload();
    };

    const onRejection = (event: PromiseRejectionEvent) => recover(event.reason);
    const onError = (event: ErrorEvent) => recover(event.error ?? event.message);

    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("error", onError);

    // Reaching this point means the current mount succeeded without needing
    // recovery — clear any stale flag so a future stale chunk still gets
    // one automatic retry instead of being silently ignored forever.
    sessionStorage.removeItem(RELOAD_FLAG);

    return () => {
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  return null;
}
