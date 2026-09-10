#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path('acquisition-choi-eunkyung-2013')
PDF = ROOT / 'choi-eunkyung-2013.pdf'
OUT = ROOT / 'body-review.json'
TERMS = [
    '배우자', '남편', '아내', '부부', '여명', '남명', '여성', '남성',
    '정관', '편관', '관성', '정재', '편재', '재성', '상관', '육친',
    '男女', '女命', '男命', '夫', '妻', '正官', '偏官', '正財', '偏財', '傷官',
]


def normalize_layout(text: str) -> str:
    lines = [re.sub(r'[ \t]+', ' ', line).strip() for line in text.splitlines()]
    return '\n'.join(line for line in lines if line).strip()


def bounded_context(text: str, start: int, end: int, before: int = 450, after: int = 1000) -> str:
    return re.sub(r'\s+', ' ', text[max(0, start - before): min(len(text), end + after)]).strip()


if not PDF.exists():
    report = {
        'bodyObserved': False,
        'semanticDisposition': 'NO_DIRECT_BODY_ACQUIRED_NO_BODY_LEVEL_DECISION',
        'pdfSha256': None,
        'pdfBytes': 0,
        'pdfPages': 0,
        'encrypted': None,
        'textChars': 0,
        'termHits': {},
        'candidatePages': [],
    }
    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(0)

body = PDF.read_bytes()
reader = PdfReader(str(PDF))
assert not reader.is_encrypted, 'encrypted PDF is not eligible for this bounded direct-body review'
page_texts: list[str] = []
for index, page in enumerate(reader.pages, 1):
    try:
        raw = page.extract_text(extraction_mode='layout') or ''
    except TypeError:
        raw = page.extract_text() or ''
    page_texts.append(normalize_layout(raw))

full = ''.join(f'\n===== PHYSICAL_PDF_PAGE_{i} =====\n{text}' for i, text in enumerate(page_texts, 1))
(ROOT / 'choi-eunkyung-2013.txt').write_text(full, encoding='utf-8')
term_hits: dict[str, list[dict[str, object]]] = {}
candidate_pages: set[int] = set()
for term in TERMS:
    hits: list[dict[str, object]] = []
    for page_no, text in enumerate(page_texts, 1):
        for match in re.finditer(re.escape(term), text, re.I):
            hits.append({'physicalPdfPage': page_no, 'context': bounded_context(text, match.start(), match.end())})
            candidate_pages.add(page_no)
            if len(hits) >= 8:
                break
        if len(hits) >= 8:
            break
    term_hits[term] = hits

report = {
    'bodyObserved': True,
    'semanticDisposition': 'DIRECT_BODY_READY_FOR_MANUAL_SEMANTIC_REVIEW',
    'pdfSha256': hashlib.sha256(body).hexdigest(),
    'pdfBytes': len(body),
    'pdfPages': len(reader.pages),
    'encrypted': bool(reader.is_encrypted),
    'textChars': len(full),
    'termHits': term_hits,
    'candidatePages': sorted(candidate_pages),
}
OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({k: report[k] for k in ['bodyObserved', 'semanticDisposition', 'pdfSha256', 'pdfBytes', 'pdfPages', 'encrypted', 'textChars', 'candidatePages']}, ensure_ascii=False, indent=2))
for term, hits in term_hits.items():
    if not hits:
        continue
    print(f'\n### TERM {term}')
    for hit in hits:
        print(f"[physical {hit['physicalPdfPage']}] {hit['context']}")
