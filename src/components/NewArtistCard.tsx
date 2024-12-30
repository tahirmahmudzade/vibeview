"use client";

import { DetailedArtist } from "@/types/types";
import { Card, Image } from "@nextui-org/react";

type ArtistCardProps = { artist: DetailedArtist };

export default function NewArtistCard({ artist }: ArtistCardProps) {
  const imageUrl =
    artist.images && artist.images.length > 0
      ? artist.images[0].url
      : "/placeholder-artist.png";

  const followerCount =
    "followers" in artist ? artist.followers.total.toLocaleString() : null;

  return (
    <Card
      isHoverable
      isPressable
      className="bg-black/50 backdrop-blur-sm border-white/10 min-w-[150px]"
    >
      <div className="flex flex-col items-center p-4">
        <Image
          src={imageUrl}
          alt={artist.name}
          width={100}
          height={100}
          radius="full"
          className="shadow-md"
        />
        <p className="mt-3 text-white text-sm text-center">{artist.name}</p>
        {followerCount && (
          <p className="text-xs text-gray-400 mt-1">
            {followerCount} Followers
          </p>
        )}
      </div>
    </Card>
  );
}
