// app/artists/page.tsx
import { auth } from "@/lib/auth";
import { getUserTopEntities, getFollowedArtists } from "@/lib/spotify";
import { DetailedArtist } from "@/types/types";
import { Suspense } from "react";
import SectionSkeleton from "@/components/SectionSkeleton";
import ArtistsPageClient from "@/components/ArtistsPageClient";

export default async function ArtistsPage() {
  const session = await auth();
  if (!session) throw new Error("No session found");

  const { accessToken } = session;

  // Fetch Top Artists (short_term) as the default
  const { items: topArtistsShort } = await getUserTopEntities<DetailedArtist>(
    "artists",
    accessToken,
    "short_term",
    50
  );

  const followedData = await getFollowedArtists(accessToken);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900 via-black to-black text-white font-sans space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Your Artists
      </h1>

      <Suspense fallback={<SectionSkeleton title="Artists" />}>
        <ArtistsPageClient
          initialTopArtists={topArtistsShort}
          followedArtists={followedData.items}
          accessToken={accessToken}
        />
      </Suspense>
    </div>
  );
}
