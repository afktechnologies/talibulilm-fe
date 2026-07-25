import Image from "next/image";
import comingSoonImage from "../../../../../public/Images/comingSoon.png";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";

const ComingSoon = () =>  {
  return (
    <div className="flex justify-center overflow-x-hidden mt-8 mx-0 mb-32">
      <div className="flex justify-center items-center max-w-[1440px] w-full">
        <div className="flex flex-col justify-center items-center text-center gap-4">
        <h3 className={`${primary_font.className} text-[2.5rem] max-[750px]:text-[2.2rem] max-[530px]:text-[2rem] max-[440px]:text-[1.8rem] max-[395px]:text-[1.5rem] text-[#2C7DA0]`}>Coming Soon!</h3>
        <h5 className={`${roboto.className} text-[1.5rem] max-[750px]:text-[1.2rem] max-[530px]:text-[1rem] max-[440px]:text-[0.9rem] max-[395px]:text-[0.8rem] text-black`}>
          This page is under development
        </h5>
        <Image src={comingSoonImage} alt="Error 404 Image" className="w-auto h-[280px] max-[750px]:h-[220px] max-[530px]:h-[180px] max-[440px]:h-[150px] max-[395px]:h-[150px]" />
        <p className={`${roboto.className} mt-4 text-[1.5rem] w-[70%] text-[#5c6357] max-[750px]:text-[1.2rem] max-[750px]:w-[70%] max-[530px]:text-[1rem] max-[530px]:w-[70%] max-[440px]:text-[0.9rem] max-[440px]:w-[70%] max-[395px]:text-[0.9rem] max-[395px]:w-[80%] max-[345px]:w-[90%]`}>
          By the time, Explore our Qur’an page and nourish your heart or
          <Link href="/" className="text-[rgba(198,158,48,0.87)]"> return to the home page.</Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon