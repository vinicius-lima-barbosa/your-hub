"use client";

import { CalendarDays } from "lucide-react";

import { useAppStoreHydration } from "@/hooks/use-app-store-hydration.hook";
import { useAppStore } from "@/store/app.store";
import EventCountdown from "./event-countdown";

export default function Event() {
  const countdown = useAppStore((state) => state.countdown);
  const setCountdown = useAppStore((state) => state.setCountdown);
  const resetCountdown = useAppStore((state) => state.resetCountdown);
  const hasHydrated = useAppStoreHydration();

  return (
    <article className="min-h-90 rounded-lg border border-border bg-surface p-5">
      {hasHydrated ? (
        <EventCountdown
          countdown={countdown}
          onChange={setCountdown}
          onReset={resetCountdown}
        />
      ) : (
        <>
          <div className="mb-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-muted" aria-hidden />
              <h2 className="text-sm font-medium">Next Event</h2>
            </div>
            <span className="text-xs text-muted">Loading...</span>
          </div>
          <div className="flex min-h-60 flex-col justify-center">
            <p className="max-w-2xl text-balance text-4xl font-semibold tracking-normal text-muted sm:text-5xl">
              Define the next milestone.
            </p>
          </div>
        </>
      )}
    </article>
  );
}
