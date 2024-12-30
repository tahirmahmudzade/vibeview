import { auth } from "@/lib/auth";
import { Suspense } from "react";
import SectionSkeleton from "@/components/SectionSkeleton";
import Artists from "@/components/Artists";

export default async function ArtistsPage() {
  const session = await auth();

  if (!session) throw new Error("No session found");

  const { accessToken } = session;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900 via-black to-black text-white font-sans space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Your Artists
      </h1>

      <Suspense fallback={<SectionSkeleton title="Artists" />}>
        <Artists accessToken={accessToken} />
      </Suspense>
    </div>
  );
}
