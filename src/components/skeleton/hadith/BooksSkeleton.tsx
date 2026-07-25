"use client";

import React from "react";
import { primary_font } from "@/app/font/font";

const shimmer = "bg-[linear-gradient(90deg,#ececec_25%,#f5f5f5_50%,#ececec_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_linear_infinite]";

const BooksSkeleton = () => {
  return (
    <div>
      <div>
        {/* Title Placeholder */}
        <h2 className={primary_font.className}>Books Of Hadith</h2>

        <div className="grid grid-cols-3 gap-14 mt-12 py-8 px-12 max-[1100px]:mt-4 max-[1100px]:grid-cols-2 max-[1100px]:gap-10 max-[650px]:grid-cols-1 max-[650px]:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="flex items-center rounded-[8px] text-white" key={index}>
              {/* Sidebar image placeholder */}
              <div className={`${shimmer} w-20 h-[100px] rounded-l-lg max-md:h-20`}></div>

              {/* Right details shimmer */}
              <div className={`${shimmer} flex justify-between items-center flex-grow h-[100px] rounded-tr-[10px] rounded-br-[10px] px-8 max-md:h-20 max-md:px-[0.9rem]`}>
                <div className="flex flex-col gap-2">
                  <div className={`${shimmer} h-[18px] w-[140px] rounded`}></div>
                  <div className={`${shimmer} h-[14px] w-[90px] rounded`}></div>
                </div>
                <div className={`${shimmer} w-6 h-6 rounded`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksSkeleton;
