# Tools Reference

Comprehensive reference for every tool used (and considered) during AI-agent-driven company intelligence dossier construction. Based on the BROGAV Solutions dossier project (June 2026).

---

## Tools Used

---

### Python (requests + BeautifulSoup)

**What it does:** HTTP client + HTML parser for crawling websites, extracting structured data from pages, and downloading files.

**How it was used in BROGAV:** Crawled brogav.com (all pages), extracted product listings, team bios, testimonials, event details, and partner logo walls. Also used for scraping manufacturer "Where to Buy" directories to verify OEM partnerships.

**Example:**

```python
import requests
from bs4 import BeautifulSoup

resp = requests.get("https://brogav.com/team", headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(resp.text, "lxml")
for card in soup.select(".team-member-card"):
    name = card.select_one("h3").text.strip()
    title = card.select_one(".role").text.strip()
    print(f"{name} | {title}")
```

**Rate limiting / gotchas:**
- Wix-hosted sites return incomplete HTML without JavaScript execution (see Playwright below)
- Always set a User-Agent header; bare `requests` gets 403 from many CDNs
- Respect `robots.txt` and add 1-2s delays between requests to the same domain
- Wix sites serve different content on mobile vs desktop UA strings

**Alternatives considered but not used:**
- `httpx` (async) -- unnecessary for small-scale crawling where sequential was fast enough
- Scrapy -- overkill for a single-site crawl; setup cost not justified for one target

---

### Playwright + System Chrome

**What it does:** Browser automation that renders JavaScript-heavy pages, captures screenshots, downloads PDFs behind login walls, and extracts content from SPAs.

**How it was used in BROGAV:** Rendered the Wix-hosted brogav.com pages (which load product data via JS), captured LinkedIn public profile pages, downloaded partner PDFs from manufacturer portals, and took screenshots of social media posts for evidence archiving.

**Example:**

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page()
    page.goto("https://brogav.com/products", wait_until="networkidle")
    # Wait for Wix dynamic content to load
    page.wait_for_selector("[data-hook='product-list']", timeout=10000)
    html = page.content()
    browser.close()
```

**Rate limiting / gotchas:**
- `channel="chrome"` uses system Chrome (avoids Chromium download issues on macOS)
- `wait_until="networkidle"` is essential for Wix/React SPAs; "domcontentloaded" fires too early
- LinkedIn will rate-limit and require CAPTCHA after 20-30 profile views per session
- Memory-heavy: each browser context uses 200-400MB; close aggressively
- Headless Chrome on macOS ARM requires Rosetta for some extensions

**Alternatives considered but not used:**
- Selenium -- older API, slower startup, no async; Playwright is strictly superior
- Puppeteer -- Node.js only; project was Python-native

---

### Wayback Machine CDX API

**What it does:** Queries the Internet Archive's index of all crawled URLs for a domain, returning timestamps, HTTP status codes, MIME types, and archive URLs. Enables discovery of deleted pages, old PDFs, and website evolution over time.

**How it was used in BROGAV:** Enumerated all archived URLs for brogav.com and brogavsolutions.com. Discovered 3 deleted PDF partner decks, a removed team page showing former employees, and historical product catalog pages that revealed which suppliers were added/removed over time.

**Example:**

```python
import requests
import time

base = "https://web.archive.org/cdx/search/cdx"
params = {
    "url": "brogav.com/*",
    "output": "json",
    "fl": "timestamp,original,mimetype,statuscode,length",
    "filter": "statuscode:200",
    "collapse": "urlkey"
}
resp = requests.get(base, params=params)
records = resp.json()[1:]  # First row is header

# Filter for PDFs
pdfs = [r for r in records if r[2] == "application/pdf"]
for pdf in pdfs:
    ts, url = pdf[0], pdf[1]
    archive_url = f"https://web.archive.org/web/{ts}id_/{url}"
    print(archive_url)
    time.sleep(1.5)  # Rate limit: 1.5s between fetches
