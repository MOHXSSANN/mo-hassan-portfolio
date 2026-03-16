"use client";

import { FILES, type FileId } from "@/hooks/useIDEState";

interface MobileNavProps {
  activeFile: FileId;
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

export function MobileNav({ activeFile, onFileSelect }: MobileNavProps) {
  return (
    <nav
      className="flex md:hidden items-center justify-around shrink-0 border-t"
      style={{
        height: "56px",
        background: "var(--vsc-sidebar-bg)",
        borderColor: "var(--vsc-border)",
      }}
    >
      {FILES.map((file) => {
        const isActive = activeFile === file.id;
        const dotColor = EXT_COLORS[file.extension] ?? "#858585";

        return (
          <button
            key={file.id}
            onClick={() => onFileSelect(file.id)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors focus-visible:outline-none"
            style={{
              color: isActive ? "white" : "var(--vsc-fg-muted)",
              borderTop: isActive
                ? `2px solid ${dotColor}`
                : "2px solid transparent",
              background: isActive ? "var(--vsc-active-bg)" : "transparent",
            }}
            aria-label={file.filename}
          >
            {/* Colored dot */}
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: dotColor }}
            />
            <span
              className="font-bold"
              style={{
                fontSize: "9px",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
              }}
            >
              {file.shortLabel}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
