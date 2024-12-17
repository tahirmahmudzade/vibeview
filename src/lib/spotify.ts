import { TopEntities, UserProfile } from "@/types/types";

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

export async function getUserAlbums(accessToken: string) {
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
    return data.items; // List of top tracks
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return [];
  }
}

export async function getUserSavedTracks(access_token: string) {
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
    return [];
  }
}

export async function getUserTopEntities<T>(
  entity: "artists" | "tracks",
  access_token: string
): Promise<TopEntities<T>> {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/${entity}`,
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
    throw error;
  }
}
