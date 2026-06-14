import { NotebookPen } from "lucide-react";

export default function Notes() {
  return (
    <section className="flex min-h-[320px] flex-1 flex-col rounded-lg border border-border bg-surface p-4 shadow-[0_24px_80px_-56px_rgb(18_18_18_/_0.45)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <NotebookPen className="size-4 text-muted" aria-hidden />
          <h2 className="text-sm font-medium">Notes</h2>
        </div>
        <span className="text-xs text-muted">Autosave ready</span>
      </div>

      <textarea
        className="min-h-64 flex-1 resize-none rounded-md border border-border bg-background p-3 text-sm leading-6 text-foreground outline-none transition focus:border-accent"
        placeholder="Capture the current thread."
        aria-label="Focus notes"
      />
    </section>
  );
}
