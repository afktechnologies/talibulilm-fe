"use client";

import { useEffect, useMemo, useState } from "react";
import { GENERATIONS, sortScholars, type SortKey } from "./generations";
import ScholarsControls from "./ScholarsControls";
import TimelineSection from "./TimelineSection";
import type { ScholarList } from "@/types/scholar";

export type ViewMode = "grid" | "list" | "horizontal";

const STORAGE_KEY = "scholars-timeline-prefs";

interface Prefs {
  sortKey: SortKey;
  filterKey: string;
  viewMode: ViewMode;
}

const DEFAULT_PREFS: Prefs = { sortKey: "oldest", filterKey: "all", viewMode: "grid" };

function loadPrefs(): Prefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw);
    return {
      sortKey: parsed.sortKey ?? DEFAULT_PREFS.sortKey,
      filterKey: parsed.filterKey ?? DEFAULT_PREFS.filterKey,
      viewMode: parsed.viewMode ?? DEFAULT_PREFS.viewMode,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

interface ScholarsTimelineProps {
  scholars: ScholarList[];
}

/**
 * Client-side orchestrator for the whole /scholars timeline: buckets the
 * flat scholar list into the six curated generations (`generations.ts`),
 * and drives Sort/Filter/View-mode as one shared, localStorage-persisted
 * preference set so switching one control never resets the others.
 */
export default function ScholarsTimeline({ scholars }: ScholarsTimelineProps) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPrefs(loadPrefs());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs, hydrated]);

  const buckets = useMemo(
    () =>
      GENERATIONS.map((generation) => ({
        ...generation,
        scholars: sortScholars(scholars.filter(generation.match), prefs.sortKey),
      })),
    [scholars, prefs.sortKey]
  );

  const visibleBuckets =
    prefs.filterKey === "all" ? buckets : buckets.filter((bucket) => bucket.key === prefs.filterKey);

  return (
    <div>
      <ScholarsControls
        sortKey={prefs.sortKey}
        filterKey={prefs.filterKey}
        viewMode={prefs.viewMode}
        buckets={buckets}
        onSortChange={(sortKey) => setPrefs((p) => ({ ...p, sortKey }))}
        onFilterChange={(filterKey) => setPrefs((p) => ({ ...p, filterKey }))}
        onViewModeChange={(viewMode) => setPrefs((p) => ({ ...p, viewMode }))}
      />

      {visibleBuckets.map((bucket) => (
        <TimelineSection
          key={bucket.key}
          id={bucket.key}
          eyebrow={bucket.eyebrow}
          title={bucket.title}
          description={bucket.description}
          scholars={bucket.scholars}
          viewMode={prefs.viewMode}
        />
      ))}
    </div>
  );
}
