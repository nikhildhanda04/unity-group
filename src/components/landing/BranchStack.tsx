"use client";

import { useRef } from "react";
import { motion, useTransform, useScroll, type MotionValue } from "framer-motion";
import BranchCard, { type BranchCardData } from "./BranchCard";
import ComingSoonCard from "./ComingSoonCard";
import { buildBranchData } from "./branchData";
import { BRANCH_TRACK_ID } from "./branchAnchors";

const VH_PER_CARD = 80; // scroll distance allotted to each card's entrance

function StackedCard({
  data,
  index,
  total,
  progress,
}: {
  data: BranchCardData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const bpStart = index / total;
  const bpEnd = (index + 1) / total;
  const bpPrev = (index - 1) / total;
  const isLast = index === total - 1;

  // Entry spans the ENTIRE preceding slot so motion is continuous across the
  // whole scroll range — no flat "dead" zone before the next card arrives.
  // 1400px clears even the tallest card fully off-stage before it arrives.
  // Every card lands at y:0 (no peek offset) so the incoming card fully
  // covers the previous one instead of piling headings up above it.
  const y = useTransform(progress, index === 0 ? [0, 1] : [bpPrev, bpStart], index === 0 ? [0, 0] : [1400, 0]);

  // Once covered, the card recedes: it shrinks and darkens rather than
  // staying full-bright underneath the incoming card.
  const recede = useTransform(progress, isLast ? [0, 1] : [bpStart, bpEnd], isLast ? [0, 0] : [0, 1]);
  const scale = useTransform(recede, [0, 1], [1, 0.92]);
  const darken = useTransform(recede, [0, 1], [0, 0.55]);

  return (
    <motion.div className="absolute inset-x-0 top-0" style={{ y, scale, zIndex: index + 1, transformOrigin: "top center" }}>
      {/* id omitted here — this card is duplicated for the desktop-only stack;
          the real anchor id lives on the mobile sequential copy below so
          there's exactly one element with that id in the DOM. */}
      <BranchCard data={data} id={undefined} />
      <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: darken }} />
    </motion.div>
  );
}

export default function BranchStack() {
  const branches = buildBranchData();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  return (
    <>
      {/* Mobile/tablet: plain sequential cards in normal document flow. The
          desktop scroll-hijacking stack effect breaks down below ~lg — each
          card's content (image + description + actions + CTA + reviews, all
          in one column) is routinely taller than the viewport, but the
          sticky-pinned stack has no way to reveal that overflow since further
          scroll just advances to the next card. Plain stacking sidesteps
          that entirely and matches how touch users expect to scroll anyway. */}
      <div className="lg:hidden w-full bg-surface-container-lowest py-12 space-y-16">
        {branches.map((data) => (
          <motion.div
            key={data.index}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <BranchCard data={data} id={data.anchorId} />
          </motion.div>
        ))}
      </div>

      {/* Desktop: the scroll-linked stacking effect. */}
      <div
        id={BRANCH_TRACK_ID}
        ref={trackRef}
        className="hidden lg:block relative w-full bg-surface-container-lowest"
        style={{ height: `${branches.length * VH_PER_CARD + 60}vh` }}
      >
        <div className="sticky top-24 overflow-visible">
          <div className="relative w-full" style={{ minHeight: 920 }}>
            {branches.map((data, i) => (
              <StackedCard key={data.index} data={data} index={i} total={branches.length} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      {/* Smaller "coming soon" divisions — not part of the scroll-hijacking
          stack above, just two plain cards sitting after it. */}
      <div className="w-full px-margin-mobile lg:px-margin bg-surface-container-lowest pt-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ComingSoonCard id="unity-law" index="06" title="Unity Law" delay={0} />
        <ComingSoonCard id="unity-estates" index="07" title="Unity Estates" delay={0.1} />
      </div>
    </>
  );
}
