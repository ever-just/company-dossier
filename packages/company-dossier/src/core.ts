import { collectDns, type DnsData } from './collectors/dns.js';
import { collectWebsite, type WebsiteData } from './collectors/website.js';
import { collectWayback, type WaybackData } from './collectors/wayback.js';
import { extractTechStack, type TechStackData } from './collectors/techstack.js';
import { collectSearch, type SearchData } from './collectors/search.js';
import { looksLikeDomain, toDomain, todayISO, titleCase } from './utils.js';

export type ProgressCallback = (message: string) => void;

/** The nine dossier sections, in order. */
export const SECTIONS = [
  'overview',
  'people',
  'hiring',
  'money',
  'locations',
  'tech',
  'news',
  'relationships',
  'risk',
] as const;

export type SectionId = (typeof SECTIONS)[number];

export interface BuildOptions {
  /** Output directory (used by writeDossier; recorded in meta). */
  out?: string;
  /** Emit JSON to stdout in the CLI. */
  json?: boolean;
  /** Optional API keys for future enrichment (none required). */
  apiKeys?: {
    anthropic?: string;
    [key: string]: string | undefined;
  };
  /** Restrict to a subset of sections. Defaults to all nine. */
  sections?: SectionId[];
  /** Progress callback for status messages. */
  progress?: ProgressCallback;
  /** Max internal pages to crawl (default 25). */
  maxPages?: number;
  /** Skip slow HEAD-probing of social platforms (default false). */
  skipSocialProbe?: boolean;
}

export interface DossierMeta {
  target: string;
  companyName: string;
  domain: string;
  websiteUrl: string;
  generatedAt: string;
  generator: string;
  homepage: string;
  sectionsRequested: SectionId[];
  sources: Array<{ name: string; status: 'ok' | 'partial' | 'failed'; note?: string }>;
}

export interface DossierData {
  website?: WebsiteData;
  wayback?: WaybackData;
  dns?: DnsData;
  tech?: TechStackData;
  search?: SearchData;
}

export interface DossierFile {
  path: string;
  content: string;
}

export interface DossierResult {
  meta: DossierMeta;
  json: Record<string, unknown>;
  files: DossierFile[];
}

const GENERATOR = 'company-dossier v0.3.0';
const HOMEPAGE = 'https://companydossier.lol';
const GAP = '_Gap: no public data found — requires manual research._';

function deriveCompanyName(target: string, website?: WebsiteData): string {
  // Prefer schema.org name, then a cleaned page title, then the domain.
  const schemaName =
    website?.schemaOrg && typeof website.schemaOrg === 'object'
      ? (website.schemaOrg as Record<string, unknown>).name
      : undefined;
  if (typeof schemaName === 'string' && schemaName.trim()) {
    return schemaName.trim();
  }
  if (!looksLikeDomain(target)) {
    return target.trim();
  }
  if (website?.title) {
    // Page titles are often "Brand | Tagline" — take the first segment.
    const seg = website.title.split(/[|–—\-:·]/)[0].trim();
    if (seg && seg.length <= 60) {
      return seg;
    }
  }
  const domain = toDomain(target);
  const root = domain.split('.')[0];
  return titleCase(root);
}

function sourceLine(label: string): string {
  return `\n\n> Source: ${label}`;
}

/* ------------------------------------------------------------------ */
/* Section renderers — each returns markdown for one dossier section.   */
/* ------------------------------------------------------------------ */

