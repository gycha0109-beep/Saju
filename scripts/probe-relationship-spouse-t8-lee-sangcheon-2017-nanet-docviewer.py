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
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-lee-sangcheon-2017')
OUT.mkdir(exist_ok=True)

NANET_REPORT = OUT / 'nanet-dispatcher.json'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/15.3; public-resource-verification)'
MAX = 12 * 1024 * 1024
NETWORK_ATTEMPTS = 3
NETWORK_TIMEOUT_SECONDS = 25
DOCVIEWER_HOST = 'docviewer.nanet.go.kr'
ROUTE_HINT = re.compile(r'api|asset|book|content|document|doc|file|image|img|manifest|page|pdf|reader|text|tile|view', re.I)
REQUEST_HINT = re.compile(r'fetch\s*\(|axios\.|XMLHttpRequest|\.ajax\s*\(|\.get\s*\(|\.post\s*\(', re.I)


def decode(data: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            pass
    return data.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 16000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def access_boundary(text: str) -> dict[str, bool]:
    return {
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|소속기관|institutional|institution.?auth', text, re.I)),
        'purchase': bool(re.search(r'구매|결제|유료|purchase|payment|paywall', text, re.I)),
        'drmOrDedicatedViewer': bool(re.search(r'DRM|전용.?뷰어|dedicated.?viewer|ezPDF|Fasoo|MarkAny|MaWebDRM', text, re.I)),
    }


def fetch_bytes(opener, url: str, referer: str | None = None) -> tuple[dict, bytes, str]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/javascript,application/json,text/plain,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
    }
    if referer:
        headers['Referer'] = referer
    records: list[dict] = []
    last: dict | None = None
    for attempt in range(1, NETWORK_ATTEMPTS + 1):
        meta = {
            'requestedUrl': url,
            'method': 'GET',
            'status': None,
            'finalUrl': None,
            'contentType': None,
            'bytes': 0,
            'sha256': None,
            'redirected': False,
            'startsPdf': False,
            'error': None,
            'attempt': attempt,
        }
        try:
            with opener.open(Request(url, headers=headers), timeout=NETWORK_TIMEOUT_SECONDS) as r:
                body = r.read(MAX)
                final_url = r.geturl()
                meta.update({
                    'status': getattr(r, 'status', None),
                    'finalUrl': final_url,
                    'contentType': r.headers.get('Content-Type'),
                    'bytes': len(body),
                    'sha256': hashlib.sha256(body).hexdigest(),
                    'redirected': final_url != url,
                    'startsPdf': body.startswith(b'%PDF-'),
                })
                text = '' if body.startswith(b'%PDF-') else decode(body)
                if text:
                    meta['accessBoundary'] = access_boundary(text)
                    meta['bodySample'] = compact(text, 10000)
                records.append({'attempt': attempt, 'status': meta['status'], 'finalUrl': final_url, 'bytes': len(body), 'sha256': meta['sha256'], 'error': None})
                meta['attempts'] = records
                return meta, body, text
        except Exception as e:
            meta['error'] = f'{type(e).__name__}: {e}'
            last = meta
            records.append({'attempt': attempt, 'status': None, 'finalUrl': None, 'bytes': 0, 'sha256': None, 'error': meta['error']})
            if attempt < NETWORK_ATTEMPTS:
                time.sleep(attempt)
    assert last is not None
    last['attempts'] = records
    return last, b'', ''


def exact_docviewer_url(nanet: dict) -> str | None:
    attempt = nanet.get('viewerAttempt') or {}
    sample = html.unescape(attempt.get('bodySample') or '')
    matches = re.findall(r'''location\.replace\(\s*["'](https://docviewer\.nanet\.go\.kr/reader/[A-Za-z0-9_-]+)["']\s*\)''', sample, re.I)
    unique = list(dict.fromkeys(matches))
    if not unique:
        return None
    assert len(unique) == 1, 'multiple public docviewer next hops found; fail closed'
    url = unique[0]
    parsed = urlparse(url)
    assert parsed.scheme == 'https'
    assert parsed.hostname == DOCVIEWER_HOST
    assert re.fullmatch(r'/reader/[A-Za-z0-9_-]+', parsed.path)
    assert not parsed.query and not parsed.fragment
    return url


def same_docviewer_host(url: str) -> bool:
    parsed = urlparse(url)
    return parsed.scheme == 'https' and parsed.hostname == DOCVIEWER_HOST


def script_urls(base_url: str, text: str) -> list[str]:
    out: list[str] = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        url = urljoin(base_url, html.unescape(raw))
        if same_docviewer_host(url) and url not in out:
            out.append(url)
    return out[:80]


def route_literals(source_url: str, text: str) -> list[str]:
    out: list[str] = []
    decoded = html.unescape(text)
    for raw in re.findall(r'''["']([^"'\r\n]{1,900})["']''', decoded):
        value = raw.strip()
        if not ROUTE_HINT.search(value):
            continue
        if value.startswith(('javascript:', '#', 'mailto:', 'data:')):
            continue
        if not (value.startswith('/') or value.startswith('https://')):
            continue
        url = urljoin(source_url, value)
        if same_docviewer_host(url) and url not in out:
            out.append(url)
    return out[:160]


