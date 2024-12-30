import { getUserTopEntities } from "@/lib/spotify";
import { DetailedArtist } from "@/types/types";
import TopArtistsSection from "./TopArtistsSection";

type TopArtistsProps = { accessToken: string };

export default async function TopArtists({ accessToken }: TopArtistsProps) {
  const { items: initialArtists } = await getUserTopEntities<DetailedArtist>(
    "artists",
    accessToken,
    "short_term",
    50
  );

  return (
    <TopArtistsSection
      initialArtists={initialArtists}
      accessToken={accessToken}
    />
  );
}
