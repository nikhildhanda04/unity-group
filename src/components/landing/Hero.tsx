"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { computeNavScrollTarget } from "./branchAnchors";

export default function Hero() {
  const [time, setTime] = useState("--:--:-- UTC");
  const lenis = useLenis();

  useEffect(() => {
    function updateClock() {
      setTime(new Date().toTimeString().split(" ")[0] + " UTC");
    }
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  function goToBranches(e: React.MouseEvent) {
    e.preventDefault();
    const target = computeNavScrollTarget("unity-motor");
    if (target == null) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <section id="overview" className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden px-margin-mobile lg:px-margin pt-10 pb-10 select-none scroll-mt-28">
      <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high mb-4">
            <span className="w-2 h-2 rounded-full bg-on-surface animate-ping"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">A syndicate where everyone wants to unite</span>
          </span>
          <h1 className="font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold tracking-tight leading-snug flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Automotive engineering.</span>
            <span>Digital exchanges.</span>
            <span>Gastronomic culture.</span>
          </h1>
          <p className="font-body-md text-on-surface-variant mt-2 text-xs sm:text-sm">UNITY HOLDING GROUP CORP. — Seven Divisions, One Syndicate</p>
        </div>
        <div className="hidden lg:flex flex-col items-end text-right font-label-md text-label-md text-on-surface-variant gap-1">
          <span className="text-on-surface font-bold tracking-wider">// UNITY ARCHIVE</span>
          <span>SYS.RUNNING: 1,420 BHP DISPATCH</span>
          <span className="font-mono">{time}</span>
        </div>
      </div>

      <div className="relative w-full flex-1 flex items-center justify-center py-10 md:py-16 min-h-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[85vw] h-[85vw] sm:w-[70vw] sm:h-[70vw] max-w-[900px] max-h-[900px] opacity-10" style={{ mixBlendMode: "screen" }}>
            <Image src="/unity-logo.jpeg" alt="" fill className="object-contain" />
          </div>
        </div>
        <span
          className="relative z-10 w-full text-center font-headline-lg font-extrabold max-w-full overflow-hidden leading-[0.9] uppercase tracking-tight select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b from-on-surface via-on-surface to-on-surface/60 block"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)", letterSpacing: "-0.03em" }}
        >
          UNITY
          <br />
          GROUP
        </span>
      </div>

      <div className="relative z-10 w-full flex items-center justify-between gap-4 pt-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">7 Divisions Live</span>
        </div>
        <a className="group flex items-center gap-3 text-on-surface hover:text-on-surface-variant transition-colors duration-200" href="#branches" onClick={goToBranches}>
          <span className="font-label-md text-label-md uppercase tracking-widest">Scroll to explore branches</span>
          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-surface-container-high transition-all">
            <span className="material-symbols-outlined text-[16px] animate-bounce">arrow_downward</span>
          </div>
        </a>
      </div>
    </section>
  );
}
