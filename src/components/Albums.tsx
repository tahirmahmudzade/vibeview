import { getUserAlbums } from "@/lib/spotify";

import AlbumsSection from "./AlbumsSection";

type AlbumsProps = { accessToken: string };

export default async function Albums({ accessToken }: AlbumsProps) {
  const { items: savedAlbums } = await getUserAlbums(accessToken);

  return <AlbumsSection savedAlbums={savedAlbums} />;
}
