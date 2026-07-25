import fallbackImage from "../../../../../public/Images/fallbackErrorComponentIcon.png";
import { primary_font, roboto } from "@/app/font/font";
import Image from "next/image";

const FallbackError= () => {
  return (
    <div className="flex justify-center overflow-x-hidden mt-8 mx-0 mb-20">
      <div className="flex justify-center items-center max-w-[1440px]">
        <div className="flex flex-col justify-center items-center text-center gap-4">
            <div>
          <Image src={fallbackImage} alt="Fall Back Component Image" className="w-auto h-[100px] max-[750px]:h-[90px] max-[600px]:h-[90px]" />
          <h1 className={`${roboto.className} text-[1.5rem] max-[750px]:text-[1.2rem] max-[600px]:text-[1.1rem] text-[#5c6357]`}>No Results Found</h1>
          </div>
          <h4 className={`${primary_font.className} text-[1.1rem] max-[750px]:text-[1rem] max-[600px]:text-[0.9rem] text-[rgba(198,158,48,0.80)] w-[80%]`}>
            “Unable to load data at the moment. Refresh or try again later”
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FallbackError;