```

**Rate limiting / gotchas:**
- Hard rate limit: 1.5s between requests to web.archive.org (they will 429 you)
- `collapse=urlkey` deduplicates URLs; without it you get every crawl instance
- `id_` in the replay URL returns the original file (not the Wayback toolbar wrapper)
- Some PDFs are stored as `application/octet-stream` -- filter on both MIME types
- The CDX API can return 100K+ rows for large domains; use `limit=` or `from=/to=` date filters
- Archive.org has intermittent 503s; implement retry with exponential backoff

**Alternatives considered but not used:**
- Wayback Machine Python library (`waybackpy`) -- abstraction adds overhead, raw CDX is cleaner
- Common Crawl -- more comprehensive but requires S3/Athena queries; overkill for single-domain

---

### USASpending.gov API v2

**What it does:** Provides access to all U.S. federal contract awards, grants, and spending data. Searchable by recipient name, UEI, NAICS code, and awarding agency.

**How it was used in BROGAV:** Queried by company name ("BROGAV") and UEI (VPLSA19QBJD7) to determine federal contract history. Result: $0 in awards despite active SAM.gov registration -- a significant finding showing BROGAV has the credentials but has not yet won federal work.

**Example:**

```python
import requests

url = "https://api.usaspending.gov/api/v2/search/spending_by_award/"
payload = {
    "filters": {
        "recipient_search_text": ["BROGAV"],
        "time_period": [{"start_date": "2020-01-01", "end_date": "2026-06-13"}],
        "award_type_codes": ["A", "B", "C", "D"]  # Contracts
    },
    "fields": ["Award ID", "Recipient Name", "Award Amount", "Awarding Agency"],
    "limit": 100,
    "page": 1
}
resp = requests.post(url, json=payload)
results = resp.json()["results"]
```

**Rate limiting / gotchas:**
- No API key required for basic queries
- POST-based API (not GET) -- unusual but well-documented
- Searches are case-insensitive but partial matches can return false positives
- UEI search is more precise than name search for confirming zero awards
- Response times can be 5-10s for broad queries; narrow date ranges help
- Pagination required: max 100 results per page

**Alternatives considered but not used:**
- FPDS.gov (legacy system) -- USASpending is the successor and has all the same data
- GovWin/Deltek -- paid platform with pre-award intelligence; not needed for award verification

---

### CLEATUS (Contractor Lookup for Entity and Tracking Under SAM)

**What it does:** Cross-references UEI and CAGE codes against SAM.gov entity registration data. Verifies whether an entity is registered, active, and eligible for federal contracts.

**How it was used in BROGAV:** Confirmed UEI VPLSA19QBJD7 and CAGE code 9UV00 are active and registered to BROGAV Solutions LLC. Verified entity purpose code and small business certifications listed in SAM.

**Example:**

```bash
# CLEATUS lookup via SAM.gov entity search (web-based)
# Navigate to: https://sam.gov/search?keywords=VPLSA19QBJD7&index=ei
# Or use SAM.gov Entity Management API (requires login):
curl "https://api.sam.gov/entity-information/v3/entities?ueiSAM=VPLSA19QBJD7&api_key=YOUR_KEY"
```

**Rate limiting / gotchas:**
- SAM.gov API requires registration for an API key (free but takes 24-48h approval)
- DEMO_KEY returns 404 for most endpoints (undocumented limitation)
- The public search at sam.gov/search works without an API key for basic lookups
- CAGE codes are DoD-assigned; some entities have a CAGE before they have a UEI
- Entity status can be "Active" in SAM but excluded from awards due to compliance holds

**Alternatives considered but not used:**
- Direct SAM.gov API with full key -- would have provided more detail but key approval timing was a blocker

---

### ExifTool

**What it does:** Reads and writes metadata from files (PDF, JPEG, PNG, TIFF, etc.). Extracts author, creation date, software used, GPS coordinates, and hundreds of other metadata fields.

**How it was used in BROGAV:** Extracted metadata from downloaded PDFs (partner decks, datasheets) to determine authorship, creation dates, and which software generated them (revealing whether a document was made by BROGAV or a supplier). Also used on photos to extract camera data and approximate dates.

**Example:**

```bash
# Extract all metadata from a PDF
exiftool -json partner_deck_2024.pdf

# Key fields for intelligence:
# - Author: reveals who created it
# - Creator: software used (e.g., "Canva", "Microsoft PowerPoint")
# - CreateDate: when it was made
# - ModifyDate: last edit
# - Producer: PDF rendering engine

