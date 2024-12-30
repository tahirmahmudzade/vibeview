import { getAllDevices, getCurrentlyPlayingTrack } from "@/lib/spotify";
import { auth } from "@/lib/auth";
import NowPlayingPlayback from "./NowPlayingPlayback";

export default async function NowPlaying() {
  const session = await auth();

  if (!session?.accessToken) {
    return null;
  }

  const currentTrack = await getCurrentlyPlayingTrack(session.accessToken);

  if (!currentTrack?.item) {
    return null;
  }

  const devices = await getAllDevices(session.accessToken);

  const track = currentTrack.item;
  const actions = currentTrack.actions;

  return (
    <div
      className="
        fixed 
        bottom-4 
        left-1/2 
        transform 
        -translate-x-1/2 
        w-[90%] 
        max-w-4xl 
        h-16 
        bg-gradient-to-r 
        from-gray-900/60 
        via-gray-800/60 
        to-gray-900/60 
        rounded-full 
        backdrop-blur-md 
        shadow-lg 
        text-white 
        flex 
        items-center 
        justify-between 
        px-6 
        z-50
      "
    >
      <NowPlayingPlayback
        track={track}
        actions={actions}
        accessToken={session.accessToken}
        devicesRes={devices}
      />
    </div>
  );
}
