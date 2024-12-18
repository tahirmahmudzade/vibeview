import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeView",
  description: "Stats for your Spotify playlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body className="h-full">{children}</body>
    </html>
  );
}
