"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/experience";
import type { FileId } from "@/hooks/useIDEState";

interface ExperienceSectionProps {
  onNavigate: (id: FileId) => void;
}

function ExperienceEntry({ entry, index }: { entry: typeof experience[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 z-10"
        style={{
          background: index === 0 ? "var(--vsc-red-light)" : "var(--vsc-editor-bg)",
          borderColor: index === 0 ? "var(--vsc-red-light)" : "var(--vsc-border)",
          boxShadow: index === 0 ? "var(--shadow-red)" : "none",
        }}
      />

      {/* Date */}
      <p
        className="text-sm mb-2"
        style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
      >
        {entry.period}
      </p>

      {/* Role */}
      <h3
        className="font-bold mb-1 leading-tight"
        style={{
          color: "#ffffff",
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          letterSpacing: "-0.02em",
        }}
      >
        {entry.role}
      </h3>

      {/* @ Company */}
      <p
        className="font-semibold mb-4"
        style={{ color: "var(--vsc-red-light)", fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
      >
        @ {entry.company}
      </p>

      {/* Description */}
      <p
        className="leading-relaxed mb-5 max-w-2xl"
        style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", fontSize: "0.95rem", lineHeight: 1.75 }}
      >
        {entry.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {entry.tech.map((t) => (
          <span
            key={t}
            className="text-sm px-3 py-1 rounded"
            style={{
              color: "var(--vsc-red-light)",
              background: "rgba(197,38,38,0.08)",
              border: "1px solid rgba(197,38,38,0.2)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function ExperienceSection({ onNavigate: _onNavigate }: ExperienceSectionProps) {
  return (
    <div className="min-h-full pb-16">
      <div className="px-10 lg:px-16 pt-10">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-black mb-2 leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            color: "#ffffff",
            letterSpacing: "-0.03em",
          }}
        >
          Experience
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-base mb-12"
          style={{ color: "var(--vsc-red-light)", fontFamily: "var(--font-mono)" }}
        >
          interface Career extends Timeline ()
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[6px] top-3 bottom-0 w-[2px]"
            style={{ background: "linear-gradient(to bottom, var(--vsc-red-light), var(--vsc-border) 90%, transparent)" }}
          />

          <div className="space-y-14">
            {experience.map((entry, i) => (
              <ExperienceEntry key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
