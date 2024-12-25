"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import { User } from "next-auth";

interface AppShellProps {
  children: React.ReactNode;
  user?: User;
}

export default function AppShell({ children, user }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false); // For large screens
  const [drawerOpen, setDrawerOpen] = useState(false); // For small screens

  return (
    <div className="flex h-full min-h-screen bg-black">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isDrawerOpen={drawerOpen}
        closeDrawer={() => setDrawerOpen(false)}
        user={user}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className="
    flex items-center text-white px-6 py-4 md:hidden
    bg-gradient-to-br from-green-800 to-black shadow-lg
  "
        >
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 text-xl hover:bg-white/10 rounded transition-colors"
          >
            <FaBars />
          </button>
          <h1 className="ml-4 text-lg font-bold tracking-tight">VibeView</h1>
        </header>

        {/* Main Content */}
        <main
          className="
          flex-1 
          bg-gradient-to-br from-green-900 via-black to-black
          text-white font-sans space-y-12 
          overflow-auto
          min-h-screen
        "
        >
          {children}
        </main>
      </div>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}
