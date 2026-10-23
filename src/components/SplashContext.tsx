"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const SplashContext = createContext<{ splashDone: boolean; markSplashDone: () => void } | null>(null);

export function SplashProvider({ children }: { children: ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);
  return <SplashContext.Provider value={{ splashDone, markSplashDone: () => setSplashDone(true) }}>{children}</SplashContext.Provider>;
}

// Both hooks default to "done" when rendered outside a SplashProvider so
// nothing breaks (e.g. isolated usage/tests) — the splash is a page-load
// flourish, not a hard gate on content ever being visible.
export function useSplashContext() {
  const ctx = useContext(SplashContext);
  return ctx ?? { splashDone: true, markSplashDone: () => {} };
}

export function useSplashDone() {
  return useSplashContext().splashDone;
}
