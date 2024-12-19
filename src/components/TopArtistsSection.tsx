"use client";

import { useState } from "react";
import { DetailedArtist, Terms } from "@/types/types";
import { Card, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import PaginationControls from "@/components/PaginationControls";
import { getTopArtistsAction } from "@/app/actions/getEntities";

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
        {paginatedArtists.map((artist) => (
          <Card
            key={artist.id}
            className="p-4 bg-black/50 rounded-xl shadow-md border border-white/10 flex flex-col items-center gap-2 h-[220px]"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full">
              <Image
                src={artist.images[0]?.url || "/placeholder.png"}
                alt={artist.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="text-center flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                {artist.name}
              </h3>
              <p className="text-gray-300 text-xs">
                Followers: {artist.followers.total.toLocaleString()}
              </p>
            </div>
          </Card>
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
