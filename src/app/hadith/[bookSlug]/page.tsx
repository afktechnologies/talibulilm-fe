"use client";

import React from "react";
import HadithDetailsHero from "@/components/Hadith/Collections/Hero";
import IndexPageHadith from "@/components/Hadith/Collections/indexPage";
import { useHadithBookBySlug } from "@/services/hooks/hadith";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

interface HadithPageProps {
  params: Promise<{
    bookSlug: string;
  }>;
}

const BookSlug = ({ params }: HadithPageProps) => {
  const unwrappedParams = React.use(params);
  const { bookSlug } = unwrappedParams;
  const { data, isLoading, isError } = useHadithBookBySlug(bookSlug);

  if (isError) return <FallbackError />;

  return (
    <div className="pb-16">
      <HadithDetailsHero
        isLoading={isLoading}
        arabicText={data?.nameAr || null}
        bookName={data?.nameEn || null}
      />
      <IndexPageHadith
        isLoading={isLoading}
        description={data?.about || null}
        collectionCount={data?.collectionCount}
      />
    </div>
  );
};

export default BookSlug;
