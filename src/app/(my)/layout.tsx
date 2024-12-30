import NowPlaying from "@/components/NowPlaying";
import SectionSkeleton from "@/components/SectionSkeleton";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Suspense fallback={<SectionSkeleton title="Loading current track..." />}>
        <NowPlaying />
      </Suspense>
    </div>
  );
}
