"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { FileId } from "@/hooks/useIDEState";

// ── Types ────────────────────────────────────────────────────────────

type LineType = "out" | "err" | "success" | "info" | "prompt";

interface OutputLine {
  type: LineType;
  content: string;
  prompt?: string; // shown before content on "prompt" lines
}

type Tab = "terminal" | "problems" | "output";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileOpen: (id: FileId) => void;
  clearTrigger: number;
}

// ── Virtual filesystem ───────────────────────────────────────────────

const VFS: Record<string, { files: string[]; dirs: string[] }> = {
  "~":                           { files: [], dirs: ["portfolio"] },
  "~/portfolio":                 { files: ["README.md", "package.json", "next.config.ts", "tsconfig.json"], dirs: ["src", "components", "hooks", "public"] },
  "~/portfolio/src":             { files: ["home.tsx", "about.html", "projects.js", "skills.json", "experience.ts", "contact.css"], dirs: [] },
  "~/portfolio/components":      { files: [], dirs: ["IDE", "ui"] },
  "~/portfolio/components/IDE":  { files: ["ActivityBar.tsx", "CommandPalette.tsx", "CustomCursor.tsx", "EditorCanvas.tsx", "FileExplorer.tsx", "IDELayout.tsx", "SettingsPanel.tsx", "StatusBar.tsx", "Terminal.tsx", "TitleBar.tsx"], dirs: [] },
  "~/portfolio/hooks":           { files: ["useIDEState.ts", "useTheme.ts"], dirs: [] },
  "~/portfolio/public":          { files: ["favicon.ico", "resume.pdf"], dirs: [] },
};

const FILE_ID_MAP: Record<string, FileId> = {
  "home.tsx":      "home",
  "about.html":    "about",
  "projects.js":   "projects",
  "skills.json":   "skills",
  "experience.ts": "experience",
  "contact.css":   "contact",
  "README.md":     "readme",
  "readme.md":     "readme",
};

const GIT_LOG = [
  { hash: "a3f9c12", msg: "feat: add terminal panel with interactive commands", date: "2 hours ago" },
  { hash: "7b2e441", msg: "feat: add custom cursor with spring animation",       date: "5 hours ago" },
  { hash: "c8d1f90", msg: "feat: add theme picker in status bar",                date: "1 day ago"   },
  { hash: "e2a3b74", msg: "feat: add settings panel with 6 color themes",        date: "2 days ago"  },
  { hash: "f1c9d22", msg: "feat: VS Code IDE portfolio — initial commit",         date: "3 days ago"  },
];

// ── Command processor ────────────────────────────────────────────────

