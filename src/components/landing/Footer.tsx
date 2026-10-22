"use client";

import { useLenis } from "lenis/react";
import { computeBranchScrollTarget } from "./branchAnchors";

const BRANCH_LINKS = [
  { path: "unity-motor", label: "01 // MOTOR" },
  { path: "unity-carhub", label: "02 // CARHUB" },
  { path: "shawarma-cartel", label: "03 // CARTEL" },
  { path: "bhatia-homeopathics", label: "04 // BHATIA" },
];

export default function Footer() {
  const lenis = useLenis();

  function goToBranch(e: React.MouseEvent, anchorId: string) {
    e.preventDefault();
    const target = computeBranchScrollTarget(anchorId);
    if (target == null) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <footer id="footer" className="w-full bg-surface-container-lowest border-t-2 border-surface-container-highest scroll-mt-28">
      <div className="w-full bg-surface-container-low border-b border-surface-container-highest px-margin-mobile lg:px-margin py-4 flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary-container animate-ping"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            BRANCH NAVIGATOR // MATRIX 04
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-space-sm overflow-x-auto">
          {BRANCH_LINKS.map((link) => (
            <a
              key={link.path}
              className="px-3 py-1 bg-surface-container border border-surface-container-highest text-on-surface-variant hover:text-on-surface hover:border-primary-container font-label-sm text-label-sm uppercase tracking-wider transition-colors"
              href={`#${link.path}`}
              onClick={(e) => goToBranch(e, link.path)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="font-label-sm text-label-sm text-on-surface-variant">[ SEC_LVL: 00 ]</div>
      </div>
      <div className="w-full px-margin-mobile lg:px-margin py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
        <div className="flex flex-col gap-2">
          <span
            className="font-headline-sm text-headline-sm tracking-tight text-on-surface uppercase"
            style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, letterSpacing: "0.03em", fontSize: "2rem", lineHeight: 1 }}
          >
            UNITY HOLDING GROUP CORP.
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            AUTOMOTIVE ENGINEERING // DIGITAL EXCHANGES // GASTRONOMIC CULTURE
          </span>
          {/* Real contact number pulled from the unity-motors repo (NEXT_PUBLIC_WHATSAPP_NUMBER) —
              no verified email exists anywhere in that project, so none is shown here. */}
          <a
            className="mt-2 inline-flex items-center gap-1.5 text-primary hover:underline font-label-sm text-label-sm uppercase font-bold w-fit"
            href="https://wa.me/917027900004"
            rel="noopener"
            target="_blank"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            +91 70279 00004 (WHATSAPP)
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-space-lg font-label-sm text-label-sm text-on-surface-variant">
          <span className="uppercase text-on-surface-variant/70">[ PRIVACY_MANIFESTO: COMING SOON ]</span>
          <span className="uppercase text-on-surface-variant/70">[ TELEMETRY_TERMS: COMING SOON ]</span>
          <span className="text-on-surface-variant">© 2025 UNITY GROUP ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
}
