"use client";
import React from "react";
import { primary_font, roboto } from "@/app/font/font";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const QuranLastRead: React.FC = () => {
  const lastReadItems = useSelector((state: RootState) => state.quranLastRead.items);

  return (
    <div className="flex justify-center mt-8 mr-4 mb-4 ml-4">
      <div className="flex flex-col max-w-[1440px] w-full mb-4">
        <div className="flex flex-col m-4">
          <h2 className={`${roboto.className} mx-4 text-[#7a604f]`}>Last Read</h2>
          {lastReadItems.length > 0 ? (
            <ul className="flex w-full justify-start items-center gap-6 m-4 overflow-x-scroll overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {lastReadItems.map((item, index) => (
                <Link
                  key={index}
                  href={`/quran/${item.surahSlug}?verse=${item.ayahNumber}`}
                >
                  <li className={`${primary_font.className} w-max py-[0.2rem] px-4 border border-solid border-[#c2cdd3] rounded-[5px] text-[1rem] text-[#8A6D59] cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[rgba(219,179,70,0.3)] hover:text-white hover:border-[#DBB346]`}>
                    {item.surahNameEn} {item.surahNumber}:{item.ayahNumber}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className={`${primary_font.className} m-4 text-[#DBB346] text-[1.2rem] font-bold`}>`&quot;`You haven’t started reading yet.`&quot;`</p>
          )}
        </div>
        <hr className="w-full text-[#C2CDD3]" />
      </div>
    </div>
  );
};

export default QuranLastRead;
