"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Trophy } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { psychologyPapers, paperAuthor } from "@/lib/psychologyPapers";
import type { FileId } from "@/hooks/useIDEState";

interface AboutSectionProps {
  onNavigate: (id: FileId) => void;
}

function HighlightText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} style={{ color: "var(--vsc-red-light)", fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-bold tracking-widest uppercase mb-5 pb-2"
      style={{
        color: "var(--vsc-red-light)",
        borderBottom: "1px solid var(--vsc-border)",
        fontFamily: "var(--font-display)",
        letterSpacing: "0.14em",
        fontSize: "13px",
      }}
    >
      {children}
    </h3>
  );
}

export function AboutSection({ onNavigate: _onNavigate }: AboutSectionProps) {
  const { about, education, achievements } = siteConfig;
  const bioRef = useRef<HTMLDivElement>(null);
  const bioInView = useInView(bioRef, { once: true });

  return (
    <div className="min-h-full pb-20 px-4 sm:px-8 lg:px-16 pt-10" style={{ maxWidth: "1200px" }}>

      {/* File comment header */}
      <p
        className="text-sm mb-4"
        style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
      >
        ← about.html — Mo Hassan →
      </p>

      {/* Big heading */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-black mb-1 leading-none"
        style={{
          fontSize: "clamp(3rem, 7vw, 5rem)",
          color: "#ffffff",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
        }}
      >
        About Me
      </motion.h1>

      {/* Role tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.4 }}
        className="mb-1 font-semibold"
        style={{ color: "var(--vsc-red-light)", fontFamily: "var(--font-display)", fontSize: "1.1rem" }}
      >
        Cybersecurity / Full-Stack Developer
      </motion.p>

      {/* Subtitle comment */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.4 }}
        className="text-sm mb-10"
        style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
      >
        // who I am - what I do - where I build
      </motion.p>

      {/* Two-column layout */}
      <div className="flex flex-col xl:flex-row gap-14">

        {/* LEFT column */}
        <div className="flex-1 min-w-0 space-y-10">

          {/* Bio */}
          <motion.div
            ref={bioRef}
            initial={{ opacity: 0, y: 14 }}
            animate={bioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-lg p-6"
            style={{
              background: "var(--vsc-sidebar-bg)",
              border: "1px solid var(--vsc-border)",
              borderLeft: "3px solid var(--vsc-red-light)",
            }}
          >
            <p style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)", fontSize: "16px", lineHeight: 1.85 }}>
              <HighlightText text={about.bio} />
            </p>
          </motion.div>

          {/* Current Focus */}
          <div>
            <SectionHeader>Current Focus</SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {about.currentFocusPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
                  className="flex items-start gap-3"
                  style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)", fontSize: "15px", lineHeight: 1.6 }}
                >
                  <span style={{ color: "var(--vsc-red-light)", fontSize: "11px", marginTop: "5px", flexShrink: 0, fontFamily: "var(--font-mono)" }}>▸</span>
                  <span>{point}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Beyond Code */}
          {about.beyondCode && (
            <div>
              <SectionHeader>Beyond Code</SectionHeader>

              {/* OVR feature card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-lg mb-4 overflow-hidden"
                style={{ background: "var(--vsc-sidebar-bg)", border: "1px solid var(--vsc-border)", borderLeft: "3px solid var(--vsc-red-light)" }}
              >
                {/* Header row */}
                <div className="flex items-center gap-4 p-4">
                  <Image src="/logo.png" alt="OVR Logo" width={56} height={56} style={{ borderRadius: 8, flexShrink: 0, objectFit: "contain" }} />
                  <div>
                    <p className="font-bold" style={{ color: "#ffffff", fontFamily: "var(--font-display)", fontSize: "15px" }}>
                      Ottawa Volleyball Revival
                    </p>
                    <a
                      href="https://www.instagram.com/ovrleague"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--vsc-red-light)", fontFamily: "var(--font-mono)", fontSize: "12px", textDecoration: "none" }}
                    >
                      @ovrleague
                    </a>
                    <p className="text-sm mt-0.5" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", lineHeight: 1.5 }}>
                      Competitive volleyball league & tournaments · 150+ attendees
                    </p>
                  </div>
                </div>

                {/* Photo grid */}
                <div className="grid grid-cols-3 gap-0.5 px-0.5 pb-0.5">
                  {[
                    "/ovr/OVR-062.jpg",
                    "/ovr/OVR-068.jpg",
                    "/ovr/OVR-124.jpg",
                    "/ovr/OVR-144.jpg",
                    "/ovr/OVR-147.jpg",
                    "/ovr/OVR-245.jpg",
                  ].map((src, i) => (
                    <div key={i} className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={src}
                        alt={`OVR photo ${i + 1}`}
                        fill
                        className="object-cover"
                        style={{ transition: "transform 0.3s ease" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="space-y-3">
                {about.beyondCode.map((item, i) => {
                  const isPsych = item.title === "Psychology Enthusiast";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
                      className="rounded"
                      style={{ background: "var(--vsc-sidebar-bg)", border: "1px solid var(--vsc-border)" }}
                    >
                      <div className="flex items-start gap-3 px-4 py-3">
                        <span style={{ color: "var(--vsc-red-light)", fontSize: "11px", marginTop: "4px", flexShrink: 0, fontFamily: "var(--font-mono)" }}>▸</span>
                        <div>
                          <p className="font-semibold" style={{ color: "#ffffff", fontFamily: "var(--font-display)", fontSize: "14px" }}>{item.title}</p>
                          <p className="text-sm mt-0.5" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", lineHeight: 1.6 }}>{item.body}</p>
                        </div>
                      </div>

                      {/* Psychology papers attached to the Psychology Enthusiast card */}
                      {isPsych && (
                        <div className="px-4 pb-4 space-y-2 mt-1">
                          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}>
                            Articles & Papers
                          </p>
                          {psychologyPapers.map((paper, pi) => (
                            <div
                              key={pi}
                              className="p-3 rounded"
                              style={{ background: "var(--vsc-editor-bg)", border: "1px solid var(--vsc-border)" }}
                            >
                              <p className="font-semibold text-sm leading-snug mb-1" style={{ color: "#ffffff", fontFamily: "var(--font-display)" }}>
                                {paper.title}
                              </p>
                              <p className="text-xs mb-2" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}>
                                {paperAuthor} · {paper.year}
                              </p>
                              <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", lineHeight: 1.65 }}>
                                {paper.abstract}
                              </p>
                              <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                                <div className="flex flex-wrap gap-1.5">
                                  {paper.keywords.map((kw) => (
                                    <span
                                      key={kw}
                                      className="text-[10px] px-2 py-0.5 rounded"
                                      style={{ color: "var(--vsc-red-light)", background: "rgba(197,38,38,0.08)", border: "1px solid rgba(197,38,38,0.2)", fontFamily: "var(--font-mono)" }}
                                    >
                                      {kw}
                                    </span>
                                  ))}
                                </div>
                                <a
                                  href={paper.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] font-semibold px-3 py-1 rounded shrink-0"
                                  style={{ color: "var(--vsc-red-light)", border: "1px solid rgba(197,38,38,0.35)", fontFamily: "var(--font-mono)", textDecoration: "none", background: "rgba(197,38,38,0.06)" }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(197,38,38,0.15)"; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(197,38,38,0.06)"; }}
                                >
                                  Read Paper ↗
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT column */}
        <div className="xl:w-[360px] shrink-0 space-y-10">

          {/* Education */}
          <div>
            <SectionHeader>Education</SectionHeader>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.15, duration: 0.35, ease: "easeOut" }}
                  className="rounded-lg p-4"
                  style={{ background: "var(--vsc-sidebar-bg)", border: "1px solid var(--vsc-border)" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 rounded overflow-hidden" style={{ width: 36, height: 36, background: "#fff", border: "1px solid var(--vsc-border)", flexShrink: 0 }}>
                      {edu.logo ? (
                        <Image src={edu.logo} alt={edu.school} width={36} height={36} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(157,21,21,0.1)" }}>
                          <GraduationCap size={14} style={{ color: "var(--vsc-red-light)" }} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold" style={{ color: "#ffffff", fontFamily: "var(--font-display)", fontSize: "15px" }}>
                        {edu.school}
                      </div>
                      <div className="mt-1" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", fontSize: "13px", lineHeight: 1.5 }}>
                        {edu.degree}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-2.5">
                        <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(157,21,21,0.1)", border: "1px solid rgba(157,21,21,0.3)", color: "var(--vsc-red-light)", fontFamily: "var(--font-mono)" }}>
                          {edu.year}
                        </span>
                        {edu.gpa && (
                          <span className="text-xs" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}>
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

          {/* Achievements */}
          {achievements?.length > 0 && (
            <div>
              <SectionHeader>Achievements & Involvement</SectionHeader>
              <div className="space-y-3">
                {achievements.map((ach, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 + 0.2, duration: 0.35, ease: "easeOut" }}
                    className="flex items-start gap-3 p-4 rounded-lg"
                    style={{ background: "var(--vsc-sidebar-bg)", border: "1px solid var(--vsc-border)", borderLeft: "3px solid var(--vsc-red-light)" }}
                  >
                    <div className="shrink-0 rounded overflow-hidden" style={{ width: 36, height: 36, background: "#fff", border: "1px solid var(--vsc-border)", flexShrink: 0 }}>
                      {ach.logo ? (
                        <Image src={ach.logo} alt={ach.org} width={36} height={36} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(157,21,21,0.1)" }}>
                          <Trophy size={14} style={{ color: "var(--vsc-red-light)" }} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold" style={{ color: "#ffffff", fontFamily: "var(--font-display)", fontSize: "14px" }}>
                        {ach.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                        <span>{ach.org}</span>
                        <span style={{ color: "var(--vsc-border)" }}>·</span>
                        <span style={{ color: "var(--vsc-red-light)" }}>{ach.years}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
