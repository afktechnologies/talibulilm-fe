import { primary_font, roboto } from "@/app/font/font";

interface AboutProps {
  title: string;
  description: string;
  imageSrc?: string;
}

const About: React.FC<AboutProps> = ({ title, description }) => {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className="flex justify-center items-center w-full">
        <div className="bg-[url('/Images/homeAboutBg.png')] h-[38rem] w-full bg-center bg-no-repeat bg-cover relative flex justify-center max-md:h-[32rem]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
          <div className="relative z-[1] max-w-[1440px] w-full flex justify-between items-center">
            <div className="flex flex-col justify-center w-[60%] text-white gap-4 ml-8 max-[973px]:w-[80%] max-md:w-[90%] max-md:ml-4">
              <span
                className={`${roboto.className} inline-flex items-center gap-2 w-fit text-[0.7rem] font-bold tracking-[0.16em] uppercase text-[#DBB346] bg-[rgba(219,179,70,0.12)] border border-[rgba(219,179,70,0.35)] py-1.5 px-4 rounded-full`}
              >
                Our Mission
              </span>
              <h4 className={`${primary_font.className} text-[2.5rem] leading-tight max-[973px]:text-[2rem] max-md:text-[1.8rem]`}>
                {title}
              </h4>
              <p className={`${roboto.className} text-[1.05rem] leading-relaxed text-white/85 max-[973px]:text-[1rem] max-md:text-[0.9rem]`}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
