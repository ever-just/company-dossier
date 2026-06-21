import { ctaFinal } from '../lib.mjs';

const exhibit = `<div class="exhibit sk reveal">
  <span class="tape" style="left:40px;top:-13px;width:120px"></span>
  <span class="tape" style="right:60px;top:-13px;transform:rotate(5deg)"></span>
  <div class="stamp" style="position:absolute;right:24px;bottom:18px">Sample only</div>
  <div class="ex-head">
    <div>
      <div class="name marker">Northwind Logistics</div>
      <div class="meta">Freight &amp; last-mile delivery · Founded 2014 · Private<br>HQ: Columbus, OH · ~1,240 employees · 6 offices</div>
    </div>
    <div style="text-align:right">
      <div class="stat-inline">▲ 18%<small>headcount, 12 mo</small></div>
      <div class="stat-inline" style="margin-top:10px">37<small>open roles</small></div>
    </div>
  </div>
  <div class="ex-grid">
    <div>
      <div class="panel-label"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4v16h16M8 16v-5M12 16V9M16 16v-8M20 16v-3"/></svg>Headcount by year</div>
      <div class="ink-fig"><svg viewBox="0 0 320 170" role="img" aria-label="Bar chart of headcount rising over six years" data-draw>
        <g class="rough" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path class="dr" pathLength="1" d="M30 140 V20 M30 140 H300"/>
          <g>
            <rect class="dr d2" pathLength="1" x="44"  y="110" width="26" height="30"/>
            <rect class="dr d2" pathLength="1" x="86"  y="96"  width="26" height="44"/>
            <rect class="dr d2" pathLength="1" x="128" y="84"  width="26" height="56"/>
            <rect class="dr d3" pathLength="1" x="170" y="66"  width="26" height="74"/>
            <rect class="dr d3" pathLength="1" x="212" y="52"  width="26" height="88"/>
            <rect class="dr d3" pathLength="1" x="254" y="34"  width="26" height="106"/>
          </g>
          <g stroke-width="1.4" opacity=".8">
            <path d="M46 138 l22 -22 M50 138 l20 -22 M54 138 l16 -20 M58 138 l12 -16"/>
            <path d="M88 138 l24 -36 M92 138 l20 -34 M96 138 l16 -30 M100 138 l12 -26"/>
            <path d="M256 138 l24 -98 M260 138 l20 -92 M264 138 l16 -80 M268 138 l12 -64 M272 138 l8 -44"/>
            <path d="M214 138 l24 -82 M218 138 l20 -76 M222 138 l16 -64 M226 138 l12 -50"/>
            <path d="M172 138 l24 -68 M176 138 l20 -62 M180 138 l16 -50 M184 138 l12 -38"/>
            <path d="M130 138 l24 -50 M134 138 l20 -44 M138 138 l16 -34 M142 138 l12 -24"/>
          </g>
        </g>
        <g font-family="'Courier Prime',monospace" font-size="10" fill="var(--smudge)" text-anchor="middle">
          <text x="57" y="156">'19</text><text x="99" y="156">'20</text><text x="141" y="156">'21</text>
          <text x="183" y="156">'22</text><text x="225" y="156">'23</text><text x="267" y="156">'24</text>
        </g>
      </svg></div>
    </div>
    <div>
      <div class="panel-label"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 4h6v4H9zM3 16h6v4H3zm12 0h6v4h-6zM12 8v4M6 16v-4h12v4M12 12v4"/></svg>Leadership sketch</div>
      <div class="ink-fig"><svg viewBox="0 0 320 170" role="img" aria-label="Organisation chart from chief executive to three leaders" data-draw>
        <g class="rough" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <rect class="dr" pathLength="1" x="118" y="14" width="84" height="30" rx="6"/>
          <rect class="dr d2" pathLength="1" x="24"  y="92" width="78" height="28" rx="6"/>
          <rect class="dr d2" pathLength="1" x="121" y="92" width="78" height="28" rx="6"/>
          <rect class="dr d2" pathLength="1" x="218" y="92" width="78" height="28" rx="6"/>
          <path class="dr d3" pathLength="1" d="M160 44 V70 M63 92 V70 H257 V92 M160 70 V92"/>
          <path class="dr d3" d="M44 120 v14 M70 120 v14 M148 120 v14 M174 120 v14 M240 120 v14 M266 120 v14"/>
        </g>
        <g font-family="'Courier Prime',monospace" font-size="11" fill="currentColor" text-anchor="middle">
          <text x="160" y="33">CEO</text><text x="63" y="110">CFO</text><text x="160" y="110">COO</text><text x="257" y="110">CTO</text>
        </g>
      </svg></div>
    </div>
    <div>
      <div class="panel-label"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14m6-10v14"/></svg>Offices</div>
      <div class="ink-fig"><svg viewBox="0 0 320 170" role="img" aria-label="Sketch map with three office pins" data-draw>
        <g class="rough" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect class="dr" pathLength="1" x="12" y="12" width="296" height="146" rx="8"/>
          <path class="dr d2" d="M12 70 q60 -22 130 4 t166 -6 M40 158 q40 -70 96 -54 t140 -40 M210 12 q-10 70 24 146"/>
          <path class="dr d3" pathLength="1" fill="currentColor" d="M96 96 c-9 -12 -12 -17 -12 -23 a12 12 0 0 1 24 0 c0 6 -3 11 -12 23 Z"/>
          <circle cx="96" cy="73" r="4" fill="var(--paper-2)" stroke="none"/>
          <path class="dr d3" pathLength="1" fill="currentColor" d="M196 124 c-9 -12 -12 -17 -12 -23 a12 12 0 0 1 24 0 c0 6 -3 11 -12 23 Z"/>
          <circle cx="196" cy="101" r="4" fill="var(--paper-2)" stroke="none"/>
          <path class="dr d4" pathLength="1" fill="currentColor" d="M248 70 c-8 -10 -10 -14 -10 -19 a10 10 0 0 1 20 0 c0 5 -2 9 -10 19 Z"/>
          <circle cx="248" cy="51" r="3.4" fill="var(--paper-2)" stroke="none"/>
        </g>
      </svg></div>
    </div>
    <div>
      <div class="panel-label"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 7v5l3 2"/></svg>Timeline</div>
      <ul class="tl">
        <li><span class="date">2024 · Q3</span><b>Acquired RouteIQ</b>Tuck-in of a routing startup.</li>
        <li><span class="date">2023 · Q1</span><b>Series C — $60M</b>Led by Keystone Ventures.</li>
        <li><span class="date">2021</span><b>Opened Dallas hub</b>Second major facility.</li>
        <li><span class="date">2014</span><b>Founded in Columbus</b>Two co-founders.</li>
      </ul>
    </div>
  </div>
  <div style="border-top:2.5px dashed var(--ink);margin-top:22px;padding-top:16px">
    <div class="panel-label"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 21V4m0 0l11 3-3 4 3 4-11-2"/></svg>Risk flags</div>
    <div class="flags">
      <div class="flag"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3l9 16H3zM12 10v4M12 17h.01"/></svg><span>Wage-and-hour suit filed <span class="redact">██████</span>, settled out of court. Public docket.</span></div>
      <div class="flag"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3l9 16H3zM12 10v4M12 17h.01"/></svg><span>~6% role reductions reported <span class="redact">████</span> amid network consolidation.</span></div>
    </div>
    <p style="font-family:var(--f-type);font-size:.78rem;color:var(--smudge);margin:14px 0 0">Every claim in a real dossier links back to its public source. ▢ Northwind Logistics is fictional and used for illustration only.</p>
  </div>
</div>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">exhibit a — sample</span>
    <h1>A page from the file</h1>
    <p class="lede">This is a made-up company, drawn the way a real dossier renders — charts, an org sketch, a map and a timeline, all on one page. Every line in a real file links back to its public source.</p>
  </div>
</section>
<section class="sec" style="padding-top:18px">
  <div class="wrap">
    ${exhibit}
  </div>
</section>
${ctaFinal('Run this on a real company.', 'one search. the whole story, sourced, in minutes.')}
`;

export default {
  path: '/sample/',
  priority: '0.8',
  active: '/sample/',
  breadcrumbs: [{ href: '/sample/', label: 'Sample' }],
  title: 'Sample company dossier — what the finished file looks like',
  description: 'See a sample company dossier: headcount chart, leadership org sketch, office map, milestone timeline and sourced risk flags — the format every Company Dossier renders in.',
  body,
};
