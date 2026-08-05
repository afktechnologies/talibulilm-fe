"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import { useAuthUser } from "@/components/common/Auth/AuthUserContext";
import { useLogout } from "@/services/hooks/auth";

const PROFILE_PATH = "/profile";

/** Replaces the navbar's static person-icon link — shows a sign-in link when logged out, an account/logout dropdown when logged in. */
export function AccountMenu({ iconClassName }: { iconClassName?: string }) {
  const user = useAuthUser();
  const router = useRouter();
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!user) {
    return (
      <Link href="/auth/login" aria-label="Sign in">
        <IoPersonOutline className={iconClassName} />
      </Link>
    );
  }

  async function handleLogout() {
    await logout.mutateAsync();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Account menu"
        className="flex items-center"
      >
        <IoPersonOutline className={iconClassName} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-[1100]">
          <Link
            href={PROFILE_PATH}
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-xs text-gray-500 border-b border-gray-100 truncate hover:bg-gray-50"
          >
            {user.firstName}
          </Link>
          <Link
            href={PROFILE_PATH}
            onClick={() => setOpen(false)}
            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            My Profile
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={logout.isPending}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
          >
            {logout.isPending ? "Signing out…" : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}
