// components/VideoSection.tsx
"use client";
import React, { useState } from "react";
import styles from "./videoSection.module.css";
import { IoIosPlay } from "react-icons/io";
import Image from "next/image";
import ZakatCalculatorThumbnail from "../../../public/Images/ZakatCalculator/thumbnail.png";
import VideoModal from "../common/Modals/videoModal";

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const YOUTUBE_ID = "OVYYAVZ6OoI"; // Replace with your YouTube video ID

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.videoSection}>
            <Image
              src={ZakatCalculatorThumbnail}
              alt="Video thumbnail"
              className={styles.image}
              layout="responsive"
            />
            <div className={styles.playButton} onClick={() => setIsOpen(true)}>
              <IoIosPlay />
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
