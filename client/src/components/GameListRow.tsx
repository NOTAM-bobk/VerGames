/* Edge Utility: real catalog rows expose direct official play links, source attribution, and a restrained metadata rhythm. */
import { ArrowUpRight, ExternalLink, Gamepad2 } from "lucide-react";
import type { CatalogGame } from "@/data/games";

export function GameListRow({ game }: { game: CatalogGame }) {
  return (
    <article className="game-list-row group">
      <div className="flex min-w-0 items-start gap-4 sm:items-center">
        <span className="list-game-icon"><Gamepad2 className="size-[17px]" /></span>
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-display text-[17px] font-medium tracking-[-0.045em] text-[#272826]">{game.title}</h3><span className="list-badge">{game.category}</span></div><p className="mt-1.5 max-w-[560px] text-[12px] leading-5 text-[#858782]">{game.description}</p><div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[#b0b1ad]"><span>{game.sourceLabel}</span><span className="text-[#d2d3cf]">·</span><span>{game.license}</span></div></div>
      </div>
      <div className="flex shrink-0 items-center gap-3"><a className="list-play-link" href={game.playUrl} target="_blank" rel="noreferrer">Play <ExternalLink className="size-3" /></a><a className="list-arrow" href={game.sourceUrl} target="_blank" rel="noreferrer" aria-label={`View ${game.title} source`}><ArrowUpRight className="size-4" /></a></div>
    </article>
  );
}
