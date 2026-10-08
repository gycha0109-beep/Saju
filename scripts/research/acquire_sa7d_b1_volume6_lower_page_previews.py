#!/usr/bin/env python3
"""Bounded NLC Ming volume six lower PDF thumbnails; NOT original-PDF proof.

Sources are requested via Commons imageinfo and their exact returned thumbnail URLs.
No unverified literal URL reconstruction, no retries on 429, no Annual promotion.
"""
import base64
import hashlib
import io
import json
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

OUT = Path(".scan-evidence")
OUT.mkdir(exist_ok=True)
FILE = "NLC892-411999029701-67238_三命通會_第12冊.pdf"
CATALOG = "https://commons.wikimedia.org/wiki/File:" + FILE
API = "https://commons.wikimedia.org/w/api.php"
USER_AGENT = "MyeongHa-Saju-Research/1.1 (https://github.com/gycha0109-beep/Saju; public-domain-archival-audit)"
PAGES = (2, 15, 30, 45)
MAX_BYTES = 2_500_000

def get(url, accept):
    req = urllib.request.Request(url, headers={
        "User-Agent": USER_AGENT, "Accept": accept,
        "Referer": "https://commons.wikimedia.org/",
    })
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            status = resp.status
            length = resp.headers.get("Content-Length")
            ctype = resp.headers.get("Content-Type", "")
            if length is not None and int(length) > MAX_BYTES:
                raise ValueError(f"Response too large, declared={length}")
            data = resp.read(MAX_BYTES + 1)
            if len(data) > MAX_BYTES:
                raise ValueError("Response too large")
            if length is not None and len(data) != int(length):
                raise ValueError("Truncated response")
            if status != 200:
                raise ValueError(f"Unexpected response {status}")
            return data, ctype
    except urllib.error.HTTPError as exc:
        raise RuntimeError(
            f"HTTP_{exc.code}; retry-after={exc.headers.get('Retry-After', 'unspecified')}; url={url}"
        ) from exc

def image_info(page):
    params = urllib.parse.urlencode({
        "action": "query", "format": "json", "prop": "imageinfo",
        "titles": "File:" + FILE, "iiprop": "url|size|sha1|mime|thumbmime",
        "iiurlwidth": "960", "iiurlparam": f"page{page}",
    })
    raw, ctype = get(API + "?" + params, "application/json")
    if "json" not in ctype:
        raise ValueError(f"Commons metadata not JSON: {ctype}")
    payload = json.loads(raw)
    obj = next(iter(payload["query"]["pages"].values()))
    if obj.get("title", "").replace("_", " ") != ("File:" + FILE).replace("_", " "):
        raise ValueError("Commons returned unexpected file title")
    info = obj["imageinfo"][0]
    if info.get("mime") != "application/pdf":
        raise ValueError("Commons source MIME not PDF")
    if info.get("pagecount") not in (None, 49):
        raise ValueError("Commons source page count drift")
    if not info.get("sha1") or not info.get("size"):
        raise ValueError("Commons source lacks declared hash or size")
    thumb_url = info.get("thumburl", "")
    parsed = urllib.parse.urlparse(thumb_url)
    if parsed.scheme != "https" or parsed.netloc not in {"thumb.wikimedia.org", "upload.wikimedia.org"}:
        raise ValueError("Commons API thumbnail URL not an approved Wikimedia host")
    if f"page{page}-" not in urllib.parse.unquote(parsed.path):
        raise ValueError(f"Expected PDF thumbnail page index absent: {page}")
    return info

def main():
    manifest = {
        "task": "SA-7D-B1", "mode": "OFFICIAL_PDF_DERIVED_THUMBNAIL_ONLY",
        "sourceId": "NLC892-411999029701-67238",
        "sourceCatalog": CATALOG, "expectedPdfPageCount": 49,
        "pagesAttempted": list(PAGES), "pagesAcquired": [],
        "originalPdfDownloaded": False, "originalPdfHashVerified": False,
        "primaryPageVisuallyReviewed": False, "annualDirectWitnessVerified": False,
        "bridgeReentryReady": False, "production": "HOLD",
    }
    try:
        sha1 = None
        size = None
        for page in PAGES:
            info = image_info(page)
            if sha1 and (sha1 != info["sha1"] or size != info["size"]):
                raise ValueError("Commons file identity differs between page lookups")
            sha1, size = info["sha1"], info["size"]
            manifest["commonsDeclaredOriginalSha1"] = sha1
            manifest["commonsDeclaredOriginalBytes"] = size
            url = info["thumburl"]
            raw, ctype = get(url, "image/jpeg")
            if not raw.startswith(bytes.fromhex("ffd8")) or not raw.endswith(bytes.fromhex("ffd9")):
                raise ValueError(f"Page {page} response is not a complete JPEG")
            img = Image.open(io.BytesIO(raw))
            img.verify()
            filename = f"commons_volume6_lower_pdf_page_{page:02}.jpg"
            (OUT / filename).write_bytes(raw)
            item = {
                "oneBasedPdfPage": page,
                "sourcePdfPageIndexZeroBased": page - 1,
                "file": filename,
                "thumbUrl": url, "bytes": len(raw),
                "sha256": hashlib.sha256(raw).hexdigest(),
                "mimeFromHttp": ctype,
                "thumbwidth": info.get("thumbwidth"),
                "thumbheight": info.get("thumbheight"),
                "imageDeclaredOriginalSha1": sha1,
            }
            manifest["pagesAcquired"].append(item)
            print(f"THUMB_ACQUIRED page={page} bytes={len(raw)} sha256={item['sha256']}", flush=True)
            # Print only the first probe thumbnail for research-side visual inspection.
            if page == PAGES[0]:
                encoded = base64.b64encode(raw).decode("ascii")
                print(f"PREVIEW_BASE64_PAGE_{page}_START", flush=True)
                for i in range(0, len(encoded), 8000):
                    print(encoded[i:i+8000], flush=True)
                print(f"PREVIEW_BASE64_PAGE_{page}_END", flush=True)
        manifest["status"] = "OFFICIAL_DERIVATIVE_IMAGES_ACQUIRED_UNREVIEWED"
        print("THUMB_PROBE_SUCCESS; evidence remains PREVIEW_ONLY_HOLD", flush=True)
    except Exception as exc:
        manifest["status"] = "PREVIEW_FAILED_HOLD"
        manifest["error"] = f"{type(exc).__name__}: {exc}"
        print(f"THUMB_PROBE_FAILED {manifest['error']}", flush=True)
        raise
    finally:
        (OUT / "page-previews-manifest.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

if __name__ == "__main__":
    main()
