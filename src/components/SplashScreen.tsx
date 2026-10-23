"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useSplashContext } from "./SplashContext";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const { markSplashDone } = useSplashContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Mark done at the same moment the exit animation starts, not after it
    // finishes — the page content underneath should already be cascading in
    // while the splash dissolves, so the handoff reads as one continuous
    // motion rather than a dead beat between "splash gone" and "page appears".
    const timer = setTimeout(() => {
      setVisible(false);
      markSplashDone();
    }, 1500);
    return () => clearTimeout(timer);
  }, [markSplashDone]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-container-lowest"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0c0f0f] overflow-hidden shadow-xl">
              <Image src="/unity-logo.jpeg" alt="Unity Group" fill className="object-contain p-3 mix-blend-lighten" priority />
            </div>
            <span className="font-headline-lg font-extrabold uppercase tracking-tight text-on-surface text-2xl sm:text-3xl">Unity Group</span>
            <div className="w-36 sm:w-44 h-[3px] rounded-full bg-surface-container-high overflow-hidden">
              <motion.div
                className="h-full bg-primary-container rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
