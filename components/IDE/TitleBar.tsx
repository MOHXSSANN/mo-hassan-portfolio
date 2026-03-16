"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FILES, type FileId } from "@/hooks/useIDEState";

interface TitleBarProps {
  onToggleSidebar: () => void;
  onOpenPalette: () => void;
  onFileSelect: (id: FileId) => void;
  activeFile: FileId;
  onCloseActiveTab: () => void;
  onCloseAllTabs: () => void;
  onToggleTerminal: () => void;
  onClearTerminal: () => void;
}

// ─── Menu data ────────────────────────────────────────────────────────
type MenuEntry =
  | { type: "item";    label: string; shortcut?: string; action?: () => void; icon?: string }
  | { type: "sep" }
  | { type: "section"; label: string };

function buildMenus(actions: {
  openPalette: () => void;
  toggleSidebar: () => void;
  goTo: (id: FileId) => void;
  closeActiveTab: () => void;
  closeAllTabs: () => void;
  toggleTerminal: () => void;
  clearTerminal: () => void;
}): Record<string, MenuEntry[]> {
  const fileItems: MenuEntry[] = FILES.map((f) => ({
    type: "item",
    label: f.filename,
    action: () => actions.goTo(f.id),
  }));

  return {
    File: [
      { type: "item", label: "New Tab",        shortcut: "Ctrl+T",  action: () => actions.goTo("home") },
      { type: "item", label: "Open File...",   shortcut: "Ctrl+P",  action: actions.openPalette },
      { type: "sep" },
      { type: "item", label: "Close Tab",      shortcut: "Ctrl+W",  action: actions.closeActiveTab },
      { type: "item", label: "Close All Tabs",                      action: actions.closeAllTabs },
      { type: "sep" },
      { type: "section", label: "OPEN RECENT" },
      ...fileItems,
      { type: "sep" },
      {
        type: "item", label: "Download Resume", icon: "⬇",
        action: () => { const a = document.createElement("a"); a.href = "/resume.pdf"; a.download = "Mo_Hassan_Resume.pdf"; a.click(); },
      },
    ],
    Edit: [
      { type: "item", label: "Find...",    shortcut: "Ctrl+F", action: actions.openPalette },
      { type: "sep" },
      { type: "item", label: "Select All", shortcut: "Ctrl+A", action: () => document.execCommand("selectAll") },
      { type: "item", label: "Copy",       shortcut: "Ctrl+C", action: () => document.execCommand("copy") },
    ],
    View: [
      { type: "item", label: "Command Palette",  shortcut: "Ctrl+P",       action: actions.openPalette },
      { type: "item", label: "Toggle Sidebar",   shortcut: "Ctrl+B",       action: actions.toggleSidebar },
      { type: "sep" },
      {
        type: "item", label: "Enter Full Screen", shortcut: "F11",
        action: () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); },
      },
      { type: "sep" },
      { type: "item", label: "Zoom In",    shortcut: "Ctrl++", action: () => { try { (document.body as HTMLElement & { style: CSSStyleDeclaration }).style.zoom = String(Math.min(2, parseFloat((document.body as HTMLElement & { style: CSSStyleDeclaration }).style.zoom || "1") + 0.1)); } catch {} } },
      { type: "item", label: "Zoom Out",   shortcut: "Ctrl+-", action: () => { try { (document.body as HTMLElement & { style: CSSStyleDeclaration }).style.zoom = String(Math.max(0.5, parseFloat((document.body as HTMLElement & { style: CSSStyleDeclaration }).style.zoom || "1") - 0.1)); } catch {} } },
      { type: "item", label: "Reset Zoom",                     action: () => { try { (document.body as HTMLElement & { style: CSSStyleDeclaration }).style.zoom = "1"; } catch {} } },
    ],
    Go: [
      { type: "item", label: "Go to File...", shortcut: "Ctrl+P", action: actions.openPalette },
      { type: "sep" },
      { type: "section", label: "FILES" },
      ...fileItems,
    ],
    Run: [
      { type: "item", label: "Start Terminal",    shortcut: "Ctrl+`", action: actions.toggleTerminal },
      { type: "item", label: "Run Last Command",                      action: actions.toggleTerminal },
    ],
    Terminal: [
      { type: "item", label: "New Terminal",    shortcut: "Ctrl+`", action: actions.toggleTerminal },
      { type: "item", label: "Toggle Terminal", shortcut: "Ctrl+`", action: actions.toggleTerminal },
      { type: "sep" },
      { type: "item", label: "Clear Terminal",                       action: actions.clearTerminal },
    ],
    Help: [
      { type: "item", label: "Command Palette", shortcut: "Ctrl+P", action: actions.openPalette },
      { type: "sep" },
      { type: "section", label: "KEYBOARD SHORTCUTS" },
      { type: "item", label: "Ctrl+P  →  Go to file",    action: actions.openPalette },
      { type: "item", label: "Ctrl+B  →  Toggle sidebar", action: actions.toggleSidebar },
      { type: "item", label: "Esc     →  Close overlay" },
      { type: "sep" },
      { type: "item", label: "GitHub ↗", icon: "↗", action: () => window.open("https://github.com/mohammedhassan62", "_blank") },
      { type: "item", label: "About",               action: () => alert("Mo Hassan — Portfolio v1.0\nBuilt with Next.js, Tailwind, Framer Motion") },
    ],
  };
}

