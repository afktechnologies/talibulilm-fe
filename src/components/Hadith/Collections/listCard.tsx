"use client";

import Rectangle from "@/components/skeleton/rectangle";
import { lateef, primary_font, roboto } from "@/app/font/font";
import { useHadithCollectionBySlug } from "@/services/hooks/hadith";
import Link from "next/link";
import { useParams } from "next/navigation";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

const ListCard = () => {
  const params = useParams();
  const bookSlug = params?.bookSlug as string;
  const { data, isLoading, isError } = useHadithCollectionBySlug(bookSlug);

  if (isLoading)
    return (
      <div className="flex justify-center my-8">
        <div className="w-full">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Rectangle
                key={index}
                width="auto"
                height="100px"
                borderRadius="10px"
              />
            ))}
          </div>
        </div>
      </div>
    );
  if (isError)
    return (
      <div>
        <FallbackError />
      </div>
    );

  return (
    <div className="flex justify-center my-8">
      <div className="w-full">
        <div className="flex flex-col gap-3">
          {data &&
            data.map((item, index: number) => {
              return (
                <Link key={index} href={`/hadith/${bookSlug}/${item.id}`}>
                  <div className="group w-full bg-white rounded-tr-[1.3rem] rounded-bl-[1.3rem] py-3 px-4 flex items-center justify-between transition-all duration-300 ease border border-[#C2CDD3] cursor-pointer hover:border-[#DBB346]">
                    <div className="flex justify-start items-center">
                      <span className="bg-[#d9d9d9] text-black font-bold text-[1.5rem] py-2 px-6 flex items-center justify-center rounded-tr-[1rem] rounded-bl-[1rem] max-md:text-[1rem] max-md:py-2 max-md:px-4 max-[500px]:text-[0.8rem] max-[500px]:py-[0.4rem] max-[500px]:px-[0.8rem] group-hover:bg-[#DBB346]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center w-full mt-0 mr-2 mb-0 ml-4 gap-12 max-[600px]:gap-4 max-[600px]:mx-2 max-[600px]:my-0">
                      <p className={`${primary_font.className} text-[1.2rem] tracking-[0.1rem] text-[#5C6357] font-normal max-md:text-[0.9rem] max-md:tracking-[0] max-[600px]:text-[0.8rem]`}>{item.nameEn}</p>
                      <span className={`${roboto.className} w-fit text-nowrap text-[#5C6357] max-md:text-[0.8rem] max-[600px]:text-[0.6rem]`}>
                        {item.startingChapter} - {item.endingChapter}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ListCard;
