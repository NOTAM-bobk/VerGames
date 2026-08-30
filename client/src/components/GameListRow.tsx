/* Edge Utility refinement: list rows echo the reference's clean, searchable records with quiet status metadata. */
import { ArrowUpRight, Gamepad2, Play } from "lucide-react";
import type { PlaceholderGame, PlayableGame } from "@/data/games";

export function GameListRow({ game }: { game: PlaceholderGame }) {
  return (
    <article className="game-list-row group">
      <div className="flex min-w-0 items-start gap-4 sm:items-center">
        <span className="list-game-icon"><Gamepad2 className="size-[17px]" /></span>
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-display text-[17px] font-medium tracking-[-0.045em] text-[#272826]">{game.title}</h3><span className="list-badge">{game.category}</span></div><p className="mt-1.5 text-[12px] text-[#9a9b97]">A new browser game is being prepared for the library.</p></div>
      </div>
      <div className="flex shrink-0 items-center gap-3"><span className="hidden font-mono text-[10px] tracking-[0.12em] text-[#b3b4b0] sm:inline">COMING SOON</span><span className="list-arrow"><ArrowUpRight className="size-4" /></span></div>
    </article>
  );
}

export function PlayableGameRow({ game, onPlay }: { game: PlayableGame; onPlay: (game: PlayableGame) => void }) {
  return (
    <article className="game-list-row group">
      <div className="flex min-w-0 items-start gap-4 sm:items-center">
        <span className="list-game-icon list-game-icon-live"><Play className="size-[17px]" /></span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-display text-[17px] font-medium tracking-[-0.045em] text-[#272826]">{game.title}</h3>
            <span className="list-badge">{game.category}</span>
            <span className="list-badge list-badge-live">PLAYABLE</span>
          </div>
          <p className="mt-1.5 truncate text-[12px] text-[#9a9b97]">{game.description}</p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.06em] text-[#b3b4b0]">{game.source} · {game.license}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={() => onPlay(game)}
          className="list-arrow list-arrow-live"
          aria-label={`Play ${game.title}`}
        >
          <Play className="size-4" />
        </button>
      </div>
    </article>
  );
}
