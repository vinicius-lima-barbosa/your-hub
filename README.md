# Lo-Fi Focus

A minimalist productivity hub for focused work.

Lo-Fi Focus is a single-page application that combines a Pomodoro timer, persistent notes, milestone countdowns, and an embedded lo-fi stream player in a quiet, responsive interface.

> Badges, production URL, and deployment status go here.

## Features

- **Lo-fi audio player**: Embedded stream playback powered by `react-player`, with persistent volume and stream selection.
- **Persistent notes**: Local notes with auto-save and browser storage persistence.
- **Pomodoro timer**: Focus, short break, and long break modes with persisted timer state and optional completion sound.
- **Milestone countdown**: Track upcoming deadlines, launches, exams, or personal milestones.
- **Muted interface**: Neutral Stone-inspired palette, low contrast surfaces, compact spacing, and distraction-free controls.
- **Responsive layout**: Desktop grid with a productivity aside and a larger main workspace; mobile stacks content vertically.
- **No accounts, no backend**: State lives in the browser through local storage for a friction-free experience.

## Tech Stack

| Area        | Technology                                 |
| ----------- | ------------------------------------------ |
| Framework   | Next.js App Router                         |
| Language    | TypeScript                                 |
| Styling     | Tailwind CSS                               |
| State       | Zustand                                    |
| Persistence | Browser `localStorage` via Zustand persist |
| Icons       | `lucide-react`                             |
| Media       | `react-player`                             |

## Architecture

The app is intentionally client-light and local-first.

Global application state lives in `src/store/app.store.ts`. Zustand owns the shared state for notes, Pomodoro, countdown, and player settings. The store is persisted under the `your-hub-app-store` local storage key and restored on page load.

Each interactive feature follows the same pattern:

- A client wrapper handles hydration and local storage readiness.
- A feature component owns the actual UI and behavior.
- Shared state updates go through the Zustand store.
- Browser-only APIs are isolated inside Client Components.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vinicius-lima-barbosa/your-hub.git
cd your-hub
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```txt
src
├── app
│   ├── globals.css          # Global styles and theme tokens
│   ├── layout.tsx           # Root layout and metadata
│   └── page.tsx             # Single-page dashboard composition
├── components
│   ├── event                # Milestone countdown module
│   ├── notes                # Persistent notes module
│   ├── player               # Lo-fi stream player module
│   ├── pomodoro             # Pomodoro timer module
│   └── header.tsx           # Dashboard header
├── hooks
│   └── use-app-store-hydration.hook.ts
├── lib
│   └── utils.ts             # Shared utility helpers
└── store
    └── app.store.ts         # Zustand store and persistence setup
```

## Deployment

The fastest path is Vercel.

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Keep the default Next.js build settings.
4. Deploy.

The app does not require a database, authentication provider, or server-side environment variables for the core experience.

## License

MIT License.

See `LICENSE` for details.
