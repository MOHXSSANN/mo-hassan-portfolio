# Portfolio starter (Next.js + Tailwind)

This repository is a **portfolio website starter** built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

The goal is to mirror a modern personal portfolio layout (inspired by [aahanabobade-portfolio](https://aahanabobade-portfolio.vercel.app/)) using a clean component-driven approach.

---

## 🚀 Quick start

```bash
cd mo-hassan-portfolio
npm install
npm run dev
```

Then open: http://localhost:3000

---

## 🧩 Project structure

- `app/` — Next.js pages and layout
- `app/components/` — reusable components (Navbar, Hero, Projects, About, Footer)
- `app/lib/` — content-driven configuration (`siteConfig`, `projects`)
- `public/` — static assets

---

## 🎨 Design system

This repo includes reference docs to keep the UI consistent and to help AI-based generation:

- `DESIGN_SYSTEM.md` — color tokens, typography, spacing, button + card patterns
- `UI-KIT.md` — component rules and how to extend the kit
- `FRONTEND.md` — development workflow and AI prompting guidance

---

## ✨ Next steps (customize for yourself)

1. Update `app/lib/siteConfig.ts` with your name, bio, and links.
2. Add your real projects to `app/lib/projects.ts`.
3. Update the hero copy, About section, and project cards.
4. Add new pages and components as needed.

---

## 📦 Deployment

Build locally:

```bash
npm run build
npm run start
```

Deploy to Vercel / Netlify / any static host that supports Next.js.
