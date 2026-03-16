"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { skillCategories, alsoFamiliarWith } from "@/lib/skills";
import type { FileId } from "@/hooks/useIDEState";
import { SkillMap } from "./SkillMap";

interface SkillsSectionProps {
  onNavigate: (id: FileId) => void;
}

// Per-skill cycling colors — matches the reference rainbow palette
const BAR_COLORS = [
  "#f472b6", // pink
  "#f97316", // orange
  "#eab308", // yellow
  "#22d3ee", // cyan
  "#a3e635", // lime
  "#818cf8", // indigo
  "#34d399", // emerald
  "#fb7185", // rose
  "#c084fc", // purple
  "#38bdf8", // sky
  "#4ade80", // green
  "#facc15", // amber
];

function getBarColor(catIdx: number, skillIdx: number) {
  return BAR_COLORS[(catIdx * 3 + skillIdx) % BAR_COLORS.length];
}

function SkillRow({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });

  return (
    <div ref={ref} className="flex items-center gap-4 py-2">
      {/* Skill name */}
      <span
        className="shrink-0"
        style={{
          width: "160px",
          color: "var(--vsc-fg)",
          fontFamily: "var(--font-mono)",
          fontSize: "15px",
        }}
      >
        {name}
      </span>

      {/* Bar — near-invisible track, colored fill */}
      <div
        className="relative flex-1 rounded-full overflow-hidden"
        style={{ height: "4px", background: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ background: color, width: `${level}%` }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Percentage — fades in after bar */}
      <motion.span
        className="shrink-0 font-semibold tabular-nums"
        style={{
          width: "42px",
          textAlign: "right",
          color,
          fontFamily: "var(--font-mono)",
          fontSize: "14px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: delay + 0.5, duration: 0.3 }}
      >
        {level}%
      </motion.span>
    </div>
  );
}

function CategoryCard({
  category,
  catIdx,
}: {
  category: (typeof skillCategories)[number];
  catIdx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: catIdx * 0.07, duration: 0.4, ease: "easeOut" }}
    >
      <h3
        className="text-xs font-bold tracking-widest uppercase mb-4 pb-2"
        style={{
          color: "var(--vsc-fg-muted)",
          borderBottom: "1px solid var(--vsc-border)",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.16em",
          fontSize: "13px",
        }}
      >
        {category.name}
      </h3>

      <div>
        {category.skills.map((skill, skillIdx) => (
          <SkillRow
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={getBarColor(catIdx, skillIdx)}
            delay={catIdx * 0.05 + skillIdx * 0.06}
          />
        ))}
      </div>
    </motion.div>
  );
}

function FamiliarPill({ label, index }: { label: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.03, duration: 0.25, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "6px 16px",
        borderRadius: "5px",
        fontFamily: "var(--font-mono)",
        fontSize: "14px",
        cursor: "default",
        border: `1px solid ${hovered ? "#9d1515" : "var(--vsc-border)"}`,
        color: hovered ? "#ffffff" : "var(--vsc-fg-muted)",
        background: hovered ? "rgba(157,21,21,0.15)" : "transparent",
        transition: "border-color 0.15s, color 0.15s, background 0.15s",
      }}
    >
      {label}
    </motion.span>
  );
}

export function SkillsSection({ onNavigate: _onNavigate }: SkillsSectionProps) {
  return (
    <div className="min-h-full py-10 pb-20 px-12" style={{ maxWidth: "1400px" }}>
      {/* Comment */}
      <p
        className="text-sm mb-5"
        style={{ color: "var(--vsc-comment)", fontFamily: "var(--font-mono)", fontStyle: "italic" }}
      >
        {`// skills.json — tech stack & tools I actually use`}
      </p>

      {/* Big heading */}
      <h1
        className="font-black mb-4 leading-none"
        style={{
          fontSize: "clamp(48px, 8vw, 72px)",
          color: "var(--vsc-fg)",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.02em",
        }}
      >
        Skills
      </h1>

      {/* Inline status */}
      <p className="text-sm mb-10" style={{ fontFamily: "var(--font-mono)" }}>
        <span style={{ color: "var(--vsc-punct)" }}>{`{ `}</span>
        <span style={{ color: "var(--vsc-string)" }}>&quot;status&quot;</span>
        <span style={{ color: "var(--vsc-punct)" }}>: </span>
        <span style={{ color: "var(--vsc-string)" }}>&quot;always_learning&quot;</span>
        <span style={{ color: "var(--vsc-punct)" }}>, </span>
        <span style={{ color: "var(--vsc-string)" }}>&quot;passion&quot;</span>
        <span style={{ color: "var(--vsc-punct)" }}>: </span>
        <span style={{ color: "var(--vsc-string)" }}>&quot;immeasurable&quot;</span>
        <span style={{ color: "var(--vsc-punct)" }}>{` }`}</span>
      </p>

      {/* ── Two-column layout: bars LEFT  ·  network map RIGHT ── */}
      <div className="flex flex-col xl:flex-row gap-12 mb-14">

        {/* Left — skill bar categories */}
        <div
          className="grid gap-x-14 gap-y-10 flex-1 min-w-0"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", alignContent: "start" }}
        >
          {skillCategories.map((category, catIdx) => (
            <CategoryCard key={category.key} category={category} catIdx={catIdx} />
          ))}
        </div>

        {/* Right — interactive skill network map */}
        <div className="xl:w-[560px] shrink-0 xl:sticky xl:top-6 self-start">
          <SkillMap />
        </div>
      </div>

      {/* Also Familiar With */}
      <div>
        <h3
          className="font-bold tracking-widest uppercase mb-5 pb-2"
          style={{
            fontSize: "13px",
            color: "var(--vsc-fg-muted)",
            borderBottom: "1px solid var(--vsc-border)",
            fontFamily: "var(--font-display)",
            letterSpacing: "0.16em",
          }}
        >
          Also Familiar With
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {alsoFamiliarWith.map((label, i) => (
            <FamiliarPill key={label} label={label} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
