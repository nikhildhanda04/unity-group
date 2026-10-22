import { isoBox, floorEllipse, round, type Origin } from "./iso";
import { LineFaces } from "./TechFaces";

const FILL = "#121113";
const MEAT_FILL = "#1a1210";
const STROKE = "rgba(235,235,235,0.6)";
const STROKE_FAINT = "rgba(235,235,235,0.3)";

function band(cx: number, cy: number, z: number, h: number, rx: number, ry: number, o: Origin) {
  const bottom = floorEllipse(cx, cy, z, rx, ry, o);
  const top = floorEllipse(cx, cy, z + h, rx, ry, o);
  return {
    d: `M${bottom.cx - bottom.rx},${bottom.cy} A${bottom.rx},${bottom.ry} 0 0 0 ${bottom.cx + bottom.rx},${bottom.cy} L${top.cx + top.rx},${top.cy} A${top.rx},${top.ry} 0 0 1 ${top.cx - top.rx},${top.cy} Z`,
    bottom,
    top,
  };
}

export default function IsoShawarmaRoll({ className }: { className?: string }) {
  const o: Origin = { x: 150, y: 70, scale: 3.8 };

  const halo = floorEllipse(-2, 4, 0, 28, 12, o);

  // Wrap body: tapered cylinder built from four girth bands
  const segs = [
    { x: -18, r: 4.6, h: 9 },
    { x: -10, r: 5.4, h: 10.2 },
    { x: -1, r: 5.8, h: 11 },
    { x: 8, r: 5.2, h: 10 },
  ];

  // Torn-open end exposing the meat filling
  const tornCx = -20;
  const tornZ = 7.8;

  // Foil-wrapped end
  const foil = isoBox(10, -5, 1.2, 8, 10, 6.4, o, FILL);
  const foilPleatA = isoBox(15.5, -4.6, 1.6, 0.8, 9.2, 5.8, o, FILL);
  const foilPleatB = isoBox(12.5, -4.6, 1.6, 0.8, 9.2, 5.8, o, FILL);

  // Meat chunks exposed at the torn end
  const chunks = [
    { dx: -0.6, dy: -0.4, r: 1.1 },
    { dx: 0.8, dy: 0.6, r: 0.9 },
    { dx: -0.2, dy: 1.2, r: 0.95 },
    { dx: 1.1, dy: -0.8, r: 0.85 },
  ];

  // A companion skewer with stacked cube chunks, echoing the reference's two-piece composition
  const skewer = { x0: 30, y0: 10, z0: 1, dx: 6, dy: -3.2, dz: 0.4 };
  const skewerCubes = Array.from({ length: 5 }, (_, i) => i);

  return (
    <svg viewBox="0 0 260 180" className={className} aria-hidden="true">
      <ellipse cx={halo.cx} cy={halo.cy + 2} rx={halo.rx} ry={halo.ry} fill="#000000" opacity={0.4} />

      {segs.map((s, i) => {
        const b = band(s.x, 0, 0, s.h, s.r, s.r, o);
        return (
          <g key={i}>
            <path d={b.d} fill={FILL} stroke={STROKE} strokeWidth={0.3} />
            <ellipse cx={b.top.cx} cy={b.top.cy} rx={b.top.rx} ry={b.top.ry} fill={FILL} stroke={STROKE} strokeWidth={0.32} />
            {/* hand-illustrated-style hatching following the wrap's curve */}
            {Array.from({ length: 5 }, (_, j) => {
              const t = (j + 1) / 6;
              const hx = s.x - s.r * 0.6 + t * s.r * 1.2;
              const a = floorEllipse(hx, -s.r * 0.75, s.h * 0.15, 0, 0, o);
              const bpt = floorEllipse(hx, -s.r * 0.75, s.h * 0.75, 0, 0, o);
              return <path key={j} d={`M${round(a.cx)},${round(a.cy)} Q${round(a.cx + 1.5)},${round((a.cy + bpt.cy) / 2)} ${round(bpt.cx)},${round(bpt.cy)}`} fill="none" stroke={STROKE_FAINT} strokeWidth={0.26} />;
            })}
          </g>
        );
      })}

      {/* fold seams between segments, each ending on the silhouette */}
      {[-14, -5.5, 3.5].map((x, i) => {
        const a = floorEllipse(x, -5.2, 1, 0, 0, o);
        const b = floorEllipse(x, -5.2, 9.5, 0, 0, o);
        return <line key={i} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} stroke={STROKE_FAINT} strokeWidth={0.3} />;
      })}

      {/* torn end: cut wrap rim + exposed meat chunks */}
      {(() => {
        const rim = floorEllipse(tornCx, 0, tornZ, 5, 5, o);
        return <ellipse cx={rim.cx} cy={rim.cy} rx={rim.rx} ry={rim.ry} fill={FILL} stroke={STROKE} strokeWidth={0.32} />;
      })()}
      {chunks.map((c, i) => {
        const p = floorEllipse(tornCx + c.dx, c.dy, tornZ + 0.3, c.r, c.r, o);
        return (
          <g key={i}>
            <ellipse cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill={MEAT_FILL} stroke={STROKE} strokeWidth={0.28} />
            <path d={`M${round(p.cx - p.rx * 0.5)},${round(p.cy)} Q${round(p.cx)},${round(p.cy - p.ry * 0.6)} ${round(p.cx + p.rx * 0.5)},${round(p.cy)}`} fill="none" stroke={STROKE_FAINT} strokeWidth={0.22} />
          </g>
        );
      })}

      <LineFaces faces={foilPleatA} fill={FILL} stroke={STROKE} />
      <LineFaces faces={foilPleatB} fill={FILL} stroke={STROKE} />
      <LineFaces faces={foil} fill={FILL} stroke={STROKE} />

      {/* companion skewer: a rod threaded through stacked meat cubes */}
      {(() => {
        const s0 = floorEllipse(skewer.x0, skewer.y0, skewer.z0, 0, 0, o);
        const s1 = floorEllipse(skewer.x0 + skewer.dx * skewerCubes.length, skewer.y0 + skewer.dy * skewerCubes.length, skewer.z0 + skewer.dz * skewerCubes.length, 0, 0, o);
        return <line x1={round(s0.cx)} y1={round(s0.cy)} x2={round(s1.cx)} y2={round(s1.cy)} stroke={STROKE} strokeWidth={0.4} />;
      })()}
      {skewerCubes.map((i) => {
        const cx = skewer.x0 + skewer.dx * i;
        const cy = skewer.y0 + skewer.dy * i;
        const cz = skewer.z0 + skewer.dz * i;
        const cube = isoBox(cx - 1.4, cy - 1.4, cz - 1.1, 2.8, 2.8, 2.6, o, MEAT_FILL);
        return <LineFaces key={i} faces={cube} fill={MEAT_FILL} stroke={STROKE} />;
      })}
    </svg>
  );
}
