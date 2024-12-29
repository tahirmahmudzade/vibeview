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
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    console.log("Response", response);
    throw new Error(`Failed to fetch from endpoint: ${endpoint}`);
  }

  return await response.json();
}

export async function getUserProfile(
  accessToken: string
): Promise<UserProfile> {
  try {
    return await spotifyFetch<UserProfile>("me", accessToken);
  } catch (error) {
    console.error("Error in getUserProfile", error);
    throw error; // Modify this if you want custom error handling
  }
}

export async function getUserAlbums(
  accessToken: string
): Promise<UserSavedAlbumsResponse> {
  try {
    return await spotifyFetch<UserSavedAlbumsResponse>(
      "me/albums",
      accessToken
    );
  } catch (error) {
    console.error("Error in getUserAlbums", error);
    throw error;
  }
}

export async function getUserSavedTracks(
  accessToken: string
): Promise<SavedTrack[]> {
  try {
    const data = await spotifyFetch<{ items: SavedTrack[] }>(
      "me/tracks",
      accessToken
    );
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
    return await spotifyFetch<Entities<T>>(
      `me/top/${entity}?time_range=${timeRange}&limit=${limit}`,
      accessToken
    );
  } catch (error) {
    console.error(`Error in getUserTopEntities (${entity})`, error);
    throw error;
  }
}

export async function getRecentlyPlayedTracks(
  accessToken: string
): Promise<RecentlyPlayedTracksResponse> {
  try {
    return await spotifyFetch<RecentlyPlayedTracksResponse>(
      "me/player/recently-played",
      accessToken
    );
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
    return await spotifyFetch<UserPlaylistsResponse>(
      `me/playlists?limit=${limit}`,
      accessToken
    );
  } catch (error) {
    console.error("Error in getUserPlaylists", error);
    throw error;
  }
}

export async function getFollowedArtists(
  accessToken: string
): Promise<FollowedArtistsResponse> {
  try {
    const data = await spotifyFetch<{ artists: FollowedArtistsResponse }>(
      "me/following?type=artist",
      accessToken
    );
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
    return await spotifyFetch<CurrentlyPlayingTrackResponse>(
      "me/player/currently-playing",
      accessToken
    );
  } catch (error) {
    console.log("No track currently playing", error);

    return null;
  }
}

export async function startResumePlayback(
  accessToken: string,
  deviceId: string,
  uris: string[]
): Promise<void> {
  try {
    await spotifyFetch<void>(
      `me/player/play?device_id=${deviceId}`,
      accessToken,
      {
        method: "PUT",
        body: JSON.stringify({ uris }),
      }
    );
  } catch (error) {
    console.error("Error in startResumePlayback", error);
    throw error;
  }
}

export async function skipToNext(
  accessToken: string,
  deviceId: string
): Promise<void> {
  try {
    await spotifyFetch<void>(
      `me/player/next?device_id=${deviceId}`,
      accessToken,
      {
        method: "POST",
      }
    );
  } catch (error) {
    console.error("Error in skipToNext", error);
  }
}

export async function skipToPrevious(
  accessToken: string,
  deviceId: string
): Promise<void> {
  try {
    await spotifyFetch<void>(
      `me/player/previous?device_id=${deviceId}`,
      accessToken,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*", // This is a CORS header
        },
      }
    );
  } catch (error) {
    console.error("Error in skipToPrevious", error);
  }
}

export async function getAllDevices(
  accessToken: string
): Promise<{ devices: Device[] } | null> {
  try {
    console.log("feetching devices", accessToken);

    const data = await spotifyFetch<{ devices: Device[] }>(
      "me/player/devices",
      accessToken
    );

    // console.log("Devices", data);

    return data;
  } catch (err) {
    console.log("er");

    console.log("Error in getAllDevices", err);
    return null;
  }
}
