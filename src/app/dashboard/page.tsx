import { auth } from "@/lib/auth";
import { getUserProfile, getUserTopEntities } from "@/lib/spotify";
import ProfileCard from "@/components/ProfileCard";
import { DetailedArtist, Track } from "@/types/types";
import { Suspense } from "react";
import ProfileSkeleton from "@/components/ProfileSkeletion";
import SectionSkeleton from "@/components/SectionSkeleton";
import TopArtistsSection from "@/components/TopArtistsSection";
import TopTracksSection from "@/components/TopTracksSection";

export default async function Dashboard() {
  const session = await auth();
  if (!session) throw new Error("No session found");

  const { accessToken } = session;

  const { items: initialTracks } = await getUserTopEntities<Track>(
    "tracks",
    accessToken,
    "short_term",
    50
  );
  const { items: initialArtists } = await getUserTopEntities<DetailedArtist>(
    "artists",
    accessToken,
    "short_term",
    50
  );

  const user = await getUserProfile(accessToken);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900 via-black to-black text-white font-sans space-y-12">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileCard user={user} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton title="Top Tracks" />}>
        <TopTracksSection
          initialTracks={initialTracks}
          accessToken={accessToken}
        />
      </Suspense>
      <Suspense fallback={<SectionSkeleton title="Top Artists" />}>
        <TopArtistsSection
          initialArtists={initialArtists}
          accessToken={accessToken}
        />
      </Suspense>
    </div>
  );
}
