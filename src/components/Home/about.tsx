import { primary_font } from "@/app/font/font";

interface AboutProps {
  title: string;
  description: string;
  imageSrc?: string;
}

const About: React.FC<AboutProps> = ({ title, description }) => {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className="flex justify-center items-center w-full">
        <div className="bg-[url('/Images/homeAboutBg.png')] h-[40rem] w-full bg-center bg-no-repeat bg-cover relative flex justify-center max-md:h-[35rem]">
          <div className="max-w-[1440px] w-full flex justify-between items-center">
            <div className="flex flex-col justify-center w-[60%] text-white gap-4 ml-8 max-[973px]:w-[80%] max-md:w-[90%] max-md:ml-4">
              <h4 className={`${primary_font.className} text-[2.5rem] max-[973px]:text-[2rem] max-md:text-[1.8rem]`}>{title}</h4>
              <p className={`${primary_font.className} text-[1.3rem] max-[973px]:text-[1.2rem] max-md:text-[1rem]`}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
