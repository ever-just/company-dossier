import { promises as dns } from 'node:dns';
import { toDomain } from '../utils.js';

export interface DnsData {
  domain: string;
  mxRecords: Array<{ exchange: string; priority: number }>;
  emailProvider: string;
  spfRecord: string;
  dmarcRecord: string;
  verificationTokens: string[];
  subdomains: string[];
  error?: string;
}

/**
 * DNS reconnaissance using Node's built-in resolver. Detects the email
 * provider from MX records and gathers SPF/DMARC and verification tokens.
 * Every individual lookup is wrapped so partial data is always returned.
 */
export async function collectDns(domainInput: string): Promise<DnsData> {
  const domain = toDomain(domainInput);

  const result: DnsData = {
    domain,
    mxRecords: [],
    emailProvider: 'Unknown',
    spfRecord: '',
    dmarcRecord: '',
    verificationTokens: [],
    subdomains: [],
  };

  // MX records + provider detection
  try {
    const mx = await dns.resolveMx(domain);
    result.mxRecords = mx.map((r) => ({ exchange: r.exchange, priority: r.priority }));
    const mxStr = mx
      .map((r) => r.exchange)
      .join(' ')
      .toLowerCase();
    if (mxStr.includes('google') || mxStr.includes('gmail')) {
      result.emailProvider = 'Google Workspace';
    } else if (mxStr.includes('outlook') || mxStr.includes('microsoft')) {
      result.emailProvider = 'Microsoft 365';
    } else if (mxStr.includes('zoho')) {
      result.emailProvider = 'Zoho';
    } else if (mxStr.includes('proton')) {
      result.emailProvider = 'ProtonMail';
    } else if (mxStr.includes('amazonses') || mxStr.includes('amazon')) {
      result.emailProvider = 'Amazon SES';
    }
  } catch {
    /* no MX records */
  }

  // TXT records (SPF, verification tokens)
  try {
    const txt = await dns.resolveTxt(domain);
    for (const record of txt) {
      const joined = record.join('');
      if (joined.startsWith('v=spf1')) {
        result.spfRecord = joined;
      }
      if (
        joined.includes('google-site-verification') ||
        joined.includes('MS=') ||
        joined.includes('facebook-domain-verification') ||
        joined.includes('apple-domain-verification') ||
        joined.includes('atlassian-domain-verification')
      ) {
        result.verificationTokens.push(joined);
      }
    }
  } catch {
    /* no TXT records */
  }

  // DMARC
  try {
    const dmarc = await dns.resolveTxt('_dmarc.' + domain);
    result.dmarcRecord =
      dmarc.map((r) => r.join('')).find((r) => r.startsWith('v=DMARC1')) || '';
  } catch {
    /* no DMARC record */
  }

  // Common subdomain CNAMEs
  const subdomainChecks = ['www', 'mail', 'autodiscover', 'blog', 'shop', 'app', 'api'];
  for (const sub of subdomainChecks) {
    try {
      const cname = await dns.resolveCname(sub + '.' + domain);
      if (cname.length > 0) {
        result.subdomains.push(sub + '.' + domain + ' -> ' + cname[0]);
      }
    } catch {
      /* no CNAME for this subdomain */
    }
  }

  return result;
}
