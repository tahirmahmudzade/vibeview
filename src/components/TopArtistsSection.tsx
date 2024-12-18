"use client";

import { useState } from "react";
import { DetailedArtist } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import PaginationControls from "@/components/PaginationControls";

export default function TopArtistsSection({
  artists,
}: {
  artists: DetailedArtist[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Paginate Artists
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArtists = artists.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 tracking-tight">
        Top Artists
      </h2>

      {/* Grid Container */}
      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4
        "
      >
        {paginatedArtists.map((artist) => (
          <Card
            key={artist.id}
            className="
              p-4 bg-black/50 rounded-xl shadow-md border border-white/10
              flex flex-col items-center gap-2
              h-[220px] 
            "
          >
            {/* Artist Image */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full">
              <Image
                src={artist.images[0]?.url || "/placeholder.png"}
                alt={artist.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            {/* Artist Info */}
            <div className="text-center flex-1 flex flex-col justify-center">
              {/* Artist Name */}
              <h3
                className="
                  text-sm font-bold text-white leading-snug
                  line-clamp-2
                "
              >
                {artist.name}
              </h3>

              {/* Followers */}
              <p className="text-gray-300 text-xs">
                Followers: {artist.followers.total.toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(artists.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
