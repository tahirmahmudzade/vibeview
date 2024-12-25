import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/lib/auth";
import RootLayoutClient from "@/components/RootLayoutClient";

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

  const sessionExpiresTimestamp =
    session && new Date(session.expires).getTime();

  const shouldShowAppShell =
    sessionExpiresTimestamp && sessionExpiresTimestamp > Date.now();

  return (
    <html className="h-full dark" lang="en">
      <body className="h-full">
        <RootLayoutClient
          shouldShowAppShell={shouldShowAppShell}
          user={session?.user}
        >
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
