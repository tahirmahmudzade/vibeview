import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "VibeView",
  description: "Stats for your Spotify playlists",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html className="h-full dark" lang="en">
      <body className="h-full">
        {session?.user ? (
          <AppShell user={session.user}>{children}</AppShell>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
