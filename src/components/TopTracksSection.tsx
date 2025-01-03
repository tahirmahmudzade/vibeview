"use client";

import { useState } from "react";
import { Terms, Track } from "@/types/types";
import PaginationControls from "@/components/PaginationControls";
import TermMenu from "./TermMenu";
import TrackCard from "./TrackCard";
import { getUserTopEntities } from "@/lib/spotify";

type TopTracksClientProps = { initialTracks: Track[]; accessToken: string };

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
    const { items: tracks } = await getUserTopEntities<Track>(
      "tracks",
      accessToken,
      selected
    );
    setTracks(tracks);
  }

  return (
    <>
      <div className="flex items-center mb-4 whitespace-nowrap">
        <h2 className="text-xl font-semibold tracking-tight">Top Tracks</h2>
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
        {paginatedTracks.map((track, index) => (
          <TrackCard key={track.id} track={track} index={startIndex + index} />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(tracks.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
