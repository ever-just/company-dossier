// Notify IndexNow (Bing/Yandex/Naver/Seznam/Yep) of the current URL set after deploy.
// Google does not use IndexNow (it relies on sitemaps) — this is a Bing-ecosystem bonus,
// which also feeds ChatGPT Search via Bing's index. Best-effort: never throws.
import { INDEXNOW_KEY } from './lib.mjs';

const HOST = 'companydossier.lol';
const ORIGIN = `https://${HOST}`;

async function main() {
  let urls = [];
  try {
    const res = await fetch(`${ORIGIN}/sitemap.xml`, { headers: { 'user-agent': 'company-dossier-indexnow' } });
    const xml = await res.text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  } catch (e) {
    console.warn('IndexNow: could not read sitemap:', e.message);
    return;
  }
  if (!urls.length) { console.warn('IndexNow: no URLs found'); return; }
  const body = { host: HOST, key: INDEXNOW_KEY, keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`, urlList: urls };
  try {
    const r = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    console.log(`IndexNow: submitted ${urls.length} URLs -> HTTP ${r.status}`);
  } catch (e) {
    console.warn('IndexNow: submit failed:', e.message);
  }
}
main();
