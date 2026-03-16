"use client";

import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Circle, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { projects } from "@/lib/projects";
import type { FileId } from "@/hooks/useIDEState";

interface ProjectsSectionProps {
  onNavigate: (id: FileId) => void;
}

const STATUS_COLORS = {
  live:     "#89d185",
  wip:      "#dcdcaa",
  archived: "var(--vsc-fg-muted)",
};

const TECH_COLORS: Record<string, string> = {
  "Next.js":        "var(--vsc-fg)",
  "React":          "#61dafb",
  "TypeScript":     "#3178c6",
  "JavaScript":     "#f0d040",
  "Python":         "#4584b6",
  "Node.js":        "#89d185",
  "FastAPI":        "#4ec9b0",
  "PostgreSQL":     "#336791",
  "Redis":          "#f14c4c",
  "Docker":         "#2496ed",
  "AWS":            "#ff9900",
  "Tailwind CSS":   "#38bdf8",
  "Tailwind":       "#38bdf8",
  "Supabase":       "#3ecf8e",
  "Stripe":         "#635bff",
  "OpenAI":         "#74aa9c",
  "Pandas":         "#4ec9b0",
  "Scikit-learn":   "#f89939",
  "TensorFlow":     "#ff8f00",
  "Matplotlib":     "#11557c",
  "Jupyter":        "#f37726",
  "NLP":            "#c586c0",
  "ML5.js":         "#c586c0",
  "HTML5":          "#e44d26",
  "CSS3":           "#1572b6",
  "C":              "#a8b9cc",
  "C++":            "#00599c",
  "Meilisearch":    "#ff5caa",
  "PyWebView":      "#4584b6",
  "Starlette":      "#4ec9b0",
  "InstantSearch.js": "#003dff",
  "Fetch API":      "#dcdcaa",
  "CLI":            "#dcdcaa",
  "Automation":     "#c586c0",
  "PDF Parsing":    "#f14c4c",
  "Bilingual NLP":  "#c586c0",
  "POSIX Threads":  "#a8b9cc",
  "Mutex":          "#a8b9cc",
  "Semaphores":     "#a8b9cc",
  "Binary I/O":     "#a8b9cc",
  "File Systems":   "#a8b9cc",
  "OOP":            "#dcdcaa",
  "iTunes API":     "#fc3c44",
};

function TechBadge({ tech }: { tech: string }) {
  const color = TECH_COLORS[tech] ?? "var(--vsc-fg-muted)";
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium"
      style={{
        background: `${color}12`,
        border: `1px solid ${color}35`,
        color,
        fontFamily: "var(--font-mono)",
      }}
    >
      {tech}
    </span>
  );
}

function LiveBadge({ href }: { href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold focus-visible:outline-none"
      style={{
        background: "rgba(137,209,133,0.12)",
        border: "1px solid rgba(137,209,133,0.45)",
        color: "#89d185",
        fontFamily: "var(--font-mono)",
        textDecoration: "none",
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "#89d185" }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      LIVE ↗
    </motion.a>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.article
        className="relative rounded-xl flex flex-col overflow-hidden h-full"
        style={{
          background: "var(--vsc-sidebar-bg)",
          border: "1px solid var(--vsc-border)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(157,21,21,0.7)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(157,21,21,0.2), 0 8px 32px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
        }}
      >
        {/* Featured top accent */}
        {project.featured && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, var(--vsc-red), var(--vsc-red-light), #c586c0)" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.07 + 0.3, duration: 0.6, ease: "easeOut" }}
          />
        )}

        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(157,21,21,0.08) 0%, transparent 70%)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative p-5 flex flex-col gap-3 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <motion.span
                className="text-2xl"
                animate={hovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.4 }}
                aria-hidden
              >
                {project.emoji ?? "📁"}
              </motion.span>
              <div>
                <div
                  className="font-bold text-sm leading-tight"
                  style={{ color: "var(--vsc-yellow)", fontFamily: "var(--font-mono)" }}
                >
                  {project.name}
                </div>
                {project.year && (
                  <div className="text-[10px] mt-0.5" style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-mono)" }}>
                    {project.year}
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            {project.status && (
              <span
                className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded shrink-0"
                style={{
                  color: STATUS_COLORS[project.status],
                  background: `${STATUS_COLORS[project.status]}15`,
                  border: `1px solid ${STATUS_COLORS[project.status]}40`,
                  fontFamily: "var(--font-mono)",
                }}
              >
                <Circle size={4} fill="currentColor" />
                {project.status}
              </span>
            )}
          </div>

          {/* Category tags */}
          {project.tags && (
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
                  style={{
                    color: "var(--vsc-red-light)",
                    background: "rgba(157,21,21,0.12)",
                    border: "1px solid rgba(157,21,21,0.2)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p
            className="text-xs leading-relaxed flex-1"
            style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", lineHeight: 1.65 }}
          >
            {project.description}
          </p>

          {/* Tech stack */}
          <motion.div
            className="flex flex-wrap gap-1.5"
            animate={hovered ? { opacity: 1 } : { opacity: 0.75 }}
            transition={{ duration: 0.2 }}
          >
            {project.tech.map((t) => <TechBadge key={t} tech={t} />)}
          </motion.div>

          {/* Links footer */}
          <div
            className="flex items-center gap-3 pt-3 border-t"
            style={{ borderColor: "var(--vsc-border)" }}
          >
            {project.website && <LiveBadge href={project.website} />}

            {project.repo && (
              <motion.a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs focus-visible:outline-none ml-auto"
                style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)", textDecoration: "none" }}
                whileHover={{ color: "var(--vsc-fg)" } as never}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)")}
              >
                <Github size={12} />
                <span>Code</span>
              </motion.a>
            )}

            {!project.repo && !project.website && (
              <span className="ml-auto text-[10px] flex items-center gap-1" style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-mono)" }}>
                <Zap size={9} />
                private
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
      {/* Editor chrome */}
      <div className="editor-line pt-6">
        <span className="line-number">1</span>
        <span className="token-comment">// projects.ts — things I&apos;ve shipped</span>
      </div>
      <div className="editor-line">
        <span className="line-number">2</span>
      </div>
      <div className="editor-line">
        <span className="line-number">3</span>
        <span className="token-keyword">const </span>
        <span className="token-variable">projects</span>
        <span className="token-punct"> = [</span>
      </div>
      <div className="editor-line mb-4">
        <span className="line-number">4</span>
      </div>

      <div className="px-8 lg:px-12 space-y-10">

        {/* ── Featured ── */}
        <section>
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="h-px flex-1" style={{ background: "var(--vsc-border)" }} />
            <span
              className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded"
              style={{
                color: "var(--vsc-red-light)",
                background: "rgba(157,21,21,0.12)",
                border: "1px solid rgba(157,21,21,0.25)",
                fontFamily: "var(--font-mono)",
              }}
            >
              ⚡ Featured
            </span>
            <div className="h-px flex-1" style={{ background: "var(--vsc-border)" }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* ── All Projects ── */}
        <section>
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <div className="h-px flex-1" style={{ background: "var(--vsc-border)" }} />
            <span
              className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded"
              style={{
                color: "var(--vsc-fg-muted)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--vsc-border)",
                fontFamily: "var(--font-mono)",
              }}
            >
              All Projects
            </span>
            <div className="h-px flex-1" style={{ background: "var(--vsc-border)" }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={featured.length + i} />
            ))}
          </div>
        </section>

      </div>

      <div className="editor-line mt-8 px-2">
        <span className="line-number">{projects.length + 5}</span>
        <span className="token-punct">];</span>
      </div>
    </div>
  );
}
