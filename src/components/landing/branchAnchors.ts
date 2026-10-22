// The three branch cards live stacked absolutely inside one shared sticky
// track (see BranchStack.tsx) rather than laid out sequentially in the
// document, so a native `<a href="#unity-carhub">` jump has no real target
// to land on. This computes the scroll offset that brings a given branch to
// the front of the stack, so nav links can scroll there explicitly.

export const BRANCH_ANCHORS = ["unity-motor", "unity-carhub", "shawarma-cartel", "bhatia-homeopathics", "unity-tech"] as const;
export type BranchAnchor = (typeof BRANCH_ANCHORS)[number];

export const BRANCH_TRACK_ID = "branch-stack-track";

export function computeBranchScrollTarget(anchorId: string): number | null {
  if (typeof window === "undefined") return null;
  const track = document.getElementById(BRANCH_TRACK_ID);
  if (!track) return null;

  const index = BRANCH_ANCHORS.indexOf(anchorId as BranchAnchor);
  if (index === -1) return null;

  const total = BRANCH_ANCHORS.length;
  const trackTop = track.getBoundingClientRect().top + window.scrollY;
  const trackHeight = track.offsetHeight;
  const viewportHeight = window.innerHeight;
  // Middle of the card's own slot in the scroll progress — comfortably
  // settled at the front of the stack, not mid-transition.
  const targetProgress = (index + 0.5) / total;

  return trackTop + targetProgress * Math.max(trackHeight - viewportHeight, 0);
}

// Generic smooth-scroll target for any plain (non-stacked) element by id,
// offset to clear the fixed header.
export function computeIdScrollTarget(id: string, headerOffset = 96): number | null {
  if (typeof window === "undefined") return null;
  const el = document.getElementById(id);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY - headerOffset;
}

// Tailwind's `lg` breakpoint — below this, BranchStack renders plain
// sequential cards instead of the absolute-stacked desktop effect (see
// BranchStack.tsx), so nav links need a different targeting strategy.
const LG_BREAKPOINT = 1024;

// Picks the right scroll target for a branch nav link depending on which
// layout is actually rendered at the current viewport width: the desktop
// stack (hidden on mobile, so its own geometry can't be trusted there) or
// the mobile sequential list (a real element with this id in normal flow).
export function computeNavScrollTarget(anchorId: string): number | null {
  if (typeof window === "undefined") return null;
  if (window.innerWidth < LG_BREAKPOINT) return computeIdScrollTarget(anchorId);
  return computeBranchScrollTarget(anchorId);
}
