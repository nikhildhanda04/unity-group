"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// Isometric figures temporarily disabled — see src/components/landing/iso/
// import IsoEngine from "./iso/IsoEngine";
// import IsoShawarmaRoll from "./iso/IsoShawarmaRoll";

const BRANCH_TICKER = [
  { icon: "bolt", color: "text-primary-container font-black", label: "BRANCH 01: UNITY MOTOR [PERFORMANCE WORKSHOP & PRECISION RETROFITS]" },
  { icon: "swap_horiz", color: "text-on-surface font-bold", label: "BRANCH 02: UNITY CARHUB [EXCHANGE, SOURCING & HIGH-NET CONCIERGE]" },
  { icon: "restaurant", color: "text-tertiary font-black", label: "BRANCH 03: SHAWARMA CARTEL [HIGH-HEAT URBAN GOURMET DINING]" },
  { icon: "science", color: "text-secondary font-bold", label: "BRANCH 04: INNOVATION HUB [AERODYNAMICS & APPLIED COMPUTING]" },
];

export default function Hero() {
  const [time, setTime] = useState("--:--:-- UTC");

  useEffect(() => {
    function updateClock() {
      setTime(new Date().toTimeString().split(" ")[0] + " UTC");
    }
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="overview" className="relative w-full min-h-[94vh] flex flex-col justify-between overflow-hidden px-margin-mobile lg:px-margin pt-8 pb-16 select-none scroll-mt-28">
      <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-between px-margin-mobile lg:px-margin">
        <div className="w-px h-full bg-surface-container-highest"></div>
        <div className="w-px h-full bg-surface-container-highest hidden sm:block"></div>
        <div className="w-px h-full bg-surface-container-highest hidden md:block"></div>
        <div className="w-px h-full bg-surface-container-highest"></div>
      </div>

      {/*
      <div className="hidden xl:block absolute right-6 bottom-20 w-80 opacity-90 pointer-events-none select-none">
        <IsoEngine className="w-full h-auto drop-shadow-2xl" />
      </div>

      <div className="hidden xl:block absolute left-6 bottom-24 w-64 opacity-90 pointer-events-none select-none">
        <IsoShawarmaRoll className="w-full h-auto drop-shadow-2xl" />
      </div>
      */}

      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-primary-container text-on-primary-container font-label-sm text-label-sm tracking-widest uppercase font-black shadow-md">
            CONGLOMERATE // SECTOR 00
          </span>
          <div className="hidden sm:flex items-center gap-2 bg-surface-container-high px-3 py-1 text-on-surface-variant font-label-sm text-label-sm tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            SYS.RUNNING: 1,420 BHP DISPATCH
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-surface-container text-primary font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-sm">speed</span>
          <span className="font-mono">{time}</span>
        </div>
      </div>

      <div className="relative z-10 my-auto py-14 flex flex-col items-center justify-center">
        <div className="hidden sm:block absolute -top-4 left-2 md:left-12 rotate-[-8deg] z-20 transition-transform duration-300 hover:rotate-0 hover:scale-110">
          <div className="bg-surface-bright text-on-surface px-4 py-2 border-2 border-primary-container shadow-[4px_4px_0px_#ff544b] font-label-md text-label-md uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-lg">verified</span>
            <span className="flex flex-col leading-none">
              <span style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1, letterSpacing: "0.02em" }}>
                AUTHORIZED WORKSHOP
              </span>
              <span className="text-[10px] normal-case tracking-normal text-on-surface-variant/70 font-sans mt-0.5">अधिकृत वर्कशॉप</span>
            </span>
          </div>
        </div>

        <div className="hidden sm:block absolute -top-6 right-2 md:right-16 z-20">
          <div className="relative w-28 h-28 flex items-center justify-center group cursor-pointer">
            <svg className="w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
              <path d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" id="circlePath"></path>
              <text className="font-label-sm text-[10.5px] fill-primary font-extrabold tracking-[0.22em] uppercase">
                <textPath href="#circlePath">UNITY GROUP // EST. 2020 // HIGH TORQUE //</textPath>
              </text>
            </svg>
            <div
              className="absolute w-12 h-12 bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm font-extrabold shadow-md"
              style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, fontSize: "2rem", lineHeight: 1 }}
            >
              U
            </div>
          </div>
        </div>

        <div className="relative w-full text-center flex flex-col items-center select-none overflow-visible">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[28rem] h-[28rem] max-w-[70vw] max-h-[70vw] bg-primary-container/15 blur-[100px] rounded-full pointer-events-none -z-0"
          ></div>

          <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 mb-4 bg-[#0c0f0f] border-2 border-on-surface shadow-[6px_6px_0px_#ff544b]">
            <Image src="/unity-logo.jpeg" alt="Unity Group emblem" fill className="object-contain p-3 mix-blend-lighten" priority />
          </div>

          <h1
            className="font-display-xl text-display-xl lg:text-[11vw] lg:leading-[0.82] tracking-[-0.03em] font-black uppercase text-on-surface drop-shadow-2xl relative z-10"
            style={{ fontFamily: "Teko, sans-serif", fontWeight: 700 }}
          >
            UNITY
          </h1>
          <span className="relative z-10 block w-20 h-1 bg-primary-container mt-3 mb-4"></span>
          <div className="font-label-lg text-label-lg tracking-[0.2em] text-on-surface-variant uppercase flex items-center gap-3 relative z-10">
            <span className="w-8 h-0.5 bg-primary-container"></span>
            <span style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "0.06em", lineHeight: 1 }}>
              SYNDICATED HOLDING MATRIX <span className="text-on-surface-variant/60">{"// "}सिंडिकेटेड होल्डिंग मैट्रिक्स</span>
            </span>
            <span className="w-8 h-0.5 bg-primary-container"></span>
          </div>
        </div>

        <div className="hidden sm:block absolute -bottom-6 left-6 md:left-24 rotate-[6deg] z-20 transition-transform duration-300 hover:rotate-0 hover:scale-110">
          <div className="bg-surface-container-high text-on-surface px-4 py-2 border-2 border-on-surface shadow-[4px_4px_0px_var(--ink)] font-label-md text-label-md uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">local_fire_department</span>
            <span className="flex flex-col leading-none">
              <span style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1, letterSpacing: "0.02em" }}>
                GOURMET STREET FOOD
              </span>
              <span className="text-[10px] normal-case tracking-normal text-on-surface-variant/70 font-sans mt-0.5">स्वादिष्ट स्ट्रीट फ़ूड</span>
            </span>
          </div>
        </div>

        <div className="hidden sm:block absolute -bottom-8 right-6 md:right-32 rotate-[-4deg] z-20 transition-transform duration-300 hover:rotate-0 hover:scale-110">
          <div className="bg-primary-container text-on-primary-container px-4 py-2 border-2 border-on-surface shadow-[4px_4px_0px_var(--ink)] font-label-md text-label-md uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">key</span>
            <span className="flex flex-col leading-none">
              <span style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1, letterSpacing: "0.02em" }}>
                VIP AUTO CONCIERGE
              </span>
              <span className="text-[10px] normal-case tracking-normal text-on-primary-container/70 font-sans mt-0.5">ऑटो कंसीयर्ज वीआईपी</span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full mt-8">
        <div className="w-full bg-surface-container border-2 border-surface-container-highest p-3 overflow-hidden shadow-xl -skew-y-1">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-label-sm text-label-sm tracking-widest uppercase">
            {[...BRANCH_TICKER, ...BRANCH_TICKER].map((item, i) => (
              <span key={i} className={`flex items-center gap-3 ${item.color}`}>
                <span className="material-symbols-outlined text-base">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
