"use client";

import sideBar from "../../../../public/Images/Hadith/SideImage.png";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { lateef, primary_font, roboto } from "@/app/font/font";
import Link from "next/link";
import { useHadithBooks } from "@/services/hooks/hadith";
import { GiBookshelf } from "react-icons/gi";
import Rectangle from "@/components/skeleton/rectangle";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

const bgClasses = ["bg-[#7d887a]", "bg-[rgba(98,137,134,0.7)]", "bg-[#7cafa4]"];

const SectionHeader = () => (
  <div className="flex items-center gap-5 max-[350px]:gap-4">
    <div className="flex justify-center items-center w-11 h-11 rounded-2xl bg-[#003845] shadow-[0_4px_12px_rgba(0,56,69,0.25)] max-[350px]:w-9 max-[350px]:h-9">
      <GiBookshelf className="text-white h-6 w-6 max-[350px]:h-5 max-[350px]:w-5" />
    </div>
    <div>
      <h2
        className={`${primary_font.className} text-[1.7rem] text-[#003845] leading-tight max-[650px]:text-[1.4rem] max-[350px]:text-[1.2rem]`}
      >
        Books Of Hadith
      </h2>
      <p
        className={`${roboto.className} text-sm text-[#7D887A] max-[350px]:text-xs`}
      >
        Browse the major hadith collections
      </p>
    </div>
  </div>
);

const HadithBooks = () => {
  const { data: HadithBookList, isLoading, isError } = useHadithBooks();

  if (isLoading) {
    return (
      <div className="flex justify-center overflow-x-hidden mt-10 max-[650px]:mt-8">
        <div className="flex flex-col max-w-[1440px] w-[90%]">
          <SectionHeader />
          <div className="grid grid-cols-3 gap-6 mt-8 max-[1100px]:grid-cols-2 max-[650px]:grid-cols-1">
            {Array.from({ length: 6 }).map((_, index) => (
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
  }

  if (isError) {
    return (
      <div>
        <FallbackError />
      </div>
    );
  }

  const entries = Object.entries(HadithBookList || {});

  return (
    <div className="flex justify-center overflow-x-hidden mt-10 max-[650px]:mt-8">
      <div className="flex flex-col max-w-[1440px] w-[90%]">
        <SectionHeader />
        <div className="grid grid-cols-3 gap-6 mt-8 max-[1100px]:grid-cols-2 max-[650px]:grid-cols-1">
          {entries.map(([key, book], index) => {
            return (
              <Link
                href={`/hadith/${book.slug}`}
                key={book.slug || key}
                className="group"
              >
                <div className="flex items-center rounded-2xl overflow-hidden text-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
                  <Image src={sideBar} alt="" className="max-md:h-20" />
                  <div
                    className={`flex justify-between items-center flex-grow h-[100px] py-0 px-8 cursor-pointer max-md:h-20 max-md:px-[0.9rem] max-[390px]:px-[1.2rem] ${
                      bgClasses[index % 3]
                    }`}
                  >
                    <div className="flex flex-col gap-1.5 justify-center">
                      <h3
                        className={`${lateef.className} text-[1.7rem] tracking-[0.05em] font-normal leading-none max-md:text-[1.2rem] max-md:tracking-[0] max-[510px]:text-[1.2rem] max-[390px]:text-[1rem]`}
                      >
                        {book.nameAr}
                      </h3>
                      <h4
                        className={`${primary_font.className} font-medium text-[1.1rem] max-md:text-[1rem] max-[510px]:text-[1rem] max-[390px]:text-[0.9rem] max-[350px]:text-[0.75rem]`}
                      >
                        {book.nameEn}
                      </h4>
                      {!!book.collectionCount && (
                        <span
                          className={`${roboto.className} text-xs text-white/75`}
                        >
                          {book.collectionCount} collections
                        </span>
                      )}
                    </div>
                    <IoIosArrowForward className="w-6 h-6 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1 max-[1100px]:w-5 max-[1100px]:h-5 max-[390px]:w-4 max-[390px]:h-4" />
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

export default HadithBooks;
