export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  website?: string;
  repo?: string;
  tags?: string[];
  featured?: boolean;
  status?: "live" | "wip" | "archived";
  year?: string;
  emoji?: string;
}

export const projects: Project[] = [
  {
    id: "radiance-vault",
    name: "Radiance Vault",
    description:
      "Secure document search and classification platform built for the Canada Border Services Agency. Enables Border Services Officers to label, index, and retrieve documents with real-time search, automated indexing, and document parsing pipelines (PDF, DOCX, MHTML, images) — optimized to sub-50ms query performance.",
    tech: ["Python", "Meilisearch", "PyWebView", "InstantSearch.js", "Starlette", "Tailwind CSS"],
    tags: ["FULL STACK", "GOVERNMENT", "SEARCH"],
    featured: true,
    status: "live",
    year: "2025",
    emoji: "🔍",
  },
  {
    id: "objectinsight",
    name: "ObjectInsight",
    description:
      "Browser-based real-time object detection application using the device camera. Implements live video inference with ML5.js, adjustable frame rates, responsive canvas resolution, and an intuitive UI allowing users to toggle AI detection and visualize detected objects in real time.",
    tech: ["JavaScript", "ML5.js", "HTML5", "CSS3", "Materialize CSS"],
    repo: "#",
    tags: ["AI / ML", "COMPUTER VISION", "WEB APP"],
    featured: true,
    status: "live",
    year: "2024",
    emoji: "👁️",
  },
  {
    id: "hospital-records",
    name: "Hospital Record Management System",
    description:
      "Console-based hospital record management system in C++ with file-based persistent storage using binary I/O. Supports adding, searching, displaying, modifying, deleting, and transposing patient records through a menu-driven interface.",
    tech: ["C++", "Binary I/O", "File Systems", "OOP"],
    repo: "#",
    tags: ["SYSTEMS", "C++", "DATA MANAGEMENT"],
    featured: false,
    status: "archived",
    year: "2023",
    emoji: "🏥",
  },
];
