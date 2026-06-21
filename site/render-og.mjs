// Rasterize SVG brand assets -> PNG in docs/ and docs/icons/. Run in CI after build.
// Requires @resvg/resvg-js (devDependency). Best-effort: never fails the build.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { appIconSvg, faviconSvg } from './brand.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const DOCS = resolve(__dir, '..', 'docs');

try {
  const { Resvg } = await import('@resvg/resvg-js');
  await mkdir(join(DOCS, 'icons'), { recursive: true });

  const render = (svg, width, bg) =>
    new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { loadSystemFonts: true }, background: bg })
      .render().asPng();

  // OG image (from docs/og.svg written by build.mjs)
  try {
    const og = await readFile(join(DOCS, 'og.svg'), 'utf8');
    await writeFile(join(DOCS, 'og.png'), render(og, 1200, '#f5f1e6'));
  } catch (e) { console.warn('og.png skipped:', e.message); }

  // Favicon + app icons (transparent where the art is a rounded tile)
  const targets = [
    ['icons/favicon-32.png', faviconSvg(), 32, 'transparent'],
    ['icons/favicon-180.png', faviconSvg(), 180, 'transparent'],
    ['icons/apple-touch-icon.png', appIconSvg(180), 180, '#f5f1e6'],
    ['apple-touch-icon.png', appIconSvg(180), 180, '#f5f1e6'],
    ['icons/icon-192.png', appIconSvg(192), 192, 'transparent'],
    ['icons/icon-512.png', appIconSvg(512), 512, 'transparent'],
    ['icons/icon-512-maskable.png', appIconSvg(512, { maskable: true }), 512, '#f5f1e6'],
  ];
  for (const [out, svg, w, bg] of targets) {
    await writeFile(join(DOCS, out), render(svg, w, bg));
    console.log('rendered', out);
  }
  console.log('Brand PNGs rendered.');
} catch (e) {
  console.warn('Icon render skipped:', e.message);
}
