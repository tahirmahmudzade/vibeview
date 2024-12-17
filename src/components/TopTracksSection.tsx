"use client";

import { Track } from "@/types/types";
import Image from "next/image";
import {
  Card,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { formatMilliseconds } from "@/lib/utils";

export default function TopTracksSection({ tracks }: { tracks: Track[] }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 tracking-tight">Top Tracks</h2>
      <Card className="bg-black/50 rounded-xl shadow-md p-4 max-h-64 overflow-y-auto border border-white/10">
        <Table aria-label="Top Tracks Table" className="text-sm">
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>Track</TableColumn>
            <TableColumn>Artist</TableColumn>
            <TableColumn>Duration</TableColumn>
          </TableHeader>
          <TableBody>
            {tracks.map((track, index) => (
              <TableRow key={track.id} className="h-12">
                {/* Queue Number */}
                <TableCell className="py-1 px-2">{index + 1}</TableCell>

                {/* Track Image + Track Name */}
                <TableCell className="py-1 px-2 flex items-center gap-2">
                  <div className="relative overflow-hidden rounded-full">
                    <Image
                      src={track.album.images[0].url}
                      alt={track.name}
                      width={30}
                      height={30}
                      className="object-cover"
                    />
                  </div>
                  <span>{track.name}</span>
                </TableCell>

                {/* Artist Name */}
                <TableCell className="py-1 px-2">
                  {track.artists[0].name}
                </TableCell>

                {/* Track Duration */}
                <TableCell className="py-1 px-2">
                  {formatMilliseconds(track.duration_ms)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
