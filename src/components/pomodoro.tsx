import { Clock3, Play } from "lucide-react";

export default function Pomodoro() {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock3 className="size-4 text-muted" aria-hidden />
          <h2 className="text-sm font-medium">Pomodoro</h2>
        </div>
        <span className="rounded-full border border-border px-2 py-1 text-xs text-muted">
          Focus
        </span>
      </div>

      <div className="flex items-end justify-between gap-4">
        <p className="font-mono text-5xl font-semibold tracking-normal">
          25:00
        </p>
        <button
          className="inline-flex size-10 items-center justify-center rounded-md bg-foreground text-background transition hover:opacity-90"
          type="button"
          aria-label="Start pomodoro"
        >
          <Play className="size-4 fill-current" aria-hidden />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-muted">
        <button
          className="rounded-md border border-border bg-background px-3 py-2 text-foreground"
          type="button"
        >
          Focus
        </button>
        <button
          className="rounded-md border border-border px-3 py-2"
          type="button"
        >
          Short
        </button>
        <button
          className="rounded-md border border-border px-3 py-2"
          type="button"
        >
          Long
        </button>
      </div>
    </section>
  );
}