function renderOverview(meta: DossierMeta, d: DossierData): string {
  const w = d.website;
  const schema =
    w?.schemaOrg && typeof w.schemaOrg === 'object'
      ? JSON.stringify(w.schemaOrg, null, 2)
      : null;
  const desc = w?.description || '';
  return `# 1. Overview & Identity — ${meta.companyName}

| Field | Value | Source |
|-------|-------|--------|
| Company name | ${meta.companyName} | ${schema ? 'Schema.org / HTML' : w?.title ? 'HTML <title>' : 'derived from domain'} |
| Website | ${meta.websiteUrl || 'N/A'} | input |
| Domain | ${meta.domain} | input |
| Page title | ${w?.title || 'N/A'} | HTML \`<title>\` |
| Description | ${desc || 'N/A'} | meta description |
| Pages crawled | ${w?.pageCount ?? 0} | website crawler |
| Keywords | ${w?.keywords?.length ? w.keywords.join(', ') : 'N/A'} | meta keywords |

## Description

${desc ? desc : GAP}${desc ? sourceLine(`${meta.websiteUrl} meta description`) : ''}

## Schema.org (JSON-LD)

${
  schema
    ? '```json\n' + schema + '\n```' + sourceLine(`${meta.websiteUrl} <script type="application/ld+json">`)
    : '_No schema.org JSON-LD found on the homepage._'
}
`;
}

function renderPeople(meta: DossierMeta, d: DossierData): string {
  const w = d.website;
  const emails = w?.allEmails || [];
  // Heuristic: named-person emails (first.last@ or first@) hint at staff.
  const personEmails = emails.filter((e) => /^[a-z]+([._-][a-z]+)?@/i.test(e));
  return `# 2. People & Org Chart — ${meta.companyName}

> People data from public pages is limited. Named individuals, titles, and an
> org chart usually require LinkedIn, press, or filings — marked as gaps below.

## Contact emails (${emails.length})

${emails.length ? emails.map((e) => `- \`${e}\``).join('\n') + sourceLine('website crawl') : GAP}

## Likely individual contacts

${
  personEmails.length
    ? personEmails.map((e) => `- \`${e}\` (name-pattern email)`).join('\n') +
      sourceLine('inferred from email format — unverified')
    : '_No personal-pattern emails found._'
}

## Leadership & org chart

${GAP}
`;
}

function renderHiring(meta: DossierMeta, d: DossierData): string {
  const w = d.website;
  const careerPages = (w?.pages || []).filter((p) =>
    /career|job|hiring|join|work-with-us|vacanc|recruit/i.test(p.url + ' ' + p.title)
  );
  const sitemapCareer = (w?.sitemapUrls || []).filter((u) => /career|job|hiring|recruit/i.test(u));
  return `# 3. Hiring Radar — ${meta.companyName}

> Signals of growth and open roles, derived from the company's own site.

## Careers / jobs pages found

${
  careerPages.length
    ? careerPages.map((p) => `- [${p.title || p.url}](${p.url})`).join('\n') +
      sourceLine('website crawl')
    : '_No careers pages found during crawl._'
}

## Career URLs in sitemap

${
  sitemapCareer.length
    ? sitemapCareer.slice(0, 30).map((u) => `- ${u}`).join('\n') + sourceLine('sitemap.xml')
    : '_None in sitemap (or no sitemap available)._'
}

## Open roles & headcount trend

${GAP}
`;
}

function renderMoney(meta: DossierMeta, d: DossierData): string {
  const s = d.search;
  const contracts = s?.usaSpendingContracts || [];
  let contractTable = '';
  if (contracts.length) {
    const total = s?.usaSpendingTotal || contracts.reduce((a, c) => a + c.totalObligation, 0);
    contractTable = `### Federal contracts (USASpending.gov)

> ${s?.usaSpendingAwards || contracts.length} awards found; top ${contracts.length} shown. Total obligated: $${Math.round(total).toLocaleString()}

| Award ID | Agency | Amount | Period | Description |
|----------|--------|--------|--------|-------------|
${contracts
  .map(
    (c) =>
      `| ${c.awardId} | ${c.awardingAgency} | $${Math.round(c.totalObligation).toLocaleString()} | ${c.startDate} → ${c.endDate} | ${(c.description || '').slice(0, 80).replace(/\|/g, '/')} |`
  )
  .join('\n')}${sourceLine('api.usaspending.gov')}`;
  }

  return `# 4. Money Trail — ${meta.companyName}

