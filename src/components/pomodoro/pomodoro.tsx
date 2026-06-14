"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppStore } from "@/store/app.store";
import PomodoroTimer from "./pomodoro-timer";

export default function Pomodoro() {
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
    <section className="rounded-lg border border-border bg-surface p-4">
      {hasHydrated ? (
        <PomodoroTimer />
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock3 className="size-4 text-muted" aria-hidden />
              <h2 className="text-sm font-medium">Pomodoro</h2>
            </div>
            <span className="rounded-full border border-border px-2 py-1 text-xs text-muted">
              Loading...
            </span>
          </div>
          <p className="font-mono text-5xl font-semibold tracking-normal text-muted">
            00:00
          </p>
        </>
      )}
    </section>
  );
}
