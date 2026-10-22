import { useId, type ReactNode } from "react";
import type { Face } from "./iso";

/**
 * Shared face renderer for all iso figures: a near-monochrome dark body
 * defined almost entirely by thin light hairline edges (not strong tonal
 * shading), plus an optional soft glow filter for the one lit accent per
 * figure. Matches the "desk computer" reference: matte black solids, calm
 * linework, exactly one glowing element.
 */
export function useIsoIds() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return { sheenId: `iso-sheen-${uid}`, glowId: `iso-glow-${uid}` };
}

export function IsoDefs({ sheenId, glowId }: { sheenId: string; glowId: string }) {
  return (
    <defs>
      <linearGradient id={sheenId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
        <stop offset="55%" stopColor="#ffffff" stopOpacity="0.02" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
      </linearGradient>
      <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="2.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

export function Faces({ faces, sheenId }: { faces: Face[]; sheenId: string }) {
  return (
    <>
      {faces.map((f, i) => (
        <g key={i}>
          <path d={f.d} fill={f.fill} />
          <path d={f.d} fill={`url(#${sheenId})`} style={{ mixBlendMode: "overlay" }} />
          <path d={f.d} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={0.35} />
        </g>
      ))}
    </>
  );
}

export function Glow({ id, children }: { id: string; children: ReactNode }) {
  return <g filter={`url(#${id})`}>{children}</g>;
}

/**
 * Pure line-art face renderer: opaque dark fill for correct painter's-order
 * occlusion, plus a crisp light hairline outline — no gradient sheen, no
 * tonal shading per face. Matches hand-drawn technical line illustrations
 * (individual fins, tread, ribs) rather than flat-shaded solids.
 */
export function LineFaces({ faces, fill = "#101113", stroke = "rgba(235,235,235,0.65)", strokeWidth = 0.35 }: { faces: Face[]; fill?: string; stroke?: string; strokeWidth?: number }) {
  return (
    <>
      {faces.map((f, i) => (
        <path key={i} d={f.d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      ))}
    </>
  );
}
