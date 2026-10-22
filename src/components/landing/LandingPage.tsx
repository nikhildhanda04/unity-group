"use client";

import Header from "./Header";
import Hero from "./Hero";
import BranchStack from "./BranchStack";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="w-full pt-28 pb-20 bg-surface-container-lowest flex-1">
        <div className="flex flex-col w-full">
          <Hero />
          <BranchStack />
        </div>
      </main>
      <Footer />
    </>
  );
}
