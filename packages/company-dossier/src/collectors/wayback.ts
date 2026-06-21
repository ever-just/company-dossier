import { fetchJSON, sleep, toDomain } from '../utils.js';

export type ProgressCallback = (message: string) => void;

export interface WaybackData {
  domain: string;
  totalCaptures: number;
  firstCapture: string;
  lastCapture: string;
  uniqueUrls: string[];
  pdfUrls: string[];
  pdfWaybackUrls: string[];
  deletedPages: string[];
  contentTypeDistribution: Record<string, number>;
  captureTimeline: Array<{ month: string; count: number }>;
  capturesPerMonth: number;
  siteGrowthSummary: string;
  error?: string;
}

function timestampToMonth(ts: string): string {
  return ts.slice(0, 4) + '-' + ts.slice(4, 6);
}

function formatTimestamp(ts: string): string {
  if (ts.length < 8) {
    return ts;
  }
  return `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}`;
}

function waybackUrl(timestamp: string, originalUrl: string): string {
  return `https://web.archive.org/web/${timestamp}/${originalUrl}`;
}

/**
 * Reconstruct a site's history from the Internet Archive CDX API:
 * unique URLs, PDFs, deleted pages, and a capture timeline. Never throws —
 * a failed query records an `error` and returns partial data.
 */
