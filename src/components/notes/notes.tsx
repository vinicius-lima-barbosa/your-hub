"use client";

import { NotebookPen } from "lucide-react";

import { useAppStoreHydration } from "@/hooks/use-app-store-hydration.hook";
import { useAppStore } from "@/store/app.store";
import NotesEditor from "./notes-editor";

export default function Notes() {
  const notesContent = useAppStore((state) => state.notes.content);
  const lastSavedAt = useAppStore((state) => state.notes.lastSavedAt);
  const setNotesContent = useAppStore((state) => state.setNotesContent);
  const hasHydrated = useAppStoreHydration();

  return (
    <section className="flex min-h-80 flex-1 flex-col rounded-lg border border-border bg-surface p-4 shadow-[0_24px_80px_-56px_rgb(18_18_18/0.45)]">
      {hasHydrated ? (
        <NotesEditor
          initialContent={notesContent}
          lastSavedAt={lastSavedAt}
          onSave={setNotesContent}
        />
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <NotebookPen className="size-4 text-muted" aria-hidden />
              <h2 className="text-sm font-medium">Notes</h2>
            </div>
            <span className="text-xs text-muted">Loading...</span>
          </div>
          <textarea
            className="min-h-64 flex-1 resize-none rounded-md border border-border bg-background p-3 text-sm leading-6 text-foreground outline-none transition"
            aria-label="Focus notes"
            disabled
          />
        </>
      )}
    </section>
  );
}
