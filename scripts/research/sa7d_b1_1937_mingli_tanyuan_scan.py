#!/usr/bin/env python3
"""SA-7D-B1 one-off direct 1935 NLC print-page proof, no annual authority."""
import hashlib
import io
import json
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image

DIR = Path(".scan-1937-mingli")
DIR.mkdir(exist_ok=True)
FILE = "NLC416-07jh011647-5318_命理探源.pdf"
API = "https://commons.wikimedia.org/w/api.php"
PAGES = (60, 70, 80, 90, 100, 110, 120, 130, 140, 150)
HEADERS = {
    "User-Agent": "Saju-Research-SA7D-B1/1.0 (https://github.com/gycha0109-beep/Saju; printed-witness)",
    "Accept": "image/jpeg, application/json",
    "Referer": "https://commons.wikimedia.org/",
}
MAX_BYTES = 2_500_000

def request(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=35) as resp:
        if resp.status != 200:
            raise ValueError("Unexpected status")
        declared = resp.headers.get("Content-Length")
        if declared and int(declared) > MAX_BYTES:
            raise ValueError("Declared size exceeds image max")
        raw = resp.read(MAX_BYTES + 1)
        if len(raw) > MAX_BYTES or (declared and len(raw) != int(declared)):
            raise ValueError("Oversize or truncated image")
        return raw

def main():
    manifest = {
        "task": "SA-7D-B1", "kind": "REPUBLICAN_1937_AUTHORED_ANNUAL_METHOD_SEPARATE_WITNESS",
        "source": FILE, "expectedPages": 321, "records": [],
        "originalPdfDownloaded": False, "originalPdfHashVerified": False,
        "sourcePageVisuallyVerified": False, "annualSpecificL2": False,
        "bridgeReentryReady": False, "production": "HOLD"
    }
    try:
        for page in PAGES:
            query = urllib.parse.urlencode({
                "action": "query", "format": "json", "prop": "imageinfo",
                "iiprop": "url|sha1|size|mime",
                "titles": "File:" + FILE,
                "iiurlwidth": "1200", "iiurlparam": f"page{page}"
            })
            obj = json.loads(request(API + "?" + query))
            item = next(iter(obj["query"]["pages"].values()))
            if item.get("missing") is not None or "imageinfo" not in item:
                raise ValueError("Original archival PDF not listed")
            info = item["imageinfo"][0]
            if info.get("mime") != "application/pdf":
                raise ValueError("Expected NLC PDF source")
            url = info.get("thumburl", "")
            p = urllib.parse.urlparse(url)
            if p.scheme != "https" or p.hostname not in ("upload.wikimedia.org", "thumb.wikimedia.org") or f"page{page}-" not in urllib.parse.unquote(p.path):
                raise ValueError("Unexpected thumbnail host or page")
            jpg = request(url)
            if not (jpg.startswith(bytes.fromhex("ffd8")) and jpg.endswith(bytes.fromhex("ffd9"))):
                raise ValueError("Incomplete JPEG")
            image = Image.open(io.BytesIO(jpg))
            image.verify()
            name = f"qianli_1935_pdf_p{page:03}.jpg"
            (DIR / name).write_bytes(jpg)
            record = {
                "pdfPageOneBased": page, "pdfIndexZeroBased": page-1,
                "name": name, "bytes": len(jpg),
                "sha256": hashlib.sha256(jpg).hexdigest(),
                "commonsOriginalDeclaredSha1": info["sha1"],
                "commonsOriginalDeclaredBytes": info["size"],
                "url": url
            }
            manifest["records"].append(record)
            print("PRINT_PAGE_ACQUIRED page=" + str(page) + " sha256=" + record["sha256"], flush=True)
        manifest["status"] = "DERIVED_PAGES_ACQUIRED_UNREVIEWED"
    except Exception as e:
        manifest["status"] = "FAILED_HOLD"
        manifest["error"] = f"{type(e).__name__}: {e}"
        print("PRINT_SCAN_STOP " + manifest["error"], flush=True)
        raise
    finally:
        (DIR / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
if __name__ == "__main__":
    main()
