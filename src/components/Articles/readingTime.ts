const WORDS_PER_MINUTE = 200;

/** Rough reading-time estimate from the article's rich-text HTML body. */
export function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").trim();
  const wordCount = text.length === 0 ? 0 : text.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
