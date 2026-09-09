#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener, HTTPCookieProcessor

OUT = Path('acquisition-park-hyeyoung-2018')
DETAIL = OUT / 'riss-detail.html'
TITLE_SEARCH = OUT / 'riss-title-search.html'
UA = 'Mozilla/5.0 (compatible; Saju-Research-Acquisition/1.0; RISS-dispatch-source-inspector)'
HOSTS = {'www.riss.kr', 'riss.kr'}


def decode(b: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return b.decode(enc)
        except UnicodeDecodeError:
            pass
    return b.decode('utf-8', errors='replace')


def fetch(opener, url: str, referer: str):
    assert (urlparse(url).hostname or '').lower() in HOSTS
    headers = {'User-Agent': UA, 'Accept': 'application/javascript,text/javascript,text/html,*/*;q=0.5', 'Referer': referer}
    last = None
    for attempt in range(1, 3):
        meta = {'url': url, 'status': None, 'bytes': 0, 'sha256': None, 'attempt': attempt, 'error': None}
        try:
            with opener.open(Request(url, headers=headers), timeout=18) as r:
                body = r.read(4_000_000)
                meta.update(status=getattr(r, 'status', None), bytes=len(body), sha256=hashlib.sha256(body).hexdigest())
                return meta, decode(body)
        except Exception as exc:
            meta['error'] = f'{type(exc).__name__}: {exc}'
            last = meta
            time.sleep(attempt)
    return last, ''


def script_urls(text: str, base: str):
    out = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        url = urljoin(base, html.unescape(raw))
        if (urlparse(url).hostname or '').lower() in HOSTS and url not in out:
            out.append(url)
    return out


def compact(text: str, n: int = 12000):
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:n]


def evidence(source: str, text: str):
    if 'fulltextDownload' not in text and 'FullTextDownload.do' not in text:
        return None

    exact_patterns = {
        'functionDeclaration': r'function\s+fulltextDownload\s*\([^)]*\)\s*\{',
        'varFunction': r'(?:var|let|const)\s+fulltextDownload\s*=\s*function\s*\([^)]*\)\s*\{',
        'windowFunction': r'window\.fulltextDownload\s*=\s*function\s*\([^)]*\)\s*\{',
        'assignmentFunction': r'(?<![\w.])fulltextDownload\s*=\s*function\s*\([^)]*\)\s*\{',
    }
    globals_found = []
    for kind, pat in exact_patterns.items():
        for m in re.finditer(pat, text, re.I):
            globals_found.append({
                'kind': kind,
                'offset': m.start(),
                'snippet': compact(text[max(0, m.start()-1200):m.start()+12000]),
            })

    wrapper_patterns = [
        r'fulltextDownload\s*:\s*function\s*\([^)]*\)\s*\{',
        r'ButtonSet\.fulltextDownload\s*\(',
    ]
    wrappers = []
    for pat in wrapper_patterns:
        for m in re.finditer(pat, text, re.I):
            wrappers.append({'offset': m.start(), 'snippet': compact(text[max(0, m.start()-800):m.start()+7000], 7000)})

    route_hits = []
    for token in ['/search/download/FullTextDownload.do', 'redirectURL', '.submit(', 'method=', 'window.open(', 'location.href', 'location.replace']:
        for m in re.finditer(re.escape(token), text, re.I):
            route_hits.append({
                'token': token,
                'offset': m.start(),
                'snippet': compact(text[max(0, m.start()-1200):m.start()+5000], 5000),
            })
    route_hits.sort(key=lambda x: x['offset'])

    return {
        'source': source,
        'globalDefinitions': globals_found,
        'wrapperEvidence': wrappers[:20],
        'routeSemanticsEvidence': route_hits[:80],
    }


def main():
    assert DETAIL.exists() and TITLE_SEARCH.exists()
    detail = DETAIL.read_text(encoding='utf-8')
    title = TITLE_SEARCH.read_text(encoding='utf-8')
    opener = build_opener(HTTPCookieProcessor(CookieJar()))

    sources = [
        ('riss-detail.html', detail, 'https://www.riss.kr/search/detail/DetailView.do'),
        ('riss-title-search.html', title, 'https://www.riss.kr/search/Search.do'),
    ]
    report = {
        'purpose': 'Identify the exact source and body of the RISS global fulltextDownload dispatcher before any content-delivery request is considered.',
        'contentDownloadExecuted': False,
        'guessedOpaqueIdentifierCount': 0,
        'sources': [],
        'globalDefinitionCount': 0,
    }

    seen = set()
    for label, text, base in sources:
        ev = evidence(label, text)
        if ev:
            report['sources'].append(ev)
        for url in script_urls(text, base):
            if url in seen:
                continue
            seen.add(url)
            meta, body = fetch(opener, url, base)
            ev = evidence(url, body) if body else None
            if ev:
                ev['fetch'] = meta
                report['sources'].append(ev)

    report['globalDefinitionCount'] = sum(len(x.get('globalDefinitions', [])) for x in report['sources'])
    report['wrapperSourceCount'] = sum(1 for x in report['sources'] if x.get('wrapperEvidence'))
    report['routeSemanticsSourceCount'] = sum(1 for x in report['sources'] if x.get('routeSemanticsEvidence'))
    path = OUT / 'riss-fulltext-dispatch-evidence.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({
        'globalDefinitionCount': report['globalDefinitionCount'],
        'wrapperSourceCount': report['wrapperSourceCount'],
        'routeSemanticsSourceCount': report['routeSemanticsSourceCount'],
        'contentDownloadExecuted': False,
        'guessedOpaqueIdentifierCount': 0,
    }, ensure_ascii=False, indent=2))
    assert report['contentDownloadExecuted'] is False
    assert report['guessedOpaqueIdentifierCount'] == 0


if __name__ == '__main__':
    main()
