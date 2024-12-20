"use client";

import { useState } from "react";
import { Terms, Track } from "@/types/types";
import PaginationControls from "@/components/PaginationControls";
import { getTopTracksAction } from "@/app/actions/getEntities";
import TermMenu from "./TermMenu";
import TrackCard from "./TrackCard";

interface TopTracksClientProps {
  initialTracks: Track[];
  accessToken: string;
}

export default function TopTracksSection({
  initialTracks,
  accessToken,
}: TopTracksClientProps) {
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [term, setTerm] = useState<Terms>("short_term");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTracks = tracks.slice(startIndex, startIndex + itemsPerPage);

  async function handleTermChange(selected: Terms) {
    setTerm(selected);
    setCurrentPage(1);
    const fetchedTracks = await getTopTracksAction(accessToken, selected);
    setTracks(fetchedTracks);
  }

  return (
    <div>
      <div className="flex items-center mb-4 whitespace-nowrap">
        <h2 className="text-xl font-semibold tracking-tight">Top Tracks</h2>
        <TermMenu handleTermChange={handleTermChange} term={term} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:max-h-[none] sm:overflow-visible max-h-[700px] overflow-y-auto">
        {paginatedTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(tracks.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
