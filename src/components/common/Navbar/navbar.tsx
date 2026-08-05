"use client";
import "@/styles/base.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../../public/globe.svg";
import { primary_font } from "@/app/font/font";
import SideDrawer from "./SideDrawer";
import { AccountMenu } from "./AccountMenu";
import { NAV_LINKS } from "./navLinks";

interface NavLinksProps {
  pageActive: string;
}

const NavLink: React.FC<NavLinksProps> = ({ pageActive }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`flex justify-center z-[1000] text-[#5C6357] ${pageActive === "home" ? "bg-transparent" : "bg-white"}`}>
      <div className="flex justify-between items-center max-w-[1440px] w-full h-24 py-4 px-12 max-[1150px]:px-8 max-md:w-full max-md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image src={logo} alt="TalibulIlm" className="h-8 w-8" />
          <h3 className={`${primary_font.className} px-[0.4rem] font-[cursive] text-[#5C6357] text-[1.4rem] max-[600px]:text-[1.2rem]`}>
            Talibulilm
          </h3>
        </Link>

        {/* Desktop nav links */}
        <div className="max-[973px]:hidden">
          <ul className="flex justify-between items-center gap-10 transition-colors duration-300 ease-in-out max-[1150px]:gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.key} className={`${primary_font.className} text-[1.2rem] max-[1150px]:text-[1rem]! max-[1150px]:m-0! hover:text-[#DBB346] hover:transition-colors hover:duration-150 hover:ease-in`}>
                <Link href={l.link} className={pageActive === l.key ? "text-[#DBB346]" : ""}>
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <div className="hidden max-[973px]:flex justify-end items-center">
          <button className="w-6 h-6 bg-transparent border-none flex flex-col justify-around mr-4 cursor-pointer max-[600px]:w-[1.3rem] max-[600px]:h-[1.3rem] max-[450px]:w-[1.2rem] max-[450px]:h-[1.2rem]" onClick={() => setIsOpen(!isOpen)}>
            <span className="block w-full whitespace-nowrap h-[3px] bg-[#5C6357]" />
            <span className="block w-full whitespace-nowrap h-[3px] bg-[#5C6357]" />
            <span className="block w-full whitespace-nowrap h-[3px] bg-[#5C6357]" />
          </button>
        </div>

        {/* Desktop-only — on mobile the profile icon lives inside the SideDrawer instead. */}
        <div className="max-[973px]:hidden">
          <AccountMenu iconClassName="w-6 h-6 max-[1150px]:w-[1.3rem] max-[1150px]:h-[1.3rem] hover:text-[#DBB346] hover:transition-colors hover:duration-150 hover:ease-in" />
        </div>

        {isOpen && <SideDrawer setIsOpen={setIsOpen} isOpen={isOpen} pageActive={pageActive} />}
      </div>
    </div>
  );
};

export default NavLink;
