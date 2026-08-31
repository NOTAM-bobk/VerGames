/* Edge Utility: header dropdown menu with name entry, submit-a-game, about, and panic-redirect config. */
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, ExternalLink, Info, Settings, User } from "lucide-react";

export const PANIC_URL_STORAGE_KEY = "vergames:panic-url";
export const DEFAULT_PANIC_URL = "https://www.google.com";

export function readPanicUrl(): string {
  try {
    return localStorage.getItem(PANIC_URL_STORAGE_KEY) || DEFAULT_PANIC_URL;
  } catch {
    return DEFAULT_PANIC_URL;
  }
}

export function readDisplayName(): string {
  try {
    return localStorage.getItem("vergames:name") || "";
  } catch {
    return "";
  }
}

export function writeDisplayName(name: string) {
  try {
    if (name.trim()) localStorage.setItem("vergames:name", name.trim());
    else localStorage.removeItem("vergames:name");
  } catch {
    /* storage unavailable */
  }
}

interface SettingsMenuProps {
  displayName: string;
  onNameChange: (name: string) => void;
  onOpenAbout: () => void;
}

export function SettingsMenu({ displayName, onNameChange, onOpenAbout }: SettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const [panicUrl, setPanicUrl] = useState(readPanicUrl);
  const [nameDraft, setNameDraft] = useState(displayName);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setNameDraft(displayName), [displayName]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const saveName = (value: string) => {
    setNameDraft(value);
    onNameChange(value);
    writeDisplayName(value);
  };

  const savePanicUrl = (value: string) => {
    setPanicUrl(value);
    try {
      localStorage.setItem(PANIC_URL_STORAGE_KEY, value);
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} className="header-action-button" aria-haspopup="menu" aria-expanded={open} aria-label="Settings">
        <Settings className="size-4" />
        <span className="hidden sm:inline">Settings</span>
      </button>
      {open && (
        <div className="settings-menu" role="menu" aria-label="Site settings">
          <p className="settings-menu-label">Your name</p>
          <div className="px-1.5 pb-3">
            <div className="relative">
              <User className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#b1b2ae]" />
              <input
                value={nameDraft}
                onChange={(event) => saveName(event.target.value)}
                placeholder="Enter your name…"
                aria-label="Your name"
                className="settings-input pl-8"
                maxLength={24}
              />
            </div>
            <p className="settings-hint mt-1.5 px-1">Shows in the header as “Welcome home, {nameDraft.trim() || "name"}”.</p>
          </div>

          <p className="settings-menu-label">Panic button redirect</p>
          <div className="px-1.5 pb-3">
            <input
              value={panicUrl}
              onChange={(event) => savePanicUrl(event.target.value)}
              placeholder={DEFAULT_PANIC_URL}
              aria-label="Panic button redirect URL"
              className="settings-input font-mono text-[12px]"
            />
            <p className="settings-hint mt-1.5 px-1">Where the panic button sends you.</p>
          </div>

          <div className="border-t border-[#efefec] pt-1.5">
            <button type="button" role="menuitem" className="settings-menu-item" onClick={() => { setOpen(false); onOpenAbout(); }}>
              <Info className="size-4 text-[#a1a39e]" />
              <span>About VerGames</span>
            </button>
            <a role="menuitem" href="mailto:submit@vergames.example" className="settings-menu-item">
              <ExternalLink className="size-4 text-[#a1a39e]" />
              <span>Submit a game</span>
              <span className="ml-auto text-[#b0b1ae]">↗</span>
            </a>
            <button
              type="button"
              role="menuitem"
              className="settings-menu-item"
              onClick={() => {
                const url = panicUrl.trim() || DEFAULT_PANIC_URL;
                window.location.href = url.startsWith("http") ? url : `https://${url}`;
              }}
            >
              <AlertTriangle className="size-4 text-[#d97706]" />
              <span>Trigger panic now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
