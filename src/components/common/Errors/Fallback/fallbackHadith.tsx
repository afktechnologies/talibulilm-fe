import styles from "./fallback.module.css";
import fallbackImage from "../../../../../public/Images/fallbackComponentIcon.png";
import { primary_font, roboto } from "@/app/font/font";
import Image from "next/image";

const FallbackHadith = () => {
  return (
   <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
            <div>
          <Image src={fallbackImage} alt="Fall Back Component Image" />
          <h1 className={roboto.className}>Data Does not Exists</h1>
          </div>
          <h2 >&quot; مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ فِيهِ فَهُوَ رَدٌّ &quot;
          </h2>
          <h4 className={primary_font.className}>
            Allah&apos;s Messenger (ﷺ) said, &quot;If somebody innovates something which is not in harmony with the principles of our religion, that thing is rejected.&quot;
          </h4>
          <p className={roboto.className}>Sahih al-Bukhari 2697</p>
        </div>
      </div>
    </div>
  )
}

export default FallbackHadith