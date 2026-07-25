import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BiLogoPlayStore } from "react-icons/bi";
import { GrAppleAppStore } from "react-icons/gr";
import { lateef, primary_font } from "@/app/font/font";
import Image from "next/image";
import logo from "../../../../public/globe.svg";

const FooterLinks = () => {
  const linksLeft = [
    { name: "Articles", link: "/articles", key: "articles" },
    { name: "Quran", link: "/quran", key: "quran" },
    { name: "Supplication", link: "/supplication", key: "supplication" },
    {
      name: "Zakat Calculator",
      link: "/zakat-calculator",
      key: "zakat-calculator",
    },
  ];

  const linksMiddle = [
    {
      name: "Islamic Calendar",
      link: "/islamic-calendar",
      key: "islamic-calendar",
    },
    { name: "Hadith", link: "/hadith", key: "hadith" },
    { name: "Scholars", link: "/scholars", key: "scholars" },
    { name: "Support Us", link: "/support-us", key: "donation" },
  ];

  const linksRight = [
    { name: "QnA", link: "/qna", key: "qna" },
    { name: "About Us", link: "/about-us", key: "islamic-calendar" },
    { name: "Contact US", link: "/contact-us", key: "hadith" },
  ];
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 max-w-[1440px] w-full text-white border-b border-white gap-20 pb-8 max-md:w-full max-md:grid-cols-2 max-md:gap-4 max-md:pb-0">
        <div className="flex flex-col items-center justify-center gap-12 max-md:items-start max-md:gap-8 max-md:pl-4">
          <div className="flex flex-col gap-[0.3rem]">
            <Link href="/" className="flex justify-center items-center">
              <Image src={logo} alt="TalibulIlm" className="h-8 w-8" />
              <h3 className="px-[0.4rem] font-[cursive] text-white text-[1.5rem]">Talibulilm</h3>
            </Link>
              <p className={`${lateef.className} text-[1.5rem] tracking-[0.1rem] text-end`}>فَفِرُّوۤا۟ إِلَى ٱللَّهِۖ</p>
          </div>
          <div className="w-[60%] flex justify-between max-[1030px]:w-full max-md:w-[80%]">
            <Link href="https://www.facebook.com/">
              <FaFacebookF className="text-[#C2CDD3] w-6 h-6 max-[1030px]:w-[1.4rem] max-[1030px]:h-[1.4rem] max-md:w-[1.3rem] max-md:h-[1.3rem]" />
            </Link>
            <Link href="https://www.instagram.com/">
              <RiInstagramFill className="text-[#C2CDD3] w-6 h-6 max-[1030px]:w-[1.4rem] max-[1030px]:h-[1.4rem] max-md:w-[1.3rem] max-md:h-[1.3rem]" />
            </Link>
            <Link href="https://play.google.com/store/apps">
              <BiLogoPlayStore className="text-[#C2CDD3] w-6 h-6 max-[1030px]:w-[1.4rem] max-[1030px]:h-[1.4rem] max-md:w-[1.3rem] max-md:h-[1.3rem]" />
            </Link>
            <Link href="https://www.apple.com/in/app-store/">
              <GrAppleAppStore className="text-[#C2CDD3] w-6 h-6 max-[1030px]:w-[1.4rem] max-[1030px]:h-[1.4rem] max-md:w-[1.3rem] max-md:h-[1.3rem]" />
            </Link>
          </div>
        </div>
        <div className="my-6 mx-4 max-md:my-2 max-md:mx-4">
          <div>
            <ul>
              {linksLeft.map((l, i) => (
                <li className={`${primary_font.className} my-4 hover:text-[#DBB346] hover:transition-colors hover:duration-100 hover:ease-in`} key={i}>
                  <Link href={l.link}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="my-6 mx-4 max-md:my-2 max-md:mx-4">
          <div>
            <ul>
              {linksMiddle.map((l, i) => (
                <li className={`${primary_font.className} my-4 hover:text-[#DBB346] hover:transition-colors hover:duration-100 hover:ease-in`} key={i}>
                  <Link href={l.link}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="my-6 mx-4 max-md:my-2 max-md:mx-4">
          <div>
            <ul>
              {linksRight.map((l, i) => (
                <li className={`${primary_font.className} my-4 hover:text-[#DBB346] hover:transition-colors hover:duration-100 hover:ease-in`} key={i}>
                  <Link href={l.link}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
