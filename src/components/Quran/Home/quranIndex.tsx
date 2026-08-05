"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { primary_font } from "@/app/font/font";
import Searchbar from "@/components/common/SearchBar/searchbar";
import SurahContent from "./QuranContents/surahContent";
import JuzContent from "./QuranContents/juzContent";
import PageContent from "./QuranContents/pageContent";
import SurahSkeleton from "@/components/skeleton/quran/surahSkeleton";
import JuzAndPageSkeleton from "@/components/skeleton/quran/juzAndPageSkeleton";
import FallbackQuran from "@/components/common/Errors/Fallback/fallbackQuran";

const qc = {
  wrapper: "flex justify-center overflow-x-hidden mt-0 mr-4 mb-16 ml-4",
  container: "flex flex-col justify-center items-center max-w-[1440px] w-[90%] gap-6 max-[1080px]:m-0 max-[600px]:gap-4",
  main: "flex justify-between items-center w-full mx-8 max-[600px]:flex-col-reverse max-[600px]:justify-start max-[600px]:items-start max-[600px]:gap-4",
  navigationBtn: "max-[600px]:ml-4",
  navigationBtnUl: "flex gap-8 max-[1080px]:gap-6 max-[680px]:gap-4 max-[600px]:gap-8",
  navItem: "cursor-pointer text-[1.3rem] text-[#7D887A] hover:text-[#5C6357] hover:underline hover:transition-colors hover:duration-200 hover:ease-in-out max-[1080px]:text-[1.2rem] max-[973px]:text-[1.1rem] max-[700px]:text-[1rem] max-[600px]:text-[1.2rem] max-[400px]:text-[1.1rem]",
  active: "text-[1.25rem] font-bold text-[#5C6357] max-[1080px]:text-[1.1rem] max-[973px]:text-[1.1rem] max-[700px]:text-[1rem] max-[600px]:text-[1.2rem] max-[400px]:text-[1.1rem]",
  content: "flex justify-center items-center w-[95%] max-[680px]:w-full",
};

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
  // The input itself stays instantly responsive (bound to `searchQuery`);
  // the debounced value is what actually triggers a server-side search
  // request, so rapid typing doesn't fire a request per keystroke.
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [isTabTransitioning, setIsTabTransitioning] = useState<boolean>(false);
  const [hasResults, setHasResults] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 400);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

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
        setDebouncedQuery("");
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
    <div className={qc.wrapper}>
      <div className={qc.container}>
        <div className={qc.main}>
          <div className={qc.navigationBtn}>
            <ul className={qc.navigationBtnUl}>
              {["Surah", "Juz", "Page"].map((tab) => (
                <li
                  key={tab}
                  className={`${qc.navItem} ${
                    activeTab === tab ? qc.active : ""
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

        <div className={qc.content}>
          {isTabTransitioning ? (
            nextTab === "Surah" ? (
              <SurahSkeleton />
            ) : (
              <JuzAndPageSkeleton />
            )
          ) : debouncedQuery && !hasResults ? (
            <FallbackQuran />
          ) : activeTab === "Surah" ? (
            <SurahContent key={debouncedQuery} searchQuery={debouncedQuery} onResultsChange={handleResultsChange} />
          ) : activeTab === "Juz" ? (
            <JuzContent key={debouncedQuery} searchQuery={debouncedQuery} onResultsChange={handleResultsChange} />
          ) : (
            <PageContent key={debouncedQuery} searchQuery={debouncedQuery} onResultsChange={handleResultsChange} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuranHeaderContent;