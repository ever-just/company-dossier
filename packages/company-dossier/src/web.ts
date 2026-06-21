#!/usr/bin/env node
/**
 * company-dossier-web — a small public HTTP API that runs the real dossier engine
 * server-side (the browser can't crawl third-party sites due to CORS), so the
 * website widget can generate a genuine, sourced dossier with NO API key.
 *
 * POST /generate  body {"target": "acme.com", "sections"?: ["overview", ...]}
 *   Streams Server-Sent-Events: `progress` events per phase, then one `result`
 *   event { meta, json, markdown, files }, then closes. On failure: `error`.
 * GET /health -> {"status":"ok"}
 *
 * Public + rate-limited (per IP/hour) + global concurrency cap to protect the host.
 * Origins are restricted to an allowlist. The engine's own SSRF guard still applies.
 */
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { buildDossier, SECTIONS, type SectionId } from './core.js';

const PORT = Number(process.env.PORT) || 8788;
const HOST = process.env.HOST || '0.0.0.0';
const ALLOWED = (
  process.env.COMPANY_DOSSIER_WEB_ORIGINS ||
  'https://companydossier.lol,https://www.companydossier.lol,http://localhost:8080,http://localhost:3000,http://localhost:4173'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const RATE_MAX = Number(process.env.COMPANY_DOSSIER_WEB_RATE || 15); // per IP per rolling hour
const MAX_CONCURRENT = Number(process.env.COMPANY_DOSSIER_WEB_CONCURRENCY || 4);
const BUILD_TIMEOUT_MS = Number(process.env.COMPANY_DOSSIER_WEB_TIMEOUT || 120_000);

const hits = new Map<string, number[]>();
let active = 0;

function applyCors(req: IncomingMessage, res: ServerResponse): void {
  const o = req.headers.origin;
  if (o && ALLOWED.includes(o)) res.setHeader('Access-Control-Allow-Origin', o);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function clientIp(req: IncomingMessage): string {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || req.socket.remoteAddress || 'unknown';
}

function rateOk(addr: string): boolean {
  const now = Date.now();
  const arr = (hits.get(addr) || []).filter((t) => t > now - 3_600_000);
  if (arr.length >= RATE_MAX) {
    hits.set(addr, arr);
    return false;
  }
  arr.push(now);
  hits.set(addr, arr);
  return true;
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const c of req) {
    size += (c as Buffer).length;
    if (size > 64 * 1024) throw new Error('Body too large');
    chunks.push(c as Buffer);
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function sse(res: ServerResponse, event: string, data: unknown): void {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

async function handleGenerate(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const addr = clientIp(req);
  let body: { target?: unknown; sections?: unknown };
  try {
    body = (await readBody(req)) as typeof body;
  } catch {
    return sendJson(res, 400, { error: 'Invalid JSON body' });
  }

  const target = typeof body.target === 'string' ? body.target.trim() : '';
  if (!target || target.length > 120) {
    return sendJson(res, 400, { error: 'Provide a company name or domain (1–120 chars).' });
  }
  const sections =
    Array.isArray(body.sections) && body.sections.length
      ? (body.sections.filter((s) => (SECTIONS as readonly string[]).includes(String(s))) as SectionId[])
      : undefined;

  if (!rateOk(addr)) {
    return sendJson(res, 429, { error: `Rate limit reached (${RATE_MAX}/hour). Try the CLI or your own AI in the meantime.` });
  }
  if (active >= MAX_CONCURRENT) {
    return sendJson(res, 503, { error: 'Server busy — a few dossiers are building right now. Try again in a moment.' });
  }

  active++;
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  sse(res, 'progress', { message: 'Opening the file…', phase: 'start' });

  const timer = setTimeout(() => {
    try {
      sse(res, 'error', { message: 'Generation timed out. Try a domain (e.g. acme.com) for faster, richer results.' });
      res.end();
    } catch {
      /* noop */
    }
  }, BUILD_TIMEOUT_MS);

  try {
    const result = await buildDossier(target, {
      sections,
      skipSocialProbe: false,
      progress: (message: string) => {
        try {
          sse(res, 'progress', { message });
        } catch {
          /* client gone */
        }
      },
    });
    clearTimeout(timer);
    const markdown = result.files.map((f) => f.content).join('\n\n---\n\n');
    sse(res, 'result', {
      meta: result.meta,
      json: result.json,
      markdown,
      files: result.files.map((f) => ({ path: f.path, content: f.content })),
    });
    res.end();
  } catch (err) {
    clearTimeout(timer);
    try {
      sse(res, 'error', { message: err instanceof Error ? err.message : 'Generation failed.' });
      res.end();
    } catch {
      /* noop */
    }
  } finally {
    active = Math.max(0, active - 1);
  }
}

const server = createServer((req, res) => {
  void (async () => {
    try {
      applyCors(req, res);
      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
      }
      const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
      if (url.pathname === '/health') return sendJson(res, 200, { status: 'ok', active });
      if (url.pathname === '/generate' && req.method === 'POST') return void handleGenerate(req, res);
      if (url.pathname === '/' ) return sendJson(res, 200, { service: 'company-dossier-web', endpoint: 'POST /generate' });
      return sendJson(res, 404, { error: 'Not found' });
    } catch (e) {
      try {
        sendJson(res, 500, { error: 'Internal error' });
      } catch {
        /* noop */
      }
    }
  })();
});

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`company-dossier-web on http://${HOST}:${PORT}  (origins: ${ALLOWED.join(', ')})`);
});
