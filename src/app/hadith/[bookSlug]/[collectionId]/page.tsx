"use client";
import React from "react";
import HadithDetailsHero from "@/components/Hadith/Collections/Hero";
import IndexCard from "@/components/Hadith/Details/indexCard";
import styles from "./index.module.css";
import { useCollectionById, useHadithByCollectionId } from "@/services/hooks/hadith";
import ChapterCard from "@/components/Hadith/Details/chapterCard";

interface HadithPageProps {
  params: Promise<{
  collectionId: number;
  }>;
}

const Hadiths = ({ params }: HadithPageProps) => {
  const unwrappedParams = React.use(params);
  const { collectionId } = unwrappedParams;
  const { data, isLoading, isError } = useHadithByCollectionId(collectionId);
  const {data: collectionData} = useCollectionById(collectionId)

  if (isError) return <div>Error fetching Hadith collections</div>;

  return (
    <div>
      <HadithDetailsHero
        arabicText={data?.[0]?.hadithCollection?.nameAr || null}
        bookName={data?.[0]?.hadithCollection?.nameEn || null}
        isLoading={isLoading}
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <IndexCard collectionName={data?.[0]?.hadithCollection?.nameEn} />
          <ChapterCard data={data || []} isLoading={isLoading} collectionData={collectionData} />
        </div>
      </div>
    </div>
  );
};

export default Hadiths;