# Batch extract from all PDFs in a directory
exiftool -json -r _assets/pdfs/ > pdf_metadata.json
```

**Rate limiting / gotchas:**
- No rate limiting (local tool), but batch processing 100+ files can take 30s+
- PDF "Author" field is often the computer username, not the document author
- Canva-generated PDFs have minimal metadata (no author field)
- Some PDFs have metadata stripped intentionally; absence of metadata is itself a signal
- GPS data in photos is rare for corporate headshots but common for event photos

**Alternatives considered but not used:**
- `PyPDF2` / `pdfminer` for metadata -- ExifTool is more comprehensive and handles all file types
- `Pillow` EXIF for photos -- ExifTool covers photos AND documents in one tool

---

### pdftotext (Poppler)

**What it does:** Extracts plain text from PDF files, preserving layout or outputting raw text. Part of the Poppler PDF rendering library.

**How it was used in BROGAV:** Converted downloaded PDF datasheets, partner decks, and case studies into searchable plain text for analysis. Key extraction: product specifications from manufacturer datasheets, pricing from partner program documents.

**Example:**

```bash
# Basic text extraction
pdftotext partner_deck.pdf partner_deck.txt

# Preserve layout (useful for tables)
pdftotext -layout datasheet.pdf datasheet.txt

# Extract specific pages
pdftotext -f 2 -l 5 long_document.pdf excerpt.txt

# Python wrapper
import subprocess
result = subprocess.run(["pdftotext", "-layout", "file.pdf", "-"], capture_output=True, text=True)
text = result.stdout
```

**Rate limiting / gotchas:**
- Image-only PDFs (scanned documents) return empty output -- use Tesseract OCR instead
- `-layout` mode preserves columns but can mangle tables with uneven spacing
- Multi-column PDFs often interleave column text without `-layout`
- Install via `brew install poppler` on macOS
- Large PDFs (100+ pages) can take 10-30s

**Alternatives considered but not used:**
- `pdfminer.six` (Python-native) -- slower but more control over extraction positioning
- `PyMuPDF` / `fitz` -- faster but GPL-licensed; Poppler tools are simpler for batch work

---

### Tesseract OCR

**What it does:** Optical character recognition engine that extracts text from images. Supports 100+ languages and can be trained on custom fonts.

**How it was used in BROGAV:** Scanned the supplier logo wall on brogav.com (a single image containing 20+ manufacturer logos) to identify all supplier relationships. Also extracted text from certificate images (WBENC, DBE badges) and event flyer screenshots.

**Example:**

```bash
# Basic OCR
tesseract logo_wall.png output_text

# With specific language and page segmentation mode
tesseract certificate.png output --psm 6 -l eng

# Python via pytesseract
import pytesseract
from PIL import Image

img = Image.open("logo_wall.png")
text = pytesseract.image_to_string(img, config="--psm 11")
# PSM 11 = sparse text, good for logo walls
```

**Rate limiting / gotchas:**
- Logo walls are notoriously difficult -- logos are graphical, not text; OCR catches text-based logos only
- Preprocessing (grayscale, threshold, resize to 300 DPI) dramatically improves accuracy
- PSM (Page Segmentation Mode) matters: 6 for blocks, 11 for sparse text, 3 for auto
- Tesseract v5+ with LSTM is significantly better than v4
- For logo walls, combining OCR with reverse image search yields better results
- Install: `brew install tesseract`

**Alternatives considered but not used:**
- Google Cloud Vision API -- better accuracy but costs money and sends data to Google
- Amazon Textract -- better for forms/tables but overkill for logo extraction
- EasyOCR -- GPU-dependent; Tesseract is sufficient for this use case

---

### yt-dlp

**What it does:** Downloads videos, audio, thumbnails, metadata, and auto-generated captions from YouTube and 1000+ other video platforms.

**How it was used in BROGAV:** Downloaded all auto-generated captions from BROGAV's YouTube videos (5 videos) and related industry event recordings. Extracted video metadata (upload dates, view counts, descriptions) for timeline construction. Downloaded thumbnails for visual evidence archive.

**Example:**

```bash
# Download auto-captions only (no video)
yt-dlp --write-auto-sub --sub-lang en --skip-download -o "%(id)s" "https://youtube.com/@brogav"

# Download metadata as JSON
yt-dlp --dump-json "https://www.youtube.com/watch?v=VIDEO_ID" > metadata.json

# Download thumbnail only
yt-dlp --write-thumbnail --skip-download -o "%(id)s_thumb" "URL"

