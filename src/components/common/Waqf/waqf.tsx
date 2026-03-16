import Image from "next/image";
import React from "react";
import styles from "./waqf.module.css";
import waqf from "../../../../public/Images/waqf.png";
import convertToArabic from 'num-to-arabic';

interface WaqfComponentProps {
  ayah: number;
}

const WaqfComponent: React.FC<WaqfComponentProps> = ({ ayah }) => {
  return (
    <div className={styles.ayahBadge}>
      <Image
        src={waqf}
        alt="ayah"
        width={32}
        height={32}
        className={styles.originImg}
      />
      <span className={styles.ayahNumber}>{convertToArabic(ayah)}</span>
    </div>
  );
};

export default WaqfComponent;
