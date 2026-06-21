#!/usr/bin/env node
// Publish a built dossier site to <slug>.companydossier.lol
// Usage: node deploy-dossier.mjs <dist-dir> <slug>
// Requires AWS creds in the environment (S3 PutObject on the bucket).
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';

const BUCKET = process.env.COMPANY_DOSSIER_S3_BUCKET || 'companydossier-dossier-sites';
const REGION = process.env.AWS_REGION || 'us-east-1';
const ROOT = 'companydossier.lol';
const RESERVED = new Set(['www', 'api', 'admin', 'app', 'assets', 'cdn', 'static', 'mail', 'status', '_home', '_dmarc']);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.map': 'application/json',
};

function slugify(name) {
  const s = String(name).toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '')
    .trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 63).replace(/-$/, '');
  return s;
}
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}

async function main() {
  const [distDir, slugRaw] = process.argv.slice(2);
  if (!distDir || !slugRaw) { console.error('Usage: node deploy-dossier.mjs <dist-dir> <slug>'); process.exit(1); }
  const slug = slugify(slugRaw);
  if (!slug || RESERVED.has(slug)) { console.error(`Refusing reserved/invalid slug: "${slugRaw}"`); process.exit(1); }
  try { if (!(await stat(distDir)).isDirectory()) throw 0; } catch { console.error(`Not a directory: ${distDir}`); process.exit(1); }

  const s3 = new S3Client({ region: REGION });
  const files = await walk(distDir);
  let n = 0;
  for (const f of files) {
    const rel = relative(distDir, f).split('\\').join('/');
    const Key = `${slug}/${rel}`;
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET, Key, Body: await readFile(f),
      ContentType: MIME[extname(f).toLowerCase()] || 'application/octet-stream',
      CacheControl: rel.endsWith('.html') ? 'public,max-age=300' : 'public,max-age=86400',
    }));
    n++;
  }
  console.log(`Uploaded ${n} files → s3://${BUCKET}/${slug}/`);
  console.log(`Live (unlisted, noindex): https://${slug}.${ROOT}`);
}
main().catch((e) => { console.error('Deploy failed:', e.message); process.exit(1); });
