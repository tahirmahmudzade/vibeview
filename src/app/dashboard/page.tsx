import TopTracksSection from "@/components/TopTracksSection";
import TopArtistsSection from "@/components/TopArtistsSection";
import ProfileCard from "@/components/ProfileCard";
import { getUserProfile, getUserTopEntities } from "@/lib/spotify";
import { auth } from "@/lib/auth";
// import SubscribeButton from "@/components/SubscribeButton";
import { DetailedArtist, Track } from "@/types/types";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    throw new Error("No session found");
  }

  const { accessToken } = session;

  const user = await getUserProfile(accessToken);

  const { items: tracks } = await getUserTopEntities<Track>(
    "tracks",
    accessToken
  );

  const { items: artists } = await getUserTopEntities<DetailedArtist>(
    "artists",
    accessToken
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900 via-black to-black text-white font-sans space-y-12">
      <ProfileCard user={user} />
      <TopTracksSection tracks={tracks} />
      <TopArtistsSection artists={artists} />
    </div>
  );
}
