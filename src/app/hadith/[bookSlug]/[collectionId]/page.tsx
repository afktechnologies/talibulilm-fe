"use client";
import React from "react";
import HadithDetailsHero from "@/components/Hadith/Collections/Hero";
import IndexCard from "@/components/Hadith/Details/indexCard";
import {
  useCollectionById,
  useHadithByCollectionId,
} from "@/services/hooks/hadith";
import ChapterCard from "@/components/Hadith/Details/chapterCard";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

interface HadithPageProps {
  params: Promise<{
    collectionId: number;
  }>;
}

const Hadiths = ({ params }: HadithPageProps) => {
  const unwrappedParams = React.use(params);
  const { collectionId } = unwrappedParams;
  const { data, isLoading, isError } = useHadithByCollectionId(collectionId);
  const { data: collectionData } = useCollectionById(collectionId);

  if (isError) return <FallbackError />;

  return (
    <div>
      <HadithDetailsHero
        arabicText={data?.[0]?.hadithCollection?.nameAr || null}
        bookName={data?.[0]?.hadithCollection?.nameEn || null}
        isLoading={isLoading}
      />
      <div className="w-full bg-[linear-gradient(45deg,transparent_34%,rgba(211,211,216,0.25)_35%,rgba(211,211,216,0.25)_40%,transparent_41%,transparent_59%,rgba(211,211,216,0.25)_60%,rgba(211,211,216,0.25)_65%,transparent_66%),linear-gradient(135deg,transparent_34%,rgba(211,211,216,0.25)_35%,rgba(211,211,216,0.25)_40%,transparent_41%,transparent_59%,rgba(211,211,216,0.25)_60%,rgba(211,211,216,0.25)_65%,transparent_66%)] bg-[length:3em_3em] bg-white pb-16">
        <div className="py-8 px-6 max-md:px-4 max-[600px]:px-2 max-[400px]:px-[0.2rem]">
          <IndexCard
            collectionName={collectionData?.nameEn || data?.[0]?.hadithCollection?.nameEn}
            bookName={collectionData?.hadithBook?.nameEn}
            bookSlug={collectionData?.hadithBook?.slug}
            startingChapter={collectionData?.startingChapter}
            endingChapter={collectionData?.endingChapter}
            chapterCount={collectionData?.chapterCount}
          />
          <ChapterCard
            data={data || []}
            isLoading={isLoading}
            collectionData={collectionData}
          />
        </div>
      </div>
    </div>
  );
};

export default Hadiths;
