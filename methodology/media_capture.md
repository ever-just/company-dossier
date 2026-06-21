# Media Capture: Overcoming Rate Limits & Downloading Video/Audio Across Platforms

The definitive guide to capturing video, audio, and transcripts from YouTube, podcasts, and social platforms for intelligence work. Covers rate limiting solutions, authentication workarounds, and platform-specific tooling.

---

## YouTube: The Full Picture (2026)

### The Problem

YouTube aggressively rate-limits automated access in 2026:
- **429 Too Many Requests** after ~30 rapid subtitle downloads
- **SABR Streaming blocks** — YouTube requires a "handshake" that yt-dlp can't always complete
- **App-bound encryption** — Chrome cookies can no longer be extracted by external tools (Chrome 127+)
- **Deprecated OAuth2** — the device code flow (`--username oauth2`) no longer works

### Solution 1: `youtube-transcript-api` (Best for Transcripts Only)

**No API key. No authentication. 100% success rate on captioned videos (tested Jan 2026 on 425 videos).**

```bash
pip install youtube-transcript-api
```

```python
from youtube_transcript_api import YouTubeTranscriptApi
import time

video_ids = ["IQoFDxVSRUA", "jm3q6mfmG8U", "meTK4sVzI94"]

for vid in video_ids:
    try:
        transcript = YouTubeTranscriptApi.get_transcript(vid)
        text = ' '.join([seg['text'] for seg in transcript])
        with open(f'transcript_{vid}.txt', 'w') as f:
            f.write(text)
        print(f"✓ {vid}: {len(text.split())} words")
    except Exception as e:
        print(f"✗ {vid}: {e}")
    time.sleep(1)  # Rate limit prevention
```

**Rate limits:** ~100-500 requests/hour before CAPTCHA triggers. Add 1-second delays.

**Why this beats yt-dlp for transcripts:** It doesn't trigger the same rate limits because it hits a different endpoint (caption data, not video streaming infrastructure).

### Solution 2: yt-dlp with Firefox Cookies (Best for Video + Metadata)

Chrome cookies are now app-bound encrypted (2026). **Firefox is the only browser where cookies can be extracted.**

```bash
# Method A: Direct from Firefox (requires Firefox to be closed)
yt-dlp --cookies-from-browser firefox VIDEO_URL

# Method B: Export cookies manually (if Method A fails)
python3 -c "
import sqlite3, shutil, glob, os
profiles = os.path.expanduser('~/Library/Application Support/Firefox/Profiles')
db = max(glob.glob(f'{profiles}/*/cookies.sqlite'), key=os.path.getsize)
shutil.copy2(db, '/tmp/ff_cookies.sqlite')
conn = sqlite3.connect('/tmp/ff_cookies.sqlite')
rows = conn.execute(\"\"\"SELECT host, name, value FROM moz_cookies 
                        WHERE host LIKE '%youtube%' OR host LIKE '%google%'\"\"\").fetchall()
print(f'{len(rows)} cookies extracted')

# Write Netscape format cookies.txt
with open('cookies.txt', 'w') as f:
    f.write('# Netscape HTTP Cookie File\n')
    for host, name, value in rows:
        f.write(f'{host}\tTRUE\t/\tTRUE\t0\t{name}\t{value}\n')
"

# Then use:
yt-dlp --cookies cookies.txt VIDEO_URL
```

**Cookie expiry:** ~2 weeks. Must re-extract periodically.

### Solution 3: yt-dlp with Impersonation (Anti-Bot Bypass)

```bash
# Install curl_cffi for TLS fingerprint impersonation
pip install yt-dlp[curl_cffi]

# Use impersonation to look like a real browser
yt-dlp --impersonate chrome VIDEO_URL

# Combined with sleep for batch downloads
yt-dlp --impersonate chrome --sleep-interval 3 --sleep-subtitles 2 \
  --write-info-json --write-auto-sub --sub-lang en --skip-download \
  "https://www.youtube.com/@CHANNEL"
```

**Why this helps:** YouTube's bot detection looks at TLS fingerprints. Python's default `requests` library has a distinctly non-browser fingerprint. `curl_cffi` mimics Chrome/Firefox/Safari at the TLS level.

### Solution 4: Deno Runtime (Required for YouTube 2026)

YouTube now requires JavaScript execution for signature decryption. yt-dlp uses an external JS runtime:

```bash
# Install Deno (required by yt-dlp for YouTube in 2026)
brew install deno

# yt-dlp automatically uses Deno if available
yt-dlp VIDEO_URL  # Will show [youtube] [jsc:deno] Solving JS challenges
```

### Recommended YouTube Strategy (Combining All)

