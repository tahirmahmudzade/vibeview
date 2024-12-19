"use client";

import { useState } from "react";
import { Terms, Track } from "@/types/types";
import Image from "next/image";
import { Card, Select, SelectItem, SharedSelection } from "@nextui-org/react";
import { formatMilliseconds } from "@/lib/utils";
import PaginationControls from "@/components/PaginationControls";
import { getTopTracksAction } from "@/app/actions/getEntities";

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

  function onSelectionChange(keys: SharedSelection) {
    const selected = Array.from(keys)[0] as Terms;
    handleTermChange(selected);
  }

  return (
    <div>
      <div className="flex items-center mb-4 whitespace-nowrap">
        <h2 className="text-xl font-semibold tracking-tight">Top Tracks</h2>
        <Select
          className="ml-auto w-36 md:w-40 lg:w-48"
          selectedKeys={[term]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as
              | "short_term"
              | "medium_term"
              | "long_term";
            handleTermChange(selected);
          }}
          aria-label="Select time range"
          placeholder=""
        >
          <SelectItem key="short_term">Last 4 Weeks</SelectItem>
          <SelectItem key="medium_term">Last 6 Months</SelectItem>
          <SelectItem key="long_term">Last 1 Year</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:max-h-[none] sm:overflow-visible max-h-[700px] overflow-y-auto">
        {paginatedTracks.map((track) => (
          <Card
            key={track.id}
            className="p-4 bg-black/50 rounded-xl shadow-md border border-white/10 flex flex-col items-center gap-2 h-[220px]"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full">
              <Image
                src={track.album.images[0]?.url || "/placeholder.png"}
                alt={track.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="text-center flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
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

      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(tracks.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
