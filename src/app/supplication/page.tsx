import DuaCards from "@/components/Supplication/Home/DuaCards";
import SupplicationHero from "@/components/Supplication/Home/Hero";
import DailyDhikr from "@/components/Supplication/Home/DailyDhikr";
import OtherAdhkaar from "@/components/Supplication/Home/Index";
import duaList from "@/store/data/duaList.json";

// ─── Types ────────────────────────────────────────────────────────────────────
export type DuaItem = {
  title: string;
  pic: string;
  icon: string;
};

// ─── Data slices ──────────────────────────────────────────────────────────────
// First 8 entries go to the Daily Dhikr grid; everything after goes to the accordion.
const DAILY_DHIKR_COUNT = 8;
const dailyDhikrList: DuaItem[] = (duaList as DuaItem[]).slice(0, DAILY_DHIKR_COUNT);
const otherAdhkaarList: DuaItem[] = (duaList as DuaItem[]).slice(DAILY_DHIKR_COUNT);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Supplication() {
  return (
    <div>
      <SupplicationHero
        arabicText="وعنه قال‏:‏ قال رسول الله صلى الله عليه وسلم‏:‏ ‏‏سبق المفردون‏‏ قالوا‏:‏ وما المفردون يا رسول الله‏؟‏ قال‏:‏ ‏‏الذاكرون الله كثيرًا والذكرات‏‏ ‏(‏‏(‏رواه مسلم‏)‏‏)‏‏.‏ وروي : (( المفردون )) بتشديد الراء وتخفيفها والمشهور الذي قاله الجمهور : التشديد."
        englishTranslation="Abu Hurairah (May Allah be pleased with him) reported: The Messenger of Allah (PBUH) said, 'The Mufarridun have gone ahead.' He was asked, 'Who are the Mufarridun?' He (PBUH) replied, 'Those men and women who frequently celebrate the remembrance of Allah.'"
        reference="Al-Bukhari 222"
      />

      {/* DuaCards reads its own data from duaCardData.json — no props needed */}
      <DuaCards />

      {/* Daily Dhikr grid — first 8 items */}
      <DailyDhikr items={dailyDhikrList} />

      {/* Accordion — remaining items */}
      <OtherAdhkaar items={otherAdhkaarList} />
    </div>
  );
}