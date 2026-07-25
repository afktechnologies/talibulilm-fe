import { primary_font, lateef, roboto } from "@/app/font/font";

interface QuranHeroProps {
  arabicText: string;
  englishTranslation: string;
  reference: string;
}

const QuranicVerse: React.FC<QuranHeroProps> = ({
  arabicText,
  englishTranslation,
  reference,
}) => {
  return (
    <div className="flex justify-center overflow-x-hidden mt-12 mx-0 mb-16">
      <div className="flex flex-col max-w-[1440px] w-[70%] max-[973px]:w-[80%]">
        <div className="flex flex-col justify-center items-center text-center gap-[0.8rem]">
          <h2 className={`${lateef.className} tracking-[0.04em] text-[2.5rem] text-[#5c6357] max-[973px]:tracking-[0] max-[973px]:text-[1.8rem]`}>{arabicText}</h2>
          <h3 className={`${primary_font.className} tracking-[0.1rem] text-[1.3rem] font-bold text-[rgba(0,0,0,0.75)] max-[973px]:tracking-[0] max-[973px]:text-[1rem]`}>{englishTranslation}</h3>
          <p className={`${roboto.className} tracking-[0.1rem] mt-2 text-[1.1rem] text-[#5c6357] max-[973px]:text-[0.8rem]`}>{reference}</p>
        </div>
      </div>
    </div>
  );
};

export default QuranicVerse;
