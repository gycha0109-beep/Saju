#!/usr/bin/env python3
"""Source-bounded NLC Ming printed Yuanhai Ziping separate-witness page image locator.
Print scan only, no PDF-original verified claim, no Annual promotion or inferred mapping.
"""
import hashlib
import io
import json
import urllib.parse
import urllib.request
import urllib.error
from pathlib import Path
from PIL import Image

OUTPUT = Path(".scan-evidence-yuanhai")
OUTPUT.mkdir(exist_ok=True)
API = "https://commons.wikimedia.org/w/api.php"
AGENT = "MyeongHa-Saju-Research/2.0 (https://github.com/gycha0109-beep/Saju)"
BOOKS = (
    ("2", "210288", 30, (16,)),
)
MAX_BYTES = 2500000

def get(url, accept):
    request = urllib.request.Request(url, headers={
        "User-Agent": AGENT, "Accept": accept,
        "Referer": "https://commons.wikimedia.org/",
    })
    try:
        with urllib.request.urlopen(request, timeout=40) as response:
            ctype = response.headers.get("Content-Type", "")
            if response.status != 200:
                raise RuntimeError("Unexpected HTTP status")
            size = response.headers.get("Content-Length")
            if size is not None and int(size) > MAX_BYTES:
                raise ValueError("Declared Content-Length too large")
            payload = response.read(MAX_BYTES + 1)
            if len(payload) > MAX_BYTES:
                raise ValueError("Payload too large")
            if size is not None and len(payload) != int(size):
                raise ValueError("Content-Length mismatch")
            return payload, ctype
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"HTTP_{exc.code} retry-after={exc.headers.get('Retry-After','unknown')}") from exc

def one_page(volume, suffix, page):
    original = f"NLC892-2642-{suffix}_刻京臺增補淵海子平大全_第{volume}冊.pdf"
    query = urllib.parse.urlencode({
        "action": "query", "format": "json", "prop": "imageinfo",
        "iiprop": "sha1|size|url|mime",
        "iiurlwidth": "960",
        "iiurlparam": f"page{page}",
        "titles": "File:" + original,
    })
    raw, typ = get(API + "?" + query, "application/json")
    if "json" not in typ:
        raise ValueError(f"unexpected metadata content type: {typ}")
    obj = json.loads(raw)
    node = next(iter(obj["query"]["pages"].values()))
    if node.get("missing") or node.get("title", "").replace("_", " ") != ("File:" + original).replace("_", " "):
        raise ValueError("Wrong or missing original PDF object")
    info = node["imageinfo"][0]
    if info.get("mime") != "application/pdf" or not info.get("sha1") or not info.get("size"):
        raise ValueError("Original Commons metadata incomplete")
    link = info.get("thumburl", "")
    url = urllib.parse.urlparse(link)
    if url.scheme != "https" or url.hostname not in ("thumb.wikimedia.org", "upload.wikimedia.org"):
        raise ValueError("Image link host mismatch")
    if f"page{page}-" not in urllib.parse.unquote(url.path):
        raise ValueError("Image link source page mismatch")
    img_bytes, ctype = get(link, "image/jpeg")
    if not img_bytes.startswith(bytes.fromhex("ffd8")) or not img_bytes.endswith(bytes.fromhex("ffd9")):
        raise ValueError("Not a whole JPEG")
    img = Image.open(io.BytesIO(img_bytes))
    img.verify()
    filename = f"vol{volume}_p{page:02}.jpg"
    (OUTPUT / filename).write_bytes(img_bytes)
    return {
        "catalog": "https://commons.wikimedia.org/wiki/File:" + original,
        "volume": volume, "oneBasedPdfPage": page,
        "file": filename, "sha256": hashlib.sha256(img_bytes).hexdigest(),
        "bytes": len(img_bytes), "commonsDeclaredSha1": info["sha1"],
        "commonsDeclaredOriginalBytes": info["size"], "thumbnailUrl": link,
        "httpContentType": ctype,
    }

def main():
    manifest = {
        "task": "SA-7D-B1", "scope": "OTHER_EDITED_MING_PRINT_YUANHAI_PAGE_LOCATOR_NOT_ORIGINAL_PDF",
        "originalPdfDownloaded": False, "originalPdfSha1LocallyVerified": False,
        "sourceDirectlyRead": False, "annualL2": False, "production": "HOLD",
        "bridgeReentryReady": False, "pages": [], "status": "NOT_STARTED",
    }
    try:
        for volume, suffix, declared_pages, pages in BOOKS:
            for page in pages:
                if not (1 <= page <= declared_pages):
                    raise ValueError("Bad declared page boundary")
                record = one_page(volume, suffix, page)
                existing = [x for x in manifest["pages"] if x["volume"] == volume]
                if existing and (existing[0]["commonsDeclaredSha1"] != record["commonsDeclaredSha1"] or existing[0]["commonsDeclaredOriginalBytes"] != record["commonsDeclaredOriginalBytes"]):
                    raise ValueError("Commons source object inconsistent")
                manifest["pages"].append(record)
                print(f"PDF_PAGE_ACQUIRED volume={volume} page={page} sha256={record['sha256']}", flush=True)
        manifest["status"] = "SCOUT_PAGES_ACQUIRED_UNREVIEWED"
    except Exception as exc:
        manifest["status"] = "FAILED_PARTIAL_HOLD"
        manifest["error"] = f"{type(exc).__name__}: {exc}"
        print(f"PDF_SCOUT_STOP {manifest['error']}", flush=True)
        raise
    finally:
        (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

if __name__ == "__main__":
    main()
