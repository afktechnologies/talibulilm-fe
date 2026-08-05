import DuaCards from "@/components/Supplication/Home/DuaCards";
import SupplicationHero from "@/components/Supplication/Home/Hero";
import DailyDhikr from "@/components/Supplication/Home/DailyDhikr";
import OtherAdhkaar from "@/components/Supplication/Home/Index";
import { supplicationApi } from "@/services/api/endpoints/supplication";
import {
  getCategoryFallbackImagePath,
  getCategoryIcon,
  getCategoryImagePath,
} from "@/utils/supplicationHelpers";

// Supplication categories/duas are admin-managed and can change at any time;
// render per-request rather than at build time so the page never depends on
// backend availability during the build itself.
export const dynamic = "force-dynamic";

// ─── Types ────────────────────────────────────────────────────────────────────
export type DuaItem = {
  title: string;
  pic: string;
  /** Bundled local image, ignoring the admin-entered `image` field — used if `pic` fails to load. */
  fallbackPic: string;
  icon: string;
  slug: string;
};

// ─── Data slices ──────────────────────────────────────────────────────────────
// First 8 categories go to the Daily Dhikr grid; everything after goes to the accordion.
const DAILY_DHIKR_COUNT = 8;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function Supplication() {
  const categoriesRes = await supplicationApi.getCategories();

  const duaItems: DuaItem[] = categoriesRes.data.map((category) => ({
    title: category.name,
    pic: getCategoryImagePath(category),
    fallbackPic: getCategoryFallbackImagePath(category),
    icon: getCategoryIcon(category.name),
    slug: category.slug,
  }));

  const dailyDhikrList = duaItems.slice(0, DAILY_DHIKR_COUNT);
  const otherAdhkaarList = duaItems.slice(DAILY_DHIKR_COUNT);

  return (
    <div>
      <SupplicationHero
        arabicText="وعنه قال‏:‏ قال رسول الله صلى الله عليه وسلم‏:‏ ‏‏سبق المفردون‏‏ قالوا‏:‏ وما المفردون يا رسول الله‏؟‏ قال‏:‏ ‏‏الذاكرون الله كثيرًا والذكرات‏‏ ‏(‏‏(‏رواه مسلم‏)‏‏)‏‏.‏ وروي : (( المفردون )) بتشديد الراء وتخفيفها والمشهور الذي قاله الجمهور : التشديد."
        englishTranslation="Abu Hurairah (May Allah be pleased with him) reported: The Messenger of Allah (PBUH) said, 'The Mufarridun have gone ahead.' He was asked, 'Who are the Mufarridun?' He (PBUH) replied, 'Those men and women who frequently celebrate the remembrance of Allah.'"
        reference="Al-Bukhari 222"
      />

      {/* DuaCards fetches its own featured duas from the backend — no props needed */}
      <DuaCards />

      {/* Daily Dhikr grid — first 8 categories */}
      <DailyDhikr items={dailyDhikrList} />

      {/* Accordion — remaining categories */}
      <OtherAdhkaar items={otherAdhkaarList} />
    </div>
  );
}
