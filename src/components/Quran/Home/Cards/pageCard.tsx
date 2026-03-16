// "use client";

// import { primary_font, roboto } from "@/app/font/font";
// import styles from "./pageCard.module.css";
// import { PageList } from "@/types/surah";

// interface PageCardProps {
// item: PageList;
// }

// const PageCard = ({ item }: PageCardProps) => {
//   return (
//           <div className={styles.card}>
//             <div className={`${roboto.className} ${styles.cardContent}`}>
//               <div className={styles.labelSection}>
//                 <span className={`${primary_font.className} ${styles.index}`}>
//                   {String(item.pageNumber).padStart(2, "0")}
//                 </span>
//                 <span className={styles.englishText}>{item.surahInfo.nameEn}</span>
//               </div>
//               <div className={styles.right}>
//                 <span>{`${item.surahNumber}:${item.ayahNumber[0]}`}</span>
//                 <p className={styles.arabicText}>{item.surahInfo.nameAr}</p>
//               </div>
//             </div>
//           </div>
//   );
// };

// export default PageCard;

"use client";

import { primary_font, roboto } from "@/app/font/font";
import styles from "./pageCard.module.css";
import { PageList } from "@/types/surah";
import Link from "next/link";

interface PageCardProps {
  item: PageList;
}

const PageCard = ({ item }: PageCardProps) => {
  return (
    <Link
      href={`/quran/${item.surahInfo.slug}?mode=translation&verse=${item.ayahNumber[0]}`}
      className={styles.card}
    >
      <div className={`${roboto.className} ${styles.cardContent}`}>
        <div className={styles.labelSection}>
          <span className={`${primary_font.className} ${styles.index}`}>
            {String(item.pageNumber).padStart(2, "0")}
          </span>
          <span className={`${primary_font.className} ${styles.englishText}`}>{item.surahInfo.nameEn}</span>
        </div>
        <div className={styles.right}>
          <span>{`${item.surahNumber}:${item.ayahNumber[0]}`}</span>
          <p className={styles.arabicText}>{item.surahInfo.nameAr}</p>
        </div>
      </div>
    </Link>
  );
};

export default PageCard;