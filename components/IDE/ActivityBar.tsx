"use client";

import { useState } from "react";
import { Files, Search, GitBranch, Download, Cog, Bot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ActivityView } from "@/hooks/useIDEState";

interface ActivityBarProps {
  activeView: ActivityView;
  onViewChange: (view: ActivityView) => void;
  onToggleSidebar: () => void;
  onOpenPalette: () => void;
  onOpenSettings: () => void;
  settingsOpen: boolean;
  copilotOpen?: boolean;
  onToggleCopilot?: () => void;
}

type SidebarItem = { type: "view"; view: ActivityView; icon: React.ElementType; label: string };
type ActionItem  = { type: "action"; id: string; icon: React.ElementType; label: string; onClick: () => void };
type BarItem = SidebarItem | ActionItem;

export function ActivityBar({
  activeView,
  onViewChange,
  onToggleSidebar,
  onOpenPalette,
  onOpenSettings,
  settingsOpen,
  copilotOpen,
  onToggleCopilot,
}: ActivityBarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const topItems: BarItem[] = [
    {
      type: "view",
      view: "explorer",
      icon: Files,
      label: "Explorer",
    },
    {
      type: "action",
      id: "search",
      icon: Search,
      label: "Search (Ctrl+P)",
      onClick: onOpenPalette,
    },
    {
      type: "view",
      view: "git",
      icon: GitBranch,
      label: "Source Control",
    },
    {
      type: "action",
      id: "download",
      icon: Download,
      label: "Download Resume",
      onClick: () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Mo_Hassan_Resume.pdf";
        link.click();
      },
    },
  ];

  const getItemId = (item: BarItem) =>
    item.type === "view" ? item.view : item.id;

  const isActive = (item: BarItem) =>
    item.type === "view" && activeView === item.view;

  const handleClick = (item: BarItem) => {
    if (item.type === "action") {
      item.onClick();
    } else {
      onViewChange(item.view);
    }
  };

  return (
    <div
      className="hidden md:flex flex-col items-center justify-between py-1 shrink-0 border-r"
      style={{
        width: "56px",
        background: "var(--vsc-activitybar-bg)",
        borderColor: "var(--vsc-border)",
      }}
    >
      <div className="flex flex-col items-center gap-0.5 w-full">
        {topItems.map((item) => {
          const id = getItemId(item);
          const active = isActive(item);
          const isHovered = hovered === id;

          return (
            <Tooltip key={id}>
              <TooltipTrigger
                onClick={() => handleClick(item)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex items-center justify-center w-full focus-visible:outline-none"
                style={{
                  height: "56px",
                  color: active || isHovered ? "#ffffff" : "var(--vsc-fg-muted)",
                  borderLeft: active
                    ? "2px solid var(--vsc-red-light)"
                    : "2px solid transparent",
                  background: active
                    ? "var(--vsc-active-bg)"
                    : isHovered
                    ? "rgba(255,255,255,0.06)"
                    : "transparent",
                  cursor: "pointer",
                  transition: "color 0.15s, background 0.15s",
                }}
                aria-label={item.label}
              >
                <item.icon
                  size={26}
                  strokeWidth={1.4}
                  style={{
                    transform: isHovered ? "scale(1.15)" : "scale(1)",
                    transition: "transform 0.15s ease",
                  }}
                />
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={8}
                className="!bg-[#111] !text-white !border !border-[#555] !rounded !px-2.5 !py-1 !text-xs !font-sans shadow-lg"
              >
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Bottom: copilot + settings + profile */}
      <div className="flex flex-col items-center gap-0.5 w-full pb-1">
        {/* Copilot icon */}
        {onToggleCopilot && (
          <Tooltip>
            <TooltipTrigger
              onClick={onToggleCopilot}
              onMouseEnter={() => setHovered("copilot")}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center justify-center w-full focus-visible:outline-none"
              style={{
                height: "56px",
                cursor: "pointer",
                color:
                  copilotOpen || hovered === "copilot"
                    ? "var(--vsc-red-light)"
                    : "var(--vsc-fg-muted)",
                background: copilotOpen
                  ? "var(--vsc-active-bg)"
                  : hovered === "copilot"
                  ? "rgba(255,255,255,0.06)"
                  : "transparent",
                borderLeft: copilotOpen
                  ? "2px solid var(--vsc-red-light)"
                  : "2px solid transparent",
                transition: "color 0.15s, background 0.15s",
              }}
              aria-label="Mo's Copilot"
            >
              <Bot
                size={26}
                strokeWidth={1.4}
                style={{
                  transform: hovered === "copilot" ? "scale(1.15)" : "scale(1)",
                  transition: "transform 0.15s ease",
                }}
              />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={8}
              className="!bg-[#111] !text-white !border !border-[#555] !rounded !px-2.5 !py-1 !text-xs !font-sans shadow-lg"
            >
              Mo&apos;s Copilot
            </TooltipContent>
          </Tooltip>
        )}

        {/* Settings icon */}
        <Tooltip>
          <TooltipTrigger
            onClick={onOpenSettings}
            onMouseEnter={() => setHovered("settings")}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-center w-full focus-visible:outline-none"
            style={{
              height: "56px",
              cursor: "pointer",
              color: settingsOpen || hovered === "settings" ? "#ffffff" : "var(--vsc-fg-muted)",
              background: settingsOpen
                ? "var(--vsc-active-bg)"
                : hovered === "settings"
                ? "rgba(255,255,255,0.06)"
                : "transparent",
              borderLeft: settingsOpen
                ? "2px solid var(--vsc-red-light)"
                : "2px solid transparent",
              transition: "color 0.15s, background 0.15s",
            }}
            aria-label="Settings"
          >
            <Cog
              size={26}
              strokeWidth={1.4}
              style={{
                transform: hovered === "settings" ? "scale(1.15) rotate(30deg)" : "scale(1) rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={8}
            className="!bg-[#111] !text-white !border !border-[#555] !rounded !px-2.5 !py-1 !text-xs !font-sans shadow-lg"
          >
            Settings
          </TooltipContent>
        </Tooltip>

        {/* Profile */}
        <Tooltip>
          <TooltipTrigger
            onMouseEnter={() => setHovered("profile")}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-center w-full focus-visible:outline-none"
            style={{
              height: "56px",
              cursor: "pointer",
              background: hovered === "profile" ? "rgba(255,255,255,0.06)" : "transparent",
              transition: "background 0.15s",
            }}
            aria-label="Profile"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-bold"
              style={{
                background: "var(--vsc-red)",
                color: "white",
                fontSize: "10px",
                transform: hovered === "profile" ? "scale(1.15)" : "scale(1)",
                transition: "transform 0.15s ease",
              }}
            >
              MH
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={8}
            className="!bg-[#111] !text-white !border !border-[#555] !rounded !px-2.5 !py-1 !text-xs !font-sans shadow-lg"
          >
            Mo Hassan
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
