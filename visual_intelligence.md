# Visual Intelligence: Extracting Intel from Video Frames

How to extract business intelligence from what you can SEE in videos — facilities, products, team members, signage, equipment, branding — not just what's said.

---

## Why Visual Intelligence Matters

Video transcripts capture speech. But videos SHOW:
- **Warehouse size and inventory levels** (racks visible, floor space, loading docks)
- **Product brands and models** (labels, serial numbers on equipment)
- **Team size** (how many people in office/warehouse shots)
- **Facility quality** (professional vs. garage operation)
- **Customer sites** (installations, data center floor shots)
- **Signage and branding** (event banners, sponsor logos, booth displays)
- **Equipment condition** (new vs. used, packaging, shipping prep)

These visual signals are often MORE reliable than verbal claims because they're harder to fake.

---

## The Pipeline: Video → Frames → Intelligence

```
┌─────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────────┐
│ Download │───▶│ Extract  │───▶│ AI Vision   │───▶│ Intelligence │
│ Video    │    │ Keyframes│    │ Analysis    │    │ Report       │
│ (yt-dlp) │    │ (ffmpeg) │    │ (Claude/GPT)│    │ (findings)   │
└─────────┘    └──────────┘    └─────────────┘    └──────────��───┘
```

### Step 1: Download Video

```bash
# Download at 720p (sufficient for visual analysis, saves space)
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" \
  --merge-output-format mp4 -o "VIDEO_ID.mp4" VIDEO_URL
```

### Step 2: Extract Keyframes with ffmpeg

```bash
# Method A: One frame every 10 seconds (good for walkthroughs/vlogs)
ffmpeg -i video.mp4 -vf "fps=1/10" frames/frame_%04d.jpg

# Method B: Keyframes only (scene changes — most efficient)
ffmpeg -i video.mp4 -vf "select='eq(pict_type,I)'" -vsync vfr frames/keyframe_%04d.jpg

# Method C: One frame every 30 seconds (for long videos)
ffmpeg -i video.mp4 -vf "fps=1/30" frames/frame_%04d.jpg

# Method D: Single frame at specific timestamp
ffmpeg -i video.mp4 -ss 00:01:23 -frames:v 1 frame_at_1m23s.jpg
```

**Rule of thumb:**
- Short video (<2 min): keyframes only (Method B) — gives 5-15 frames
- Medium video (2-10 min): every 10 seconds (Method A) — gives 12-60 frames
- Long video (10+ min): every 30 seconds (Method C) — gives 20-40 frames

### Step 3: Build Contact Sheet for Batch Analysis

```python
from PIL import Image
import os, glob

frames = sorted(glob.glob('frames/*.jpg'))
cols, rows = 6, 6
thumb_size = (200, 150)

# Create 6x6 contact sheet
sheet = Image.new('RGB', (cols*thumb_size[0], rows*thumb_size[1]), 'white')
for i, frame_path in enumerate(frames[:36]):
    img = Image.open(frame_path).resize(thumb_size, Image.LANCZOS)
    x = (i % cols) * thumb_size[0]
    y = (i // cols) * thumb_size[1]
    sheet.paste(img, (x, y))

sheet.save('contact_sheet.jpg', quality=85)
```

### Step 4: AI Vision Analysis

Show the contact sheet (or individual frames) to a multimodal AI:

**Prompt for Claude/GPT-4V:**
```
I'm analyzing video frames from a company's YouTube channel for business intelligence.
For each frame where you can identify meaningful content, report:

1. FACILITY: Office or warehouse? Size estimate? Professional or garage-level?
2. PRODUCTS: Any equipment visible? Brand names? Model numbers? Condition?
3. PEOPLE: How many? Roles (from clothing/context)? Gender?
4. BRANDING: Company logos? Partner logos? Event banners?
5. SIGNAGE: Any readable text? Addresses? Phone numbers?
6. EQUIPMENT: Vehicles? Forklifts? Pallets? Shipping?
7. CUSTOMERS/SITES: Data center floor? Server racks? Installations?
8. SCALE INDICATORS: How much inventory? How many bays? Parking lot size?
```

### Step 5: Cross-Reference with Existing Intel

Compare visual findings against dossier claims:
- "8,000 sq ft warehouse" → does it LOOK like 8,000 sq ft?
- "10 employees" → how many people visible in office/team shots?
- "Surplus inventory ($1.95M)" → does visible stock support this claim?
- "Turnkey installation services" → any workers in hard hats/vests at customer sites?

---

## What to Look For (Checklist by Video Type)

### CEO "Day in the Life" Vlogs
- [ ] Home office or commercial office? (property records validation)
- [ ] Vehicle type (company truck? Personal car? Branded?)
- [ ] Meeting with customers? (location, company logos visible)
- [ ] Computer screens (what software/tools visible?)
- [ ] Team members visible (count, roles, diversity)
- [ ] Warehouse shots (inventory levels, organization, scale)

### Product Demo Videos
- [ ] Brand names on equipment (manufacturer identification)
- [ ] Model numbers visible (SKU validation)
- [ ] Packaging (new vs. refurbished indicators)
- [ ] Shipping/logistics (pallets, flatbeds, freight)
- [ ] Installation tools and equipment

