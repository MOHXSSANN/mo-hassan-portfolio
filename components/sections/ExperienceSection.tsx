"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experience } from "@/lib/experience";
import type { FileId } from "@/hooks/useIDEState";

interface ExperienceSectionProps {
  onNavigate: (id: FileId) => void;
}

const TYPE_COLORS: Record<string, string> = {
  "full-time":  "var(--vsc-green)",
  "contract":   "var(--vsc-yellow)",
  "internship": "var(--vsc-cyan)",
  "freelance":  "var(--vsc-pink)",
};

const TECH_COLORS: Record<string, string> = {
  TypeScript: "var(--vsc-blue)",
  React:      "var(--vsc-cyan)",
  Python:     "var(--vsc-yellow)",
  "Next.js":  "var(--vsc-fg)",
  FastAPI:    "var(--vsc-cyan)",
  Docker:     "var(--vsc-blue)",
  AWS:        "var(--vsc-orange)",
  Supabase:   "var(--vsc-green)",
  Vercel:     "var(--vsc-fg)",
  "Node.js":  "var(--vsc-green)",
};

function LineNumber({ n }: { n: number }) {
  return <span className="line-number">{n}</span>;
}

export function ExperienceSection({ onNavigate }: ExperienceSectionProps) {
  return (
    <div className="min-h-full py-8 pb-16">
      <div className="editor-line"><LineNumber n={1} /><span className="token-comment">// experience.ts — career timeline</span></div>
      <div className="editor-line"><LineNumber n={2} /></div>
      <div className="editor-line">
        <LineNumber n={3} />
        <span className="token-keyword">interface</span>
        <span className="token-type mx-1">ExperienceEntry</span>
        <span className="token-keyword mx-1">extends</span>
        <span className="token-type">Timeline</span>
        <span className="token-punct"> &#123;&#125;</span>
      </div>
      <div className="editor-line"><LineNumber n={4} /></div>
      <div className="editor-line">
        <LineNumber n={5} />
        <span className="token-keyword">const</span>
        <span className="token-variable mx-1">experience</span>
        <span className="token-punct mx-1">:</span>
        <span className="token-type">ExperienceEntry</span>
        <span className="token-punct">[] = [</span>
      </div>
      <div className="editor-line"><LineNumber n={6} /></div>

      <div className="px-12 py-4 max-w-3xl">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[5px] top-2 bottom-2 w-[2px]"
            style={{ background: "linear-gradient(to bottom, var(--vsc-red), var(--vsc-border))" }}
          />

          <div className="space-y-8 pl-8">
            {experience.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full border-2 z-10"
                  style={{
                    background: i === 0 ? "var(--vsc-red)" : "var(--vsc-editor-bg)",
                    borderColor: i === 0 ? "var(--vsc-red-light)" : "var(--vsc-border)",
                    boxShadow: i === 0 ? "var(--shadow-red)" : "none",
                  }}
                />

                {/* Card */}
                <div
                  className="rounded-lg p-5"
                  style={{
                    background: "var(--vsc-sidebar-bg)",
                    border: "1px solid var(--vsc-border)",
                    borderLeft: i === 0 ? "2px solid var(--vsc-red)" : "1px solid var(--vsc-border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {/* TS object opening */}
                  <div className="font-mono text-xs mb-3" style={{ color: "var(--vsc-fg-dim)" }}>
                    &#123;
                  </div>

                  {/* Role and company */}
                  <div className="mb-1">
                    <span className="token-string text-xs mr-2" style={{ fontFamily: "var(--font-mono)" }}>role:</span>
                    <span
                      className="font-bold text-base"
                      style={{ color: "var(--vsc-cyan)", fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                    >
                      {entry.role}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="token-string text-xs mr-2" style={{ fontFamily: "var(--font-mono)" }}>company:</span>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "var(--vsc-red-light)", fontFamily: "var(--font-display)" }}
                    >
                      {entry.company}
                    </span>
                  </div>

                  {/* Meta: period + location + type */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      <Calendar size={11} />
                      {entry.period}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      <MapPin size={11} />
                      {entry.location}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-medium"
                      style={{
                        color: TYPE_COLORS[entry.type] ?? "var(--vsc-fg-muted)",
                        background: `${TYPE_COLORS[entry.type] ?? "var(--vsc-fg-muted)"}15`,
                        border: `1px solid ${TYPE_COLORS[entry.type] ?? "var(--vsc-fg-muted)"}40`,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {entry.type}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-xs mb-3 leading-relaxed"
                    style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)", lineHeight: 1.6 }}
                  >
                    {entry.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-3">
                    <div className="token-string text-xs mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>achievements: [</div>
                    <ul className="pl-4 space-y-1">
                      {entry.achievements.map((ach, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-1.5 text-xs"
                          style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
                        >
                          <span style={{ color: "var(--vsc-red-light)", fontFamily: "var(--font-mono)" }}>—</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="token-punct text-xs mt-1.5 pl-0" style={{ fontFamily: "var(--font-mono)" }}>],</div>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <div className="token-string text-xs mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>tech: [</div>
                    <div className="pl-4 flex flex-wrap gap-1.5">
                      {entry.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded"
                          style={{
                            color: TECH_COLORS[t] ?? "var(--vsc-fg-muted)",
                            background: `${TECH_COLORS[t] ?? "var(--vsc-fg-muted)"}15`,
                            border: `1px solid ${TECH_COLORS[t] ?? "var(--vsc-fg-muted)"}30`,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="token-punct text-xs mt-1.5 pl-0" style={{ fontFamily: "var(--font-mono)" }}>],</div>
                  </div>

                  {/* TS object closing */}
                  <div className="font-mono text-xs mt-2" style={{ color: "var(--vsc-fg-dim)" }}>
                    &#125;,
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="editor-line mt-6"><LineNumber n={experience.length + 8} /><span className="token-punct">];</span></div>
    </div>
  );
}
