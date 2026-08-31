/* Edge Utility: rows stay compact and source-aware; iframe entries open in VerGames, external entries open at the official project page. */
import { ArrowUpRight, Gamepad2, Play } from "lucide-react";
import type { PlaceholderGame, PlayableGame } from "@/data/games";

export function GameListRow({ game }: { game: PlaceholderGame }) {
  return (
    <article className="game-list-row group">
      <div className="flex min-w-0 items-start gap-4 sm:items-center">
        <span className="list-game-icon"><Gamepad2 className="size-[17px]" /></span>
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-display text-[17px] font-medium tracking-[-0.045em] text-[#272826]">{game.title}</h3><span className="list-badge">{game.category}</span></div><p className="mt-1.5 max-w-[560px] text-[12px] leading-5 text-[#858782]">A new browser game is being prepared for the library.</p><div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[#b0b1ad]"><span>VerGames collection</span><span className="text-[#d2d3cf]">·</span><span>Coming soon</span></div></div>
      </div>
      <div className="flex shrink-0 items-center gap-3"><span className="hidden font-mono text-[10px] tracking-[0.12em] text-[#b3b4b0] sm:inline">COMING SOON</span><span className="list-arrow"><ArrowUpRight className="size-4" /></span></div>
    </article>
  );
}

export function PlayableGameRow({ game, onPlay }: { game: PlayableGame; onPlay: (game: PlayableGame) => void }) {
  return (
    <article
      className="game-list-row game-list-row-clickable group"
      onClick={() => onPlay(game)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onPlay(game);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${game.mode === "iframe" ? "Play" : "Open"} ${game.title}`}
    >
      <div className="flex min-w-0 items-start gap-4 sm:items-center">
        <span className="list-game-icon list-game-icon-live"><Play className="size-[17px]" /></span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-display text-[17px] font-medium tracking-[-0.045em] text-[#272826]">{game.title}</h3><span className="list-badge">{game.category}</span></div>
          <p className="mt-1.5 truncate text-[12px] text-[#858782]">{game.description}</p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.06em] text-[#b3b4b0]">{game.source} · {game.license}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3"><span className="hidden font-mono text-[10px] tracking-[0.12em] text-[#b3b4b0] sm:inline">{game.mode === "iframe" ? "PLAY IN VERGAMES" : "OFFICIAL PAGE"}</span><span className="list-arrow list-arrow-live"><Play className="size-4" /></span></div>
    </article>
  );
}
