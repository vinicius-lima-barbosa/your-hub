import { Headphones } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col justify-between gap-4 rounded-lg border border-border bg-surface px-5 py-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          Your Hub
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
          Lo-Fi Focus
        </h1>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted">
        <Headphones className="size-4" aria-hidden />
        <span>Ready to work</span>
      </div>
    </header>
  );
}
