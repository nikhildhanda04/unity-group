"use client";

import Hero from "./Hero";
import BranchStack from "./BranchStack";
import Footer from "./Footer";
import SplashCursor from "./SplashCursor";

export default function LandingPage() {
  return (
    <>
      <SplashCursor
        rainbow={false}
        size={0.45}
        force={0.25}
        swirl={3}
        trail={0.6}
        clickSplash={false}
        colorSpeed={0.4}
        intensity={0.45}
        momentum={0.65}
        shading={0.08}
        glow={0}
        quality="high"
        intro
        contained={false}
        zIndex={40}
        style={{}}
      />
      <main className="w-full pb-20 bg-surface-container-lowest flex-1">
        <div className="flex flex-col w-full">
          <Hero />
          <BranchStack />
        </div>
      </main>
      <Footer />
    </>
  );
}
