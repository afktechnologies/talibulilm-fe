import { useEffect, useState } from "react";
import Link from "next/link";
import SurahCard from "../Cards/surahCard";
import { useSurahs } from "@/services/hooks/quran";
import { SurahList } from "@/types/surah";
import SurahSkeleton from "@/components/skeleton/quran/surahSkeleton";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

interface SurahContentProps {
  searchQuery: string;
  onResultsChange: (hasResults: boolean) => void;
}

const SurahContent = ({ searchQuery, onResultsChange }: SurahContentProps) => {
  const { data, isLoading, error } = useSurahs();
  const surahs = data as SurahList[];

  const [filteredData, setFilteredData] = useState<
    Pick<
      SurahList,
      | "surahNumber"
      | "nameEn"
      | "nameEnMeaning"
      | "verseCount"
      | "juzNumber"
      | "slug"
    >[]
  >([]);

  useEffect(() => {
    if (surahs) {
      const mappedData = surahs.map((surah: SurahList) => ({
        surahNumber: surah.surahNumber,
        nameEn: surah.nameEn,
        nameEnMeaning: surah.nameEnMeaning,
        verseCount: surah.verseCount,
        juzNumber: surah.juzNumber,
        slug: surah.slug,
      }));

      const filtered = mappedData.filter((item) =>
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredData(filtered);
      onResultsChange(filtered.length > 0); // Notify parent about results
    } else {
      onResultsChange(false); // No data, no results
    }
  }, [surahs, searchQuery, onResultsChange]);

  if (isLoading) return <SurahSkeleton />;
  if (error)
    return (
      <div>
        <FallbackError />
      </div>
    );

  return (
    <div className="w-[95%] grid grid-cols-1 gap-6 mt-4 max-[1000px]:grid-cols-2 max-[1000px]:gap-4 max-[600px]:grid-cols-1 max-[600px]:gap-4">
      {filteredData.map((item) => (
        <Link href={`/quran/${item.slug}`} key={item.surahNumber}>
          <SurahCard item={item} />
        </Link>
      ))}
    </div>
  );
};

export default SurahContent;
