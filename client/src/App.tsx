/* Edge Utility refinement: centered utility workspace, dotted paper texture, quiet list hierarchy, orange for signals only. */
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GameListRow, PlayableGameRow } from "@/components/GameListRow";
import { GamePlayerView } from "@/components/GamePlayerView";
import { SettingsMenu, readDisplayName, readPanicUrl } from "@/components/SettingsMenu";
import { InfoPageView, type InfoPageKind } from "@/components/InfoPageView";
import { gameCategories, gamePlaceholders, playableGames, type GameCategory, type PlayableGame } from "@/data/games";

const sortOptions = ["Recently added", "A–Z", "Category"] as const;

type SortOption = (typeof sortOptions)[number];
type Overlay = { kind: "game"; game: PlayableGame } | { kind: "info"; page: InfoPageKind } | null;

function readOverlayFromUrl(): Overlay {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("game");
  if (gameId) {
    const game = playableGames.find((candidate) => candidate.id === gameId);
    if (game) return { kind: "game", game };
  }
  const pageParam = params.get("page");
  if (pageParam === "about" || pageParam === "terms" || pageParam === "privacy") {
    return { kind: "info", page: pageParam };
  }
  return null;
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
  const [displayName, setDisplayName] = useState(readDisplayName);
  const [panicUrl, setPanicUrl] = useState(readPanicUrl);
  const [overlay, setOverlay] = useState<Overlay>(() => readOverlayFromUrl());

  // Simulated fetch of the game catalog on page load.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Keep overlays in sync with browser back/forward navigation.
  useEffect(() => {
    const onPopState = () => setOverlay(readOverlayFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openGame = (game: PlayableGame) => {
    window.history.pushState({ gameId: game.id }, "", `?game=${game.id}`);
    setOverlay({ kind: "game", game });
    window.scrollTo({ top: 0 });
  };

  const openInfo = (page: InfoPageKind) => {
    window.history.pushState({ page }, "", `?page=${page}`);
    setOverlay({ kind: "info", page });
    window.scrollTo({ top: 0 });
  };

  const closeOverlay = () => {
    if (window.location.search) {
      window.history.pushState({}, "", window.location.pathname);
    }
    setOverlay(null);
  };

  const triggerPanic = () => {
    const target = panicUrl.trim() || "https://www.google.com";
    window.location.href = target.startsWith("http") ? target : `https://${target}`;
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

  if (overlay?.kind === "game") {
    return <GamePlayerView game={overlay.game} onBack={closeOverlay} />;
  }

  if (overlay?.kind === "info") {
    return <InfoPageView page={overlay.page} onBack={closeOverlay} />;
  }

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#151515]">
      <header className="page-enter border-b border-[#e7e7e4] bg-[#fbfbfa]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-5 sm:px-8">
          <a href="/" className="flex min-w-0 items-center gap-2.5" aria-label="VerGames home">
            <span className="brand-mark"><img src="/manus-storage/vergames-logo_60ac709a.png" alt="" /></span>
            {displayName.trim() ? (
              <span className="font-display truncate text-[16px] font-bold tracking-[-0.05em]">Welcome home, {displayName.trim()}</span>
            ) : (
              <span className="font-display flex items-center text-[16px] font-bold tracking-[-0.06em]"><span>Ver</span><span className="wordmark-signal" aria-hidden="true" /><span>Games</span></span>
            )}
          </a>
          <nav className="flex items-center gap-2">
            <button type="button" onClick={triggerPanic} className="header-action-button header-action-button-panic" aria-label="Panic button — leave the site now" title="Panic button">
              <AlertTriangle className="size-4" />
              <span className="hidden sm:inline">Panic</span>
            </button>
            <SettingsMenu
              displayName={displayName}
              onNameChange={setDisplayName}
              onOpenAbout={() => openInfo("about")}
            />
          </nav>
        </div>
      </header>

      <main id="library" className="dot-field min-h-[calc(100vh-64px)]">
        <div className="mx-auto max-w-[924px] px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pt-24">
          <section className="page-enter mb-10 sm:mb-12">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.65rem)] font-medium leading-[1.02] tracking-[-0.075em]">Find something to play<span className="text-[#f48120]">.</span></h1>
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
        </div>
      </main>
      <footer className="border-t border-[#e7e7e4] bg-[#fbfbfa]"><div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-6 text-[11px] text-[#a4a5a1] sm:px-8"><span>© 2026 VerGames</span><div className="flex items-center gap-4"><button type="button" onClick={() => openInfo("terms")} className="transition-colors hover:text-[#f48120]">Terms of Service</button><button type="button" onClick={() => openInfo("privacy")} className="transition-colors hover:text-[#f48120]">Privacy Policy</button></div></div></footer>
    </div>
  );
}

export default App;
