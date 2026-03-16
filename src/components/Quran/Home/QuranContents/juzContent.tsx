import { useEffect, useState } from "react";
import { useJuz } from "@/services/hooks/quran";
import JuzCard from "../Cards/juzCard";
import { JuzList } from "@/types/surah";
import JuzAndPageSkeleton from "@/components/skeleton/quran/juzAndPageSkeleton";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

interface JuzContentProps {
  searchQuery: string;
  onResultsChange: (hasResults: boolean) => void;
}

const JuzContent = ({ searchQuery, onResultsChange }: JuzContentProps) => {
  const { data: juzData, isLoading, error } = useJuz();

  const [filteredData, setFilteredData] = useState<JuzList[]>([]);

  useEffect(() => {
    if (juzData) {
      const filtered = juzData.filter(
        (item: JuzList) =>
          item.surahInfo.nameEn
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.juzNumber.toString().includes(searchQuery)
      );

      setFilteredData(filtered);
      onResultsChange(filtered.length > 0); // Notify parent about results
    } else {
      onResultsChange(false); // No data, no results
    }
  }, [juzData, searchQuery, onResultsChange]);

  if (isLoading) return <JuzAndPageSkeleton />;

  if (error)
    return (
      <div>
        <FallbackError />
      </div>
    );

  return <JuzCard juzData={filteredData} />;
};

export default JuzContent;
