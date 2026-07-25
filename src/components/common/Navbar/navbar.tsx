"use client";
import "@/styles/base.css";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiGlobeSimpleLight } from "react-icons/pi";
import { IoSettingsOutline, IoPersonOutline } from "react-icons/io5";
import { primary_font } from "@/app/font/font";
import SideDrawer from "./SideDrawer";

interface NavLinksProps {
  pageActive: string;
}

const NavLink: React.FC<NavLinksProps> = ({ pageActive }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const links = [
    { name: "Home", link: "/", key: "home" },
    { name: "Quran", link: "/quran", key: "quran" },
    { name: "Supplication", link: "/supplication", key: "supplication" },
    { name: "Hadith", link: "/hadith", key: "hadith" },
    { name: "Scholars", link: "/scholars", key: "scholars" },
    { name: "QnA", link: "/qna", key: "qna" },
    { name: "Articles", link: "/articles", key: "articles" },
    { name: "Zakat Calculator", link: "/zakat-calculator", key: "zakat-calculator" },
    { name: "Support Us", link: "/support-us", key: "support-us" },
  ];

  return (
    <div className={`flex justify-center z-[1000] text-[#5C6357] ${pageActive === "home" ? "bg-transparent" : "bg-white h-12"}`}>
      <div className="flex justify-between items-center max-w-[1440px] w-full py-4 px-12 h-12 max-[1150px]:px-8 max-md:w-full max-md:px-6">

        <div className="hidden max-[973px]:flex justify-end items-center">
          <button className="w-6 h-6 bg-transparent border-none flex flex-col justify-around mr-4 cursor-pointer max-[600px]:w-[1.3rem] max-[600px]:h-[1.3rem] max-[450px]:w-[1.2rem] max-[450px]:h-[1.2rem]" onClick={() => setIsOpen(!isOpen)}>
            <span className="block w-full whitespace-nowrap h-[3px] bg-[#5C6357]" />
            <span className="block w-full whitespace-nowrap h-[3px] bg-[#5C6357]" />
            <span className="block w-full whitespace-nowrap h-[3px] bg-[#5C6357]" />
          </button>
        </div>

        <div className="max-[973px]:hidden">
          <ul className="flex justify-between items-center gap-10 transition-colors duration-300 ease-in-out max-[1150px]:gap-8">
            {links.map((l) => (
              <li key={l.key} className={`${primary_font.className} text-[1.2rem] max-[1150px]:text-[1rem]! max-[1150px]:m-0! hover:text-[#DBB346] hover:transition-colors hover:duration-150 hover:ease-in`}>
                <Link href={l.link} className={pageActive === l.key ? "text-[#DBB346]" : ""}>
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[12%] flex justify-between items-center max-[1150px]:w-[15%] max-[973px]:w-[25%] max-md:w-[40%] max-[450px]:w-[50%]">
          <Link href=""><CiSearch className="w-6 h-6 max-[1150px]:w-[1.3rem] max-[1150px]:h-[1.3rem] max-[973px]:w-[1.4rem] max-[973px]:h-[1.4rem] max-[600px]:w-[1.2rem] max-[600px]:h-[1.2rem] max-[450px]:w-[1rem] max-[450px]:h-[1rem] hover:text-[#DBB346] hover:transition-colors hover:duration-150 hover:ease-in" /></Link>
          <Link href=""><PiGlobeSimpleLight className="w-6 h-6 max-[1150px]:w-[1.3rem] max-[1150px]:h-[1.3rem] max-[973px]:w-[1.4rem] max-[973px]:h-[1.4rem] max-[600px]:w-[1.2rem] max-[600px]:h-[1.2rem] max-[450px]:w-[1rem] max-[450px]:h-[1rem] hover:text-[#DBB346] hover:transition-colors hover:duration-150 hover:ease-in" /></Link>
          <Link href=""><IoSettingsOutline className="w-6 h-6 max-[1150px]:w-[1.3rem] max-[1150px]:h-[1.3rem] max-[973px]:w-[1.4rem] max-[973px]:h-[1.4rem] max-[600px]:w-[1.2rem] max-[600px]:h-[1.2rem] max-[450px]:w-[1rem] max-[450px]:h-[1rem] hover:text-[#DBB346] hover:transition-colors hover:duration-150 hover:ease-in" /></Link>
          <Link href=""><IoPersonOutline className="w-6 h-6 max-[1150px]:w-[1.3rem] max-[1150px]:h-[1.3rem] max-[973px]:w-[1.4rem] max-[973px]:h-[1.4rem] max-[600px]:w-[1.2rem] max-[600px]:h-[1.2rem] max-[450px]:w-[1rem] max-[450px]:h-[1rem] hover:text-[#DBB346] hover:transition-colors hover:duration-150 hover:ease-in" /></Link>
        </div>

        {isOpen && <SideDrawer setIsOpen={setIsOpen} isOpen={isOpen} pageActive={pageActive} />}
      </div>
    </div>
  );
};

export default NavLink;
