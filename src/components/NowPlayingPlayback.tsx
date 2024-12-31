"use client";

import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import Image from "next/image";
import { Actions, Device, Track } from "@/types/types";
import { useState } from "react";
import {
  accessCurrentTrack,
  pauseTrack,
  resumeTrack,
  skip,
} from "@/app/actions/player";

type PlaybackProps = {
  track: Track;
  accessToken: string;
  devicesRes: { devices: Device[] } | null;
  actions: Actions;
};

export default function NowPlayingPlayback({
  track,
  accessToken,
  devicesRes,
  actions,
}: PlaybackProps) {
  const [currentTrack, setCurrentTrack] = useState({
    track,
    disallows: actions.disallows,
  });

  const [isPlaying, setIsPlaying] = useState(currentTrack.disallows.resuming);

  const albumImage = currentTrack.track.album.images[0]?.url;
  const activeDevice = devicesRes?.devices.find((d) => d.is_active);

  async function handleAction(actionType: "next" | "previous") {
    if (!activeDevice) {
      console.error("No active device found");
      return;
    }

    await skip(accessToken, activeDevice.id, actionType);

    const updatedTrack = await accessCurrentTrack(accessToken);

    if (updatedTrack?.status === 200 && updatedTrack.track) {
      setCurrentTrack((prev) => ({
        ...prev,
        track: updatedTrack.track,
        disallows: updatedTrack.disallows,
      }));

      setIsPlaying(updatedTrack.disallows.resuming);
    }
  }

  async function handlePlaybackStatus() {
    if (!activeDevice) {
      console.error("No active device found");
      return;
    }

    if (isPlaying) {
      await pauseTrack(accessToken, activeDevice.id);

      setIsPlaying(false);
    } else {
      await resumeTrack(accessToken, activeDevice.id);

      setIsPlaying(true);
    }
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image
          src={albumImage}
          alt={currentTrack.track.name}
          width={40}
          height={40}
          className="rounded-md object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold truncate text-[12px] sm:text-xs md:text-sm lg:text-base">
            {currentTrack.track.name}
          </span>
          <span className="text-[12px] sm:text-xs md:text-sm lg:text-base text-gray-400 truncate">
            {currentTrack.track.artists.map((a) => a.name).join(", ")}
          </span>
        </div>
      </div>

      {/* Playback Controls */}
      {currentTrack.disallows ? (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleAction("previous")}
            className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-all"
          >
            <FaStepBackward className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
          </button>
          <button
            onClick={handlePlaybackStatus}
            className="bg-white text-gray-800 hover:bg-gray-300 rounded-full p-3 transition-all"
          >
            {isPlaying ? (
              <FaPause className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
            ) : (
              <FaPlay className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
            )}
          </button>
          <button
            onClick={() => handleAction("next")}
            className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-all"
          >
            <FaStepForward className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
