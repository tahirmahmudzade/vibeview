import { auth } from "@/lib/auth";
import { Suspense } from "react";
import SectionSkeleton from "@/components/SectionSkeleton";
import Profile from "@/components/Profile";
import TopTracks from "@/components/TopTracks";
import TopArtists from "@/components/TopArtists";
import Playlists from "@/components/Playlists";
import ProfileSkeleton from "@/components/ProfileSkeletion";

export default async function Dashboard() {
  const session = await auth();

  if (!session) throw new Error("No session found");

  const { accessToken } = session;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900 via-black to-black text-white font-sans space-y-12">
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile accessToken={accessToken} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton title="Top Tracks" />}>
        <TopTracks accessToken={accessToken} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton title="Top Artists" />}>
        <TopArtists accessToken={accessToken} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton title="Public Playlists" />}>
        <Playlists accessToken={accessToken} />
      </Suspense>
    </div>
  );
}