# Batch download all channel captions
yt-dlp --write-auto-sub --sub-lang en --skip-download \
  --sleep-interval 2 --max-sleep-interval 5 \
  -o "captions/%(id)s" "https://youtube.com/@brogavsolutions"
```

**Rate limiting / gotchas:**
- YouTube rate limits aggressively: use `--sleep-interval 2` between downloads
- Auto-captions are available on most videos but quality varies (speaker names are wrong)
- Channel URLs require `/@handle` format or `/channel/CHANNEL_ID`
- Unlisted videos won't appear in channel scrapes; need direct URLs
- yt-dlp updates frequently; run `yt-dlp -U` before use to avoid broken extractors
- VTT subtitle format is easier to parse than SRT for transcript analysis

**Alternatives considered but not used:**
- YouTube Data API v3 -- requires API key, limited to metadata (no captions)
- `youtube-transcript-api` Python package -- captions only, no metadata or thumbnails
- Whisper (local transcription) -- unnecessary when auto-captions exist

---

### OpenAI Whisper (Speech-to-Text)

**What it does:** Transcribes audio files to text locally. Supports 99 languages. Multiple model sizes (tiny→large) trade speed for accuracy.

**How we used it:** Transcribed a 34-minute podcast episode (Inside Data Centre, Andy Davis interviewing Celina Berglund) that was only available as audio on BuzzSprout. Produced 6,489 words in 93 seconds.

**Installation:**
```bash
pip3 install openai-whisper
# Requires ffmpeg: brew install ffmpeg
```

**Example:**
```bash
python3 -c "
import whisper
model = whisper.load_model('base')
result = model.transcribe('podcast.mp3', language='en')
open('transcript.txt', 'w').write(result['text'])
"
```

**Model sizes:**
| Model | Size | Speed (34min audio) | Proper noun accuracy |
|-------|------|--------------------|--------------------|
| tiny | 39MB | ~30s | ~70% |
| base | 139MB | ~90s | ~85% |
| small | 461MB | ~3min | ~90% |
| medium | 1.5GB | ~8min | ~95% |
| large | 2.9GB | ~20min | ~98% |

**Gotchas:**
- Requires `ffmpeg` installed (audio format conversion)
- CPU-only is fine for base/small models; large models benefit from GPU
- Proper nouns (company names, people) are the weakest point — always verify names against known data
- FP16 warning on CPU is harmless (auto-falls back to FP32)

**Alternatives considered:**
- AssemblyAI (API, free 5hr/mo tier) — higher accuracy but requires upload
- Deepgram (API) — fastest but paid
- whisper.cpp (C++ port) — faster on CPU but harder to install

---

### AfterShip email-verifier (Go)

**What it does:** Verifies email addresses via SMTP RCPT TO checks without actually sending mail. Confirms whether a mailbox exists on the target mail server.

**How it was used in BROGAV:** Verified the existence of 15 guessed email addresses using the pattern `{firstname}@brogavsolutions.com`. Confirmed 11 active mailboxes, which corroborated team roster findings from LinkedIn.

**Example:**

```go
// Go library usage
package main

import (
    "fmt"
    emailverifier "github.com/AfterShip/email-verifier"
)

func main() {
    verifier := emailverifier.NewVerifier().EnableSMTPCheck()
    result, _ := verifier.Verify("celina@brogavsolutions.com")
    fmt.Printf("Reachable: %s\n", result.SMTP.Deliverable) // "true"
}
```

```bash
# CLI usage (if built from source)
./email-verifier verify celina@brogavsolutions.com
```

**Rate limiting / gotchas:**
- Microsoft 365 servers (which BROGAV uses) accept RCPT TO for valid mailboxes but may rate-limit after 20-30 checks
- Some mail servers are "catch-all" (accept all addresses) -- check for this first
- Results can be: deliverable, undeliverable, risky (catch-all), or unknown (greylisting)
- Never verify more than 50 addresses per domain per hour to avoid IP blocklisting
- Use from a clean IP; shared hosting IPs are often pre-blocked by mail servers
- The Go library is more reliable than Python alternatives for SMTP verification

**Alternatives considered but not used:**
- Hunter.io API -- paid, and we needed mailbox-level verification not just pattern detection
- NeverBounce -- paid bulk verification service
- Manual SMTP telnet -- same technique but no catch-all detection logic

---

### holehe

**What it does:** Checks whether an email address is registered on 121+ online services (LinkedIn, Twitter, Instagram, Spotify, Adobe, etc.) without alerting the account holder.

**How it was used in BROGAV:** Probed key personnel email addresses to discover which platforms they use. Found Celina Berglund's accounts on LinkedIn, Canva, HubSpot, and several others -- confirming CRM usage and design tool preferences.

**Example:**

```bash
# Check a single email
holehe celina@brogavsolutions.com

# Output format:
# [+] LinkedIn: Email registered
# [+] Canva: Email registered
# [-] Twitter: Email not registered
# [x] Instagram: Rate limited

# Python usage
import holehe.core as holehe
import asyncio

async def check(email):
    results = await holehe.holehe(email)
    registered = [r for r in results if r["exists"]]
    return registered
```

**Rate limiting / gotchas:**
- Many services (Instagram, Twitter) rate-limit aggressively -- expect 30-40% "unknown" results
- Run during off-peak hours for better hit rates
- Some services have patched the enumeration technique; results may be stale
- Never run against personal emails without authorization (legal gray area)
- The tool makes real HTTP requests to each service -- takes 30-60s per email
- False negatives are common; false positives are rare

**Alternatives considered but not used:**
- Sherlock (username-based, not email-based) -- different use case
- GHunt (Google-specific) -- too narrow
- Manual platform-by-platform checks -- holehe automates 121 of them

---

### SimilarWeb API

**What it does:** Provides estimated web traffic data, traffic sources, keyword rankings, geographic distribution, and competitor overlap for any domain.

**How it was used in BROGAV:** Retrieved estimated monthly visits (1.2K), traffic sources (70% direct, 15% organic search, 10% referral), top keywords, and geographic distribution for brogav.com. Used to benchmark against competitors.

**Example:**

```python
import requests

api_key = "YOUR_SIMILARWEB_KEY"
domain = "brogav.com"

# Total visits
url = f"https://api.similarweb.com/v1/website/{domain}/total-traffic-and-engagement/visits"
params = {"api_key": api_key, "start_date": "2026-01", "end_date": "2026-05", "country": "us", "granularity": "monthly"}
resp = requests.get(url, params=params)
data = resp.json()
```

**Rate limiting / gotchas:**
- Paid API (starts at $200/month for basic tier)
- Free tier via the Chrome extension provides limited data (last 3 months, top 5 keywords)
- Low-traffic sites (<5K monthly visits) have unreliable estimates -- BROGAV fell in this range
- Data is estimated (panel-based + clickstream modeling); treat as directional, not exact
- API returns empty for very new or very small sites; supplement with other sources
- Geographic and industry filters dramatically change results

**Alternatives considered but not used:**
- SEMrush -- similar capability but different pricing model
- Ahrefs -- focused on backlinks/SEO rather than traffic volume
- Google Search Console (requires site ownership) -- not available for competitor research

---

### SignalHire / RocketReach / Prospeo / ZoomInfo / ContactOut

**What it does:** People intelligence aggregators that provide professional contact information (email, phone), employment history, social profiles, and organizational data.

**How it was used in BROGAV:** Cross-referenced team rosters across multiple platforms to build complete profiles. SignalHire provided direct phone numbers and personal emails for key personnel. RocketReach confirmed employment dates. Prospeo verified email formats. ZoomInfo provided headcount and revenue estimates. ContactOut surfaced LinkedIn-linked contact data.

**Example (Prospeo):**

```python
import requests

# Email finder by domain
url = "https://api.prospeo.io/email-finder"
headers = {"Authorization": "Bearer YOUR_KEY", "Content-Type": "application/json"}
payload = {"first_name": "Celina", "last_name": "Berglund", "domain": "brogavsolutions.com"}
resp = requests.post(url, json=payload, headers=headers)
# Returns: {"email": "celina@brogavsolutions.com", "confidence": 95}
```

**Rate limiting / gotchas:**
- All are paid services ($30-300/month depending on tier)
- Data freshness varies: ZoomInfo updates quarterly, others monthly
- Cross-reference at least 2 sources -- single-source data has 20-30% error rate
- Small companies (<50 employees) have sparse coverage across all platforms
- Free tiers exist (5-10 lookups/month) -- enough for initial verification
- ZoomInfo requires a sales demo to get pricing (friction by design)
- ContactOut Chrome extension gives 5 free credits/month on LinkedIn profiles

**Alternatives considered but not used:**
- Apollo.io full platform -- paid; free tier was sufficient for verification
- Lusha -- similar to ContactOut but worse coverage for small companies
- Clearbit -- deprecated/acquired by HubSpot; uncertain future

---

### Wayback CDX Timemap

**What it does:** Returns all archived snapshots of a specific URL or URL pattern over time, enabling historical version comparison and change detection.

**How it was used in BROGAV:** Tracked the evolution of brogav.com over time -- identified when supplier logos were added/removed (indicating partnership changes), when team members appeared/disappeared from the site, and when product lines were introduced.

**Example:**

```python
import requests

