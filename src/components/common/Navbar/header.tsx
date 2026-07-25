import "@/styles/base.css";
import Image from "next/image";
import logo from "../../../../public/globe.svg";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BiLogoPlayStore } from "react-icons/bi";
import { GrAppleAppStore } from "react-icons/gr";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="flex justify-center bg-[#5C6357]">
      <div className="flex justify-between items-center max-w-[1440px] w-full h-12 text-white py-4 px-6">
          <div>
            <Link href="/" className="flex justify-center items-center">
              <Image src={logo} alt="TalibulIlm" className="h-8 w-8" />
            <h3 className="px-[0.4rem] font-[cursive] text-white text-[1.5rem]">Talibulilm</h3>
            </Link>
          </div>
          <div className="w-[12%] flex justify-between max-[1150px]:w-[20%] max-[973px]:w-[25%] max-md:w-[40%] max-[450px]:w-[50%]">
            <Link href="https://www.facebook.com/">
              <FaFacebookF className="text-[#C2CDD3] w-6 h-6 max-[1150px]:w-[1.3rem] max-[1150px]:h-[1.3rem] max-[973px]:w-[1.4rem] max-[973px]:h-[1.4rem] max-[600px]:w-[1.2rem] max-[600px]:h-[1.2rem] max-[450px]:w-[1rem] max-[450px]:h-[1rem]" />
            </Link>
            <Link href="https://www.instagram.com/">
              <RiInstagramFill className="text-[#C2CDD3] w-6 h-6 max-[1150px]:w-[1.3rem] max-[1150px]:h-[1.3rem] max-[973px]:w-[1.4rem] max-[973px]:h-[1.4rem] max-[600px]:w-[1.2rem] max-[600px]:h-[1.2rem] max-[450px]:w-[1rem] max-[450px]:h-[1rem]" />
            </Link>
            <Link href="https://play.google.com/store/apps">
              <BiLogoPlayStore className="text-[#C2CDD3] w-6 h-6 max-[1150px]:w-[1.3rem] max-[1150px]:h-[1.3rem] max-[973px]:w-[1.4rem] max-[973px]:h-[1.4rem] max-[600px]:w-[1.2rem] max-[600px]:h-[1.2rem] max-[450px]:w-[1rem] max-[450px]:h-[1rem]" />
            </Link>
            <Link href="https://www.apple.com/in/app-store/">
              <GrAppleAppStore className="text-[#C2CDD3] w-6 h-6 max-[1150px]:w-[1.3rem] max-[1150px]:h-[1.3rem] max-[973px]:w-[1.4rem] max-[973px]:h-[1.4rem] max-[600px]:w-[1.2rem] max-[600px]:h-[1.2rem] max-[450px]:w-[1rem] max-[450px]:h-[1rem]" />
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Header;
