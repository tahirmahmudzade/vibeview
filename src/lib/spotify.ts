import {
  RecentlyPlayedTracksResponse,
  Entities,
  UserPlaylistsResponse,
  UserProfile,
  FollowedArtistsResponse,
  UserSavedAlbumsResponse,
  SavedTrack,
} from "@/types/types";

export async function getUserProfile(
  accessToken: string
): Promise<UserProfile> {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Error fetching user profile");
  }
}

export async function getUserAlbums(
  accessToken: string
): Promise<UserSavedAlbumsResponse> {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/albums", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("response", response);

      throw new Error("Failed to fetch top tracks");
    }

    const data = await response.json();
    return data; // List of top tracks
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw new Error("Error fetching user albums");
  }
}

export async function getUserSavedTracks(
  access_token: string
): Promise<SavedTrack[]> {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/tracks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("response", response);

      throw new Error("Failed to fetch top tracks");
    }

    const data = await response.json();
    return data.items; // List of top tracks
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw new Error("Error fetching user saved tracks");
  }
}

export async function getUserTopEntities<T>(
  entity: "artists" | "tracks",
  access_token: string,
  time_range: "short_term" | "medium_term" | "long_term" = "short_term",
  limit = 50
): Promise<Entities<T>> {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/${entity}?time_range=${time_range}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("response", response);
      throw new Error(`Failed to fetch top ${entity}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching top ${entity}:`, error);
    throw new Error(`Error fetching top ${entity}`);
  }
}

export async function getRecentlyPlayedTracks(
  access_token: string
): Promise<RecentlyPlayedTracksResponse> {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("response", response);

      throw new Error("Failed to fetch top tracks");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw new Error("Error fetching recently played tracks");
  }
}

export async function getUserPlaylists(
  access_token: string
): Promise<UserPlaylistsResponse> {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("response", response);

      throw new Error("Failed to fetch top tracks");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw new Error("Error fetching user playlists");
  }
}

export async function getFollowedArtists(
  access_token: string
): Promise<FollowedArtistsResponse> {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/following?type=artist",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("response", response);

      throw new Error("Failed to fetch top tracks");
    }

    const data = await response.json();
    return data.artists;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw new Error("Error fetching followed artists");
  }
}
