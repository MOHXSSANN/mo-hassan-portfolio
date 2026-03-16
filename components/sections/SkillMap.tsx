"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/lib/skills";

// ─── Color resolution ─────────────────────────────────────────────────
const COLOR_MAP: Record<string, string> = {
  "var(--vsc-blue)":   "#569cd6",
  "var(--vsc-cyan)":   "#4ec9b0",
  "var(--vsc-yellow)": "#dcdcaa",
  "var(--vsc-orange)": "#ce9178",
  "var(--vsc-pink)":   "#c586c0",
  "var(--vsc-number)": "#b5cea8",
};
const FALLBACKS = ["#569cd6","#4ec9b0","#dcdcaa","#ce9178","#c586c0","#b5cea8"];
const rc = (v: string, i: number) => COLOR_MAP[v] ?? FALLBACKS[i % 6];

const AXIS_LABELS = ["Languages", "Frameworks", "Backend", "DevOps", "Security", "Testing"];

// ─── Radar geometry ───────────────────────────────────────────────────
const VW = 460, VH = 390;
const CX = 245, CY = 198, MAX_R = 145;
const N = skillCategories.length;

function ang(i: number) { return (i * 2 * Math.PI) / N - Math.PI / 2; }
function radarPt(pct: number, i: number) {
  const r = (pct / 100) * MAX_R;
  return { x: CX + r * Math.cos(ang(i)), y: CY + r * Math.sin(ang(i)) };
}
function axisTip(i: number) { return radarPt(100, i); }
function toPoly(pts: { x: number; y: number }[]) {
  return pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}
function catAvg(idx: number) {
  const s = skillCategories[idx].skills;
  return s.reduce((a, k) => a + k.level, 0) / s.length;
}

// ─── Fixed tooltip ────────────────────────────────────────────────────
interface TooltipState {
  catIdx: number;
  screenX: number;
  screenY: number;
}

