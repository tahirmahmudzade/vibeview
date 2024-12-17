"use client";

import { DetailedArtist } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";

export default function TopArtistsSection({
  artists,
}: {
  artists: DetailedArtist[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 tracking-tight">
        Top Artists
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <Card
            key={artist.id}
            className="p-4 bg-black/50 rounded-xl shadow-md flex items-center gap-4 border border-white/10"
          >
            <div className="relative w-20 h-20 overflow-hidden rounded-full">
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
              <p className="text-gray-300 text-sm">
                Followers: {artist.followers.total}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
