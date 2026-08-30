/* Edge Utility: catalog data stays typed, indexed, and ready for licensed games later. */
export const gameCategories = ["All games", "Action", "Arcade", "Puzzle", "Strategy", "Sports", "Card"] as const;
export type GameCategory = (typeof gameCategories)[number];

export interface PlaceholderGame {
  id: string;
  title: string;
  category: Exclude<GameCategory, "All games">;
  accent: string;
  index: string;
}

export const gamePlaceholders: PlaceholderGame[] = [
  { id: "placeholder-01", title: "New title loading", category: "Arcade", accent: "orange", index: "01" },
  { id: "placeholder-02", title: "New title loading", category: "Puzzle", accent: "blue", index: "02" },
  { id: "placeholder-03", title: "New title loading", category: "Strategy", accent: "graphite", index: "03" },
  { id: "placeholder-04", title: "New title loading", category: "Action", accent: "slate", index: "04" },
  { id: "placeholder-05", title: "New title loading", category: "Sports", accent: "mist", index: "05" },
  { id: "placeholder-06", title: "New title loading", category: "Card", accent: "orange", index: "06" },
];

/** A playable catalog entry: a free, openly licensed HTML5 game embedded via iframe. */
export interface PlayableGame {
  id: string;
  title: string;
  category: Exclude<GameCategory, "All games">;
  index: string;
  description: string;
  /** Direct URL to the game's index.html, suitable for iframe embedding. */
  url: string;
  /** Attribution: project home and license. */
  source: string;
  license: string;
}

// Openly licensed HTML5 titles with stable public builds. Embedded unmodified with attribution.
export const playableGames: PlayableGame[] = [
  {
    id: "game-2048",
    title: "2048",
    category: "Puzzle",
    index: "01",
    description: "Slide numbered tiles and merge them until you reach 2048. Simple rules, endless depth.",
    url: "https://play2048.co/",
    source: "play2048.co — Gabriele Cirulli",
    license: "MIT",
  },
  {
    id: "game-hextris",
    title: "Hextris",
    category: "Arcade",
    index: "02",
    description: "A fast-paced hexagonal block stacker. Rotate the hexagon, match colors, survive the speed.",
    url: "https://hextris.io/",
    source: "hextris.io — Hextris Team",
    license: "GPL-3.0",
  },
  {
    id: "game-clumsy-bird",
    title: "Clumsy Bird",
    category: "Arcade",
    index: "03",
    description: "An open take on the one-tap flying classic. Tap to flap, thread the pipes, chase your best run.",
    url: "https://ellisonleao.github.io/clumsy-bird/",
    source: "github.com/ellisonleao/clumsy-bird",
    license: "MIT",
  },
  {
    id: "game-hexgl",
    title: "HexGL",
    category: "Action",
    index: "04",
    description: "A WebGL anti-gravity racer. Full-throttle future racing built entirely in the browser.",
    url: "https://hexgl.bkcore.com/play/",
    source: "github.com/BKcore/HexGL — Thibaut Despoulain",
    license: "MIT",
  },
  {
    id: "game-astray",
    title: "Astray",
    category: "Puzzle",
    index: "05",
    description: "Guide a marble through a WebGL maze. Momentum matters — the walls are slippery.",
    url: "https://wwwtyro.github.io/Astray/",
    source: "github.com/wwwtyro/Astray — Rye Terrell",
    license: "MIT",
  },
];

// Future games belong in this structure after license and permission review.
export const gamesDirectoryPath = "client/public/games/";
