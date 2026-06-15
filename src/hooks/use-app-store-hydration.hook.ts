"use client";

import { useEffect, useState } from "react";

import { ensureAppStoreStorage, useAppStore } from "@/store/app.store";

export function useAppStoreHydration() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const finishHydration = () => {
      ensureAppStoreStorage();
      setHasHydrated(true);
    };

    const unsubscribe = useAppStore.persist.onFinishHydration(finishHydration);

    ensureAppStoreStorage();

    if (useAppStore.persist.hasHydrated()) {
      window.queueMicrotask(finishHydration);
    } else {
      void useAppStore.persist.rehydrate();
    }

    return unsubscribe;
  }, []);

  return hasHydrated;
}
