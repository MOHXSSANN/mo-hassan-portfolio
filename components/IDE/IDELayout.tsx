"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIDEState } from "@/hooks/useIDEState";
import { TitleBar } from "./TitleBar";
import { ActivityBar } from "./ActivityBar";
import { FileExplorer } from "./FileExplorer";
import { EditorTabs } from "./EditorTabs";
import { EditorCanvas } from "./EditorCanvas";
import { Terminal } from "./Terminal";
import { StatusBar } from "./StatusBar";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { SettingsPanel } from "./SettingsPanel";
import { CopilotPanel } from "./CopilotPanel";
import { CustomCursor } from "./CustomCursor";
import { useTheme } from "@/hooks/useTheme";

export function IDELayout() {
  const {
    activeFile, setActiveFile,
    openTabs, closeTab, closeAllTabs,
    sidebarOpen, toggleSidebar,
    activityView, setActivityView,
  } = useIDEState();

  const [paletteOpen,        setPaletteOpen]        = useState(false);
  const [settingsOpen,       setSettingsOpen]        = useState(false);
  const [terminalOpen,       setTerminalOpen]        = useState(false);
  const [terminalClearCount, setTerminalClearCount]  = useState(0);
  const [copilotOpen,        setCopilotOpen]         = useState(false);
  const { themeId, changeTheme } = useTheme();

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }
      if (e.key === "F11") {
        e.preventDefault();
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
        return;
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setSettingsOpen(false);
        setCopilotOpen(false);
        return;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleSidebar]);

  return (
    <TooltipProvider>
      <CustomCursor />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          display: "grid",
          height: "100dvh",
          width: "100vw",
          overflow: "hidden",
          background: "var(--vsc-editor-bg)",
          gridTemplateRows: "62px 1fr auto",
          gridTemplateColumns: "1fr",
        }}
      >
        {/* Row 1 — Title bar */}
        <TitleBar
          onToggleSidebar={toggleSidebar}
          onOpenPalette={() => setPaletteOpen(true)}
          onFileSelect={setActiveFile}
          activeFile={activeFile}
          onCloseActiveTab={() => closeTab(activeFile)}
          onCloseAllTabs={closeAllTabs}
          onToggleTerminal={() => setTerminalOpen((p) => !p)}
          onClearTerminal={() => setTerminalClearCount((c) => c + 1)}
        />

        {/* Row 2 — Main workspace */}
        <div style={{ display: "flex", overflow: "hidden", minHeight: 0 }}>
          {/* Activity bar */}
          <ActivityBar
            activeView={activityView}
            onViewChange={(view) => {
              if (!sidebarOpen) {
                setActivityView(view);
                toggleSidebar();
              } else if (activityView === view) {
                toggleSidebar();
              } else {
                setActivityView(view);
              }
            }}
            onToggleSidebar={toggleSidebar}
            onOpenPalette={() => setPaletteOpen(true)}
            onOpenSettings={() => setSettingsOpen((p) => !p)}
            settingsOpen={settingsOpen}
            copilotOpen={copilotOpen}
            onToggleCopilot={() => setCopilotOpen((p) => !p)}
          />

          {/* File explorer */}
          <FileExplorer
            activeFile={activeFile}
            onFileSelect={setActiveFile}
            isOpen={sidebarOpen}
            activityView={activityView}
          />

          {/* Editor column */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", minWidth: 0 }}>
            <EditorTabs
              openTabs={openTabs}
              activeFile={activeFile}
              onTabClick={setActiveFile}
              onTabClose={closeTab}
            />

            {/* Canvas shrinks when terminal is open */}
            <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <EditorCanvas
                activeFile={activeFile}
                onNavigate={setActiveFile}
              />
            </div>

            {/* Terminal panel */}
            <Terminal
              isOpen={terminalOpen}
              onClose={() => setTerminalOpen(false)}
              onFileOpen={setActiveFile}
              clearTrigger={terminalClearCount}
            />
          </div>

          {/* Copilot panel — slides in from the right */}
          <CopilotPanel
            isOpen={copilotOpen}
            onClose={() => setCopilotOpen(false)}
          />
        </div>

        {/* Row 3 — Status bar / Mobile nav */}
        <div className="shrink-0">
          <StatusBar activeFile={activeFile} themeId={themeId} onThemeChange={changeTheme} onToggleTerminal={() => setTerminalOpen((p) => !p)} />
          <MobileNav activeFile={activeFile} onFileSelect={setActiveFile} />
        </div>
      </motion.div>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        themeId={themeId}
        onThemeChange={changeTheme}
        onOpenPalette={() => setPaletteOpen(true)}
        onToggleTerminal={() => setTerminalOpen((p) => !p)}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) document.documentElement.requestFullscreen();
          else document.exitFullscreen();
        }}
      />

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onFileSelect={(id) => { setActiveFile(id); setPaletteOpen(false); }}
      />
    </TooltipProvider>
  );
}
