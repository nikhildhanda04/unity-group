import { isoBox, floorEllipse, round, type Origin } from "./iso";
import { LineFaces } from "./TechFaces";

const FILL = "#111214";
const STROKE = "rgba(235,235,235,0.6)";
const STROKE_FAINT = "rgba(235,235,235,0.35)";

function band(cx: number, cy: number, z: number, h: number, rx: number, ry: number, o: Origin) {
  const bottom = floorEllipse(cx, cy, z, rx, ry, o);
  const top = floorEllipse(cx, cy, z + h, rx, ry, o);
  return {
    d: `M${bottom.cx - bottom.rx},${bottom.cy} A${bottom.rx},${bottom.ry} 0 0 0 ${bottom.cx + bottom.rx},${bottom.cy} L${top.cx + top.rx},${top.cy} A${top.rx},${top.ry} 0 0 1 ${top.cx - top.rx},${top.cy} Z`,
    bottom,
    top,
  };
}

export default function IsoBrake({ className }: { className?: string }) {
  const o: Origin = { x: 70, y: 150, scale: 3.1 };

  const halo = floorEllipse(14, 4, 0, 34, 15, o);

  // --- Part 1: the rotor, smallest, drilled with vent holes + a caliper icon ---
  const rotorCx = -14;
  const rotorCy = -4;
  const rotorR = 7.5;
  const rotorZ = 10;
  const rotorH = 1.6;
  const rotorBand = band(rotorCx, rotorCy, rotorZ, rotorH, rotorR, rotorR, o);
  const rotorHub = floorEllipse(rotorCx, rotorCy, rotorZ + rotorH, 2, 2, o);
  const rotorVents = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return floorEllipse(rotorCx + Math.cos(a) * rotorR * 0.68, rotorCy + Math.sin(a) * rotorR * 0.68, rotorZ + rotorH + 0.05, 0.6, 0.6, o);
  });
  const caliper = isoBox(rotorCx - 1, rotorCy + rotorR - 2.5, rotorZ - 2, 3.4, 4, rotorH + 5, o, FILL);

  // --- Part 2: the wheel/rim, medium, with a spoke pattern ---
  const rimCx = 2;
  const rimCy = -2;
  const rimR = 10;
  const rimZ = 6;
  const rimH = 2.4;
  const rimBand = band(rimCx, rimCy, rimZ, rimH, rimR, rimR, o);
  const rimHub = floorEllipse(rimCx, rimCy, rimZ + rimH, 2.4, 2.4, o);
  const spokeCount = 7;
  const spokes = Array.from({ length: spokeCount }, (_, i) => {
    const a = (i / spokeCount) * Math.PI * 2;
    const inner = floorEllipse(rimCx + Math.cos(a) * 2.4, rimCy + Math.sin(a) * 2.4, rimZ + rimH + 0.05, 0, 0, o);
    const outer = floorEllipse(rimCx + Math.cos(a) * rimR * 0.92, rimCy + Math.sin(a) * rimR * 0.92, rimZ + rimH + 0.05, 0, 0, o);
    return { inner, outer };
  });

  // --- Part 3: the tire, largest, a thick ring with tread ticks around the rim ---
  const tireCx = 22;
  const tireCy = 2;
  const tireOuterR = 15.5;
  const tireInnerR = 10.5;
  const tireZ = 0;
  const tireH = 4.6;
  const tireOuterBand = band(tireCx, tireCy, tireZ, tireH, tireOuterR, tireOuterR, o);
  const tireInnerTop = floorEllipse(tireCx, tireCy, tireZ + tireH, tireInnerR, tireInnerR, o);
  const tireOuterTop = floorEllipse(tireCx, tireCy, tireZ + tireH, tireOuterR, tireOuterR, o);
  const treadCount = 26;
  const treadTicks = Array.from({ length: treadCount }, (_, i) => {
    const a = (i / treadCount) * Math.PI * 2;
    const p1 = floorEllipse(tireCx + Math.cos(a) * tireOuterR, tireCy + Math.sin(a) * tireOuterR, tireZ + tireH * 0.3, 0, 0, o);
    const p2 = floorEllipse(tireCx + Math.cos(a) * tireOuterR, tireCy + Math.sin(a) * tireOuterR, tireZ + tireH * 0.85, 0, 0, o);
    return { p1, p2 };
  });

  return (
    <svg viewBox="0 0 230 220" className={className} aria-hidden="true">
      <ellipse cx={halo.cx} cy={halo.cy + 3} rx={halo.rx} ry={halo.ry} fill="#000000" opacity={0.4} />

      {/* rotor */}
      <path d={rotorBand.d} fill={FILL} stroke={STROKE} strokeWidth={0.3} />
      <ellipse cx={rotorBand.top.cx} cy={rotorBand.top.cy} rx={rotorBand.top.rx} ry={rotorBand.top.ry} fill={FILL} stroke={STROKE} strokeWidth={0.32} />
      {rotorVents.map((v, i) => (
        <circle key={i} cx={v.cx} cy={v.cy} r={1} fill="none" stroke={STROKE} strokeWidth={0.26} />
      ))}
      <circle cx={rotorHub.cx} cy={rotorHub.cy} r={2.2} fill="none" stroke={STROKE} strokeWidth={0.3} />
      <LineFaces faces={caliper} fill={FILL} stroke={STROKE} />

      {/* wheel / rim with spokes */}
      <path d={rimBand.d} fill={FILL} stroke={STROKE} strokeWidth={0.3} />
      <ellipse cx={rimBand.top.cx} cy={rimBand.top.cy} rx={rimBand.top.rx} ry={rimBand.top.ry} fill={FILL} stroke={STROKE} strokeWidth={0.32} />
      {spokes.map((s, i) => (
        <line key={i} x1={s.inner.cx} y1={s.inner.cy} x2={s.outer.cx} y2={s.outer.cy} stroke={STROKE_FAINT} strokeWidth={0.4} />
      ))}
      <ellipse cx={rimHub.cx} cy={rimHub.cy} rx={rimHub.rx} ry={rimHub.ry} fill={FILL} stroke={STROKE} strokeWidth={0.3} />

      {/* tire: outer wall + inner bore + tread ticks */}
      <path d={tireOuterBand.d} fill={FILL} stroke={STROKE} strokeWidth={0.32} />
      <ellipse cx={tireOuterTop.cx} cy={tireOuterTop.cy} rx={tireOuterTop.rx} ry={tireOuterTop.ry} fill={FILL} stroke={STROKE} strokeWidth={0.34} />
      <ellipse cx={tireInnerTop.cx} cy={tireInnerTop.cy} rx={tireInnerTop.rx} ry={tireInnerTop.ry} fill="#060607" stroke={STROKE} strokeWidth={0.32} />
      {treadTicks.map((t, i) => (
        <line key={i} x1={round(t.p1.cx)} y1={round(t.p1.cy)} x2={round(t.p2.cx)} y2={round(t.p2.cy)} stroke={STROKE_FAINT} strokeWidth={0.3} />
      ))}
    </svg>
  );
}
