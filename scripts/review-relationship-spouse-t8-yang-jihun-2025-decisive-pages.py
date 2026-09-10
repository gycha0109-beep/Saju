#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import os
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path('acquisition-yang-jihun-2025')
PDF = ROOT / 'yang-jihun-2025.pdf'
OUT = ROOT / 'decisive-pages.json'
EXPECTED_SHA256 = '1239c35a62f1e98324d619c0f1703f7b577b611b1511f988677db41ddd754091'
EXPECTED_PAGES = 83
PHYSICAL_PAGES = (25, 59, 76, 77)


def normalize_layout(text: str) -> str:
    lines = [re.sub(r'[ \t]+', ' ', line).strip() for line in text.splitlines()]
    return '\n'.join(line for line in lines if line).strip()


def annotation_escape(text: str) -> str:
    return text.replace('%', '%25').replace('\r', '%0D').replace('\n', '%0A')


if not PDF.exists():
    raise SystemExit('expected acquired PDF is missing')

body = PDF.read_bytes()
sha256 = hashlib.sha256(body).hexdigest()
assert sha256 == EXPECTED_SHA256, (sha256, EXPECTED_SHA256)

reader = PdfReader(str(PDF))
assert len(reader.pages) == EXPECTED_PAGES, len(reader.pages)
assert not reader.is_encrypted

pages: list[dict[str, object]] = []
for physical_page in PHYSICAL_PAGES:
    page = reader.pages[physical_page - 1]
    try:
        extracted = page.extract_text(extraction_mode='layout') or ''
    except TypeError:
        extracted = page.extract_text() or ''
    layout = normalize_layout(extracted)
    record = {
        'physicalPdfPage': physical_page,
        'textChars': len(layout),
        'layoutText': layout,
    }
    pages.append(record)
    bounded = layout[:12000]
    print(f'===== PHYSICAL_PDF_PAGE_{physical_page}_LAYOUT =====')
    print(bounded)
    print(f'::notice title=Yang Jihun 2025 physical PDF page {physical_page}::{annotation_escape(bounded)}')

report = {
    'pdfSha256': sha256,
    'pdfBytes': len(body),
    'pdfPages': len(reader.pages),
    'encrypted': bool(reader.is_encrypted),
    'reviewKind': 'decisive-page-layout-extraction-for-direct-semantic-review',
    'pages': pages,
}
OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({k: report[k] for k in ('pdfSha256', 'pdfBytes', 'pdfPages', 'encrypted', 'reviewKind')}, ensure_ascii=False, indent=2))
