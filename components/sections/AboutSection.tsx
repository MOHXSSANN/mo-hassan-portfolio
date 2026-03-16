"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Trophy, MapPin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { FileId } from "@/hooks/useIDEState";

interface AboutSectionProps {
  onNavigate: (id: FileId) => void;
}

// Parse **bold** highlights into crimson spans
function HighlightText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} style={{ color: "#c0392b", fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function FocusItem({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
      className="flex items-start gap-3"
      style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)", fontSize: "15px", lineHeight: 1.6 }}
    >
      <span
        style={{
          color: "#9d1515",
          fontSize: "11px",
          marginTop: "5px",
          flexShrink: 0,
          fontFamily: "var(--font-mono)",
        }}
      >
        ▸
      </span>
      <span>{text}</span>
    </motion.div>
  );
}

function AchievementCard({
  title,
  org,
  years,
  index,
}: {
  title: string;
  org: string;
  years: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
      className="flex items-start gap-3 p-4 rounded-lg"
      style={{
        background: "var(--vsc-sidebar-bg)",
        border: "1px solid var(--vsc-border)",
        borderLeft: "3px solid #9d1515",
      }}
    >
      <div
        className="shrink-0 mt-0.5 rounded p-1.5"
        style={{
          background: "rgba(157,21,21,0.1)",
          border: "1px solid rgba(157,21,21,0.25)",
        }}
      >
        <Trophy size={14} style={{ color: "#c0392b" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="font-semibold"
          style={{ color: "#ffffff", fontFamily: "var(--font-display)", fontSize: "14px" }}
        >
          {title}
        </div>
        <div
          className="flex items-center gap-2 mt-1"
          style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)", fontSize: "12px" }}
        >
          <span>{org}</span>
          <span style={{ color: "var(--vsc-border)" }}>·</span>
          <span style={{ color: "#9d1515" }}>{years}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection({ onNavigate: _onNavigate }: AboutSectionProps) {
  const { about, education, name, email, location, achievements } = siteConfig;

  return (
    <div className="min-h-full py-10 pb-20 px-12" style={{ maxWidth: "1400px" }}>
      {/* Comment header */}
      <p
        className="text-sm mb-5"
        style={{ color: "var(--vsc-comment)", fontFamily: "var(--font-mono)", fontStyle: "italic" }}
      >
        {`<!-- about.html — the human behind the code -->`}
      </p>

      {/* Big heading */}
      <h1
        className="font-black mb-3 leading-none"
        style={{
          fontSize: "clamp(48px, 8vw, 72px)",
          color: "var(--vsc-fg)",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.02em",
        }}
      >
        About Me
      </h1>

      {/* HTML-style subtitle */}
      <p className="text-sm mb-10" style={{ fontFamily: "var(--font-mono)" }}>
        <span style={{ color: "var(--vsc-blue)" }}>&lt;</span>
        <span style={{ color: "#c0392b)" }}>section</span>
        <span style={{ color: "var(--vsc-blue)" }}>&gt;</span>
        <span style={{ color: "var(--vsc-fg-muted)", marginLeft: "8px" }}>// who I am · what I do · where I build</span>
      </p>

      {/* Two-column layout */}
      <div className="flex flex-col xl:flex-row gap-12">

        {/* LEFT column */}
        <div className="flex-1 min-w-0 space-y-10">

          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.45, ease: "easeOut" }}
            className="rounded-lg p-6"
            style={{
              background: "var(--vsc-sidebar-bg)",
              border: "1px solid var(--vsc-border)",
              borderLeft: "4px solid #9d1515",
            }}
          >
            <p
              style={{
                color: "var(--vsc-fg)",
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                lineHeight: 1.8,
              }}
            >
              <HighlightText text={about.bio} />
            </p>

            {/* Contact line */}
            <div className="flex flex-wrap items-center gap-5 mt-5 pt-4" style={{ borderTop: "1px solid var(--vsc-border)" }}>
              <span className="flex items-center gap-1.5" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                <MapPin size={12} style={{ color: "#9d1515" }} />
                {location}
              </span>
              <span className="flex items-center gap-1.5" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                <Mail size={12} style={{ color: "#9d1515" }} />
                {email}
              </span>
            </div>
          </motion.div>

          {/* Current Focus */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-5 pb-2"
              style={{
                color: "var(--vsc-fg-muted)",
                borderBottom: "1px solid var(--vsc-border)",
                fontFamily: "var(--font-display)",
                letterSpacing: "0.16em",
                fontSize: "13px",
              }}
            >
              Current Focus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {about.currentFocusPoints.map((point, i) => (
                <FocusItem key={i} text={point} index={i} />
              ))}
            </div>
          </div>

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <div>
              <h3
                className="text-xs font-bold tracking-widest uppercase mb-5 pb-2"
                style={{
                  color: "var(--vsc-fg-muted)",
                  borderBottom: "1px solid var(--vsc-border)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.16em",
                  fontSize: "13px",
                }}
              >
                Achievements & Involvement
              </h3>
              <div className="space-y-3">
                {achievements.map((ach, i) => (
                  <AchievementCard
                    key={i}
                    title={ach.title}
                    org={ach.org}
                    years={ach.years}
                    index={i}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT column — Education + highlights */}
        <div className="xl:w-[380px] shrink-0 space-y-8">

          {/* Education */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-5 pb-2"
              style={{
                color: "var(--vsc-fg-muted)",
                borderBottom: "1px solid var(--vsc-border)",
                fontFamily: "var(--font-display)",
                letterSpacing: "0.16em",
                fontSize: "13px",
              }}
            >
              Education
            </h3>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.35, ease: "easeOut" }}
                  className="rounded-lg p-4"
                  style={{
                    background: "var(--vsc-sidebar-bg)",
                    border: "1px solid var(--vsc-border)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="shrink-0 mt-0.5 rounded p-1.5"
                      style={{
                        background: "rgba(157,21,21,0.1)",
                        border: "1px solid rgba(157,21,21,0.25)",
                      }}
                    >
                      <GraduationCap size={14} style={{ color: "#c0392b" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-semibold"
                        style={{ color: "#ffffff", fontFamily: "var(--font-display)", fontSize: "14px" }}
                      >
                        {edu.school}
                      </div>
                      <div
                        className="mt-1"
                        style={{
                          color: "var(--vsc-fg-muted)",
                          fontFamily: "var(--font-display)",
                          fontSize: "13px",
                          lineHeight: 1.5,
                        }}
                      >
                        {edu.degree}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-2.5">
                        <span
                          className="px-2 py-0.5 rounded text-[11px]"
                          style={{
                            background: "rgba(157,21,21,0.1)",
                            border: "1px solid rgba(157,21,21,0.3)",
                            color: "#c0392b",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {edu.year}
                        </span>
                        {edu.gpa && (
                          <span
                            className="text-[11px]"
                            style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
                          >
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Highlights / quick facts */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-5 pb-2"
              style={{
                color: "var(--vsc-fg-muted)",
                borderBottom: "1px solid var(--vsc-border)",
                fontFamily: "var(--font-display)",
                letterSpacing: "0.16em",
                fontSize: "13px",
              }}
            >
              Quick Facts
            </h3>
            <div className="space-y-2">
              {about.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.15, duration: 0.3, ease: "easeOut" }}
                  className="flex items-start gap-2.5 py-2 px-3 rounded"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--vsc-border)",
                    fontFamily: "var(--font-display)",
                    fontSize: "13px",
                    color: "var(--vsc-fg)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#9d1515", fontSize: "10px", marginTop: "4px", flexShrink: 0 }}>◆</span>
                  {h}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing tag */}
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}>
            <span style={{ color: "var(--vsc-blue)" }}>&lt;/</span>
            <span style={{ color: "var(--vsc-fg-muted)" }}>section</span>
            <span style={{ color: "var(--vsc-blue)" }}>&gt;</span>
          </p>
        </div>
      </div>
    </div>
  );
}
