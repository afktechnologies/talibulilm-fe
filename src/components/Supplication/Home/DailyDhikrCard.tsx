// import Image from "next/image";
// import styles from "./dailyDhikr.module.css";
// import { primary_font, roboto } from "@/app/font/font";

// type Dua = {
//     pic: string;
//   title: string;
// };

// type DuaCardProps = {
//   data: Dua;
// };
// const DailyDhikrCard = ({ data }: DuaCardProps) => {


//   return (
//     <div className={styles.card} >
//         <Image src={`/Images/Supplications/${data.pic}`} alt={data.title} width={300} height={240}/>
//       <h3 className={roboto.className} >{data.title}</h3>
//     </div>
//   );
// };


// export default DailyDhikrCard


import Image from "next/image";
import styles from "./dailyDhikr.module.css";
import { roboto } from "@/app/font/font";
import type { DuaItem } from "@/app/supplication/page";
import Link from "next/link";

type DuaCardProps = {
  data: DuaItem;
};

const DailyDhikrCard = ({ data }: DuaCardProps) => {
  return (
    <div className={styles.card}>
      <Link href="/supplication/dua/">
      <div className={styles.cardImageWrap}>
        <Image
          src={`/Images/Supplications/${data.pic}`}
          alt={data.title}
          width={300}
          height={200}
          className={styles.cardImage}
        />
        <div className={styles.cardOverlay} />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardIcon}>{data.icon}</span>
        <h3 className={`${roboto.className} ${styles.cardTitle}`}>{data.title}</h3>
      </div>
      </Link>
    </div>
  );
};

export default DailyDhikrCard;