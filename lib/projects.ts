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
    id: "mo-hassan-portfolio",
    name: "VS Code Portfolio",
    description:
      "This portfolio — built as a fully interactive VS Code IDE in the browser. Features a file explorer, tabbed editor, interactive terminal, command palette, theme switcher, source control panel with live GitHub data, and custom cursor.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    repo: "https://github.com/MOHXSSANN/mo-hassan-portfolio",
    website: "https://mo-hassan-portfolio-chi.vercel.app/",
    tags: ["FULL STACK", "UI/UX", "META"],
    featured: true,
    status: "live",
    year: "2026",
    emoji: "💻",
  },
  {
    id: "ovr-site",
    name: "Ottawa Volleyball Revival",
    description:
      "Drop-in volleyball registration website with Stripe payment integration, session management, and real-time seat availability. Built for an Ottawa recreational sports community.",
    tech: ["JavaScript", "Stripe", "Node.js", "Vercel"],
    website: "https://ovr-site.vercel.app",
    tags: ["FULL STACK", "PAYMENTS", "WEB APP"],
    featured: true,
    status: "live",
    year: "2025",
    emoji: "🏐",
  },
  {
    id: "the-dessert-chapter",
    name: "The Dessert Chapter",
    description:
      "A beautifully designed dessert recipe and ordering website. Features a clean, responsive layout with smooth transitions and a curated collection of recipes.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/MOHXSSANN/the-dessert-chapter",
    website: "https://the-dessert-chapter.vercel.app",
    tags: ["FRONTEND", "UI/UX"],
    featured: false,
    status: "live",
    year: "2026",
    emoji: "🍰",
  },
  {
    id: "objectinsight",
    name: "ObjectInsight",
    description:
      "Browser-based real-time object detection using the device camera. Implements live video inference with ML5.js, adjustable frame rates, responsive canvas rendering, and toggle controls — no backend required.",
    tech: ["JavaScript", "ML5.js", "HTML5", "CSS3"],
    repo: "https://github.com/MOHXSSANN/ObjectInsight",
    tags: ["AI / ML", "COMPUTER VISION", "WEB APP"],
    featured: true,
    status: "live",
    year: "2024",
    emoji: "👁️",
  },
  {
    id: "tunesync",
    name: "TuneSync",
    description:
      "iTunes API music search app that lets users discover and preview songs, albums, and artists. Features a clean interface with real-time search results and audio playback.",
    tech: ["JavaScript", "iTunes API", "HTML5", "CSS3"],
    repo: "https://github.com/MOHXSSANN/TuneSync",
    tags: ["API", "MUSIC", "WEB APP"],
    featured: false,
    status: "live",
    year: "2024",
    emoji: "🎵",
  },
  {
    id: "phantom-pulse",
    name: "Phantom Pulse",
    description:
      "Multi-threaded ghost hunt communication simulation in C using POSIX threads, mutex locks, and semaphores. Models concurrent ghost detection events across rooms with thread-safe shared state.",
    tech: ["C", "POSIX Threads", "Mutex", "Semaphores"],
    repo: "https://github.com/MOHXSSANN/Phantom-Pulse",
    tags: ["SYSTEMS", "CONCURRENCY", "C"],
    featured: false,
    status: "archived",
    year: "2024",
    emoji: "👻",
  },
  {
    id: "hotel-recommendation",
    name: "Hotel Recommendation System",
    description:
      "NLP-powered hotel recommendation engine that analyzes guest reviews to surface the most relevant properties. Uses sentiment analysis and keyword extraction to match user preferences.",
    tech: ["Python", "Pandas", "NLP", "Scikit-learn", "Jupyter"],
    repo: "https://github.com/MOHXSSANN/Hotel-Recommendation",
    tags: ["AI / ML", "NLP", "DATA SCIENCE"],
    featured: false,
    status: "archived",
    year: "2024",
    emoji: "🏨",
  },
  {
    id: "crypto-predictor",
    name: "CryptoPredictor",
    description:
      "Machine learning model for cryptocurrency price prediction using historical OHLCV data. Implements LSTM neural networks and technical indicators to forecast short-term price movements.",
    tech: ["Python", "TensorFlow", "Pandas", "Jupyter", "Matplotlib"],
    repo: "https://github.com/MOHXSSANN/CryptoPredictor",
    tags: ["AI / ML", "FINANCE", "DATA SCIENCE"],
    featured: false,
    status: "archived",
    year: "2023",
    emoji: "📈",
  },
  {
    id: "hypercurl",
    name: "HyperCurl",
    description:
      "Lightweight JavaScript HTTP client utility inspired by curl. Provides a simple, chainable API for making fetch requests with built-in error handling, retries, and response parsing.",
    tech: ["JavaScript", "Fetch API", "CLI"],
    repo: "https://github.com/MOHXSSANN/HyperCurl",
    tags: ["TOOLING", "DEVELOPER TOOLS"],
    featured: false,
    status: "archived",
    year: "2023",
    emoji: "🔌",
  },
  {
    id: "hospital-records",
    name: "Hospital Record Management",
    description:
      "Console-based hospital record management system in C++ with file-based persistent storage using binary I/O. Supports adding, searching, modifying, and deleting patient records through a menu-driven interface.",
    tech: ["C++", "Binary I/O", "File Systems", "OOP"],
    repo: "https://github.com/MOHXSSANN/Hospital-management",
    tags: ["SYSTEMS", "C++", "DATA MANAGEMENT"],
    featured: false,
    status: "archived",
    year: "2023",
    emoji: "🏥",
  },
  {
    id: "raven-rank",
    name: "Raven Rank",
    description:
      "Carleton University grade distributions, professor ratings, and course data. Helps students make informed decisions when picking courses and professors.",
    tech: ["TypeScript", "Next.js", "Vercel"],
    repo: "https://github.com/MOHXSSANN/ravenrank",
    website: "https://ravenrank.vercel.app/",
    tags: ["FULL STACK", "EDUCATION", "WEB APP"],
    featured: true,
    status: "live",
    year: "2026",
    emoji: "🐦",
  },
  {
    id: "country-anki",
    name: "CountryAnki",
    description:
      "Interactive flashcard app for learning countries, capitals, and flags. Features spaced repetition and quiz modes to reinforce geography knowledge.",
    tech: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/MOHXSSANN/CountryAnki-",
    website: "https://mohxssann.github.io/CountryAnki-/",
    tags: ["EDUCATION", "WEB APP"],
    featured: false,
    status: "live",
    year: "2026",
    emoji: "🌍",
  },
];