> Public financial signals. Revenue, funding, and valuation for private
> companies are rarely public and are marked as gaps.

${contracts.length ? contractTable : '### Federal contracts\n\n_No USASpending.gov contract awards matched this name._'}

## Funding, revenue & valuation

${GAP}
`;
}

function renderLocations(meta: DossierMeta, d: DossierData): string {
  const w = d.website;
  const phones = w?.allPhones || [];
  // Pull postal-address fragments from schema.org if present.
  let address = '';
  const schema = w?.schemaOrg;
  if (schema && typeof schema === 'object') {
    const addr = (schema as Record<string, unknown>).address;
    if (addr) {
      address = '```json\n' + JSON.stringify(addr, null, 2) + '\n```';
    }
  }
  return `# 5. Locations — ${meta.companyName}

## Address (schema.org)

${address ? address + sourceLine('schema.org address') : '_No structured address found._'}

## Phone numbers (${phones.length})

${phones.length ? phones.map((p) => `- ${p}`).join('\n') + sourceLine('website crawl') : GAP}

## Offices & facilities

${GAP}
`;
}

function renderTech(meta: DossierMeta, d: DossierData): string {
  const t = d.tech;
  const dns = d.dns;
  if (!t && !dns) {
    return `# 6. Tech Fingerprint — ${meta.companyName}\n\n${GAP}\n`;
  }
  const techBlock = t
    ? `## Web technology

| Component | Value | Confidence |
|-----------|-------|-----------|
| CMS | ${t.cms} | ${t.cms !== 'Unknown' ? 'high' : 'low'} |
| Generator | ${t.metaGenerator || 'Not detected'} | ${t.metaGenerator ? 'high' : 'low'} |
| CDN | ${t.cdn || 'Not detected'} | ${t.cdn ? 'high' : 'low'} |
| Frameworks | ${t.frameworks.length ? t.frameworks.join(', ') : 'Not detected'} | moderate |

### Analytics
${t.analyticsIds.length ? t.analyticsIds.map((id) => `- \`${id}\``).join('\n') : '_None detected._'}

### Tag managers
${t.gtmIds.length ? t.gtmIds.map((id) => `- \`${id}\``).join('\n') : '_None detected._'}

### Advertising pixels
${t.adPixels.length ? t.adPixels.map((p) => `- ${p}`).join('\n') : '_None detected._'}${sourceLine('HTML fingerprint of crawled pages')}`
    : '';

  const dnsBlock = dns
    ? `## Email & DNS infrastructure

**Email provider:** ${dns.emailProvider} (from MX records)

| Priority | MX Exchange |
|----------|-------------|
${dns.mxRecords.length ? dns.mxRecords.map((r) => `| ${r.priority} | ${r.exchange} |`).join('\n') : '| — | No MX records |'}

**SPF:** \`${dns.spfRecord || 'none'}\`
**DMARC:** \`${dns.dmarcRecord || 'none'}\`

### Verification tokens
${dns.verificationTokens.length ? dns.verificationTokens.map((v) => `- \`${v}\``).join('\n') : '_None found._'}

### Subdomains (CNAME)
${dns.subdomains.length ? dns.subdomains.map((s) => `- ${s}`).join('\n') : '_None detected._'}${sourceLine('DNS resolver (MX/TXT/CNAME)')}`
    : '';

  return `# 6. Tech Fingerprint — ${meta.companyName}

${techBlock}

