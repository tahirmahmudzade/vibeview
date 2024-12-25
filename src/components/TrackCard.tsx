"use client";

import { formatMilliseconds } from "@/lib/utils";
import { Track } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";

interface TrackCardProps {
  track: Track;
  index: number;
}

export default function TrackCard({ track, index }: TrackCardProps) {
  return (
    <Card
      key={track.id}
      className="relative p-4 bg-black/50 rounded-xl shadow-md border border-white/10 flex flex-col items-center gap-2 h-[220px]"
    >
      {/* Track Number */}
      <span
        className="absolute top-2 left-2 bg-green-600 text-black font-bold rounded-full shadow
        text-xs px-1.5 py-0.5 sm:text-sm sm:px-2 sm:py-1"
      >
        {index + 1}
      </span>

      {/* Album Image */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full">
        <Image
          src={track.album.images[0]?.url || "/placeholder.png"}
          alt={track.name}
          width={80}
          height={80}
          className="object-cover"
          onError={(e) => (e.currentTarget.src = "/default-track.jpg")}
        />
      </div>

      {/* Track Info */}
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
  );
}
