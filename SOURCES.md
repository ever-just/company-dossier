# Sources

Repositories, tools, and methodologies that directly informed or were used in building the BROGAV dossier.

---

## Directly Used (code/tools executed during research)

| Repository | Stars | What we used it for |
|-----------|-------|-------------------|
| [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) | 170K+ | YouTube video and auto-caption (VTT) download for all 9 BROGAV videos |
| [projectdiscovery/httpx](https://github.com/projectdiscovery/httpx) | 10K+ | HTTP probing, tech detection, CDN identification, TLS analysis on brogav.com |
| [megadose/holehe](https://github.com/megadose/holehe) | 11K+ | Email account existence probing across 121 services for BROGAV team members |
| [laramies/theHarvester](https://github.com/laramies/theHarvester) | 16K+ | Subdomain and email discovery for brogavsolutions.com domain |
| [khast3x/h8mail](https://github.com/khast3x/h8mail) | 5K+ | Breach/exposure check on discovered email addresses |
| [projectdiscovery/wappalyzergo](https://github.com/projectdiscovery/wappalyzergo) | 1K+ | Technology fingerprinting (backup validation of httpx results) |
| [tomnomnom/waybackurls](https://github.com/tomnomnom/waybackurls) | 4.5K+ | Bulk Wayback URL extraction for brogav.com domain history |
| [internetarchive/wayback](https://github.com/internetarchive/wayback) | 842 | Reference for Wayback Machine CDX API usage patterns |

## Methodology Sources (adapted into our agent skills)

| Repository | What we adapted |
|-----------|----------------|
| [damionrashford/RivalSearch-Plugin](https://github.com/damionrashford/RivalSearch-Plugin) | Step 7 (Reputation & Risk) adapted into `company-legal-reputation-research` workflow |
| [lawve-ai/awesome-legal-skills](https://github.com/lawve-ai/awesome-legal-skills) | `vendor-due-diligence-patrick-munro` Phase 1 reputational check adapted into legal research workflow |
| [IvanGlinkin/Fast-Google-Dorks-Scan](https://github.com/IvanGlinkin/Fast-Google-Dorks-Scan) | Google dorking patterns adapted into `google-dorking-osint` skill |
| [exploit-db.com/google-hacking-database](https://www.exploit-db.com/google-hacking-database) | Dork query patterns for document discovery (filetype:pdf, site: operators) |

## Reference Lists Used for Research Planning

| Repository | How we used it |
|-----------|---------------|
| [jivoi/awesome-osint](https://github.com/jivoi/awesome-osint) | 26K+ stars. Master reference for discovering OSINT tool categories and approaches |
| [ARPSyndicate/awesome-intelligence](https://github.com/ARPSyndicate/awesome-intelligence) | 2.3K+ stars. Curated intelligence resources for methodology design |
| [smicallef/spiderfoot](https://github.com/smicallef/spiderfoot) | 18K+ stars. Studied its module architecture for designing our multi-phase pipeline |

## APIs Consumed (no GitHub repo, but documented here)

| Service | What we queried |
|---------|----------------|
| [Wayback Machine CDX API](https://web.archive.org/cdx/search/cdx) | 408 captures discovered; 33 deleted pages recovered; 12 PDFs found |
| [USASpending.gov API v2](https://api.usaspending.gov/api/v2/) | Federal contract awards search (result: $0 for BROGAV) |
| [SimilarWeb Free API](https://data.similarweb.com/api/v1/data) | Web traffic estimates, competitor benchmarking, keyword data |
| [Tranco List API](https://tranco-list.eu/api/) | Domain ranking check |
| [Cloudflare Radar API](https://radar.cloudflare.com/api/) | Domain popularity bucket |
| [crt.sh](https://crt.sh/) | Certificate transparency for subdomain discovery |

## People Intelligence Platforms (queried, not open-source)

| Platform | What we extracted |
|----------|-----------------|
| SignalHire | Employee roster, titles, contact info |
| RocketReach | Employee data, phone numbers, email patterns |
| Prospeo | Company firmographics, employee count, revenue band |
| ZoomInfo | Departure confirmations, competitor employee moves |
| ContactOut | Dual-role verification (Tom Weiss C2/BROGAV) |
| D&B Hoovers | Revenue ($4.51M), headcount (10), risk rating (Low), DUNS |
| S&P Global Capital IQ | 4,797-company competitor screening dataset |

---

## What We Evaluated But Did NOT Use

| Tool/Service | Why we skipped it |
|-------------|------------------|
| SAM.gov API | Requires registered API key; DEMO_KEY returns 404 for our queries |
| PACER | Per-search fees; CourtListener provides free subset of federal opinions |
| Apollo.io | Paid platform; aggregator cross-referencing was sufficient |
| BuiltWith | Expensive for one-off; httpx + manual GTM parse achieved same result |
| Wappalyzer (original) | Repo deleted/moved; used projectdiscovery/wappalyzergo instead |
| Shodan | Relevant for infrastructure mapping but not for a VAR company |
| SecurityTrails | DNS history had minimal value for business intelligence use case |
| Ahrefs / SEMrush | Paid SEO tools; SimilarWeb free API + manual analysis was sufficient |
| GHunt (Google account OSINT) | Powerful but not relevant for company intelligence (more for personal OSINT) |
