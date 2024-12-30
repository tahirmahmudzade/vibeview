"use client";

import { Playlist } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";

type PlaylistCardProps = { playlist: Playlist; index: number };

export default function PlaylistCard({ playlist, index }: PlaylistCardProps) {
  return (
    <Card
      key={playlist.id}
      className="relative p-4 bg-black/50 rounded-xl shadow-md border border-white/10 flex flex-col items-center gap-2 h-[220px]"
    >
      {/* Playlist Number */}
      <span
        className="absolute top-2 left-2 bg-green-600 text-black font-bold rounded-full shadow
        text-xs px-1.5 py-0.5 sm:text-sm sm:px-2 sm:py-1"
      >
        {index + 1}
      </span>

      {/* Playlist Image */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full">
        <Image
          src={playlist.images[0]?.url || "/placeholder.png"}
          alt={playlist.name}
          width={80}
          height={80}
          className="object-cover"
          onError={(e) => (e.currentTarget.src = "/default-playlist.jpg")}
        />
      </div>

      {/* Playlist Info */}
      <div className="text-center flex-1 flex flex-col justify-center">
        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
          {playlist.name}
        </h3>
        <p className="text-gray-300 text-xs truncate">
          {playlist.owner.display_name}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {playlist.tracks.total} tracks
        </p>
      </div>
    </Card>
  );
}
