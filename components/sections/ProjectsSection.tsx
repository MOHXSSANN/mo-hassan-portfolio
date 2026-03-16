"use client";

import { motion, useInView } from "framer-motion";
import { Github } from "lucide-react";
import { useRef, useState } from "react";
import { projects } from "@/lib/projects";
import type { FileId } from "@/hooks/useIDEState";

interface ProjectsSectionProps {
  onNavigate: (id: FileId) => void;
}

const TECH_COLORS: Record<string, string> = {
  "Next.js":          "#ffffff",
  "React":            "#61dafb",
  "TypeScript":       "#3178c6",
  "JavaScript":       "#f0d040",
  "Python":           "#4584b6",
  "Node.js":          "#89d185",
  "FastAPI":          "#4ec9b0",
  "PostgreSQL":       "#336791",
  "Redis":            "#f14c4c",
  "Docker":           "#2496ed",
  "AWS":              "#ff9900",
  "Tailwind CSS":     "#38bdf8",
  "Tailwind":         "#38bdf8",
  "Supabase":         "#3ecf8e",
  "Stripe":           "#635bff",
  "Pandas":           "#4ec9b0",
  "Scikit-learn":     "#f89939",
  "TensorFlow":       "#ff8f00",
  "Jupyter":          "#f37726",
  "NLP":              "#c586c0",
  "ML5.js":           "#c586c0",
  "HTML5":            "#e44d26",
  "CSS3":             "#1572b6",
  "C":                "#a8b9cc",
  "C++":              "#00599c",
  "Meilisearch":      "#ff5caa",
  "PyWebView":        "#4584b6",
  "Starlette":        "#4ec9b0",
  "InstantSearch.js": "#003dff",
  "Automation":       "#c586c0",
  "PDF Parsing":      "#f14c4c",
  "Bilingual NLP":    "#c586c0",
  "POSIX Threads":    "#a8b9cc",
  "iTunes API":       "#fc3c44",
  "Fetch API":        "#dcdcaa",
  "CLI":              "#dcdcaa",
  "OOP":              "#dcdcaa",
  "Binary I/O":       "#a8b9cc",
  "File Systems":     "#a8b9cc",
  "Mutex":            "#a8b9cc",
  "Semaphores":       "#a8b9cc",
  "Matplotlib":       "#11557c",
};

// Each tag category gets a distinct colour
const TAG_PALETTE: string[] = [
  "#4ec9b0", "#c586c0", "#569cd6", "#dcdcaa",
  "#89d185", "#ce9178", "#9cdcfe", "#f14c4c",
];

function tagColor(tag: string, idx: number) {
  // Deterministic colour per tag text
  const seed = tag.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return TAG_PALETTE[(seed + idx) % TAG_PALETTE.length];
}

function TechBadge({ tech }: { tech: string }) {
  const color = TECH_COLORS[tech] ?? "#858585";
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}35`,
        color,
        fontFamily: "var(--font-mono)",
      }}
    >
      {tech}
    </span>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

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
        style={{
          background: "var(--vsc-sidebar-bg)",
          border: "1px solid var(--vsc-border)",
        }}
        whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 28 } }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(157,21,21,0.6)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(157,21,21,0.15), 0 8px 28px rgba(0,0,0,0.35)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Featured top bar */}
        {project.featured && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, var(--vsc-red), #c586c0)" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: (index % 6) * 0.06 + 0.25, duration: 0.55, ease: "easeOut" }}
          />
        )}

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(157,21,21,0.07) 0%, transparent 65%)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        <div className="relative p-4 flex flex-col gap-3 flex-1">

          {/* ── Tags row (category + LIVE) ── */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags?.map((tag, i) => {
              const c = tagColor(tag, i);
              return (
                <span
                  key={tag}
                  className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                  style={{
                    color: c,
                    background: `${c}18`,
                    border: `1px solid ${c}40`,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tag}
                </span>
              );
            })}

            {/* LIVE tag */}
            {project.website && (
              <motion.a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded focus-visible:outline-none"
                style={{
                  color: "#89d185",
                  background: "rgba(137,209,133,0.14)",
                  border: "1px solid rgba(137,209,133,0.45)",
                  fontFamily: "var(--font-mono)",
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#89d185" }}
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
                LIVE
              </motion.a>
            )}
          </div>

          {/* ── Title + emoji ── */}
          <div className="flex items-center gap-2">
            <motion.span
              className="text-lg shrink-0"
              animate={hovered ? { scale: 1.25, rotate: [0, -12, 12, 0] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              aria-hidden
            >
              {project.emoji ?? "📁"}
            </motion.span>
            <div>
              <h3
                className="font-bold text-sm leading-snug"
                style={{ color: "#ffffff", fontFamily: "var(--font-display)" }}
              >
                {project.name}
              </h3>
              {project.year && (
                <p className="text-[10px]" style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-mono)" }}>
                  {project.year}
                </p>
              )}
            </div>
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

          {/* ── Footer ── */}
          <div className="flex items-center gap-3 pt-2.5 border-t" style={{ borderColor: "var(--vsc-border)" }}>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] transition-colors focus-visible:outline-none"
                style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)")}
              >
                <Github size={12} />
                Code
              </a>
            )}
            {!project.repo && (
              <span className="text-[10px]" style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-mono)" }}>
                private repo
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function ProjectsSection({ onNavigate: _onNavigate }: ProjectsSectionProps) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-full pb-16">
      <div className="editor-line pt-6">
        <span className="line-number">1</span>
        <span className="token-comment">// projects.ts — things I&apos;ve shipped</span>
      </div>
      <div className="editor-line mb-1">
        <span className="line-number">2</span>
      </div>

      <div className="px-8 lg:px-12 space-y-10 mt-4">

        {/* ── Featured ── */}
        <section>
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "var(--vsc-red-light)", fontFamily: "var(--font-mono)" }}
            >
              ⚡ Featured
            </span>
            <div className="h-px flex-1" style={{ background: "var(--vsc-border)" }} />
            <span className="text-[10px]" style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-mono)" }}>
              {featured.length} projects
            </span>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </section>

        {/* ── All Projects ── */}
        <section>
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
            >
              All Projects
            </span>
            <div className="h-px flex-1" style={{ background: "var(--vsc-border)" }} />
            <span className="text-[10px]" style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-mono)" }}>
              {rest.length} projects
            </span>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((p, i) => <ProjectCard key={p.id} project={p} index={featured.length + i} />)}
          </div>
        </section>

      </div>
    </div>
  );
}
