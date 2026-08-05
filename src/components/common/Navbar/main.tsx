"use client";
import NavLink from "./navbar";
import { usePathname } from "next/navigation";
const MainNavbar = () => {
  const pathname = usePathname();
  const pageActive: string = pathname.split("/")[1] || "home";

  return (
    <div className="top-0 w-full z-[1000] transition-transform duration-300 ease-in-out h-24 max-[973px]:absolute max-[973px]:top-0 max-[973px]:left-0 max-[973px]:w-full max-[973px]:z-[1000] max-[973px]:transition-transform max-[973px]:duration-300 max-[973px]:ease-in-out">
      <NavLink pageActive={pageActive} />
    </div>
  );
};

export default MainNavbar;
