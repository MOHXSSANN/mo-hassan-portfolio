"use client";

import { useCallback, useState } from "react";

export type FileId =
  | "home"
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact"
  | "readme";

export type ActivityView = "explorer" | "git";

export interface FileMetadata {
  id: FileId;
  filename: string;
  extension: string;
  iconColor: string;
  label: string;
  shortLabel: string;
}

export const FILES: FileMetadata[] = [
  { id: "home",       filename: "home.tsx",       extension: "tsx",  iconColor: "#4ec9b0", label: "home.tsx",       shortLabel: "HME" },
  { id: "about",      filename: "about.html",     extension: "html", iconColor: "#ce9178", label: "about.html",     shortLabel: "ABT" },
  { id: "projects",   filename: "projects.js",    extension: "js",   iconColor: "#dcdcaa", label: "projects.js",    shortLabel: "PRJ" },
  { id: "skills",     filename: "skills.json",    extension: "json", iconColor: "#6a9955", label: "skills.json",    shortLabel: "SKL" },
  { id: "experience", filename: "experience.ts",  extension: "ts",   iconColor: "#569cd6", label: "experience.ts",  shortLabel: "EXP" },
  { id: "contact",    filename: "contact.css",    extension: "css",  iconColor: "#c586c0", label: "contact.css",    shortLabel: "MSG" },
  { id: "readme",     filename: "README.md",      extension: "md",   iconColor: "#858585", label: "README.md",      shortLabel: "RMD" },
];

export const FILE_MAP = Object.fromEntries(FILES.map((f) => [f.id, f])) as Record<FileId, FileMetadata>;

const DEFAULT_FILE: FileId = "home";

export function useIDEState() {
  const [activeFile, setActiveFileState] = useState<FileId>(DEFAULT_FILE);
  const [openTabs, setOpenTabs] = useState<FileId[]>([DEFAULT_FILE]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activityView, setActivityView] = useState<ActivityView>("explorer");

  const setActiveFile = useCallback((id: FileId) => {
    setActiveFileState(id);
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const closeTab = useCallback((id: FileId) => {
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      if (next.length === 0) {
        setActiveFileState(DEFAULT_FILE);
        return [DEFAULT_FILE];
      }
      setActiveFileState((current) => {
        if (current === id) return next[next.length - 1];
        return current;
      });
      return next;
    });
  }, []);

  const closeAllTabs = useCallback(() => {
    setOpenTabs([DEFAULT_FILE]);
    setActiveFileState(DEFAULT_FILE);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return {
    activeFile,
    setActiveFile,
    openTabs,
    closeTab,
    closeAllTabs,
    sidebarOpen,
    toggleSidebar,
    activityView,
    setActivityView,
  };
}
