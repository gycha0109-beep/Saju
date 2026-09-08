#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-eum-jonghee-2019')
OUT.mkdir(exist_ok=True)

AUTHOR = '음종희'
TITLE_SIGNAL = '四柱命理 宮星'
KKNOWLEDGE = 'https://k-knowledge.kr/srch/read.jsp?id=281111307'
EXPECTED_UNICNO = '142462'
EXPECTED_KEY_ID = 'CAT-000147672'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/16.1; public-resource-verification)'
MAX = 12 * 1024 * 1024

ALLOWED = ('k-knowledge.kr', 'nld.go.kr')
ROUTE_HINT = re.compile(r'원문|original|download|viewer|view|file|pdf|fulltext|content|source|link', re.I)


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return any(host == s or host.endswith('.' + s) for s in ALLOWED)


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 9000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def boundary(text: str) -> dict[str, bool]:
    return {
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|소속기관|institution.?auth', text, re.I)),
        'purchase': bool(re.search(r'구매|결제|유료|purchase|payment|paywall', text, re.I)),
        'drm': bool(re.search(r'\bDRM\b|전용.?뷰어|ezPDF|Fasoo', text, re.I)),
    }


def fetch(opener, url: str, referer: str | None = None) -> tuple[dict, bytes, str]:
    assert allowed(url), f'outside bounded official-source allowlist: {url}'
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/json,application/pdf,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
    }
    if referer:
        headers['Referer'] = referer
    meta = {
        'requestedUrl': url,
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'bytes': 0,
        'sha256': None,
        'startsPdf': False,
        'error': None,
    }
    try:
        with opener.open(Request(url, headers=headers), timeout=35) as resp:
            body = resp.read(MAX)
            text = '' if body.startswith(b'%PDF-') else decode(body)
            meta.update({
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'startsPdf': body.startswith(b'%PDF-'),
                'accessBoundary': boundary(text) if text else None,
            })
            return meta, body, text
    except Exception as exc:
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b'', ''


def source_urls(text: str, base: str) -> list[str]:
    vals: list[str] = []
    decoded = html.unescape(text)
    for raw in re.findall(r'https?://[^\s\"\'<>]+', decoded):
        url = raw.rstrip(').,;')
        if allowed(url) and url not in vals:
            vals.append(url)
    for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', decoded, re.I):
        url = urljoin(base, raw)
        if allowed(url) and url not in vals:
            vals.append(url)
    for raw in re.findall(r'''["']([^"'\r\n]{1,1200})["']''', decoded):
        if not (raw.startswith('/') or raw.startswith('http')):
            continue
        url = urljoin(base, raw)
        if allowed(url) and url not in vals:
            vals.append(url)
    return vals


def interesting(text: str, base: str) -> list[dict]:
    rows = []
    decoded = html.unescape(text)
    for n, line in enumerate(decoded.splitlines(), start=1):
        if ROUTE_HINT.search(line) or AUTHOR in line or TITLE_SIGNAL in line or EXPECTED_KEY_ID in line or EXPECTED_UNICNO in line:
            urls = []
            for raw in re.findall(r'https?://[^\s\"\'<>]+', line):
                url = raw.rstrip(').,;')
                if allowed(url) and url not in urls:
                    urls.append(url)
            for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', line, re.I):
                url = urljoin(base, raw)
                if allowed(url) and url not in urls:
                    urls.append(url)
            rows.append({'line': n, 'text': compact(line, 3200), 'urls': urls})
    return rows[:1000]


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'follow only the exact National Library of Korea source relation authored on the target K-knowledge page; no auth or access-control bypass',
        'target': {'author': AUTHOR, 'kKnowledgeId': '281111307'},
        'kKnowledge': None,
        'sourceRelationObserved': False,
        'sourceUrl': None,
        'nldDetail': None,
        'nldInterestingLines': [],
        'nldCandidateUrls': [],
    }

    km, _kb, kt = fetch(opener, KKNOWLEDGE)
    report['kKnowledge'] = km
    assert AUTHOR in kt and TITLE_SIGNAL in kt, 'K-knowledge target identity mismatch'

    candidates = []
    for url in source_urls(kt, km.get('finalUrl') or KKNOWLEDGE):
        if 'nld.go.kr/home/dataDetailSojang.do' not in url:
            continue
        if f'unicno={EXPECTED_UNICNO}' in url and f'key_id={EXPECTED_KEY_ID}' in url:
            candidates.append(url)
    assert candidates, 'exact NLD source relation disappeared from target K-knowledge page'
    source_url = candidates[0]
    report['sourceRelationObserved'] = True
    report['sourceUrl'] = source_url

    nm, nb, nt = fetch(opener, source_url, KKNOWLEDGE)
    report['nldDetail'] = nm
    if nt:
        # Do not require identical typography, but require target identity or the exact catalog key.
        assert AUTHOR in nt or TITLE_SIGNAL in nt or EXPECTED_KEY_ID in nt, 'NLD source detail identity mismatch'
        report['nldInterestingLines'] = interesting(nt, nm.get('finalUrl') or source_url)
        urls = []
        for row in report['nldInterestingLines']:
            for url in row['urls']:
                if url not in urls:
                    urls.append(url)
        # Preserve only observed URLs here. No candidate is executed in this probe.
        report['nldCandidateUrls'] = urls[:200]
        (OUT / 'nld-detail.txt').write_text(nt[:2_000_000], encoding='utf-8')

    path = OUT / 'nld-source.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({
        'sourceRelationObserved': report['sourceRelationObserved'],
        'sourceUrl': report['sourceUrl'],
        'nldDetail': report['nldDetail'],
        'nldCandidateUrls': report['nldCandidateUrls'],
        'interestingLineCount': len(report['nldInterestingLines']),
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
