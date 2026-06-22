import { toDomain } from '../utils.js';

export interface RdapData {
  domain: string;
  registrar?: string;
  registrantOrg?: string;
  registrantCountry?: string;
  createdDate?: string;
  expiresDate?: string;
  updatedDate?: string;
  statuses: string[];
  nameservers: string[];
  dnssec?: boolean;
  error?: string;
}

/** Pull org / full-name / country out of an RDAP entity's jCard (vcardArray). */
function parseVcard(ent: Record<string, unknown>): { org?: string; name?: string; country?: string } {
  const out: { org?: string; name?: string; country?: string } = {};
  const v = ent.vcardArray as unknown[];
  if (!Array.isArray(v) || !Array.isArray(v[1])) return out;
  for (const item of v[1] as unknown[]) {
    if (!Array.isArray(item)) continue;
    const key = item[0];
    const val = item[3];
    if (key === 'org') out.org = Array.isArray(val) ? val.join(' ') : String(val);
    else if (key === 'fn') out.name = String(val);
    else if (key === 'adr' && Array.isArray(val)) out.country = String(val[6] || '').trim() || undefined;
  }
  return out;
}

/**
 * Domain registration / ownership via RDAP (the modern, no-auth successor to WHOIS).
 * Uses the rdap.org bootstrap to reach the authoritative server for any TLD that
 * supports RDAP. Registrant identity is frequently redacted (GDPR/privacy), so we
 * surface whatever is public — registrar, dates, statuses, nameservers — and let the
 * dossier mark the rest as a gap. Always returns partial data; never throws.
 */
export async function collectRdap(domainInput: string): Promise<RdapData> {
  const domain = toDomain(domainInput);
  const result: RdapData = { domain, statuses: [], nameservers: [] };
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      headers: { Accept: 'application/rdap+json', 'User-Agent': 'company-dossier (+https://companydossier.lol)' },
      redirect: 'follow',
      signal: ctrl.signal,
    }).finally(() => clearTimeout(timer));
    if (!res.ok) {
      result.error = res.status === 404 ? 'No RDAP record (TLD may not support RDAP)' : `RDAP HTTP ${res.status}`;
      return result;
    }
    const j = (await res.json()) as Record<string, unknown>;

    if (Array.isArray(j.status)) result.statuses = (j.status as unknown[]).map(String);
    if (Array.isArray(j.events)) {
      for (const e of j.events as Array<Record<string, unknown>>) {
        const action = e.eventAction;
        const date = typeof e.eventDate === 'string' ? e.eventDate : undefined;
        if (action === 'registration') result.createdDate = date;
        else if (action === 'expiration') result.expiresDate = date;
        else if (action === 'last changed') result.updatedDate = date;
      }
    }
    if (Array.isArray(j.nameservers)) {
      result.nameservers = (j.nameservers as Array<Record<string, unknown>>)
        .map((n) => String(n.ldhName || '').toLowerCase())
        .filter(Boolean);
    }
    const sec = j.secureDNS as Record<string, unknown> | undefined;
    if (sec && typeof sec.delegationSigned === 'boolean') result.dnssec = sec.delegationSigned;

    const entities = Array.isArray(j.entities) ? (j.entities as Array<Record<string, unknown>>) : [];
    for (const ent of entities) {
      const roles = Array.isArray(ent.roles) ? (ent.roles as unknown[]).map(String) : [];
      const card = parseVcard(ent);
      if (roles.includes('registrar') && !result.registrar) {
        result.registrar = card.name || card.org ||
          (Array.isArray(ent.publicIds) && (ent.publicIds as Array<Record<string, unknown>>)[0]
            ? String((ent.publicIds as Array<Record<string, unknown>>)[0].identifier || '')
            : undefined);
      }
      if (roles.includes('registrant')) {
        if (card.org) result.registrantOrg = card.org;
        if (card.country) result.registrantCountry = card.country;
      }
    }
    return result;
  } catch (e) {
    const err = e as { name?: string; message?: string };
    result.error = err?.name === 'AbortError' ? 'RDAP timeout' : `RDAP error: ${err?.message || String(e)}`;
    return result;
  }
}
