"use client";

import { ListMusic } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppStore } from "@/store/app.store";
import PlayerControls from "./player-controls";

export default function Player() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useAppStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    if (useAppStore.persist.hasHydrated()) {
      window.queueMicrotask(() => setHasHydrated(true));
    }

    return unsubscribe;
  }, []);

  return (
    <article className="rounded-lg border border-border bg-charcoal p-5 text-stone-100">
      {hasHydrated ? (
        <PlayerControls />
      ) : (
        <>
          <div className="mb-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ListMusic className="size-4 text-stone-400" aria-hidden />
              <h2 className="text-sm font-medium">Lo-Fi Stream</h2>
            </div>
            <span className="text-xs text-stone-400">Loading...</span>
          </div>

          <div className="flex aspect-square flex-col justify-between rounded-lg border border-white/10 bg-white/3 p-4">
            <div>
              <p className="text-sm text-stone-400">Current channel</p>
              <p className="mt-2 text-2xl font-semibold tracking-normal text-stone-500">
                Loading stream
              </p>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
