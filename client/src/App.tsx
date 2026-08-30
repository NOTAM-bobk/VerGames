/* Edge Utility: light Swiss/infrastructure-inspired shell; orange reserved for actions and active states. */
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GameCardSkeleton } from "@/components/GameCardSkeleton";
import { gameCategories, gamePlaceholders, type GameCategory } from "@/data/games";

const filters = ["All games", "New arrivals", "Most played"];

function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GameCategory>("All games");
  const [activeFilter, setActiveFilter] = useState("All games");
  const [showFilters, setShowFilters] = useState(false);

  const visiblePlaceholders = useMemo(() => {
    return gamePlaceholders.filter((game) => {
      const matchesCategory = activeCategory === "All games" || game.category === activeCategory;
      const matchesQuery = game.title.toLowerCase().includes(query.toLowerCase()) || game.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#182230]">
      <header className="sticky top-0 z-30 border-b border-[#e2e6eb] bg-[#f7f8fa]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-5 px-5 sm:px-8">
          <a href="/" className="group flex shrink-0 items-center gap-3" aria-label="VerGames home">
            <span className="brand-mark"><img src="/manus-storage/vergames-logo_60ac709a.png" alt="" /></span>
            <span className="font-display flex items-center text-[17px] font-bold tracking-[-0.055em]"><span>Ver</span><span className="wordmark-signal" aria-hidden="true" /><span>Games</span></span>
          </a>
          <div className="hidden h-7 w-px bg-[#dde2e8] sm:block" />
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#8c98a7]" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games, categories, or tags" aria-label="Search games" className="h-11 border-[#dfe4e9] bg-white pl-10 pr-10 text-sm shadow-[0_1px_2px_rgba(20,32,48,0.03)] placeholder:text-[#9aa5b2] focus-visible:border-[#f48120] focus-visible:ring-[#f48120]/20" />
            {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8994a2] transition-colors hover:text-[#182230]" aria-label="Clear search"><X className="size-4" /></button>}
          </div>
          <Button variant="outline" className="hidden h-10 gap-2 border-[#dfe4e9] bg-white text-[#526172] shadow-none hover:border-[#c7ced7] hover:bg-white hover:text-[#182230] sm:flex" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal className="size-4" /> Filters</Button>
          <button className="hidden text-sm font-semibold text-[#5d6b7a] transition-colors hover:text-[#f48120] md:block">Submit a game <span className="ml-1 text-[#a3acb6]">↗</span></button>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1440px] gap-10 px-5 py-9 sm:px-8 lg:py-12">
        <aside className="hidden w-[188px] shrink-0 lg:block">
          <div className="sticky top-[108px]">
            <p className="eyebrow mb-4">Browse library</p>
            <nav className="space-y-1" aria-label="Game categories">
              {gameCategories.map((category) => (
                <button key={category} onClick={() => setActiveCategory(category)} className={`category-link ${activeCategory === category ? "category-link-active" : ""}`}>
                  <span>{category}</span><span className="tabular-nums text-[11px] text-[#a5afb9]">{category === "All games" ? "—" : "0"}</span>
                </button>
              ))}
            </nav>
            <Separator className="my-7 bg-[#e2e6eb]" />
            <p className="eyebrow mb-4">Platform status</p>
            <div className="flex items-start gap-2.5 text-xs leading-5 text-[#748190]"><span className="mt-1.5 size-1.5 rounded-full bg-[#f48120]" />Library in progress<span className="sr-only">, currently adding games</span></div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <section className="relative isolate overflow-hidden rounded-[22px] border border-[#e1e6eb] bg-[#eef2f5] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <img src="/manus-storage/vergames-hero-grid_f5ffe19e.png" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
            <div className="relative max-w-[640px]">
              <Badge className="mb-5 rounded-full border border-[#f48120]/20 bg-[#fff8f1] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c66113] shadow-none">Early access library</Badge>
              <h1 className="font-display max-w-[620px] text-[clamp(2.25rem,5vw,4.35rem)] font-bold leading-[0.97] tracking-[-0.075em] text-[#182230]">A better place to start playing.</h1>
              <p className="mt-5 max-w-[490px] text-[15px] leading-7 text-[#617080]">A clean, carefully curated home for browser games. No clutter. No account required. Just pick a game and play.</p>
              <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#647383]"><span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-[#f48120]" />Library loading</span><span className="text-[#b1b9c2]">/</span><span>New titles arriving soon</span></div>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-5 border-b border-[#e1e6eb] pb-5 sm:flex-row sm:items-end sm:justify-between"><div className="sr-only">Indexed library</div>
            <div><p className="eyebrow mb-2">Catalog / {activeCategory}</p><h2 className="font-display text-2xl font-bold tracking-[-0.05em]">Find your next game</h2></div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`filter-chip ${activeFilter === filter ? "filter-chip-active" : ""}`}>{filter}</button>)}
              <button className="filter-chip flex items-center gap-1.5 lg:hidden" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal className="size-3.5" /> Filters</button>
            </div>
          </div>

          {showFilters && <div className="mt-5 flex flex-wrap gap-2 rounded-xl border border-[#e1e6eb] bg-white p-4 text-sm text-[#657383]"><span className="mr-2 self-center font-semibold text-[#344254]">Coming soon:</span><span className="rounded-md bg-[#f3f5f7] px-3 py-1.5">Difficulty</span><span className="rounded-md bg-[#f3f5f7] px-3 py-1.5">Multiplayer</span><span className="rounded-md bg-[#f3f5f7] px-3 py-1.5">Play time</span></div>}

          <section className="mt-7" aria-live="polite">
            {visiblePlaceholders.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visiblePlaceholders.map((game, index) => <GameCardSkeleton key={game.id} game={game} index={index} featured={index === 0} />)}</div> : <div className="empty-state"><img src="/manus-storage/vergames-empty-state_9c5c1f6f.png" alt="" /><p className="eyebrow">No matches yet</p><h3 className="font-display mt-2 text-xl font-bold tracking-[-0.04em]">Try another search</h3><p className="mt-2 text-sm text-[#73808e]">The library is still loading. Clear your search to see the upcoming catalog.</p></div>}
          </section>

          <div className="mt-12 flex flex-col gap-4 border-t border-[#e1e6eb] pt-5 text-xs text-[#8a96a3] sm:flex-row sm:items-center sm:justify-between"><span><span className="mr-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a4adb7]">Index</span> Showing {visiblePlaceholders.length} upcoming titles</span><span className="inline-flex items-center gap-2"><Sparkles className="size-3.5 text-[#f48120]" />Built for quick play</span></div>
        </div>
      </main>
      <footer className="border-t border-[#e2e6eb] bg-white/50"><div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-7 text-xs text-[#8a96a3] sm:flex-row sm:items-center sm:justify-between sm:px-8"><span>© 2026 VerGames</span><span>Free to play · More games on the way</span></div></footer>
    </div>
  );
}

export default App;