${dnsBlock}
`;
}

function renderNews(meta: DossierMeta, d: DossierData): string {
  const wb = d.wayback;
  if (!wb || wb.error) {
    return `# 7. News & Timeline — ${meta.companyName}\n\n_Wayback Machine data unavailable${wb?.error ? `: ${wb.error}` : ''}._\n\n## Press & news\n\n${GAP}\n`;
  }
  const firstYear = wb.firstCapture ? wb.firstCapture.slice(0, 4) : '';
  const lastYear = wb.lastCapture ? wb.lastCapture.slice(0, 4) : '';
  const yearsActive = firstYear && lastYear ? parseInt(lastYear) - parseInt(firstYear) : 0;

  const yearCounts = new Map<string, number>();
  for (const entry of wb.captureTimeline) {
    const year = entry.month.slice(0, 4);
    yearCounts.set(year, (yearCounts.get(year) || 0) + entry.count);
  }
  const yearTable = [...yearCounts.entries()]
    .map(([year, ct]) => `| ${year} | ${ct} |`)
    .join('\n');

  return `# 7. News & Timeline — ${meta.companyName}

## Website history (Wayback Machine)

| Metric | Value |
|--------|-------|
| First capture | ${wb.firstCapture || 'Unknown'} |
| Last capture | ${wb.lastCapture || 'Unknown'} |
| Years archived | ${yearsActive > 0 ? yearsActive : 'Unknown'} |
| Total captures | ${wb.totalCaptures} |
| Unique URLs | ${wb.uniqueUrls.length} |
| PDFs discovered | ${wb.pdfUrls.length} |
| Deleted pages | ${wb.deletedPages.length} |

${wb.siteGrowthSummary ? `**Growth:** ${wb.siteGrowthSummary}\n` : ''}
${yearTable ? `### Captures by year\n\n| Year | Captures |\n|------|----------|\n${yearTable}\n` : ''}
### Notable archived PDFs
${wb.pdfWaybackUrls.length ? wb.pdfWaybackUrls.map((u) => `- ${u}`).join('\n') : '_None found._'}

### Deleted pages (were live, now gone)
${wb.deletedPages.length ? wb.deletedPages.slice(0, 30).map((u) => `- ${u}`).join('\n') : '_None detected._'}${sourceLine('web.archive.org CDX API')}

## Press & news coverage

${GAP}
`;
}

function renderRelationships(meta: DossierMeta, d: DossierData): string {
  const s = d.search;
  const w = d.website;
  const social = s?.socialProfiles || [];
  // Merge in social links found directly in website HTML.
  const merged = new Map<string, { platform: string; url: string; source: string }>();
  for (const p of social) {
    merged.set(p.platform + ':' + p.url, p);
  }
  for (const link of w?.socialLinks || []) {
    let platform = 'Other';
    if (/linkedin/i.test(link)) platform = 'LinkedIn';
    else if (/twitter|x\.com/i.test(link)) platform = 'Twitter/X';
    else if (/facebook/i.test(link)) platform = 'Facebook';
    else if (/instagram/i.test(link)) platform = 'Instagram';
    else if (/youtube/i.test(link)) platform = 'YouTube';
    else if (/tiktok/i.test(link)) platform = 'TikTok';
    else if (/github/i.test(link)) platform = 'GitHub';
    const key = platform + ':' + link;
    if (!merged.has(key)) merged.set(key, { platform, url: link, source: 'website HTML' });
  }
  const all = [...merged.values()];

  return `# 8. Relationship Web — ${meta.companyName}

## Social & external profiles (${all.length})

${
  all.length
    ? all.map((p) => `- **${p.platform}**: [${p.url}](${p.url}) _(${p.source})_`).join('\n')
    : GAP
}

## Partners, suppliers & customers

