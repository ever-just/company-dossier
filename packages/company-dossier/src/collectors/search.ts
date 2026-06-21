import { sleep, USER_AGENT } from '../utils.js';

export type ProgressCallback = (message: string) => void;

export interface USASpendingContract {
  awardId: string;
  recipientName: string;
  totalObligation: number;
  awardingAgency: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SocialProfile {
  platform: string;
  url: string;
  source: string;
}

export interface SearchData {
  companyName: string;
  usaSpendingAwards: number;
  usaSpendingTotal: number;
  usaSpendingContracts: USASpendingContract[];
  socialProfiles: SocialProfile[];
  error?: string;
}

export interface SearchOptions {
  progress?: ProgressCallback;
  /** Already-crawled page HTML, used to extract on-site social links. */
  pageContents?: string[];
  /** Probe social platform URLs with HEAD requests (slower; default true). */
  probeSocial?: boolean;
}

async function urlExists(url: string, timeoutMs = 8000): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual',
      headers: { 'User-Agent': USER_AGENT },
    });
    const status = resp.status;
    return status === 200 || status === 301 || status === 302;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function generateSlugs(companyName: string): string[] {
  const base = companyName.toLowerCase().trim();
  const slugs = new Set<string>();
  slugs.add(base.replace(/[^a-z0-9]/g, ''));
  slugs.add(
    base
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '')
      .replace(/^-+/, '')
  );
  slugs.add(
    base
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/_+$/, '')
      .replace(/^_+/, '')
  );
  const stripped = base
    .replace(/\b(inc|llc|corp|corporation|ltd|limited|co|company|group|holdings)\b/gi, '')
    .trim();
  if (stripped && stripped !== base) {
    slugs.add(stripped.replace(/[^a-z0-9]/g, ''));
    slugs.add(
      stripped
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+$/, '')
        .replace(/^-+/, '')
    );
  }
  return [...slugs].filter((s) => s.length > 1);
}

function isGenericHandle(handle: string): boolean {
  const generic = new Set([
    'share',
    'sharer',
    'intent',
    'home',
    'search',
    'login',
    'signup',
    'about',
    'help',
    'support',
    'privacy',
    'terms',
    'policy',
    'hashtag',
    'explore',
    'settings',
    'legal',
  ]);
  return generic.has(handle.toLowerCase());
}

async function queryUSASpending(
  companyName: string,
  progress: ProgressCallback
): Promise<{ awards: number; total: number; contracts: USASpendingContract[] }> {
  progress('Search: Querying USASpending.gov...');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const body = JSON.stringify({
      filters: {
        recipient_search_text: [companyName],
        time_period: [
          { start_date: '2010-01-01', end_date: new Date().toISOString().split('T')[0] },
        ],
        award_type_codes: ['A', 'B', 'C', 'D'],
      },
      fields: [
        'Award ID',
        'Recipient Name',
        'Total Obligation',
        'Awarding Agency',
        'Start Date',
        'End Date',
        'Description',
      ],
      limit: 25,
      page: 1,
      sort: 'Total Obligation',
      order: 'desc',
    });

    const resp = await fetch('https://api.usaspending.gov/api/v2/search/spending_by_award/', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'User-Agent': USER_AGENT },
      body,
    });

    if (!resp.ok) {
      progress(`USASpending: HTTP ${resp.status}`);
      return { awards: 0, total: 0, contracts: [] };
    }

    const data = (await resp.json()) as {
      page_metadata?: { total?: number };
      results?: Array<Record<string, unknown>>;
    };
    const awards = data.page_metadata?.total || 0;
    const contracts: USASpendingContract[] = [];
    let total = 0;

    if (Array.isArray(data.results)) {
      for (const r of data.results) {
        const amt = parseFloat(String(r['Total Obligation'] ?? '0'));
        if (!isNaN(amt)) {
          total += amt;
        }
        contracts.push({
          awardId: String(r['Award ID'] ?? ''),
          recipientName: String(r['Recipient Name'] ?? ''),
          totalObligation: isNaN(amt) ? 0 : amt,
          awardingAgency: String(r['Awarding Agency'] ?? ''),
          startDate: String(r['Start Date'] ?? ''),
          endDate: String(r['End Date'] ?? ''),
          description: String(r['Description'] ?? ''),
        });
      }
    }

    progress(`USASpending: ${awards} awards, $${Math.round(total).toLocaleString()} total.`);
    return { awards, total, contracts };
  } catch (err) {
    progress('USASpending: query failed — ' + (err instanceof Error ? err.message : String(err)));
    return { awards: 0, total: 0, contracts: [] };
  } finally {
    clearTimeout(timer);
  }
}

