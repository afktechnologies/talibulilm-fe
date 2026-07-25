import { lateef } from "@/app/font/font";
// import Rectangle from "@/components/skeleton/rectangle";

interface HadithDetailsHeroProps {
  arabicText: string | null;
  bookName: string | null;
  isLoading?: boolean;
}

const headingsClass = "tracking-[0.15rem] text-[1.5rem]";
const titleClass = "bg-[linear-gradient(90deg,#ececec_25%,#f5f5f5_50%,#ececec_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_linear_infinite] h-[24px] w-[200px] mb-8 rounded-[6px]";

const HadithDetailsHero: React.FC< HadithDetailsHeroProps> = ({ arabicText, bookName, isLoading  }) => {
  return (
    <div className="flex justify-center overflow-x-hidden w-full">
      <div className="flex justify-end w-full">
        <div className="bg-[linear-gradient(rgba(0,0,0.5,0),rgba(0,0,0,0.5)),url('/Images/Hadith/DetailsBg.png')] h-[28rem] w-full bg-center bg-no-repeat bg-cover flex justify-center z-[3] absolute">
          <div className="flex flex-col justify-center items-center text-center text-white mb-12">
            {isLoading && !arabicText ? (
              <div className={titleClass}></div>
            ) : (
              <h1 className={`${headingsClass} ${lateef.className}`}>{arabicText}</h1>

            )}

            {isLoading && !bookName ? (
              <div className={titleClass}></div>
            ) : (
              <h1 className={headingsClass}>{bookName}</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithDetailsHero;
