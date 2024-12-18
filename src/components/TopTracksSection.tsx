"use client";

import { useState } from "react";
import { Track } from "@/types/types";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import { formatMilliseconds } from "@/lib/utils";
import PaginationControls from "@/components/PaginationControls";

export default function TopTracksSection({ tracks }: { tracks: Track[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Paginate Tracks
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTracks = tracks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 tracking-tight">Top Tracks</h2>

      {/* Grid Container */}
      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4
          sm:max-h-[none] sm:overflow-visible
          max-h-[700px] overflow-y-auto
        "
      >
        {paginatedTracks.map((track) => (
          <Card
            key={track.id}
            className="
              p-4 bg-black/50 rounded-xl shadow-md border border-white/10
              flex flex-col items-center gap-2
              h-[220px]
            "
          >
            {/* Image */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full">
              <Image
                src={track.album.images[0]?.url || "/placeholder.png"}
                alt={track.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            {/* Track Info */}
            <div className="text-center flex-1 flex flex-col justify-center">
              <h3
                className="
                  text-sm font-bold text-white leading-snug
                  line-clamp-2
                "
              >
                {track.name}
              </h3>
              <p className="text-gray-300 text-xs truncate">
                {track.artists[0].name}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {formatMilliseconds(track.duration_ms)}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(tracks.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
