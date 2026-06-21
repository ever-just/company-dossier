import * as fs from 'node:fs';
import * as path from 'node:path';

const USER_AGENT = 'company-dossier/0.1 (+https://companydossier.lol)';

export function mkdirp(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function writeFileSafe(filePath: string, content: string): void {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/_+$/, '')
    .replace(/^_+/, '');
}

export function titleCase(str: string): string {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Fetch text with a timeout. Throws on non-2xx or network failure. */
import { lookup } from 'node:dns/promises';

/** True if an IP literal is private/loopback/link-local/CGNAT/metadata — i.e. SSRF-risky. */
function isPrivateIp(ip: string): boolean {
  const v = ip.replace(/^\[|\]$/g, '').toLowerCase();
  // IPv6
  if (v.includes(':')) {
    if (v === '::1' || v === '::') return true;
    if (v.startsWith('fe80') || v.startsWith('fc') || v.startsWith('fd')) return true; // link-local / unique-local
    const m = v.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/); // ::ffff:1.2.3.4
    if (m) return isPrivateIp(m[1]);
    return false;
  }
  const p = v.split('.').map(Number);
  if (p.length !== 4 || p.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return true; // malformed → block
  const [a, b] = p;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 169 && b === 254) return true;             // link-local incl. 169.254.169.254 metadata
  if (a === 100 && b >= 64 && b <= 127) return true;   // CGNAT
  if (a === 192 && b === 0) return true;               // 192.0.0.0/24
  return false;
}

/** Reject non-public targets before fetching (SSRF protection). */
async function assertPublicUrl(url: string): Promise<void> {
  let u: URL;
  try { u = new URL(url); } catch { throw new Error('Invalid URL'); }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new Error(`Blocked protocol: ${u.protocol}`);
  const host = u.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.internal') || host.endsWith('.local')) {
    throw new Error(`Blocked host: ${host}`);
  }
  if (/^[0-9.]+$/.test(host) || host.includes(':')) {
    if (isPrivateIp(host)) throw new Error(`Blocked private address: ${host}`);
    return;
  }
  const addrs = await lookup(host, { all: true });
  for (const a of addrs) if (isPrivateIp(a.address)) throw new Error(`Blocked private address for ${host}: ${a.address}`);
}

export async function fetchText(url: string, timeoutMs = 10000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let current = url;
    for (let hop = 0; hop < 5; hop++) {
      await assertPublicUrl(current);                  // re-validate every hop (redirect SSRF)
      const resp = await fetch(current, {
        signal: controller.signal,
        redirect: 'manual',
        headers: { 'User-Agent': USER_AGENT },
      });
      if (resp.status >= 300 && resp.status < 400) {
        const loc = resp.headers.get('location');
        if (!loc) throw new Error(`HTTP ${resp.status} without Location`);
        current = new URL(loc, current).toString();
        continue;
      }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return await resp.text();
    }
    throw new Error('Too many redirects');
  } finally {
    clearTimeout(timer);
  }
}

/** Fetch JSON with a timeout. */
export async function fetchJSON(url: string, timeoutMs = 15000): Promise<unknown> {
  const text = await fetchText(url, timeoutMs);
  return JSON.parse(text);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Normalize an input that may be a URL or bare domain into a clean hostname. */
export function toDomain(input: string): string {
  return input
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .replace(/^www\./i, '')
    .toLowerCase();
}

/** Return true if the input looks like a domain or URL rather than a plain name. */
export function looksLikeDomain(input: string): boolean {
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return true;
  }
  // Bare domain heuristic: contains a dot, no spaces, valid TLD-ish.
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(trimmed) && !trimmed.includes(' ');
}

export { USER_AGENT };
