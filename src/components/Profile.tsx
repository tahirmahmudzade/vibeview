import { getUserProfile } from "@/lib/spotify";
import ProfileCard from "./ProfileCard";

type ProfileProps = { accessToken: string };

export default async function Profile({ accessToken }: ProfileProps) {
  const user = await getUserProfile(accessToken);

  return <ProfileCard user={user} />;
}
