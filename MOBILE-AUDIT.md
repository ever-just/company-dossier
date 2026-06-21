# Mobile / Responsive / Accessibility Audit — Company Dossier

Audit date: 2026-06-21. Scope: the static site built by `node site/build.mjs` → `docs/`.
All layout fixes were made in `site/assets/styles.css` only (no page content, no JS, no
markup changes were required).

## Tools used (real, run in this sandbox)

- **Build + serve**: `node site/build.mjs`, then `python3 -m http.server 8080 -d docs`.
- **Playwright (chromium)** — `playwright` + `npx playwright install --with-deps chromium`
  (Chrome for Testing 149). A custom script (`audit.mjs`) drove every target page at
  **320, 360, 390, 414, 768 px** and measured:
  - horizontal overflow (`documentElement.scrollWidth − innerWidth`) + the widest
    offending elements past the viewport;
  - tap targets (`a, button, input, [role=button]`) with a rendered box < 44×44 px
    (inline text links inside `.prose`/`p`/`li`/`.crumbs` excluded — those are body copy,
    not controls);
  - the nav (hamburger visible ≤820px, menu opens/closes, `aria-expanded` flips);
  - the AI launcher `.ai-models` grid (even button widths, no overflow);
  - full-page screenshots of `/` and `/use-in-ai/` at 390px (`audit-shots/`).
- **axe-core** — `@axe-core/playwright`, tags `wcag2a/wcag2aa/wcag21a/wcag21aa`, run on
  every page at 390px.

### Pages tested
`/`, `/generate/`, `/use-in-ai/`, `/compare/`, `/compare/zoominfo-alternative/`,
`/features/`, `/use-cases/sales/`, `/blog/`, `/sample/`, `/pricing/`.
(`/brand/` and `/about/` do not exist in this build, so they were skipped.)

---

## Issues found (before fixes)

### 1. Horizontal overflow
- **`/use-in-ai/` @ 320px** — overflow of **34px**, caused by an inline `<code>` element
  (`companydossier.lol/llms.txt` in `.ai-note code`). A long unbreakable string pushed the
  page wider than the viewport. This was the **only** overflow case across all 10 pages × 5
  viewports.

### 2. Tap targets < 44×44 px (sitewide components, every page)
- **`.btn.small` "Copy the prompt"** — ~37px tall.
- **`.nav .btn.solid` "Generate"** (header) — ~40–42px tall.
- **`.nav-toggle`** (hamburger) — declared 44×44 but compressed to **37–38px wide** at
  320/360px because the flex row squeezed it.
- **`.repo a`** footer repo chips ("core repo" / "vs code repo") — ~39px tall.
- **`.foot-col a`** footer column nav links ("Blog", "Pricing", "Features", …) — **28px tall**.
- **`.brand`** header/footer logo link — ~38px tall at 414/768px.

### 3. axe-core violations
- **`scrollable-region-focusable`** (serious) on `/compare/` and
  `/compare/zoominfo-alternative/` — the `.tbl-wrap` scroll container became horizontally
  scrollable on narrow screens (the table had a hard `min-width:520px`) but was not
  keyboard-focusable, so keyboard users couldn't reach the off-screen columns. 2 nodes.
- No contrast, name, role, landmark or label violations were found.

---

## Fixes applied (all in `site/assets/styles.css`)

1. **Kill long-string overflow.** Added global wrapping so URLs / code / long IDs can never
   force horizontal scroll:
   - `p,li,h1..h4,dd,dt,figcaption,blockquote,.lede { overflow-wrap:anywhere }`
   - `code,.term,kbd { overflow-wrap:anywhere; word-break:break-word }`
   - `table.cmp td,table.cmp th { overflow-wrap:anywhere }`
   This resolved the `/use-in-ai/` @320 overflow.

2. **Tap targets → ≥44px.**
   - `.btn` base: added `min-height:44px; justify-content:center` (covers all buttons,
     including the "Copy the prompt" small button).
   - `.btn.small` and `.nav .btn`: added `min-height:44px`.
   - `.nav-toggle`: added `min-width:44px; flex:0 0 auto` so it can't be squeezed below 44px.
   - `.repo a`: added `min-height:44px`.
   - `.foot-col a`: changed `display:block` → `display:flex; align-items:center;
     min-height:44px` (kept `width:fit-content`); the 44px row height replaces the old
     `margin-bottom`, giving each stacked link a full 44px tappable row.
   - `.brand`: added `min-height:44px`.

3. **Fix `scrollable-region-focusable` (axe) — CSS-only.** Added a `@media (max-width:600px)`
   block that drops the comparison table's `min-width` and tightens cell padding:
   `table.cmp { min-width:0; font-size:.88rem }` /
   `table.cmp th,td { padding:11px 10px }`.
   The 3-column comparison table now **reflows to fit** narrow screens (measured: 284px @320,
   324px @360, 354px @390 — no horizontal scroll), so the keyboard-trap scroll region no
   longer exists. On screens ≥601px the `min-width:520px` still applies for comfortable
   reading (and at 768px the container is wide enough that no scroll occurs anyway).

No changes were needed in `site/lib.mjs` — the markup (header, footer, launcher) was already
sound (proper `aria-label`/`aria-expanded`/`aria-controls` on the toggle, labelled launcher
input, landmark `<nav>`/`<header>`/`<footer>`). All fixes were achievable in CSS.

---

## Final verification (re-run with the same Playwright + axe scripts after the fixes)

- **Horizontal overflow: 0** across all tested pages at 320 / 360 / 390 / 414 / 768 px.
- **Tap targets: OK** — all sitewide controls now render ≥44px on the binding dimension.
  Two items still surface in the raw scan, both expected/acceptable:
  - footer column links report a *narrow width* (e.g. "Blog" = 31px) but are now **44px tall**
    in a stacked list — short link text legitimately has a narrow box; the 44px row height is
    the tap target and prevents mis-taps.
  - the `#cdw-remember` **native checkbox** (20×20) on `/generate/` only — it is wrapped in a
    clickable `<label class="cdw-check">`, is part of the generate **widget** content
    (widget.css, outside this task's CSS ownership), and native form controls at their default
    size are covered by the WCAG 2.5.5 control exception.
- **Nav: OK** — hamburger appears ≤820px, the menu is hidden when closed, opens to a
  `display:flex` dropdown and sets `aria-expanded="true"`, and all links are reachable.
- **AI launcher: OK** — `.ai-models` buttons wrap into an even grid with **identical widths**
  and **no overflow** at every viewport.
- **axe violations: 0** (was 2) across all tested pages.
- **`node site/build.mjs` still succeeds** (exit 0) after all CSS changes.

### Summary
**overflow: 0 across all tested viewports / tap targets OK / axe violations: 0**

Screenshots: `audit-shots/home-390.png`, `audit-shots/use-in-ai-390.png`.
Audit script: `audit.mjs`. Raw results: `/tmp/audit-results.json`.
