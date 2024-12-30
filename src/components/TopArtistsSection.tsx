"use client";

import { useState } from "react";
import { DetailedArtist, Terms } from "@/types/types";
import PaginationControls from "@/components/PaginationControls";
import ArtistCard from "./ArtistCard";
import TermMenu from "./TermMenu";
import { getUserTopEntities } from "@/lib/spotify";

type TopArtistsClientProps = {
  initialArtists: DetailedArtist[];
  accessToken: string;
};

export default function TopArtistsSection({
  initialArtists,
  accessToken,
}: TopArtistsClientProps) {
  const [artists, setArtists] = useState<DetailedArtist[]>(initialArtists);
  const [term, setTerm] = useState<Terms>("short_term");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArtists = artists.slice(startIndex, startIndex + itemsPerPage);

  async function handleTermChange(selected: Terms) {
    setTerm(selected);
    setCurrentPage(1);
    const { items: artists } = await getUserTopEntities<DetailedArtist>(
      "artists",
      accessToken,
      selected
    );
    setArtists(artists);
  }

  return (
    <div>
      <div className="flex items-center mb-4 whitespace-nowrap">
        <h2 className="text-xl font-semibold tracking-tight">Top Artists</h2>
        <TermMenu handleTermChange={handleTermChange} term={term} />
      </div>

      <div
        className="
      grid 
      sm:grid-cols-3 md:grid-cols-5 gap-4 
      sm:max-h-[none] sm:overflow-visible 
      max-h-[460px] overflow-x-auto scroll-smooth scrollbar-hide
      grid-flow-col auto-cols-[calc(50%-8px)] 
      sm:grid-flow-row sm:auto-cols-[unset]
    "
        style={{
          gridTemplateRows: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {paginatedArtists.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            index={startIndex + index}
          />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(artists.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
