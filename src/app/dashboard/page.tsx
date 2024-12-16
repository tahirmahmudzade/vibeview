import { auth } from "@/lib/auth";
import {
  getUserAlbums,
  getUserSavedTracks,
  getUserTopArtists,
} from "@/lib/spotify";

export default async function Dashboard() {
  const session = await auth();

  if (session) {
    console.log("Access Token:", session.user.accessToken);

    // Fetch user's top tracks
    const albums = await getUserAlbums(session.user.accessToken);
    console.log("Top Tracks:", albums);
    const savedTracks = await getUserSavedTracks(session.user.accessToken);
    console.log("Saved Tracks:", savedTracks);
    const topArtists = await getUserTopArtists(session.user.accessToken);
    console.log("Top Artists:", topArtists);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Top Tracks</h1>
    </div>
  );
}
