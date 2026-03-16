"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./quranContent.module.css";
import { primary_font } from "@/app/font/font";
import Searchbar from "@/components/common/SearchBar/searchbar";
import SurahContent from "./QuranContents/surahContent";
import JuzContent from "./QuranContents/juzContent";
import PageContent from "./QuranContents/pageContent";
import SurahSkeleton from "@/components/skeleton/quran/surahSkeleton";
import JuzAndPageSkeleton from "@/components/skeleton/quran/juzAndPageSkeleton";
import FallbackQuran from "@/components/common/Errors/Fallback/fallbackQuran";

const QuranHeaderContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab");
  const validTabs = ["Surah", "Juz", "Page"];
  const normalizedTab = initialTab
    ? validTabs.find((tab) => tab.toLowerCase() === initialTab.toLowerCase())
    : null;
  const [activeTab, setActiveTab] = useState<string>(normalizedTab || "Surah");
  const [nextTab, setNextTab] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isTabTransitioning, setIsTabTransitioning] = useState<boolean>(false);
  const [hasResults, setHasResults] = useState<boolean>(true);


  useEffect(() => {
    const newUrl = `/quran?tab=${activeTab.toLowerCase()}`;
    router.push(newUrl, { scroll: false });
  }, [activeTab, router]);

  const handleTabClick = (tab: string) => {
    if (tab !== activeTab) {
      setNextTab(tab);
      setIsTabTransitioning(true);

      setTimeout(() => {
        setActiveTab(tab);
        setSearchQuery("");
        setIsTabTransitioning(false);
        setNextTab(null);
        setHasResults(true);
      }, 400);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleResultsChange = (results: boolean) => {
    setHasResults(results);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.navigationBtn}>
            <ul>
              {["Surah", "Juz", "Page"].map((tab) => ( 
                <li
                  key={tab}
                  className={`${styles.navItem} ${
                    activeTab === tab ? styles.active : ""
                  } ${primary_font.className}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <Searchbar onSearchChange={handleSearchChange} searchQuery={searchQuery} />
        </div>

        <div className={styles.content}>
          {isTabTransitioning ? (
            nextTab === "Surah" ? (
              <SurahSkeleton />
            ) : (
              <JuzAndPageSkeleton />
            )
          ) : searchQuery && !hasResults ? (
            <FallbackQuran />
          ) : activeTab === "Surah" ? (
            <SurahContent searchQuery={searchQuery} onResultsChange={handleResultsChange} />
          ) : activeTab === "Juz" ? (
            <JuzContent searchQuery={searchQuery} onResultsChange={handleResultsChange} />
          ) : (
            <PageContent searchQuery={searchQuery} onResultsChange={handleResultsChange} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuranHeaderContent;