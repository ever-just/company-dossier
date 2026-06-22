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
            'Optional. A JSON ARRAY of section ids to include, e.g. ["overview","risk"]. ' +
              `Allowed values: ${SECTIONS.join(', ')}. ` +
              'Always pass an array (never a single bare string); omit entirely to return all nine sections.'
          ),
      },
      outputSchema: {
        company: z.string().describe('Resolved company name.'),
        domain: z.string().optional().describe('Primary domain, if the target resolved to one.'),
        generatedAt: z.string().optional().describe('ISO date the dossier was generated.'),
        sources: z
          .array(
            z.object({
              name: z.string(),
              status: z.string().describe('"ok" or "failed".'),
              note: z.string().optional(),
            })
          )
          .describe('Which public sources were pulled and whether each succeeded.'),
        sections: z
          .array(z.object({ path: z.string(), markdown: z.string() }))
          .describe('One entry per dossier section, with its markdown.'),
        markdown: z.string().describe('The full dossier as a single markdown document.'),
      },
    },
    async ({ target, sections }: { target: string; sections?: SectionId[] }) => {
      const result = await buildDossier(target, { sections, skipSocialProbe: false });
      const sectionFiles = result.files.filter((f) => /\d+[_-].+\.md$/i.test(f.path));
      const markdown = result.files
        .filter((f) => f.path.endsWith('.md'))
        .map((f) => f.content)
        .join('\n\n---\n\n');
      const meta = result.meta as unknown as Record<string, unknown>;
      const rawSources = Array.isArray(meta.sources) ? (meta.sources as Record<string, unknown>[]) : [];
      const structuredContent = {
        company: String(meta.companyName ?? target),
        domain: meta.domain ? String(meta.domain) : undefined,
        generatedAt: meta.generatedAt ? String(meta.generatedAt) : undefined,
        sources: rawSources.map((s) => ({
          name: String(s.name ?? ''),
          status: String(s.status ?? ''),
          note: s.note ? String(s.note) : undefined,
        })),
        sections: sectionFiles.map((f) => ({ path: f.path, markdown: f.content })),
        markdown,
      };

      return {
        structuredContent,
        content: [{ type: 'text' as const, text: markdown }],
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
