"use client";

import ProfileHeader from "./ProfileHeader";
import BookmarksSection from "./BookmarksSection";
import RecentlyReadSection from "./RecentlyReadSection";
import type { AuthUser } from "@/types/auth";

export default function ProfileView({ user }: { user: AuthUser }) {
  return (
    <div className="flex justify-center w-full py-8 px-4">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        <ProfileHeader user={user} />
        <RecentlyReadSection />
        <BookmarksSection />
      </div>
    </div>
  );
}
