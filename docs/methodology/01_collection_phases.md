# Collection Phases

This document provides detailed playbooks for all six data collection methods used in the dossier-building process. Each phase can be executed independently or as part of the full pipeline.

---

## Phase 1: Live Site Crawl

### What It Does

Systematically crawls the target company's entire public website, extracting structured data from HTML, metadata, schema.org markup, and JavaScript-rendered content. This is the foundation layer — most companies reveal far more on their website than they realize.

### Tools Used

| Tool | Role |
|------|------|
| Python 3.11+ | Runtime |
| aiohttp | Async HTTP requests with connection pooling |
| BeautifulSoup4 | HTML parsing and DOM traversal |
| lxml | Fast XML/HTML parser backend |
| Playwright | JS-rendered pages (React/Next.js sites) |

### Process

1. **Discover all pages** — Start from the homepage, parse the sitemap.xml (and any referenced sub-sitemaps), then crawl internal links. Typical small-business sites yield 30-80 pages.

2. **Extract structured data** — For each page, pull:
   - `<title>` and meta description
   - Open Graph and Twitter Card metadata
   - schema.org JSON-LD (organization, product, person, event schemas)
   - GTM container ID and dataLayer variables
   - All internal and external links
   - Image alt text and filenames
   - Phone numbers, emails, addresses (regex patterns)

3. **Parse Google Tag Manager** — The GTM container ID (format: `GTM-XXXXXXX`) reveals connected analytics, ad pixels, and marketing tools. Fetch the container JavaScript and parse for GA4 measurement IDs, Meta Pixel IDs, LinkedIn Insight tags, and TikTok pixels.

4. **Identify technology stack** — From response headers, JavaScript includes, meta tags, and page source: CMS (WordPress, Webflow, Squarespace), CDN (Cloudflare, Fastly), analytics (GA4, Hotjar), chat (Intercom, Drift), and ecommerce platform.

### Example Commands

```python
import aiohttp
from bs4 import BeautifulSoup

async def crawl_page(session, url):
    async with session.get(url, timeout=10) as response:
        html = await response.text()
        soup = BeautifulSoup(html, 'lxml')
        
        # Extract schema.org JSON-LD
        schemas = []
        for script in soup.find_all('script', type='application/ld+json'):
            schemas.append(json.loads(script.string))
        
        # Extract all internal links
        links = set()
        for a in soup.find_all('a', href=True):
            href = urljoin(url, a['href'])
            if urlparse(href).netloc == urlparse(url).netloc:
                links.add(href)
        
        return {'url': url, 'title': soup.title.string, 'schemas': schemas, 'links': links}
```

### Output

- `captures/site_crawl/` — Raw HTML for each page
- `datasets/site_pages.csv` — URL, title, last-modified, word count, schema types
- `datasets/external_links.csv` — All outbound links (reveals partners, suppliers, platforms)
- Technology stack summary in `08_Technology/tech_stack.md`

### Common Pitfalls

- **JS-rendered content**: If BeautifulSoup returns empty divs, the site uses client-side rendering. Switch to Playwright with `page.wait_for_selector()`.
- **Rate limiting yourself**: Even on targets you're researching, crawl politely. 0.5-1 second delay between requests.
- **Missing subdomains**: Check for `shop.`, `careers.`, `blog.`, `portal.` subdomains that may live on different platforms.
- **Robots.txt**: Respect it. Note what's disallowed — the disallow list itself is intelligence (what are they hiding from search engines?).

---

## Phase 2: Historical Reconstruction

### What It Does

Uses the Wayback Machine to reconstruct a company's history — past team members, discontinued products, old pricing, former partnerships, and messaging evolution. The CDX API provides a structured index of all archived captures for any domain.

### Tools Used

| Tool | Role |
|------|------|
| aiohttp | Async requests to CDX API and Wayback |
| Wayback CDX API | Index of all captures (timestamps, status codes, MIME types) |
| BeautifulSoup4 | Parse retrieved archived pages |
| pdfminer.six | Extract text from archived PDFs |

### Process

1. **Query CDX index** — Request the full capture history for the target domain. Filter by MIME type (text/html for pages, application/pdf for documents) and HTTP status (200 only).

