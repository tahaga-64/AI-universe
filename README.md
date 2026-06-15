# AI News Universe

An immersive, Awwwards-inspired Next.js 15 experience where AI news items appear as interactive planets in a cinematic galaxy.

## Stack

- Next.js 15 App Router
- TypeScript with strict mode
- Tailwind CSS
- React Three Fiber, Three.js, and `@react-three/drei`
- GSAP entrance motion
- Framer Motion panels

## Features

- Full-screen animated landing hero
- Performance-conscious WebGL galaxy with stars, particles, ambient lighting, and slow camera drift
- Twenty mock AI news planets from OpenAI, Anthropic, Google, Meta, xAI, and Microsoft
- Hover previews, scale animation, glow states, and click selection
- Animated news detail drawer with category, source, impact score, and publication date
- Responsive premium dark interface

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
  app/              App Router pages, layout, global styles
  components/
    ui/             Reusable interface primitives and hero
    universe/       Three.js galaxy and planet components
    news/           News detail UI
  hooks/            Client state hooks
  lib/              Shared utilities
  types/            TypeScript domain types
  data/             Mock news data
```

## Data

Mock article data lives in `src/data/news.ts` and is typed by `src/types/news.ts`. Replace this file with a server-fetched feed when connecting a production news API.
