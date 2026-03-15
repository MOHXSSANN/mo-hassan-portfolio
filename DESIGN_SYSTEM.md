# Design System

This design system is intentionally minimal to keep the portfolio lightweight and easy to maintain.

## Tokens

### Colors
- `--background`: page background (light/dark)
- `--foreground`: default text color
- `--muted`: secondary text/highlight
- `--border`: element borders
- `--brand`: accent color (buttons, links)

These tokens are defined in `app/globals.css` inside the `:root` block.

### Typography
- Base font: `Geist` (loaded via `next/font/google` in `app/layout.tsx`)
- Headings use `font-semibold` with `tracking-tight`
- Body text uses `leading-relaxed` for comfortable reading

### Spacing
Use Tailwind spacing tokens:
- `p-4`, `py-8`, `px-6`
- `gap-6`, `gap-10`

## Component guidelines

### Buttons
- Primary: `bg-sky-600 text-white hover:bg-sky-700`
- Secondary: `border border-slate-200 bg-white text-slate-700` (dark mode adjusts accordingly)
- Use `rounded-full` for pill buttons and `px-5 py-3` for comfortable padding.

### Cards
- Use `rounded-2xl border border-slate-200 bg-white p-6 shadow-sm`.
- Dark mode uses `border-slate-800 bg-slate-950`.

### Layouts
- Wrap pages inside `max-w-6xl mx-auto px-4 sm:px-6`.
- Use section padding such as `py-20` to space between blocks.

## How to update this system
- Update tokens in `app/globals.css`.
- When changing tokens, keep the same Tailwind utility classes so the layout remains stable.

> For AI prompts: “Follow the design tokens and component patterns described in `DESIGN_SYSTEM.md` and `UI-KIT.md`.”
