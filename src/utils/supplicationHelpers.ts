import { supplicationApi } from "@/services/api/endpoints/supplication";

/**
 * The backend's SupplicationCategory entity has no "icon" field (it's purely
 * presentational), and its optional "image" field may not be populated for
 * every category. This table preserves the original UI's per-category
 * emoji + image assets by name, with a safe default for any category the
 * backend returns that isn't in this list — so nothing ever 404s or renders
 * blank.
 */
const CATEGORY_DECORATION: Record<string, { icon: string; pic: string }> = {
  "morning adhkaar": { icon: "🌅", pic: "morning.png" },
  "evening adhkaar": { icon: "🌆", pic: "evening.png" },
  "before sleep": { icon: "🌙", pic: "sleep.png" },
  salah: { icon: "🕌", pic: "salah.png" },
  "after salah": { icon: "📿", pic: "afterSalah.png" },
  "quranic dua's": { icon: "📖", pic: "quranicDuas.png" },
  "quranic duas": { icon: "📖", pic: "quranicDuas.png" },
  "sunnah dua's": { icon: "☪️", pic: "sunnahDuas.png" },
  "sunnah duas": { icon: "☪️", pic: "sunnahDuas.png" },
  "ruqyah & illness": { icon: "🌿", pic: "illness.png" },
  "purification & wudhu": { icon: "💧", pic: "afterSalah.png" },
  "adhaan & iqamah": { icon: "🔔", pic: "salah.png" },
  fasting: { icon: "🌙", pic: "evening.png" },
  "hajj & umrah": { icon: "🕋", pic: "quranicDuas.png" },
  travelling: { icon: "✈️", pic: "morning.png" },
  nature: { icon: "🌿", pic: "illness.png" },
  "seeking refuge": { icon: "🛡️", pic: "sunnahDuas.png" },
  "marriage & family": { icon: "🤝", pic: "afterSalah.png" },
};

const DEFAULT_DECORATION = { icon: "🤲", pic: "afterSalah.png" };

function decorationFor(categoryName: string) {
  return CATEGORY_DECORATION[categoryName.trim().toLowerCase()] ?? DEFAULT_DECORATION;
}

export function getCategoryIcon(categoryName: string): string {
  return decorationFor(categoryName).icon;
}

/** Resolves a category's background/thumbnail image to a usable public path. */
export function getCategoryImagePath(category: { name: string; image?: string }): string {
  const { image } = category;
  if (image && (image.startsWith("http") || image.startsWith("/"))) {
    return image;
  }
  const filename = image?.trim() || decorationFor(category.name).pic;
  return `/Images/Supplications/${filename}`;
}

/**
 * Fetches the (optional) translation + transliteration text for a single
 * supplication. Both backend endpoints throw 404 when no rows exist for a
 * given supplication/language, so each is resolved independently and falls
 * back to an empty string rather than failing the whole page.
 */
export async function getDuaTexts(
  supplicationId: number,
  languageCode: string = "en",
): Promise<{ translation: string; transliteration: string }> {
  const [translationResult, transliterationResult] = await Promise.allSettled([
    supplicationApi.getTranslations(supplicationId),
    supplicationApi.getTransliterations(supplicationId),
  ]);

  const translation =
    translationResult.status === "fulfilled"
      ? translationResult.value.data.find((t) => t.languageCode === languageCode)?.translationText ??
        translationResult.value.data[0]?.translationText ??
        ""
      : "";

  const transliteration =
    transliterationResult.status === "fulfilled"
      ? transliterationResult.value.data.find((t) => t.languageCode === languageCode)?.transliterationText ??
        transliterationResult.value.data[0]?.transliterationText ??
        ""
      : "";

  return { translation, transliteration };
}
