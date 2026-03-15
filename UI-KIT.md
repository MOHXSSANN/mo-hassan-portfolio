# UI Kit

This repo uses a simple system of reusable components and design tokens to keep the UI consistent, accessible, and easy to iterate on.

## 1. Core patterns

- **Spacing system**: Tailwind spacing (`p-4`, `gap-6`, etc.) keeps layout consistent.
- **Typography**:
  - Headings: `text-3xl` / `text-4xl` / `font-semibold`
  - Body: `text-base` / `leading-relaxed`
- **Color tokens**: Uses Tailwind defaults (`text-slate-900`, `bg-white`, `dark:bg-slate-950`) and custom variables in `globals.css`.

## 2. Common components

### Navbar
- Mobile-first hamburger menu.
- Transparent header that becomes opaque on scroll.
- Links are anchor-based (e.g. `#projects`).

### Hero
- Large headline + tagline.
- Primary CTA (scroll to projects) + secondary CTA (mailto).
- Visual card panel to suggest a featured project.

### Projects
- Cards: title, description, tech tags, optional links.
- Grid layout with 2 columns on desktop.

### About
- Two-column split: philosophies + quick stats.
- Uses a list of bullet points.

### Footer
- Contains contact links + quick context.

## 3. How to add a new component

1. Create a file in `app/components/`.
2. Use Tailwind utility classes for spacing + typography.
3. Add the component to `app/page.tsx`.
4. Add a story or documentation entry if you add Storybook.

## 4. Extending the kit

- Add new `projects` entries in `app/lib/projects.ts`.
- Update `siteConfig` in `app/lib/siteConfig.ts` to change names, links, etc.

> Tip: When prompting an AI, link to this file and say: “Use the UI Kit rules here when generating or updating components.”
