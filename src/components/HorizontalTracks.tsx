"use client";

import { Track } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import { formatMilliseconds } from "@/lib/utils";

interface HorizontalTracksProps {
  title: string;
  tracks: { track: Track }[];
}

export default function HorizontalTracks({
  title,
  tracks,
}: HorizontalTracksProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold tracking-tight mb-4">{title}</h2>
      <div className="grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-green-700">
        {tracks.map(({ track }, index) => (
          <Card
            key={`${track.id}-${title}-${index}`}
            className="w-32 sm:w-36 md:w-40 p-3 sm:p-4 bg-black/50 rounded-xl shadow-md border border-white/10 flex flex-col items-center gap-2"
          >
            <Image
              src={track.album.images[0]?.url || "/placeholder.png"}
              alt={track.name}
              width={track.album.images[0].width}
              height={track.album.images[0].height}
              className="rounded-lg sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]"
            />
            <div className="text-center flex-1 flex flex-col justify-center">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white leading-snug line-clamp-2">
                {track.name}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 leading-snug line-clamp-2">
                {track.artists[0].name}
              </p>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mt-1">
                {formatMilliseconds(track.duration_ms)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