```bash
# CDX API query — get all HTML captures for a domain
curl "https://web.archive.org/cdx/search/cdx?url=targetcompany.com/*&output=json&fl=timestamp,original,mimetype,statuscode&filter=statuscode:200&filter=mimetype:text/html"
```

2. **Identify high-value pages** — Sort unique URLs by intelligence value:
   - `/about`, `/team`, `/our-team`, `/leadership` — Personnel history
   - `/products`, `/services`, `/solutions` — Offering evolution
   - `/partners`, `/suppliers`, `/brands` — Relationship history
   - `/careers`, `/jobs` — Growth and tech stack signals
   - `/pricing` — Historical pricing data
   - Any URL that returns 404 on the live site — Deleted content

3. **Retrieve snapshots at key timestamps** — For each high-value page, pull 3-5 snapshots spread across the company's history (earliest available, midpoint, recent, and any timestamps near known events).

4. **Extract and diff** — Parse each snapshot and compare across time. Note: new team members appearing, old ones disappearing, product names changing, partner logos being added or removed.

### Example Commands

```python
import aiohttp
import asyncio

CDX_URL = "https://web.archive.org/cdx/search/cdx"
WAYBACK_URL = "https://web.archive.org/web"

async def get_captures(domain):
    params = {
        'url': f'{domain}/*',
        'output': 'json',
        'fl': 'timestamp,original,mimetype,statuscode',
        'filter': ['statuscode:200', 'mimetype:text/html'],
        'collapse': 'urlkey'  # One result per unique URL
    }
    async with aiohttp.ClientSession() as session:
        async with session.get(CDX_URL, params=params) as resp:
            return await resp.json()

async def get_snapshot(url, timestamp):
    wayback_url = f"{WAYBACK_URL}/{timestamp}/{url}"
    await asyncio.sleep(1.5)  # CRITICAL: rate limit
    async with aiohttp.ClientSession() as session:
        async with session.get(wayback_url) as resp:
            return await resp.text()
```

### Output

- `captures/wayback/` — Raw HTML of retrieved snapshots (filename: `{timestamp}_{page_slug}.html`)
- Timeline of team changes in `02_People_and_Organization/departures_and_changes.md`
- Product evolution narrative in `03_Products_and_Suppliers/`
- Partnership history showing additions and removals

### Common Pitfalls

- **Rate limiting**: The Wayback Machine will block aggressive crawlers. 1.5 seconds minimum between requests. If you get 429s, back off to 3-5 seconds.
- **Redirects and rewrites**: Archived URLs may redirect. Follow them, but track the original URL for attribution.
- **JavaScript-rendered archives**: Wayback captures may not include JS-rendered content. The archive stores what the crawler saw, which is the server-rendered HTML.
- **CDX pagination**: Large domains return thousands of results. Use `limit=` and `offset=` parameters, or filter aggressively by URL pattern.
- **False deletions**: A 404 on the live site might mean the page moved, not that it was intentionally deleted. Check for redirects before concluding content was removed.

---

## Phase 3: Document Capture

### What It Does

Captures, downloads, and extracts text from documents (PDFs, presentations, images with text) found during the search and crawl phases. Documents often contain the most detailed intelligence — spec sheets with pricing, brochures with personnel names, presentations with strategic plans.

### Tools Used

| Tool | Role |
|------|------|
| Playwright | Headless Chrome for authenticated/JS-gated downloads |
| pdfminer.six | PDF text extraction (maintains layout) |
| Tesseract OCR | Extract text from scanned documents and images |
| ExifTool | Read metadata (author, creation date, software used) |
| pdftotext (poppler) | Alternative PDF extraction (faster, less accurate) |

### Process

1. **Identify documents** — From the site crawl and Wayback phases, collect all PDF/PPTX/DOCX URLs. Also search for documents via Google dorking: `site:targetcompany.com filetype:pdf`.

2. **Download with full metadata** — Capture both the file content and its HTTP headers (Last-Modified, Content-Disposition). Preserve the original filename.

3. **Extract metadata** — Run ExifTool on every document to get: Author, Creator, Producer, CreateDate, ModifyDate, Title, Subject, Keywords. The Author field often reveals individual names not listed on the public website.

