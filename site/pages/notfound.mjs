import { icon } from '../lib.mjs';

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">case file — status: missing</span>
    <h1>This file isn't in the cabinet.</h1>
    <p class="lede">We pulled the drawer and came up empty. The page you're after may have been moved, renamed, or never filed in the first place. No record at this address.</p>
  </div>
</section>

<section class="sec" style="padding-top:18px">
  <div class="narrow">
    <div class="sk reveal" style="padding:34px 30px;text-align:center;position:relative">
      <span class="tape" style="left:50%;top:-13px;transform:translateX(-50%) rotate(-3deg);width:140px"></span>
      <div class="stamp flag" style="position:absolute;right:24px;bottom:18px">Not found</div>
      ${icon('i-folder', 'ic rough-s')}
      <p class="hand" style="font-size:1.6rem;color:var(--smudge);margin:16px 0 4px">404 — empty folder</p>
      <p style="font-size:1rem;color:var(--ink);margin:0 auto 24px;max-width:46ch">Let's get you back on the trail. Open a fresh file, or check the full index.</p>
      <div class="cta-row" style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
        <a class="btn solid" href="/">Back to home</a>
        <a class="btn" href="/sitemap/">See the sitemap</a>
      </div>
    </div>
    <div class="prose" style="text-align:center;margin-top:24px">
      <p>Looking for something specific? Try <a href="/what-is-a-company-dossier/">what a company dossier is</a>, <a href="/sample/">a sample file</a>, or <a href="/get/">how to get one</a>.</p>
    </div>
  </div>
</section>
`;

export default {
  path: '/404.html',
  noindex: true,
  title: 'Page not found — Company Dossier',
  description: "This file isn't in the cabinet. The page you're looking for couldn't be found. Head back home or browse the sitemap.",
  body,
};
