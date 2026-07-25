import Image from "next/image";
import React from "react";
import waqf from "../../../../public/Images/waqf.png";
import convertToArabic from 'num-to-arabic';

interface WaqfComponentProps {
  ayah: number;
}

const WaqfComponent: React.FC<WaqfComponentProps> = ({ ayah }) => {
  return (
    <div className="relative w-[36px] h-[36px] inline-block mt-0 mr-4 mb-[-0.5rem] ml-4 max-md:mr-2 max-md:mb-[-1rem] max-md:ml-2 max-[500px]:ml-0 max-[500px]:mb-[-1rem] max-[360px]:mb-[-1.2rem]">
      <Image
        src={waqf}
        alt="ayah"
        width={32}
        height={32}
        className="w-full h-full block max-md:w-[80%] max-md:h-[80%] max-[500px]:w-[70%] max-[500px]:h-[70%] max-[360px]:w-[60%] max-[360px]:h-[60%]"
      />
      <span className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[1rem] font-bold text-black pointer-events-none max-md:top-[45%] max-md:left-[60%] max-[500px]:top-[40%] max-[500px]:left-[65%] max-[500px]:text-[0.8rem] max-[360px]:top-[32%] max-[360px]:left-[70%] max-[360px]:text-[0.6rem]">{convertToArabic(ayah)}</span>
    </div>
  );
};

export default WaqfComponent;
