"use client";

import { DetailedArtist } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";

type ArtistCardProps = { artist: DetailedArtist; index: number };

export default function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <Card
      key={artist.id}
      className="p-4 bg-black/50 rounded-xl shadow-md border border-white/10 flex flex-col items-center gap-2 h-[220px]"
    >
      <span
        className="absolute top-2 left-2 bg-green-600 text-black font-bold rounded-full shadow
        text-xs px-1.5 py-0.5 sm:text-sm sm:px-2 sm:py-1"
      >
        {index + 1}
      </span>
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full">
        <Image
          src={artist.images[0]?.url || "/placeholder.png"}
          alt={artist.name}
          width={80}
          height={80}
          className="object-cover"
          onError={(e) => (e.currentTarget.src = "/default-artist.jpg")}
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
  );
}
