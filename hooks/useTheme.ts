"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeId =
  | "aahana-dark"
  | "rose-pine"
  | "tokyo-night"
  | "catppuccin"
  | "nord"
  | "gruvbox";

export interface Theme {
  id: ThemeId;
  name: string;
  emoji: string;
  dot: string;
  vars: Record<string, string>;
}

export const THEMES: Theme[] = [
  {
    id: "aahana-dark",
    name: "Crimson Cave",
    emoji: "🔥",
    dot: "#9d1515",
    vars: {
      "--vsc-editor-bg":      "#1e1e1e",
      "--vsc-sidebar-bg":     "#252526",
      "--vsc-titlebar-bg":    "#2d2d2d",
      "--vsc-activitybar-bg": "#333333",
      "--vsc-tab-active-bg":  "#1e1e1e",
      "--vsc-tab-inactive-bg":"#2d2d2d",
      "--vsc-statusbar-bg":   "#9d1515",
      "--vsc-statusbar-fg":   "rgba(255,255,255,0.95)",
      "--vsc-border":         "#3c3c3c",
      "--vsc-fg":             "#d4d4d4",
      "--vsc-fg-muted":       "#858585",
      "--vsc-fg-dim":         "#505050",
      "--vsc-red":            "#9d1515",
      "--vsc-red-light":      "#c0392b",
      "--vsc-red-glow":       "rgba(157,21,21,0.25)",
      "--vsc-active-bg":      "rgba(157,21,21,0.15)",
      "--vsc-selection":      "rgba(157,21,21,0.3)",
      "--vsc-focus-ring":     "rgba(157,21,21,0.5)",
    },
  },
  {
    id: "rose-pine",
    name: "Plum Petal",
    emoji: "🌹",
    dot: "#eb6f92",
    vars: {
      "--vsc-editor-bg":      "#191724",
      "--vsc-sidebar-bg":     "#1f1d2e",
      "--vsc-titlebar-bg":    "#26233a",
      "--vsc-activitybar-bg": "#26233a",
      "--vsc-tab-active-bg":  "#191724",
      "--vsc-tab-inactive-bg":"#26233a",
      "--vsc-statusbar-bg":   "#eb6f92",
      "--vsc-statusbar-fg":   "rgba(255,255,255,0.95)",
      "--vsc-border":         "#403d52",
      "--vsc-fg":             "#e0def4",
      "--vsc-fg-muted":       "#6e6a86",
      "--vsc-fg-dim":         "#6e6a86",
      "--vsc-red":            "#eb6f92",
      "--vsc-red-light":      "#eb6f92",
      "--vsc-red-glow":       "rgba(235,111,146,0.25)",
      "--vsc-active-bg":      "rgba(235,111,146,0.15)",
      "--vsc-selection":      "rgba(235,111,146,0.3)",
      "--vsc-focus-ring":     "rgba(235,111,146,0.5)",
    },
  },
  {
    id: "tokyo-night",
    name: "Neon Noir",
    emoji: "🏙️",
    dot: "#7aa2f7",
    vars: {
      "--vsc-editor-bg":      "#1a1b26",
      "--vsc-sidebar-bg":     "#16161e",
      "--vsc-titlebar-bg":    "#1f2335",
      "--vsc-activitybar-bg": "#1f2335",
      "--vsc-tab-active-bg":  "#1a1b26",
      "--vsc-tab-inactive-bg":"#1f2335",
      "--vsc-statusbar-bg":   "#3d59a1",
      "--vsc-statusbar-fg":   "rgba(255,255,255,0.95)",
      "--vsc-border":         "#292e42",
      "--vsc-fg":             "#c0caf5",
      "--vsc-fg-muted":       "#565f89",
      "--vsc-fg-dim":         "#3b4261",
      "--vsc-red":            "#3d59a1",
      "--vsc-red-light":      "#7aa2f7",
      "--vsc-red-glow":       "rgba(122,162,247,0.25)",
      "--vsc-active-bg":      "rgba(122,162,247,0.15)",
      "--vsc-selection":      "rgba(122,162,247,0.3)",
      "--vsc-focus-ring":     "rgba(122,162,247,0.5)",
    },
  },
  {
    id: "catppuccin",
    name: "Lavender Latte",
    emoji: "🐱",
    dot: "#cba6f7",
    vars: {
      "--vsc-editor-bg":      "#1e1e2e",
      "--vsc-sidebar-bg":     "#181825",
      "--vsc-titlebar-bg":    "#181825",
      "--vsc-activitybar-bg": "#181825",
      "--vsc-tab-active-bg":  "#1e1e2e",
      "--vsc-tab-inactive-bg":"#181825",
      "--vsc-statusbar-bg":   "#cba6f7",
      "--vsc-statusbar-fg":   "#1e1e2e",
      "--vsc-border":         "#313244",
      "--vsc-fg":             "#cdd6f4",
      "--vsc-fg-muted":       "#6c7086",
      "--vsc-fg-dim":         "#45475a",
      "--vsc-red":            "#cba6f7",
      "--vsc-red-light":      "#cba6f7",
      "--vsc-red-glow":       "rgba(203,166,247,0.25)",
      "--vsc-active-bg":      "rgba(203,166,247,0.15)",
      "--vsc-selection":      "rgba(203,166,247,0.3)",
      "--vsc-focus-ring":     "rgba(203,166,247,0.5)",
    },
  },
  {
    id: "nord",
    name: "Arctic Ash",
    emoji: "🧊",
    dot: "#88c0d0",
    vars: {
      "--vsc-editor-bg":      "#2e3440",
      "--vsc-sidebar-bg":     "#3b4252",
      "--vsc-titlebar-bg":    "#3b4252",
      "--vsc-activitybar-bg": "#2e3440",
      "--vsc-tab-active-bg":  "#2e3440",
      "--vsc-tab-inactive-bg":"#3b4252",
      "--vsc-statusbar-bg":   "#5e81ac",
      "--vsc-statusbar-fg":   "rgba(255,255,255,0.95)",
      "--vsc-border":         "#434c5e",
      "--vsc-fg":             "#eceff4",
      "--vsc-fg-muted":       "#9aa0b2",
      "--vsc-fg-dim":         "#616e88",
      "--vsc-red":            "#5e81ac",
      "--vsc-red-light":      "#88c0d0",
      "--vsc-red-glow":       "rgba(136,192,208,0.25)",
      "--vsc-active-bg":      "rgba(136,192,208,0.15)",
      "--vsc-selection":      "rgba(136,192,208,0.3)",
      "--vsc-focus-ring":     "rgba(136,192,208,0.5)",
    },
  },
  {
    id: "gruvbox",
    name: "Golden Grove",
    emoji: "🔥",
    dot: "#fabd2f",
    vars: {
      "--vsc-editor-bg":      "#282828",
      "--vsc-sidebar-bg":     "#1d2021",
      "--vsc-titlebar-bg":    "#32302f",
      "--vsc-activitybar-bg": "#32302f",
      "--vsc-tab-active-bg":  "#282828",
      "--vsc-tab-inactive-bg":"#32302f",
      "--vsc-statusbar-bg":   "#d65d0e",
      "--vsc-statusbar-fg":   "rgba(255,255,255,0.95)",
      "--vsc-border":         "#3c3836",
      "--vsc-fg":             "#ebdbb2",
      "--vsc-fg-muted":       "#928374",
      "--vsc-fg-dim":         "#504945",
      "--vsc-red":            "#cc241d",
      "--vsc-red-light":      "#fb4934",
      "--vsc-red-glow":       "rgba(251,73,52,0.25)",
      "--vsc-active-bg":      "rgba(250,189,47,0.15)",
      "--vsc-selection":      "rgba(250,189,47,0.3)",
      "--vsc-focus-ring":     "rgba(250,189,47,0.5)",
    },
  },
];

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
}

const STORAGE_KEY = "ide-theme";

export function useTheme() {
  const [themeId, setThemeId] = useState<ThemeId>("aahana-dark");

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && THEMES.find((t) => t.id === saved)) {
      setThemeId(saved);
      applyTheme(THEMES.find((t) => t.id === saved)!);
    }
  }, []);

  const changeTheme = useCallback((id: ThemeId) => {
    const theme = THEMES.find((t) => t.id === id);
    if (!theme) return;
    setThemeId(id);
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  return { themeId, changeTheme };
}
