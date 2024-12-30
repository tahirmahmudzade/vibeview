import { getFollowedArtists, getUserTopEntities } from "@/lib/spotify";
import { DetailedArtist } from "@/types/types";
import ArtistsPageClient from "./ArtistsPageClient";

type ArtistsProps = { accessToken: string };

export default async function Artists({ accessToken }: ArtistsProps) {
  const { items: topArtistsShort } = await getUserTopEntities<DetailedArtist>(
    "artists",
    accessToken,
    "short_term",
    50
  );

  const followedData = await getFollowedArtists(accessToken);

  return (
    <ArtistsPageClient
      initialTopArtists={topArtistsShort}
      followedArtists={followedData.items}
      accessToken={accessToken}
    />
  );
}
