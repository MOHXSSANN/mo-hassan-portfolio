"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, GitBranch, GitCommit, GitPullRequest, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { FILES, type FileId, type ActivityView } from "@/hooks/useIDEState";

interface FileExplorerProps {
  activeFile: FileId;
  onFileSelect: (id: FileId) => void;
  isOpen: boolean;
  activityView: ActivityView;
}

// ── VS Code–style file type icons ────────────────────────────────────
function FileTypeIcon({ ext }: { ext: string }) {
  const size = 22;

  switch (ext) {
    case "tsx":
    case "jsx":
      return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
          <rect width="18" height="18" rx="3" fill="#1a7bc4" />
          <text x="9" y="13.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4ec9b0" fontFamily="monospace">
            TS
          </text>
          <circle cx="14" cy="4" r="3" fill="#4ec9b0" />
          <path d="M12.5 4 Q14 2.5 15.5 4 Q14 5.5 12.5 4Z" fill="#1a7bc4" />
        </svg>
      );
    case "ts":
      return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
          <rect width="18" height="18" rx="3" fill="#1a7bc4" />
          <text x="9" y="13" textAnchor="middle" fontSize="10" fontWeight="800" fill="white" fontFamily="monospace">
            TS
          </text>
        </svg>
      );
    case "js":
      return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
          <rect width="18" height="18" rx="3" fill="#f0d040" />
          <text x="9" y="13" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1a1a1a" fontFamily="monospace">
            JS
          </text>
        </svg>
      );
    case "html":
      return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
          <rect width="18" height="18" rx="3" fill="#e44d26" />
          <text x="9" y="8" textAnchor="middle" fontSize="6" fontWeight="700" fill="white" fontFamily="monospace">
            HTM
          </text>
          <path d="M4 10 L5.5 15 L9 16.5 L12.5 15 L14 10" stroke="white" strokeWidth="1.2" fill="none" />
        </svg>
      );
    case "css":
      return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
          <rect width="18" height="18" rx="3" fill="#c586c0" />
          <text x="9" y="8" textAnchor="middle" fontSize="6" fontWeight="700" fill="white" fontFamily="monospace">
            CSS
          </text>
          <path d="M4 10 L5.5 15 L9 16.5 L12.5 15 L14 10" stroke="white" strokeWidth="1.2" fill="none" />
        </svg>
      );
    case "json":
      return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
          <rect width="18" height="18" rx="3" fill="#6a9955" />
          <text x="5" y="13" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="monospace">
            {"{"}
          </text>
          <text x="13" y="13" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="monospace">
            {"}"}
          </text>
        </svg>
      );
    case "md":
      return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
          <rect width="18" height="18" rx="3" fill="#42a5f5" />
          <text x="9" y="12" textAnchor="middle" fontSize="8" fontWeight="800" fill="white" fontFamily="monospace">
            MD
          </text>
          <path d="M3 14 L3 10 L5.5 12.5 L8 10 L8 14" stroke="white" strokeWidth="1.1" fill="none" />
          <path d="M10 14 L10 10 M10 10 L13 13 L16 10" stroke="white" strokeWidth="1.1" fill="none" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
          <rect width="18" height="18" rx="3" fill="#858585" />
          <text x="9" y="13" textAnchor="middle" fontSize="8" fontWeight="700" fill="white" fontFamily="monospace">
            {ext.toUpperCase().slice(0, 3)}
          </text>
        </svg>
      );
  }
}

// Folder open icon (yellow, VS Code style)
function FolderIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
      <path d="M1 4C1 3.45 1.45 3 2 3H7L9 5H16C16.55 5 17 5.45 17 6V14C17 14.55 16.55 15 16 15H2C1.45 15 1 14.55 1 14V4Z" fill="#dcdcaa" />
      <path d="M1 7H17V14C17 14.55 16.55 15 16 15H2C1.45 15 1 14.55 1 14V7Z" fill="#f0e68c" />
    </svg>
  );
}

