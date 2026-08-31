# Game Source Audit

## Open Source Games repository

The repository is a curated list of open-source games and remakes. Its repository-level `LICENSE` is CC0 1.0, which applies to the list/documentation, not automatically to every game named in the list. Each game must be reviewed at its own source repository for code, art, music, trademark, and browser-distribution rights. The list includes projects such as OpenTTD, OpenRCT2, Widelands, Unknown Horizons, CorsixTH, Endless Sky, and others, but these are generally standalone games rather than ready-to-embed browser builds.

## Free Games Jungle

The site has a page titled “Free games for websites” with “play this game” and “download game files” links. Its copyright policy says received content is used with permission and that source credits/referrals remain unmodified, but it also advises contacting Free Games Jungle before linking, hotlinking, or using content because some games may carry third-party terms. Therefore, adding its games or hotlinking files requires written confirmation for the specific titles and the intended ad-supported use.

## GameDistribution

The official site provides publisher/developer terms and a developer panel, but the public landing page does not grant a blanket right to embed its catalog. Games should be added only after obtaining a GameDistribution publisher account/approval and using the supplied distribution integration or approved embed URL.

## Implementation decision

Do not copy, download, or hotlink five titles from these sources without title-level permission. The safest immediate implementation is to add a source-review catalog layer that records candidate titles and status, while only enabling a playable iframe when the provider gives an approved embed URL and terms covering third-party placement and advertising.

## Added collection candidates

The collection now includes five projects from the user-provided open-source-games list: MicropolisJS, Ancient Beast, Athena Crisis, OpenPanzer, and IsoCity. Each entry points to the project’s official playable web page and its source repository. VerGames does not copy their assets or claim ownership, and the Play action opens the official page in a new tab.

MicropolisJS has a project-level license page describing GPLv3 distribution with additional terms, including a prohibition on implying affiliation with Electronic Arts and a requirement to preserve the copyright notice. The other four entries remain link-out candidates until their individual repository licenses and any third-party asset terms are reviewed. A direct iframe or self-hosted build should only be added after each project passes that title-level review and permits the intended ad-supported placement.

The Free Games Jungle and GameDistribution sources were not used to download or hotlink game files because their public pages do not provide a blanket, title-level license for this use. They remain future sourcing options after written permission or an approved publisher integration is obtained.

## Embed validation follow-up

The managed preview showed a blank player pane for 2048 because `play2048.co` publishes a Content Security Policy with `frame-ancestors` restricted to its own domains and related domains. VerGames now opens 2048 at its official site instead of embedding it. The iframe player remains available for sources whose framing permissions and behavior are verified.
