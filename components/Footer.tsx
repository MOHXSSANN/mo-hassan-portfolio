import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {siteConfig.name}
          </p>
          <p className="text-xs leading-relaxed">
            Built with Next.js + Tailwind. Designed to be fast, accessible, and easy to extend.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span>Find me:</span>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            GitHub
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
