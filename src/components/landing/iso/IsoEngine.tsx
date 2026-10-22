import { isoBox, floorEllipse, round, type Origin } from "./iso";
import { LineFaces } from "./TechFaces";

const FILL = "#111214";
const STROKE = "rgba(235,235,235,0.6)";
const STROKE_FAINT = "rgba(235,235,235,0.35)";

function diskBand(cx: number, cy: number, z: number, h: number, rx: number, ry: number, o: Origin) {
  const bottom = floorEllipse(cx, cy, z, rx, ry, o);
  const top = floorEllipse(cx, cy, z + h, rx, ry, o);
  return {
    band: `M${bottom.cx - bottom.rx},${bottom.cy} A${bottom.rx},${bottom.ry} 0 0 0 ${bottom.cx + bottom.rx},${bottom.cy} L${top.cx + top.rx},${top.cy} A${top.rx},${top.ry} 0 0 1 ${top.cx - top.rx},${top.cy} Z`,
    top,
  };
}

function Fin({ cx, cy, z, h, rx, ry, o }: { cx: number; cy: number; z: number; h: number; rx: number; ry: number; o: Origin }) {
  const { band, top } = diskBand(cx, cy, z, h, rx, ry, o);
  return (
    <g>
      <path d={band} fill={FILL} stroke={STROKE} strokeWidth={0.32} />
      <ellipse cx={top.cx} cy={top.cy} rx={top.rx} ry={top.ry} fill={FILL} stroke={STROKE} strokeWidth={0.32} />
    </g>
  );
}

function BoltRing({ cx, cy, z, r, count, o }: { cx: number; cy: number; z: number; r: number; count: number; o: Origin }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        const p = floorEllipse(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.5, z, 0.55, 0.55, o);
        return <circle key={i} cx={round(p.cx)} cy={round(p.cy)} r={1.1} fill="none" stroke={STROKE} strokeWidth={0.3} />;
      })}
    </>
  );
}

export default function IsoEngine({ className }: { className?: string }) {
  const o: Origin = { x: 150, y: 175, scale: 2.7 };

  const halo = floorEllipse(0, 4, 0, 42, 20, o);

  // --- Crankcase ---
  const crankcase = isoBox(-16, -10, 0, 30, 18, 12, o, FILL);
  const basePlate = isoBox(-18, -11, 0, 34, 20, 2, o, FILL);

  // Side cover: a round housing with a bolt ring, like a flywheel/clutch cover
  const coverZ = 8;
  const coverR = 7;

  // --- Cylinder barrel: individually stacked cooling-fin discs ---
  const barrelCx = -1;
  const barrelCy = -10;
  const barrelR = 6.6;
  const finCount = 11;
  const finH = 1.3;
  const finGap = 0.55;
  const finPitch = finH + finGap;
  const barrelStart = 13;

  // --- Cylinder head: wider, fewer, larger fins ---
  const headCx = barrelCx;
  const headCy = barrelCy;
  const headR = 8.4;
  const headFinCount = 5;
  const headStart = barrelStart + finCount * finPitch + 0.8;

  const domeZ = headStart + headFinCount * (finH + finGap) + 1;

  // Pushrod tube running up the side of the barrel
  const pushrod = isoBox(6, -11, 6, 1.6, 1.6, headStart - 4, o, FILL);

  // Exhaust stub near the base of the barrel
  const exhaust = isoBox(-8, -17, 11, 10, 2.4, 2.4, o, FILL);
  const exhaustFlange = floorEllipse(-17, -16, 12.2, 1.6, 1.6, o);

  // Intake stub near the head
  const intake = isoBox(6, -16, headStart + 3, 8, 2, 2, o, FILL);
  const intakeFlange = floorEllipse(13, -15, headStart + 4, 1.3, 1.3, o);

  // Spark plug poking from the head top
  const sparkBody = isoBox(-3, -4, domeZ, 1.6, 1.6, 4.5, o, FILL);
  const sparkCap = floorEllipse(-2.2, -3.2, domeZ + 4.5, 1, 1, o);

  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true">
      <ellipse cx={halo.cx} cy={halo.cy + 4} rx={halo.rx} ry={halo.ry} fill="#000000" opacity={0.45} />

      <LineFaces faces={basePlate} fill={FILL} stroke={STROKE} />
      <LineFaces faces={crankcase} fill={FILL} stroke={STROKE} />

      {/* side cover with bolt ring, like a flywheel housing */}
      {(() => {
        const bottom = floorEllipse(-8, 2, coverZ, coverR, coverR, o);
        return (
          <g>
            <ellipse cx={bottom.cx} cy={bottom.cy} rx={bottom.rx} ry={bottom.ry} fill={FILL} stroke={STROKE} strokeWidth={0.35} />
            <ellipse cx={bottom.cx} cy={bottom.cy} rx={bottom.rx * 0.45} ry={bottom.ry * 0.45} fill="none" stroke={STROKE_FAINT} strokeWidth={0.3} />
          </g>
        );
      })()}
      <BoltRing cx={-8} cy={2} z={coverZ} r={5.6} count={6} o={o} />

      <LineFaces faces={exhaust} fill={FILL} stroke={STROKE} />
      <ellipse cx={exhaustFlange.cx} cy={exhaustFlange.cy} rx={exhaustFlange.rx} ry={exhaustFlange.ry} fill={FILL} stroke={STROKE} strokeWidth={0.3} />

      {/* cylinder barrel fin stack */}
      {Array.from({ length: finCount }, (_, i) => (
        <Fin key={`barrel-${i}`} cx={barrelCx} cy={barrelCy} z={barrelStart + i * finPitch} h={finH} rx={barrelR} ry={barrelR} o={o} />
      ))}

      <LineFaces faces={pushrod} fill={FILL} stroke={STROKE} />

      {/* cylinder head fin stack, wider discs */}
      {Array.from({ length: headFinCount }, (_, i) => (
        <Fin key={`head-${i}`} cx={headCx} cy={headCy} z={headStart + i * finPitch} h={finH * 1.15} rx={headR} ry={headR} o={o} />
      ))}

      {/* rounded dome cap on top of the head */}
      {(() => {
        const dome = floorEllipse(headCx, headCy, domeZ, headR * 0.85, headR * 0.85, o);
        return <ellipse cx={dome.cx} cy={dome.cy} rx={dome.rx} ry={dome.ry} fill={FILL} stroke={STROKE} strokeWidth={0.35} />;
      })()}

      <LineFaces faces={intake} fill={FILL} stroke={STROKE} />
      <ellipse cx={intakeFlange.cx} cy={intakeFlange.cy} rx={intakeFlange.rx} ry={intakeFlange.ry} fill={FILL} stroke={STROKE} strokeWidth={0.3} />

      <LineFaces faces={sparkBody} fill={FILL} stroke={STROKE} />
      <ellipse cx={sparkCap.cx} cy={sparkCap.cy} rx={sparkCap.rx} ry={sparkCap.ry} fill={FILL} stroke={STROKE} strokeWidth={0.3} />

      {/* base mounting bolts */}
      {[
        [-17, -10],
        [13, -10],
        [-17, 7],
        [13, 7],
      ].map(([bx, by], i) => {
        const p = floorEllipse(bx, by, 2, 0.9, 0.9, o);
        return (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r={1.1} fill="none" stroke={STROKE} strokeWidth={0.3} />
            <line x1={round(p.cx - 0.7)} y1={p.cy} x2={round(p.cx + 0.7)} y2={p.cy} stroke={STROKE_FAINT} strokeWidth={0.25} />
          </g>
        );
      })}
    </svg>
  );
}