```bash
# Extract all metadata from a PDF
exiftool -json captured_document.pdf

# Batch extract from all PDFs in a directory
exiftool -json -r captures/documents/ > datasets/document_metadata.json
```

4. **Extract text** — Use pdfminer.six for born-digital PDFs (searchable text). Fall back to Tesseract OCR for scanned documents.

```python
from pdfminer.high_level import extract_text

text = extract_text('captures/documents/product_catalog.pdf')
```

```bash
# OCR a scanned PDF (convert to images first, then OCR)
pdftoppm scanned.pdf output -png
tesseract output-1.png output-1 --oem 1 -l eng
```

5. **Classify and file** — Sort extracted intelligence into the appropriate dossier sections. Product specs go to `03_Products_and_Suppliers/`, team bios to `02_People_and_Organization/`, financial documents to `05_Financials/`.

### Output

- `captures/documents/` — Original downloaded files
- `captures/documents/extracted_text/` — Plain text versions
- `datasets/document_metadata.json` — Structured metadata from ExifTool
- Intelligence distributed to appropriate dossier sections with source attribution

### Common Pitfalls

- **Password-protected PDFs**: Some PDFs have copy protection but no open password. `pdfminer` handles these. Actually encrypted PDFs require the password — note them as "identified but inaccessible."
- **Scanned PDFs masquerading as text**: Some PDFs appear to have text layers but are actually images with invisible text. If pdfminer returns gibberish, try OCR.
- **Metadata stripping**: Modern tools often strip author metadata. If ExifTool returns nothing interesting, the document was likely sanitized before publishing.
- **Large files**: Presentation decks and catalogs can be 50-200MB. Download asynchronously and process offline.

---

## Phase 4: Government and Registry

### What It Does

Queries public government databases and commercial registries to establish hard facts: legal entity name, registration date, NAICS codes, government contracts, liens, court records, and corporate filings.

### Tools Used

| Tool | Role |
|------|------|
| USASpending API | Federal contract awards and spending |
| SAM.gov | System for Award Management (CAGE codes, registrations) |
| CLEATUS | Federal entity verification |
| State SOS website | Secretary of State business filings (manual) |
| PACER/state courts | Court record searches |
| D&B (Dun & Bradstreet) | DUNS number, business credit, firmographics |

### Process

1. **Federal registration (SAM.gov)** — Search by company name and state. Returns: CAGE code, DUNS/UEI number, NAICS codes, entity type, registration dates, address, size standards, and socioeconomic classifications.

```bash
# SAM.gov API query (requires API key)
curl "https://api.sam.gov/entity-information/v3/entities?api_key=YOUR_KEY&legalBusinessName=TARGET+COMPANY&stateCode=MN"
```

2. **Federal contracts (USASpending)** — Search for any awarded contracts. This reveals: contract values, contracting agencies, period of performance, and competition type.

```bash
# USASpending API — search by recipient name
curl "https://api.usaspending.gov/api/v2/search/spending_by_award/" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"filters":{"recipient_search_text":["TARGET COMPANY"],"award_type_codes":["A","B","C","D"]},"fields":["Award ID","Recipient Name","Award Amount","Period of Performance Start Date"],"limit":50}'
```

3. **State Secretary of State** — Most states provide online business entity search. Retrieve: filing date, registered agent, status (active/inactive), annual report history, and any name changes or amendments. Minnesota's system requires manual browser interaction (no public API).

4. **Court records** — Search federal (PACER) and state court systems for: lawsuits filed by or against the company, bankruptcy filings, and any regulatory actions. Note: PACER charges $0.10/page.

5. **Liens and judgments** — Check UCC filings (secured creditor filings reveal lender relationships), tax liens, and mechanic's liens through county recorder databases.

6. **D&B / commercial registries** — If accessible, pull the D&B profile for: estimated revenue, employee count, SIC/NAICS classification, corporate family tree, and payment history score.

### Output

- `01_Company_Profile/federal_registration.md` — SAM.gov data, CAGE code, NAICS codes
- `01_Company_Profile/state_registration.md` — SOS filing, registered agent, status
- `05_Financials/financial_signals.md` — Contract values, revenue proxies
- `07_Legal_and_Compliance/court_records.md` — Litigation history
- `07_Legal_and_Compliance/liens_and_judgments.md` — UCC filings, tax liens