function RadarTooltip({ tip }: { tip: TooltipState }) {
  const cat = skillCategories[tip.catIdx];
  const col = rc(cat.color, tip.catIdx);

  // Smart placement: flip left if near right edge
  const W = 172, ROW = 20;
  const H = cat.skills.length * ROW + 28;
  const raw = tip.screenX + 16;
  const left = raw + W > window.innerWidth - 8 ? tip.screenX - W - 16 : raw;
  const top  = Math.max(8, Math.min(tip.screenY - H / 2, window.innerHeight - H - 8));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.15 }}
      style={{
        position: "fixed",
        left,
        top,
        width: W,
        zIndex: 99999,
        background: "#141414",
        border: `1px solid ${col}`,
        borderRadius: "7px",
        padding: "10px 11px 8px",
        boxShadow: `0 4px 24px rgba(0,0,0,0.55), 0 0 12px ${col}22`,
        fontFamily: "var(--font-mono)",
        pointerEvents: "none",
      }}
    >
      {/* Category title */}
      <div style={{ fontSize: "11px", fontWeight: 700, color: col, marginBottom: "8px" }}>
        {AXIS_LABELS[tip.catIdx]}
      </div>

      {/* Skill rows */}
      {cat.skills.map((skill, si) => (
        <div key={skill.name} style={{ marginBottom: si < cat.skills.length - 1 ? "6px" : 0 }}>
          {/* Name + % */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)" }}>{skill.name}</span>
            <span style={{ fontSize: "10px", fontWeight: 700, color: col }}>{skill.level}%</span>
          </div>
          {/* Bar */}
          <div style={{ height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              style={{ height: "100%", borderRadius: "2px", background: col }}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.4, delay: si * 0.04, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────
export function SkillMap() {
  const svgRef  = useRef<SVGSVGElement>(null);
  const inView  = useInView(svgRef, { once: true, margin: "0px 0px -80px 0px" });

  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const avgs       = useMemo(() => skillCategories.map((_, i) => catAvg(i)), []);
  const dataPoints = useMemo(() => avgs.map((a, i) => radarPt(a, i)), [avgs]);
  const fullPoly   = useMemo(() => toPoly(dataPoints), [dataPoints]);
  const zeroPoly   = useMemo(() => toPoly(Array(N).fill({ x: CX, y: CY })), []);

  // Close tooltip on any scroll (capture phase catches EditorCanvas scroll too)
  useEffect(() => {
    const dismiss = () => { setHovered(null); setTooltip(null); };
    window.addEventListener("scroll", dismiss, true);
    return () => window.removeEventListener("scroll", dismiss, true);
  }, []);

  // Compute screen position of a vertex from SVG viewBox coords
  const getScreenPos = useCallback((ptX: number, ptY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const r = svgRef.current.getBoundingClientRect();
    return {
      x: r.left + (ptX / VW) * r.width,
      y: r.top  + (ptY / VH) * r.height,
    };
  }, []);

  const handleEnter = useCallback((i: number) => {
    const pt = dataPoints[i];
    const { x, y } = getScreenPos(pt.x, pt.y);
    setHovered(i);
    setTooltip({ catIdx: i, screenX: x, screenY: y });
  }, [dataPoints, getScreenPos]);

  const handleLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  // Click on already-active vertex → dismiss
  const handleClick = useCallback((i: number) => {
    if (hovered === i) { setHovered(null); setTooltip(null); }
  }, [hovered]);

  const rings = [25, 50, 75, 100];

  return (
    <div className="w-full select-none">
      <p
        className="text-[11px] font-bold tracking-widest uppercase mb-2"
        style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.18em" }}
      >
        // Skill Radar
      </p>

      {/* SVG — no bg, overflow visible so pulse rings aren't clipped */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
        aria-label="Radar chart of skill proficiency by category"
        onMouseLeave={handleLeave}
      >
        <defs>
          <filter id="rdr-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="rdr-glow-lg" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="rdr-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#9d1515" stopOpacity="0.55" />
            <stop offset="60%"  stopColor="#9d1515" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#9d1515" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Grid rings */}
        {rings.map((lvl, gi) => (
          <motion.polygon key={lvl}
            points={toPoly(Array.from({ length: N }, (_, i) => radarPt(lvl, i)))}
            fill="none"
            stroke={lvl === 100 ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}
            strokeWidth={lvl === 100 ? 1.2 : 0.7}
            strokeDasharray={lvl < 100 ? "3 5" : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.4, delay: gi * 0.07 }}
          />
        ))}

        {/* Ring % labels along the top-right axis */}
        {[25, 50, 75].map((lvl) => {
          const pt = radarPt(lvl, 1);
          return (
            <motion.text key={lvl} x={pt.x + 3} y={pt.y - 3}
              fontSize="7" fill="rgba(255,255,255,0.28)" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >{lvl}%</motion.text>
          );
        })}

        {/* Axis lines */}
        {skillCategories.map((cat, i) => {
          const tip = axisTip(i);
          const col = rc(cat.color, i);
          const isAct = hovered === i;
          return (
            <motion.line key={cat.key}
              x1={CX} y1={CY} x2={tip.x} y2={tip.y}
              stroke={isAct ? col : "rgba(255,255,255,0.10)"}
              strokeWidth={isAct ? 1.5 : 0.8}
              initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
              style={{ filter: isAct ? "url(#rdr-glow)" : undefined }}
            />
          );
        })}

        {/* Active wedge highlight */}
        <AnimatePresence>
          {hovered !== null && (() => {
            const col  = rc(skillCategories[hovered].color, hovered);
            const tip  = axisTip(hovered);
            const prev = axisTip((hovered - 1 + N) % N);
            const next = axisTip((hovered + 1) % N);
            return (
              <motion.polygon key={`w-${hovered}`}
                points={`${CX},${CY} ${prev.x},${prev.y} ${tip.x},${tip.y} ${next.x},${next.y}`}
                fill={col} fillOpacity={0.07} stroke={col} strokeWidth="0.5" strokeOpacity={0.25}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            );
          })()}
        </AnimatePresence>

        {/* Data polygon — fill */}
        <motion.polygon
          points={zeroPoly} animate={{ points: inView ? fullPoly : zeroPoly }}
          fill="url(#rdr-fill)" stroke="none"
          transition={{ duration: 1.1, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ filter: "url(#rdr-glow-lg)" }}
        />
        {/* Data polygon — stroke */}
        <motion.polygon
          points={zeroPoly} animate={{ points: inView ? fullPoly : zeroPoly }}
          fill="none" stroke="#9d1515" strokeWidth="2" strokeLinejoin="round"
          transition={{ duration: 1.1, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ filter: "url(#rdr-glow)" }}
        />

        {/* Centre dot */}
        <motion.circle cx={CX} cy={CY} r={3} fill="#9d1515"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 0.8 : 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />

        {/* Per-vertex: dot + label + % */}
        {skillCategories.map((cat, i) => {
          const col   = rc(cat.color, i);
          const pt    = dataPoints[i];
          const tip   = axisTip(i);
          const a     = ang(i);
          const lR    = MAX_R + 26;
          const lx    = CX + lR * Math.cos(a);
          const ly    = CY + lR * Math.sin(a);
          const isAct = hovered === i;

          const anchor = Math.abs(Math.cos(a)) < 0.25 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
          const dy     = Math.sin(a) > 0.6 ? 12 : Math.sin(a) < -0.6 ? -4 : 0;

          return (
            <g key={cat.key} style={{ cursor: "pointer" }}
               onMouseEnter={() => handleEnter(i)}
               onMouseLeave={handleLeave}
               onClick={() => handleClick(i)}
            >
              {/* Larger invisible hit area on tip */}
              <circle cx={tip.x} cy={tip.y} r={20} fill="transparent" />

              {/* Pulse rings when active */}
              {isAct && (<>
                <motion.circle cx={pt.x} cy={pt.y} fill="none" stroke={col} strokeWidth="1"
                  animate={{ r: [6, 20], opacity: [0.9, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }} />
                <motion.circle cx={pt.x} cy={pt.y} fill="none" stroke={col} strokeWidth="0.5"
                  animate={{ r: [10, 28], opacity: [0.5, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.35, ease: "easeOut" }} />
              </>)}

              {/* Vertex dot */}
              <motion.circle cx={pt.x} cy={pt.y}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: inView ? (isAct ? 7 : 4.5) : 0, opacity: inView ? 1 : 0 }}
                transition={{ r: { duration: 0.2 }, opacity: { duration: 0.35, delay: 1.1 + i * 0.09 } }}
                fill={col} stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"
                style={{ filter: isAct ? "url(#rdr-glow)" : undefined }}
              />

              {/* % label near vertex */}
              <motion.text
                x={pt.x + (pt.x > CX + 4 ? 9 : pt.x < CX - 4 ? -9 : 0)}
                y={pt.y + (pt.y > CY ? 11 : -8)}
                textAnchor={pt.x > CX + 4 ? "start" : pt.x < CX - 4 ? "end" : "middle"}
                fontSize={isAct ? "10" : "8.5"} fontWeight="800" fill={col} fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? (isAct ? 1 : 0.75) : 0 }}
                transition={{ duration: 0.3, delay: 1.3 + i * 0.09 }}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >{Math.round(avgs[i])}%</motion.text>

              {/* Axis label */}
              <motion.text x={lx} y={ly + dy}
                textAnchor={anchor} dominantBaseline="middle"
                fontSize={isAct ? "11.5" : "10"} fontWeight={isAct ? "700" : "500"}
                fill={isAct ? col : "rgba(255,255,255,0.72)"} fontFamily="monospace"
                initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 1.35 + i * 0.09 }}
                style={{ filter: isAct ? `drop-shadow(0 0 5px ${col})` : undefined, userSelect: "none" }}
              >{AXIS_LABELS[i]}</motion.text>
            </g>
          );
        })}
      </svg>

      {/* ── Fixed tooltip — rendered outside SVG, never scrolls ── */}
      <AnimatePresence>
        {tooltip !== null && <RadarTooltip key={tooltip.catIdx} tip={tooltip} />}
      </AnimatePresence>
    </div>
  );
}
