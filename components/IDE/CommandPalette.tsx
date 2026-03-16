"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FILES, type FileId } from "@/hooks/useIDEState";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (id: FileId) => void;
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

const FILE_FOLDERS: Record<string, string> = {
  tsx:  "src/",
  html: "src/",
  js:   "src/",
  json: "data/",
  ts:   "src/",
  css:  "src/",
  md:   "./",
};

const COMMANDS = [
  { id: "cmd-readme",  label: "Open README",    description: "View project overview",   action: "readme" as FileId },
  { id: "cmd-contact", label: "Contact Me",     description: "Open contact form",       action: "contact" as FileId },
  { id: "cmd-projects",label: "View Projects",  description: "Browse my work",          action: "projects" as FileId },
];

function FileExtIcon({ ext }: { ext: string }) {
  const color = EXT_COLORS[ext] ?? "#858585";
  const bg = `${color}22`;
  return (
    <span
      className="flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold uppercase shrink-0"
      style={{
        background: bg,
        color,
        fontFamily: "var(--font-mono)",
        border: `1px solid ${color}44`,
      }}
    >
      {ext === "tsx" ? "TS" : ext === "md" ? "MD" : ext.toUpperCase()}
    </span>
  );
}

export function CommandPalette({ isOpen, onClose, onFileSelect }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredFiles = FILES.filter((f) =>
    f.filename.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCommands = COMMANDS.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  const totalItems = filteredCommands.length + filteredFiles.length;

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (idx: number) => {
      if (idx < filteredCommands.length) {
        onFileSelect(filteredCommands[idx].action);
      } else {
        const fileIdx = idx - filteredCommands.length;
        if (filteredFiles[fileIdx]) {
          onFileSelect(filteredFiles[fileIdx].id);
        }
      }
      onClose();
    },
    [filteredCommands, filteredFiles, onFileSelect, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, totalItems - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSelect(selectedIdx);
      }
    },
    [selectedIdx, totalItems, handleSelect, onClose]
  );

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.55)" }}
            onClick={onClose}
          />

          {/* Palette modal */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 left-1/2 -translate-x-1/2 w-full max-w-lg rounded-lg overflow-hidden"
            style={{
              top: "18%",
              background: "#1f1f1f",
              border: "1px solid var(--vsc-border)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {/* Search input row */}
            <div
              className="flex items-center px-3 border-b"
              style={{ borderColor: "var(--vsc-border)" }}
            >
              <span
                className="text-sm mr-1 shrink-0"
                style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}
              >
                &gt;
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Go to file or run command..."
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[var(--vsc-fg-muted)]"
                style={{
                  color: "var(--vsc-fg)",
                  fontFamily: "var(--font-display)",
                  caretColor: "var(--vsc-red-light)",
                }}
              />
              <kbd
                className="shrink-0 px-1.5 py-0.5 rounded text-[10px]"
                style={{
                  background: "var(--vsc-border)",
                  color: "var(--vsc-fg-muted)",
                  fontFamily: "var(--font-mono)",
                  border: "1px solid #555",
                }}
              >
                Esc
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              className="overflow-y-auto"
              style={{ maxHeight: "360px" }}
              onWheel={(e) => { e.stopPropagation(); if (listRef.current) listRef.current.scrollTop += e.deltaY; }}
            >
              {/* Commands section */}
              {filteredCommands.length > 0 && (
                <>
                  <div
                    className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
                  >
                    Commands
                  </div>
                  {filteredCommands.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(i)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors focus-visible:outline-none"
                      style={{
                        background: selectedIdx === i ? "var(--vsc-active-bg)" : "transparent",
                        borderLeft: selectedIdx === i ? "2px solid var(--vsc-red)" : "2px solid transparent",
                      }}
                      onMouseEnter={() => setSelectedIdx(i)}
                    >
                      <span
                        className="flex items-center justify-center w-5 h-5 rounded shrink-0"
                        style={{ background: "rgba(157,21,21,0.25)", color: "var(--vsc-red-light)" }}
                      >
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M4 2v12l4-3 4 3V2H4zm1 1h6v9.4l-3-2.25L5 12.4V3z"/>
                        </svg>
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm truncate" style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)" }}>
                          {cmd.label}
                        </span>
                        <span className="text-[10px] truncate" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}>
                          {cmd.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* Files section */}
              {filteredFiles.length > 0 && (
                <>
                  <div
                    className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
                  >
                    Files
                  </div>
                  {filteredFiles.map((file, fi) => {
                    const idx = filteredCommands.length + fi;
                    return (
                      <button
                        key={file.id}
                        onClick={() => handleSelect(idx)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors focus-visible:outline-none"
                        style={{
                          background: selectedIdx === idx ? "var(--vsc-active-bg)" : "transparent",
                          borderLeft: selectedIdx === idx ? "2px solid var(--vsc-red)" : "2px solid transparent",
                        }}
                        onMouseEnter={() => setSelectedIdx(idx)}
                      >
                        <FileExtIcon ext={file.extension} />
                        <span
                          className="flex-1 text-sm truncate"
                          style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-mono)" }}
                        >
                          {file.filename}
                        </span>
                        <span
                          className="text-[10px] shrink-0 ml-2"
                          style={{ color: "var(--vsc-fg-dim)", fontFamily: "var(--font-mono)" }}
                        >
                          {FILE_FOLDERS[file.extension] ?? "./"}
                        </span>
                      </button>
                    );
                  })}
                </>
              )}

              {/* Empty state */}
              {totalItems === 0 && (
                <div
                  className="px-3 py-6 text-center text-sm"
                  style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
                >
                  No results for &quot;{query}&quot;
                </div>
              )}
            </div>

            {/* Footer hint bar */}
            <div
              className="flex items-center gap-4 px-3 py-2 border-t text-[10px]"
              style={{
                borderColor: "var(--vsc-border)",
                background: "#1a1a1a",
                color: "var(--vsc-fg-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span>↑↓ navigate</span>
              <span style={{ color: "var(--vsc-border)" }}>·</span>
              <span>↵ open</span>
              <span style={{ color: "var(--vsc-border)" }}>·</span>
              <span>Esc close</span>
              <span style={{ color: "var(--vsc-border)" }}>·</span>
              <span style={{ color: "var(--vsc-fg-dim)" }}>Tip: type a filename to jump to it</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
