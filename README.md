# Personal Portfolio

Single-page portfolio built with Next.js, React 19, TypeScript, Tailwind CSS, and shadcn/ui.

## Development

- `npm run dev` — dev server at http://localhost:3000
- `npm test` — run tests (Vitest)
- `npm run lint` — lint
- `npm run typecheck` — TypeScript check
- `npm run build` — production build

## Content

All content is code: `lib/site.ts` (name, tagline, links, bio) and `lib/projects.ts`
(projects). Edit, commit, redeploy.

Note: one dependency is intentionally pinned — `@vitejs/plugin-react` is held at
exactly `4.7.0` because newer major versions conflict with this dependency tree
(vite 7 via vitest, `@babel/core` ^7 via shadcn). Don't bump it during routine
dependency updates.

## Demo videos (Supabase Storage)

Demo videos live in a public Supabase Storage bucket (`demos`) and are
referenced by public URL in `lib/projects.ts`:

`https://<project-ref>.supabase.co/storage/v1/object/public/demos/<file>.mp4`

To add or replace a video: upload the file to the `demos` bucket in the
Supabase dashboard (Storage → demos → Upload files), copy its public URL,
and set it as the project's `videoUrl` in `lib/projects.ts`.

### Video export specs

MP4 (H.264), 1920×1080, 60fps preferred, no audio track, 15–30 s, clean
loop, under ~10 MB (≈4–6 Mbps).

## Deploy (Vercel)

1. Push this repo to GitHub.
2. https://vercel.com/new → import the repo → framework auto-detects
   Next.js → Deploy. No environment variables needed.
3. Optional: add a custom domain under Project → Settings → Domains, then
   update `site.url` in `lib/site.ts`.