```bash
# Step 1: Get transcripts first (fastest, most reliable)
pip install youtube-transcript-api
python3 get_transcripts.py  # Uses youtube-transcript-api, not yt-dlp

# Step 2: Get metadata for all videos (sleep between requests)
yt-dlp --write-info-json --skip-download --sleep-interval 3 CHANNEL_URL

# Step 3: Get captions via yt-dlp (with impersonation + cookies)
yt-dlp --impersonate chrome --cookies-from-browser firefox \
  --write-auto-sub --sub-lang en --skip-download --sleep-subtitles 2 CHANNEL_URL

# Step 4: If rate limited, fall back to youtube-transcript-api for remaining
```

---

## Podcasts: Platform-by-Platform

### Apple Podcasts → RSS → MP3

```bash
# 1. Get RSS feed URL
curl -s "https://itunes.apple.com/lookup?id=PODCAST_ID&entity=podcast" | \
  python3 -c "import json,sys; print(json.load(sys.stdin)['results'][0]['feedUrl'])"

# 2. Parse RSS for episode MP3
python3 parse_rss.py RSS_URL "GUEST_NAME"

# 3. Download MP3
curl -L -H "User-Agent: Mozilla/5.0" -o episode.mp3 "MP3_URL?download=true"

# 4. Transcribe
python3 -c "import whisper; m=whisper.load_model('base'); r=m.transcribe('episode.mp3'); open('t.txt','w').write(r['text'])"
```

### Spotify Podcasts

**Cannot be downloaded programmatically.** Spotify does not expose RSS feeds for most shows and has no download API.

Workarounds:
- Check if the same episode exists on Apple Podcasts (many shows are on both)
- Check if it's on YouTube (many podcasts cross-post video)
- Use Spotify's in-app transcript feature (view-only, no export)
- Last resort: Play + record locally with OBS or BlackHole (audio loopback)

### BuzzSprout

```bash
# Direct MP3 download (needs User-Agent + ?download=true)
curl -L -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" \
  -o episode.mp3 "https://www.buzzsprout.com/SHOW/episodes/EPISODE.mp3?download=true"
```

**Gotcha:** Without `?download=true` and User-Agent, BuzzSprout returns a Cloudflare HTML challenge page.

### Libsyn

```bash
# Usually direct download works
curl -L -o episode.mp3 "https://traffic.libsyn.com/SHOW/EPISODE.mp3"
```

**Gotcha:** Episode URLs sometimes 404 if the show renames. Always use the RSS feed to find current URLs.

---

## Other Platforms

### LinkedIn Videos

**CANNOT be downloaded programmatically.** LinkedIn CDN URLs are:
- Authenticated (tied to your session)
- Time-limited (expire within hours)
- Fingerprinted (detect non-browser access)

**Only option:** "Save as Web Complete" in your browser while logged in. This saves the video element embedded in the HTML.

**For OSINT purposes:** The `linkedin-activity-intelligence` skill documents how to save an entire activity feed as MHTML and extract images. Videos require individual manual saves.

### Instagram (Instaloader)

```bash
pip install instaloader

# Download all posts from a profile (requires login for private)
instaloader --login YOUR_USERNAME PROFILE_NAME

# Download specific post
instaloader -- -BxxxxxURL
```

**Rate limits:** Instagram is aggressive. ~200 requests before soft-block, 400 before hard-block. Use `--sleep-interval` and `--max-connection-attempts`.

