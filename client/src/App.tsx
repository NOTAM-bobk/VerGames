/* Edge Utility refinement: centered utility workspace, dotted paper texture, quiet list hierarchy, orange for signals only. */
import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GameListRow, PlayableGameRow } from "@/components/GameListRow";
import { gameCategories, gamePlaceholders, playableGames, type GameCategory, type PlayableGame } from "@/data/games";

const quickFilters = ["All games", "Action", "Arcade", "Puzzle", "Strategy", "Sports", "Card"] as const;
const sortOptions = ["Recently added", "A–Z", "Category"] as const;

type SortOption = (typeof sortOptions)[number];

function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GameCategory>("All games");
  const [sort, setSort] = useState<SortOption>("Recently added");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [activeGame, setActiveGame] = useState<PlayableGame | null>(null);

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

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#151515]">
      <header className="border-b border-[#e7e7e4] bg-[#fbfbfa]/95 backdrop-blur-xl">
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
          <section className="mb-10 sm:mb-12">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.65rem)] font-medium leading-[1.02] tracking-[-0.075em]">Find something to play<span className="text-[#f48120]">.</span></h1>
            <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-[#8a8b88]">A quiet corner for good browser games. Search the library, pick a category, and play right in the browser.</p>
          </section>

          <section aria-label="Game search and filters">
            <div className="search-shell"><Search className="size-5 shrink-0 text-[#9a9c99]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games..." aria-label="Search games" className="h-12 border-0 bg-transparent px-3 text-[15px] shadow-none placeholder:text-[#b1b2ae] focus-visible:ring-0" />{query ? <button onClick={() => setQuery("")} className="rounded p-1 text-[#9a9c99] hover:text-[#171717]" aria-label="Clear search"><X className="size-4" /></button> : <kbd className="hidden rounded border border-[#ebebe8] bg-[#fafaf9] px-2 py-1 font-mono text-[10px] text-[#b1b2ae] sm:inline">⌘ K</kbd>}</div>
            <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-[12px] text-[#939591]">
              <button className="filter-icon-button" onClick={() => setShowMoreFilters(!showMoreFilters)} aria-label="Toggle more filters"><SlidersHorizontal className="size-4" /></button>
              {quickFilters.map((filter) => <button key={filter} onClick={() => setActiveCategory(filter)} className={`reference-filter ${activeCategory === filter ? "reference-filter-active" : ""}`}>{filter}</button>)}
              <span className="mx-2 hidden text-[#d0d1cd] sm:inline">|</span>
              <div className="relative flex items-center gap-1"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="appearance-none bg-transparent py-2 pl-1 pr-5 font-medium text-[#636662] outline-none"><option>Recently added</option><option>A–Z</option><option>Category</option></select><ChevronDown className="pointer-events-none absolute right-0 size-3.5 text-[#a8aaa6]" /></div>
            </div>
            {showMoreFilters && <div className="filter-panel"><Filter className="size-4 text-[#f48120]" /><span>Advanced filters will be available when more games arrive.</span></div>}
          </section>

          {activeGame && (
            <section className="player-panel mt-8" aria-label={`Playing ${activeGame.title}`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="section-kicker">Now playing</p>
                  <h2 className="font-display text-lg font-medium tracking-[-0.04em]">{activeGame.title}</h2>
                </div>
                <button onClick={() => setActiveGame(null)} className="rounded p-1.5 text-[#9a9c99] hover:bg-[#f2f2ef] hover:text-[#171717]" aria-label="Close player"><X className="size-4" /></button>
              </div>
              <div className="player-frame">
                <iframe
                  src={activeGame.url}
                  title={activeGame.title}
                  className="player-iframe"
                  allow="fullscreen; autoplay; gamepad"
                  sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
                />
              </div>
              <p className="mt-2 font-mono text-[10px] tracking-[0.06em] text-[#b3b4b0]">{activeGame.source} · {activeGame.license} license · embedded unmodified</p>
            </section>
          )}

          <section className="mt-8" aria-live="polite">
            <div className="mb-3 flex items-center justify-between"><p className="section-kicker">Game library</p><span className="font-mono text-[10px] tracking-[0.12em] text-[#b2b3af]">{String(visibleCount).padStart(2, "0")} TITLES</span></div>
            {visibleCount > 0 ? (
              <div className="space-y-3">
                {visiblePlayable.map((game) => <PlayableGameRow key={game.id} game={game} onPlay={setActiveGame} />)}
                {visiblePlaceholders.map((game) => <GameListRow key={game.id} game={game} />)}
              </div>
            ) : <div className="empty-list"><p className="font-display text-lg font-medium tracking-[-0.04em]">No games match that search.</p><button onClick={() => { setQuery(""); setActiveCategory("All games"); }} className="mt-3 text-sm font-semibold text-[#6d706b] underline decoration-[#f48120] decoration-2 underline-offset-4">Clear filters</button></div>}
          </section>

          <section id="about" className="mt-16 border-t border-[#e5e5e2] pt-5"><div className="flex items-center justify-between gap-4 text-[12px] text-[#a0a19d]"><span>New games will appear here as the library grows.</span><span className="hidden items-center gap-1 font-medium text-[#858782] sm:flex">Browse the index <ArrowRight className="size-3.5" /></span></div></section>
        </div>
      </main>
      <footer className="border-t border-[#e7e7e4] bg-[#fbfbfa]"><div className="mx-auto flex max-w-[1100px] justify-between px-5 py-6 text-[11px] text-[#a4a5a1] sm:px-8"><span>© 2026 VerGames</span><span>Free to play · Built for the browser</span></div></footer>
    </div>
  );
}

export default App;
