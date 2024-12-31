// app/(whatever-route)/components/TopGenres.tsx
import { getUserTopEntities } from "@/lib/spotify";
import { DetailedArtist } from "@/types/types";
import TopGenresSection from "./TopGenresSection";

type TopGenresProps = {
  accessToken: string;
};

export default async function TopGenres({ accessToken }: TopGenresProps) {
  // 1) Fetch top artists from Spotify (short_term, medium_term, etc.)
  const { items: topArtists } = await getUserTopEntities<DetailedArtist>(
    "artists",
    accessToken,
    "short_term", // or "medium_term" / "long_term"
    50
  );

  // 2) Aggregate genre counts
  const genreCounts: Record<string, number> = {};

  topArtists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      const normalizedGenre = genre.toLowerCase();
      genreCounts[normalizedGenre] = (genreCounts[normalizedGenre] || 0) + 1;
    });
  });

  // 3) Sort genres by descending frequency
  const sortedGenres = Object.entries(genreCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([genre]) => genre);

  // 4) Pass sorted genres to a client component for rendering
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Top Genres</h2>
      <div
        className="grid
          grid-rows-3
          grid-flow-col
          gap-2
          max-h-[9rem]
          overflow-x-auto
          scrollbar-hide"
      >
        <TopGenresSection sortedGenres={sortedGenres} />
      </div>
    </div>
  );
}
