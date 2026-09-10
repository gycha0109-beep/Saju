#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path('acquisition-lee-changim-2016')
PDF = ROOT / 'lee-changim-2016.pdf'
TEXT = ROOT / 'lee-changim-2016.txt'
OUT = ROOT / 'body-review.json'
TERMS = [
    '배우자', '남편', '아내', '부부', '궁합', '궁위', '宮位', '일간', '日干', '일지', '日支',
    '재성', '財星', '관성', '官星', '정재', '正財', '정관', '正官', '육신', '六神', '용신', '用神',
]

report: dict[str, object] = {
    'bodyObserved': False,
    'pdfSha256': None,
    'pdfBytes': 0,
    'pdfPages': 0,
    'encrypted': None,
    'textBytes': 0,
    'termCounts': {},
    'contexts': [],
    'directBodySemanticReviewPerformed': False,
    'bodyLevelAdmissionDecisionMade': False,
    'semanticDisposition': 'NO_DIRECT_BODY_ACQUIRED_NO_BODY_LEVEL_DECISION',
}

if PDF.exists():
    raw = PDF.read_bytes()
    assert raw[:5] == b'%PDF-', 'candidate file is not a PDF'
    reader = PdfReader(str(PDF))
    pages: list[str] = []
    contexts: list[dict[str, object]] = []
    counts = {term: 0 for term in TERMS}
    for page_no, page in enumerate(reader.pages, 1):
        text = page.extract_text() or ''
        pages.append(f'\n\n===== PHYSICAL PDF PAGE {page_no} =====\n{text}')
        normalized = re.sub(r'\s+', ' ', text)
        for term in TERMS:
            occurrences = list(re.finditer(re.escape(term), normalized, re.I))
            counts[term] += len(occurrences)
            for match in occurrences[:3]:
                start = max(0, match.start() - 240)
                end = min(len(normalized), match.end() + 320)
                contexts.append({'physicalPage': page_no, 'term': term, 'context': normalized[start:end]})
    joined = ''.join(pages)
    TEXT.write_text(joined, encoding='utf-8')
    report.update({
        'bodyObserved': True,
        'pdfSha256': hashlib.sha256(raw).hexdigest(),
        'pdfBytes': len(raw),
        'pdfPages': len(reader.pages),
        'encrypted': bool(reader.is_encrypted),
        'textBytes': len(joined.encode('utf-8')),
        'termCounts': counts,
        'contexts': contexts[:400],
        'semanticDisposition': 'FULL_BODY_ACQUIRED_REQUIRES_RENDER_FIRST_DIRECT_REVIEW',
    })

OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(OUT.read_text(encoding='utf-8'))
