"use server";

import {
  getCurrentlyPlayingTrack,
  pauseCurrentTrack,
  skipTo,
  startResumeTrack,
} from "@/lib/spotify";

export async function skip(
  accessToken: string,
  deviceId: string,
  actionType: "next" | "previous"
) {
  try {
    await skipTo(accessToken, deviceId, actionType);

    return { status: 200, message: "Track skipped" };
  } catch (err) {
    console.log("ERROR during skipping", err);

    return {
      status: 500,
      error: "Something went wrong skipping the track",
    };
  }
}

export async function accessCurrentTrack(accessToken: string) {
  try {
    const currentTrack = await getCurrentlyPlayingTrack(accessToken);

    if (currentTrack?.item) {
      return {
        status: 200,
        track: currentTrack.item,
        disallows: currentTrack.actions.disallows,
      };
    }
  } catch (err) {
    console.log("ERROR during getting current track", err);
    return {
      status: 500,
      error: "Something went wrong getting the current track",
    };
  }
}

export async function pauseTrack(accessToken: string, deviceId: string) {
  try {
    await pauseCurrentTrack(accessToken, deviceId);

    return { status: 200, message: "Track paused" };
  } catch (err) {
    console.log("ERROR during pausing", err);

    return {
      status: 500,
      error: "Something went wrong pausing the track",
    };
  }
}

export async function resumeTrack(accessToken: string, deviceId: string) {
  try {
    await startResumeTrack(accessToken, deviceId);

    return { status: 200, message: "Track resumed" };
  } catch (err) {
    console.log("ERROR during resuming", err);

    return {
      status: 500,
      error: "Something went wrong resuming the track",
    };
  }
}
