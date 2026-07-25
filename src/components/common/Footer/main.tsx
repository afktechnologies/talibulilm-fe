"use client";
import FooterLinks from "./FooterLinks";
import { FaRegCopyright } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { primary_font } from "@/app/font/font";

const MainFooter = () => {
  const pathname = usePathname(); // Get the current path
  const pageActive = pathname.split("/")[1] || "home"; // Determine the active page

  return (
    <>
      {pageActive !== "admin" && pageActive !== "auth" && (
        <div className="w-full bg-[#5C6357] py-4 px-6 overflow-hidden">
          <FooterLinks />
          <div className={`${primary_font.className} flex justify-center items-center py-6`}>
            <p className="text-center font-thin text-[#D9D9D9] max-md:text-[0.8rem]">
              Copyright <FaRegCopyright className="w-4 h-4 mx-2 p-0 max-md:w-[0.8rem] max-md:h-[0.8rem]" /> 2025 <span className="font-bold">TALIBULILM</span> All Rights Reserved
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MainFooter;
