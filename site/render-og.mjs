// Rasterize docs/og.svg -> docs/og.png (1200x630). Run in CI after build.
// Requires @resvg/resvg-js (devDependency). Best-effort: never fails the build.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const DOCS = resolve(__dir, '..', 'docs');

try {
  const { Resvg } = await import('@resvg/resvg-js');
  const svg = await readFile(join(DOCS, 'og.svg'), 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true },
    background: '#f5f1e6',
  });
  const png = resvg.render().asPng();
  await writeFile(join(DOCS, 'og.png'), png);
  console.log('Rendered docs/og.png (' + png.length + ' bytes)');
} catch (e) {
  console.warn('OG render skipped:', e.message);
}