# Get all snapshots for a specific page
url = "https://web.archive.org/cdx/search/cdx"
params = {
    "url": "brogav.com/team",
    "output": "json",
    "fl": "timestamp,statuscode,digest",
    "filter": "statuscode:200"
}
resp = requests.get(url, params=params)
snapshots = resp.json()[1:]

# Compare two versions
ts_old, ts_new = snapshots[0][0], snapshots[-1][0]
old_url = f"https://web.archive.org/web/{ts_old}/https://brogav.com/team"
new_url = f"https://web.archive.org/web/{ts_new}/https://brogav.com/team"
```

**Rate limiting / gotchas:**
- Same 1.5s rate limit as CDX API (same infrastructure)
- `digest` field enables deduplication -- same digest = same page content
- Wix sites are poorly archived (dynamic content not captured consistently)
- Use `from=` and `to=` parameters for date-bounded queries
- Diffing archived HTML requires normalizing Wayback toolbar injection

**Alternatives considered but not used:**
- VisualPing / ChangeTower -- forward-looking monitoring, not historical
- Google Cache -- only stores most recent version, not historical

---

### Tranco / Cloudflare Radar

**What it does:** Tranco provides a research-grade domain popularity ranking (combining Alexa, Majestic, Umbrella, and Quantcast data). Cloudflare Radar provides real-time traffic trends and internet intelligence.

**How it was used in BROGAV:** Checked brogav.com against the Tranco top-1M list (not ranked, confirming very low traffic). Used Cloudflare Radar to check for any traffic anomalies or CDN presence.

**Example:**

```bash
# Download Tranco list and search
curl -s "https://tranco-list.eu/download/LISTID/full" | grep "brogav"

# Cloudflare Radar API
curl "https://api.cloudflare.com/client/v4/radar/ranking/domain/brogav.com" \
  -H "Authorization: Bearer CF_TOKEN"
```

**Rate limiting / gotchas:**
- Tranco list is free and updated daily; download the full CSV (1M entries, ~20MB)
- If a domain is not in the top 1M, it confirms very low traffic (<1K daily visits estimated)
- Cloudflare Radar API requires a Cloudflare account but is free tier
- Radar only has data for domains routed through Cloudflare or observed in their resolver logs
- Tranco is academically preferred over Alexa (which was shut down in 2022)

**Alternatives considered but not used:**
- Alexa -- deprecated/shutdown
- Majestic Million -- only measures backlink authority, not traffic
- Umbrella (Cisco) -- Tranco already incorporates this data

---

### D&B Hoovers

**What it does:** Provides firmographic data including modeled revenue, headcount, D-U-N-S number, SIC/NAICS codes, company hierarchy, risk scores, and business credit reports.

**How it was used in BROGAV:** Pulled the full company profile: $4.51M modeled revenue, 10 employees, D-U-N-S 11-859-5887, Low financial risk rating, founding date, registered agent. This was the primary source for financial estimates since BROGAV is privately held.

**Example:**

```
# D&B Hoovers is web-interface based (no public API for individual lookups)
# Access via: https://app.dnb.com/ (requires paid subscription)
# Search: "BROGAV Solutions" -> Company Profile -> Financial tab

