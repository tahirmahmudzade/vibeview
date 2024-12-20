"use client";

import { useState } from "react";
import { DetailedArtist, Terms } from "@/types/types";
import PaginationControls from "@/components/PaginationControls";
import { getTopArtistsAction } from "@/app/actions/getEntities";
import ArtistCard from "./ArtistCard";
import TermMenu from "./TermMenu";

interface TopArtistsClientProps {
  initialArtists: DetailedArtist[];
  accessToken: string;
}

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
    const fetchedArtists = await getTopArtistsAction(accessToken, selected);
    setArtists(fetchedArtists);
  }

  return (
    <div>
      <div className="flex items-center mb-4 whitespace-nowrap">
        <h2 className="text-xl font-semibold tracking-tight">Top Artists</h2>
        <TermMenu handleTermChange={handleTermChange} term={term} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:max-h-[none] sm:overflow-visible max-h-[700px] overflow-y-auto">
        {paginatedArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
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
