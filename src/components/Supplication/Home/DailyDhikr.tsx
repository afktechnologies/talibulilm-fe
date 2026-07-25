
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
import type { DuaItem } from "@/app/supplication/page";

interface DailyDhikrProps {
  /** Pass the first-8 slice from the parent page (or swap for an API response). */
  items: DuaItem[];
}

const DailyDhikr = ({ items }: DailyDhikrProps) => {
  return (
    <section className="flex justify-center overflow-x-hidden py-16 px-6 max-md:py-12 max-md:px-4">
      <div className="flex flex-col w-full max-w-[1300px]">
        <div className="mb-10 pl-2">
          <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-[#003049] tracking-[-0.01em] mb-2">Daily Dhikr &amp; Dua</h2>
          <div className="w-14 h-[3px] bg-[linear-gradient(90deg,#c69e30_0%,#e8c55a_100%)] rounded-[2px]" />
        </div>
        <div className="grid grid-cols-4 gap-8 max-[1100px]:grid-cols-3 max-md:grid-cols-2 max-md:gap-4 max-[480px]:grid-cols-2 max-[480px]:gap-3">
          {items.map((dua, index) => (
            <DailyDhikrCard key={dua.title || index} data={dua} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyDhikr;