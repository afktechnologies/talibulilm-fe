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
      <div className="grid grid-cols-4 max-w-[1440px] w-full text-white border-b border-white/15 gap-20 pb-10 max-md:w-full max-md:grid-cols-2 max-md:gap-8 max-md:pb-6">
        <div className="flex flex-col items-center justify-center gap-8 max-md:items-start max-md:pl-4 col-span-1 max-md:col-span-2">
          <div className="flex flex-col gap-2 items-center max-md:items-start">
            <Link href="/" className="flex justify-center items-center">
              <Image src={logo} alt="TalibulIlm" className="h-8 w-8" />
              <h3 className="px-[0.4rem] font-[cursive] text-white text-[1.5rem]">Talibulilm</h3>
            </Link>
            <p className={`${lateef.className} text-[1.5rem] tracking-[0.1rem] text-white/80`}>فَفِرُّوۤا۟ إِلَى ٱللَّهِۖ</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="https://www.facebook.com/" aria-label="Facebook" className="text-[#C2CDD3] hover:text-[#DBB346] transition-colors duration-150">
              <FaFacebookF className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/" aria-label="Instagram" className="text-[#C2CDD3] hover:text-[#DBB346] transition-colors duration-150">
              <RiInstagramFill className="w-5 h-5" />
            </Link>
            <Link href="https://play.google.com/store/apps" aria-label="Google Play Store" className="text-[#C2CDD3] hover:text-[#DBB346] transition-colors duration-150">
              <BiLogoPlayStore className="w-5 h-5" />
            </Link>
            <Link href="https://www.apple.com/in/app-store/" aria-label="Apple App Store" className="text-[#C2CDD3] hover:text-[#DBB346] transition-colors duration-150">
              <GrAppleAppStore className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="my-2 mx-4 max-md:mx-0">
          <h5 className={`${primary_font.className} text-[#DBB346] text-sm uppercase tracking-[0.12em] mb-4`}>Explore</h5>
          <ul className="flex flex-col gap-3">
            {linksLeft.map((l, i) => (
              <li className={`${primary_font.className} text-white/85 hover:text-[#DBB346] hover:transition-colors hover:duration-150`} key={i}>
                <Link href={l.link}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-2 mx-4 max-md:mx-0">
          <h5 className={`${primary_font.className} text-[#DBB346] text-sm uppercase tracking-[0.12em] mb-4`}>Resources</h5>
          <ul className="flex flex-col gap-3">
            {linksMiddle.map((l, i) => (
              <li className={`${primary_font.className} text-white/85 hover:text-[#DBB346] hover:transition-colors hover:duration-150`} key={i}>
                <Link href={l.link}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-2 mx-4 max-md:mx-0">
          <h5 className={`${primary_font.className} text-[#DBB346] text-sm uppercase tracking-[0.12em] mb-4`}>Company</h5>
          <ul className="flex flex-col gap-3">
            {linksRight.map((l, i) => (
              <li className={`${primary_font.className} text-white/85 hover:text-[#DBB346] hover:transition-colors hover:duration-150`} key={i}>
                <Link href={l.link}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
