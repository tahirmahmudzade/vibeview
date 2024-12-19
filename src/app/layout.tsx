import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "VibeView",
  description: "Stats for your Spotify playlists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full dark" lang="en">
      <body className="h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
