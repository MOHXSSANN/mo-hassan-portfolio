"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/siteConfig";
import { skillCategories } from "@/lib/skills";
import type { FileId } from "@/hooks/useIDEState";

interface ReadmeSectionProps {
  onNavigate: (id: FileId) => void;
}

function LineNumber({ n }: { n: number }) {
  return <span className="line-number">{n}</span>;
}

function ShieldBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded overflow-hidden text-[10px] font-bold select-none"
      style={{ fontFamily: "var(--font-mono)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <span className="px-2 py-0.5" style={{ background: "#555", color: "#fff" }}>{label}</span>
      <span className="px-2 py-0.5" style={{ background: color, color: "#fff" }}>{value}</span>
    </span>
  );
}

export function ReadmeSection({ onNavigate }: ReadmeSectionProps) {
  return (
    <div className="min-h-full py-8 pb-16">
      <div className="editor-line"><LineNumber n={1} /><span className="token-comment">&lt;!-- README.md — the repo behind the person --&gt;</span></div>
      <div className="editor-line"><LineNumber n={2} /></div>

      <div className="px-12 py-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* H1 */}
          <div>
            <div className="editor-line mb-3"><LineNumber n={3} /><span className="token-brand text-base font-bold" style={{ fontFamily: "var(--font-mono)" }}># Mo Hassan</span></div>
            <h1
              className="font-black mt-2 mb-1"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Mo Hassan
            </h1>
            <p
              className="text-sm mb-5"
              style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
            >
              {siteConfig.roles[0]?.label} · {siteConfig.location}
            </p>

            {/* Badge row */}
            <div className="flex flex-wrap gap-2">
              <ShieldBadge label="status" value={siteConfig.availableForWork ? "available" : "unavailable"} color={siteConfig.availableForWork ? "#6a9955" : "#858585"} />
              <ShieldBadge label="focus" value="building" color="var(--vsc-red)" />
              <ShieldBadge label="location" value={siteConfig.location} color="#569cd6" />
              <ShieldBadge label="license" value="open source" color="#c586c0" />
            </div>
          </div>

          <Separator style={{ background: "var(--vsc-border)" }} />

          {/* About section */}
          <div>
            <div className="editor-line mb-3"><LineNumber n={10} /><span className="token-brand font-bold" style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>## About</span></div>
            <div className="space-y-2">
              {siteConfig.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)", lineHeight: 1.7 }}
                >
                  {p}
                </p>
              ))}
            </div>

            <ul className="mt-4 space-y-1.5">
              {siteConfig.about.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)" }}>
                  <span style={{ color: "var(--vsc-red-light)" }}>🔺</span>
                  <span>{h}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm" style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)" }}>
                <span>⚡</span>
                <span>Always learning, always shipping</span>
              </li>
            </ul>
          </div>

          <Separator style={{ background: "var(--vsc-border)" }} />

          {/* Tech stack */}
          <div>
            <div className="editor-line mb-4"><LineNumber n={20} /><span className="token-brand font-bold" style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>## Tech Stack</span></div>
            <div className="space-y-3">
              {skillCategories.slice(0, 4).map((cat) => (
                <div key={cat.key} className="flex items-start gap-3">
                  <span
                    className="text-xs shrink-0 w-28"
                    style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {cat.name}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.slice(0, 5).map((s) => (
                      <span
                        key={s.name}
                        className="text-[10px] px-2 py-0.5 rounded font-medium"
                        style={{
                          background: "var(--vsc-sidebar-bg)",
                          border: `1px solid ${cat.color}40`,
                          color: cat.color,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator style={{ background: "var(--vsc-border)" }} />

          {/* GitHub Stats — decorative cards */}
          <div>
            <div className="editor-line mb-4"><LineNumber n={30} /><span className="token-brand font-bold" style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>## Stats</span></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(siteConfig.stats).map(([key, val]) => (
                <div
                  key={key}
                  className="rounded-lg p-3 text-center"
                  style={{
                    background: "var(--vsc-sidebar-bg)",
                    border: "1px solid var(--vsc-border)",
                  }}
                >
                  <div
                    className="text-xl font-black"
                    style={{ color: "var(--vsc-red-light)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                  >
                    {val}
                  </div>
                  <div
                    className="text-[9px] uppercase tracking-widest mt-0.5"
                    style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator style={{ background: "var(--vsc-border)" }} />

          {/* Connect */}
          <div>
            <div className="editor-line mb-4"><LineNumber n={40} /><span className="token-brand font-bold" style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>## Connect</span></div>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Github,   label: "GitHub",   href: siteConfig.socials.github },
                { icon: Linkedin, label: "LinkedIn",  href: siteConfig.socials.linkedin },
                { icon: Mail,     label: "Email",     href: siteConfig.socials.email },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm transition-colors focus-visible:outline-none"
                  style={{ color: "var(--vsc-blue)", fontFamily: "var(--font-mono)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-red-light)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-blue)")}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>

          <Separator style={{ background: "var(--vsc-border)" }} />

          {/* Footer */}
          <div className="editor-line">
            <LineNumber n={50} />
            <span className="token-comment">// Made with curiosity in VS Code · Always shipping</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
