"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false); // For large screens
  const [drawerOpen, setDrawerOpen] = useState(false); // For small screens

  return (
    <div className="flex h-full min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isDrawerOpen={drawerOpen}
        closeDrawer={() => setDrawerOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        {/* Header / Top Bar (Small Screens) */}
        <header
          className="
          flex items-center text-white px-4 py-3 md:hidden
          bg-gradient-to-r from-black via-[#0C1F11] to-green-900
        "
        >
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 text-xl hover:bg-white/10 rounded transition-colors"
          >
            <FaBars />
          </button>
          <h1 className="ml-4 text-lg font-semibold">VibeView</h1>
        </header>

        <main
          className="
          flex-1 p-6 
          bg-gradient-to-br from-green-900 via-black to-black 
          text-white font-sans space-y-12 
          overflow-auto
          min-h-screen
        "
        >
          {children}
        </main>
      </div>

      {/* Backdrop for small screen drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}