**Alternative:** [cobalt.tools](https://cobalt.tools) — open-source, no login, privacy-first. Works for public posts.

### TikTok

```bash
# yt-dlp supports TikTok
yt-dlp "https://www.tiktok.com/@username/video/ID"

# Batch download user's videos
yt-dlp "https://www.tiktok.com/@username"
```

**Rate limits:** TikTok is less aggressive than YouTube. 5-second sleep is usually sufficient.

**Alternative:** [cobalt.tools](https://cobalt.tools) for no-watermark downloads.

### Vimeo

```bash
# yt-dlp handles most Vimeo videos
yt-dlp "https://vimeo.com/VIDEO_ID"

# For private/embed-only videos
pip install vimeo-downloader
python3 -c "from vimeo_downloader import Vimeo; v=Vimeo('URL'); v.streams[-1].download()"
```

### Twitter/X

```bash
# yt-dlp supports X/Twitter
yt-dlp "https://x.com/user/status/ID"

# gallery-dl for bulk downloads
pip install gallery-dl
gallery-dl "https://x.com/USERNAME"
```

---

## Transcription: When You Have Audio But No Captions

### OpenAI Whisper (Local, Free)

```bash
pip install openai-whisper
# Requires: brew install ffmpeg

python3 -c "
import whisper
model = whisper.load_model('base')  # or 'medium' for better names
result = model.transcribe('audio.mp3', language='en')
open('transcript.txt', 'w').write(result['text'])
"
```

| Model | Size | Speed (34min) | Name accuracy |
|-------|------|---------------|--------------|
| tiny | 39MB | ~30s | ~70% |
| base | 139MB | ~90s | ~85% |
| small | 461MB | ~3min | ~90% |
| medium | 1.5GB | ~8min | ~95% |
| large-v3 | 2.9GB | ~20min | ~98% |

### Whisper.cpp (Faster on CPU)

```bash
# C++ port, no Python dependency
brew install whisper-cpp
whisper-cpp -m models/ggml-base.en.bin -f audio.wav
```

### Cloud Alternatives

| Service | Free tier | Speed | Accuracy |
|---------|-----------|-------|----------|
| AssemblyAI | 5 hrs/month | Real-time | Very high |
| Deepgram | 12K minutes once | Real-time | Very high |
| Google Speech-to-Text | 60 min/month | Near real-time | High |
| Rev.ai | 3 hrs once | Near real-time | Very high |

---

## Rate Limit Mitigation Strategies

### Universal Principles

1. **Sleep between requests** — 2-5 seconds minimum for YouTube, 1s for others
2. **Use impersonation** — `curl_cffi` for TLS fingerprinting that matches browsers
3. **Rotate User-Agents** — don't use Python's default UA
4. **Use cookies from Firefox** — Chrome cookies are encrypted since v127
5. **Batch smartly** — get transcripts first (different endpoint), metadata second, video last
6. **Fall back gracefully** — if yt-dlp fails, try youtube-transcript-api; if that fails, note as gap

### YouTube-Specific

| Problem | Solution |
|---------|----------|
| 429 on subtitles | Switch to `youtube-transcript-api` library |
| 403 on video | Install Deno for JS challenge solving |
| Bot detection | `--impersonate chrome` with curl_cffi |
| Cookies needed | `--cookies-from-browser firefox` (NOT Chrome) |
| Channel scrape dies mid-way | Add `--sleep-interval 3` and retry |
| Age-restricted content | Cookies required (logged-in session) |

### Podcast-Specific

| Problem | Solution |
|---------|----------|
| BuzzSprout returns HTML | Add `?download=true` + browser User-Agent |
| Libsyn 404 | Use RSS feed to find current episode URL |
| Spotify exclusive | No solution — manual only |
| No captions exist | Download audio → Whisper transcribe |

---

## Complete Tool Stack

| Tool | What it does | Install |
|------|-------------|---------|
| `yt-dlp` | Video/audio download from 1000+ sites | `pip install yt-dlp` |
| `youtube-transcript-api` | YouTube captions without rate limits | `pip install youtube-transcript-api` |
| `openai-whisper` | Local speech-to-text | `pip install openai-whisper` |
| `curl_cffi` | TLS fingerprint impersonation | `pip install curl_cffi` |
| `deno` | JS runtime (required for YouTube 2026) | `brew install deno` |
| `ffmpeg` | Audio/video format conversion | `brew install ffmpeg` |
| `instaloader` | Instagram content download | `pip install instaloader` |
| `gallery-dl` | Multi-platform image/video download | `pip install gallery-dl` |
| `cobalt.tools` | Privacy-first multi-platform downloader | Web-based (cobalt.tools) |
| `vimeo-downloader` | Vimeo private/embed video download | `pip install vimeo-downloader` |

---

## Decision Tree

```
What platform is the content on?
│
├── YouTube
│   ├── Need transcript only? → youtube-transcript-api (fastest, no rate limits)
│   ├── Need metadata? → yt-dlp --write-info-json --skip-download
│   ├── Need video file? → yt-dlp --impersonate chrome --cookies-from-browser firefox
│   └── Getting 429? → Add --sleep-interval 3, try youtube-transcript-api fallback
│
├── Podcast (audio-only)
│   ├── On Apple Podcasts? → iTunes API → RSS → MP3 → Whisper
│   ├── On Spotify only? → Manual (no programmatic access)
│   └── On BuzzSprout/Libsyn? → Direct MP3 from RSS feed
│
├── LinkedIn → MANUAL ONLY (Save as Web Complete)
│
├── Instagram → instaloader (login needed for private) or cobalt.tools (public)
│
├── TikTok → yt-dlp or cobalt.tools
│
├── Vimeo → yt-dlp (public) or vimeo-downloader (private/embed)
│
└── Twitter/X → yt-dlp or gallery-dl
```
