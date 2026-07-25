import { primary_font, roboto } from "@/app/font/font";

const sh = {
  heroImage: "bg-[url('/Images/supplicationsHero.png')] min-h-[26rem] w-full bg-center bg-no-repeat bg-cover relative flex justify-center items-center before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(100deg,rgba(250,248,240,0.72)_0%,rgba(255,255,255,0.15)_100%)] max-[600px]:min-h-[22rem] max-[600px]:items-start max-[600px]:pt-10",
  content: "relative flex flex-col justify-center items-start text-start w-[55%] max-w-[760px] mr-[28rem] gap-5 z-[1] before:content-[''] before:absolute before:left-[-1.25rem] before:top-0 before:bottom-0 before:w-[3px] before:bg-[linear-gradient(180deg,#c69e30_0%,transparent_100%)] before:rounded-[2px] max-[1200px]:mr-56 max-[1200px]:w-[60%] max-[973px]:w-[82%] max-[973px]:mr-0 max-[973px]:mt-16 max-[973px]:mb-16 max-[973px]:self-center max-[973px]:px-4 max-[973px]:before:hidden max-[600px]:w-[90%] max-[600px]:gap-4 max-[600px]:mt-8 max-[600px]:mb-8",
  h2: "text-[clamp(1.1rem,1.6vw,1.4rem)] font-normal leading-[2] text-[#3a3a2e] [direction:rtl] max-[600px]:text-[1rem] max-[600px]:leading-[1.8]",
  h3: "text-[clamp(1rem,1.4vw,1.25rem)] font-semibold leading-[1.65] text-[#2c2c2c] italic max-[600px]:text-[0.9rem]",
  p: "inline-block tracking-[0.08rem] text-[0.9rem] font-medium text-[#c69e30] bg-[rgba(198,158,48,0.1)] py-[0.3rem] px-3 rounded-[20px] border border-[rgba(198,158,48,0.25)] max-[600px]:text-[0.8rem]",
};

interface HeroProps {
  arabicText: string;
  englishTranslation: string;
  reference: string;
}

const SupplicationHero: React.FC<HeroProps> = ({ arabicText, englishTranslation, reference }) => {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className="flex w-full">
        <div className={sh.heroImage}>
          <div className={sh.content}>
            <h2 className={`${roboto.className} ${sh.h2}`}>{arabicText}</h2>
            <h3 className={`${primary_font.className} ${sh.h3}`}>{englishTranslation}</h3>
            <p className={`${roboto.className} ${sh.p}`}>{reference}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplicationHero;