### Event/Conference Videos
- [ ] Booth size and positioning (budget signal)
- [ ] Sponsor banner logos (partnership evidence)
- [ ] Attendee count estimate
- [ ] Speaking slot (stage, panel, booth demo?)
- [ ] Business cards, signage, QR codes
- [ ] Other company representatives visible

### Facility Tours / Walkthroughs
- [ ] Square footage estimate (count ceiling tiles, measure against people)
- [ ] Loading dock (truck access = real warehouse operations)
- [ ] Racking systems (inventory capacity)
- [ ] Office area (desks = headcount signal)
- [ ] Signage (address, hours, certifications displayed)
- [ ] Vehicles in parking lot (employee count signal)

---

## Tools

| Tool | Purpose | Install |
|------|---------|---------|
| yt-dlp | Download video files | `pip install yt-dlp` |
| ffmpeg | Extract frames from video | `brew install ffmpeg` |
| Pillow | Contact sheet generation | `pip install Pillow` |
| Claude (multimodal) | AI vision analysis of frames | Claude Code / API |
| ExifTool | Frame metadata (GPS if embedded) | `brew install exiftool` |

---

## Edge Cases

1. **Shorts (<60 sec)** — Extract ALL frames (only 30-60 at 1fps). Every frame may contain a product shot.
2. **Montage videos with music** — No speech but LOTS of visual intel. Keyframe extraction is essential.
3. **Screen recordings** — May show CRM, email, website admin. HIGH intel value.
4. **Dark/nighttime footage** — Data centers are often dimly lit. Increase brightness in frames.
5. **Blurred/pixelated** — Intentional privacy protection. Note what they're TRYING to hide.
6. **Watermarked content** — Stock footage vs. original footage. Stock footage = no intel.
7. **LinkedIn native video** — Cannot download. Must screenshot manually or use "Save as Web Complete."

---

## BROGAV Visual Intel (What We Found)

From the existing PHOTO_INTELLIGENCE analysis (46 images already processed):
- Celina in hard hat/vest at live electrical panel (confirms site visit capability)
- Case IH 895 tractor (confirms farm origin story authenticity)
- LBTI 2025 sponsor banner (RLE, DCB, Iron Grit Solutions, iCellWatch logos)
- Custom BROGAV Nike Dunk Low shoes (brand investment)
- 401(k) matching confirmed in recruiting graphic
- Flatbed with Caterpillar containerized generator (heavy equipment logistics)
- "Where We've Sold" map showing international shipments

**Not yet processed (requires video download + frame extraction):**
- CEO Day in the Life video — likely shows office, warehouse, daily operations
- Farm to Cable video — likely shows farm, Minnesota landscape, family
- Data Center Drive-Thru — likely shows product inventory closeups
- LBTI event videos — likely shows venue, attendees, sponsors up close
- Product Shorts — likely shows cabinet details, accessories, packaging

---

## Validated Results (BROGAV Case Study)

The visual intelligence pipeline was validated by downloading and analyzing the "CEO Data Center Day in the Life" video from the BROGAV YouTube channel:

**Process:**
1. Downloaded video: `yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" --merge-output-format mp4 VIDEO_URL` (5.6MB)
2. Extracted 25 frames: `ffmpeg -i video.mp4 -vf "fps=1/5" frames/frame_%03d.jpg`
3. Read each frame using Claude's multimodal vision (Read tool on JPG files)
4. Documented findings with frame-by-frame evidence

**Visual findings (7 new, not in ANY text source):**

| # | Finding | Evidence Frame | Intel Category |
|---|---------|---------------|----------------|
| 1 | Daily work is HOME-BASED, not commercial office | Frame 1-2: residential walls, carpet, kids' artwork, dual monitors | Facilities |
| 2 | Husband/partner exists (unnamed) | Frame 22: man reading to two boys in bed | People |
| 3 | MacBook Pro + Microsoft 365 confirmed | Frame 23: silver laptop, M365 app launcher visible | Tech stack |
| 4 | CapCut used for video editing | Frame 25: CapCut logo (consumer-grade) | Marketing tools |
| 5 | No company vehicle fleet | Frame 9: personal Dodge SUV, no branding | Operations |
| 6 | BROGAV-branded hard hat (field PPE) | Frame 3-4: white hard hat, teal logo, tagline visible | Brand |
| 7 | Customer DC is mid-market (~8 cabinets, mini-split) | Frame 14-15: small server room, not hyperscale | Customer segment |

**Key insight:** A 2-minute YouTube vlog yielded 7 intelligence findings that NO text source (transcripts, websites, aggregators, filings) could have revealed. Visual analysis is not optional — it's a distinct intelligence layer.

**Time cost:** 5 min download + 1 min frame extraction + 10 min visual review = ~16 minutes for 7 findings.

---

## Integration with Dossier

Visual findings should update:
- `1_corporate/facilities.md` — if office/warehouse shots provide new detail
- `3_products/` — if products/brands visible that aren't documented
- `4_suppliers/` — if supplier logos/products visible in warehouse
- `5_customers/` — if customer data center interiors shown
- `7_financials/signals.md` — if inventory levels visible support/contradict claims
- `8_marketing/` — if event attendance/booth size provides scale data
- `9_brand/` — if branding elements visible (vehicles, merchandise, signage)
