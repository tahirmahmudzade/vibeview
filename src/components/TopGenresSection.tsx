"use client";

type TopGenresSectionProps = {
  sortedGenres: string[];
};

export default function TopGenresSection({
  sortedGenres,
}: TopGenresSectionProps) {
  if (!sortedGenres?.length) {
    return <div>No genres found!</div>;
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {sortedGenres.map((genre) => (
          <span
            key={genre}
            className="bg-green-800 hover:bg-green-700 rounded-full px-3 py-1 text-sm transition-colors"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
}
