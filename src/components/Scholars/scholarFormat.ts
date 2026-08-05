import type { ScholarList } from "@/types/scholar";

const EXCERPT_LENGTH = 140;

/** Truncates on a word boundary and appends "…" rather than relying on CSS clamp alone. */
export function excerptOf(text: string, length: number = EXCERPT_LENGTH): string {
  if (text.length <= length) return text;
  const truncated = text.slice(0, length);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : length)}…`;
}

export function formatDates(scholar: ScholarList): string {
  const hijri =
    scholar.birthYearHijri && scholar.deathYearHijri
      ? `${scholar.birthYearHijri}–${scholar.deathYearHijri} AH`
      : scholar.deathYearHijri
        ? `d. ${scholar.deathYearHijri} AH`
        : "";
  const gregorian =
    scholar.birthYearGregorian && scholar.deathYearGregorian
      ? `${scholar.birthYearGregorian}–${scholar.deathYearGregorian} CE`
      : scholar.deathYearGregorian
        ? `d. ${scholar.deathYearGregorian} CE`
        : "";
  return [hijri, gregorian].filter(Boolean).join(" · ");
}
