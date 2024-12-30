"use client";

import { useState } from "react";
import { DetailedArtist, Terms } from "@/types/types";
import { getUserTopEntities } from "@/lib/spotify";
import HorizontalArtistRow from "./HorizontalArtistRow";
import { Spacer } from "@nextui-org/react";

type ArtistsPageClientProps = {
  initialTopArtists: DetailedArtist[];
  followedArtists: DetailedArtist[];
  accessToken: string;
};

export default function ArtistsPageClient({
  initialTopArtists,
  followedArtists,
  accessToken,
}: ArtistsPageClientProps) {
  const [topArtists, setTopArtists] =
    useState<DetailedArtist[]>(initialTopArtists);
  const [term, setTerm] = useState<Terms>("short_term");

  async function handleTermChange(newTerm: Terms) {
    setTerm(newTerm);

    const { items } = await getUserTopEntities<DetailedArtist>(
      "artists",
      accessToken,
      newTerm,
      50
    );
    setTopArtists(items);
  }

  return (
    <div className="space-y-6">
      <Spacer y={0.5} />

      <div className="grid grid-cols-1">
        <HorizontalArtistRow
          title="Top Artists"
          artists={topArtists}
          isTopArtists
          term={term}
          handleTermChange={handleTermChange}
        />
      </div>
      {followedArtists.length > 0 ? (
        <HorizontalArtistRow
          title="Followed Artists"
          artists={followedArtists}
        />
      ) : (
        ""
      )}
    </div>
  );
}
