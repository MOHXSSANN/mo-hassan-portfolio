import { siteConfig } from "@/lib/siteConfig";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[85vh] bg-gradient-to-br from-white via-slate-50 to-slate-100 px-4 pt-24 pb-20 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-50"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
            Hi, I’m {siteConfig.name.split(" ")[0]}.
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {siteConfig.role}
          </h1>
          <p className="mt-6 max-w-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-sky-600/50 transition hover:bg-sky-700"
            >
              View projects
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Let’s connect
            </a>
          </div>
        </div>

        <div className="relative flex w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-10 shadow-xl shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-black/20">
          <div className="absolute inset-0 -z-10 opacity-70 blur-3xl"
               style={{
                 background:
                   "radial-gradient(circle at 40% 30%, rgba(59, 130, 246, 0.45), transparent 55%), radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.35), transparent 60%)",
               }}
          />
          <div className="flex max-w-full flex-col gap-4">
            <div className="h-40 w-full rounded-xl bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-transparent p-6">
              <p className="text-sm font-medium text-sky-700 dark:text-sky-200">Featured project</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                Responsive portfolio UI kit
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Tailwind-first layout, design tokens, and components for a modern
                personal site.
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Next.js', 'TypeScript', 'Tailwind', 'Responsive'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
