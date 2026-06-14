import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PomodoroMode = "focus" | "short-break" | "long-break";

type CountdownEvent = {
  title: string;
  targetDate: string;
};

type PlayerState = {
  streamUrls: string[];
  currentStreamIndex: number;
  isPlaying: boolean;
  volume: number;
};

type NotesState = {
  content: string;
  lastSavedAt: string | null;
};

type PomodoroState = {
  mode: PomodoroMode;
  remainingSeconds: number;
  isRunning: boolean;
  notificationsEnabled: boolean;
};

type AppState = {
  player: PlayerState;
  notes: NotesState;
  pomodoro: PomodoroState;
  countdown: CountdownEvent;
  setPlayerPlaying: (isPlaying: boolean) => void;
  setPlayerVolume: (volume: number) => void;
  setCurrentStreamIndex: (currentStreamIndex: number) => void;
  setNotesContent: (content: string) => void;
  setPomodoroMode: (mode: PomodoroMode) => void;
  setPomodoroRunning: (isRunning: boolean) => void;
  setPomodoroRemainingSeconds: (remainingSeconds: number) => void;
  setNotificationsEnabled: (notificationsEnabled: boolean) => void;
  setCountdown: (countdown: CountdownEvent) => void;
};

const DEFAULT_FOCUS_SECONDS = 25 * 60;

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      player: {
        streamUrls: [
          "https://www.youtube.com/watch?v=jfKfPfyJRdk",
          "https://www.youtube.com/watch?v=rUxyKA_-grg",
          "https://www.youtube.com/watch?v=4xDzrJKXOOY",
        ],
        currentStreamIndex: 0,
        isPlaying: false,
        volume: 0.55,
      },
      notes: {
        content: "",
        lastSavedAt: null,
      },
      pomodoro: {
        mode: "focus",
        remainingSeconds: DEFAULT_FOCUS_SECONDS,
        isRunning: false,
        notificationsEnabled: false,
      },
      countdown: {
        title: "",
        targetDate: "",
      },
      setPlayerPlaying: (isPlaying) =>
        set((state) => ({
          player: { ...state.player, isPlaying },
        })),
      setPlayerVolume: (volume) =>
        set((state) => ({
          player: { ...state.player, volume },
        })),
      setCurrentStreamIndex: (currentStreamIndex) =>
        set((state) => ({
          player: { ...state.player, currentStreamIndex },
        })),
      setNotesContent: (content) =>
        set({
          notes: {
            content,
            lastSavedAt: new Date().toISOString(),
          },
        }),
      setPomodoroMode: (mode) =>
        set((state) => ({
          pomodoro: {
            ...state.pomodoro,
            mode,
            remainingSeconds: DEFAULT_FOCUS_SECONDS,
            isRunning: false,
          },
        })),
      setPomodoroRunning: (isRunning) =>
        set((state) => ({
          pomodoro: { ...state.pomodoro, isRunning },
        })),
      setPomodoroRemainingSeconds: (remainingSeconds) =>
        set((state) => ({
          pomodoro: { ...state.pomodoro, remainingSeconds },
        })),
      setNotificationsEnabled: (notificationsEnabled) =>
        set((state) => ({
          pomodoro: { ...state.pomodoro, notificationsEnabled },
        })),
      setCountdown: (countdown) => set({ countdown }),
    }),
    {
      name: "your-hub-app-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        player: state.player,
        notes: state.notes,
        pomodoro: state.pomodoro,
        countdown: state.countdown,
      }),
    },
  ),
);