function processCommand(
  raw: string,
  cwd: string,
  setCwd: (d: string) => void,
  onFileOpen: (id: FileId) => void,
): OutputLine[] | "__clear__" {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const [cmd, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ");

  const shortCwd = cwd === "~" ? "~" : "~/" + cwd.split("/").slice(1).join("/");

  switch (cmd) {
    case "help":
      return [
        { type: "success", content: "Available commands:" },
        { type: "out",     content: "  ls               — list files in current directory" },
        { type: "out",     content: "  pwd              — print working directory" },
        { type: "out",     content: "  cd <dir>         — change directory  (cd .. to go up)" },
        { type: "out",     content: "  cat <file>       — view / open a file in the editor" },
        { type: "out",     content: "  open <file>      — same as cat" },
        { type: "out",     content: "  whoami           — who am I?" },
        { type: "out",     content: "  echo <text>      — print text" },
        { type: "out",     content: "  date             — show current date & time" },
        { type: "out",     content: "  git log          — show recent commits" },
        { type: "out",     content: "  python --version — show Python version" },
        { type: "out",     content: "  clear            — clear the terminal" },
      ];

    case "ls": {
      const dir = VFS[cwd];
      if (!dir) return [{ type: "err", content: `ls: cannot access '${shortCwd}': No such directory` }];
      const dirs  = dir.dirs.map(d => d + "/");
      const files = dir.files;
      const all   = [...dirs, ...files];
      return all.length
        ? [{ type: "out", content: all.join("   ") }]
        : [{ type: "out", content: "(empty)" }];
    }

    case "pwd":
      return [{ type: "out", content: cwd }];

    case "cd": {
      if (!arg || arg === "~") { setCwd("~"); return []; }
      if (arg === "..") {
        const parts = cwd.split("/");
        parts.pop();
        setCwd(parts.join("/") || "~");
        return [];
      }
      const target = cwd === "~" ? `~/${arg}` : `${cwd}/${arg}`;
      if (VFS[target]) { setCwd(target); return []; }
      return [{ type: "err", content: `cd: no such file or directory: ${arg}` }];
    }

    case "cat":
    case "open": {
      if (!arg) return [{ type: "err", content: `${cmd}: missing operand` }];
      const fileId = FILE_ID_MAP[arg];
      if (fileId) {
        onFileOpen(fileId);
        return [{ type: "success", content: `Opening ${arg} in editor…` }];
      }
      const dir = VFS[cwd];
      if (dir?.files.includes(arg))
        return [{ type: "out", content: `[binary or non-editable file: ${arg}]` }];
      return [{ type: "err", content: `${cmd}: ${arg}: No such file or directory` }];
    }

    case "whoami":
      return [
        { type: "out", content: "mo-hassan" },
        { type: "out", content: "Full-stack developer & volleyball enthusiast 🏐" },
        { type: "out", content: "Building cool things with Next.js, TypeScript & Tailwind" },
      ];

    case "echo":
      return [{ type: "out", content: arg }];

    case "date":
      return [{ type: "out", content: new Date().toString() }];

    case "git": {
      if (args[0] !== "log")
        return [{ type: "err", content: `git: '${args[0]}' is not a recognised command` }];
      return GIT_LOG.flatMap((c, i) => [
        { type: "success", content: `commit ${c.hash}${i === 0 ? "  (HEAD -> main)" : ""}` },
        { type: "out",     content: `Author: Mo Hassan <mo@mohassan.dev>` },
        { type: "out",     content: `Date:   ${c.date}` },
        { type: "out",     content: `\n    ${c.msg}\n` },
      ]);
    }

    case "python":
      return args[0] === "--version"
        ? [{ type: "out", content: "Python 3.11.5" }]
        : [{ type: "err", content: "python: interactive mode not supported here" }];

    case "node":
      return args[0] === "--version"
        ? [{ type: "out", content: "v20.11.0" }]
        : [{ type: "err", content: "node: interactive mode not supported here" }];

    case "clear":
      return "__clear__";

    case "":
      return [];

    default:
      return [{ type: "err", content: `command not found: ${cmd}` }];
  }
}

// ── Welcome lines ────────────────────────────────────────────────────

const WELCOME: OutputLine[] = [
  { type: "info",    content: "Welcome to Mo Hassan's Portfolio Terminal 🚀" },
  { type: "info",    content: "──────────────────────────────────────────" },
  { type: "out",     content: "" },
  { type: "success", content: "Available commands:" },
  { type: "out",     content: "  help             — show this message" },
  { type: "out",     content: "  ls               — list files in current directory" },
  { type: "out",     content: "  pwd              — print working directory" },
  { type: "out",     content: "  cd <dir>         — change directory  (cd .. to go up)" },
  { type: "out",     content: "  cat <file>       — view / open a file in the editor" },
  { type: "out",     content: "  open <file>      — same as cat" },
  { type: "out",     content: "  whoami           — who am I?" },
  { type: "out",     content: "  echo <text>      — print text" },
  { type: "out",     content: "  date             — show current date & time" },
  { type: "out",     content: "  git log          — show recent commits" },
  { type: "out",     content: "  python --version — show Python version" },
  { type: "out",     content: "  node --version   — show Node version" },
  { type: "out",     content: "  clear            — clear the terminal" },
  { type: "out",     content: "" },
];

// ── Prompt string ────────────────────────────────────────────────────

function makePrompt(cwd: string) {
  const display = cwd === "~" ? "~" : cwd.replace("~/portfolio", "~/portfolio");
  return `mo-hassan@portfolio:${display}$ `;
}

// ── Line renderer ────────────────────────────────────────────────────

function Line({ line }: { line: OutputLine }) {
  const color: Record<LineType, string> = {
    out:     "var(--vsc-fg-muted)",
    err:     "#f44747",
    success: "#4ec9b0",
    info:    "var(--vsc-fg-dim)",
    prompt:  "var(--vsc-fg-muted)",
  };

  if (line.type === "prompt") {
    // split dir chunks for coloring
    const parts = line.prompt?.split(":") ?? [];
    const user  = parts[0] ?? "";
    const path  = parts[1] ?? "";
    return (
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        <span style={{ color: "#4ec9b0" }}>{user}</span>
        <span style={{ color: "var(--vsc-fg-muted)" }}>:</span>
        <span style={{ color: "#569cd6" }}>{path}</span>
        <span style={{ color: "var(--vsc-fg-muted)" }}>$ </span>
        <span style={{ color: "var(--vsc-fg)" }}>{line.content}</span>
      </div>
    );
  }

  if (line.type === "out" && line.content.includes("/")) {
    // colour directory entries blue
    const parts = line.content.split("   ");
    return (
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-all", color: color[line.type] }}>
        {parts.map((p, i) => (
          <span key={i}>
            {i > 0 && "   "}
            <span style={{ color: p.endsWith("/") ? "#569cd6" : "var(--vsc-fg-muted)" }}>{p}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-all", color: color[line.type] }}>
      {line.content}
    </div>
  );
}

// ── Terminal component ───────────────────────────────────────────────

export function Terminal({ isOpen, onClose, onFileOpen, clearTrigger }: TerminalProps) {
  const [activeTab,   setActiveTab]   = useState<Tab>("terminal");
  const [lines,       setLines]       = useState<OutputLine[]>(WELCOME);
  const [input,       setInput]       = useState("");
  const [cwd,         setCwd]         = useState("~");
  const [history,     setHistory]     = useState<string[]>([]);
  const [historyIdx,  setHistoryIdx]  = useState(-1);
  const [height,      setHeight]      = useState(220);

  const outputRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const dragging   = useRef(false);
  const dragStartY = useRef(0);
  const dragStartH = useRef(0);

  // Clear when triggered from outside
  useEffect(() => {
    if (clearTrigger > 0) setLines(WELCOME);
  }, [clearTrigger]);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = outputRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [isOpen]);

  // ── Resize drag ────────────────────────────────────────────────────
  const onResizeStart = useCallback((e: React.MouseEvent) => {
    dragging.current   = true;
    dragStartY.current = e.clientY;
    dragStartH.current = height;
    e.preventDefault();
  }, [height]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = dragStartY.current - e.clientY;
      setHeight(Math.max(120, Math.min(520, dragStartH.current + delta)));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  // ── Submit command ─────────────────────────────────────────────────
  const submit = useCallback(() => {
    const cmd = input.trim();
    const promptLabel = `mo-hassan@portfolio:${cwd === "~" ? "~" : cwd.replace("~/portfolio", "~/portfolio")}`;

    setLines(prev => [...prev, { type: "prompt", content: cmd, prompt: promptLabel }]);
    if (cmd) setHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistoryIdx(-1);
    setInput("");

    if (!cmd) return;

    const result = processCommand(cmd, cwd, setCwd, onFileOpen);
    if (result === "__clear__") {
      setLines(WELCOME);
    } else {
      setLines(prev => [...prev, ...result]);
    }
  }, [input, cwd, onFileOpen]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { submit(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) { setHistoryIdx(-1); setInput(""); }
      else { setHistoryIdx(next); setInput(history[next]); }
    }
  }, [submit, history, historyIdx]);

  const clearTerminal = () => setLines(WELCOME);

  const tabStyle = (tab: Tab): React.CSSProperties => ({
    padding: "0 12px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    fontFamily: "var(--font-display)",
    cursor: tab === "terminal" ? "pointer" : "default",
    color: activeTab === tab ? "var(--vsc-fg)" : "var(--vsc-fg-muted)",
    borderBottom: activeTab === tab ? "1px solid var(--vsc-red-light)" : "1px solid transparent",
    userSelect: "none",
  });

  return (
    /* Single flat flex-column. height:0 + overflow:hidden hides it when closed.
       No nested wrappers — keeps the output div always mounted so overflowY:scroll
       is never reset by a remount. */
    <div
      style={{
        height: isOpen ? `${height}px` : 0,
        overflow: "hidden",
        flexShrink: 0,
        transition: "height 0.2s cubic-bezier(0.16,1,0.3,1)",
        background: "var(--vsc-sidebar-bg)",
        borderTop: isOpen ? "1px solid var(--vsc-border)" : "none",
      }}
    >
    <div
      style={{
        height: `${height}px`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Resize handle */}
      <div
        onMouseDown={onResizeStart}
        style={{ height: 4, flexShrink: 0, cursor: "ns-resize" }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--vsc-red-light)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      />

      {/* Header */}
      <div
        className="flex items-center justify-between border-b"
        style={{ height: 30, flexShrink: 0, borderColor: "var(--vsc-border)", paddingRight: 6, background: "var(--vsc-sidebar-bg)" }}
      >
        <div className="flex items-center h-full">
          <button onClick={() => setActiveTab("terminal")} style={tabStyle("terminal")}>Terminal</button>
          {(["problems", "output"] as Tab[]).map(tab => (
            <div key={tab} style={tabStyle(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => { setLines(WELCOME); setCwd("~"); setActiveTab("terminal"); }} className="flex items-center justify-center w-6 h-6 rounded" style={{ color: "var(--vsc-fg-muted)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--vsc-hover-bg)"; (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)"; }} title="New Terminal"><Plus size={13} /></button>
          <button onClick={clearTerminal} className="flex items-center justify-center w-6 h-6 rounded" style={{ color: "var(--vsc-fg-muted)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--vsc-hover-bg)"; (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)"; }} title="Clear Terminal"><Trash2 size={13} /></button>
          <button onClick={onClose} className="flex items-center justify-center w-6 h-6 rounded" style={{ color: "var(--vsc-fg-muted)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--vsc-hover-bg)"; (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)"; }} title="Close Panel"><X size={13} /></button>
        </div>
      </div>

      {/* Output */}
      {activeTab === "terminal" ? (
        <div
          ref={outputRef}
          onClick={() => inputRef.current?.focus()}
          onWheel={(e) => {
            // Prevent the wheel event from bubbling to ancestors with overflow:hidden
            // (html/body/editor-column), which would cause Chrome to cancel it.
            e.stopPropagation();
            if (outputRef.current) outputRef.current.scrollTop += e.deltaY;
          }}
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "scroll",
            padding: "8px 12px",
            fontSize: 12,
            fontFamily: "var(--font-mono)",
          }}
        >
          {lines.map((line, i) => <Line key={i} line={line} />)}
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", fontSize: 12 }}>
          {activeTab === "problems" ? "No problems detected." : "No output available."}
        </div>
      )}

      {/* Input */}
      {activeTab === "terminal" && (
        <div style={{ height: 30, flexShrink: 0, display: "flex", alignItems: "center", padding: "0 12px", fontFamily: "var(--font-mono)", fontSize: 12, background: "var(--vsc-sidebar-bg)", borderTop: "1px solid var(--vsc-border)" }}>
          <span style={{ color: "#4ec9b0", whiteSpace: "nowrap" }}>mo-hassan</span>
          <span style={{ color: "var(--vsc-fg-muted)" }}>@</span>
          <span style={{ color: "#4ec9b0", whiteSpace: "nowrap" }}>portfolio</span>
          <span style={{ color: "var(--vsc-fg-muted)" }}>:</span>
          <span style={{ color: "#569cd6", whiteSpace: "nowrap" }}>{cwd === "~" ? "~" : cwd}</span>
          <span style={{ color: "var(--vsc-fg-muted)" }}>$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            style={{ flex: 1, background: "transparent", outline: "none", border: "none", boxShadow: "none", color: "var(--vsc-fg-muted)", fontFamily: "var(--font-mono)", fontSize: 12, caretColor: "var(--vsc-fg)", padding: 0, margin: 0, WebkitAppearance: "none" }}
            spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
          />
        </div>
      )}
    </div>
    </div>
  );
}
