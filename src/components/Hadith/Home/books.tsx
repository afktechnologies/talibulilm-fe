"use client";

import sideBar from "../../../../public/Images/Hadith/SideImage.png";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { lateef, primary_font } from "@/app/font/font";
import Link from "next/link";
import { useHadithBooks } from "@/services/hooks/hadith";
import { GiBookshelf } from "react-icons/gi";
import Rectangle from "@/components/skeleton/rectangle";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

const bgClasses = ["bg-[#7d887a]", "bg-[rgba(98,137,134,0.7)]", "bg-[#7cafa4]"];

const HadithBooks = () => {
  const { data: HadithBookList, isLoading, isError } = useHadithBooks();

  if (isLoading) {
    return (
      <div className="flex justify-center overflow-x-hidden mt-16 max-[650px]:mt-12 max-[390px]:mt-8">
        <div className="flex flex-col max-w-[1440px] w-[90%]">
          <div className="flex items-center gap-6 p-0 max-[350px]:gap-4">
            <div className="flex justify-center items-center w-10 h-10 border border-[#003845] rounded-[10px] p-[3px] bg-[#003845] max-[350px]:w-8 max-[350px]:h-8">
              <GiBookshelf className="text-white h-[1.6rem] w-[1.6rem] max-[350px]:h-[1.3rem] max-[350px]:w-[1.3rem]" />
            </div>
            <h2 className={`${primary_font.className} text-[2rem] text-[#003845] max-[650px]:text-[1.8rem] max-[350px]:text-[1.5rem]`}>Books Of Hadith</h2>
          </div>
          <div className="grid grid-cols-3 gap-14 mt-12 py-8 px-12 max-[1100px]:mt-4 max-[1100px]:grid-cols-2 max-[1100px]:gap-10 max-[650px]:grid-cols-1 max-[650px]:gap-8">
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
    return <div>
      <FallbackError />
    </div>;;
  }

  const entries = Object.entries(HadithBookList || {});

  return (
    <div className="flex justify-center overflow-x-hidden mt-16 max-[650px]:mt-12 max-[390px]:mt-8">
      <div className="flex flex-col max-w-[1440px] w-[90%]">
        <div className="flex items-center gap-6 p-0 max-[350px]:gap-4">
          <div className="flex justify-center items-center w-10 h-10 border border-[#003845] rounded-[10px] p-[3px] bg-[#003845] max-[350px]:w-8 max-[350px]:h-8">
            <GiBookshelf className="text-white h-[1.6rem] w-[1.6rem] max-[350px]:h-[1.3rem] max-[350px]:w-[1.3rem]" />
          </div>
          <h2 className={`${primary_font.className} text-[2rem] text-[#003845] max-[650px]:text-[1.8rem] max-[350px]:text-[1.5rem]`}>Books Of Hadith</h2>
        </div>
        <div className="grid grid-cols-3 gap-14 mt-12 py-8 px-12 max-[1100px]:mt-4 max-[1100px]:grid-cols-2 max-[1100px]:gap-10 max-[650px]:grid-cols-1 max-[650px]:gap-8">
          {entries.map(([key, book], index) => {
            return (
              <Link href={`/hadith/${book.slug}`} key={book.slug || key}>
                <div className="flex items-center rounded-[8px] text-white">
                  <Image src={sideBar} alt="Books List Sidebar" className="max-md:h-[80px]" />
                  <div
                    className={`flex justify-between items-center flex-grow h-[100px] rounded-tr-[10px] rounded-br-[10px] py-0 px-8 cursor-pointer max-md:h-20 max-md:px-[0.9rem] max-[390px]:px-[1.2rem] ${
                      bgClasses[index % 3]
                    }`}
                  >
                    <div className="flex flex-col gap-4 justify-center">
                      <h3 className={`${lateef.className} text-[1.8rem] tracking-[0.05em] font-normal max-md:text-[1.2rem] max-md:tracking-[0] max-[650px]:text-[1.8rem] max-[650px]:tracking-[0] max-[510px]:text-[1.2rem] max-[510px]:tracking-[0] max-[390px]:text-[1rem] max-[350px]:text-[1rem]`}>{book.nameAr}</h3>
                      <h4 className={`${primary_font.className} font-medium text-[1.25rem] max-md:text-[1rem] max-[650px]:text-[1.25rem] max-[510px]:text-[1rem] max-[390px]:text-[1rem] max-[350px]:text-[0.7rem]`}>{book.nameEn}</h4>
                    </div>
                    <IoIosArrowForward className="w-8 h-8 max-[1100px]:w-[1.2rem] max-[1100px]:h-[1.2rem] max-[390px]:w-[0.8rem] max-[390px]:h-[0.8rem]" />
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
