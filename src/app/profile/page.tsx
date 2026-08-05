import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { LOGIN_PATH } from "@/lib/auth/constants";
import ProfileView from "@/components/common/Profile/ProfileView";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(LOGIN_PATH);
  }

  return <ProfileView user={user} />;
}
