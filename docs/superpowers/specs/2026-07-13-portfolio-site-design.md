# Personal Portfolio Site — Design Spec

**Date:** 2026-07-13
**Status:** Approved for planning

## Purpose

A personal portfolio website Brady can link from his resume. Recruiters land here, quickly understand who he is, see polished demos of his projects, and find ways to reach him. The site should read as beautiful, professional, and understated.

## Aesthetic

Inspired by react.doctor: single-page, typography-first, minimal.

- Near-black background, **dark mode only** (no theme toggle)
- Monospace-influenced type, thin dividers between sections, generous whitespace
- **Proper capitalization, punctuation, and grammar throughout** (standard sentence case; section headers may use small-caps/uppercase styling)
- Inline looping demo videos are the only "rich" element on the page — everything else stays quiet so the project demos stand out

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router), React 19, TypeScript |
| Styling/UI | Tailwind CSS + shadcn/ui, initialized with preset `b1au69eka` via `npx shadcn@latest init --preset b1au69eka` using the **Next.js** template (not Vite) |
| Media hosting | Supabase Storage — public bucket of MP4 demo clips served via CDN URL. No database, no auth; storage only |
| Testing | Vitest + React Testing Library |
| Linting | ESLint |
| Package manager | npm |
| Deployment | Vercel. Custom domain (e.g. bradyshimanek.com) optional, can be added anytime |

## Page Structure (single page, top to bottom)

1. **Header**
   - Name, one-line description of what he does
   - Plain text links: GitHub · LinkedIn · Email (mailto). No contact form.
2. **Projects** — a quiet list; each entry has:
   - Project name + one-line description
   - Inline `<video>` demo: autoplay, muted, loop, playsinline, sourced from Supabase Storage
   - Link out to live site/repo where one exists
   - Featured projects:
     - **Capture Studio** — screen recording & editing for macOS (with demo video)
     - **LC Finance** — brand-deal tracking for creators (with demo video)
     - **WebSketch2** — sketch/annotate on any website; shows a subtle "in development" badge; demo video optional until ready
3. **About**
   - A few sentences of bio. No fluff.

## Content Model

Project data (name, description, video URL, external links, status) lives in a single typed TypeScript file in the repo. Editing content = commit + redeploy. No CMS, no dynamic data fetching at runtime for content.

## Behavior Details

- Videos lazy-load and begin playing only when scrolled into view (IntersectionObserver); pause when out of view
- Fully responsive; on mobile, videos are inline and full-width
- Semantic HTML; complete metadata + Open Graph tags so links unfurl well and the site is Googleable by name

## Component Breakdown

- `app/page.tsx` — page composition
- `components/header.tsx` — name, tagline, contact links
- `components/project-list.tsx` / `components/project-entry.tsx` — renders projects from the data file
- `components/demo-video.tsx` — lazy-loading, in-view autoplay video element
- `lib/projects.ts` — typed project data (`Project` type: name, description, videoUrl?, href?, status)

## Error/Edge Handling

- A project without a `videoUrl` (WebSketch2) renders cleanly with no video slot
- Video element failures (bad URL, unsupported codec) degrade silently — entry still renders text and links
- `prefers-reduced-motion`: respect it by not autoplaying; show the video with controls instead

## Testing Strategy

- Vitest + RTL for components with logic: project list rendering from data (including no-video and in-development cases), demo-video lazy/in-view behavior (mocked IntersectionObserver)
- Static sections (header, about) verified by visual review

## Out of Scope

- Light mode, blog, skills section, resume download, contact form, CMS, analytics, view counters
- Supabase database features (auth, tables) — storage bucket only
