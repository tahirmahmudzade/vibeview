import TopTracksSection from "@/components/TopTracksSection";
import TopArtistsSection from "@/components/TopArtistsSection";
import ProfileCard from "@/components/ProfileCard";
import { getUserProfile, getUserTopEntities } from "@/lib/spotify";
import { auth } from "@/lib/auth";
// import SubscribeButton from "@/components/SubscribeButton";
import { DetailedArtist, Track } from "@/types/types";
import { Suspense } from "react";
import ProfileSkeleton from "@/components/ProfileSkeletion";
import SectionSkeleton from "@/components/SectionSkeleton";

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
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileCard user={user} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton title="Top Tracks" />}>
        <TopTracksSection tracks={tracks} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton title="Top Tracks" />}>
        <TopArtistsSection artists={artists} />
      </Suspense>
    </div>
  );
}
