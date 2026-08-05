"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useAuthUser } from "@/components/common/Auth/AuthUserContext";
import { readingSessionApi } from "@/services/api/endpoints/readingSession";
import { EMPTY_READING_SESSION } from "@/types/readingSession";
import { setQuranBookmarks } from "@/store/slice/quranBookmarkSlice";
import { setQuranLastRead } from "@/store/slice/quranLastReadSlice";
import { setHadithBookmarks } from "@/store/slice/hadithBookmarkSlice";
import { setHadithLastRead } from "@/store/slice/hadithLastReadSlice";
import { setSupplicationBookmarks } from "@/store/slice/supplicationBookmarkSlice";
import { setQnaBookmarks } from "@/store/slice/qnaBookmarkSlice";

const PUSH_DEBOUNCE_MS = 800;

/**
 * Keeps the Redux reading-session (bookmarks + last-read, across Quran,
 * Hadith, Supplication, Q&A) in sync with the backend for logged-in users.
 *
 * On login: the locally-persisted (redux-persist/localStorage) state is
 * already rendered instantly — this component then pulls the backend's
 * copy once and *replaces* local state with it, so the server is always
 * the eventual source of truth across devices. After that first pull, any
 * further change to the watched slices is pushed to the backend
 * (debounced), so the two stay in sync going forward.
 *
 * Renders nothing — mount once near the root, inside both AuthUserProvider
 * and ReduxProvider.
 */
export function SessionSync() {
  const user = useAuthUser();
  const dispatch = useAppDispatch();
  const [hydratedForUserId, setHydratedForUserId] = useState<number | null>(null);

  const session = useAppSelector((state) => ({
    quranBookmarks: state.quranBookmark.items,
    quranLastRead: state.quranLastRead.items,
    hadithBookmarks: state.hadithBookmark.items,
    hadithLastRead: state.hadithLastRead.items,
    supplicationBookmarks: state.supplicationBookmark.items,
    qnaBookmarks: state.qnaBookmark.items,
  }));

  // Pull the authoritative session from the backend once per login, then
  // replace local Redux state with it.
  useEffect(() => {
    if (!user || hydratedForUserId === user.id) return;
    let cancelled = false;

    readingSessionApi
      .get()
      .then((response) => {
        if (cancelled) return;
        const data = { ...EMPTY_READING_SESSION, ...response.data };
        dispatch(setQuranBookmarks(data.quranBookmarks));
        dispatch(setQuranLastRead(data.quranLastRead));
        dispatch(setHadithBookmarks(data.hadithBookmarks));
        dispatch(setHadithLastRead(data.hadithLastRead));
        dispatch(setSupplicationBookmarks(data.supplicationBookmarks));
        dispatch(setQnaBookmarks(data.qnaBookmarks));
      })
      .catch(() => {
        // Backend copy unavailable — keep the locally-persisted state as-is.
      })
      .finally(() => {
        if (!cancelled) setHydratedForUserId(user.id);
      });

    return () => {
      cancelled = true;
    };
  }, [user, hydratedForUserId, dispatch]);

  // Push the session to the backend (debounced) whenever it changes, but
  // only once the initial pull for this user has completed — otherwise a
  // stale pre-hydration local snapshot could overwrite the backend's copy.
  useEffect(() => {
    if (!user || hydratedForUserId !== user.id) return;

    const timeout = setTimeout(() => {
      readingSessionApi.update(session).catch(() => {
        // Best-effort — the next change (or the next login's pull) will retry.
      });
    }, PUSH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [user, hydratedForUserId, session]);

  // Reset hydration tracking on logout, so a different account logging in
  // next re-hydrates fresh instead of reusing a stale flag.
  useEffect(() => {
    if (!user) setHydratedForUserId(null);
  }, [user]);

  return null;
}
