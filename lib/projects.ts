export type Project = {
  name: string;
  description: string;
  tech: string[];
  website?: string;
  repo?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    name: "Portfolio Website",
    description:
      "A fast, responsive portfolio built with Next.js, Tailwind, and a component-driven design system.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    website: "#",
    repo: "#",
  },
  {
    name: "Design System Library",
    description:
      "A reusable component system that keeps UI consistent across landing pages, dashboards, and marketing websites.",
    tech: ["React", "Tailwind", "Storybook"],
  },
  {
    name: "API Dashboard",
    description:
      "A dashboard for tracking API performance, errors, and usage analytics with charts and real-time updates.",
    tech: ["Next.js", "React Query", "Chart.js"],
  },
];
