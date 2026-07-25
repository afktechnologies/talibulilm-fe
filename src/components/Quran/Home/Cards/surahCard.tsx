import { primary_font, roboto } from "@/app/font/font";
import { SurahList } from "@/types/surah";

interface QuranCardProps {
  item: Pick<SurahList, "surahNumber" | "nameEn" | "nameEnMeaning" | "verseCount" | "juzNumber">;
}

const sc = {
  card: "group bg-white rounded-tr-[1.3rem] rounded-bl-[1.3rem] py-3 px-4 flex items-center justify-between transition-all duration-200 ease-in-out border border-[#C2CDD3] cursor-pointer hover:-translate-y-[2px] hover:shadow-[0px_4px_8px_rgba(0,0,0,0.1)] hover:border-[#DBB346] hover:bg-[rgba(219,179,70,0.3)] hover:text-white max-[1280px]:py-3 max-[1280px]:px-2",
  header: "flex gap-[0.2rem]",
  number: "bg-[#d9d9d9] text-black font-bold text-[1.5rem] py-2 px-6 flex items-center justify-center rounded-tr-[1rem] rounded-bl-[1rem] group-hover:text-white group-hover:bg-[#DBB346] max-[1280px]:text-[1rem] max-[1280px]:py-[0.3rem] max-[1280px]:px-4 max-[600px]:text-[1.5rem] max-[400px]:text-[1.2rem] max-[400px]:py-[0.3rem] max-[400px]:px-[0.6rem]",
  title: "flex flex-col flex-grow ml-[10px]",
  titleH3: "text-[1.2rem] m-0 text-black font-normal max-[1280px]:text-[1rem] max-[600px]:text-[1.2rem] max-[400px]:text-[1rem]",
  titleP: "text-[0.8rem] text-[rgba(0,0,0,0.40)] mt-[2px] mb-0 mx-0 group-hover:text-[#5C6357] max-[1280px]:text-[0.7rem] max-[600px]:text-[0.8rem] max-[400px]:text-[0.7rem]",
  details: "flex flex-col items-end gap-[0.3rem]",
  detailsP: "text-[#CE800D] text-[1rem] max-[1280px]:text-[0.9rem] max-[600px]:text-[1rem] max-[400px]:text-[0.9rem]",
  detailsSpan: "text-[rgba(0,0,0,0.50)] text-[0.9rem] max-[1280px]:text-[0.7rem] max-[600px]:text-[0.9rem] max-[400px]:text-[0.8rem]",
};

const SurahCard = ({ item }: QuranCardProps) => {
  return (
    <div className={sc.card}>
      <div className={sc.header}>
        <span className={`${sc.number} ${primary_font.className}`}>
          {String(item.surahNumber).padStart(2, "0")}
        </span>
        <div className={sc.title}>
          <h3 className={`${primary_font.className} ${sc.titleH3}`}>{item.nameEn}</h3>
          <p className={`${roboto.className} ${sc.titleP}`}>{item.nameEnMeaning}</p>
        </div>
      </div>
      <div className={sc.details}>
        <p className={`${roboto.className} ${sc.detailsP}`}>Juz {item.juzNumber}</p>
        <span className={`${roboto.className} ${sc.detailsSpan}`}>{item.verseCount} Ayahs</span>
      </div>
    </div>
  );
};

export default SurahCard;
