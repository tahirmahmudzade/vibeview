import { auth } from "@/lib/auth";
import {
  getUserTopEntities,
  getRecentlyPlayedTracks,
  getUserSavedTracks,
} from "@/lib/spotify";
import { Track } from "@/types/types";
import { Suspense } from "react";
import SectionSkeleton from "@/components/SectionSkeleton";
import TopTracksSection from "@/components/TopTracksSection";
import HorizontalTracks from "@/components/HorizontalTracks";

export default async function TracksPage() {
  const session = await auth();
  if (!session) throw new Error("No session found");

  const { accessToken } = session;

  const { items: topTracks } = await getUserTopEntities<Track>(
    "tracks",
    accessToken,
    "short_term",
    50
  );
  const recentlyPlayed = await getRecentlyPlayedTracks(accessToken);
  const savedTracks = await getUserSavedTracks(accessToken);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900 via-black to-black text-white font-sans space-y-12">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Your Tracks
      </h1>

      <Suspense fallback={<SectionSkeleton title="Top Tracks" />}>
        <TopTracksSection initialTracks={topTracks} accessToken={accessToken} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton title="Recently Played Tracks" />}>
        <div className="grid grid-cols-1">
          <HorizontalTracks
            title="Recently Played Tracks"
            tracks={recentlyPlayed.items}
          />
        </div>
      </Suspense>

      <Suspense fallback={<SectionSkeleton title="Saved Tracks" />}>
        <div className="grid grid-cols-1">
          <HorizontalTracks title="Saved Tracks" tracks={savedTracks} />
        </div>
      </Suspense>
    </div>
  );
}
