import { ASHARA_TAG, KHULAFA_TAG, ScholarEra, type ScholarList } from "@/types/scholar";

function hasTag(scholar: ScholarList, tag: string): boolean {
  return Boolean(scholar.tags?.includes(tag));
}

export interface Generation {
  key: string;
  eyebrow: string;
  title: string;
  description: string;
  match: (scholar: ScholarList) => boolean;
}

/**
 * Single source of truth for the six curated timeline sections — shared by
 * the server-rendered page (fetches the flat scholar list) and the client
 * `ScholarsTimeline` (buckets it, drives Filter). Khulafa/Ashara are tag-based
 * carve-outs of SAHABAH, not separate backend eras — see `types/scholar.ts`.
 */
export const GENERATIONS: Generation[] = [
  {
    key: "khulafa",
    eyebrow: "Generation 1",
    title: "The Rightly Guided Caliphs",
    description:
      "Al-Khulafa ar-Rashidun — the four Companions who led the Muslim community directly after the Prophet ﷺ.",
    match: (s) => hasTag(s, KHULAFA_TAG),
  },
  {
    key: "ashara",
    eyebrow: "Promised Paradise",
    title: "Al-Ashara al-Mubashshara",
    description:
      "The ten Companions given the glad tidings of Paradise by the Prophet ﷺ during his lifetime.",
    match: (s) => hasTag(s, ASHARA_TAG),
  },
  {
    key: "sahabah",
    eyebrow: "Generation 2",
    title: "The Sahabah",
    description:
      "The wider Companions of the Prophet ﷺ — those who saw and believed in him, and carried his teachings forward.",
    match: (s) => s.era === ScholarEra.SAHABAH && !hasTag(s, KHULAFA_TAG) && !hasTag(s, ASHARA_TAG),
  },
  {
    key: "tabieen",
    eyebrow: "Generation 3",
    title: "The Tabi'een",
    description:
      "The Successors — those who learned directly from the Companions, preserving the second link in the chain of knowledge.",
    match: (s) => s.era === ScholarEra.TABIUN,
  },
  {
    key: "tabi-tabieen",
    eyebrow: "Generation 4",
    title: "The Tabi' al-Tabi'een",
    description:
      "The Successors of the Successors — the generation whose scholarship gave rise to the earliest schools of Islamic law.",
    match: (s) => s.era === ScholarEra.TABI_TABIIN,
  },
  {
    key: "others",
    eyebrow: "Later Generations",
    title: "Notable Scholars",
    description:
      "Jurists, Hadith scholars, and theologians from the classical era onward whose works remain foundational today.",
    match: (s) =>
      [ScholarEra.CLASSICAL, ScholarEra.MEDIEVAL, ScholarEra.CONTEMPORARY].includes(s.era),
  },
];

export type SortKey = "oldest" | "latest" | "az";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "oldest", label: "Oldest first" },
  { value: "latest", label: "Latest first" },
  { value: "az", label: "Name (A–Z)" },
];

function yearOf(scholar: ScholarList): number {
  return scholar.birthYearGregorian ?? scholar.deathYearGregorian ?? 9999;
}

export function sortScholars(scholars: ScholarList[], sortKey: SortKey): ScholarList[] {
  const list = [...scholars];
  switch (sortKey) {
    case "latest":
      return list.sort((a, b) => yearOf(b) - yearOf(a));
    case "az":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "oldest":
    default:
      return list.sort((a, b) => yearOf(a) - yearOf(b));
  }
}
