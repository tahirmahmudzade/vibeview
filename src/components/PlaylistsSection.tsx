"use client";

import { useState } from "react";
import { Playlist } from "@/types/types";
import PaginationControls from "@/components/PaginationControls";
import PlaylistCard from "./PlaylistCard";

type PlaylistsSectionProps = { playlists: Playlist[] };

export default function PlaylistsSection({ playlists }: PlaylistsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlaylists = playlists.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <div className="flex items-center mb-4 whitespace-nowrap">
        <h2 className="text-xl font-semibold tracking-tight">Playlists</h2>
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
        {paginatedPlaylists.map((playlist, index) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            index={startIndex + index}
          />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(playlists.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
