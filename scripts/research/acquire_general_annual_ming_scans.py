#!/usr/bin/env python3
"""One-shot, no-interpretation archival scan acquisition for Saju Issue #2395."""
import base64
import hashlib
import io
import json
import os
from pathlib import Path
import sys
import time
import urllib.error
import urllib.request

OUTPUT = Path(".scan-evidence")
OUTPUT.mkdir(exist_ok=True)
SCANS = [
    {
        "id": "NLC892-411999029701-67186",
        "volume": "卷之二上",
        "pages": 38,
        "name": "NLC892-411999029701-67186_三命通會_第3冊.pdf",
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/8d/NLC892-411999029701-67186_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%E7%AC%AC3%E5%86%8A.pdf",
    },
    {
        "id": "NLC892-411999029701-67187",
        "volume": "卷之二下",
        "pages": 55,
        "name": "NLC892-411999029701-67187_三命通會_第4冊.pdf",
        "url": "https://upload.wikimedia.org/wikipedia/commons/9/95/NLC892-411999029701-67187_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%E7%AC%AC4%E5%86%8A.pdf",
        "commons_sha1": "790baba8f4b7abc2ab706db2ae8eff4651c270ff",
    },
]


def fetch_pdf(item: dict) -> bytes:
    last_error = None
    for attempt in range(3):
        request = urllib.request.Request(item["url"], headers={
            "User-Agent": "SajuResearchScanVerifier/1.0 (public-domain primary research; GitHub Actions)",
            "Accept": "application/pdf",
        })
        try:
            with urllib.request.urlopen(request, timeout=55) as response:
                if int(response.headers.get("Content-Length", "0")) > 55_000_000:
                    raise ValueError("unexpected scan size")
                data = response.read(55_000_001)
            if len(data) > 55_000_000 or not data.startswith(b"%PDF"):
                raise ValueError("invalid PDF content")
            return data
        except (OSError, ValueError, urllib.error.HTTPError) as exc:
            last_error = str(exc)
            print(f"RETRY {item['id']} {attempt+1}/3: {last_error}", flush=True)
            if attempt < 2:
                time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"original download unavailable: {last_error}")


def make_contact_sheets(item: dict, raw: bytes, result: dict) -> None:
    import fitz
    from PIL import Image, ImageDraw

    doc = fitz.open(stream=raw, filetype="pdf")
    result["pdf_page_count"] = len(doc)
    if len(doc) != item["pages"]:
        raise ValueError(f"PDF page count mismatch for {item['id']}: {len(doc)}")
    sheets = []
    per_sheet = 6
    for first in range(0, len(doc), per_sheet):
        canvas = Image.new("RGB", (1850, 2240), "white")
        draw = ImageDraw.Draw(canvas)
        for j in range(min(per_sheet, len(doc) - first)):
            index = first + j
            page = doc[index]
            pix = page.get_pixmap(matrix=fitz.Matrix(0.8, 0.8), alpha=False)
            image = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
            image.thumbnail((600, 1030))
            x = (j % 3) * 615 + 5
            y = (j // 3) * 1100 + 35
            draw.text((x + 5, y - 22), f"{item['id']} PDF page {index+1}/{len(doc)} (0-based={index})", fill="black")
            canvas.paste(image, (x + max(0, (600-image.width)//2), y))
        output = OUTPUT / f"{item['id']}_contact_{first//per_sheet+1:02}.jpg"
        canvas.save(output, "JPEG", quality=73, optimize=True)
        sheets.append(str(output))
        # GitHub logs preserve line-wrapped base64 for image verification by a remote reviewer.
        encoded = base64.b64encode(output.read_bytes()).decode("ascii")
        tag = output.stem
        print(f"SCAN_IMAGE_BEGIN {tag} {len(encoded)}", flush=True)
        for start in range(0, len(encoded), 3900):
            print(f"SCAN_IMAGE_PART {tag} {start//3900} {encoded[start:start+3900]}", flush=True)
        print(f"SCAN_IMAGE_END {tag}", flush=True)
    result["contact_sheet_paths"] = sheets
    doc.close()


def main() -> None:
    manifest = {
        "task": "SA-7D-A2 / Issue #2395",
        "scanPageVerified": False,
        "exactLunTaisuiPageBound": False,
        "atomicStemRelationSourceQualified": False,
        "bridgeReentryReady": False,
        "production": "HOLD",
        "sources": [],
    }
    failed = False
    for item in SCANS:
        result = {k: v for k, v in item.items() if k != "name"}
        manifest["sources"].append(result)
        try:
            data = fetch_pdf(item)
            result["downloaded_bytes"] = len(data)
            result["sha1"] = hashlib.sha1(data).hexdigest()
            result["sha256"] = hashlib.sha256(data).hexdigest()
            if item.get("commons_sha1") and result["sha1"] != item["commons_sha1"]:
                raise ValueError(f"commons SHA-1 mismatch: {result['sha1']}")
            make_contact_sheets(item, data, result)
            print(f"SCAN_ACQUIRED {item['id']} {result['sha1']} {result['sha256']}", flush=True)
        except Exception as exc:
            failed = True
            result["error"] = str(exc)
            print(f"SCAN_FAILED {item['id']}: {exc}", flush=True)
        (OUTPUT / "manifest.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