${GAP}
`;
}

function renderRisk(meta: DossierMeta, d: DossierData): string {
  const flags: string[] = [];
  const dns = d.dns;
  const wb = d.wayback;
  const w = d.website;

  if (dns && !dns.dmarcRecord) {
    flags.push('No DMARC record — domain is more vulnerable to email spoofing. _(Source: DNS)_');
  }
  if (dns && !dns.spfRecord) {
    flags.push('No SPF record — sender policy not published. _(Source: DNS)_');
  }
  if (wb && !wb.error && wb.deletedPages.length > 0) {
    flags.push(
      `${wb.deletedPages.length} pages were live and are now gone — possible discontinued products or repositioning. _(Source: Wayback)_`
    );
  }
  if (w?.error) {
    flags.push(`Homepage was unreachable during crawl: ${w.error} _(Source: crawler)_`);
  }
  if (wb && !wb.error && wb.siteGrowthSummary.includes('-') && /-\d+%/.test(wb.siteGrowthSummary)) {
    flags.push('Declining web-capture activity in the second half of history. _(Source: Wayback)_');
  }

  return `# 9. Risk Flags — ${meta.companyName}

> Automated, low-confidence signals from public technical data. Not legal,
> financial, or compliance advice. Verify before acting.

## Detected flags

${flags.length ? flags.map((f) => `- ${f}`).join('\n') : '_No automated risk flags raised from collected data._'}

## Legal, regulatory & financial risk

${GAP}
`;
}

const RENDERERS: Record<SectionId, (meta: DossierMeta, d: DossierData) => string> = {
  overview: renderOverview,
  people: renderPeople,
  hiring: renderHiring,
  money: renderMoney,
  locations: renderLocations,
  tech: renderTech,
  news: renderNews,
  relationships: renderRelationships,
  risk: renderRisk,
};

const SECTION_FILENAMES: Record<SectionId, string> = {
  overview: '01_overview_identity.md',
  people: '02_people_org_chart.md',
  hiring: '03_hiring_radar.md',
  money: '04_money_trail.md',
  locations: '05_locations.md',
  tech: '06_tech_fingerprint.md',
  news: '07_news_timeline.md',
  relationships: '08_relationship_web.md',
  risk: '09_risk_flags.md',
};

const SECTION_TITLES: Record<SectionId, string> = {
  overview: 'Overview & Identity',
  people: 'People & Org Chart',
  hiring: 'Hiring Radar',
  money: 'Money Trail',
  locations: 'Locations',
  tech: 'Tech Fingerprint',
  news: 'News & Timeline',
  relationships: 'Relationship Web',
  risk: 'Risk Flags',
};

function renderReadme(meta: DossierMeta, sections: SectionId[]): string {
  const sourceRows = meta.sources
    .map((s) => `| ${s.name} | ${s.status} | ${s.note || ''} |`)
    .join('\n');
  const nav = sections
    .map((id, i) => `| ${i + 1} | [${SECTION_TITLES[id]}](${SECTION_FILENAMES[id]}) |`)
    .join('\n');
  return `# ${meta.companyName} — Intelligence Dossier

> Compiled from PUBLIC data only by ${GENERATOR} on ${meta.generatedAt}.
> ${meta.homepage}

**Target:** ${meta.target}  |  **Domain:** ${meta.domain}  |  **Website:** ${meta.websiteUrl || 'N/A'}

## Collection summary

| Source | Status | Notes |
|--------|--------|-------|
${sourceRows}

## Sections

| # | Section |
|---|---------|
${nav}

---

