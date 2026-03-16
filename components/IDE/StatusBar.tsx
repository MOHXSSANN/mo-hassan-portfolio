"use client";

import { useEffect, useRef, useState } from "react";
import { GitBranch, Triangle, Sparkles, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FileId } from "@/hooks/useIDEState";
import { THEMES, type ThemeId } from "@/hooks/useTheme";

interface StatusBarProps {
  activeFile: FileId;
  themeId: ThemeId;
  onThemeChange: (id: ThemeId) => void;
  onToggleTerminal: () => void;
}

const FILE_TYPE_LABELS: Record<FileId, string> = {
  home:       "TypeScript React",
  about:      "HTML",
  projects:   "JavaScript",
  skills:     "JSON",
  experience: "TypeScript",
  contact:    "CSS",
  readme:     "Markdown",
};

function Divider() {
  return <span style={{ opacity: 0.3, margin: "0 1px" }}>|</span>;
}

function StatusItem({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isClickable = !!onClick;

  return (
    <motion.span
      role={isClickable ? "button" : undefined}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -1 }}
      whileTap={isClickable ? { scale: 0.94 } : {}}
      className="flex items-center gap-1 px-2 rounded-sm"
      style={{
        height: "22px",
        cursor: isClickable ? "pointer" : "default",
        background:
          active
            ? "rgba(255,255,255,0.22)"
            : hovered
            ? "rgba(255,255,255,0.13)"
            : "transparent",
        transition: "background 0.12s",
        fontWeight: active ? 600 : 400,
      }}
    >
      {children}
    </motion.span>
  );
}

function ThemePicker({
  themeId,
  onThemeChange,
  onClose,
}: {
  themeId: ThemeId;
  onThemeChange: (id: ThemeId) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 10);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-full mb-1 right-0 rounded-md overflow-hidden"
      style={{
        background: "var(--vsc-sidebar-bg)",
        border: "1px solid var(--vsc-border)",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
        minWidth: "180px",
        zIndex: 100,
      }}
    >
      <div
        className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase border-b"
        style={{ color: "var(--vsc-fg-muted)", borderColor: "var(--vsc-border)" }}
      >
        Color Theme
      </div>
      {THEMES.map((theme) => {
        const active = themeId === theme.id;
        return (
          <motion.button
            key={theme.id}
            onClick={() => { onThemeChange(theme.id); onClose(); }}
            whileHover={{ x: 3 }}
            className="flex items-center gap-2.5 w-full px-3 py-1.5 text-left focus-visible:outline-none"
            style={{
              background: active ? "var(--vsc-active-bg)" : "transparent",
              color: active ? "var(--vsc-fg)" : "var(--vsc-fg-muted)",
              fontSize: "12px",
              fontFamily: "var(--font-display)",
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: theme.dot }}
            />
            <span className="text-sm">{theme.emoji}</span>
            <span className="flex-1">{theme.name}</span>
            {active && <span style={{ color: "var(--vsc-red-light)", fontSize: "11px" }}>✓</span>}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export function StatusBar({ activeFile, themeId, onThemeChange, onToggleTerminal }: StatusBarProps) {
  const [time, setTime] = useState("");
  const [themePickerOpen, setThemePickerOpen] = useState(false);

  const fileType  = FILE_TYPE_LABELS[activeFile];
  const themeName = THEMES.find((t) => t.id === themeId)?.name ?? "Crimson Cave";

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="hidden md:flex items-center justify-between select-none shrink-0"
      style={{
        height: "22px",
        minHeight: "22px",
        paddingLeft: "4px",
        paddingRight: "4px",
        background: "var(--vsc-statusbar-bg)",
        color: "var(--vsc-statusbar-fg)",
        fontFamily: "var(--font-display)",
        fontSize: "12px",
        whiteSpace: "nowrap",
        position: "relative",
      }}
    >
      {/* ── Left ── */}
      <div className="flex items-center">
        <StatusItem onClick={onToggleTerminal}>
          <Triangle size={11} strokeWidth={2} />
          <span>0</span>
        </StatusItem>

        <StatusItem>
          <GitBranch size={12} strokeWidth={2} />
          <span>main</span>
        </StatusItem>

        <Divider />

        <StatusItem>
          <span>Mo Hassan&apos;s Portfolio</span>
        </StatusItem>
      </div>

      {/* ── Right ── */}
      <div className="flex items-center" style={{ position: "relative" }}>
        <StatusItem>
          <Sparkles size={11} strokeWidth={2} />
          <span>Copilot</span>
        </StatusItem>

        <Divider />

        <StatusItem>
          <span>{fileType}</span>
        </StatusItem>

        <Divider />

        <StatusItem>
          <span>UTF-8</span>
        </StatusItem>

        <Divider />

        <StatusItem>
          <span>Prettier</span>
        </StatusItem>

        <Divider />

        {/* Theme picker trigger */}
        <div style={{ position: "relative" }}>
          <StatusItem
            onClick={() => setThemePickerOpen((p) => !p)}
            active={themePickerOpen}
          >
            <span>{themeName}</span>
            <ChevronUp
              size={10}
              strokeWidth={2.5}
              style={{
                transform: themePickerOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </StatusItem>

          <AnimatePresence>
            {themePickerOpen && (
              <ThemePicker
                themeId={themeId}
                onThemeChange={onThemeChange}
                onClose={() => setThemePickerOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>

        <Divider />

        <StatusItem>
          <span>{time}</span>
        </StatusItem>
      </div>
    </div>
  );
}
