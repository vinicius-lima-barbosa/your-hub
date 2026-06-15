import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PomodoroMode = "focus" | "short-break" | "long-break";

export type CountdownEvent = {
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
  nextPlayerStream: () => void;
  previousPlayerStream: () => void;
  setNotesContent: (content: string) => void;
  setPomodoroMode: (mode: PomodoroMode) => void;
  setPomodoroRunning: (isRunning: boolean) => void;
  setPomodoroRemainingSeconds: (remainingSeconds: number) => void;
  resetPomodoro: () => void;
  setNotificationsEnabled: (notificationsEnabled: boolean) => void;
  setCountdown: (countdown: CountdownEvent) => void;
  resetCountdown: () => void;
};

export const POMODORO_DURATIONS: Record<PomodoroMode, number> = {
  focus: 25 * 60,
  "short-break": 5 * 60,
  "long-break": 15 * 60,
};

const PLAYER_STREAM_URLS = [
  "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  "https://www.youtube.com/watch?v=rUxyKA_-grg",
  "https://www.youtube.com/watch?v=4xDzrJKXOOY",
];

const createInitialPlayerState = (): PlayerState => ({
  streamUrls: PLAYER_STREAM_URLS,
  currentStreamIndex: 0,
  isPlaying: false,
  volume: 0.55,
});

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      player: createInitialPlayerState(),
      notes: {
        content: "",
        lastSavedAt: null,
      },
      pomodoro: {
        mode: "focus",
        remainingSeconds: POMODORO_DURATIONS.focus,
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
          player: {
            ...state.player,
            volume: Math.min(1, Math.max(0, volume)),
          },
        })),
      setCurrentStreamIndex: (currentStreamIndex) =>
        set((state) => ({
          player: {
            ...state.player,
            currentStreamIndex:
              ((currentStreamIndex % state.player.streamUrls.length) +
                state.player.streamUrls.length) %
              state.player.streamUrls.length,
          },
        })),
      nextPlayerStream: () =>
        set((state) => ({
          player: {
            ...state.player,
            currentStreamIndex:
              (state.player.currentStreamIndex + 1) %
              state.player.streamUrls.length,
          },
        })),
      previousPlayerStream: () =>
        set((state) => ({
          player: {
            ...state.player,
            currentStreamIndex:
              (state.player.currentStreamIndex -
                1 +
                state.player.streamUrls.length) %
              state.player.streamUrls.length,
          },
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
            remainingSeconds: POMODORO_DURATIONS[mode],
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
      resetPomodoro: () =>
        set((state) => ({
          pomodoro: {
            ...state.pomodoro,
            remainingSeconds: POMODORO_DURATIONS[state.pomodoro.mode],
            isRunning: false,
          },
        })),
      setNotificationsEnabled: (notificationsEnabled) =>
        set((state) => ({
          pomodoro: { ...state.pomodoro, notificationsEnabled },
        })),
      setCountdown: (countdown) => set({ countdown }),
      resetCountdown: () =>
        set({
          countdown: {
            title: "",
            targetDate: "",
          },
        }),
    }),
    {
      name: "your-hub-app-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        player: {
          ...state.player,
          streamUrls: PLAYER_STREAM_URLS,
        },
        notes: state.notes,
        pomodoro: state.pomodoro,
        countdown: state.countdown,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<AppState>;
        const persistedPlayer = persisted.player;
        const nextPlayer = {
          ...createInitialPlayerState(),
          currentStreamIndex: persistedPlayer?.currentStreamIndex ?? 0,
          isPlaying: false,
          volume: persistedPlayer?.volume ?? 0.55,
        };

        return {
          ...currentState,
          ...persisted,
          player: {
            ...nextPlayer,
            currentStreamIndex:
              ((nextPlayer.currentStreamIndex % PLAYER_STREAM_URLS.length) +
                PLAYER_STREAM_URLS.length) %
              PLAYER_STREAM_URLS.length,
            volume: Math.min(1, Math.max(0, nextPlayer.volume)),
          },
        };
      },
    },
  ),
);
