import styles from "./fallbackError.module.css";
import fallbackImage from "../../../../../public/Images/fallbackErrorComponentIcon.png";
import { primary_font, roboto } from "@/app/font/font";
import Image from "next/image";

const FallbackError= () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
            <div>
          <Image src={fallbackImage} alt="Fall Back Component Image" />
          <h1 className={roboto.className}>No Results Found</h1>
          </div>
          <h4 className={primary_font.className}>
            “Unable to load data at the moment. Refresh or try again later”
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FallbackError;