# Key data points extracted:
# - Revenue (modeled): $4.51M
# - Employees (modeled): 10
# - D-U-N-S: 11-859-5887
# - Risk Score: Low
# - SIC: 5065 (Electronic Parts and Equipment)
# - NAICS: 423690 (Other Electronic Parts Merchant Wholesalers)
```

**Rate limiting / gotchas:**
- Paid platform ($200-500/month for Hoovers access)
- "Modeled" revenue means estimated from employee count, industry, and public signals -- not reported
- For companies under $10M revenue, D&B estimates can be off by 50-100%
- Company hierarchy data helps identify parent/subsidiary relationships
- The D-U-N-S number is the universal business identifier -- more reliable than EIN for research
- Credit reports require additional purchase beyond basic Hoovers access

**Alternatives considered but not used:**
- Experian Business -- similar firmographics but less comprehensive hierarchy data
- Equifax Business -- focused on credit, less useful for general intelligence

---

### S&P Global Capital IQ

**What it does:** Financial intelligence platform providing company screening, M&A transaction data, industry classification, competitor identification, and financial benchmarking.

**How it was used in BROGAV:** Used the screening tool to identify competitors by SIC code (5065 - Electronic Parts and Equipment) filtered to Minnesota and neighboring states. Identified 7 Tier 1 direct competitors and validated revenue ranges for comparable firms.

**Example:**

```
# Capital IQ is web-interface based (institutional subscription)
# Screen path: Screening > Company > Industry (SIC 5065) > Geography (MN, WI, IA, ND, SD)
# Filters applied:
#   - Revenue: $1M - $50M
#   - Employees: 5 - 100
#   - Status: Active
#   - Ownership: Private

# Results exported as CSV for competitor analysis
```

**Rate limiting / gotchas:**
- Institutional subscription only ($15K-50K/year); often available through university libraries
- SIC-based screening is broad; manual filtering of results is required
- Private company data is sparse (estimated revenue, not reported)
- Competitor screening works best when combined with geographic and size filters
- Export limits vary by subscription tier (typically 500-1000 records per export)

**Alternatives considered but not used:**
- PitchBook -- better for VC-backed companies; less useful for bootstrapped SMBs
- Crunchbase -- consumer-grade; limited data on non-tech companies
- IBISWorld -- industry reports but not company-level screening

---

### Google Analytics GTM Container Parse

**What it does:** Extracts the Google Tag Manager container configuration from a website's source code, revealing all tracking pixels, analytics tools, advertising platforms, and third-party integrations.

**How it was used in BROGAV:** Parsed the GTM container on brogav.com to discover tracking pixels (Google Analytics GA4, The Trade Desk, TikTok pixel, Meta pixel), CRM integrations, and remarketing configurations. Cross-referenced active pixels against ad transparency platforms to assess actual ad spend.

**Example:**

```python
import requests
import json
import re

# Extract GTM container ID from page source
page = requests.get("https://brogav.com").text
gtm_match = re.search(r"GTM-([A-Z0-9]+)", page)
container_id = gtm_match.group(0)  # e.g., "GTM-XXXXXXX"

# Fetch the container JavaScript
gtm_url = f"https://www.googletagmanager.com/gtm.js?id={container_id}"
gtm_js = requests.get(gtm_url).text

