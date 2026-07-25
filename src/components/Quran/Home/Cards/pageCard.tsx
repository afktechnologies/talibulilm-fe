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
import { PageList } from "@/types/surah";
import Link from "next/link";

interface PageCardProps {
  item: PageList;
}

const pc = {
  card: "group flex items-center gap-12 p-4 border border-[#c2cdd3] bg-white shadow-none! rounded-tr-[1.2rem]! rounded-bl-[1.2rem]! overflow-hidden transition-colors duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px] hover:border-[#DBB346]! hover:bg-[rgba(219,179,70,0.3)]",
  cardContent: "flex items-center justify-between gap-12 w-full",
  labelSection: "flex items-center justify-between gap-12 max-[780px]:gap-8 max-[480px]:gap-4 max-[400px]:gap-[0.8rem]",
  right: "flex items-center justify-between w-[50%] mr-16 max-[1100px]:w-[40%] max-[780px]:w-[30%] max-[620px]:mr-8 max-[480px]:w-[30%] max-[400px]:w-[25%] max-[400px]:mr-4 max-[360px]:w-[25%] max-[360px]:mr-2",
  rightSpan: "text-[1.1rem]! text-black! max-[620px]:text-[1rem]! max-[530px]:text-[0.9rem]! max-[480px]:text-[0.8rem]! max-[360px]:text-[0.7rem]!",
  arabicText: "text-[1.6rem]! font-medium! text-black max-[620px]:text-[1.4rem]! max-[620px]:font-medium! max-[530px]:text-[1.2rem]! max-[530px]:font-normal! max-[480px]:text-[1rem]! max-[480px]:font-normal! max-[360px]:text-[1rem]! max-[360px]:font-normal!",
  englishText: "flex items-center text-[1.1rem]! text-black! max-[620px]:text-[1rem]! max-[530px]:text-[0.9rem]! max-[480px]:text-[0.8rem]! max-[360px]:text-[0.7rem]!",
  index: "bg-[#d9d9d9] text-black font-bold text-[1.5rem] py-2 px-6 flex items-center justify-center rounded-tr-[1rem] rounded-bl-[1rem] transition-colors duration-300 group-hover:text-white group-hover:bg-[#DBB346] max-[480px]:text-[1rem] max-[480px]:py-[0.3rem] max-[480px]:px-[0.8rem]",
};

const PageCard = ({ item }: PageCardProps) => {
  return (
    <Link
      href={`/quran/${item.surahInfo.slug}?mode=translation&verse=${item.ayahNumber[0]}`}
      className={pc.card}
    >
      <div className={`${roboto.className} ${pc.cardContent}`}>
        <div className={pc.labelSection}>
          <span className={`${primary_font.className} ${pc.index}`}>
            {String(item.pageNumber).padStart(2, "0")}
          </span>
          <span className={`${primary_font.className} ${pc.englishText}`}>{item.surahInfo.nameEn}</span>
        </div>
        <div className={pc.right}>
          <span className={pc.rightSpan}>{`${item.surahNumber}:${item.ayahNumber[0]}`}</span>
          <p className={pc.arabicText}>{item.surahInfo.nameAr}</p>
        </div>
      </div>
    </Link>
  );
};

export default PageCard;