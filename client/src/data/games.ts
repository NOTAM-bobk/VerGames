/* Edge Utility: collection records keep playable links, source attribution, and rights notes together. */
export const gameCategories = ["All games", "Action", "Arcade", "Puzzle", "Strategy", "Sports", "Card"] as const;
export type GameCategory = (typeof gameCategories)[number];

export interface CatalogGame {
  id: string;
  title: string;
  category: Exclude<GameCategory, "All games">;
  description: string;
  index: string;
  playUrl: string;
  sourceUrl: string;
  license: string;
  sourceLabel: string;
}

export const catalogGames: CatalogGame[] = [
  {
    id: "micropolis-js",
    title: "MicropolisJS",
    category: "Strategy",
    description: "Build and manage a city in this HTML5 port of the open-source Micropolis project.",
    index: "01",
    playUrl: "https://www.graememcc.co.uk/micropolisJS/",
    sourceUrl: "https://github.com/graememcc/micropolisJS",
    license: "GPL-3.0 with additional terms",
    sourceLabel: "Open Source Games list",
  },
  {
    id: "ancient-beast",
    title: "Ancient Beast",
    category: "Strategy",
    description: "Command a squad of creatures in this free, browser-based turn-based strategy game.",
    index: "02",
    playUrl: "https://ancientbeast.com/",
    sourceUrl: "https://github.com/FreezingMoon/AncientBeast",
    license: "Review project license before self-hosting",
    sourceLabel: "Open Source Games list",
  },
  {
    id: "athena-crisis",
    title: "Athena Crisis",
    category: "Strategy",
    description: "Play modern-retro tactical battles in an open-source strategy game made for the web.",
    index: "03",
    playUrl: "https://athenacrisis.com/",
    sourceUrl: "https://github.com/nkzw-tech/athena-crisis",
    license: "Review project license before self-hosting",
    sourceLabel: "Open Source Games list",
  },
  {
    id: "openpanzer",
    title: "OpenPanzer",
    category: "Strategy",
    description: "Take command in a classic hex-and-turn-based strategy game that runs in modern browsers.",
    index: "04",
    playUrl: "https://openpanzer.itch.io/openpanzer",
    sourceUrl: "https://github.com/nicupavel/openpanzer",
    license: "Review project license before self-hosting",
    sourceLabel: "Open Source Games list",
  },
  {
    id: "isocity",
    title: "IsoCity",
    category: "Arcade",
    description: "Shape an isometric city in a richly detailed open-source HTML5 canvas builder.",
    index: "05",
    playUrl: "https://iso-city.com/",
    sourceUrl: "https://github.com/amilich/isometric-city",
    license: "Review project license before self-hosting",
    sourceLabel: "Open Source Games list",
  },
];

// Future self-hosted games belong in this structure after a title-level license review.
export const gamesDirectoryPath = "client/public/games/";
