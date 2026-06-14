import { CalendarDays, TimerReset } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { type CountdownEvent } from "@/store/app.store";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

function getTargetDate(targetDate: string) {
  if (!targetDate) {
    return null;
  }

  const date = new Date(`${targetDate}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function getTimeLeft(targetDate: string, now: Date): TimeLeft | null {
  const target = getTargetDate(targetDate);

  if (!target) {
    return null;
  }

  const totalSeconds = Math.max(
    0,
    Math.floor((target.getTime() - now.getTime()) / 1000),
  );
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: target.getTime() <= now.getTime(),
  };
}

function formatUnit(value: number) {
  return value.toString().padStart(2, "0");
}

function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <p className="font-mono text-3xl font-semibold tracking-normal">
        {formatUnit(value)}
      </p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}

type EventCountdownProps = {
  countdown: CountdownEvent;
  onChange: (countdown: CountdownEvent) => void;
  onReset: () => void;
};

export default function EventCountdown({
  countdown,
  onChange,
  onReset,
}: EventCountdownProps) {
  const [now, setNow] = useState(() => new Date());
  const timeLeft = useMemo(
    () => getTimeLeft(countdown.targetDate, now),
    [countdown.targetDate, now],
  );
  const hasEvent = countdown.title.trim().length > 0 && timeLeft !== null;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-muted" aria-hidden />
          <h2 className="text-sm font-medium">Next Event</h2>
        </div>
        <button
          className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          type="button"
          aria-label="Reset event"
          disabled={!countdown.title && !countdown.targetDate}
          onClick={onReset}
        >
          <TimerReset className="size-4" aria-hidden />
        </button>
      </div>

      <div className="flex min-h-60 flex-col justify-center">
        <p className="max-w-2xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
          {hasEvent ? countdown.title : "Define the next milestone."}
        </p>

        {hasEvent && timeLeft ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <CountdownUnit label="days" value={timeLeft.days} />
            <CountdownUnit label="hours" value={timeLeft.hours} />
            <CountdownUnit label="minutes" value={timeLeft.minutes} />
            <CountdownUnit label="seconds" value={timeLeft.seconds} />
          </div>
        ) : null}

        {timeLeft?.isExpired && hasEvent ? (
          <p className="mt-4 text-sm text-muted">This event has arrived.</p>
        ) : null}

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_180px]">
          <input
            className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none transition focus:border-accent"
            placeholder="Event name"
            aria-label="Event name"
            value={countdown.title}
            onChange={(event) =>
              onChange({ ...countdown, title: event.target.value })
            }
          />
          <input
            className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none transition focus:border-accent"
            type="date"
            aria-label="Event date"
            value={countdown.targetDate}
            onChange={(event) =>
              onChange({ ...countdown, targetDate: event.target.value })
            }
          />
        </div>
      </div>
    </>
  );
}
