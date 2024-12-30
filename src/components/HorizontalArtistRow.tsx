"use client";

import { DetailedArtist, Terms } from "@/types/types";
import NewArtistCard from "./NewArtistCard";
import TermMenu from "@/components/TermMenu";

type HorizontalArtistRowProps = {
  title: string;
  artists: DetailedArtist[];
  isTopArtists?: boolean;
  term?: Terms;
  handleTermChange?: (newTerm: Terms) => void;
};

export default function HorizontalArtistRow({
  title,
  artists,
  isTopArtists = false,
  term,
  handleTermChange,
}: HorizontalArtistRowProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {isTopArtists && term && handleTermChange && (
          <TermMenu term={term} handleTermChange={handleTermChange} />
        )}
      </div>
      <div
        className="grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-green-700"
        style={{ paddingBottom: "8px" }}
      >
        {artists.map((artist) => (
          <NewArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
