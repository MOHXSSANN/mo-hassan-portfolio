"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FileId } from "@/hooks/useIDEState";
import { HomeSection } from "@/components/sections/HomeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ReadmeSection } from "@/components/sections/ReadmeSection";

interface EditorCanvasProps {
  activeFile: FileId;
  onNavigate: (id: FileId) => void;
}

const SECTION_MAP: Record<FileId, React.ElementType> = {
  home:       HomeSection,
  about:      AboutSection,
  projects:   ProjectsSection,
  skills:     SkillsSection,
  experience: ExperienceSection,
  contact:    ContactSection,
  readme:     ReadmeSection,
};

export function EditorCanvas({ activeFile, onNavigate }: EditorCanvasProps) {
  const Section = SECTION_MAP[activeFile] ?? HomeSection;
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto overflow-x-hidden"
      style={{ background: "var(--vsc-editor-bg)" }}
      onWheel={(e) => {
        e.stopPropagation();
        if (scrollRef.current) scrollRef.current.scrollTop += e.deltaY;
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeFile}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="min-h-full"
        >
          <Section onNavigate={onNavigate} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
