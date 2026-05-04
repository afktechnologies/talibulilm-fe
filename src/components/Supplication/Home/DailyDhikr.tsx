
// import DailyDhikrCard from "./DailyDhikrCard";
// import styles from "./dailyDhikr.module.css";
// import duas from "@/store/data/duaList.json";


// type Dua = {
//   title: string;
//   pic:string;
// };

// const DailyDhikr = () => {
//   return (
//     <div className={styles.Wrapper}>
//       <div className={styles.Container}>
//         <h1>Daily Dhikr & Dua</h1>
//         <div className={styles.cardContainer}>
//           {duas.map((dua: Dua, index: number) => (
//             // <DailyDhikrCard key={dua.title || index} data={dua} />
//             <DailyDhikrCard key={dua.title} data={dua}/>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DailyDhikr;

import DailyDhikrCard from "./DailyDhikrCard";
import styles from "./dailyDhikr.module.css";
import type { DuaItem } from "@/app/supplication/page";

interface DailyDhikrProps {
  /** Pass the first-8 slice from the parent page (or swap for an API response). */
  items: DuaItem[];
}

const DailyDhikr = ({ items }: DailyDhikrProps) => {
  return (
    <section className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.headingRow}>
          <h2 className={styles.sectionTitle}>Daily Dhikr &amp; Dua</h2>
          <div className={styles.titleUnderline} />
        </div>
        <div className={styles.cardContainer}>
          {items.map((dua, index) => (
            <DailyDhikrCard key={dua.title || index} data={dua} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyDhikr;