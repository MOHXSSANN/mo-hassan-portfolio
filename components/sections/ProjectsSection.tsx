"use client";

import { motion, useInView } from "framer-motion";
import { Github } from "lucide-react";
import { useRef, useState } from "react";
import { projects } from "@/lib/projects";
import type { FileId } from "@/hooks/useIDEState";

interface ProjectsSectionProps {
  onNavigate: (id: FileId) => void;
}

// Gradient stops shared by both the top bar and the tag word colours
const GRAD_STOPS = ["#c0392b", "#e05a7a", "#c586c0", "#9b59b6"];

/** Evenly spread colours across the gradient stops, one per tag */
function tagColors(tags: string[]): string[] {
  if (tags.length === 0) return [];
  if (tags.length === 1) return [GRAD_STOPS[0]];
  return tags.map((_, i) => {
    const pos = (i / (tags.length - 1)) * (GRAD_STOPS.length - 1);
    const lo  = Math.floor(pos);
    const hi  = Math.min(lo + 1, GRAD_STOPS.length - 1);
    const t   = pos - lo;
    const f   = GRAD_STOPS[lo];
    const to  = GRAD_STOPS[hi];
    const r = Math.round(parseInt(f.slice(1,3),16)*(1-t) + parseInt(to.slice(1,3),16)*t);
    const g = Math.round(parseInt(f.slice(3,5),16)*(1-t) + parseInt(to.slice(3,5),16)*t);
    const b = Math.round(parseInt(f.slice(5,7),16)*(1-t) + parseInt(to.slice(5,7),16)*t);
    return `rgb(${r},${g},${b})`;
  });
}

function tagsGradient(colors: string[]): string {
  if (colors.length === 0) return `linear-gradient(90deg, ${GRAD_STOPS[0]}, ${GRAD_STOPS[GRAD_STOPS.length - 1]})`;
  if (colors.length === 1) return colors[0];
  return `linear-gradient(90deg, ${colors.join(", ")})`;
}

function TechBadge({ tech }: { tech: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium"
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  const tags    = project.tags ?? [];
  const colors  = tagColors(tags);
  const gradient = tagsGradient(colors);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 6) * 0.06, duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <motion.article
        className="relative rounded-lg flex flex-col h-full overflow-hidden"
        style={{ background: "var(--vsc-sidebar-bg)", border: "1px solid var(--vsc-border)" }}
        whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 28 } }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(192,57,43,0.55)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.35)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Top gradient line — same colours as the tag words */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: gradient }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: (index % 6) * 0.06 + 0.2, duration: 0.55, ease: "easeOut" }}
        />

        {/* Subtle hover glow tinted to first tag colour */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${colors[0] ?? "#c0392b"}18 0%, transparent 65%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        <div className="relative p-4 flex flex-col gap-3 flex-1">

          {/* ── Row 1: tag words · separated (left) + buttons (right) ── */}
          <div className="flex items-center justify-between gap-2">
            {/* Plain coloured words with · dots — no pill backgrounds */}
            <div className="flex items-center flex-wrap min-w-0">
              {tags.map((tag, i) => (
                <span key={tag} className="flex items-center">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: colors[i], fontFamily: "var(--font-mono)" }}
                  >
                    {tag}
                  </span>
                  {i < tags.length - 1 && (
                    <span
                      className="mx-1.5 text-[10px]"
                      style={{ color: colors[i], opacity: 0.45, fontFamily: "var(--font-mono)" }}
                    >
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* GitHub + Live buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded focus-visible:outline-none"
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
                  <Github size={10} />
                  GitHub ↗
                </a>
              )}
              {project.website && (
                <motion.a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded focus-visible:outline-none"
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
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  Live ↗
                </motion.a>
              )}
            </div>
          </div>

          {/* ── Title + emoji ── */}
          <div className="flex items-start gap-2.5">
            <motion.span
              className="text-xl shrink-0 mt-0.5"
              animate={hovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              aria-hidden
            >
              {project.emoji ?? "📁"}
            </motion.span>
            <h3
              className="font-bold text-sm leading-snug"
              style={{ color: "#ffffff", fontFamily: "var(--font-display)" }}
            >
              {project.name}
              {project.year && (
                <span className="ml-2 text-[10px] font-normal" style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-mono)" }}>
                  {project.year}
                </span>
              )}
            </h3>
          </div>

          {/* ── Description ── */}
          <p
            className="text-xs leading-relaxed flex-1"
            style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", lineHeight: 1.65 }}
          >
            {project.description}
          </p>

          {/* ── Tech stack ── */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => <TechBadge key={t} tech={t} />)}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function ProjectsSection({ onNavigate: _onNavigate }: ProjectsSectionProps) {
  return (
    <div className="min-h-full pb-16">
      <div className="editor-line pt-6">
        <span className="line-number">1</span>
        <span className="token-comment">// projects.ts — things I&apos;ve shipped</span>
      </div>
      <div className="editor-line mb-1">
        <span className="line-number">2</span>
      </div>

      <div className="px-8 lg:px-12 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
