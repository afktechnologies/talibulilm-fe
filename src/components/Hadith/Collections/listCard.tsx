"use client";

import Rectangle from "@/components/skeleton/rectangle";
import { primary_font, roboto } from "@/app/font/font";
import { useHadithCollectionBySlug } from "@/services/hooks/hadith";
import Link from "next/link";
import { useParams } from "next/navigation";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import { HiArrowRight } from "react-icons/hi2";

const ListCard = () => {
  const params = useParams();
  const bookSlug = params?.bookSlug as string;
  const { data, isLoading, isError } = useHadithCollectionBySlug(bookSlug);

  if (isLoading)
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Rectangle key={index} width="auto" height="72px" borderRadius="14px" />
        ))}
      </div>
    );

  if (isError) return <FallbackError />;

  if (!data || data.length === 0) {
    return (
      <p className={`${roboto.className} text-sm text-[#7D887A] py-4`}>
        No collections found for this book yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((item, index: number) => (
        <Link key={item.id} href={`/hadith/${bookSlug}/${item.id}`}>
          <div className="group w-full bg-white rounded-tr-[1.3rem] rounded-bl-[1.3rem] py-3 px-4 flex items-center gap-4 transition-all duration-200 ease-in-out border border-[#C2CDD3] cursor-pointer hover:-translate-y-[2px] hover:border-[#DBB346] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
            <span className="flex-shrink-0 bg-[#d9d9d9] text-black font-bold text-[1.3rem] py-2 px-5 flex items-center justify-center rounded-tr-[1rem] rounded-bl-[1rem] transition-colors duration-200 max-md:text-[1rem] max-md:py-2 max-md:px-4 max-[500px]:text-[0.8rem] max-[500px]:py-[0.4rem] max-[500px]:px-[0.8rem] group-hover:bg-[#DBB346] group-hover:text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex justify-between items-center w-full gap-8 max-[600px]:gap-4">
              <p
                className={`${primary_font.className} text-[1.1rem] tracking-[0.05rem] text-[#5C6357] font-normal transition-colors duration-200 group-hover:text-[#8A6D59] max-md:text-[0.9rem] max-[600px]:text-[0.8rem]`}
              >
                {item.nameEn}
              </p>
              <span
                className={`${roboto.className} flex-shrink-0 w-fit text-nowrap text-sm text-[#7D887A] max-md:text-[0.8rem] max-[600px]:text-[0.7rem]`}
              >
                Ch. {item.startingChapter}–{item.endingChapter}
              </span>
            </div>
            <HiArrowRight className="flex-shrink-0 w-4 h-4 text-[#C2CDD3] transition-all duration-200 group-hover:text-[#DBB346] group-hover:translate-x-1 max-[500px]:hidden" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListCard;
