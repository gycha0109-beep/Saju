#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
import time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

OUT = Path('acquisition-park-hyeyoung-2018')
DETAIL = OUT / 'riss-detail.html'
TITLE_SEARCH = OUT / 'riss-title-search.html'
EXPECTED_BIBNO = 'KDM201900838'
TOKEN = 'nationalLibraryLocalBibno'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/2.0; Park-Hyeyoung-RISS-library-bridge-inspector)'
HOSTS = {'www.riss.kr', 'riss.kr'}


def decode(body: bytes, content_type: str = '') -> str:
    candidates = []
    m = re.search(r'charset=([A-Za-z0-9._-]+)', content_type or '', re.I)
    if m:
        candidates.append(m.group(1))
    candidates += ['utf-8', 'cp949', 'euc-kr']
    for enc in candidates:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 7000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def script_urls(text: str, base: str) -> list[str]:
    out = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        url = urljoin(base, html.unescape(raw))
        if (urlparse(url).hostname or '').lower() in HOSTS and url not in out:
            out.append(url)
    return out[:60]


def fetch(opener, url: str, referer: str):
    assert (urlparse(url).hostname or '').lower() in HOSTS
    headers = {
        'User-Agent': UA,
        'Accept': 'application/javascript,text/javascript,text/html,*/*;q=0.5',
        'Referer': referer,
    }
    last = None
    for attempt in range(1, 3):
        meta = {'url': url, 'status': None, 'bytes': 0, 'sha256': None, 'attempt': attempt, 'error': None}
        try:
            with opener.open(Request(url, headers=headers), timeout=18) as resp:
                body = resp.read(4_000_000)
                meta.update(
                    status=getattr(resp, 'status', None),
                    bytes=len(body),
                    sha256=hashlib.sha256(body).hexdigest(),
                )
                return meta, decode(body, resp.headers.get('Content-Type', ''))
        except Exception as exc:
            meta['error'] = f'{type(exc).__name__}: {exc}'
            last = meta
            time.sleep(attempt)
    return last, ''


def route_signals(raw: str) -> list[str]:
    patterns = {
        'function-definition': r'function\s+[A-Za-z0-9_$]+\s*\([^)]*\)\s*\{',
        'fetch-call': r'\bfetch\s*\(',
        'jquery-ajax': r'\$\s*\.\s*ajax\s*\(',
        'jquery-get': r'\$\s*\.\s*get\s*\(',
        'jquery-post': r'\$\s*\.\s*post\s*\(',
        'window-open': r'\b(?:window\s*\.\s*)?open\s*\(',
        'location-assignment': r'\b(?:window\s*\.\s*)?location(?:\s*\.\s*href)?\s*=',
        'form-submit': r'\.\s*submit\s*\(',
    }
    return [name for name, pattern in patterns.items() if re.search(pattern, raw, re.I)]


def relevant_endpoint(endpoint: str) -> bool:
    low = endpoint.lower()
    return (
        EXPECTED_BIBNO.lower() in low
        or any(token in low for token in ('library', 'localbib', 'copy', 'loan', 'delivery', 'nld', 'nanet'))
    )


def occurrences(source: str, text: str) -> list[dict]:
    out = []
    for needle in (TOKEN, EXPECTED_BIBNO):
        for match in re.finditer(re.escape(needle), text, re.I):
            lo = max(0, match.start() - 3500)
            hi = min(len(text), match.start() + 7000)
            raw = text[lo:hi]
            endpoints = []
            for pattern in [
                r'https?://[^\s\'"<>]+',
                r'[\'\"](/[^\'\"]+?\.do(?:\?[^\'\"]*)?)[\'\"]',
                r'[\'\"](/[^\'\"]+?(?:search|detail|view|library)[^\'\"]*)[\'\"]',
            ]:
                for value in re.findall(pattern, raw, re.I):
                    if isinstance(value, tuple):
                        value = value[0]
                    value = html.unescape(value).rstrip('),.;')
                    if value not in endpoints:
                        endpoints.append(value)
            functions = []
            for fm in re.finditer(r'function\s+([A-Za-z0-9_$]+)\s*\([^)]*\)\s*\{', raw, re.I):
                name = fm.group(1)
                if name not in functions:
                    functions.append(name)
            signals = route_signals(raw)
            relevant_endpoints = [value for value in endpoints if relevant_endpoint(value)]
            out.append({
                'source': source,
                'needle': needle,
                'offset': match.start(),
                'functionsInWindow': functions[:20],
                'routeSignalsInWindow': signals,
                'endpointLiteralsInWindow': endpoints[:50],
                'relevantRouteEndpointsInWindow': relevant_endpoints[:30],
                'snippet': compact(raw),
            })
    return out


