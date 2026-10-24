"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { computeNavScrollTarget, computeIdScrollTarget } from "./branchAnchors";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } };

const BRANCH_LINKS = [
  { path: "unity-motor", label: "Unity Motor" },
  { path: "unity-carhub", label: "Unity CarHub" },
  { path: "shawarma-cartel", label: "Shawarma Cartel" },
  { path: "bhatia-homoeopathics", label: "Dr. Bhatia's Homoeopathy" },
  { path: "unity-tech", label: "Unity Tech" },
];

// Not part of the scroll-hijacking stack, so they're reached by plain id
// lookup rather than the stack-progress math in computeNavScrollTarget.
const COMING_SOON_LINKS = [
  { path: "unity-law", label: "Unity Law (Coming Soon)" },
  { path: "unity-estates", label: "Unity Estates (Coming Soon)" },
];

export default function Footer() {
  const lenis = useLenis();

  function goToBranch(e: React.MouseEvent, anchorId: string) {
    e.preventDefault();
    const target = computeNavScrollTarget(anchorId);
    if (target == null) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  function goToSection(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const target = computeIdScrollTarget(id, 0);
    if (target == null) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <footer id="footer" className="w-full bg-surface-container-lowest pt-20 pb-16 px-margin-mobile lg:px-margin scroll-mt-28">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col space-y-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-surface-container-high">
          <div className="max-w-3xl">
            <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest block mb-4">// Manifesto</span>
            <h2 className="font-headline-lg text-4xl sm:text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.05]">
              Automotive engineering.
              <br />
              Digital exchanges.
              <br />
              Gastronomic culture.
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Direct Contact</span>
            <a className="text-on-surface font-body-md text-base hover:underline w-fit" href="https://wa.me/917027900004" rel="noopener" target="_blank">
              +91 70279 00004 (WhatsApp)
            </a>
            <a className="inline-flex items-center gap-1.5 text-on-surface font-body-md text-base hover:underline w-fit" href="tel:+917710777775">
              <span className="material-symbols-outlined text-base">call</span>
              +91 77107 77775 (Call for any issue)
            </a>
            <span className="font-label-sm text-label-sm text-on-surface-variant">All branches, one line</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="flex flex-col space-y-3">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-bold">Branch Navigator</span>
            {BRANCH_LINKS.map((link) => (
              <motion.a
                key={link.path}
                className="text-on-surface hover:text-primary-container font-body-md text-base transition-colors duration-200 w-fit"
                href={`#${link.path}`}
                onClick={(e) => goToBranch(e, link.path)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
              </motion.a>
            ))}
            {COMING_SOON_LINKS.map((link) => (
              <motion.a
                key={link.path}
                className="text-on-surface-variant hover:text-on-surface font-body-md text-base transition-colors duration-200 w-fit"
                href={`#${link.path}`}
                onClick={(e) => goToSection(e, link.path)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col space-y-3">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-bold">What We Do</span>
            <span className="text-on-surface font-body-md text-base">Automotive Engineering</span>
            <span className="text-on-surface font-body-md text-base">Digital Exchanges</span>
            <span className="text-on-surface font-body-md text-base">Gastronomic Culture</span>
          </div>

          <div className="flex flex-col space-y-3">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-bold">Legal</span>
            <span className="text-on-surface-variant font-body-md text-base">Privacy Manifesto — Coming Soon</span>
            <span className="text-on-surface-variant font-body-md text-base">Telemetry Terms — Coming Soon</span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider gap-4"
        >
          <span>© 2025 Unity Group. All Rights Reserved.</span>
          <span>Unity Holding Group Corp.</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
