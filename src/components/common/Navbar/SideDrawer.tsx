"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { IoPersonCircleOutline } from "react-icons/io5";
import { primary_font, roboto } from "@/app/font/font";
import { useAuthUser } from "@/components/common/Auth/AuthUserContext";
import { useLogout } from "@/services/hooks/auth";
import { NAV_LINKS } from "./navLinks";

interface SideDrawerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  pageActive: string;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ setIsOpen, pageActive }) => {
  const user = useAuthUser();
  const router = useRouter();
  const logout = useLogout();

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  function close() {
    setIsOpen(false);
  }

  async function handleLogout() {
    await logout.mutateAsync();
    close();
    router.push("/");
    router.refresh();
  }

  return (
    <div
      className="fixed inset-0 z-[1100] bg-black/60 flex justify-start animate-[fadeIn_0.2s_ease_both]"
      onClick={close}
    >
      <div
        className="bg-[#5C6357] h-screen w-[78%] max-w-[300px] flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.25)] animate-[slideInLeft_0.3s_ease_both]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4 border-b border-white/10">
          <button type="button" aria-label="Close menu" onClick={close}>
            <RxCross2 className="w-7 h-7 text-white cursor-pointer hover:text-[#DBB346] transition-colors duration-150" />
          </button>
        </div>

        {/* Navigation links */}
        <ul className={`${roboto.className} flex flex-col flex-1 overflow-y-auto py-2`}>
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                href={link.link}
                onClick={close}
                className={`flex items-center h-12 py-2 px-8 text-[1rem] no-underline transition-colors duration-150 ${
                  pageActive === link.key
                    ? "text-[#DBB346] font-semibold bg-white/5"
                    : "text-white hover:text-[#DBB346] hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Account section — pinned to the bottom, keeps the profile icon
            inside the mobile menu instead of cluttering the top bar. */}
        <div className={`${primary_font.className} border-t border-white/10 p-4`}>
          {user ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/profile"
                onClick={close}
                className="flex items-center gap-3 text-white hover:text-[#DBB346] transition-colors duration-150"
              >
                <IoPersonCircleOutline className="w-8 h-8 flex-shrink-0" />
                <span className="text-[1rem] truncate">{user.firstName}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={logout.isPending}
                className="text-left text-sm text-white/70 hover:text-[#DBB346] transition-colors duration-150 disabled:opacity-60"
              >
                {logout.isPending ? "Signing out…" : "Sign out"}
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              onClick={close}
              className="flex items-center gap-3 text-white hover:text-[#DBB346] transition-colors duration-150"
            >
              <IoPersonCircleOutline className="w-8 h-8 flex-shrink-0" />
              <span className="text-[1rem]">Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
