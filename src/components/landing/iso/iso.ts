// Minimal hand-rolled isometric SVG helpers.
// Visual language borrowed from the "anatomy" isometric-figure approach
// (solids painted in back-to-front order, 4-tone shading per box, one lit
// accent) without pulling in its full kit/WebGL/audit build pipeline.

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

export type Origin = { x: number; y: number; scale: number };

export function project(x: number, y: number, z: number, o: Origin): [number, number] {
  const X = (x - y) * COS30;
  const Y = (x + y) * SIN30 - z;
  return [o.x + X * o.scale, o.y + Y * o.scale];
}

function pt(x: number, y: number, z: number, o: Origin) {
  const [X, Y] = project(x, y, z, o);
  return `${X.toFixed(2)},${Y.toFixed(2)}`;
}

function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

/** Lighten (amt > 0) or darken (amt < 0) a hex color by a -1..1 fraction. */
export function shade(hex: string, amt: number) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  const f = (c: number) => clamp(amt >= 0 ? c + (255 - c) * amt : c * (1 + amt));
  return `#${[f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export type Face = { d: string; fill: string };

/**
 * An axis-aligned box in world units (x,y floor plane, z up), returned as the
 * three painted faces (top, right, left) a camera at this azimuth can see,
 * each already tinted from one base color (lighter top, darker left).
 */
export function isoBox(
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
  o: Origin,
  base: string,
  opts?: { topTint?: number; rightTint?: number; leftTint?: number }
): Face[] {
  const top = `M${pt(x, y, z + h, o)} L${pt(x + w, y, z + h, o)} L${pt(x + w, y + d, z + h, o)} L${pt(x, y + d, z + h, o)} Z`;
  const right = `M${pt(x, y + d, z, o)} L${pt(x + w, y + d, z, o)} L${pt(x + w, y + d, z + h, o)} L${pt(x, y + d, z + h, o)} Z`;
  const left = `M${pt(x + w, y, z, o)} L${pt(x + w, y + d, z, o)} L${pt(x + w, y + d, z + h, o)} L${pt(x + w, y, z + h, o)} Z`;
  return [
    { d: top, fill: shade(base, opts?.topTint ?? 0.22) },
    { d: right, fill: shade(base, opts?.rightTint ?? -0.05) },
    { d: left, fill: shade(base, opts?.leftTint ?? -0.32) },
  ];
}

export function round(n: number) {
  // Fixed precision keeps server- and client-rendered SVG attribute strings
  // byte-identical — raw floats can differ in their last bit between Node's
  // and the browser's V8 build, which React treats as a hydration mismatch.
  return Math.round(n * 1000) / 1000;
}

/** A flattened ellipse on the floor plane at height z, for discs / wheels / halos. */
export function floorEllipse(x: number, y: number, z: number, rx: number, ry: number, o: Origin) {
  const [cx, cy] = project(x, y, z, o);
  const rxPx = rx * o.scale * COS30 * 2;
  const ryPx = ry * o.scale * SIN30;
  return { cx: round(cx), cy: round(cy), rx: round(rxPx), ry: round(ryPx) };
}
