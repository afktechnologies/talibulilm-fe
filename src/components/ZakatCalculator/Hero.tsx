import { primary_font, lateef, roboto } from "@/app/font/font";

interface HeroProps {
  arabicText: string;
  englishTranslation: string;
  reference: string;
}

const ZakatCalculatorHero: React.FC<HeroProps> = ({ arabicText, englishTranslation, reference }) => {
  return (
    <div>
      <div>
        <div className="bg-[url('/Images/ZakatPageBG.png')] h-[30rem] w-full bg-center bg-no-repeat bg-cover relative flex justify-center">
          <div className="flex flex-col justify-center items-center text-center w-[70%] max-w-[1200px] text-[#5c6357] mt-32 gap-4 max-[973px]:mt-24 max-[973px]:w-[80%]">
            <h2 className={`${lateef.className} tracking-[0.03em] text-[2rem] max-[973px]:tracking-[0] max-[973px]:text-[1.8rem]`}>{arabicText}</h2>
            <h3 className={`${primary_font.className} tracking-[0.1rem] text-[1.6rem] font-bold max-[973px]:tracking-[0] max-[973px]:text-[1rem] max-md:text-[0.9rem]`}>{englishTranslation}</h3>
            <p className={`${roboto.className} tracking-[0.1rem] mt-2 text-[1.1rem] max-[973px]:text-[0.8rem]`}>{reference}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculatorHero;
