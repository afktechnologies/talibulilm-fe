import { lateef, primary_font, roboto } from "@/app/font/font";

interface HeroProps {
  arabicText: string;
  englishTranslation: string;
  reference: string;
}

const Hero: React.FC<HeroProps> = ({ arabicText, englishTranslation, reference }) => {
  return (
    <div>
      <div>
        <div className="bg-[linear-gradient(rgba(0,0,0.5,0),rgba(0,0,0,0.5)),url('/Images/homeHero.png')] h-[28rem] w-full bg-center bg-no-repeat bg-cover relative flex justify-center">
          <div className="flex flex-col justify-center items-center text-center text-white mt-12 max-md:mt-0 max-md:mx-4">
            <h2 className={`${lateef.className} tracking-[0.1rem] text-[2.3rem] max-[973px]:text-[1.8rem] max-md:tracking-[0.1rem] max-md:text-[1.3rem]`}>{arabicText}</h2>
            <h2 className={`${primary_font.className} tracking-[0.1rem] text-[2.3rem] max-[973px]:text-[1.8rem] max-md:tracking-[0.1rem] max-md:text-[1.3rem]`}>{englishTranslation}</h2>
            <p className={`${roboto.className} tracking-[0.1rem] mt-2 text-[1.3rem] max-[973px]:text-[0.8rem] max-md:text-[0.8rem]`}>{reference}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
