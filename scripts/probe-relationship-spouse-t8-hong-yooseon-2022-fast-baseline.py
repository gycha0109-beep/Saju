#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import io
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

from pypdf import PdfReader

OUT = Path('acquisition-hong-yooseon-2022')
OUT.mkdir(exist_ok=True)

AUTHOR = '홍유선'
TITLE = '이데올로기적 접근을 통한 육친 간 상극관계 해석: 부부, 부자, 고부를 중심으로'
ARTI = 'ART003089059'
RISS_ID = 'A108419413'
DOI = '10.54385/cbt.2022.2.2.75'
KCI_DETAIL = f'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'
KCI_ORIGINAL = f'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}'
# This exact target preview route was site-authored and captured by earlier bounded
# acquisition artifacts for ART003089059. It is not an inferred file identifier.
KCI_PREVIEW = f'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/artiPreView.kci?sereArticleSearchBean.artiId={ARTI}&v=2019'
RISS_LINK = f'https://www.riss.kr/link?id={RISS_ID}'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/19.0; public-resource-verification)'
MAX = 45 * 1024 * 1024


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def fetch(opener, label: str, url: str, referer: str | None = None) -> tuple[dict, bytes, str]:
    host = (urlparse(url).hostname or '').lower()
    assert host.endswith('kci.go.kr') or host.endswith('riss.kr')
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.6',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    meta = {
        'label': label,
        'requestedUrl': url,
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'bytes': 0,
        'sha256': None,
        'error': None,
    }
    try:
        with opener.open(Request(url, headers=headers), timeout=40) as resp:
            body = resp.read(MAX)
            meta.update({
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
            })
            text = '' if body.startswith(b'%PDF-') else decode(body)
            return meta, body, text
    except Exception as exc:
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b'', ''


def pdf_info(body: bytes, url: str) -> dict:
    rec = {
        'sourceUrl': url,
        'sha256': hashlib.sha256(body).hexdigest(),
        'bytes': len(body),
        'pages': None,
        'encrypted': None,
        'error': None,
    }
    try:
        reader = PdfReader(io.BytesIO(body))
        rec['pages'] = len(reader.pages)
        rec['encrypted'] = bool(reader.is_encrypted)
    except Exception as exc:
        rec['error'] = f'{type(exc).__name__}: {exc}'
    return rec


def boundary(text: str) -> dict:
    return {
        'targetIdentity': bool(text and AUTHOR in text and ('이데올로기적 접근' in text or ARTI in text or RISS_ID in text)),
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'purchase': bool(re.search(r'유료.?원문|구매|결제|이용권|purchase|paywall', text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|소속기관|institution.?auth', text, re.I)),
    }


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'fast reproduction of already-observed exact Hong Yooseon target routes; no discovery guessing',
        'candidate': {
            'author': AUTHOR,
            'year': 2022,
            'title': TITLE,
            'kciArticleId': ARTI,
            'rissId': RISS_ID,
            'doi': DOI,
            'publication': '문화·경영·기술 2(2)',
            'printedPages': '75-89',
            'expectedArticlePages': 15,
        },
        'seedUrls': [KCI_DETAIL, KCI_ORIGINAL, KCI_PREVIEW, RISS_LINK],
        'routeProvenance': {
            'kciPreview': 'previous bounded ART003089059 artifact site-authored route',
            'riss': 'public RISS A108419413 relation',
        },
        'guessedOpaqueIdentifierCount': 0,
        'probes': [],
        'siteAuthoredCandidateUrls': [],
        'pdfs': [],
        'fullLengthPdfAcquired': False,
        'semanticDisposition': 'ACCESS_OR_DISCOVERY_BOUNDARY_ONLY_NO_BODY_VERDICT',
    }

    for label, url, referer in (
        ('kci-detail', KCI_DETAIL, None),
        ('kci-original-view', KCI_ORIGINAL, KCI_DETAIL),
        ('kci-preview', KCI_PREVIEW, KCI_DETAIL),
        ('riss-link', RISS_LINK, KCI_DETAIL),
    ):
        meta, body, text = fetch(opener, label, url, referer)
        rec = dict(meta)
        rec['accessBoundary'] = boundary(text) if text else None
        rec['directPdf'] = bool(body.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower())
        if rec['directPdf']:
            info = pdf_info(body, meta.get('finalUrl') or url)
            report['pdfs'].append(info)
            rec['pdf'] = info
        elif text and (AUTHOR in text or ARTI in text or RISS_ID in text):
            (OUT / f'{label}.txt').write_text(text[:2_000_000], encoding='utf-8')
        report['probes'].append(rec)

    report['fullLengthPdfAcquired'] = any(
        isinstance(p.get('pages'), int) and p['pages'] >= 12 and p.get('bytes', 0) > 100000
        for p in report['pdfs']
    )
    if report['fullLengthPdfAcquired']:
        report['semanticDisposition'] = 'DIRECT_BODY_ACQUIRED_REQUIRES_REVIEW'

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    summary = [
        f'candidate={report["candidate"]}',
        f'guessedOpaqueIdentifierCount={report["guessedOpaqueIdentifierCount"]}',
        f'pdfCount={len(report["pdfs"])}',
        f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}',
        f'semanticDisposition={report["semanticDisposition"]}',
    ]
    for p in report['probes']:
        summary.append(
            f'PROBE {p["label"]} status={p["status"]} type={p["contentType"]} bytes={p["bytes"]} '
            f'pdf={p["directPdf"]} boundary={p.get("accessBoundary")} final={p["finalUrl"]} err={p["error"]}'
        )
    for p in report['pdfs']:
        summary.append(f'PDF pages={p["pages"]} bytes={p["bytes"]} sha={p["sha256"]} source={p["sourceUrl"]}')
    (OUT / 'summary.txt').write_text('\n'.join(summary) + '\n', encoding='utf-8')
    print('\n'.join(summary))

    assert report['guessedOpaqueIdentifierCount'] == 0
    assert report['probes'][0]['status'] == 200
    assert report['probes'][3]['status'] == 200
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
