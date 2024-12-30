import { getRecentlyPlayedTracks, getUserSavedTracks } from "@/lib/spotify";
import HorizontalTracksSection from "./HorizontalTracksSection";

type HorizontalTracksProps = { accessToken: string };

export default async function HorizontalTracks({
  accessToken,
}: HorizontalTracksProps) {
  const recentlyPlayed = await getRecentlyPlayedTracks(accessToken);
  const savedTracks = await getUserSavedTracks(accessToken);

  return (
    <>
      <div className="grid grid-cols-1">
        <HorizontalTracksSection
          title="Recently Played Tracks"
          tracks={recentlyPlayed.items}
        />
      </div>
      <div className="grid grid-cols-1">
        <HorizontalTracksSection
          title="Recently Played Tracks"
          tracks={savedTracks}
        />
      </div>
    </>
  );
}
