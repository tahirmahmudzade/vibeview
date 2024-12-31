"use client";

import { SavedAlbum } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";

type AlbumCardProps = { savedAlbum: SavedAlbum; index: number };

export default function AlbumCard({ savedAlbum, index }: AlbumCardProps) {
  const album = savedAlbum.album;
  return (
    <Card
      key={album.id}
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
          src={album.images[0]?.url || "/placeholder.png"}
          alt={album.name}
          width={80}
          height={80}
          className="object-cover"
          onError={(e) => (e.currentTarget.src = "/default-album.jpg")}
        />
      </div>

      {/* Playlist Info */}
      <div className="text-center flex-1 flex flex-col justify-center">
        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
          {album.name}
        </h3>
        <p className="text-gray-300 text-xs truncate">
          {album.artists[0].name}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {album.tracks.total} tracks
        </p>
      </div>
    </Card>
  );
}
