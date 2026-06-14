import {
  Bell,
  BellOff,
  Clock3,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { useEffect, useMemo } from "react";

import { cn } from "@/lib/utils";
import {
  POMODORO_DURATIONS,
  type PomodoroMode,
  useAppStore,
} from "@/store/app.store";

const MODE_LABELS: Record<PomodoroMode, string> = {
  focus: "Focus",
  "short-break": "Short",
  "long-break": "Long",
};

function formatTimer(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function playCompletionSound() {
  const AudioContextConstructor =
    window.AudioContext ||
    (window as typeof window & {
      webkitAudioContext?: typeof globalThis.AudioContext;
    }).webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  const audioContext = new AudioContextConstructor();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
  gain.gain.setValueAtTime(0.001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.45);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

export default function PomodoroTimer() {
  const mode = useAppStore((state) => state.pomodoro.mode);
  const remainingSeconds = useAppStore(
    (state) => state.pomodoro.remainingSeconds,
  );
  const isRunning = useAppStore((state) => state.pomodoro.isRunning);
  const notificationsEnabled = useAppStore(
    (state) => state.pomodoro.notificationsEnabled,
  );
  const setPomodoroMode = useAppStore((state) => state.setPomodoroMode);
  const setPomodoroRunning = useAppStore((state) => state.setPomodoroRunning);
  const resetPomodoro = useAppStore((state) => state.resetPomodoro);
  const setNotificationsEnabled = useAppStore(
    (state) => state.setNotificationsEnabled,
  );
  const progress = useMemo(() => {
    const totalSeconds = POMODORO_DURATIONS[mode];

    return ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  }, [mode, remainingSeconds]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const currentPomodoro = useAppStore.getState().pomodoro;
      const nextRemainingSeconds = Math.max(
        0,
        currentPomodoro.remainingSeconds - 1,
      );

      if (nextRemainingSeconds === 0) {
        useAppStore.getState().setPomodoroRemainingSeconds(0);
        useAppStore.getState().setPomodoroRunning(false);

        if (currentPomodoro.notificationsEnabled) {
          playCompletionSound();
        }

        return;
      }

      useAppStore
        .getState()
        .setPomodoroRemainingSeconds(nextRemainingSeconds);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock3 className="size-4 text-muted" aria-hidden />
          <h2 className="text-sm font-medium">Pomodoro</h2>
        </div>
        <span className="rounded-full border border-border px-2 py-1 text-xs text-muted">
          {MODE_LABELS[mode]}
        </span>
      </div>

      <div className="flex items-end justify-between gap-4">
        <p className="font-mono text-5xl font-semibold tracking-normal">
          {formatTimer(remainingSeconds)}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-muted transition hover:text-foreground"
            type="button"
            aria-label="Reset pomodoro"
            onClick={resetPomodoro}
          >
            <RotateCcw className="size-4" aria-hidden />
          </button>
          <button
            className="inline-flex size-10 items-center justify-center rounded-md bg-foreground text-background transition hover:opacity-90"
            type="button"
            aria-label={isRunning ? "Pause pomodoro" : "Start pomodoro"}
            onClick={() => setPomodoroRunning(!isRunning)}
          >
            {isRunning ? (
              <Pause className="size-4 fill-current" aria-hidden />
            ) : (
              <Play className="size-4 fill-current" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div className="mt-5 h-1.5 rounded-full bg-background">
        <div
          className="h-full rounded-full bg-foreground transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-muted">
        {(Object.keys(MODE_LABELS) as PomodoroMode[]).map((pomodoroMode) => (
          <button
            key={pomodoroMode}
            className={cn(
              "rounded-md border border-border px-3 py-2 transition hover:text-foreground",
              mode === pomodoroMode && "bg-background text-foreground",
            )}
            type="button"
            onClick={() => setPomodoroMode(pomodoroMode)}
          >
            {MODE_LABELS[pomodoroMode]}
          </button>
        ))}
      </div>

      <button
        className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border px-3 text-xs text-muted transition hover:text-foreground"
        type="button"
        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
      >
        {notificationsEnabled ? (
          <Bell className="size-4" aria-hidden />
        ) : (
          <BellOff className="size-4" aria-hidden />
        )}
        {notificationsEnabled ? "Sound on" : "Sound off"}
      </button>
    </>
  );
}
