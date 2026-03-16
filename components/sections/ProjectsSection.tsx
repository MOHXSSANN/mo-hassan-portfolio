"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Circle } from "lucide-react";
import { projects } from "@/lib/projects";
import type { FileId } from "@/hooks/useIDEState";

interface ProjectsSectionProps {
  onNavigate: (id: FileId) => void;
}

const STATUS_COLORS = {
  live:     "var(--vsc-green)",
  wip:      "var(--vsc-yellow)",
  archived: "var(--vsc-fg-muted)",
};

const TECH_COLORS: Record<string, string> = {
  "Next.js":      "var(--vsc-fg)",
  "React":        "var(--vsc-cyan)",
  "TypeScript":   "var(--vsc-blue)",
  "JavaScript":   "var(--vsc-yellow)",
  "Python":       "var(--vsc-blue)",
  "Node.js":      "var(--vsc-green)",
  "FastAPI":      "var(--vsc-cyan)",
  "PostgreSQL":   "var(--vsc-blue)",
  "Redis":        "var(--vsc-red-light)",
  "Docker":       "var(--vsc-blue)",
  "AWS":          "var(--vsc-orange)",
  "Tailwind CSS": "var(--vsc-cyan)",
  "Tailwind":     "var(--vsc-cyan)",
  "Supabase":     "var(--vsc-green)",
  "Stripe":       "var(--vsc-pink)",
  "OpenAI":       "var(--vsc-number)",
  "D3.js":        "var(--vsc-orange)",
  "Pandas":       "var(--vsc-cyan)",
  "MongoDB":      "var(--vsc-green)",
  "GraphQL":      "var(--vsc-pink)",
  "Vercel":       "var(--vsc-fg)",
  "CLI":          "var(--vsc-yellow)",
};

function TechBadge({ tech }: { tech: string }) {
  const color = TECH_COLORS[tech] ?? "var(--vsc-fg-muted)";
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${color}33`,
        color,
        fontFamily: "var(--font-mono)",
      }}
    >
      {tech}
    </span>
  );
}

function LineNumber({ n }: { n: number }) {
  return <span className="line-number">{n}</span>;
}

export function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  return (
    <div className="min-h-full py-8 pb-16">
      <div className="editor-line"><LineNumber n={1} /><span className="token-comment">// projects.js — things I&apos;ve shipped</span></div>
      <div className="editor-line"><LineNumber n={2} /></div>
      <div className="editor-line">
        <LineNumber n={3} />
        <span className="token-keyword">const</span>
        <span className="token-variable mx-1">projects</span>
        <span className="token-punct mx-1">=</span>
        <span className="token-punct">[</span>
      </div>
      <div className="editor-line"><LineNumber n={4} /></div>

      <div className="px-12 py-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.3 }}
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="relative rounded-lg flex flex-col overflow-hidden cursor-default"
              style={{
                background: "var(--vsc-sidebar-bg)",
                border: "1px solid var(--vsc-border)",
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "var(--shadow-md), 0 0 0 1px var(--vsc-border)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-red)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
              }}
            >
              {/* Top accent line */}
              {project.featured && (
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, var(--vsc-red), var(--vsc-red-light))" }}
                />
              )}

              <div className="p-4 flex flex-col gap-3 flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden>{project.emoji ?? "📁"}</span>
                    <div>
                      <div
                        className="font-semibold text-sm leading-tight"
                        style={{ color: "var(--vsc-yellow)", fontFamily: "var(--font-mono)" }}
                      >
                        {project.name}
                      </div>
                      {project.year && (
                        <div
                          className="text-[10px] mt-0.5"
                          style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-mono)" }}
                        >
                          {project.year}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Status dot */}
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

                {/* Tags */}
                {project.tags && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
                        style={{
                          color: "var(--vsc-red-light)",
                          background: "var(--vsc-active-bg)",
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
                  style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", lineHeight: 1.6 }}
                >
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => <TechBadge key={t} tech={t} />)}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-1 border-t" style={{ borderColor: "var(--vsc-border)" }}>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs transition-colors focus-visible:outline-none"
                      style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)")}
                    >
                      <Github size={12} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs transition-colors focus-visible:outline-none"
                      style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-red-light)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)")}
                    >
                      <ExternalLink size={12} />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="editor-line mt-4"><LineNumber n={projects.length + 5} /><span className="token-punct">];</span></div>
    </div>
  );
}
