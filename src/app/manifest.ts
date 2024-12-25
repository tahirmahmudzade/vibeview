import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VibeView",
    short_name: "VibeView",
    description:
      "VibeView lets you visualize and explore your Spotify stats, discover your top tracks, artists, and listening habits with ease.",
    start_url: "/",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#0d210b",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
