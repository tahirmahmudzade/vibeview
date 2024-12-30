"use client";

import { User } from "next-auth";
import { useEffect } from "react";
import AppShell from "./AppShell";

type RootLayoutClientProps = {
  shouldShowAppShell: boolean | 0 | null;
  children: React.ReactNode;
  user?: User;
};

export default function RootLayoutClient({
  shouldShowAppShell,
  children,
  user,
}: RootLayoutClientProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          // console.log(
          //   "Service Worker registered with scope:",
          //   registration.scope
          // );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <div className="h-full">
      {shouldShowAppShell ? (
        <AppShell user={user}>{children}</AppShell>
      ) : (
        children
      )}
    </div>
  );
}
