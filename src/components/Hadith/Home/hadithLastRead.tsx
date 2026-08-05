"use client";

import React from "react";
import { primary_font, roboto } from "@/app/font/font";
import Link from "next/link";
import { MdMenuBook } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const HadithLastRead: React.FC = () => {
  const lastReadItems = useSelector(
    (state: RootState) => state.hadithLastRead.items
  );

  return (
    <div className="flex justify-center overflow-x-hidden my-10">
      <div className="flex flex-col max-w-[1440px] w-[90%]">
        <div className="flex flex-col">
          <div className="flex items-center gap-5 max-[350px]:gap-4">
            <div className="flex justify-center items-center w-11 h-11 rounded-2xl bg-[#003845] shadow-[0_4px_12px_rgba(0,56,69,0.25)] max-[350px]:w-9 max-[350px]:h-9">
              <MdMenuBook className="text-white h-6 w-6 max-[350px]:h-5 max-[350px]:w-5" />
            </div>
            <div>
              <h2 className={`${primary_font.className} text-[1.7rem] text-[#003845] leading-tight max-[650px]:text-[1.4rem] max-[350px]:text-[1.2rem]`}>Last Read</h2>
              <p className={`${roboto.className} text-sm text-[#7D887A] max-[350px]:text-xs`}>Pick up where you left off</p>
            </div>
          </div>

          {lastReadItems.length > 0 ? (
            <ul className="flex w-full justify-start items-center gap-3 mt-6 mb-2 overflow-x-scroll overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {lastReadItems.map((item, index) => (
                <Link key={index} href={`/hadith/${item.bookSlug}/${item.collectionId}`}>
                  <li
                    className={`${primary_font.className} w-max list-none py-2 px-4 border border-[#C2CDD3] rounded-full text-sm text-[#8A6D59] cursor-pointer font-semibold transition-colors duration-200 hover:bg-[#DBB346]/15 hover:border-[#DBB346] hover:text-[#8A6D59]`}
                  >
                    {item.bookName} – {item.bookRef}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className={`${primary_font.className} mt-6 mb-2 text-[#7D887A] italic`}>
              You haven&apos;t started reading Hadith yet.
            </p>
          )}

          <hr className="w-full border-[#C2CDD3]/60" />
        </div>
      </div>
    </div>
  );
};

export default HadithLastRead;
