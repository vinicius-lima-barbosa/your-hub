import Event from "@/components/event";
import Header from "@/components/header";
import Notes from "@/components/notes";
import Player from "@/components/player";
import Pomodoro from "@/components/pomodoro";

export default function Home() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto grid min-h-dvh w-full max-w-7xl grid-cols-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(280px,30%)_1fr] lg:px-8 lg:py-8">
        <aside className="flex flex-col gap-4 lg:sticky lg:top-8 lg:h-[calc(100dvh-4rem)]">
          <Notes />
          <Pomodoro />
        </aside>

        <section className="flex min-w-0 flex-col gap-4">
          <Header />

          <section className="grid gap-4 xl:grid-cols-[1fr_320px]">
            <Event />
            <Player />
          </section>
        </section>
      </div>
    </main>
  );
}