Every derived claim is annotated with its source. Sections without public data
are clearly marked as gaps requiring manual research. This dossier uses no
private databases and no API keys are required.
`;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/**
 * Build a sourced intelligence dossier on a company from public data.
 * Resolves a domain or company name, runs the public collectors in
 * parallel where safe, and assembles markdown across nine sections.
 * Never throws on collector/network failure — unreachable sources are
 * recorded as gaps.
 */
export async function buildDossier(
  target: string,
  opts: BuildOptions = {}
): Promise<DossierResult> {
  const progress = opts.progress || (() => {});
  const sections = (opts.sections && opts.sections.length ? opts.sections : [...SECTIONS]).filter(
    (s): s is SectionId => (SECTIONS as readonly string[]).includes(s)
  );

  const isDomain = looksLikeDomain(target);
  const domain = isDomain ? toDomain(target) : '';
  const websiteUrl = domain ? `https://${domain}` : '';

  const needsWebsite =
    !!websiteUrl &&
    sections.some((s) =>
      ['overview', 'people', 'hiring', 'locations', 'tech', 'relationships', 'risk'].includes(s)
    );
  const needsDns = !!domain && sections.some((s) => ['tech', 'risk'].includes(s));
  const needsWayback = !!domain && sections.some((s) => ['news', 'risk'].includes(s));

  const data: DossierData = {};
  const sources: DossierMeta['sources'] = [];

  // ---- Phase 1: website crawl (needed first so search can reuse HTML) ----
  if (needsWebsite) {
    progress('Collecting website...');
    data.website = await collectWebsite(websiteUrl, {
      maxPages: opts.maxPages ?? 25,
      progress,
    });
    sources.push({
      name: 'Website crawl',
      status: data.website.error ? 'failed' : 'ok',
      note: data.website.error
        ? data.website.error
        : `${data.website.pageCount} pages, ${data.website.allEmails.length} emails`,
    });
    if (data.website.rawHtml || data.website.pages.length) {
      const allHtml = [data.website.rawHtml, ...data.website.pages.map((p) => p.textContent)].join(
        '\n'
      );
      data.tech = extractTechStack(allHtml);
      sources.push({ name: 'Tech fingerprint', status: 'ok', note: data.tech.cms });
    }
  }

  // ---- Phase 2: parallel DNS + Wayback + Search ----
  const companyNameSeed = deriveCompanyName(target, data.website);

  const tasks: Promise<void>[] = [];

  if (needsDns) {
    tasks.push(
      (async () => {
        progress('Collecting DNS...');
        data.dns = await collectDns(domain);
        sources.push({
          name: 'DNS recon',
          status: data.dns.error ? 'failed' : 'ok',
          note: data.dns.error || `${data.dns.mxRecords.length} MX, provider ${data.dns.emailProvider}`,
        });
      })()
    );
  }

  if (needsWayback) {
    tasks.push(
      (async () => {
        progress('Collecting Wayback history...');
        data.wayback = await collectWayback(domain, progress);
        sources.push({
          name: 'Wayback Machine',
          status: data.wayback.error ? 'failed' : 'ok',
          note: data.wayback.error || `${data.wayback.totalCaptures} captures`,
        });
      })()
    );
  }

  if (sections.some((s) => ['money', 'relationships'].includes(s))) {
    tasks.push(
      (async () => {
        progress('Collecting public search...');
        const pageContents =
          data.website?.rawHtml || data.website?.pages.length
            ? [data.website!.rawHtml, ...(data.website!.pages.map((p) => p.textContent) || [])]
            : undefined;
        data.search = await collectSearch(companyNameSeed, {
          progress,
          pageContents,
          probeSocial: !opts.skipSocialProbe,
        });
        sources.push({
          name: 'Public search',
          status: data.search.error ? 'failed' : 'ok',
          note: `${data.search.usaSpendingContracts.length} contracts, ${data.search.socialProfiles.length} social profiles`,
        });
      })()
    );
  }

  await Promise.all(tasks);

  const companyName = deriveCompanyName(target, data.website);

  const meta: DossierMeta = {
    target,
    companyName,
    domain: domain || '(name only)',
    websiteUrl,
    generatedAt: todayISO(),
    generator: GENERATOR,
    homepage: HOMEPAGE,
    sectionsRequested: sections,
    sources,
  };

  // ---- Assemble files ----
  const files: DossierFile[] = [];
  files.push({ path: 'README.md', content: renderReadme(meta, sections) });
  for (const id of sections) {
    files.push({ path: SECTION_FILENAMES[id], content: RENDERERS[id](meta, data) });
  }

  const json: Record<string, unknown> = {
    meta,
    data,
  };
  files.push({ path: 'dossier.json', content: JSON.stringify(json, null, 2) });

  progress('Dossier assembled.');
  return { meta, json, files };
}
