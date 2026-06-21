import { ctaFinal, icon } from '../lib.mjs';

const body = `
<section class="sec phero">
  <div class="wrap narrow" style="text-align:center">
    <div class="ink-fig" style="width:120px;margin:0 auto 6px">${icon('i-folder', 'ic rough-s')}</div>
    <span class="tab">offline</span>
    <h1>This file is in the cabinet — but you're off the grid.</h1>
    <p class="lede" style="margin-left:auto;margin-right:auto">You appear to be offline, so this page isn't cached yet. Reconnect and try again — anything you've already opened will still load.</p>
    <div class="cta-row" style="justify-content:center;display:flex;gap:14px;flex-wrap:wrap;margin-top:18px">
      <a class="btn solid" href="/">Back to the front desk</a>
      <a class="btn" href="/sitemap/">See the file index</a>
    </div>
  </div>
</section>`;

export default {
  path: '/offline/',
  noindex: true,
  active: undefined,
  title: 'Offline — Company Dossier',
  description: 'You appear to be offline.',
  body,
};
