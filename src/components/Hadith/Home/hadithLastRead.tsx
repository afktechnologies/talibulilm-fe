"use client";

import React from "react";
import { primary_font } from "@/app/font/font";
import Link from "next/link";
import { MdMenuBook } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const HadithLastRead: React.FC = () => {
  const lastReadItems = useSelector(
    (state: RootState) => state.hadithLastRead.items
  );

  return (
    <div className="flex justify-center overflow-x-hidden my-8">
      <div className="flex flex-col max-w-[1440px] w-[90%]">
        <div className="flex flex-col">
          <div className="flex items-center gap-6 max-[350px]:gap-4">
            <div className="flex justify-center items-center w-10 h-10 border border-[#003845] rounded-[10px] p-[3px] bg-[#003845] max-[350px]:w-8 max-[350px]:h-8">
              <MdMenuBook className="text-white h-[1.6rem] w-[1.6rem] max-[350px]:h-[1.3rem] max-[350px]:w-[1.3rem]" />
            </div>
            <h2 className={`${primary_font.className} text-[2rem] text-[#003845] max-[650px]:text-[1.8rem] max-[350px]:text-[1.5rem]`}>Last Read</h2>
          </div>

          {lastReadItems.length > 0 ? (
            <ul className="flex w-full justify-start items-center gap-6 m-4 overflow-x-scroll overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {lastReadItems.map((item, index) => (
                // <Link
                //   key={index}
                //   href={`/hadith/${item.bookSlug}/${item.collectionId}`}
                // >
                <div key={index}>
                  <li className={`${primary_font.className} w-max py-[0.2rem] px-4 border border-solid border-[rgba(122,96,79,0.86)] rounded-[5px] text-[1rem] text-[rgba(122,96,79,0.86)] cursor-pointer font-bold hover:bg-[rgba(122,96,79,0.86)] hover:text-white hover:border-[rgba(122,96,79,0.86)]`}  >
                    {item.bookName} – {item.bookRef}
                  </li>
                  </div>
                // </Link>
              ))}
            </ul>
          ) : (
            <p className={primary_font.className}>
              “You haven’t started reading Hadith yet.”
            </p>
          )}

          <hr className="w-full text-[#C2CDD3]" />
        </div>
      </div>
    </div>
  );
};

export default HadithLastRead;
