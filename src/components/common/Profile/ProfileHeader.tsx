"use client";

import { useRouter } from "next/navigation";
import { primary_font, roboto } from "@/app/font/font";
import { useLogout } from "@/services/hooks/auth";
import type { AuthUser } from "@/types/auth";

function initialsFor(user: AuthUser): string {
  const first = user.firstName?.[0] ?? "";
  const last = user.lastName?.[0] ?? "";
  return `${first}${last}`.toUpperCase() || "?";
}

const ROLE_LABEL: Record<AuthUser["role"], string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR: "Editor",
  VIEWER: "Viewer",
  USER: "Member",
};

export default function ProfileHeader({ user }: { user: AuthUser }) {
  const router = useRouter();
  const logout = useLogout();

  async function handleLogout() {
    await logout.mutateAsync();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-white border border-[#C2CDD3] rounded-[14px] p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#DBB346] text-white text-[1.8rem] font-semibold shrink-0">
          {initialsFor(user)}
        </div>

        <div className="flex flex-col gap-1">
          <h1 className={`${primary_font.className} text-[1.6rem] text-[#5C6357] leading-tight`}>
            {user.firstName} {user.lastName ?? ""}
          </h1>
          <p className={`${roboto.className} text-sm text-[#7D887A] break-all`}>{user.email}</p>
          <span className="inline-block w-fit mx-auto sm:mx-0 mt-1 px-2.5 py-0.5 rounded-full bg-[rgba(219,179,70,0.15)] text-[#8A6D59] text-xs font-medium">
            {ROLE_LABEL[user.role]}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        disabled={logout.isPending}
        className={`${roboto.className} w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#003049] hover:bg-[#004a6e] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors duration-200`}
      >
        {logout.isPending ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
            </svg>
            Signing out…
          </>
        ) : (
          "Log out"
        )}
      </button>
    </div>
  );
}