def request_windows(source_url: str, text: str) -> list[dict]:
    out: list[dict] = []
    decoded = html.unescape(text)
    for m in REQUEST_HINT.finditer(decoded):
        window = compact(decoded[max(0, m.start() - 700): min(len(decoded), m.start() + 2200)], 3000)
        routes = route_literals(source_url, window)
        rec = {'window': window, 'routeLiterals': routes}
        if rec not in out:
            out.append(rec)
    return out[:80]


def main() -> int:
    assert NANET_REPORT.exists(), 'nanet dispatcher evidence is required first'
    nanet = json.loads(NANET_REPORT.read_text(encoding='utf-8'))
    report = {
        'purpose': 'follow only the exact anonymous NANET site-authored docviewer next hop and inspect its public HTML/JS contracts; no login, download, DRM, or guessed asset route',
        'target': nanet.get('target'),
        'sourceViewerContract': nanet.get('viewerContract'),
        'siteAuthoredDocviewerUrl': None,
        'viewerSurface': None,
        'viewerSurfaceAvailable': False,
        'viewerScripts': [],
        'scriptFetchSummary': {'attempted': 0, 'succeeded': 0, 'failed': 0},
        'routeLiterals': [],
        'requestContracts': [],
        'accessBoundary': None,
        'nextHopDisposition': None,
    }

    if nanet.get('surfaceUnavailable') or not nanet.get('viewerContractObservedThisRun'):
        report['nextHopDisposition'] = 'NANET_VIEWER_CONTRACT_NOT_OBSERVED_THIS_RUN'
    else:
        url = exact_docviewer_url(nanet)
        if not url:
            report['nextHopDisposition'] = 'NO_SITE_AUTHORED_DOCVIEWER_LITERAL_OBSERVED'
        else:
            report['siteAuthoredDocviewerUrl'] = url
            opener = build_opener(HTTPCookieProcessor(CookieJar()))
            referer = (nanet.get('viewerContract') or {}).get('url')
            meta, _body, text = fetch_bytes(opener, url, referer)
            report['viewerSurface'] = meta
            report['viewerSurfaceAvailable'] = bool(text)
            if not text:
                report['nextHopDisposition'] = 'DOCVIEWER_SURFACE_UNAVAILABLE'
            else:
                final_url = meta.get('finalUrl') or url
                parsed_final = urlparse(final_url)
                if parsed_final.hostname != DOCVIEWER_HOST:
                    report['nextHopDisposition'] = 'DOCVIEWER_REDIRECTED_OFF_AUTHORIZED_HOST'
                else:
                    report['accessBoundary'] = access_boundary(text)
                    scripts = script_urls(final_url, text)
                    report['viewerScripts'] = scripts
                    all_routes = route_literals(final_url, text)
                    contracts = [{'source': final_url, 'kind': 'html', 'requests': request_windows(final_url, text)}]
                    successes = 0
                    failures = 0
                    for script_url in scripts:
                        smeta, _sbody, stext = fetch_bytes(opener, script_url, final_url)
                        if not stext:
                            failures += 1
                            continue
                        successes += 1
                        for route in route_literals(script_url, stext):
                            if route not in all_routes:
                                all_routes.append(route)
                        reqs = request_windows(script_url, stext)
                        if reqs:
                            contracts.append({'source': script_url, 'kind': 'script', 'meta': smeta, 'requests': reqs})
                    report['scriptFetchSummary'] = {'attempted': len(scripts), 'succeeded': successes, 'failed': failures}
                    report['routeLiterals'] = all_routes[:240]
                    report['requestContracts'] = contracts
                    b = report['accessBoundary'] or {}
                    if b.get('login') or b.get('institutionAuth') or b.get('purchase') or b.get('drmOrDedicatedViewer'):
                        report['nextHopDisposition'] = 'ACCESS_BOUNDARY_SIGNAL_ON_DOCVIEWER_SURFACE'
                    elif all_routes or any(x.get('requests') for x in contracts):
                        report['nextHopDisposition'] = 'PUBLIC_VIEWER_CONTRACTS_OBSERVED_REVIEW_BEFORE_REPLAY'
                    else:
                        report['nextHopDisposition'] = 'PUBLIC_VIEWER_SURFACE_NO_EXPLICIT_ASSET_CONTRACT_OBSERVED'

    path = OUT / 'nanet-docviewer.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({
        'target': report['target'],
        'siteAuthoredDocviewerUrl': report['siteAuthoredDocviewerUrl'],
        'viewerSurface': report['viewerSurface'],
        'viewerSurfaceAvailable': report['viewerSurfaceAvailable'],
        'accessBoundary': report['accessBoundary'],
        'scriptFetchSummary': report['scriptFetchSummary'],
        'routeLiterals': report['routeLiterals'],
        'requestContracts': report['requestContracts'],
        'nextHopDisposition': report['nextHopDisposition'],
    }, ensure_ascii=False, indent=2))

    if report['siteAuthoredDocviewerUrl']:
        assert urlparse(report['siteAuthoredDocviewerUrl']).hostname == DOCVIEWER_HOST
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
