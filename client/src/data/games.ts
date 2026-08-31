/* Edge Utility: every collection record carries its play mode, attribution, and license note. */
export const gameCategories = ["All games", "Action", "Arcade", "Puzzle", "Strategy", "Sports", "Card"] as const;
export type GameCategory = (typeof gameCategories)[number];

type GameCategoryValue = Exclude<GameCategory, "All games">;

export interface PlaceholderGame {
  id: string;
  title: string;
  category: GameCategoryValue;
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

export type GamePlayMode = "iframe" | "external";

/** A game that can be opened from the catalog. `iframe` is reserved for approved embeds. */
export interface PlayableGame {
  id: string;
  title: string;
  category: GameCategoryValue;
  index: string;
  description: string;
  /** Direct approved game URL. Iframe entries are only used when the source permits framing. */
  url: string;
  /** Human-readable attribution. */
  source: string;
  /** Project or provider license note. */
  license: string;
  /** Use an official link-out when iframe permission is not established. */
  mode: GamePlayMode;
  /** Optional source repository or project page. */
  sourceUrl?: string;
}

// Existing user-added iframe catalog. Keep these entries unchanged unless their source terms change.
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
    mode: "external",
    sourceUrl: "https://github.com/gabrielecirulli/2048",
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
    mode: "iframe",
    sourceUrl: "https://github.com/Hextris/Hextris",
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
    mode: "iframe",
    sourceUrl: "https://github.com/ellisonleao/clumsy-bird",
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
    mode: "iframe",
    sourceUrl: "https://github.com/BKcore/HexGL",
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
    mode: "iframe",
    sourceUrl: "https://github.com/wwwtyro/Astray",
  },
];

// Five browser-playable candidates selected from the user-provided open-source-games list.
// They open their official project pages until title-level iframe permission is confirmed.
export const externalGames: PlayableGame[] = [
  {
    id: "game-micropolis-js",
    title: "MicropolisJS",
    category: "Strategy",
    index: "06",
    description: "Build and manage a city in this HTML5 port of the open-source Micropolis project.",
    url: "https://www.graememcc.co.uk/micropolisJS/",
    source: "github.com/graememcc/micropolisJS",
    license: "GPL-3.0 with additional terms",
    mode: "external",
    sourceUrl: "https://github.com/graememcc/micropolisJS",
  },
  {
    id: "game-ancient-beast",
    title: "Ancient Beast",
    category: "Strategy",
    index: "07",
    description: "Command a squad of creatures in this free, browser-based turn-based strategy game.",
    url: "https://ancientbeast.com/",
    source: "github.com/FreezingMoon/AncientBeast",
    license: "Review project license before self-hosting",
    mode: "external",
    sourceUrl: "https://github.com/FreezingMoon/AncientBeast",
  },
  {
    id: "game-athena-crisis",
    title: "Athena Crisis",
    category: "Strategy",
    index: "08",
    description: "Play modern-retro tactical battles in an open-source strategy game made for the web.",
    url: "https://athenacrisis.com/",
    source: "github.com/nkzw-tech/athena-crisis",
    license: "Review project license before self-hosting",
    mode: "external",
    sourceUrl: "https://github.com/nkzw-tech/athena-crisis",
  },
  {
    id: "game-openpanzer",
    title: "OpenPanzer",
    category: "Strategy",
    index: "09",
    description: "Take command in a classic hex-and-turn-based strategy game that runs in modern browsers.",
    url: "https://openpanzer.itch.io/openpanzer",
    source: "github.com/nicupavel/openpanzer",
    license: "Review project license before self-hosting",
    mode: "external",
    sourceUrl: "https://github.com/nicupavel/openpanzer",
  },
  {
    id: "game-isocity",
    title: "IsoCity",
    category: "Arcade",
    index: "10",
    description: "Shape an isometric city in a richly detailed open-source HTML5 canvas builder.",
    url: "https://iso-city.com/",
    source: "github.com/amilich/isometric-city",
    license: "Review project license before self-hosting",
    mode: "external",
    sourceUrl: "https://github.com/amilich/isometric-city",
  },
];

export const allPlayableGames = [...playableGames, ...externalGames];
export const gamesDirectoryPath = "client/public/games/";
