"use client";

import { motion, useInView } from "framer-motion";
import { Github } from "lucide-react";
import { useRef, useState } from "react";
import { projects } from "@/lib/projects";
import type { FileId } from "@/hooks/useIDEState";

interface ProjectsSectionProps {
  onNavigate: (id: FileId) => void;
}

const PROJECT_COLORS: string[] = [
  "#4ec9b0", "#569cd6", "#c586c0", "#89d185",
  "#4fc1ff", "#dcdcaa", "#ce9178", "#e05a7a",
];

function projectColor(id: string): string {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return PROJECT_COLORS[seed % PROJECT_COLORS.length];
}

function TechBadge({ tech }: { tech: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "var(--vsc-fg-muted)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {tech}
    </span>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const tags  = project.tags ?? [];
  const color = projectColor(project.id);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 2) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <motion.article
        className="relative flex flex-col h-full overflow-hidden"
        style={{ background: "var(--vsc-sidebar-bg)", border: "1px solid var(--vsc-border)", borderRadius: 0 }}
        whileHover={{ y: -4, transition: { type: "spring", stiffness: 380, damping: 28 } }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${color}66`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
        }}
      >
        {/* Loading bar — fills left-to-right on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: color, transformOrigin: "left center" }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="relative p-6 flex flex-col gap-4 flex-1">

          {/* ── Tags · buttons ── */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center flex-wrap min-w-0">
              {tags.map((tag, i) => (
                <span key={tag} className="flex items-center">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color, fontFamily: "var(--font-mono)" }}
                  >
                    {tag}
                  </span>
                  {i < tags.length - 1 && (
                    <span
                      style={{
                        color,
                        opacity: 0.7,
                        fontFamily: "var(--font-mono)",
                        fontSize: "2rem",
                        lineHeight: 0,
                        verticalAlign: "middle",
                        margin: "0 8px",
                      }}
                    >
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded focus-visible:outline-none"
                  style={{
                    color: "var(--vsc-fg-muted)",
                    border: "1px solid var(--vsc-border)",
                    fontFamily: "var(--font-mono)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-fg-muted)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
                  }}
                >
                  <Github size={11} />
                  GitHub ↗
                </a>
              )}
              {project.website && (
                <motion.a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded focus-visible:outline-none"
                  style={{
                    color: "#89d185",
                    border: "1px solid rgba(137,209,133,0.4)",
                    fontFamily: "var(--font-mono)",
                    textDecoration: "none",
                    background: "rgba(137,209,133,0.08)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#89d185" }}
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  Live ↗
                </motion.a>
              )}
            </div>
          </div>

          {/* ── Title ── */}
          <div className="flex items-start gap-3">
            <motion.span
              className="text-2xl shrink-0"
              animate={hovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              aria-hidden
            >
              {project.emoji ?? "📁"}
            </motion.span>
            <h3
              className="font-bold leading-snug"
              style={{ color: "#ffffff", fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
            >
              {project.name}
            </h3>
          </div>

          {/* ── Description ── */}
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", lineHeight: 1.7 }}
          >
            {project.description}
          </p>

          {/* ── Tech stack ── */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => <TechBadge key={t} tech={t} />)}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

// Group projects by year, sorted newest first
function groupByYear(list: typeof projects) {
  const sorted = [...list].sort((a, b) => parseInt(b.year ?? "0") - parseInt(a.year ?? "0"));
  const groups: { year: string; items: typeof projects }[] = [];
  for (const p of sorted) {
    const y = p.year ?? "—";
    const last = groups[groups.length - 1];
    if (last && last.year === y) last.items.push(p);
    else groups.push({ year: y, items: [p] });
  }
  return groups;
}

export function ProjectsSection({ onNavigate: _onNavigate }: ProjectsSectionProps) {
  const groups = groupByYear(projects);
  let globalIndex = 0;

  return (
    <div className="min-h-full pb-16">
      <div className="editor-line pt-6">
        <span className="line-number">1</span>
        <span className="token-comment">// projects.ts — things I&apos;ve built</span>
      </div>
      <div className="editor-line mb-1">
        <span className="line-number">2</span>
      </div>

      <div className="px-8 lg:px-12 mt-6 space-y-0">
        {groups.map(({ year, items }) => {
          // pad to even number so grid stays balanced
          const padded = items.length % 2 !== 0 ? [...items, null] : items;
          const rows: (typeof projects[number] | null)[][] = [];
          for (let i = 0; i < padded.length; i += 2) rows.push([padded[i], padded[i + 1]]);

          return (
            <div key={year}>
              {/* ── Year divider ── */}
              <div className="flex items-center gap-4 py-5">
                <div className="h-px flex-1" style={{ background: "var(--vsc-border)" }} />
                <span
                  className="text-xs font-bold tracking-widest px-3 py-1 rounded"
                  style={{
                    color: "var(--vsc-fg-muted)",
                    border: "1px solid var(--vsc-border)",
                    fontFamily: "var(--font-mono)",
                    background: "var(--vsc-editor-bg)",
                  }}
                >
                  {year}
                </span>
                <div className="h-px flex-1" style={{ background: "var(--vsc-border)" }} />
              </div>

              {/* ── Rows of 2 ── */}
              <div className="space-y-0">
                {rows.map((row, rowIdx) => {
                  const rowStart = globalIndex;
                  globalIndex += row.filter(Boolean).length;
                  return (
                    <div key={rowIdx}>
                      {rowIdx > 0 && (
                        <div className="h-px w-full my-4" style={{ background: "var(--vsc-border)" }} />
                      )}
                      <div className="relative grid grid-cols-2 gap-0">
                        {/* Vertical center line */}
                        <div
                          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
                          style={{ background: "var(--vsc-border)" }}
                        />
                        {row.map((p, col) =>
                          p ? (
                            <div key={p.id} className={col === 0 ? "pr-5" : "pl-5"}>
                              <ProjectCard project={p} index={rowStart + col} />
                            </div>
                          ) : (
                            <div key="empty" className="pl-5" />
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
