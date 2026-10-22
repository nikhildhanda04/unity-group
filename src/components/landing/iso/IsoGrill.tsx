import { isoBox, floorEllipse, round, type Origin } from "./iso";
import { LineFaces } from "./TechFaces";

const FILL = "#111214";
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

export default function IsoGrill({ className }: { className?: string }) {
  const o: Origin = { x: 110, y: 170, scale: 3.4 };

  const halo = floorEllipse(0, 0, 0, 22, 11, o);

  const base = isoBox(-16, -10, 0, 32, 20, 4, o, FILL);
  const dripTray = isoBox(-12, -7, 4, 24, 14, 1.4, o, FILL);
  const postL = isoBox(-14, -9, 5, 2.4, 2.4, 44, o, FILL);
  const postR = isoBox(12, -9, 5, 2.4, 2.4, 44, o, FILL);
  const crossbar = isoBox(-14, -9, 47, 28.4, 2.4, 2, o, FILL);
  const motorHousing = isoBox(-4, -8, 49, 8, 7, 6, o, FILL);

  const spit = isoBox(-0.9, 0, 5, 1.8, 1.8, 42, o, FILL);

  const meatLayers = [
    { z: 8, r: 6.2, h: 3.4 },
    { z: 11.5, r: 7.4, h: 3.6 },
    { z: 15.3, r: 8.1, h: 3.8 },
    { z: 19.3, r: 7.8, h: 3.6 },
    { z: 23.1, r: 6.9, h: 3.2 },
    { z: 26.5, r: 5.6, h: 2.6 },
  ];

  const bladeRail = isoBox(5, -9, 6, 1.4, 20, 30, o, FILL);
  const bladeMotor = isoBox(4, -10.5, 20, 4.4, 4.4, 5.2, o, FILL);
  const bladeArm = isoBox(5.4, -6, 21.4, 5.2, 1.6, 1.6, o, FILL);
  const blade = isoBox(10.2, -6, 11, 0.6, 15, 18, o, FILL);

  return (
    <svg viewBox="0 0 230 260" className={className} aria-hidden="true">
      <ellipse cx={halo.cx} cy={halo.cy + 3} rx={halo.rx} ry={halo.ry} fill="#000000" opacity={0.4} />

      <LineFaces faces={base} fill={FILL} stroke={STROKE} />
      <LineFaces faces={dripTray} fill={FILL} stroke={STROKE} />
      <LineFaces faces={postL} fill={FILL} stroke={STROKE} />
      <LineFaces faces={postR} fill={FILL} stroke={STROKE} />
      <LineFaces faces={crossbar} fill={FILL} stroke={STROKE} />
      <LineFaces faces={motorHousing} fill={FILL} stroke={STROKE} />
      <LineFaces faces={spit} fill={FILL} stroke={STROKE} />

      {meatLayers.map((m, i) => {
        const b = band(0, 0, m.z, m.h, m.r, m.r, o);
        const charCount = 6;
        return (
          <g key={i}>
            <path d={b.d} fill={MEAT_FILL} stroke={STROKE} strokeWidth={0.3} />
            {Array.from({ length: charCount }, (_, j) => {
              const a = -Math.PI / 2.6 + (j / (charCount - 1)) * (Math.PI / 1.4);
              const r1 = m.r * 0.55;
              const r2 = m.r * 0.98;
              const p1 = floorEllipse(Math.cos(a) * r1, Math.sin(a) * r1 * 0.46, m.z + m.h * 0.35, 0, 0, o);
              const p2 = floorEllipse(Math.cos(a) * r2, Math.sin(a) * r2 * 0.46, m.z + m.h * 0.35, 0, 0, o);
              return <line key={j} x1={round(p1.cx)} y1={round(p1.cy)} x2={round(p2.cx)} y2={round(p2.cy)} stroke={STROKE_FAINT} strokeWidth={0.3} strokeLinecap="round" />;
            })}
            <ellipse cx={b.top.cx} cy={b.top.cy} rx={b.top.rx} ry={b.top.ry} fill={MEAT_FILL} stroke={STROKE} strokeWidth={0.3} />
          </g>
        );
      })}

      <LineFaces faces={bladeRail} fill={FILL} stroke={STROKE} />
      <LineFaces faces={bladeMotor} fill={FILL} stroke={STROKE} />
      <LineFaces faces={bladeArm} fill={FILL} stroke={STROKE} />
      <LineFaces faces={blade} fill={FILL} stroke={STROKE} />
    </svg>
  );
}