export async function collectWayback(
  domainInput: string,
  progressCallback?: ProgressCallback
): Promise<WaybackData> {
  const progress = progressCallback || (() => {});
  const domain = toDomain(domainInput);

  const result: WaybackData = {
    domain,
    totalCaptures: 0,
    firstCapture: '',
    lastCapture: '',
    uniqueUrls: [],
    pdfUrls: [],
    pdfWaybackUrls: [],
    deletedPages: [],
    contentTypeDistribution: {},
    captureTimeline: [],
    capturesPerMonth: 0,
    siteGrowthSummary: '',
  };

  // ---- Query 1: All unique URLs (collapse by original) ----
  progress('Wayback: Querying all unique URLs...');
  try {
    const cdxUrl = `https://web.archive.org/cdx/search/cdx?url=${domain}/*&output=json&fl=timestamp,original,statuscode,mimetype&collapse=original&limit=2000`;
    const data = (await fetchJSON(cdxUrl, 30000)) as unknown[][];

    if (!Array.isArray(data) || data.length < 2) {
      result.error = 'No Wayback data found';
      return result;
    }

    const rows = data.slice(1);
    result.totalCaptures = rows.length;

    const timestamps = rows.map((r) => String(r[0])).sort();
    result.firstCapture = formatTimestamp(timestamps[0] || '');
    result.lastCapture = formatTimestamp(timestamps[timestamps.length - 1] || '');

    const urlSet = new Set<string>();
    for (const row of rows) {
      urlSet.add(String(row[1]));
    }
    result.uniqueUrls = [...urlSet].slice(0, 500);

    const mimeCount: Record<string, number> = {};
    for (const row of rows) {
      const mime = String(row[3] || 'unknown')
        .split(';')[0]
        .trim()
        .toLowerCase();
      const category = mime.includes('html')
        ? 'HTML'
        : mime.includes('pdf')
          ? 'PDF'
          : mime.includes('image')
            ? 'Image'
            : mime.includes('javascript') || mime.includes('ecmascript')
              ? 'JavaScript'
              : mime.includes('css')
                ? 'CSS'
                : mime.includes('json')
                  ? 'JSON'
                  : mime.includes('xml')
                    ? 'XML'
                    : 'Other';
      mimeCount[category] = (mimeCount[category] || 0) + 1;
    }
    result.contentTypeDistribution = mimeCount;

    const urlStatusMap = new Map<string, { statuses: string[]; timestamps: string[] }>();
    for (const row of rows) {
      const url = String(row[1]);
      const status = String(row[2]);
      const ts = String(row[0]);
      if (!urlStatusMap.has(url)) {
        urlStatusMap.set(url, { statuses: [], timestamps: [] });
      }
      urlStatusMap.get(url)!.statuses.push(status);
      urlStatusMap.get(url)!.timestamps.push(ts);
    }
    for (const [url, info] of urlStatusMap) {
      if (
        info.statuses.includes('200') &&
        info.statuses[info.statuses.length - 1] !== '200'
      ) {
        result.deletedPages.push(url);
      }
    }

    progress(
      `Wayback Q1: ${result.uniqueUrls.length} unique URLs, first: ${result.firstCapture}, last: ${result.lastCapture}`
    );
  } catch (err) {
    result.error = 'CDX query 1 failed: ' + (err instanceof Error ? err.message : String(err));
    return result;
  }

  await sleep(1500);

  // ---- Query 2: PDFs specifically ----
  progress('Wayback: Querying PDFs...');
  try {
    const pdfCdxUrl = `https://web.archive.org/cdx/search/cdx?url=${domain}/*&output=json&fl=timestamp,original,statuscode,mimetype&mimetype=application/pdf&limit=500`;
    const pdfData = (await fetchJSON(pdfCdxUrl, 20000)) as unknown[][];

    if (Array.isArray(pdfData) && pdfData.length > 1) {
      const pdfRows = pdfData.slice(1);
      const pdfOriginals = new Map<string, string>();
      for (const row of pdfRows) {
        const orig = String(row[1]);
        const ts = String(row[0]);
        if (!pdfOriginals.has(orig) || ts > pdfOriginals.get(orig)!) {
          pdfOriginals.set(orig, ts);
        }
      }
      result.pdfUrls = [...pdfOriginals.keys()];
      const pdfEntries = [...pdfOriginals.entries()].slice(0, 10);
      result.pdfWaybackUrls = pdfEntries.map(([orig, ts]) => waybackUrl(ts, orig));
      progress(`Wayback Q2: ${result.pdfUrls.length} unique PDFs found.`);
    } else {
      progress('Wayback Q2: No PDFs found.');
    }
  } catch (err) {
    progress('Wayback Q2 failed: ' + (err instanceof Error ? err.message : String(err)));
  }

  await sleep(1500);

  // ---- Query 3: Capture timeline (collapse by month) ----
  progress('Wayback: Querying capture timeline...');
  try {
    const timelineCdxUrl = `https://web.archive.org/cdx/search/cdx?url=${domain}/*&output=json&fl=timestamp&collapse=timestamp:6&limit=5000`;
    const timelineData = (await fetchJSON(timelineCdxUrl, 20000)) as unknown[][];

    if (Array.isArray(timelineData) && timelineData.length > 1) {
      const timelineRows = timelineData.slice(1);
      const monthCounts = new Map<string, number>();
      for (const row of timelineRows) {
        const month = timestampToMonth(String(row[0]));
        monthCounts.set(month, (monthCounts.get(month) || 0) + 1);
      }
      const sortedMonths = [...monthCounts.entries()].sort((a, b) =>
        a[0].localeCompare(b[0])
      );
      result.captureTimeline = sortedMonths.map(([month, count]) => ({ month, count }));

      if (sortedMonths.length > 0) {
        const totalMonthCaptures = sortedMonths.reduce((sum, [, c]) => sum + c, 0);
        result.capturesPerMonth =
          Math.round((totalMonthCaptures / sortedMonths.length) * 10) / 10;
      }

      if (sortedMonths.length >= 2) {
        const firstYear = sortedMonths[0][0].slice(0, 4);
        const lastYear = sortedMonths[sortedMonths.length - 1][0].slice(0, 4);
        const yearSpan = parseInt(lastYear) - parseInt(firstYear) + 1;
        const mid = Math.floor(sortedMonths.length / 2);
        const firstHalfAvg =
          sortedMonths.slice(0, mid).reduce((s, [, c]) => s + c, 0) / Math.max(mid, 1);
        const secondHalfAvg =
          sortedMonths.slice(mid).reduce((s, [, c]) => s + c, 0) /
          (sortedMonths.length - mid);
        const growthPct =
          firstHalfAvg > 0
            ? Math.round(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100)
            : 0;
        result.siteGrowthSummary = `${yearSpan} years of captures (${firstYear}-${lastYear}). ${timelineRows.length} total timeline entries across ${sortedMonths.length} months. Avg ${result.capturesPerMonth} captures/month. Second-half activity ${growthPct >= 0 ? '+' : ''}${growthPct}% vs first-half.`;
      }
      progress(`Wayback Q3: ${result.captureTimeline.length} months of activity.`);
    } else {
      progress('Wayback Q3: No timeline data.');
    }
  } catch (err) {
    progress('Wayback Q3 failed: ' + (err instanceof Error ? err.message : String(err)));
  }

  progress(
    `Wayback complete: ${result.totalCaptures} captures, ${result.pdfUrls.length} PDFs, ${result.deletedPages.length} deleted pages.`
  );

  return result;
}
