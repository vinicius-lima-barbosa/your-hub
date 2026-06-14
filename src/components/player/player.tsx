import { ListMusic, Play } from "lucide-react";

export default function Player() {
  return (
    <article className="rounded-lg border border-border bg-charcoal p-5 text-stone-100">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ListMusic className="size-4 text-stone-400" aria-hidden />
          <h2 className="text-sm font-medium">Lo-Fi Stream</h2>
        </div>
        <span className="text-xs text-stone-400">Idle</span>
      </div>

      <div className="flex aspect-square flex-col justify-between rounded-lg border border-white/10 bg-white/3 p-4">
        <div>
          <p className="text-sm text-stone-400">Current channel</p>
          <p className="mt-2 text-2xl font-semibold tracking-normal">
            Beats to focus
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            className="inline-flex size-12 items-center justify-center rounded-md bg-stone-100 text-charcoal transition hover:bg-white"
            type="button"
            aria-label="Play stream"
          >
            <Play className="size-5 fill-current" aria-hidden />
          </button>
          <div className="h-1 flex-1 rounded-full bg-white/10">
            <div className="h-full w-7/12 rounded-full bg-stone-100" />
          </div>
        </div>
      </div>
    </article>
  );
}
