// components/VideoSection.tsx
"use client";
import React, { useState } from "react";
import { IoIosPlay } from "react-icons/io";
import Image from "next/image";
import ZakatCalculatorThumbnail from "../../../public/Images/ZakatCalculator/thumbnail.png";
import VideoModal from "../common/Modals/videoModal";

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const YOUTUBE_ID = "OVYYAVZ6OoI"; // Replace with your YouTube video ID

  return (
    <>
      <div className="flex justify-center mt-12 mr-0 mb-4 ml-0">
        <div className="w-full max-w-[1440px] flex flex-col justify-center">
          <div className="relative flex justify-center items-center cursor-pointer my-12 py-8 px-10 border-[3px] border-[#7D887A] rounded-[10px] max-md:my-8 max-md:py-4 max-md:px-6">
            <Image
              src={ZakatCalculatorThumbnail}
              alt="Video thumbnail"
              className="block w-full h-[500px] rounded-xl border-2 border-[#ccc]"
              layout="responsive"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5C6357] bg-[#C2CDD3] rounded-full p-4 flex justify-center items-center transition-colors duration-300 hover:bg-[#5C6357] hover:text-[#C2CDD3]" onClick={() => setIsOpen(true)}>
              <IoIosPlay className="w-10 h-10" />
            </div>
          </div>

          {isOpen && (
            <VideoModal videoId={YOUTUBE_ID} onClose={() => setIsOpen(false)} />
          )}
        </div>
      </div>
    </>
  );
};

export default VideoSection;