### Common Pitfalls

- **Name variations**: Companies register under legal names that differ from trade names. Search both "DBA" and legal entity names. Try with and without "Inc", "LLC", "Corp".
- **State vs. federal**: A company may be registered in one state but operating in another. Check both the state of incorporation and states of operation.
- **Stale SAM data**: SAM.gov registrations expire. An expired registration doesn't mean the company is inactive — it may mean they stopped pursuing government contracts.
- **PACER costs**: Searches are free but viewing documents costs money. Be strategic — search broadly, then pull only relevant filings.
- **Private company limitations**: Unlike public companies (SEC filings), private companies have minimal mandatory disclosure. Expect gaps.

---

## Phase 5: People and Firmographics

### What It Does

Identifies all personnel associated with the target company, establishes their roles, tenure, and professional networks. Maps the organizational structure, hiring patterns, and key relationships.

### Tools Used

| Tool | Role |
|------|------|
| LinkedIn (manual/MHTML archives) | Professional profiles, org charts, connections |
| SignalHire | Email and phone number discovery |
| RocketReach | Contact information and company data |
| Prospeo | Email finding and verification |
| SMTP verification | Validate discovered email addresses |
| holehe | Check email existence across 100+ platforms |

### Process

1. **Identify personnel** — Compile names from all previous phases: website team page, PDF metadata authors, LinkedIn company page employees, event speaker lists, Wayback archived team pages, press releases, and video credits.

2. **LinkedIn intelligence** — For each identified person, their LinkedIn profile reveals: current title, tenure, previous employers, education, skills endorsed, certifications, activity (posts, comments, shares), and connections to other target company employees.

   For bulk analysis, save profiles as MHTML and process with the `linkedin-activity-intelligence` skill — this extracts tagged companies, interaction patterns, and timeline data.

3. **Email pattern discovery** — Determine the company's email format (first.last@, f.last@, first@, etc.) by testing known names against the mail server:

```bash
# Discover email pattern via SMTP verification
python -c "
import smtplib
import dns.resolver

domain = 'targetcompany.com'
# Get MX record
mx = dns.resolver.resolve(domain, 'MX')
mx_host = str(mx[0].exchange)

# Test email patterns
patterns = ['jsmith', 'john.smith', 'j.smith', 'johns', 'john']
server = smtplib.SMTP(mx_host, 25, timeout=10)
server.helo('verify.local')
server.mail('test@gmail.com')
for p in patterns:
    code, msg = server.rcpt(f'{p}@{domain}')
    print(f'{p}@{domain}: {code} {msg}')
"
```

4. **Platform presence (holehe)** — For key personnel, check which platforms their email is registered on. This reveals personal technology usage and sometimes additional professional accounts.

```bash
holehe target.person@company.com --only-used
```

5. **Organizational mapping** — From collected data, build: reporting structure (who reports to whom), hiring timeline (when each person joined), departure log (who left and when), and growth trajectory (headcount over time).

6. **Firmographic synthesis** — Combine people data with company data to determine: total employee count, department breakdown, geographic distribution, growth rate, and key hiring patterns (what roles are they adding?).

### Output

- `02_People_and_Organization/team_roster.csv` — Name, title, start date, LinkedIn URL, confidence
- `02_People_and_Organization/full_roster_profiles.md` — Narrative profiles for all identified personnel
- `02_People_and_Organization/leadership/` — Individual entity files for each leader
- `02_People_and_Organization/hiring_and_growth.md` — Headcount trends and signals
- `02_People_and_Organization/departures_and_changes.md` — Turnover analysis

### Common Pitfalls

- **LinkedIn access limits**: Without Sales Navigator, you'll hit viewing limits quickly. Prioritize leadership and recently hired/departed personnel.
- **Era validation**: When analyzing LinkedIn feeds that span multiple employers, verify that activity was from the target company era, not a previous role. Use the `era-validated-linkedin-analysis` skill.
- **Ghost profiles**: Some employees maintain minimal or outdated LinkedIn profiles. Cross-reference with other sources before concluding someone has left.
- **SMTP verification false positives**: Catch-all mail servers accept all addresses. Check if the server returns 250 for obviously fake addresses — if so, SMTP verification is unreliable for that domain.
- **Privacy considerations**: Collect only professionally relevant information. Personal details (home address, family) are out of scope.

