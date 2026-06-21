#!/usr/bin/env node
import { createServer as createHttpServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { createServer } from './mcp-server.js';

const PORT = Number(process.env.PORT) || 8787;
const HOST = process.env.HOST || '0.0.0.0';
// Optional bearer token. When set, every /mcp request must send Authorization: Bearer <token>.
const AUTH_TOKEN = process.env.COMPANY_DOSSIER_MCP_TOKEN || '';
// Optional CORS allowlist (comma-separated origins). When empty, origins are reflected (dev).
const ALLOWED_ORIGINS = (process.env.COMPANY_DOSSIER_MCP_ALLOWED_ORIGINS || '')
  .split(',').map((s) => s.trim()).filter(Boolean);

/** Active sessions, keyed by the Mcp-Session-Id header. */
const transports = new Map<string, StreamableHTTPServerTransport>();

/** CORS — restricted to an allowlist when one is configured, else reflect (dev default). */
function applyCors(req: IncomingMessage, res: ServerResponse): void {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.length) {
    if (origin && ALLOWED_ORIGINS.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, Authorization, Mcp-Session-Id, Last-Event-ID, MCP-Protocol-Version'
  );
  // Browser clients need to read the session id back from responses.
  res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(payload);
}

/** Read and JSON-parse a request body. Returns undefined on empty/invalid. */
async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }
  if (chunks.length === 0) return undefined;
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return undefined;
  return JSON.parse(raw);
}

async function handleMcpPost(req: IncomingMessage, res: ServerResponse): Promise<void> {
  let body: unknown;
  try {
    body = await readJsonBody(req);
  } catch {
    sendJson(res, 400, {
      jsonrpc: '2.0',
      error: { code: -32700, message: 'Parse error: invalid JSON body' },
      id: null,
    });
    return;
  }

  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  let transport = sessionId ? transports.get(sessionId) : undefined;

  if (!transport) {
    if (!isInitializeRequest(body)) {
      sendJson(res, 400, {
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Bad Request: no valid session ID. Send an initialize request first.',
        },
        id: null,
      });
      return;
    }

    // New session: create a transport + a fresh MCP server and connect them.
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (id) => {
        transports.set(id, transport!);
      },
    });

    transport.onclose = () => {
      if (transport!.sessionId) {
        transports.delete(transport!.sessionId);
      }
    };

    const server = createServer();
    await server.connect(transport);
  }

  await transport.handleRequest(req, res, body);
}

async function handleMcpSession(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // GET (SSE stream) and DELETE (session teardown) require an existing session.
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  const transport = sessionId ? transports.get(sessionId) : undefined;
  if (!transport) {
    sendJson(res, 400, {
      jsonrpc: '2.0',
      error: { code: -32000, message: 'Bad Request: invalid or missing session ID' },
      id: null,
    });
    return;
  }
  await transport.handleRequest(req, res);
}

const httpServer = createHttpServer((req, res) => {
  void (async () => {
    try {
      applyCors(req, res);

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
      const pathname = url.pathname;

      if (pathname === '/health') {
        sendJson(res, 200, { status: 'ok' });
        return;
      }

      if (pathname === '/mcp') {
        // Bearer auth (when a token is configured).
        if (AUTH_TOKEN) {
          const auth = req.headers.authorization || '';
          if (auth !== `Bearer ${AUTH_TOKEN}`) {
            sendJson(res, 401, { jsonrpc: '2.0', error: { code: -32001, message: 'Unauthorized' }, id: null });
            return;
          }
        }
        if (req.method === 'POST') {
          await handleMcpPost(req, res);
          return;
        }
        if (req.method === 'GET' || req.method === 'DELETE') {
          await handleMcpSession(req, res);
          return;
        }
        res.writeHead(405, { 'Content-Type': 'application/json', Allow: 'GET, POST, DELETE' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
      }

      sendJson(res, 404, { error: 'Not Found' });
    } catch (err) {
      process.stderr.write(
        `company-dossier-mcp-http error: ${err instanceof Error ? err.stack || err.message : String(err)}\n`
      );
      if (!res.headersSent) {
        sendJson(res, 500, {
          jsonrpc: '2.0',
          error: { code: -32603, message: 'Internal server error' },
          id: null,
        });
      } else {
        res.end();
      }
    }
  })();
});

httpServer.listen(PORT, HOST, () => {
  process.stdout.write(
    `company-dossier remote MCP server listening on http://${HOST}:${PORT}\n` +
      `  MCP endpoint:  POST/GET/DELETE /mcp${AUTH_TOKEN ? ' (bearer auth required)' : ' (no auth — set COMPANY_DOSSIER_MCP_TOKEN)'}\n` +
      `  CORS:          ${ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS.join(', ') : 'reflect (set COMPANY_DOSSIER_MCP_ALLOWED_ORIGINS to restrict)'}\n` +
      `  Health check:  GET /health\n`
  );
});

function shutdown(): void {
  for (const transport of transports.values()) {
    void transport.close();
  }
  httpServer.close(() => process.exit(0));
  // Force-exit if connections linger.
  setTimeout(() => process.exit(0), 2000).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
