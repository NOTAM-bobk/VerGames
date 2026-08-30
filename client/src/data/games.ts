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

// Future games belong in this structure after license and permission review.
export const gamesDirectoryPath = "client/public/games/";
