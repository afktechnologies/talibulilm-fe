"use client";

import React from "react";
import HadithDetailsHero from "@/components/Hadith/Collections/Hero";
import IndexPageHadith from "@/components/Hadith/Collections/indexPage";
import { useHadithBookBySlug } from "@/services/hooks/hadith";
import ComingSoon from "@/components/common/Errors/Fallback/comingSoon";

interface HadithPageProps {
  params: Promise<{
    bookSlug: string;
  }>;
}

const BookSlug = ({ params }: HadithPageProps) => {
    const unwrappedParams = React.use(params);
  const { bookSlug } = unwrappedParams;
  const { data, isLoading, isError } = useHadithBookBySlug(bookSlug);

  if (isError) return <div>Error fetching Hadith books</div>;

  return (
    <div>
      {/* <HadithDetailsHero
        isLoading={isLoading}
        arabicText={data?.nameAr || null}
        bookName={data?.nameEn || null}
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <IndexPageHadith isLoading={isLoading} description={data?.about || null} />
        </div>
      </div> */}
      <ComingSoon/>
    </div>
  );
};

export default BookSlug;
