"use client";

import { FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import Image from "next/image";
import { Device, Track } from "@/types/types";
// import { getCurrentlyPlayingTrack } from "@/lib/spotify";
import { useState } from "react";

export default function NowPlayingPlayback({
  track,
  accessToken,
  devicesRes,
}: {
  track: Track;
  accessToken: string;
  devicesRes: { devices: Device[] } | null;
}) {
  const [currentTrack, setCurrentTrack] = useState(track);

  const albumImage = currentTrack.album.images[0]?.url;
  const activeDevice = devicesRes?.devices.find((d) => d.is_active);

  async function handleAction(action: "next" | "previous") {
    if (!activeDevice) {
      console.error("No active device found");
      return;
    }

    try {
      const response = await fetch("/api/player/skip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
          action,
          deviceId: activeDevice.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to perform action", error);
        return;
      }

      // Wait for Spotify to update playback state
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Fetch currently playing track via the server-side API
      const trackResponse = await fetch(
        `/api/player/current?accessToken=${accessToken}`
      );

      if (!trackResponse.ok) {
        const error = await trackResponse.json();
        console.error("Failed to fetch currently playing track", error);
        return;
      }

      const newTrack = await trackResponse.json();
      if (newTrack?.item) {
        setCurrentTrack(newTrack.item);
      } else {
        console.error("No track currently playing");
      }
    } catch (error) {
      console.error("Error performing action", error);
    }
  }

  return (
    <div>
      <div className="flex items-center space-x-4">
        <Image
          src={albumImage}
          alt={currentTrack.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-[12px] sm:text-sm max-w-[100px] sm:max-w-full truncate">
            {currentTrack.name}
          </span>
          <span className="text-[10px] text-gray-300 truncate sm:text-xs">
            {currentTrack.artists.map((a) => a.name).join(", ")}
          </span>
        </div>
      </div>
      {activeDevice ? (
        <div className="flex items-center space-x-4">
          <button onClick={() => handleAction("previous")}>
            <FaStepBackward className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          </button>
          <button className="bg-white text-gray-800 rounded-full p-2">
            <FaPlay className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          </button>
          <button onClick={() => handleAction("next")}>
            <FaStepForward className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          </button>
        </div>
      ) : (
        "No active device"
      )}
    </div>
  );
}
