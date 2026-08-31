/* Edge Utility refinement: centered utility workspace, dotted paper texture, quiet list hierarchy, orange for signals only. */
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GameListRow, PlayableGameRow } from "@/components/GameListRow";
import { GamePlayerView } from "@/components/GamePlayerView";
import { gameCategories, gamePlaceholders, playableGames, type GameCategory, type PlayableGame } from "@/data/games";

const quickFilters = ["All games", "Action", "Arcade", "Puzzle", "Strategy", "Sports", "Card"] as const;
const sortOptions = ["Recently added", "A–Z", "Category"] as const;

type SortOption = (typeof sortOptions)[number];

function readGameFromUrl(): PlayableGame | null {
  const gameId = new URLSearchParams(window.location.search).get("game");
  return playableGames.find((game) => game.id === gameId) ?? null;
}

function PixelLoader() {
  // 5x5 pixel heart animating via a scanning highlight — pure CSS, no assets.
  const pattern = [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
  ];
  return (
    <div className="pixel-loader" role="status" aria-live="polite" aria-label="Fetching games">
      <div className="pixel-grid" aria-hidden="true">
        {pattern.flatMap((row, y) =>
          row.map((on, x) => (
            <span key={`${x}-${y}`} className={`pixel ${on ? "pixel-on" : ""}`} style={{ animationDelay: `${(x + y) * 90}ms` }} />
          )),
        )}
      </div>
      <p className="pixel-loader-text">Fetching games<span className="pixel-dots" aria-hidden="true" /></p>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GameCategory>("All games");
  const [sort, setSort] = useState<SortOption>("Recently added");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [activeGame, setActiveGame] = useState<PlayableGame | null>(() => readGameFromUrl());

  // Simulated fetch of the game catalog on page load.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Keep the player in sync with browser back/forward navigation.
  useEffect(() => {
    const onPopState = () => setActiveGame(readGameFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openGame = (game: PlayableGame) => {
    window.history.pushState({ gameId: game.id }, "", `?game=${game.id}`);
    setActiveGame(game);
    window.scrollTo({ top: 0 });
  };

  const closeGame = () => {
    if (window.location.search.includes("game=")) {
      window.history.pushState({}, "", window.location.pathname);
    }
    setActiveGame(null);
  };

  const visiblePlayable = useMemo(() => {
    const filtered = playableGames.filter((game) => {
      const matchesCategory = activeCategory === "All games" || game.category === activeCategory;
      const matchesQuery = `${game.title} ${game.category} ${game.description}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
    if (sort === "A–Z") return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Category") return [...filtered].sort((a, b) => a.category.localeCompare(b.category));
    return filtered;
  }, [activeCategory, query, sort]);

  const visiblePlaceholders = useMemo(() => {
    const filtered = gamePlaceholders.filter((game) => {
      const matchesCategory = activeCategory === "All games" || game.category === activeCategory;
      const matchesQuery = `${game.title} ${game.category}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
    return sort === "A–Z" ? [...filtered].sort((a, b) => a.category.localeCompare(b.category)) : filtered;
  }, [activeCategory, query, sort]);

  const visibleCount = visiblePlayable.length + visiblePlaceholders.length;

  if (loading) {
    return (
      <div className="page-loader min-h-screen bg-[#fbfbfa] text-[#151515]">
        <PixelLoader />
      </div>
    );
  }

  if (activeGame) {
    return <GamePlayerView game={activeGame} onBack={closeGame} />;
  }

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#151515]">
      <header className="page-enter border-b border-[#e7e7e4] bg-[#fbfbfa]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-5 sm:px-8">
          <a href="/" className="flex items-center gap-2.5" aria-label="VerGames home">
            <span className="brand-mark"><img src="/manus-storage/vergames-logo_60ac709a.png" alt="" /></span>
            <span className="font-display flex items-center text-[16px] font-bold tracking-[-0.06em]"><span>Ver</span><span className="wordmark-signal" aria-hidden="true" /><span>Games</span></span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] font-medium text-[#888a87] sm:flex"><a href="#library" className="transition-colors hover:text-[#1a1a1a]">Library</a><a href="#about" className="transition-colors hover:text-[#1a1a1a]">About</a><button className="transition-colors hover:text-[#1a1a1a]">Submit a game <span className="ml-1 text-[#b0b1ae]">↗</span></button></nav>
        </div>
      </header>

      <main id="library" className="dot-field min-h-[calc(100vh-64px)]">
        <div className="mx-auto max-w-[924px] px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pt-24">
          <section className="page-enter mb-10 sm:mb-12">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.65rem)] font-medium leading-[1.02] tracking-[-0.075em]">Find something to play<span className="text-[#f48120]">.</span></h1>
            <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-[#8a8b88]">A quiet corner for good browser games. Search the library, pick a category, and play right in the browser.</p>
          </section>

          <section aria-label="Game search and filters" className="page-enter page-enter-1">
            <div className="search-shell"><Search className="size-4 shrink-0 text-[#9a9c99]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games..." aria-label="Search games" className="h-9 border-0 bg-transparent px-3 text-[14px] shadow-none placeholder:text-[#b1b2ae] focus-visible:ring-0" />{query ? <button onClick={() => setQuery("")} className="rounded p-1 text-[#9a9c99] hover:text-[#171717]" aria-label="Clear search"><X className="size-4" /></button> : <kbd className="hidden rounded border border-[#ebebe8] bg-[#fafaf9] px-2 py-1 font-mono text-[10px] text-[#b1b2ae] sm:inline">⌘ K</kbd>}</div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-[#939591]">
              <button className={`filter-toggle ${showMoreFilters ? "filter-toggle-open" : ""}`} onClick={() => setShowMoreFilters(!showMoreFilters)} aria-expanded={showMoreFilters}>
                <SlidersHorizontal className="size-3.5" />
                <span>Filters</span>
                <ChevronDown className="size-3.5 filter-toggle-chevron" />
              </button>
              <span className="hidden text-[#d0d1cd] sm:inline">|</span>
              <div className="relative flex items-center gap-1"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="appearance-none bg-transparent py-2 pl-1 pr-5 font-medium text-[#636662] outline-none"><option>Recently added</option><option>A–Z</option><option>Category</option></select><ChevronDown className="pointer-events-none absolute right-0 size-3.5 text-[#a8aaa6]" /></div>
            </div>
            {showMoreFilters && (
              <div className="filter-panel filter-panel-anim"><Filter className="size-4 text-[#f48120]" /><span>Advanced filters will be available when more games arrive.</span></div>
            )}
          </section>

          <section className="page-enter page-enter-2 mt-8" aria-live="polite">
            <div className="mb-3 flex items-center justify-between"><p className="section-kicker">Game library</p><span className="font-mono text-[10px] tracking-[0.12em] text-[#b2b3af]">{String(visibleCount).padStart(2, "0")} TITLES</span></div>
            {visibleCount > 0 ? (
              <div className="space-y-3">
                {visiblePlayable.map((game) => <PlayableGameRow key={game.id} game={game} onPlay={openGame} />)}
                {visiblePlaceholders.map((game) => <GameListRow key={game.id} game={game} />)}
              </div>
            ) : <div className="empty-list"><p className="font-display text-lg font-medium tracking-[-0.04em]">No games match that search.</p><button onClick={() => { setQuery(""); setActiveCategory("All games"); }} className="mt-3 text-sm font-semibold text-[#6d706b] underline decoration-[#f48120] decoration-2 underline-offset-4">Clear filters</button></div>}
          </section>

          <section id="about" className="page-enter page-enter-3 mt-16 border-t border-[#e5e5e2] pt-5"><div className="flex items-center justify-between gap-4 text-[12px] text-[#a0a19d]"><span>New games will appear here as the library grows.</span><span className="hidden items-center gap-1 font-medium text-[#858782] sm:flex">Browse the index <ArrowRight className="size-3.5" /></span></div></section>
        </div>
      </main>
      <footer className="border-t border-[#e7e7e4] bg-[#fbfbfa]"><div className="mx-auto flex max-w-[1100px] justify-between px-5 py-6 text-[11px] text-[#a4a5a1] sm:px-8"><span>© 2026 VerGames</span><span>Free to play · Built for the browser</span></div></footer>
    </div>
  );
}

export default App;
