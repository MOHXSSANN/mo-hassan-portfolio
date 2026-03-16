"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Command, Download, Maximize, Sparkles, Check } from "lucide-react";
import { THEMES, type ThemeId } from "@/hooks/useTheme";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  themeId: ThemeId;
  onThemeChange: (id: ThemeId) => void;
  onOpenPalette: () => void;
  onToggleFullscreen: () => void;
  onToggleTerminal: () => void;
}

const SHORTCUTS = [
  { keys: ["Ctrl", "P"], label: "Go to file (command palette)" },
  { keys: ["Ctrl", "B"], label: "Toggle sidebar" },
  { keys: ["Ctrl", "`"], label: "Toggle terminal" },
  { keys: ["F11"],       label: "Toggle fullscreen" },
  { keys: ["Esc"],       label: "Close overlay" },
];

export function SettingsPanel({
  isOpen,
  onClose,
  themeId,
  onThemeChange,
  onOpenPalette,
  onToggleFullscreen,
  onToggleTerminal,
}: SettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => document.addEventListener("mousedown", handler), 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, x: -8, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -8, scale: 0.97 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-50 overflow-y-auto"
          style={{
            left: "56px",
            bottom: "22px",
            width: "280px",
            maxHeight: "calc(100dvh - 64px)",
            background: "var(--vsc-sidebar-bg)",
            border: "1px solid var(--vsc-border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            borderRadius: "6px",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-2.5 border-b text-[10px] font-bold tracking-widest uppercase"
            style={{
              borderColor: "var(--vsc-border)",
              color: "var(--vsc-fg-muted)",
              fontFamily: "var(--font-display)",
            }}
          >
            Settings
          </div>

          {/* COLOR THEME */}
          <div className="px-4 pt-3 pb-1">
            <p
              className="text-[10px] font-bold tracking-widest uppercase mb-2"
              style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
            >
              Color Theme
            </p>
            <div className="flex flex-col gap-0.5">
              {THEMES.map((theme) => {
                const active = themeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => { onThemeChange(theme.id); }}
                    className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded text-left transition-colors focus-visible:outline-none"
                    style={{
                      background: active ? "var(--vsc-active-bg)" : "transparent",
                      color: active ? "var(--vsc-fg)" : "var(--vsc-fg-muted)",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = "var(--vsc-hover-bg)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {/* Color dot */}
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: theme.dot, boxShadow: active ? `0 0 6px ${theme.dot}88` : "none" }}
                    />
                    {/* Emoji */}
                    <span className="text-sm leading-none">{theme.emoji}</span>
                    {/* Name */}
                    <span
                      className="text-xs flex-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {theme.name}
                    </span>
                    {/* Checkmark */}
                    {active && (
                      <Check size={12} style={{ color: "var(--vsc-red-light)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mx-4 my-2" style={{ height: "1px", background: "var(--vsc-border)" }} />

          {/* QUICK ACTIONS */}
          <div className="px-4 pb-1">
            <p
              className="text-[10px] font-bold tracking-widest uppercase mb-2"
              style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
            >
              Quick Actions
            </p>
            <div className="flex flex-col gap-0.5">
              {[
                {
                  icon: Command,
                  label: "Command Palette",
                  shortcut: "Ctrl+P",
                  onClick: () => { onClose(); onOpenPalette(); },
                },
                {
                  icon: Terminal,
                  label: "Toggle Terminal",
                  shortcut: "Ctrl+`",
                  onClick: () => { onToggleTerminal(); onClose(); },
                },
                {
                  icon: Sparkles,
                  label: "Copilot Chat",
                  shortcut: null,
                  onClick: onClose,
                },
                {
                  icon: Download,
                  label: "Download Resume",
                  shortcut: null,
                  onClick: () => {
                    const link = document.createElement("a");
                    link.href = "/resume.pdf";
                    link.download = "Mo_Hassan_Resume.pdf";
                    link.click();
                    onClose();
                  },
                },
                {
                  icon: Maximize,
                  label: "Toggle Fullscreen",
                  shortcut: "F11",
                  onClick: () => { onToggleFullscreen(); onClose(); },
                },
              ].map(({ icon: Icon, label, shortcut, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded text-left transition-colors focus-visible:outline-none"
                  style={{ color: "var(--vsc-fg-muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--vsc-hover-bg)";
                    (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)";
                  }}
                >
                  <Icon size={14} strokeWidth={1.5} className="shrink-0" />
                  <span className="text-xs flex-1" style={{ fontFamily: "var(--font-display)" }}>
                    {label}
                  </span>
                  {shortcut && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {shortcut}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-4 my-2" style={{ height: "1px", background: "var(--vsc-border)" }} />

          {/* KEYBOARD SHORTCUTS */}
          <div className="px-4 pb-3">
            <p
              className="text-[10px] font-bold tracking-widest uppercase mb-2"
              style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
            >
              Keyboard Shortcuts
            </p>
            <div className="flex flex-col gap-1.5">
              {SHORTCUTS.map(({ keys, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 shrink-0">
                    {keys.map((k) => (
                      <kbd
                        key={k}
                        className="px-1.5 py-0.5 rounded text-[10px]"
                        style={{
                          background: "var(--vsc-titlebar-bg)",
                          color: "var(--vsc-fg)",
                          border: "1px solid var(--vsc-border)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-4 py-2.5 border-t text-[10px]"
            style={{
              borderColor: "var(--vsc-border)",
              color: "var(--vsc-fg-dim)",
              fontFamily: "var(--font-display)",
              background: "rgba(0,0,0,0.15)",
            }}
          >
            <p>Portfolio v1.0 · Next.js + Tailwind</p>
            <p className="mt-0.5">
              Made with{" "}
              <span style={{ color: "#eb4d4b" }}>♥</span>{" "}
              by{" "}
              <span style={{ color: "var(--vsc-fg-muted)" }}>Mo Hassan</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