export function FileExplorer({ activeFile, onFileSelect, isOpen, activityView }: FileExplorerProps) {
  const [folderOpen, setFolderOpen] = useState(true);
  const treeRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          key="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 260, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          className="hidden md:flex flex-col shrink-0 overflow-hidden border-r"
          style={{
            background: "var(--vsc-sidebar-bg)",
            borderColor: "var(--vsc-border)",
          }}
        >
          {/* Header */}
          <div className="px-4 pt-4 pb-2 flex items-center justify-between select-none">
            <span
              className="text-[11px] font-bold tracking-widest uppercase"
              style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
            >
              {activityView === "git" ? "Source Control" : "Explorer"}
            </span>
          </div>

          {/* ── Source Control view ── */}
          {activityView === "git" ? (
            <div ref={treeRef} className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-3" onWheel={(e) => { e.stopPropagation(); if (treeRef.current) treeRef.current.scrollTop += e.deltaY; }}>

              {/* Branch row */}
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-md"
                style={{ background: "var(--vsc-editor-bg)", border: "1px solid var(--vsc-border)" }}
              >
                <GitBranch size={13} style={{ color: "#4ec9b0", flexShrink: 0 }} />
                <span className="flex-1 text-xs font-semibold" style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-mono)" }}>main</span>
                <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)" }}>
                  ↑ 1 commit ahead
                </span>
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-3 rounded-md overflow-hidden"
                style={{ border: "1px solid var(--vsc-border)" }}
              >
                {[
                  { label: "Modified", value: 3, color: "#4ec9b0" },
                  { label: "Added",    value: 1, color: "#89d185" },
                  { label: "Deleted",  value: 0, color: "#f14c4c" },
                ].map(({ label, value, color }, i) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center py-3"
                    style={{
                      background: "var(--vsc-editor-bg)",
                      borderRight: i < 2 ? "1px solid var(--vsc-border)" : "none",
                    }}
                  >
                    <span className="text-base font-black leading-none" style={{ color, fontFamily: "var(--font-display)" }}>{value}</span>
                    <span className="text-[9px] mt-1 tracking-wide uppercase" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Recent commits */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}>Recent Commits</p>
                <div className="flex flex-col gap-0.5">
                  {[
                    { hash: "a3f9c12", msg: "feat: add terminal with interactive commands" },
                    { hash: "7b2e441", msg: "feat: custom cursor with spring animation" },
                    { hash: "c8d1f90", msg: "feat: theme picker in status bar" },
                    { hash: "e2a3b74", msg: "feat: settings panel with colour themes" },
                    { hash: "f1c9d22", msg: "init: VS Code IDE portfolio" },
                  ].map(({ hash, msg }) => (
                    <div key={hash} className="flex items-start gap-2 px-2 py-1.5 rounded" style={{ fontFamily: "var(--font-mono)" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--vsc-hover-bg)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <GitCommit size={11} style={{ color: "#89d185", marginTop: 2, flexShrink: 0 }} />
                      <div className="min-w-0">
                        <p className="text-[10px] truncate" style={{ color: "var(--vsc-fg)" }}>{msg}</p>
                        <p className="text-[10px]" style={{ color: "var(--vsc-fg-muted)" }}>{hash}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View on GitHub */}
              <a
                href="https://github.com/MOHXSSANN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded text-xs font-semibold mt-auto"
                style={{ background: "transparent", border: "1px solid var(--vsc-border)", color: "var(--vsc-fg)", fontFamily: "var(--font-display)", textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--vsc-hover-bg)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-fg-muted)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)"; }}
              >
                <ExternalLink size={11} />
                View on GitHub ↗
              </a>
            </div>
          ) : (
          <div ref={treeRef} className="flex-1 overflow-y-auto py-1" onWheel={(e) => { e.stopPropagation(); if (treeRef.current) treeRef.current.scrollTop += e.deltaY; }}>
            {/* Portfolio folder row */}
            <button
              className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors select-none focus-visible:outline-none"
              style={{
                color: "var(--vsc-fg)",
                fontFamily: "var(--font-display)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--vsc-hover-bg)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              onClick={() => setFolderOpen((v) => !v)}
            >
              {folderOpen ? (
                <ChevronDown size={14} style={{ color: "var(--vsc-fg-muted)", flexShrink: 0 }} />
              ) : (
                <ChevronRight size={14} style={{ color: "var(--vsc-fg-muted)", flexShrink: 0 }} />
              )}
              <FolderIcon />
              <span className="font-semibold text-[12px] tracking-wide">PORTFOLIO</span>
            </button>

            <AnimatePresence initial={false}>
              {folderOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {FILES.map((file) => {
                    const isActive = activeFile === file.id;
                    return (
                      <button
                        key={file.id}
                        onClick={() => onFileSelect(file.id)}
                        className="w-full flex items-center gap-2.5 pl-9 pr-3 py-1.5 text-left transition-colors select-none focus-visible:outline-none"
                        style={{
                          background: isActive ? "var(--vsc-active-bg)" : "transparent",
                          color: isActive ? "#ffffff" : "var(--vsc-fg-muted)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "13px",
                          borderLeft: isActive ? "2px solid var(--vsc-red)" : "2px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--vsc-hover-bg)";
                          if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)";
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                          if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)";
                        }}
                      >
                        <FileTypeIcon ext={file.extension} />
                        <span className="truncate">{file.filename}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="h-2" />
          </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
