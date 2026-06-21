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
        "Use this when the user asks for research, a background check, due diligence, a profile, " +
        "or a 'dossier' on a specific company or domain. Returns a nine-section, source-cited report " +
        '(overview, people, hiring, funding, locations, tech stack, news, relationships, risk flags) ' +
        'compiled from public sources, each claim confidence-tagged. No API keys required. ' +
        'Do not use for general web search, for private individuals who are not company representatives, ' +
        'or for non-business entities.',
      annotations: {
        readOnlyHint: true,
        openWorldHint: true,
        destructiveHint: false,
      },
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
