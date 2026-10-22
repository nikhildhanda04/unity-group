"use client";

import { useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useTheme } from "@/components/ThemeProvider";
import { computeNavScrollTarget, computeIdScrollTarget } from "./branchAnchors";

const TICKER_ITEMS = [
  { dot: "bg-primary-container", label: "UNITY MOTOR [PROD_LINE_ACTIVE]" },
  { dot: "bg-primary", label: "UNITY CARHUB [EXCHANGE_VOLUME: +14.8%]" },
  { dot: "bg-primary-container", label: "SHAWARMA CARTEL [GLOBAL_NODES: 42_ONLINE]" },
  { dot: "bg-secondary", label: "INNOVATION HUB [TORQUE_LAB: SYNCED]" },
];

const NAV_LINKS = [
  { path: "unity-motor", label: "Unity Motor" },
  { path: "unity-carhub", label: "CarHub" },
  { path: "shawarma-cartel", label: "Shawarma Cartel" },
  { path: "bhatia-homeopathics", label: "Dr. Bhatia" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(target: number | null) {
    if (target == null) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  function goToBranch(e: React.MouseEvent, anchorId: string) {
    e.preventDefault();
    setMenuOpen(false);
    scrollTo(computeNavScrollTarget(anchorId));
  }

  function goToId(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setMenuOpen(false);
    scrollTo(computeIdScrollTarget(id));
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b-2 border-surface-container-highest">
      <div className="w-full h-8 bg-surface border-b border-surface-container-highest overflow-hidden flex items-center">
        <div className="flex items-center px-4 bg-primary-container text-on-primary-container font-label-sm text-label-sm tracking-widest shrink-0 h-full select-none">
          SYSTEM STATUS // LIVE
        </div>
        <div className="overflow-hidden flex-1 relative flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-space-xl font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 ${item.dot} inline-block`}></span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="h-16 sm:h-20 w-full px-margin-mobile lg:px-margin flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-lg">
          <a className="group flex items-center gap-space-xs" href="#overview" onClick={(e) => goToId(e, "overview")}>
            <span className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-[#0c0f0f] border-2 border-on-surface shadow-[3px_3px_0px_var(--ink)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform overflow-hidden">
              <Image
                src="/unity-logo.jpeg"
                alt="Unity Group logo"
                fill
                className="object-contain p-1.5 mix-blend-lighten"
                priority
              />
            </span>
            <span className="hidden sm:inline-block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest pl-2 border-l-2 border-surface-container-high">
              CORP // SYS
            </span>
          </a>
          <nav className="hidden xl:flex items-center gap-space-md">
            <a
              className="uppercase px-2 py-1 tracking-wider transition-colors text-primary-container border-b-2 border-primary-container font-bold font-label-md text-label-md"
              href="#overview"
              onClick={(e) => goToId(e, "overview")}
            >
              Overview
            </a>
            {NAV_LINKS.map((link) => (
              <a
                key={link.path}
                className="font-label-md text-label-md uppercase px-2 py-1 text-on-surface-variant hover:text-on-surface tracking-wider transition-colors"
                href={`#${link.path}`}
                onClick={(e) => goToBranch(e, link.path)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <div className="hidden md:flex items-center p-1 bg-surface-container border border-surface-container-highest">
            <button
              className={`px-2 py-1 font-label-sm text-label-sm uppercase transition-colors ${
                theme === "light" ? "bg-surface-container-highest text-on-surface font-bold" : "text-on-surface-variant hover:bg-surface-bright hover:text-on-surface"
              }`}
              title="Light Mode"
              type="button"
              aria-pressed={theme === "light"}
              onClick={() => theme === "dark" && toggleTheme()}
            >
              W
            </button>
            <button
              className={`px-2 py-1 font-label-sm text-label-sm uppercase transition-colors ${
                theme === "dark" ? "bg-surface-container-highest text-on-surface font-bold" : "text-on-surface-variant hover:bg-surface-bright hover:text-on-surface"
              }`}
              title="Pitch Dark Mode"
              type="button"
              aria-pressed={theme === "dark"}
              onClick={() => theme === "light" && toggleTheme()}
            >
              B
            </button>
          </div>
          <a
            className="hidden sm:flex items-center justify-center px-4 py-2.5 bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-wider border-2 border-on-surface shadow-[3px_3px_0px_var(--ink)] hover:shadow-[3px_3px_0px_#ff544b] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            href="#footer"
            onClick={(e) => goToId(e, "footer")}
          >
            [ CONTACT HQ ]
          </a>
          <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary items-center justify-center border border-on-surface shrink-0">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <button
            className="xl:hidden flex items-center justify-center w-10 h-10 bg-surface-container border-2 border-surface-container-highest text-on-surface shrink-0"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="xl:hidden w-full bg-surface-container-lowest border-t-2 border-surface-container-highest px-margin-mobile py-4 flex flex-col gap-1 max-h-[calc(100vh-7rem)] overflow-y-auto">
          <a
            className="uppercase px-3 py-3 tracking-wider transition-colors text-primary-container font-bold font-label-md text-label-md border-b border-surface-container-high"
            href="#overview"
            onClick={(e) => goToId(e, "overview")}
          >
            Overview
          </a>
          {NAV_LINKS.map((link) => (
            <a
              key={link.path}
              className="font-label-md text-label-md uppercase px-3 py-3 text-on-surface-variant hover:text-on-surface tracking-wider transition-colors border-b border-surface-container-high"
              href={`#${link.path}`}
              onClick={(e) => goToBranch(e, link.path)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="mt-3 flex items-center justify-center px-4 py-3 bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-wider border-2 border-on-surface shadow-[3px_3px_0px_var(--ink)]"
            href="#footer"
            onClick={(e) => goToId(e, "footer")}
          >
            [ CONTACT HQ ]
          </a>
          <div className="mt-3 flex items-center justify-center gap-2 p-1 bg-surface-container border border-surface-container-highest w-fit mx-auto">
            <button
              className={`px-4 py-2 font-label-sm text-label-sm uppercase transition-colors ${
                theme === "light" ? "bg-surface-container-highest text-on-surface font-bold" : "text-on-surface-variant"
              }`}
              type="button"
              aria-pressed={theme === "light"}
              onClick={() => theme === "dark" && toggleTheme()}
            >
              LIGHT
            </button>
            <button
              className={`px-4 py-2 font-label-sm text-label-sm uppercase transition-colors ${
                theme === "dark" ? "bg-surface-container-highest text-on-surface font-bold" : "text-on-surface-variant"
              }`}
              type="button"
              aria-pressed={theme === "dark"}
              onClick={() => theme === "light" && toggleTheme()}
            >
              DARK
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