# Parse for tracking IDs
ga_ids = re.findall(r"G-[A-Z0-9]+", gtm_js)     # GA4
ttd_ids = re.findall(r"ttd_[a-z0-9]+", gtm_js)  # The Trade Desk
meta_ids = re.findall(r"fbq\('init',\s*'(\d+)'\)", gtm_js)  # Meta Pixel
```

**Rate limiting / gotchas:**
- GTM containers are public (anyone can read them); no rate limiting
- Container JS is minified/obfuscated -- regex extraction is fragile
- Some tags fire conditionally (e.g., only on certain pages or after consent)
- Having a pixel installed does not mean ads are actively running (pixel may be dormant)
- Cross-reference with Google Ads Transparency Center and Meta Ad Library for active spend confirmation
- Wix sites sometimes embed tracking via their own layer rather than GTM

**Alternatives considered but not used:**
- Wappalyzer -- browser extension that identifies technologies; less detailed than manual GTM parse
- BuiltWith -- provides similar data but behind a paywall ($300+/month)

---

## Tools Found But NOT Used

---

### SAM.gov API

**What it does:** Official API for the System for Award Management, providing entity registration data, exclusions, and contract opportunities.

**Why it was not used:** The API requires a registered API key (free but 24-48h approval process). The DEMO_KEY documented in their API guide returned 404 errors on most endpoints during testing. The public SAM.gov web search provided the same entity verification data we needed without the API.

**What we used instead:** Manual SAM.gov web search + CLEATUS cross-reference + USASpending.gov API (which worked without a key).

---

### PACER (Public Access to Court Electronic Records)

**What it does:** U.S. federal court records system providing access to case filings, dockets, and court documents.

**Why it was not used:** PACER charges $0.10 per page viewed, with no free tier for research purposes. For a single-company dossier where no litigation was expected (and none was found via free court record searches), the cost was not justified.

**What we used instead:** Free state court record searches (Minnesota Courts), county-level searches, and D&B's litigation flag (which showed no records).

---

### Apollo.io / ZoomInfo Full Platform

**What it does:** Full-featured sales intelligence platforms with contact databases, intent signals, org charts, and workflow automation.

**Why they were not used:** Both require paid subscriptions ($50-300/month) with long sales processes. The free tiers (Apollo: 5 credits/month; ZoomInfo: demo access only) provided enough data for verification without full platform access.

**What we used instead:** Combination of free-tier lookups across multiple platforms (SignalHire, RocketReach, Prospeo, ContactOut) plus SMTP verification to confirm email existence independently.

---

### Wappalyzer

**What it does:** Browser extension and API that identifies technologies used on websites (CMS, frameworks, analytics, CDN, hosting, ecommerce).

**Why it was not used:** The API is paid ($100+/month) and the browser extension provides limited programmatic access. For a single target site, manually parsing the GTM container and inspecting page source provided more detailed and accurate results.

**What we used instead:** Manual GTM container parsing + page source inspection + DNS record analysis. This revealed not just the technology but the specific configuration (e.g., which GA4 property, which pixels are active).

---

### BuiltWith

**What it does:** Technology profiling service that tracks what technologies websites use, with historical data showing when technologies were added/removed.

**Why it was not used:** Pricing starts at $295/month for the basic plan. The historical technology tracking would have been valuable (showing when BROGAV added their Trade Desk pixel, for example), but the cost was not justified for a single-company investigation.

**What we used instead:** Wayback Machine + manual GTM parsing provided a poor-man's version of technology history (comparing archived page source across timestamps).

---

### Shodan

**What it does:** Search engine for internet-connected devices. Discovers open ports, services, SSL certificates, and infrastructure details for any IP address or domain.

**Why it was not used:** BROGAV is a value-added reseller (VAR), not a technology company. Their infrastructure consists of a Wix-hosted website and Microsoft 365 email -- both SaaS platforms with no exposed infrastructure to scan. Shodan would reveal Wix's infrastructure, not BROGAV's.

**What we used instead:** DNS record analysis (MX, SPF, DMARC, CNAME) provided all the infrastructure intelligence relevant to this target.

---

### SecurityTrails

**What it does:** Historical DNS records, domain intelligence, WHOIS history, and subdomain enumeration.

**Why it was not used:** BROGAV uses a single domain (brogav.com, previously brogavsolutions.com) hosted on Wix with standard DNS configuration. There were no subdomains of interest, no complex infrastructure to map, and the WHOIS history showed only the expected registrant changes matching the company's rebrand timeline. Minimal intelligence value.

**What we used instead:** Standard `dig`/`nslookup` queries for MX, SPF, DMARC, and CNAME records provided all relevant DNS intelligence.

---

## Tool Selection Framework

When deciding which tools to deploy for a new dossier target, use this decision tree:

1. **Is the target's website JS-rendered (SPA/Wix/React)?** Yes -> Playwright. No -> requests + BeautifulSoup.
2. **Does the target have federal contract ambitions?** Yes -> USASpending + SAM.gov + CLEATUS.
3. **Is historical web presence relevant?** Yes -> Wayback CDX + Timemap.
4. **Are there downloadable PDFs?** Yes -> pdftotext + ExifTool.
5. **Does the site use image-based content (logo walls, certificates)?** Yes -> Tesseract OCR.
6. **Does the target have video content?** Yes -> yt-dlp.
7. **Do you need to verify team members?** Yes -> email-verifier + holehe + people aggregators.
8. **Is traffic estimation needed?** Yes -> SimilarWeb + Tranco + Cloudflare Radar.
9. **Do you need financial estimates for a private company?** Yes -> D&B Hoovers.
10. **Do you need competitor identification?** Yes -> S&P Capital IQ or manual SIC-based search.
11. **Do you need to understand their marketing?** Yes -> GTM container parse + ad transparency platforms.
