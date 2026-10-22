"use client";

import { useRef, useState } from "react";
import { motion, useTransform, useScroll, type MotionValue } from "framer-motion";
import BranchCard, { type BranchCardData } from "./BranchCard";
import { buildBranchData } from "./branchData";
import InquiryModal, { type InquiryModalConfig } from "./InquiryModal";
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
      <BranchCard data={data} />
    </motion.div>
  );
}

export default function BranchStack() {
  const [activeModal, setActiveModal] = useState<InquiryModalConfig | null>(null);
  const branches = buildBranchData((config) => setActiveModal(config));
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  return (
    <div id={BRANCH_TRACK_ID} ref={trackRef} className="relative w-full bg-surface-container-lowest" style={{ height: `${branches.length * VH_PER_CARD + 60}vh` }}>
      <div className="sticky top-24 overflow-visible">
        <div className="relative w-full" style={{ minHeight: 920 + (branches.length - 1) * PEEK_PX }}>
          {branches.map((data, i) => (
            <StackedCard key={data.index} data={data} index={i} total={branches.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
      <InquiryModal config={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
