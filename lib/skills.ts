export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  key: string;
  name: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: "languages",
    name: "Languages",
    color: "#e05a5a",
    skills: [
      { name: "Python",             level: 90 },
      { name: "JavaScript",         level: 88 },
      { name: "TypeScript",         level: 85 },
      { name: "C / C++",            level: 78 },
      { name: "SQL / MySQL",        level: 80 },
      { name: "HTML5 / CSS3",       level: 88 },
      { name: "Java",               level: 70 },
      { name: "R",                  level: 65 },
    ],
  },
  {
    key: "frameworks",
    name: "Frameworks & Libraries",
    color: "#c0392b",
    skills: [
      { name: "React.js",           level: 85 },
      { name: "Node.js",            level: 82 },
      { name: "Express.js",         level: 80 },
      { name: "Angular",            level: 70 },
      { name: "Tailwind CSS",       level: 90 },
      { name: "Shiny (Python)",     level: 75 },
      { name: "PyWebView",          level: 78 },
      { name: "Starlette",          level: 76 },
    ],
  },
  {
    key: "backend_search",
    name: "Backend & Search",
    color: "#9d1515",
    skills: [
      { name: "Meilisearch",        level: 85 },
      { name: "REST APIs",          level: 90 },
      { name: "InstantSearch.js",   level: 80 },
      { name: "Pydantic",           level: 35 },
      { name: "Typer (CLI)",        level: 30 },
      { name: "ML5.js",             level: 28 },
    ],
  },
  {
    key: "tools_devops",
    name: "Tools & DevOps",
    color: "#e07a5a",
    skills: [
      { name: "Git / GitHub",       level: 92 },
      { name: "Linux",              level: 82 },
      { name: "Docker",             level: 75 },
      { name: "JIRA",               level: 88 },
      { name: "XRAY",               level: 85 },
    ],
  },
  {
    key: "cybersecurity",
    name: "Cybersecurity",
    color: "#cc3333",
    skills: [
      { name: "Secure API Design",  level: 82 },
      { name: "Network Config",     level: 78 },
      { name: "NAT / Firewall",     level: 75 },
      { name: "Auth & Access Ctrl", level: 32 },
      { name: "QA / Pen Testing",   level: 72 },
    ],
  },
  {
    key: "testing",
    name: "Testing & QA",
    color: "#b52020",
    skills: [
      { name: "Test Planning",      level: 88 },
      { name: "Regression Testing", level: 85 },
      { name: "Automated Testing",  level: 78 },
      { name: "Sanity Testing",     level: 88 },
      { name: "End-to-End Testing", level: 82 },
    ],
  },
];

export const alsoFamiliarWith = [
  "C#", "Binary I/O", "File Systems", "OOP",
  "Materialize CSS", "Canvas API", "Computer Vision",
  "Document Parsing", "PDF / DOCX Processing", "MHTML",
  "Process Orchestration", "Structured Logging", "Microservices",
  "Real-time Search", "Typo-tolerant Search", "API Key Auth",
  "Agile / Scrum", "CU Blueprint", "Video Surveillance Systems",
  "NAT Traversal", "DVR / NVR Testing",
];
