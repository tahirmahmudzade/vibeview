import { formatMilliseconds } from "@/lib/utils";
import { Track } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";

export default function TrackCard({ track }: { track: Track }) {
  return (
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
  );
}
