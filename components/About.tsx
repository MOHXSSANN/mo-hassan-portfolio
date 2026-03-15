import { siteConfig } from "@/lib/siteConfig";

const highlights = [
  "User‑first interface design with accessibility baked in.",
  "Component-driven development using Tailwind and design tokens.",
  "Performance-first pages with server-side rendering and static export.",
  "Collaborative workflow: Figma / Storybook / Git + PR-driven iteration.",
];

export function About() {
  return (
    <section id="about" className="bg-slate-50 py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            About
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            I build modern web interfaces that feel fast, accessible, and polished.
            I also care deeply about scalable design systems and clear developer
            experience.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Core philosophies
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-600" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Quick stats
            </h3>
            <dl className="mt-6 grid grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <dt className="font-medium text-slate-900 dark:text-white">Experience</dt>
                <dd className="mt-1">5+ years building web products</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900 dark:text-white">Stacks</dt>
                <dd className="mt-1">React, Next.js, Tailwind, Node.js</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900 dark:text-white">Design</dt>
                <dd className="mt-1">Figma, design systems, accessibility</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900 dark:text-white">Dev tools</dt>
                <dd className="mt-1">Storybook, GitHub, CI/CD</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
