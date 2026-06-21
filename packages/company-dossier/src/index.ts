import * as path from 'node:path';
import { writeFileSafe, slugify } from './utils.js';
import { buildDossier, type DossierResult } from './core.js';

export { buildDossier };
export {
  SECTIONS,
  type SectionId,
  type BuildOptions,
  type DossierResult,
  type DossierMeta,
  type DossierData,
  type DossierFile,
  type ProgressCallback,
} from './core.js';

export { collectDns, type DnsData } from './collectors/dns.js';
export { collectWebsite, type WebsiteData, type PageData } from './collectors/website.js';
export { collectWayback, type WaybackData } from './collectors/wayback.js';
export { extractTechStack, type TechStackData } from './collectors/techstack.js';
export {
  collectSearch,
  type SearchData,
  type USASpendingContract,
  type SocialProfile,
} from './collectors/search.js';

/**
 * Write a built dossier to disk. Files are placed inside a
 * "<Company> DOSSIER/" folder under `outDir`. Returns the folder path.
 */
export function writeDossier(result: DossierResult, outDir: string): string {
  const folderName = `${result.meta.companyName} DOSSIER`.trim();
  const safeFolder = folderName.replace(/[/\\]/g, '_');
  const target = path.join(outDir, safeFolder);
  for (const file of result.files) {
    writeFileSafe(path.join(target, file.path), file.content);
  }
  return target;
}

/** Slug helper exposed for callers naming their own output paths. */
export { slugify };
