import { getUserPlaylists } from "@/lib/spotify";
import PlaylistsSection from "./PlaylistsSection";

type PlaylistsProps = {
  accessToken: string;
};

export default async function Playlists({ accessToken }: PlaylistsProps) {
  const { items: playlists } = await getUserPlaylists(accessToken, 50);

  return <PlaylistsSection playlists={playlists} />;
}
