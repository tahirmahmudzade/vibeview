"use server";

import { getUserTopEntities } from "@/lib/spotify";
import { DetailedArtist, Track } from "@/types/types";

export async function getTopTracksAction(
  accessToken: string,
  term: "short_term" | "medium_term" | "long_term"
): Promise<Track[]> {
  const { items } = await getUserTopEntities<Track>(
    "tracks",
    accessToken,
    term
  );
  return items;
}

export async function getTopArtistsAction(
  accessToken: string,
  term: "short_term" | "medium_term" | "long_term"
): Promise<DetailedArtist[]> {
  const { items } = await getUserTopEntities<DetailedArtist>(
    "artists",
    accessToken,
    term
  );
  return items;
}
