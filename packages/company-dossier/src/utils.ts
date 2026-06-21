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
export async function fetchText(url: string, timeoutMs = 10000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT },
    });
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }
    return await resp.text();
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
