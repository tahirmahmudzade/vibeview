import { getUserTopEntities } from "@/lib/spotify";
import { Track } from "@/types/types";
import TopTracksSection from "./TopTracksSection";

type TopTracksProps = {
  accessToken: string;
};

export default async function TopTracks({ accessToken }: TopTracksProps) {
  const { items: initialTracks } = await getUserTopEntities<Track>(
    "tracks",
    accessToken,
    "short_term",
    50
  );

  return (
    <TopTracksSection initialTracks={initialTracks} accessToken={accessToken} />
  );
}
