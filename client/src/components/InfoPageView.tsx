/* Edge Utility: fullscreen info pages — About, Terms of Service, Privacy Policy. */
import { ArrowLeft } from "lucide-react";

export type InfoPageKind = "about" | "terms" | "privacy";

interface InfoPageViewProps {
  page: InfoPageKind;
  onBack: () => void;
}

const meta: Record<InfoPageKind, { title: string; kicker: string; updated: string }> = {
  about: { title: "About VerGames", kicker: "About", updated: "Last updated August 2026" },
  terms: { title: "Terms of Service", kicker: "Legal", updated: "Last updated August 2026" },
  privacy: { title: "Privacy Policy", kicker: "Legal", updated: "Last updated August 2026" },
};

function AboutContent() {
  return (
    <>
      <p>
        VerGames is a small, fast home for browser games. We collect openly licensed, free-to-play HTML5 titles and embed
        them right here, so you can go from “I want to play something” to actually playing in one click — no downloads,
        no accounts, no installs.
      </p>
      <h2>What we do</h2>
      <ul>
        <li><strong>Curate.</strong> Every game in the library is free, browser-based, and openly licensed. We credit the original creators and link to the source project.</li>
        <li><strong>Embed, don't alter.</strong> Games are embedded unmodified. Nothing is re-hosted or re-skinned without the author's license permitting it.</li>
        <li><strong>Keep it light.</strong> No ads, no trackers on gameplay, no account required. Your settings live in your browser's local storage and nowhere else.</li>
      </ul>
      <h2>Who makes the games</h2>
      <p>
        The games belong to their creators. 2048 is by Gabriele Cirulli, Hextris by the Hextris team, Clumsy Bird by
        Ellison Leão, HexGL by Thibaut Despoulain, and Astray by Rye Terrell. VerGames is a doorway, not a studio —
        if you enjoy a game, check out its source page and support the people who built it.
      </p>
      <h2>Submitting a game</h2>
      <p>
        Made something playable in a browser? Send a link and its license to <a className="text-[#d96a08] underline decoration-2 underline-offset-2" href="mailto:submit@vergames.example">submit@vergames.example</a>.
        We review every submission for license compatibility and playability before it enters the library.
      </p>
      <h2>Contact</h2>
      <p>Questions, takedown requests, or bug reports: <a className="text-[#d96a08] underline decoration-2 underline-offset-2" href="mailto:hello@vergames.example">hello@vergames.example</a>.</p>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <p>
        By using VerGames (“the Site”), you agree to these Terms of Service. If you don't agree, please don't use the Site.
      </p>
      <h2>1. The service</h2>
      <p>
        VerGames is a free catalog that links to and embeds third-party, openly licensed browser games. We provide the
        Site “as is” and “as available” and make no guarantee that any game will remain available, unmodified, or
        bug-free. Third-party games may change or disappear at any time without notice.
      </p>
      <h2>2. Acceptable use</h2>
      <ul>
        <li>Don't attempt to disrupt, overload, or reverse-engineer the Site or the games it embeds.</li>
        <li>Don't use the Site for anything unlawful, or in a way that harms the original game creators.</li>
        <li>Don't remove or obscure attribution for embedded games.</li>
      </ul>
      <h2>3. Third-party content</h2>
      <p>
        Games embedded on VerGames are the property of their respective creators and are governed by their own licenses
        (MIT, GPL-3.0, and similar). Those licenses — not these Terms — control your use of each game. We embed titles
        unmodified with attribution, consistent with their licenses.
      </p>
      <h2>4. No warranty</h2>
      <p>
        To the fullest extent permitted by law, VerGames disclaims all warranties, express or implied, including
        merchantability and fitness for a particular purpose. Your use of the Site is at your own risk.
      </p>
      <h2>5. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, VerGames and its operators will not be liable for any indirect,
        incidental, or consequential damages arising from your use of, or inability to use, the Site or any embedded game.
      </p>
      <h2>6. Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Site after a change means you accept the
        updated Terms. The “last updated” date at the top of this page always reflects the current version.
      </p>
      <h2>7. Contact</h2>
      <p>Questions about these Terms: <a className="text-[#d96a08] underline decoration-2 underline-offset-2" href="mailto:legal@vergames.example">legal@vergames.example</a>.</p>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <p>
        VerGames is built to need almost nothing from you. This policy explains the (very little) data involved in using
        the Site.
      </p>
      <h2>What we store</h2>
      <ul>
        <li><strong>Your display name</strong> (if you set one in Settings) — stored only in your browser's local storage. It never leaves your device and is not sent to any server.</li>
        <li><strong>Your panic-button URL</strong> (if you change it) — also local-storage only.</li>
        <li><strong>Anonymous analytics</strong> — the Site loads a privacy-respecting, cookieless analytics script (Umami) that records aggregate page views without identifying you.</li>
      </ul>
      <h2>What we don't do</h2>
      <ul>
        <li>No accounts, no sign-ups, no passwords.</li>
        <li>No advertising cookies or cross-site trackers.</li>
        <li>No selling or sharing of personal data — we don't collect any to share.</li>
      </ul>
      <h2>Third-party games</h2>
      <p>
        When you play an embedded game, that game runs from its original host (for example play2048.co or hextris.io).
        Those sites may set their own cookies or log requests under their own policies. We embed them unmodified and
        can't control what they do; if you have concerns, clear your cookies after play or use your browser's private mode.
      </p>
      <h2>Clearing your data</h2>
      <p>
        Everything we store on your device can be erased by clearing site data in your browser settings. There is
        nothing to delete on our side, because we never received it.
      </p>
      <h2>Contact</h2>
      <p>Privacy questions: <a className="text-[#d96a08] underline decoration-2 underline-offset-2" href="mailto:privacy@vergames.example">privacy@vergames.example</a>.</p>
    </>
  );
}

export function InfoPageView({ page, onBack }: InfoPageViewProps) {
  const { title, kicker, updated } = meta[page];
  return (
    <div className="info-view min-h-screen bg-[#fbfbfa] text-[#151515]">
      <header className="info-view-header border-b border-[#e7e7e4] bg-[#fbfbfa]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-5 sm:px-8">
          <button type="button" onClick={onBack} className="player-back-button" aria-label="Back to games">
            <ArrowLeft className="size-4" />
            <span>Back to games</span>
          </button>
          <span className="font-mono text-[10px] tracking-[0.12em] text-[#b2b3af]">{kicker.toUpperCase()}</span>
        </div>
      </header>
      <main className="dot-field min-h-[calc(100vh-64px)]">
        <div className="mx-auto max-w-[760px] px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
          <div className="page-enter">
            <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.06em]">{title}</h1>
            <p className="mt-2 font-mono text-[11px] tracking-[0.08em] text-[#b2b3af]">{updated}</p>
            <div className="info-prose mt-8">
              {page === "about" && <AboutContent />}
              {page === "terms" && <TermsContent />}
              {page === "privacy" && <PrivacyContent />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
