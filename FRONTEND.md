# Frontend Architecture & Workflow

This repository is a **Next.js (App Router) + Tailwind CSS** portfolio template.

## Stack

- **Next.js (v14+)** — App Router, edge-ready build.
- **TypeScript** — strong typing for UI components.
- **Tailwind CSS** — atomic styling with dark mode built-in.

## Development workflow

### Run locally

```bash
cd mo-hassan-portfolio
npm install
npm run dev
```

Then open: http://localhost:3000

### Extend the site

- Add new pages under `app/` (e.g. `app/projects/page.tsx`).
- Create reusable UI components in `app/components/`.
- Use `app/lib/siteConfig.ts` and `app/lib/projects.ts` to store content.

### Design system + AI guidance

Use these files as authoritative sources when working with an AI assistant:
- `UI-KIT.md` — how to build consistent components.
- `DESIGN_SYSTEM.md` — color tokens, typography, spacing.

When prompting an AI, include:

> “Use `UI-KIT.md` and `DESIGN_SYSTEM.md` as the design system reference. Keep the UI responsive and mobile-first, and use Tailwind utilities for layout and spacing.”

## Deployment

This app is ready to deploy to Vercel, Netlify, or any platform that supports Next.js.

```bash
npm run build
npm run start
```

---

### Next steps (suggested)

1. Replace placeholder text with your real name, role, and bio in `app/lib/siteConfig.ts`.
2. Add real projects to `app/lib/projects.ts`.
3. Update the hero and about sections to match your voice.
4. Update `public/` images or add new assets for your portfolio.
