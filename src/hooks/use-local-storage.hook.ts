"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const fallbackValue = useMemo(() => JSON.stringify(initialValue), [initialValue]);
  const changeEventName = `local-storage:${key}`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          onStoreChange();
        }
      };

      window.addEventListener("storage", handleStorageChange);
      window.addEventListener(changeEventName, onStoreChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(changeEventName, onStoreChange);
      };
    },
    [changeEventName, key],
  );

  const getSnapshot = useCallback(() => {
    return window.localStorage.getItem(key) ?? fallbackValue;
  }, [fallbackValue, key]);

  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => fallbackValue,
  );

  const value = useMemo(() => {
    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return initialValue;
    }
  }, [initialValue, storedValue]);

  const setValue = useCallback(
    (nextValue: T | ((currentValue: T) => T)) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (currentValue: T) => T)(value)
          : nextValue;

      window.localStorage.setItem(key, JSON.stringify(resolvedValue));
      window.dispatchEvent(new Event(changeEventName));

      return resolvedValue;
    },
    [changeEventName, key, value],
  );

  return [value, setValue] as const;
}
