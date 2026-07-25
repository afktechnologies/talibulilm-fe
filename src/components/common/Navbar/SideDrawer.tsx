"use client";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { roboto } from "@/app/font/font";

interface SideDrawerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  pageActive: string;
}

// Define the structure of links
const links: { name: string; link: string; key: string }[] = [
  { name: "Home", link: "/", key: "home" },
    { name: "Quran", link: "/quran", key: "quran" },
    { name: "Supplication", link: "/supplication", key: "supplication" },
    { name: "Hadith", link: "/hadith", key: "hadith" },
    { name: "Scholars", link: "/scholars", key: "scholars" },
    { name: "QnA", link: "/qna", key: "qna" },
    { name: "Articles", link: "/articles", key: "articles" },
    { name: "Zakat Calculator", link: "/zakat-calculator", key: "zakat-calculator" },
];

const SideDrawer: React.FC<SideDrawerProps> = ({ setIsOpen, isOpen, pageActive }) => {
  return (
    <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.8)] w-full h-screen flex justify-start">
      <div className="bg-[#5C6357] h-screen w-[60%] flex flex-col">
        <div className="flex justify-end p-4">
          <RxCross2 className="w-8 h-8 text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        </div>

        {/* Navigation Links */}
        <div className={`${roboto.className} flex flex-col gap-8`}>
          <ul>
            {links.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.link}
                  onClick={() => setIsOpen(false)}
                  className={pageActive === link.key ? "flex items-center text-[gold] py-2 px-8" : "flex items-center h-12 py-2 px-8 text-white text-[1rem] cursor-pointer no-underline"}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
