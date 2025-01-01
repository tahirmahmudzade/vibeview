import {
  RecentlyPlayedTracksResponse,
  Entities,
  UserPlaylistsResponse,
  UserProfile,
  FollowedArtistsResponse,
  UserSavedAlbumsResponse,
  SavedTrack,
  CurrentlyPlayingTrackResponse,
  Device,
} from "@/types/types";

const BASE_URL = "https://api.spotify.com/v1/";

async function spotifyFetch<T>(
  endpoint: string,
  accessToken: string,
  options: RequestInit = {},
  isVoid = false
): Promise<T | void> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    ...options,
  });

  if (!response.ok) {
    console.log("Response", response);
    throw new Error(`Failed to fetch from endpoint: ${endpoint}`);
  }

  if (!isVoid) {
    return await response.json();
  }
}

export async function getUserProfile(
  accessToken: string
): Promise<UserProfile> {
  try {
    return (await spotifyFetch<UserProfile>("me", accessToken)) as UserProfile;
  } catch (error) {
    console.error("Error in getUserProfile", error);
    throw error; // Modify this if you want custom error handling
  }
}

export async function getUserAlbums(
  accessToken: string
): Promise<UserSavedAlbumsResponse> {
  try {
    return (await spotifyFetch<UserSavedAlbumsResponse>(
      "me/albums",
      accessToken
    )) as UserSavedAlbumsResponse;
  } catch (error) {
    console.error("Error in getUserAlbums", error);
    throw error;
  }
}

export async function getUserSavedTracks(
  accessToken: string
): Promise<SavedTrack[]> {
  try {
    const data = (await spotifyFetch<{ items: SavedTrack[] }>(
      "me/tracks",
      accessToken
    )) as { items: SavedTrack[] };
    return data.items;
  } catch (error) {
    console.error("Error in getUserSavedTracks", error);
    throw error;
  }
}

export async function getUserTopEntities<T>(
  entity: "artists" | "tracks",
  accessToken: string,
  timeRange: "short_term" | "medium_term" | "long_term" = "short_term",
  limit = 50
): Promise<Entities<T>> {
  try {
    return (await spotifyFetch<Entities<T>>(
      `me/top/${entity}?time_range=${timeRange}&limit=${limit}`,
      accessToken
    )) as Entities<T>;
  } catch (error) {
    console.error(`Error in getUserTopEntities (${entity})`, error);
    throw error;
  }
}

export async function getRecentlyPlayedTracks(
  accessToken: string
): Promise<RecentlyPlayedTracksResponse> {
  try {
    return (await spotifyFetch<RecentlyPlayedTracksResponse>(
      "me/player/recently-played",
      accessToken
    )) as RecentlyPlayedTracksResponse;
  } catch (error) {
    console.error("Error in getRecentlyPlayedTracks", error);
    throw error;
  }
}

export async function getUserPlaylists(
  accessToken: string,
  limit = 50
): Promise<UserPlaylistsResponse> {
  try {
    return (await spotifyFetch<UserPlaylistsResponse>(
      `me/playlists?limit=${limit}`,
      accessToken
    )) as UserPlaylistsResponse;
  } catch (error) {
    console.error("Error in getUserPlaylists", error);
    throw error;
  }
}

export async function getFollowedArtists(
  accessToken: string
): Promise<FollowedArtistsResponse> {
  try {
    const data = (await spotifyFetch<{ artists: FollowedArtistsResponse }>(
      "me/following?type=artist",
      accessToken
    )) as { artists: FollowedArtistsResponse };
    return data.artists;
  } catch (error) {
    console.error("Error in getFollowedArtists", error);
    throw error;
  }
}

export async function getCurrentlyPlayingTrack(
  accessToken: string
): Promise<CurrentlyPlayingTrackResponse | null> {
  try {
    return (await spotifyFetch<CurrentlyPlayingTrackResponse>(
      "me/player/currently-playing",
      accessToken
    )) as CurrentlyPlayingTrackResponse;
  } catch (error) {
    console.log("No track currently playing", error);

    return null;
  }
}

export async function getAllDevices(
  accessToken: string
): Promise<{ devices: Device[] } | null> {
  try {
    const data = (await spotifyFetch<{ devices: Device[] }>(
      "me/player/devices",
      accessToken
    )) as { devices: Device[] };

    return data;
  } catch (err) {
    console.log("Error in getAllDevices", err);
    return null;
  }
}

export async function skipTo(
  accessToken: string,
  deviceId: string,
  actionType: "next" | "previous"
) {
  try {
    const endpoint = `me/player/${actionType}`;

    await spotifyFetch<void>(
      `${endpoint}?device_id=${deviceId}`,
      accessToken,
      {
        method: "POST",
      },
      true
    );
  } catch (error) {
    console.error(`Error in skipTo ${actionType}`, error);
    throw error;
  }
}

export async function pauseCurrentTrack(accessToken: string, deviceId: string) {
  try {
    await spotifyFetch<void>(
      `me/player/pause?device_id=${deviceId}`,
      accessToken,
      { method: "PUT" },
      true
    );
  } catch (error) {
    console.error("Error in pauseCurrentTrack", error);
    throw error;
  }
}

export async function startResumeTrack(accessToken: string, deviceId: string) {
  try {
    await spotifyFetch<void>(
      `me/player/play?device_id=${deviceId}`,
      accessToken,
      { method: "PUT" },
      true
    );
  } catch (error) {
    console.error("Error in startResumeTrack", error);
    throw error;
  }
}
