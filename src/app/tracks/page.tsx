import TrackCard from "@/components/TrackCard";
import { auth } from "@/lib/auth";
import { getUserTopEntities } from "@/lib/spotify";
import { Track } from "@/types/types";

export default async function TracksPage() {
  // Authenticate the user
  const session = await auth();
  if (!session) throw new Error("No session found");

  const { accessToken } = session;

  // Fetch data for the initial load (default to top tracks with short_term range)
  const { items: initialTracks } = await getUserTopEntities<Track>(
    "tracks",
    accessToken,
    "short_term"
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-white">Your Tracks</h1>
        {/* Filter Options */}
        <form method="GET" action="/tracks">
          <select
            name="filter"
            defaultValue="top_tracks"
            className="bg-black text-gray-300 rounded-lg px-4 py-2"
            onChange={(e) => {
              const query = new URLSearchParams({
                filter: e.target.value,
              });
              window.location.href = `/tracks?${query.toString()}`;
            }}
          >
            <option value="top_tracks">Top Tracks</option>
            <option value="recently_played">Recently Played</option>
          </select>
        </form>
      </div>

      {/* Render Track Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {initialTracks.map((track, index) => (
          <TrackCard key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}
