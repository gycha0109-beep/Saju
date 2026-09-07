#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from collections import deque
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition-kim-sanghan-2026')
PRIVATE = Path('acquisition-kim-sanghan-2026-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)

TITLE = '명리 고전 여명론(女命論)의 성별 비대칭과 역사적 맥락'
ARTI = 'ART003370620'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/3.0; public-resource-verification)'
MAX_TEXT = 5 * 1024 * 1024
MAX_PDF = 45 * 1024 * 1024
MAX_PROBES = 90

ALLOWED = (
    'kci.go.kr',
    'brhistory.re.kr',
    'riss.kr',
    'kiss.kstudy.com',
    'kyobobook.co.kr',
)

SEEDS = [
    f'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}',
    f'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id={ARTI}',
    'https://brhistory.re.kr/',
    'https://www.riss.kr/search/Search.do?isDetailSearch=N&searchGubun=true&viewYn=OP&query=' + quote(TITLE),
    'https://kiss.kstudy.com/Search/Result?query=' + quote(TITLE),
]

INTEREST = re.compile(
    r'김상한|Kim\s*,?\s*Sanghan|명리\s*고전\s*여명론|성별\s*비대칭|ART003370620|'
    r'631\s*[-~–]\s*665|pdf|download|full.?text|원문|본문|첨부|file|article',
    re.I,
)

class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[str] = []
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return any(host == d or host.endswith('.' + d) for d in ALLOWED)


def fetch(url: str) -> tuple[dict, bytes]:
    tracker = Redirects()
    opener = build_opener(tracker)
    meta = {
        'requestedUrl': url,
        'redirectChain': [],
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'contentLengthHeader': None,
        'bodyBytes': 0,
        'sha256': None,
        'error': None,
    }
    try:
        req = Request(url, headers={
            'User-Agent': UA,
            'Accept': 'text/html,application/xhtml+xml,application/pdf,application/json,application/xml,*/*;q=0.5',
        })
        with opener.open(req, timeout=30) as resp:
            ctype = resp.headers.get('Content-Type') or ''
            limit = MAX_PDF if 'pdf' in ctype.lower() else MAX_TEXT
            body = resp.read(limit + 1)
            if len(body) > limit:
                body = body[:limit]
            meta.update({
                'redirectChain': tracker.chain,
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'contentType': ctype,
                'contentLengthHeader': resp.headers.get('Content-Length'),
                'bodyBytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
            })
            return meta, body
    except Exception as exc:
        meta['redirectChain'] = tracker.chain
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b''


def is_pdf(meta: dict, body: bytes) -> bool:
    return body.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower()


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def extract_links(src: str, base: str) -> set[str]:
    vals: set[str] = set()
    for raw in re.findall(r'https?://[^\s"\'<>]+', src):
        vals.add(raw.replace('&amp;', '&').rstrip(').,;'))
    for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', src, flags=re.I):
        vals.add(urljoin(base, raw.replace('&amp;', '&')))
    for raw in re.findall(r'["\']([^"\']*(?:pdf|download|fulltext|original|file|article|view)[^"\']*)["\']', src, flags=re.I):
        if raw.startswith('/') or raw.startswith('http'):
            vals.add(urljoin(base, raw.replace('&amp;', '&')))
    return {u for u in vals if allowed(u)}


def score(url: str, src: str) -> int:
    s = 0
    hay = (url + '\n' + src[:500000]).lower()
    for token, weight in [
        ('art003370620', 20), ('김상한', 20), ('명리 고전 여명론', 20),
        ('성별 비대칭', 12), ('2026', 2), ('pdf', 5), ('download', 4),
        ('fulltext', 4), ('원문', 4), ('631', 1), ('665', 1),
    ]:
        if token.lower() in hay:
            s += weight
    return s


def main() -> int:
    queue = deque(SEEDS)
    seen: set[str] = set()
    report = {
        'purpose': 'public scholarly/normative fulltext acquisition only; no authentication/paywall bypass',
        'candidate': {
            'author': '김상한',
            'year': 2026,
            'title': TITLE,
            'kciArticleId': ARTI,
            'journal': '역사와 융합 10(4)',
            'pages': '631-665',
        },
        'directPdfAcquired': False,
        'pdfs': [],
        'probes': [],
    }

    while queue and len(seen) < MAX_PROBES:
        url = queue.popleft()
        if url in seen or not allowed(url):
            continue
        seen.add(url)
        meta, body = fetch(url)
        entry = dict(meta)
        entry['relevanceScore'] = 0
        entry['interestingLines'] = []

        if is_pdf(meta, body):
            name = f'candidate-{len(report["pdfs"])+1:02d}.pdf'
            path = PRIVATE / name
            path.write_bytes(body)
            pdfrec = {
                'sourceUrl': meta.get('finalUrl') or url,
                'sha256': hashlib.sha256(body).hexdigest(),
                'bytes': len(body),
                'savedAs': name,
            }
            report['pdfs'].append(pdfrec)
            report['directPdfAcquired'] = True
            entry['directPdf'] = True
            report['probes'].append(entry)
            continue

        entry['directPdf'] = False
        if body:
            src = decode(body)
            entry['relevanceScore'] = score(meta.get('finalUrl') or url, src)
            lines = []
            for n, line in enumerate(src.splitlines(), 1):
                if INTEREST.search(line):
                    lines.append({'line': n, 'text': line[:2500]})
                    if len(lines) >= 120:
                        break
            entry['interestingLines'] = lines
            base = meta.get('finalUrl') or url
            links = extract_links(src, base)
            ranked = sorted(links, key=lambda u: score(u, ''), reverse=True)
            for link in ranked[:45]:
                if link not in seen:
                    # Follow only URLs plausibly tied to the article, journal, search result, or a file route.
                    low = link.lower()
                    if any(k in low for k in (
                        '370620', 'article', 'arti', 'detail', 'view', 'search', 'journal',
                        'sere', 'paper', 'pdf', 'download', 'fulltext', 'original', 'file',
                    )) or 'brhistory.re.kr' in low:
                        queue.append(link)
            if entry['relevanceScore'] >= 8 or lines:
                safe = re.sub(r'[^a-zA-Z0-9._-]+', '-', urlparse(base).netloc + urlparse(base).path)[-150:]
                (OUT / f'{len(report["probes"]):03d}-{safe}.txt').write_text(src[:1000000], encoding='utf-8')

        report['probes'].append(entry)

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    summary = [
        f'directPdfAcquired={report["directPdfAcquired"]}',
        f'probeCount={len(report["probes"])}',
        f'pdfCount={len(report["pdfs"])}',
    ]
    for pdf in report['pdfs']:
        summary.append(f'PDF {pdf["sha256"]} bytes={pdf["bytes"]} url={pdf["sourceUrl"]}')
    for p in sorted(report['probes'], key=lambda x: x.get('relevanceScore', 0), reverse=True)[:20]:
        summary.append(
            f'PROBE score={p.get("relevanceScore")} status={p.get("status")} type={p.get("contentType")} '
            f'final={p.get("finalUrl")} err={p.get("error")}'
        )
    (OUT / 'summary.txt').write_text('\n'.join(summary) + '\n', encoding='utf-8')
    print('\n'.join(summary))
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
