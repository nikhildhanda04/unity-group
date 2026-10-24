"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { computeNavScrollTarget } from "./branchAnchors";
import { useSplashDone } from "@/components/SplashContext";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Orbiting photo collage — commented out per feedback that it wasn't landing
// visually. Kept intact (not deleted) in case we want to revisit the concept
// with a different treatment later.
//
// type Chip = { src: string; alt: string; angle: number; distance: number; size: number };
//
// // Angles/distances/sizes are hand-placed for an asymmetric collage feel
// // rather than a perfectly uniform pentagon — reads as curated, not mechanical.
// const CHIPS: Chip[] = [
//   { src: "/unity-motors-ai.png", alt: "Unity Motors", angle: -20, distance: 1.05, size: 1.15 },
//   { src: "/unity-carhub-ai.png", alt: "Unity CarHub", angle: 52, distance: 0.82, size: 0.85 },
//   { src: "/shawarma-cartel-ai.png", alt: "Shawarma Cartel", angle: 128, distance: 1.1, size: 1 },
//   { src: "/bhatia-homeopathics-ai.png", alt: "Dr. Bhatia Homoeopathy", angle: 202, distance: 0.88, size: 0.9 },
//   { src: "/unity-tech-ai.png", alt: "Unity Tech", angle: 278, distance: 1, size: 1.05 },
// ];
//
// function useResponsiveRadius() {
//   const [radius, setRadius] = useState(150);
//   useEffect(() => {
//     function update() {
//       setRadius(Math.min(230, Math.max(90, window.innerWidth * 0.1)));
//     }
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//   return radius;
// }
//
// function OrbitChip({ chip, radius, spread, fade }: { chip: Chip; radius: number; spread: MotionValue<number>; fade: MotionValue<number> }) {
//   const rad = (chip.angle * Math.PI) / 180;
//   const bx = Math.cos(rad) * radius * chip.distance;
//   const by = Math.sin(rad) * radius * chip.distance;
//   const x = useTransform(spread, (s) => bx * s);
//   const y = useTransform(spread, (s) => by * s);
//   const baseSize = 88 * chip.size;
//
//   return (
//     <motion.div
//       className="hidden sm:block absolute inset-0 m-auto rounded-full overflow-hidden shadow-xl ring-2 ring-surface/40 hover:ring-primary-container transition-[box-shadow] duration-300"
//       style={{ x, y, opacity: fade, width: baseSize, height: baseSize }}
//       whileHover={{ scale: 1.1 }}
//       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//     >
//       <Image src={chip.src} alt={chip.alt} fill className="object-cover" sizes="140px" />
//     </motion.div>
//   );
// }

export default function Hero() {
  const lenis = useLenis();
  const splashDone = useSplashDone();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    }
  }, []);

  // const spread = useTransform(scrollYProgress, [0, 1], [1, 5.5]); // only used by the disabled orbit chips
  // const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]); // only used by the disabled orbit chips
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  function goToBranches(e: React.MouseEvent) {
    e.preventDefault();
    const target = computeNavScrollTarget("unity-motor");
    if (target == null) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <section
      ref={heroRef}
      id="overview"
      className="relative w-full min-h-[100vh] flex flex-col justify-between overflow-hidden px-margin-mobile lg:px-margin pt-12 pb-10 select-none scroll-mt-28"
    >
      {/* Ambient backdrop only — dimmed well below the wordmark/text so it
          doesn't compete with them. Shown on all breakpoints, including
          mobile. */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-surface-container-lowest/60" />

      <motion.div
        className="relative z-10 w-full flex flex-col items-center text-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={splashDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">A syndicate where everyone wants to unite</span>
        </span>
        <h1 className="font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface-variant font-normal tracking-tight leading-snug flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>Automotive engineering.</span>
          <span>Digital exchanges.</span>
          <span>Gastronomic culture.</span>
        </h1>
      </motion.div>

      <motion.div
        className="relative w-full flex-1 flex items-center justify-center py-6"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={splashDone ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
      >
        <motion.div
          className="absolute inset-0 m-auto w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] rounded-full border border-on-surface/15 animate-slow-spin pointer-events-none"
          style={{ opacity: ringOpacity }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[85vw] h-[85vw] sm:w-[70vw] sm:h-[70vw] max-w-[900px] max-h-[900px] opacity-10" style={{ mixBlendMode: "screen" }}>
            <Image src="/unity-logo.jpeg" alt="" fill className="object-contain" />
          </div>
        </div>

        {/* Orbiting photo collage disabled — see commented-out CHIPS/OrbitChip above.
        {CHIPS.map((chip) => (
          <OrbitChip key={chip.src} chip={chip} radius={radius} spread={spread} fade={fade} />
        ))}
        */}

        <motion.span
          className="relative z-10 w-full text-center font-headline-lg font-extrabold max-w-full overflow-hidden leading-[0.9] uppercase tracking-tight select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b from-on-surface via-on-surface to-on-surface/60 block"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)", letterSpacing: "-0.03em", opacity: wordmarkOpacity, scale: wordmarkScale }}
        >
          UNITY
          <br />
          GROUP
        </motion.span>
      </motion.div>

      <motion.div
        className="relative z-10 w-full flex flex-col items-center text-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={splashDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
      >
        <p className="font-body-md text-on-surface-variant text-xs sm:text-sm">UNITY HOLDING GROUP CORP. — Seven Divisions, One Syndicate</p>
        <motion.a
          className="group flex items-center gap-3 text-on-surface hover:text-primary-container transition-colors duration-200"
          href="#branches"
          onClick={goToBranches}
          whileHover={{ y: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="font-label-md text-label-md uppercase tracking-widest">Scroll to explore branches</span>
          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-surface-container-high transition-all">
            <span className="material-symbols-outlined text-[16px] animate-bounce">arrow_downward</span>
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
