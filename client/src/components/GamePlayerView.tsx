/* Edge Utility: fullscreen play view — name on top, game below, quiet chrome, orange only for signals. */
import { useState } from "react";
import { ArrowLeft, ExternalLink, Maximize2, RotateCw, Volume2, VolumeX } from "lucide-react";
import type { PlayableGame } from "@/data/games";

interface GamePlayerViewProps {
  game: PlayableGame;
  onBack: () => void;
}

export function GamePlayerView({ game, onBack }: GamePlayerViewProps) {
  const [frameKey, setFrameKey] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const openFullscreen = () => {
    const frame = document.querySelector<HTMLDivElement>(".player-view-frame");
    frame?.requestFullscreen?.().catch(() => {});
  };

  // Cross-origin iframes can't be muted programmatically; reloading resets the game's audio state.
  const toggleSound = () => {
    setSoundOn((on) => !on);
    setFrameKey((k) => k + 1);
  };

  return (
    <div className="player-view min-h-screen bg-[#fbfbfa] text-[#151515]">
      <header className="player-view-header border-b border-[#e7e7e4] bg-[#fbfbfa]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-5 sm:px-8">
          <button type="button" onClick={onBack} className="player-back-button" aria-label="Back to games">
            <ArrowLeft className="size-4" />
            <span>Back to games</span>
          </button>

          <div className="flex min-w-0 items-center gap-2.5">
            <span className="brand-mark" aria-hidden="true"><img src="/manus-storage/vergames-logo_60ac709a.png" alt="" /></span>
            <h1 className="font-display truncate text-[16px] font-bold tracking-[-0.05em]">{game.title}</h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button type="button" onClick={toggleSound} className="player-action-button" aria-label={soundOn ? "Reset game with sound on" : "Reset game with sound off"}>
              {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>
            <button type="button" onClick={() => setFrameKey((k) => k + 1)} className="player-action-button" aria-label="Reload game">
              <RotateCw className="size-4" />
            </button>
            <button type="button" onClick={openFullscreen} className="player-action-button" aria-label="Enter fullscreen">
              <Maximize2 className="size-4" />
            </button>
            <a href={game.url} target="_blank" rel="noreferrer noopener" className="player-action-button" aria-label={`Open ${game.title} in a new tab`}>
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="player-view-main dot-field min-h-[calc(100vh-64px)]">
        <div className="mx-auto max-w-[924px] px-5 pb-16 pt-8 sm:px-8 sm:pt-10">
          <div className="player-view-frame">
            <iframe
              key={frameKey}
              src={game.url}
              title={game.title}
              className="player-iframe"
              allow="fullscreen; autoplay; gamepad; pointer-lock"
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
            />
          </div>

          <div className="player-view-meta mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="list-badge">{game.category}</span>
              <span className="font-mono text-[10px] tracking-[0.06em] text-[#b3b4b0]">{game.source} · {game.license} license · embedded unmodified</span>
            </div>
            <p className="mt-2 max-w-[620px] text-[13px] leading-6 text-[#8a8b88]">{game.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
