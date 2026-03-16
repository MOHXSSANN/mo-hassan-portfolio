"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FILES, FILE_MAP, type FileId } from "@/hooks/useIDEState";

interface EditorTabsProps {
  openTabs: FileId[];
  activeFile: FileId;
  onTabClick: (id: FileId) => void;
  onTabClose: (id: FileId) => void;
}

const EXT_COLORS: Record<string, string> = {
  tsx:  "#4ec9b0",
  html: "#e44d26",
  js:   "#f7df1e",
  json: "#6a9955",
  ts:   "#569cd6",
  css:  "#c586c0",
  md:   "#858585",
};

export function EditorTabs({ openTabs, activeFile, onTabClick, onTabClose }: EditorTabsProps) {
  return (
    <div
      className="hidden md:flex items-end shrink-0 overflow-x-auto tabs-scroll border-b"
      style={{
        height: "44px",
        background: "var(--vsc-tab-inactive-bg)",
        borderColor: "var(--vsc-border)",
      }}
    >
      <AnimatePresence initial={false}>
        {openTabs.map((id) => {
          const file = FILE_MAP[id];
          const isActive = activeFile === id;
          const dotColor = EXT_COLORS[file.extension] ?? "#858585";

          return (
            <motion.div
              key={id}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{ overflow: "hidden", flexShrink: 0 }}
            >
              <div
                className="relative flex items-center gap-2.5 px-4 group cursor-pointer select-none"
                style={{
                  height: "43px",
                  background: isActive ? "var(--vsc-tab-active-bg)" : "var(--vsc-tab-inactive-bg)",
                  borderTop: isActive
                    ? "1px solid var(--vsc-red)"
                    : "1px solid transparent",
                  borderRight: "1px solid var(--vsc-border)",
                  color: isActive ? "var(--vsc-fg)" : "var(--vsc-fg-muted)",
                  fontFamily: "var(--font-display)",
                  minWidth: "max-content",
                }}
                onClick={() => onTabClick(id)}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)";
                }}
              >
                {/* Colored dot */}
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: dotColor }}
                />
                {/* Filename */}
                <span className="text-sm whitespace-nowrap" style={{ fontSize: "13px" }}>{file.filename}</span>
                {/* Close button */}
                <button
                  className="flex items-center justify-center w-5 h-5 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 active:bg-white/20 focus-visible:outline-none"
                  style={{ color: "var(--vsc-fg-muted)" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(id);
                  }}
                  aria-label={`Close ${file.filename}`}
                >
                  <X size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {/* Remaining space filler */}
      <div className="flex-1 h-full" style={{ borderBottom: "1px solid var(--vsc-border)", marginBottom: "-1px" }} />
    </div>
  );
}
