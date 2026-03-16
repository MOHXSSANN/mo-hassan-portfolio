"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, ExternalLink, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { FileId } from "@/hooks/useIDEState";

interface ContactSectionProps {
  onNavigate: (id: FileId) => void;
}

type FormStatus = "idle" | "sending" | "success" | "error";

const SOCIALS = [
  {
    id: "email",
    label: "EMAIL",
    icon: Mail,
    color: "#4ec9b0",
    href: siteConfig.socials.email,
    display: siteConfig.email,
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    icon: Linkedin,
    color: "#0a66c2",
    href: siteConfig.socials.linkedin,
    display: "linkedin.com/in/mohammed-hassan-62",
  },
  {
    id: "github",
    label: "GITHUB",
    icon: Github,
    color: "#e6edf3",
    href: siteConfig.socials.github,
    display: "github.com/mohammedhassan62",
  },
];

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 mb-5"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span
        className="text-xs font-bold tracking-[0.18em] uppercase"
        style={{ color: "#4ec9b0" }}
      >
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", background: "var(--vsc-border)" }} />
    </div>
  );
}

export function ContactSection({ onNavigate: _ }: ContactSectionProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteConfig.formspreeId || siteConfig.formspreeId.startsWith("[")) {
      alert("Please set your Formspree ID in lib/siteConfig.ts");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${siteConfig.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) { setStatus("success"); setFormData({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--vsc-editor-bg)",
    border: "1px solid var(--vsc-border)",
    borderRadius: "3px",
    color: "var(--vsc-fg-muted)",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    padding: "8px 12px",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div className="min-h-full overflow-y-auto" style={{ padding: "24px 32px 48px" }}>
      {/* Top comment */}
      <div className="mb-6" style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}>
        <span style={{ color: "var(--vsc-green)" }}>/* contact.css — let&apos;s build something */</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Page heading */}
        <h1
          className="font-black mb-1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          Contact
        </h1>
        <p className="mb-8" style={{ color: "var(--vsc-green)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
          // open to work, collabs &amp; good conversations
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── LEFT: Find me on ── */}
          <div>
            <SectionHeader>Find Me On</SectionHeader>

            <div className="flex flex-col gap-2">
              {SOCIALS.map(({ id, label, icon: Icon, color, href, display }) => (
                <motion.a
                  key={id}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 relative group"
                  style={{
                    background: "var(--vsc-sidebar-bg)",
                    border: "1px solid var(--vsc-border)",
                    borderRadius: "4px",
                    padding: "12px 14px",
                    textDecoration: "none",
                  }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: `${color}18`,
                      border: `1px solid ${color}44`,
                      borderRadius: "4px",
                    }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-xs font-bold"
                      style={{ color, fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-[11px] truncate"
                      style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {display}
                    </span>
                  </div>

                  {/* External link arrow */}
                  <ExternalLink
                    size={11}
                    className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-60 transition-opacity"
                    style={{ color: "var(--vsc-fg-muted)" }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Send a message ── */}
          <div>
            <SectionHeader>Send A Message</SectionHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", marginBottom: "6px", color: "var(--vsc-green)" }}>
                  // YOUR_NAME <span style={{ color: "var(--vsc-red-light)" }}>*</span>
                </label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="string"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#4ec9b0")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--vsc-border)")}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", marginBottom: "6px", color: "var(--vsc-green)" }}>
                  // YOUR_EMAIL <span style={{ color: "var(--vsc-red-light)" }}>*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="string"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#4ec9b0")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--vsc-border)")}
                />
              </div>

              {/* Subject */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", marginBottom: "6px", color: "var(--vsc-green)" }}>
                  // SUBJECT
                </label>
                <input
                  value={formData.subject}
                  onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                  placeholder="string"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#4ec9b0")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--vsc-border)")}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", marginBottom: "6px", color: "var(--vsc-green)" }}>
                  // MESSAGE <span style={{ color: "var(--vsc-red-light)" }}>*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  placeholder="'''your message'''"
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: "none", lineHeight: "1.6" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#4ec9b0")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--vsc-border)")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  width: "100%",
                  padding: "11px",
                  background: status === "success" ? "#1a7a4a" : "#007acc",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: status === "sending" ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  opacity: status === "sending" ? 0.7 : 1,
                  transition: "background 0.15s, opacity 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (status === "sending") return;
                  (e.currentTarget as HTMLElement).style.background = status === "success" ? "#1e9057" : "#0090ee";
                }}
                onMouseLeave={(e) => {
                  if (status === "sending") return;
                  (e.currentTarget as HTMLElement).style.background = status === "success" ? "#1a7a4a" : "#007acc";
                }}
              >
                {status === "success" ? (
                  <><CheckCircle2 size={14} /> sent_successfully()</>
                ) : status === "error" ? (
                  <><AlertCircle size={14} /> try_again()</>
                ) : status === "sending" ? (
                  <>sending...</>
                ) : (
                  <><Send size={13} /> → send_message()</>
                )}
              </button>

              {/* Formspree note */}
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--vsc-fg-dim)", textAlign: "center" }}>
                // Powered by Formspree (lands directly in my inbox) :p
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
