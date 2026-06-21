import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { buildDossier, SECTIONS, type SectionId } from './core.js';

/** Single source of truth for server metadata. */
export const SERVER_INFO = {
  name: 'company-dossier',
  version: '0.2.0',
} as const;

/**
 * Register the `build_dossier` tool on an McpServer instance. Used by both the
 * stdio server (src/mcp.ts) and the remote HTTP server (src/mcp-http.ts) so
 * there is exactly one tool definition/handler.
 */
export function registerTools(server: McpServer): void {
  server.registerTool(
    'build_dossier',
    {
      title: 'Build Company Dossier',
      description:
        'Compile a complete, sourced intelligence dossier on a company from PUBLIC data ' +
        '(website crawl, DNS, Wayback Machine, tech fingerprint, USASpending, social). ' +
        'Returns markdown for nine sections plus structured JSON. No API keys required.',
      inputSchema: {
        target: z
          .string()
          .describe('A domain (acme.com) or company name to research.'),
        sections: z
          .array(z.enum(SECTIONS))
          .optional()
          .describe(
            `Optional subset of sections. Available: ${SECTIONS.join(', ')}. Defaults to all nine.`
          ),
      },
    },
    async ({ target, sections }: { target: string; sections?: SectionId[] }) => {
      const result = await buildDossier(target, { sections, skipSocialProbe: false });
      const markdown = result.files
        .filter((f) => f.path.endsWith('.md'))
        .map((f) => f.content)
        .join('\n\n---\n\n');

      return {
        content: [
          { type: 'text' as const, text: markdown },
          {
            type: 'text' as const,
            text: '```json\n' + JSON.stringify(result.json, null, 2) + '\n```',
          },
        ],
      };
    }
  );
}

/** Create a fully configured McpServer with all tools registered. */
export function createServer(): McpServer {
  const server = new McpServer(SERVER_INFO);
  registerTools(server);
  return server;
}
