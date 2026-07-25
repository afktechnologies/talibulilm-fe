import { primary_font, lateef, roboto } from "@/app/font/font"

interface QuranHeroProps {
    arabicText: string;
    englishTranslation: string;
    reference: string;
  }

const QuranHero: React.FC<QuranHeroProps> = ({ arabicText, englishTranslation, reference }) => {
  return (
<div className="flex justify-center overflow-x-hidden">
      <div className="flex justify-center w-[90%] max-w-[1440px] max-md:w-full">
        <div className="bg-[url('/Images/Quran/hero.png')] h-[25rem] w-full mt-8 bg-center bg-no-repeat flex justify-center items-center rounded-2xl max-[1050px]:mt-4 max-md:mt-0 max-md:rounded-none">
          <div className="flex flex-col justify-end items-center text-center text-white mt-16 max-[1050px]:mt-16 max-[1050px]:mr-4 max-[1050px]:mb-0 max-[1050px]:ml-4 max-md:my-12 max-md:mx-4 max-[450px]:my-8 max-[450px]:mx-4">
            <h2 className={`${lateef.className} tracking-[0.1rem] text-[2rem] max-md:text-[1.8rem] max-[450px]:text-[1.5rem]`}>&quot;{arabicText}&quot;</h2>
            <h3 className={`${primary_font.className} tracking-[0.1rem] text-[1.5rem] max-[1050px]:text-[1.2rem] max-md:text-[1.1rem] max-[450px]:text-[1rem]`}>&quot;{englishTranslation}&quot;</h3>
            <p className={`${roboto.className} tracking-[0.1rem] mt-2 text-[1.3rem] max-[1050px]:text-[1rem] max-md:text-[0.9rem] max-[450px]:text-[0.7rem]`}>{reference}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuranHero;