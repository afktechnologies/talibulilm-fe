import styles from "./fallback.module.css";
import fallbackImage from "../../../../../public/Images/fallbackComponentIcon.png";
import { primary_font, roboto } from "@/app/font/font";
import Image from "next/image";

const FallbackQuran = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
            <div>
          <Image src={fallbackImage} alt="Fall Back Component Image" />
          <h1 className={roboto.className}>Data Does not Exists</h1>
          </div>
          <h2>  ۚ ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِى وَرَضِيتُ لَكُمُ ٱلْإِسْلَـٰمَ دِينًۭا  </h2>
          <h4 className={primary_font.className}>
            “Today I have perfected your faith for you, completed My favour upon
            you, and chosen Islam as your way.”
          </h4>
          <p className={roboto.className}>Al-Quran 5:3</p>
        </div>
      </div>
    </div>
  );
};

export default FallbackQuran;
