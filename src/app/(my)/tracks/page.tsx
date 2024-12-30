import { auth } from "@/lib/auth";
import { Suspense } from "react";
import SectionSkeleton from "@/components/SectionSkeleton";
import TopTracks from "@/components/TopTracks";
import HorizontalTracks from "@/components/HorizontalTracks";

export default async function TracksPage() {
  const session = await auth();

  if (!session) throw new Error("No session found");

  const { accessToken } = session;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900 via-black to-black text-white font-sans space-y-12">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Your Tracks
      </h1>

      <Suspense fallback={<SectionSkeleton title="Top Tracks" />}>
        <TopTracks accessToken={accessToken} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton title="Recently Played Tracks" />}>
        <HorizontalTracks accessToken={accessToken} />
      </Suspense>
    </div>
  );
}
