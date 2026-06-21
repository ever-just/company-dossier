// Company Dossier brand marks — single source of truth for the logo, favicon and app icons.
// Refined "case file" mark: a folder (file) with a magnifying glass — search any company's file.
// Monoline, scales from 16px favicon to 512px app icon.

const PAPER = '#f5f1e6';
const INK = '#15130f';

// Inner geometry of the mark, drawn in a 0..64 box. strokeW lets favicon use heavier lines.
function markPaths(strokeW = 3.4, { lensFill = PAPER } = {}) {
  return `
  <g fill="none" stroke="currentColor" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 25 a3 3 0 0 1 3 -3 h10.5 a3 3 0 0 1 2.1 .9 l2.4 2.4 a3 3 0 0 0 2.1 .9 H49 a3 3 0 0 1 3 3 v14 a3 3 0 0 1 -3 3 H13 a3 3 0 0 1 -3 -3 z"/>
    <path d="M10 31 H52"/>
    <circle cx="41" cy="42" r="11" fill="${lensFill}"/>
    <path d="M36.5 42 a4.5 4.5 0 0 1 4.5 -4.5"/>
    <path d="M49 50 L57.5 58.5" stroke-width="${(strokeW + 0.8).toFixed(1)}"/>
  </g>`;
}

// The <symbol> inner content used in the on-page icon sprite (id="i-logo").
export const LOGO_SYMBOL = `<symbol id="i-logo" viewBox="0 0 64 64">${markPaths(3.4)}</symbol>`;

// Scalable favicon: a small cream "case-file chip" with a heavier mark so it reads at 16px.
export function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="1.5" y="1.5" width="61" height="61" rx="13" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
  <g color="${INK}" transform="translate(0.5 0.5) scale(0.96) translate(1.3 1.3)">${markPaths(4.4)}</g>
</svg>`;
}

// App / maskable icon. maskable=true => full-bleed background within the safe zone.
export function appIconSvg(size = 512, { maskable = false } = {}) {
  const s = size;
  const inner = maskable
    // maskable: full-bleed cream, mark kept inside ~70% safe zone
    ? `<rect width="${s}" height="${s}" fill="${PAPER}"/>
       <g color="${INK}" transform="translate(${s * 0.18} ${s * 0.18}) scale(${(s * 0.64) / 64})">${markPaths(3.2)}</g>`
    // standard: rounded cream tile with ink border
    : `<rect x="${s * 0.04}" y="${s * 0.04}" width="${s * 0.92}" height="${s * 0.92}" rx="${s * 0.18}" fill="${PAPER}" stroke="${INK}" stroke-width="${s * 0.03}"/>
       <g color="${INK}" transform="translate(${s * 0.2} ${s * 0.2}) scale(${(s * 0.6) / 64})">${markPaths(3.4)}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">${inner}</svg>`;
}

export { PAPER, INK };
