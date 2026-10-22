"use client";

import { useRef } from "react";
import { motion, useTransform, useScroll, type MotionValue } from "framer-motion";
import BranchCard, { type BranchCardData } from "./BranchCard";
import ComingSoonCard from "./ComingSoonCard";
import { buildBranchData } from "./branchData";
import { BRANCH_TRACK_ID } from "./branchAnchors";

const PEEK_PX = 30; // vertical step so every settled card's header still peeks above the next
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
  const restY = index * PEEK_PX;
  const bpStart = index / total;
  const bpEnd = (index + 1) / total;
  const bpPrev = (index - 1) / total;

  // Entry spans the ENTIRE preceding slot and recede spans the ENTIRE own
  // slot (not just a trailing fraction of either) so motion is continuous
  // across the whole scroll range — no flat "dead" zone between cards where
  // nothing visibly moves before the next one starts arriving.
  // 1400px clears even the tallest card fully off-stage before it arrives —
  // anything shallower would still overlap (and intercept clicks on) the
  // currently-frontmost card's lower half.
  const y = useTransform(progress, index === 0 ? [0, 1] : [bpPrev, bpStart], index === 0 ? [restY, restY] : [1400, restY]);
  const isLast = index === total - 1;
  const scale = useTransform(progress, isLast ? [0, 1] : [bpStart, bpEnd], isLast ? [1, 1] : [1, 0.965]);

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={{ y, scale, zIndex: index + 1, transformOrigin: "top center" }}
    >
      {/* id omitted here — this card is duplicated for the desktop-only stack;
          the real anchor id lives on the mobile sequential copy below so
          there's exactly one element with that id in the DOM. */}
      <BranchCard data={data} id={undefined} />
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
          <BranchCard key={data.index} data={data} />
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
          <div className="relative w-full" style={{ minHeight: 920 + (branches.length - 1) * PEEK_PX }}>
            {branches.map((data, i) => (
              <StackedCard key={data.index} data={data} index={i} total={branches.length} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      {/* Smaller "coming soon" divisions — not part of the scroll-hijacking
          stack above, just two plain cards sitting after it. */}
      <div className="w-full px-margin-mobile lg:px-margin bg-surface-container-lowest pt-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ComingSoonCard id="unity-law" title="Unity Law" />
        <ComingSoonCard id="unity-estates" title="Unity Estates" />
      </div>
    </>
  );
}
