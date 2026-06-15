import {
  CircleAlert,
  ListMusic,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app.store";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center text-xs text-stone-500">
      Loading stream...
    </div>
  ),
});

const STREAM_TITLES = [
  "Batman’s Solitude",
  "90s Gotham Nights",
  "Milky Way Station",
];

function getStreamTitle(streamIndex: number) {
  return STREAM_TITLES[streamIndex] ?? `Stream ${streamIndex + 1}`;
}

export default function PlayerControls() {
  const streamUrls = useAppStore((state) => state.player.streamUrls);
  const currentStreamIndex = useAppStore(
    (state) => state.player.currentStreamIndex,
  );
  const isPlaying = useAppStore((state) => state.player.isPlaying);
  const volume = useAppStore((state) => state.player.volume);
  const setPlayerPlaying = useAppStore((state) => state.setPlayerPlaying);
  const setPlayerVolume = useAppStore((state) => state.setPlayerVolume);
  const setCurrentStreamIndex = useAppStore(
    (state) => state.setCurrentStreamIndex,
  );
  const nextPlayerStream = useAppStore((state) => state.nextPlayerStream);
  const previousPlayerStream = useAppStore(
    (state) => state.previousPlayerStream,
  );
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const currentStreamUrl = streamUrls[currentStreamIndex] ?? streamUrls[0];
  const currentTitle = useMemo(
    () => getStreamTitle(currentStreamIndex),
    [currentStreamIndex],
  );

  function handleStreamChange(streamIndex: number) {
    setErrorMessage(null);
    setIsReady(false);
    setCurrentStreamIndex(streamIndex);
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ListMusic className="size-4 text-stone-400" aria-hidden />
          <h2 className="text-sm font-medium">Lo-Fi Stream</h2>
        </div>
        <span className="text-xs text-stone-400">
          {errorMessage ? "Blocked" : isPlaying ? "Playing" : "Idle"}
        </span>
      </div>

      <div className="flex aspect-square flex-col justify-between rounded-lg border border-white/10 bg-white/3 p-4">
        <div>
          <p className="text-sm text-stone-400">Current channel</p>
          <p className="mt-2 text-2xl font-semibold tracking-normal">
            {currentTitle}
          </p>
          <p className="mt-2 line-clamp-1 text-xs text-stone-500">
            {currentStreamUrl}
          </p>
        </div>

        <div className="relative my-5 aspect-video overflow-hidden rounded-md border border-white/10 bg-black">
          <ReactPlayer
            src={currentStreamUrl}
            playing={isPlaying}
            volume={volume}
            controls={false}
            loop
            playsInline
            width="100%"
            height="100%"
            style={{ display: "block" }}
            onReady={() => {
              setIsReady(true);
              setErrorMessage(null);
            }}
            onPlay={() => setPlayerPlaying(true)}
            onPause={() => setPlayerPlaying(false)}
            onError={(error) => {
              const errorCode =
                typeof error === "object" && error !== null && "data" in error
                  ? Number(error.data)
                  : null;

              setErrorMessage(
                errorCode === 101 || errorCode === 150
                  ? "This YouTube stream blocks embedded playback."
                  : "This stream could not be loaded.",
              );
              setPlayerPlaying(false);
            }}
          />
          {errorMessage ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black px-4 text-center text-xs text-stone-400">
              <CircleAlert className="size-5" aria-hidden />
              <span>{errorMessage}</span>
            </div>
          ) : !isReady ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black text-xs text-stone-500">
              Preparing stream...
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-stone-400 transition hover:text-stone-100"
            type="button"
            aria-label="Previous stream"
            onClick={() => {
              setErrorMessage(null);
              setIsReady(false);
              previousPlayerStream();
            }}
          >
            <SkipBack className="size-4 fill-current" aria-hidden />
          </button>

          <button
            className="inline-flex size-12 items-center justify-center rounded-md bg-stone-100 text-charcoal transition hover:bg-white"
            type="button"
            aria-label={isPlaying ? "Pause stream" : "Play stream"}
            onClick={() => setPlayerPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="size-5 fill-current" aria-hidden />
            ) : (
              <Play className="size-5 fill-current" aria-hidden />
            )}
          </button>

          <button
            className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-stone-400 transition hover:text-stone-100"
            type="button"
            aria-label="Next stream"
            onClick={() => {
              setErrorMessage(null);
              setIsReady(false);
              nextPlayerStream();
            }}
          >
            <SkipForward className="size-4 fill-current" aria-hidden />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Volume2 className="size-4 text-stone-400" aria-hidden />
          <input
            className="h-1 flex-1 accent-stone-100"
            type="range"
            min="0"
            max="1"
            step="0.01"
            aria-label="Stream volume"
            value={volume}
            onChange={(event) => setPlayerVolume(Number(event.target.value))}
          />
          <span className="w-9 text-right text-xs text-stone-400">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {streamUrls.map((streamUrl, streamIndex) => (
          <button
            key={streamUrl}
            className={cn(
              "rounded-md border border-white/10 px-3 py-2 text-left text-xs text-stone-400 transition hover:text-stone-100",
              streamIndex === currentStreamIndex &&
                "bg-white/10 text-stone-100",
            )}
            type="button"
            onClick={() => handleStreamChange(streamIndex)}
          >
            {getStreamTitle(streamIndex)}
          </button>
        ))}
      </div>
    </>
  );
}
