export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
  type: "full-time" | "contract" | "internship" | "freelance";
}

export const experience: ExperienceEntry[] = [
  {
    company: "Canada Border Services Agency (CBSA)",
    role: "Junior Developer",
    period: "Apr. 2025 — Present",
    location: "Ottawa, ON",
    description:
      "Collaborating in an agile team to design and implement Radiance Vault — a full-stack document management and search system used by Border Services Officers.",
    achievements: [
      "Developed backend services in Python (Typer, Starlette, Shiny) and built a cross-platform desktop UI using PyWebView",
      "Integrated Meilisearch for real-time, typo-tolerant search and configured secure API key-based authentication",
      "Designed a document ingestion pipeline supporting PDF, DOCX, MHTML, and image formats",
      "Optimized query performance to sub-50ms through process orchestration and structured logging",
      "Implemented microservices-inspired architecture with automated indexing and secure document classification",
    ],
    tech: ["Python", "Meilisearch", "PyWebView", "Starlette", "Typer", "Shiny", "InstantSearch.js", "Tailwind CSS"],
    type: "internship",
  },
  {
    company: "March Networks",
    role: "Solutions Test Specialist",
    period: "Sep. 2024 — Apr. 2025",
    location: "Ottawa, ON",
    description:
      "Designed and executed comprehensive test plans for enterprise-grade video surveillance and network management systems in a fast-paced agile environment.",
    achievements: [
      "Designed detailed test plans and cases in JIRA and XRAY, ensuring full coverage of requirements and functionality",
      "Conducted end-to-end testing for advanced video surveillance systems including Linux/Windows DVRs, NVRs, and enterprise-grade servers",
      "Developed and executed both manual and automated test cases during regression and sanity testing cycles",
      "Assisted clients with network configurations, NAT traversal, and firewall troubleshooting for seamless integration",
    ],
    tech: ["JIRA", "XRAY", "Linux", "Windows", "Networking", "QA Automation"],
    type: "full-time",
  },
];
