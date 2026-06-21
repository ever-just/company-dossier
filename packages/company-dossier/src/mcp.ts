#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { buildDossier, SECTIONS, type SectionId } from './core.js';

const server = new McpServer({
  name: 'company-dossier',
  version: '0.1.0',
});

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

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Server runs until stdin closes.
}

main().catch((err) => {
  process.stderr.write(
    `company-dossier-mcp fatal: ${err instanceof Error ? err.message : String(err)}\n`
  );
  process.exit(1);
});
