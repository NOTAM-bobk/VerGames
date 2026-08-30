# VerGames

VerGames is a minimalist browser-game platform MVP built with React, TypeScript, Tailwind CSS, and Vite. The first release is intentionally a catalog shell: it includes search, category navigation, filters, responsive skeleton cards, a future self-hosted game directory, and a Vercel deployment configuration. No games are included yet.

## Local development

```bash
pnpm install
pnpm dev
```

The production build can be checked with:

```bash
pnpm check
pnpm build
```

## Deploy to Vercel

Import this GitHub repository into Vercel, keep the framework as Vite, and deploy from the `main` branch. The included `vercel.json` sets the build command to `pnpm build`, points Vercel at `dist/public`, and rewrites client-side routes to `index.html`.

The project also works with Vercel’s Git integration: pull requests receive preview deployments and merges to the production branch create a production deployment.

## Adding games later

Future self-hosted HTML5 builds belong in `client/public/games/<slug>/` and should include an `index.html` entry point. Provider embeds should be added through a typed catalog record and the reusable player component once the provider’s permission, license, attribution, domain, and advertising terms have been documented.

Do not copy games from another portal merely because they can be viewed in a browser. Before adding a title, record written permission or an explicit license for its code and every bundled asset, preserve attribution, and confirm whether provider ads or branding must remain intact.

## Visual direction

The interface follows the **Edge Utility** direction: Swiss/infrastructure-inspired layout, cloud-white surfaces, graphite typography, thin technical dividers, Space Grotesk for display hierarchy, DM Sans for interface copy, and VerGames Orange (`#F48120`) for active states and play signals.

## Repository structure

```text
client/src/App.tsx                 Main catalog shell
client/src/components/             Reusable interface components
client/src/data/games.ts           Typed category and placeholder data
client/public/games/               Reserved for future self-hosted game builds
vercel.json                        Vercel build/output/routing configuration
ideas.md                           Design system and style decisions
```