const MENU_NAMES = ["File", "Edit", "View", "Go", "Run", "Terminal", "Help"];

// ─── Dropdown ─────────────────────────────────────────────────────────
function Dropdown({
  entries,
  anchorRect,
  onClose,
}: {
  entries: MenuEntry[];
  anchorRect: DOMRect;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    // Small delay so the opening click doesn't immediately close
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const style: React.CSSProperties = {
    position: "fixed",
    top: anchorRect.bottom + 2,
    left: anchorRect.left,
    zIndex: 99999,
    minWidth: "220px",
    background: "#252526",
    border: "1px solid #454545",
    borderRadius: "4px",
    padding: "4px 0",
    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
    fontFamily: "var(--font-display)",
    fontSize: "13px",
    color: "#cccccc",
    userSelect: "none",
  };

  return (
    <div ref={ref} style={style}>
      {entries.map((entry, i) => {
        if (entry.type === "sep") {
          return <div key={i} style={{ height: "1px", background: "#454545", margin: "4px 0" }} />;
        }
        if (entry.type === "section") {
          return (
            <div key={i} style={{ padding: "4px 12px 2px", fontSize: "11px", color: "#858585", letterSpacing: "0.08em" }}>
              {entry.label}
            </div>
          );
        }
        // item
        const hasAction = !!entry.action;
        return (
          <div
            key={i}
            onClick={() => { entry.action?.(); onClose(); }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "4px 12px",
              cursor: hasAction ? "pointer" : "default",
              color: hasAction ? "#cccccc" : "#666666",
              borderRadius: "2px",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => { if (hasAction) (e.currentTarget as HTMLDivElement).style.background = "#094771"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {entry.icon && <span style={{ fontSize: "11px", opacity: 0.7 }}>{entry.icon}</span>}
              {entry.label}
            </span>
            {entry.shortcut && (
              <span style={{ fontSize: "11px", color: "#858585", marginLeft: "24px", whiteSpace: "nowrap" }}>
                {entry.shortcut}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── TitleBar ─────────────────────────────────────────────────────────
export function TitleBar({
  onToggleSidebar,
  onOpenPalette,
  onFileSelect,
  onCloseActiveTab,
  onCloseAllTabs,
  onToggleTerminal,
  onClearTerminal,
}: TitleBarProps) {
  const [openMenu, setOpenMenu] = useState<{ name: string; rect: DOMRect } | null>(null);
  const [closeMsg, setCloseMsg] = useState(false);
  const [closeMsgIdx, setCloseMsgIdx] = useState(0);

  const CLOSE_MESSAGES = [
    "why do you wanna leave so bad? 😭",
    "bro really tried to close a portfolio 💀",
    "there's nothing to close here lol 😅",
    "error 404: exit button not found 🚫",
    "you're stuck here forever. enjoy. 😈",
    "nice try. the tab stays. 😤",
  ];

  const menuActions = {
    openPalette:    () => { onOpenPalette(); setOpenMenu(null); },
    toggleSidebar:  () => { onToggleSidebar(); setOpenMenu(null); },
    goTo:           (id: FileId) => { onFileSelect(id); setOpenMenu(null); },
    closeActiveTab: () => { onCloseActiveTab(); setOpenMenu(null); },
    closeAllTabs:   () => { onCloseAllTabs(); setOpenMenu(null); },
    toggleTerminal: () => { onToggleTerminal(); setOpenMenu(null); },
    clearTerminal:  () => { onClearTerminal(); setOpenMenu(null); },
  };

  const MENUS = buildMenus(menuActions);

  const toggleMenu = useCallback((name: string, btn: HTMLButtonElement) => {
    if (openMenu?.name === name) {
      setOpenMenu(null);
    } else {
      setOpenMenu({ name, rect: btn.getBoundingClientRect() });
    }
  }, [openMenu]);

  return (
    <>
      <div
        className="flex flex-col select-none shrink-0 border-b"
        style={{
          background: "var(--vsc-titlebar-bg)",
          borderColor: "var(--vsc-border)",
          position: "relative",
          zIndex: openMenu ? 100000 : 1,
        }}
      >
        {/* Row 1 — Traffic lights + title text + search */}
        <div className="flex items-center" style={{ height: "36px" }}>
          {/* Traffic light buttons */}
          <div className="flex items-center gap-1.5 px-4 shrink-0">
            <button
              className="w-3 h-3 rounded-full transition-opacity hover:opacity-80 active:opacity-60 focus-visible:outline-none"
              style={{ background: "#ff5f57" }}
              aria-label="Close"
              onClick={() => {
                setCloseMsgIdx((prev) => (prev + 1) % CLOSE_MESSAGES.length);
                setCloseMsg(true);
                setTimeout(() => setCloseMsg(false), 5000);
              }}
            />
            <button
              className="w-3 h-3 rounded-full transition-opacity hover:opacity-80 active:opacity-60 focus-visible:outline-none"
              style={{ background: "#ffbd2e" }}
              aria-label="Minimize"
              onClick={() => {}}
            />
            <button
              className="w-3 h-3 rounded-full transition-opacity hover:opacity-80 active:opacity-60 focus-visible:outline-none"
              style={{ background: "#28c940" }}
              aria-label="Fullscreen"
              onClick={() => {
                if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
                else document.exitFullscreen().catch(() => {});
              }}
            />
          </div>

          {/* Inline close message */}
          <span
            className="hidden md:inline text-xs shrink-0 transition-all duration-500"
            style={{
              color: "#ff5f57",
              fontFamily: "var(--font-display)",
              opacity: closeMsg ? 1 : 0,
              maxWidth: closeMsg ? "260px" : "0px",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {CLOSE_MESSAGES[closeMsgIdx]}
          </span>


          {/* Centered search / command palette trigger */}
          <div className="flex-1 flex justify-center px-4">
            <button
              onClick={onOpenPalette}
              className="flex items-center gap-2 px-3 py-1 rounded text-xs transition-colors focus-visible:outline-none"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid var(--vsc-border)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-display)",
                maxWidth: "320px",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.borderColor = "#555";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
              }}
              title="Open Command Palette (Ctrl+P)"
              aria-label="Open Command Palette"
            >
              <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.6, flexShrink: 0 }}>
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.442 1.406a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
              </svg>
              <span className="truncate flex-1 text-left">Go to file or run command...</span>
              <kbd
                className="hidden md:inline-flex items-center gap-0.5 shrink-0 text-[9px] px-1 py-0.5 rounded"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Ctrl P
              </kbd>
            </button>
          </div>

          {/* Mobile sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden flex items-center justify-center w-9 h-full transition-colors mr-1 rounded focus-visible:outline-none"
            style={{ color: "var(--vsc-fg-muted)" }}
            aria-label="Toggle sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 4h12v1.5H2V4zm0 3.5h12V9H2V7.5zM2 11h12v1.5H2V11z" />
            </svg>
          </button>

          <div className="w-3 shrink-0" />
        </div>

        {/* Row 2 — Menu bar */}
        <div
          className="hidden md:flex items-center border-t"
          style={{ height: "26px", borderColor: "var(--vsc-border)", paddingLeft: "6px" }}
        >
          {MENU_NAMES.map((name) => (
            <button
              key={name}
              className="px-2.5 py-0.5 rounded text-xs cursor-default transition-colors focus-visible:outline-none"
              style={{
                color: openMenu?.name === name ? "var(--vsc-fg)" : "var(--vsc-fg-muted)",
                background: openMenu?.name === name ? "var(--vsc-active-bg)" : "transparent",
                fontFamily: "var(--font-display)",
              }}
              onMouseEnter={(e) => {
                if (openMenu && openMenu.name !== name) {
                  setOpenMenu({ name, rect: (e.currentTarget as HTMLButtonElement).getBoundingClientRect() });
                }
                if (!openMenu) {
                  (e.currentTarget as HTMLElement).style.background = "var(--vsc-hover-bg)";
                  (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)";
                }
              }}
              onMouseLeave={(e) => {
                if (!openMenu || openMenu.name !== name) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)";
                }
              }}
              onClick={(e) => toggleMenu(name, e.currentTarget as HTMLButtonElement)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown rendered at fixed position */}
      {openMenu && (
        <Dropdown
          entries={MENUS[openMenu.name] ?? []}
          anchorRect={openMenu.rect}
          onClose={() => setOpenMenu(null)}
        />
      )}
    </>
  );
}
