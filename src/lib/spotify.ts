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

export async function getUserTopArtists(access_token: string) {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("response", response);

      throw new Error("Failed to fetch top artists");
    }

    const data = await response.json();
    return data.items; // List of top artists
  } catch (error) {
    console.error("Error fetching top artists:", error);
    return [];
  }
}
