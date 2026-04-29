# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint
npm start        # Start production server
```

## Architecture

**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui (Radix UI) + React 19

### Site Configuration

`site-config.json` is the single source of truth for portfolio content: name, job titles, bio, social links, SEO metadata, and Google Analytics ID. Most personalisation lives here, not in component files.

### Routing

| Route | Type | Description |
|---|---|---|
| `/` | Page | Home — hero, tech list, services, projects, contact sections |
| `/blog` | Page | Blog listing |
| `/blog/[slug]` | Dynamic page | Markdown blog post renderer |
| `/api/contact` | Route handler | POSTs to Discord webhook (`DISCORD_WEBHOOK_URL` in `.env`) |
| `/courses/register` | Route handler | Course registration redirect |

### Blog System

Blog posts are Markdown files in `/assets/blogs/` with YAML frontmatter (title, date, excerpt). `lib/blog.ts` exposes `getAllPosts()` and `getPostBySlug()` which read from the filesystem at build/request time. Rendering uses `react-markdown` with rehype plugins for syntax highlighting, heading slugs, and auto-linked headings.

### Styling

Tailwind CSS with CSS custom properties for theming (dark/light via `next-themes`). Theme tokens are defined in `tailwind.config.ts` and consumed via Tailwind utility classes. shadcn/ui components live in `components/ui/`.

### Component Layout

- `app/layout.tsx` — root layout wrapping all pages with `Header`, `Footer`, and `ThemeProvider`
- `components/` — section components (Hero, TechList, Services, Projects, Contact) + shadcn `ui/` primitives
- `lib/` — `blog.ts` (post loading), `utils.ts` (cn helper)
- `assets/blogs/` — Markdown blog posts
- `assets/tech/` — technology icon images
