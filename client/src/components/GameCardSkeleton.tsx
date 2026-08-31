/* Edge Utility: skeleton cards are calm, technical placeholders for the future curated catalog. */
import { Gamepad2, LockKeyhole } from "lucide-react";
import type { CatalogGame } from "@/data/games";

const textureByAccent: Record<"orange" | "blue" | "graphite" | "slate" | "mist", string> = {
  orange: "from-[#fff2e7] via-[#f9e7d8] to-[#f1f3f5]",
  blue: "from-[#e9f2fa] via-[#e3ebf2] to-[#f2f3f5]",
  graphite: "from-[#e6e9ec] via-[#eef0f2] to-[#f3f4f5]",
  slate: "from-[#e9edf1] via-[#eff2f4] to-[#f7f7f7]",
  mist: "from-[#edf4f4] via-[#edf0f0] to-[#f5f5f4]",
};

export function GameCardSkeleton({ game, index, featured = false }: { game: CatalogGame; index: number; featured?: boolean }) {
  return (
    <article className={`game-card group ${featured ? "sm:col-span-2 xl:col-span-2" : ""}`} style={{ animationDelay: `${index * 45}ms` }} aria-label={`${game.category} game placeholder`}>
      <div className={`relative overflow-hidden rounded-[15px] border border-[#dce2e7] bg-[#eef1f3] ${featured ? "aspect-[2.08/1]" : "aspect-[1.55/1]"}`}><div className={`absolute inset-0 bg-gradient-to-br ${textureByAccent["slate"]} opacity-30`} />
        <div className="absolute inset-0 skeleton-shimmer" />
        <div className="absolute left-4 top-4 flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg border border-white/80 bg-white/85 text-[#8f9aa6]"><Gamepad2 className="size-4" /></span><span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-[#8995a1]">VG / {game.index}</span>{featured && <span className="rounded bg-white/85 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8a96a3]">Featured slot</span>}</div>
        <div className="absolute bottom-5 left-5 right-5"><div className={`h-2.5 rounded-full bg-white/80 ${featured ? "w-1/2" : "w-2/3"}`} /><div className="mt-2 h-2 w-1/4 rounded-full bg-white/65" /></div>
        <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full border border-white/80 bg-white/60 text-[#a8b2bc]"><LockKeyhole className="size-3.5" /></span>
      </div>
      <div className="flex items-start justify-between gap-4 px-1 pt-4"><div><p className="eyebrow text-[#9ba6b1]">{game.category}</p><h3 className="mt-1.5 text-sm font-semibold tracking-[-0.015em] text-[#657282]">{game.title}</h3></div><span className="mt-1 text-[11px] text-[#b0b8c0]">Soon</span></div>
    </article>
  );
}
