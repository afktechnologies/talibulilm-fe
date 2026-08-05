import { lateef, roboto } from "@/app/font/font";

interface HadithDetailsHeroProps {
  arabicText: string | null;
  bookName: string | null;
  isLoading?: boolean;
}

const skeletonLine = "bg-[linear-gradient(90deg,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.15)_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_linear_infinite] rounded-[6px]";

const HadithDetailsHero: React.FC<HadithDetailsHeroProps> = ({ arabicText, bookName, isLoading }) => {
  return (
    <div
      className="relative flex justify-center items-center w-full h-[22rem] bg-center bg-no-repeat bg-cover max-md:h-[18rem]"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.15),rgba(0,0,0,0.55)), url('/Images/Hadith/DetailsBg.png')" }}
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#DBB346] via-[#f4e8c7] to-[#DBB346]" />

      <div className="flex flex-col items-center justify-center gap-4 text-center text-white px-4">
        {isLoading && !arabicText ? (
          <div className={`${skeletonLine} h-8 w-[220px]`} />
        ) : (
          <h1 className={`${lateef.className} text-[2.2rem] tracking-[0.1rem] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] max-md:text-[1.7rem]`}>
            {arabicText}
          </h1>
        )}

        <div className="w-12 h-[2px] rounded-full bg-[#DBB346]/80" />

        {isLoading && !bookName ? (
          <div className={`${skeletonLine} h-6 w-[160px]`} />
        ) : (
          <h2 className={`${roboto.className} text-[1.2rem] tracking-[0.15rem] text-white/85 uppercase max-md:text-[1rem]`}>
            {bookName}
          </h2>
        )}
      </div>
    </div>
  );
};

export default HadithDetailsHero;