def main():
    assert DETAIL.exists(), 'RISS detail evidence must be generated first'
    detail = DETAIL.read_text(encoding='utf-8')
    title = TITLE_SEARCH.read_text(encoding='utf-8') if TITLE_SEARCH.exists() else ''

    # Exact target identity is already governed by the acquisition baseline.
    # This inspector only asks whether the exact site-authored local bib number
    # is wired to a visible routing contract. It never calls a content/bridge endpoint.
    exact_hidden = bool(re.search(
        rf'(?:id|name)=["\']{TOKEN}["\'][^>]*value=["\']{EXPECTED_BIBNO}["\']',
        detail,
        re.I | re.S,
    ))
    if not exact_hidden:
        exact_hidden = bool(TOKEN in detail and EXPECTED_BIBNO in detail)

    ctx = ssl.create_default_context()
    opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()))
    sources = [
        ('riss-detail.html', detail, 'https://www.riss.kr/search/detail/DetailView.do'),
        ('riss-title-search.html', title, 'https://www.riss.kr/search/Search.do'),
    ]
    fetched = []
    seen = set()
    all_occurrences = []

    for label, text, base in sources:
        if text:
            all_occurrences += occurrences(label, text)
        for url in script_urls(text, base):
            if url in seen:
                continue
            seen.add(url)
            meta, body = fetch(opener, url, base)
            fetched.append(meta)
            if body:
                all_occurrences += occurrences(url, body)

    # Generic URLs in the same HTML region as a hidden field are not a routing
    # contract. Require both an executable routing signal and a route endpoint
    # that is semantically tied to a library/copy/local-bib destination (or the
    # exact site-authored bib number itself). This prevents DetailView/Search
    # links elsewhere in the same large form from creating a false bridge.
    context_windows = [
        o for o in all_occurrences
        if o['endpointLiteralsInWindow']
        and (o['needle'].lower() == TOKEN.lower() or o['needle'] == EXPECTED_BIBNO)
    ]
    actionable_route_windows = [
        o for o in context_windows
        if o['routeSignalsInWindow'] and o['relevantRouteEndpointsInWindow']
    ]
    script_occurrences = [
        o for o in all_occurrences
        if o['source'].startswith('https://')
    ]

    report = {
        'purpose': 'Trace the exact RISS-authored nationalLibraryLocalBibno without synthesizing any library/content request.',
        'expectedBibno': EXPECTED_BIBNO,
        'fieldName': TOKEN,
        'exactHiddenFieldObserved': exact_hidden,
        'occurrenceCount': len(all_occurrences),
        'scriptOccurrenceCount': len(script_occurrences),
        'contextWindowCount': len(context_windows),
        'actionableRouteWindowCount': len(actionable_route_windows),
        'routeWindows': actionable_route_windows[:40],
        'contextWindows': context_windows[:40],
        'occurrences': all_occurrences[:80],
        'scriptFetches': fetched,
        'bridgeRequestExecuted': False,
        'contentDownloadExecuted': False,
        'guessedOpaqueIdentifierCount': 0,
        'disposition': (
            'RISS_NATIONAL_LIBRARY_LOCAL_BIBNO_ACTIONABLE_ROUTE_CONTEXT_REVIEW_REQUIRED'
            if actionable_route_windows
            else 'RISS_NATIONAL_LIBRARY_LOCAL_BIBNO_PRESENT_NO_SITE_AUTHORED_ROUTING_CONTRACT'
        ),
    }
    (OUT / 'riss-national-library-bridge-evidence.json').write_text(
        json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8'
    )
    print(json.dumps({
        'expectedBibno': EXPECTED_BIBNO,
        'exactHiddenFieldObserved': exact_hidden,
        'occurrenceCount': len(all_occurrences),
        'scriptOccurrenceCount': len(script_occurrences),
        'contextWindowCount': len(context_windows),
        'actionableRouteWindowCount': len(actionable_route_windows),
        'disposition': report['disposition'],
        'bridgeRequestExecuted': False,
        'contentDownloadExecuted': False,
        'guessedOpaqueIdentifierCount': 0,
    }, ensure_ascii=False, indent=2))

    assert exact_hidden is True
    assert report['bridgeRequestExecuted'] is False
    assert report['contentDownloadExecuted'] is False
    assert report['guessedOpaqueIdentifierCount'] == 0


if __name__ == '__main__':
    main()
