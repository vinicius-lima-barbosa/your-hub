import { formatDistanceToNow } from "date-fns";
import { NotebookPen, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const NOTE_SAVE_DELAY_MS = 600;

function getLastSavedLabel(lastSavedAt: string | null) {
  if (!lastSavedAt) {
    return "Autosave ready";
  }

  const savedDate = new Date(lastSavedAt);

  if (Number.isNaN(savedDate.getTime())) {
    return "Autosave ready";
  }

  return `Saved ${formatDistanceToNow(savedDate, { addSuffix: true })}`;
}

type NotesEditorProps = {
  initialContent: string;
  lastSavedAt: string | null;
  onSave: (content: string) => void;
};

export default function NotesEditor({
  initialContent,
  lastSavedAt,
  onSave,
}: NotesEditorProps) {
  const [draft, setDraft] = useState(initialContent);
  const isDirty = draft !== initialContent;
  const lastSavedLabel = useMemo(
    () => getLastSavedLabel(lastSavedAt),
    [lastSavedAt],
  );

  useEffect(() => {
    if (!isDirty) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onSave(draft);
    }, NOTE_SAVE_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [draft, isDirty, onSave]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <NotebookPen className="size-4 text-muted" aria-hidden />
          <h2 className="text-sm font-medium">Notes</h2>
        </div>
        <span className="text-xs text-muted">
          {isDirty ? "Saving..." : lastSavedLabel}
        </span>
      </div>

      <textarea
        className="min-h-64 flex-1 resize-none rounded-md border border-border bg-background p-3 text-sm leading-6 text-foreground outline-none transition focus:border-accent"
        placeholder="Capture the current thread."
        aria-label="Focus notes"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted">
        <span>{draft.length} characters</span>
        <button
          className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted transition hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          type="button"
          aria-label="Clear notes"
          disabled={draft.length === 0}
          onClick={() => setDraft("")}
        >
          <Trash2 className="size-4" aria-hidden />
        </button>
      </div>
    </>
  );
}
