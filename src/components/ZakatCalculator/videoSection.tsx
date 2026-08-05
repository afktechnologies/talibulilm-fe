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
      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-[900px] flex flex-col justify-center">
          <div
            className="group relative flex justify-center items-center cursor-pointer aspect-video w-full rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            onClick={() => setIsOpen(true)}
          >
            <Image
              src={ZakatCalculatorThumbnail}
              alt="Video thumbnail"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />
            <div className="relative z-[1] text-[#5C6357] bg-white rounded-full p-5 flex justify-center items-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <IoIosPlay className="w-8 h-8" />
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
