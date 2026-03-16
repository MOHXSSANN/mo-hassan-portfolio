"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { skillCategories } from "@/lib/skills";
import type { FileId } from "@/hooks/useIDEState";

interface ReadmeSectionProps {
  onNavigate: (id: FileId) => void;
}

const TECH_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Python:           { bg: "#3572a5", text: "#fff" },
  TypeScript:       { bg: "#3178c6", text: "#fff" },
  JavaScript:       { bg: "#f0d040", text: "#111" },
  "Next.js":        { bg: "#ffffff", text: "#111" },
  "React.js":       { bg: "#61dafb", text: "#111" },
  "Tailwind CSS":   { bg: "#38bdf8", text: "#111" },
  Meilisearch:      { bg: "#ff5caa", text: "#fff" },
  "Node.js":        { bg: "#6da55f", text: "#fff" },
  Docker:           { bg: "#2496ed", text: "#fff" },
  Linux:            { bg: "#fcc624", text: "#111" },
  "Git / GitHub":   { bg: "#f34f29", text: "#fff" },
  "REST APIs":      { bg: "#6ead3a", text: "#fff" },
  "SQL / MySQL":    { bg: "#4479a1", text: "#fff" },
  "C / C++":        { bg: "#659ad2", text: "#fff" },
  JIRA:             { bg: "#0052cc", text: "#fff" },
  PyWebView:        { bg: "#c586c0", text: "#fff" },
  Starlette:        { bg: "#4ec9b0", text: "#111" },
};

function TechPill({ name }: { name: string }) {
  const colors = TECH_BADGE_COLORS[name] ?? { bg: "rgba(255,255,255,0.08)", text: "var(--vsc-fg-muted)" };
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: colors.bg, color: colors.text, fontFamily: "var(--font-mono)" }}
    >
      {name}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-black mb-5"
      style={{ color: "#ffffff", fontFamily: "var(--font-display)", fontSize: "1.9rem", letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  );
}

export function ReadmeSection({ onNavigate: _onNavigate }: ReadmeSectionProps) {
  const topTech = ["Python", "TypeScript", "Next.js", "Meilisearch", "Docker", "Starlette"];

  return (
    <div className="min-h-full pb-16">
      <div className="px-4 sm:px-8 lg:px-16 pt-10 max-w-3xl space-y-12">

        {/* ── Name + tagline + badges ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-black leading-none mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Mo Hassan
          </h1>

          <p className="mb-5 text-base" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}>
            Junior Developer @ CBSA &nbsp;·&nbsp; Ottawa, Ontario
          </p>

          <div className="flex flex-wrap gap-2">
            {topTech.map((t) => <TechPill key={t} name={t} />)}
          </div>
        </motion.div>

        {/* ── About ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4, ease: "easeOut" }}
        >
          <SectionHeading>About</SectionHeading>
          <p
            className="mb-5 leading-relaxed"
            style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)", fontSize: "15px", lineHeight: 1.8 }}
          >
            Hi, Mo on this side! Third-year Computer Science student at Carleton University specializing in Cybersecurity.
            I work as a Junior Developer at CBSA building Radiance Vault, a secure document search and classification platform.
            Outside of code I run Ottawa Volleyball Revival, hosting tournaments with 150+ attendees.
            I care deeply about psychology, human behavior, and building things that actually matter.
          </p>
          <ul className="space-y-2">
            {[
              { text: "Building Radiance Vault at CBSA: secure document search & classification" },
              { text: "Deep interest in AI/ML integration into production systems" },
              { text: "Founder of OVR (@ovrleague): volleyball league & tournaments" },
              { text: "Talk to me about Python, TypeScript, full-stack dev, or security" },
              { text: "Always learning, always growing" },
            ].map(({ text }, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)", fontSize: "14px" }}>
                <span style={{ color: "var(--vsc-red-light)", fontFamily: "var(--font-mono)", fontSize: "11px", marginTop: "3px", flexShrink: 0 }}>▸</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.4, ease: "easeOut" }}
        >
          <SectionHeading>Stack</SectionHeading>
          <div className="space-y-3">
            {[
              { label: "Languages",  skills: ["Python", "TypeScript", "JavaScript", "C / C++", "SQL / MySQL"] },
              { label: "Frontend",   skills: ["Next.js", "React.js", "Tailwind CSS"] },
              { label: "Backend",    skills: ["Node.js", "Starlette", "REST APIs", "Meilisearch", "PyWebView"] },
              { label: "DevOps",     skills: ["Docker", "Linux", "Git / GitHub", "JIRA"] },
            ].map(({ label, skills }) => (
              <div key={label} className="flex items-start gap-4">
                <span
                  className="shrink-0 text-sm font-semibold w-24"
                  style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", paddingTop: "2px" }}
                >
                  {label}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => <TechPill key={s} name={s} />)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Connect ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        >
          <SectionHeading>Connect</SectionHeading>
          <div className="flex flex-wrap gap-5">
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
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-red-light)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)")}
              >
                <Icon size={15} />
                {label}
                <ExternalLink size={11} style={{ opacity: 0.5 }} />
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
