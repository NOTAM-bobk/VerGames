/* Edge Utility: skeleton cards are calm, technical placeholders for the future curated catalog. */
import { Gamepad2, LockKeyhole } from "lucide-react";
import type { PlaceholderGame } from "@/data/games";

const textureByAccent: Record<PlaceholderGame["accent"], string> = {
  orange: "from-[#fff2e7] via-[#f9e7d8] to-[#f1f3f5]",
  blue: "from-[#e9f2fa] via-[#e3ebf2] to-[#f2f3f5]",
  graphite: "from-[#e6e9ec] via-[#eef0f2] to-[#f3f4f5]",
  slate: "from-[#e9edf1] via-[#eff2f4] to-[#f7f7f7]",
  mist: "from-[#edf4f4] via-[#edf0f0] to-[#f5f5f4]",
};

export function GameCardSkeleton({ game, index }: { game: PlaceholderGame; index: number }) {
  return (
    <article className="game-card group" style={{ animationDelay: `${index * 45}ms` }} aria-label={`${game.category} game placeholder`}>
      <div className={`relative aspect-[1.55/1] overflow-hidden rounded-[15px] bg-gradient-to-br ${textureByAccent[game.accent]}`}>
        <div className="absolute inset-0 skeleton-shimmer" />
        <div className="absolute left-4 top-4 flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg border border-white/80 bg-white/70 text-[#a8b2bc]"><Gamepad2 className="size-4" /></span><span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-[#9aa5af]">VG / {game.index}</span></div>
        <div className="absolute bottom-5 left-5 right-5"><div className="h-2.5 w-2/3 rounded-full bg-white/75" /><div className="mt-2 h-2 w-1/3 rounded-full bg-white/60" /></div>
        <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full border border-white/80 bg-white/60 text-[#a8b2bc]"><LockKeyhole className="size-3.5" /></span>
      </div>
      <div className="flex items-start justify-between gap-4 px-1 pt-4"><div><p className="eyebrow text-[#9ba6b1]">{game.category}</p><h3 className="mt-1.5 text-sm font-semibold tracking-[-0.015em] text-[#657282]">{game.title}</h3></div><span className="mt-1 text-[11px] text-[#b0b8c0]">Soon</span></div>
    </article>
  );
}
