import { CalendarDays, TimerReset } from "lucide-react";

export default function Event() {
  return (
    <article className="min-h-90 rounded-lg border border-border bg-surface p-5">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-muted" aria-hidden />
          <h2 className="text-sm font-medium">Next Event</h2>
        </div>
        <button
          className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:text-foreground"
          type="button"
          aria-label="Reset event"
        >
          <TimerReset className="size-4" aria-hidden />
        </button>
      </div>

      <div className="flex min-h-60 flex-col justify-center">
        <p className="max-w-2xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
          Define the next milestone.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_180px]">
          <input
            className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none transition focus:border-accent"
            placeholder="Event name"
            aria-label="Event name"
          />
          <input
            className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none transition focus:border-accent"
            type="date"
            aria-label="Event date"
          />
        </div>
      </div>
    </article>
  );
}