async function discoverSocialProfiles(
  companyName: string,
  progress: ProgressCallback
): Promise<SocialProfile[]> {
  const slugs = generateSlugs(companyName);
  const profiles: SocialProfile[] = [];
  const checked = new Set<string>();

  const platforms = [
    { name: 'LinkedIn', template: (s: string) => `https://www.linkedin.com/company/${s}` },
    { name: 'Twitter/X', template: (s: string) => `https://x.com/${s}` },
    { name: 'Facebook', template: (s: string) => `https://www.facebook.com/${s}` },
    { name: 'Instagram', template: (s: string) => `https://www.instagram.com/${s}` },
    { name: 'YouTube', template: (s: string) => `https://www.youtube.com/@${s}` },
    { name: 'TikTok', template: (s: string) => `https://www.tiktok.com/@${s}` },
    { name: 'GitHub', template: (s: string) => `https://github.com/${s}` },
  ];

  progress(
    `Search: Probing social profiles for ${slugs.length} slug(s) across ${platforms.length} platforms...`
  );

  for (const platform of platforms) {
    for (const slug of slugs) {
      const url = platform.template(slug);
      if (checked.has(url)) {
        continue;
      }
      checked.add(url);
      if (profiles.some((p) => p.platform === platform.name)) {
        break;
      }
      await sleep(700);
      const exists = await urlExists(url);
      if (exists) {
        profiles.push({ platform: platform.name, url, source: 'HEAD probe' });
        progress(`Search: Found ${platform.name} profile.`);
        break;
      }
    }
  }

  progress(`Search: ${profiles.length} social profiles discovered via probing.`);
  return profiles;
}

function extractSocialFromPages(pageContents: string[]): SocialProfile[] {
  const socialPatterns: Array<{ platform: string; regex: RegExp }> = [
    { platform: 'LinkedIn', regex: /https?:\/\/(?:www\.)?linkedin\.com\/company\/([a-zA-Z0-9_-]+)/g },
    { platform: 'Twitter/X', regex: /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/g },
    { platform: 'Facebook', regex: /https?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9._-]+)/g },
    { platform: 'Instagram', regex: /https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)/g },
    { platform: 'YouTube', regex: /https?:\/\/(?:www\.)?youtube\.com\/(?:@|channel\/|c\/|user\/)([a-zA-Z0-9_-]+)/g },
    { platform: 'GitHub', regex: /https?:\/\/(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/g },
    { platform: 'TikTok', regex: /https?:\/\/(?:www\.)?tiktok\.com\/@([a-zA-Z0-9._]+)/g },
    { platform: 'Pinterest', regex: /https?:\/\/(?:www\.)?pinterest\.com\/([a-zA-Z0-9_-]+)/g },
    { platform: 'Glassdoor', regex: /https?:\/\/(?:www\.)?glassdoor\.com\/Overview\/[^"'\s]+/g },
    { platform: 'Crunchbase', regex: /https?:\/\/(?:www\.)?crunchbase\.com\/organization\/([a-zA-Z0-9_-]+)/g },
  ];

  const profiles: SocialProfile[] = [];
  const seen = new Set<string>();
  const allHtml = pageContents.join('\n');

  for (const { platform, regex } of socialPatterns) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(allHtml)) !== null) {
      const fullUrl = match[0];
      const handle = match[1] || fullUrl;
      const key = platform + ':' + handle.toLowerCase();
      if (!seen.has(key) && !isGenericHandle(handle)) {
        seen.add(key);
        profiles.push({
          platform,
          url: fullUrl.startsWith('http') ? fullUrl : 'https://' + fullUrl,
          source: 'website crawl',
        });
      }
    }
  }
  return profiles;
}

/**
 * Public-search collector: USASpending.gov federal contracts, optional
 * HEAD-probing of social platforms, and social-link extraction from
 * already-crawled HTML. Never throws.
 */
export async function collectSearch(
  companyName: string,
  options: SearchOptions = {}
): Promise<SearchData> {
  const progress = options.progress || (() => {});

  const result: SearchData = {
    companyName,
    usaSpendingAwards: 0,
    usaSpendingTotal: 0,
    usaSpendingContracts: [],
    socialProfiles: [],
  };

  try {
    const spending = await queryUSASpending(companyName, progress);
    result.usaSpendingAwards = spending.awards;
    result.usaSpendingTotal = spending.total;
    result.usaSpendingContracts = spending.contracts;
  } catch (err) {
    progress('USASpending error: ' + (err instanceof Error ? err.message : String(err)));
  }

  // Extract social profiles from crawled pages first (cheap, no network).
  if (options.pageContents && options.pageContents.length > 0) {
    try {
      const extracted = extractSocialFromPages(options.pageContents);
      const existingKeys = new Set(result.socialProfiles.map((p) => p.platform + ':' + p.url));
      for (const profile of extracted) {
        const key = profile.platform + ':' + profile.url;
        if (!existingKeys.has(key)) {
          result.socialProfiles.push(profile);
          existingKeys.add(key);
        }
      }
    } catch (err) {
      progress('Social extraction error: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  if (options.probeSocial !== false) {
    try {
      const probed = await discoverSocialProfiles(companyName, progress);
      const existingPlatforms = new Set(result.socialProfiles.map((p) => p.platform));
      for (const p of probed) {
        if (!existingPlatforms.has(p.platform)) {
          result.socialProfiles.push(p);
          existingPlatforms.add(p.platform);
        }
      }
    } catch (err) {
      progress('Social probe error: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  progress(
    `Search complete: ${result.usaSpendingAwards} gov awards, ${result.socialProfiles.length} social profiles.`
  );

  return result;
}