---

## Phase 6: Video and Media

### What It Does

Extracts intelligence from video content (YouTube, Vimeo, podcasts), trade publication articles, press releases, and social media posts. Video content is particularly rich — presenters reveal strategic thinking, product demos show capabilities, and event appearances reveal industry positioning.

### Tools Used

| Tool | Role |
|------|------|
| yt-dlp | Video/audio download, metadata, and caption extraction |
| VTT/SRT parsing | Extract text from auto-generated and manual captions |
| aiohttp | Fetch articles, press releases, podcast feeds |
| BeautifulSoup4 | Parse media pages for structured data |

### Process

1. **Discover video content** — Search YouTube for: company name, key personnel names, product names, and industry events they've attended. Check the company's own channel, industry channels, and event organizer channels.

```bash
# Download metadata for all videos mentioning the company (no video download)
yt-dlp --flat-playlist --print "%(id)s %(title)s %(upload_date)s %(duration)s" \
  "ytsearch50:targetcompany"

# Get full metadata as JSON
yt-dlp --dump-json --no-download "https://youtube.com/watch?v=VIDEO_ID"
```

2. **Extract captions** — Auto-generated captions (VTT format) provide searchable transcripts of video content. Even imperfect auto-captions are valuable for keyword extraction.

```bash
# Download only auto-generated English captions
yt-dlp --write-auto-sub --sub-lang en --skip-download \
  --output "captures/video/%(id)s" \
  "https://youtube.com/watch?v=VIDEO_ID"

# Convert VTT to plain text
python -c "
import webvtt
captions = webvtt.read('captures/video/VIDEO_ID.en.vtt')
text = ' '.join([c.text for c in captions])
print(text)
"
```

3. **Analyze video content** — From captions and metadata, extract:
   - Product capabilities mentioned in demos
   - Customer names dropped in case studies
   - Strategic priorities mentioned by leadership
   - Partnership announcements
   - Hiring plans or growth commentary
   - Competitive positioning statements

4. **Podcast and audio** — Search podcast directories (Apple Podcasts, Spotify, podcast index) for guest appearances by company leadership. Download audio and extract metadata.

```bash
# Download podcast audio and metadata
yt-dlp --extract-audio --audio-format mp3 \
  --write-info-json --write-thumbnail \
  "PODCAST_EPISODE_URL"
```

5. **Press and media** — Collect press releases (PRNewswire, BusinessWire, local papers), trade publication articles (industry-specific outlets), and news mentions. Extract quotes, metrics, and claims.

6. **Social media** — Analyze company social accounts (LinkedIn, Facebook, Instagram, Twitter/X) for: posting frequency, content themes, engagement patterns, employee advocacy, and event promotion. Social media often reveals customer relationships through tags and mentions.

### Output

- `captures/video/` — VTT caption files and metadata JSON
- `06_Marketing_and_Events/social_media.md` — Platform presence and activity analysis
- `06_Marketing_and_Events/press_and_media.md` — Media coverage timeline
- `06_Marketing_and_Events/events.csv` — Event appearances with dates and roles
- Intelligence distributed to relevant sections (customer names to `04_Market_and_Customers/`, product info to `03_Products_and_Suppliers/`, etc.)

### Common Pitfalls

- **Rate limiting on YouTube**: yt-dlp can be aggressive. Use `--sleep-interval 0.4` between requests. If you get 429 errors, wait 5 minutes and reduce batch size.
- **Auto-caption quality**: Auto-generated captions are 80-90% accurate. Proper nouns (company names, product names, people) are often mangled. Cross-reference with video titles and descriptions.
- **Video length vs. value**: A 2-minute product teaser has different intelligence density than a 45-minute conference talk. Prioritize longer-form content where leadership speaks freely.
- **Deleted videos**: If a video appears in search results but the page 404s, check the Wayback Machine for cached metadata. The title and description alone may be valuable.
- **Platform-specific auth**: Some content is behind platform logins (LinkedIn videos, private YouTube). Note these as "identified but not accessible" rather than attempting unauthorized access.
- **Copyright**: Download content for analysis only. Do not redistribute or republish.
