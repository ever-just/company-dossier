#!/usr/bin/env node
import * as path from 'node:path';
import { buildDossier, type BuildOptions, type SectionId, SECTIONS } from './core.js';
import { writeDossier } from './index.js';

const VERSION = '0.1.0';

const HELP = `company-dossier v${VERSION}
Build a complete, sourced intelligence dossier on any company from public data.

USAGE
  company-dossier <company-or-domain> [options]

ARGUMENTS
  <company-or-domain>   A domain (acme.com / https://acme.com) or a company name.
                        Domains unlock the full collector set; a bare name still
                        produces a dossier from public search.

OPTIONS
  --out <dir>           Output directory (default: current directory).
  --json                Print the dossier JSON to stdout instead of writing files.
  --sections <list>     Comma-separated subset of sections to build.
                        Available: ${SECTIONS.join(', ')}
  --max-pages <n>       Max internal pages to crawl (default: 25).
  --no-social-probe     Skip slow HEAD-probing of social platforms.
  --quiet               Suppress progress output.
  -h, --help            Show this help.
  -v, --version         Show version.

ENVIRONMENT
  COMPANY_DOSSIER_ANTHROPIC_KEY   Optional. Reserved for future AI enrichment.
                                  A useful dossier is produced WITHOUT any key.

EXAMPLES
  company-dossier acme.com
  company-dossier acme.com --out ./research --quiet
  company-dossier "Acme Corporation"
  company-dossier acme.com --json > acme.json
  company-dossier acme.com --sections overview,tech,risk

Public sources only — no private databases, no API keys required.
Learn more: https://companydossier.lol
`;

interface ParsedArgs {
  target?: string;
  out: string;
  json: boolean;
  quiet: boolean;
  sections?: SectionId[];
  maxPages?: number;
  skipSocialProbe: boolean;
  help: boolean;
  version: boolean;
  error?: string;
}

function parseArgs(argv: string[]): ParsedArgs {
  const out: ParsedArgs = {
    out: process.cwd(),
    json: false,
    quiet: false,
    skipSocialProbe: false,
    help: false,
    version: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '-h':
      case '--help':
        out.help = true;
        break;
      case '-v':
      case '--version':
        out.version = true;
        break;
      case '--json':
        out.json = true;
        break;
      case '--quiet':
        out.quiet = true;
        break;
      case '--no-social-probe':
        out.skipSocialProbe = true;
        break;
      case '--out':
        out.out = argv[++i] ?? out.out;
        break;
      case '--max-pages': {
        const n = parseInt(argv[++i] ?? '', 10);
        if (!isNaN(n) && n > 0) out.maxPages = n;
        break;
      }
      case '--sections': {
        const list = (argv[++i] ?? '')
          .split(',')
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);
        const valid = list.filter((s): s is SectionId =>
          (SECTIONS as readonly string[]).includes(s)
        );
        const invalid = list.filter((s) => !(SECTIONS as readonly string[]).includes(s));
        if (invalid.length) {
          out.error = `Unknown section(s): ${invalid.join(', ')}. Valid: ${SECTIONS.join(', ')}`;
        }
        out.sections = valid;
        break;
      }
      default:
        if (a.startsWith('-')) {
          out.error = `Unknown option: ${a}`;
        } else if (!out.target) {
          out.target = a;
        }
    }
  }
  return out;
}

async function main(): Promise<number> {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    process.stdout.write(HELP);
    return 0;
  }
  if (args.version) {
    process.stdout.write(VERSION + '\n');
    return 0;
  }
  if (args.error) {
    process.stderr.write(`Error: ${args.error}\n\nRun "company-dossier --help".\n`);
    return 2;
  }
  if (!args.target) {
    process.stderr.write('Error: missing <company-or-domain>.\n\n' + HELP);
    return 2;
  }

  const log = args.quiet ? () => {} : (msg: string) => process.stderr.write(msg + '\n');

  const opts: BuildOptions = {
    out: args.out,
    json: args.json,
    sections: args.sections,
    maxPages: args.maxPages,
    skipSocialProbe: args.skipSocialProbe,
    progress: log,
    apiKeys: {
      anthropic: process.env.COMPANY_DOSSIER_ANTHROPIC_KEY,
    },
  };

  let result;
  try {
    result = await buildDossier(args.target, opts);
  } catch (err) {
    // buildDossier is designed not to throw, but guard regardless.
    process.stderr.write(
      `Fatal: ${err instanceof Error ? err.message : String(err)}\n`
    );
    return 1;
  }

  if (args.json) {
    process.stdout.write(JSON.stringify(result.json, null, 2) + '\n');
    return 0;
  }

  const folder = writeDossier(result, args.out);
  log(`\nDossier written to: ${folder}`);
  log(`Files: ${result.files.map((f) => f.path).join(', ')}`);
  if (!args.quiet) {
    process.stdout.write(folder + '\n');
  }
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    process.stderr.write(`Fatal: ${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  });
