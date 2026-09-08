#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-lee-sangcheon-2017')
PRIVATE = Path('acquisition-lee-sangcheon-2017-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)

AUTHOR = '이상천'
TITLE_SIGNAL = '육친론'
CONTROL = 'KDMT1201802346'
DETAIL = f'https://dl.nanet.go.kr/SearchDetailView.do?cn={CONTROL}'
DETAIL_ALT = f'https://dl.nanet.go.kr/detail/{CONTROL}'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/15.2; public-resource-verification)'
MAX = 55 * 1024 * 1024
NETWORK_ATTEMPTS = 3
NETWORK_TIMEOUT_SECONDS = 25
FUNCTIONS = ('viewDoc', 'downloadDoc', 'newViewerCall')
ROUTE_HINT = re.compile(r'viewer|view|download|file|original|pdf|document|doc', re.I)


def decode(data: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            pass
    return data.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 18000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def access_boundary(text: str) -> dict[str, bool]:
    return {
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|소속기관|institutional|institution.?auth', text, re.I)),
        'purchase': bool(re.search(r'구매|결제|유료|purchase|payment|paywall', text, re.I)),
        'drmOrDedicatedViewer': bool(re.search(r'DRM|전용.?뷰어|dedicated.?viewer|ezPDF|Fasoo', text, re.I)),
    }


def fetch_bytes(
    opener,
    url: str,
    referer: str | None = None,
    attempts: int = NETWORK_ATTEMPTS,
) -> tuple[dict, bytes, str]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/javascript,application/pdf,application/octet-stream,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
    }
    if referer:
        headers['Referer'] = referer

    attempt_records: list[dict] = []
    last_meta: dict | None = None
    for attempt in range(1, attempts + 1):
        meta = {
            'requestedUrl': url,
            'method': 'GET',
            'status': None,
            'finalUrl': None,
            'contentType': None,
            'contentDisposition': None,
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
                    'contentDisposition': r.headers.get('Content-Disposition'),
                    'bytes': len(body),
                    'sha256': hashlib.sha256(body).hexdigest(),
                    'redirected': final_url != url,
                    'startsPdf': body.startswith(b'%PDF-'),
                })
                text = '' if body.startswith(b'%PDF-') else decode(body)
                if text:
                    meta['accessBoundary'] = access_boundary(text)
                    meta['bodySample'] = compact(text, 12000)
                attempt_records.append({
                    'attempt': attempt,
                    'status': meta['status'],
                    'finalUrl': meta['finalUrl'],
                    'bytes': meta['bytes'],
                    'sha256': meta['sha256'],
                    'error': None,
                })
                meta['attempts'] = attempt_records
                return meta, body, text
        except Exception as e:
            meta['error'] = f'{type(e).__name__}: {e}'
            last_meta = meta
            attempt_records.append({
                'attempt': attempt,
                'status': None,
                'finalUrl': None,
                'bytes': 0,
                'sha256': None,
                'error': meta['error'],
            })
            if attempt < attempts:
                time.sleep(attempt)

    assert last_meta is not None
    last_meta['attempts'] = attempt_records
    return last_meta, b'', ''


def fetch(opener, url: str, referer: str | None = None) -> tuple[dict, str]:
    meta, _body, text = fetch_bytes(opener, url, referer)
    return meta, text


def same_host(url: str) -> bool:
    p = urlparse(url)
    return p.scheme in ('http', 'https') and p.hostname == 'dl.nanet.go.kr'


def route_literals(source_url: str, window: str) -> list[str]:
    out: list[str] = []
    for raw in re.findall(r'''["']([^"']{1,700})["']''', html.unescape(window)):
        if not ROUTE_HINT.search(raw):
            continue
        if raw.startswith(('javascript:', '#', 'mailto:')):
            continue
        if not (raw.startswith('/') or raw.startswith('http')):
            continue
        url = urljoin(source_url, raw)
        if same_host(url) and url not in out:
            out.append(url)
    return out[:80]


def page_calls(text: str) -> list[str]:
    out: list[str] = []
    for pattern in (
        rf"viewDoc\s*\([^;]{{0,900}}{CONTROL}[^;]{{0,900}}\)",
        rf"downloadDoc\s*\([^;]{{0,900}}{CONTROL}[^;]{{0,900}}\)",
    ):
        for m in re.finditer(pattern, html.unescape(text), re.I | re.S):
            value = compact(m.group(0), 2200)
            if value not in out:
                out.append(value)
    return out[:20]


def inspect_source(source_url: str, text: str) -> dict:
    found: list[dict] = []
    for fn in FUNCTIONS:
        definition_patterns = (
            rf'function\s+{re.escape(fn)}\s*\(',
            rf'(?:const|let|var)\s+{re.escape(fn)}\s*=\s*(?:async\s*)?(?:function\s*)?\(',
        )
        windows: list[str] = []
        for pattern in definition_patterns:
            for m in re.finditer(pattern, text, re.I):
                value = compact(text[max(0, m.start() - 1000): min(len(text), m.start() + 18000)], 19000)
                if value not in windows:
                    windows.append(value)
        if windows:
            found.append({
                'function': fn,
                'windows': windows[:6],
                'routeLiterals': sorted({u for w in windows for u in route_literals(source_url, w)}),
            })
    return {'source': source_url, 'definitions': found}


def exact_public_viewer_contract(source_url: str, text: str) -> dict | None:
    decoded = html.unescape(text)
    view_dispatch = re.search(
        r'function\s+viewDoc\s*\([^)]*\).*?parseInt\(count\)\s*==\s*1\s*\)\s*\{\s*viewDocBySingleCount\(controlNo\)',
        decoded,
        re.I | re.S,
    )
    if not view_dispatch:
        return None
    single = re.search(
        r'''function\s+viewDocBySingleCount\s*\([^)]*\).*?window\.open\(\s*["'](/view/callViewer\.do\?controlNo=)["']\s*\+\s*controlNo\s*\+\s*["'](&orgId=dl&linkSysId=NADL)["']''',
        decoded,
        re.I | re.S,
    )
    if not single:
        return None
    route = single.group(1) + quote(CONTROL) + single.group(2)
    return {
        'source': source_url,
        'method': 'GET',
        'url': urljoin(source_url, route),
        'controlNo': CONTROL,
        'orgId': 'dl',
        'linkSysId': 'NADL',
    }


def download_login_boundary(source_url: str, text: str) -> dict | None:
    decoded = html.unescape(text)
    m = re.search(
        r'''function\s+downloadDoc\s*\([^)]*\)\s*\{(.*?)(?=function\s+downloadEpub\s*\()''',
        decoded,
        re.I | re.S,
    )
    if not m:
        return None
    body = m.group(1)
    requires_login = bool(re.search(r'if\s*\(\s*!isLogin\s*\)', body, re.I))
    login_route = None
    lm = re.search(r'''window\.location\.href\s*=\s*["']([^"']+)["']''', body, re.I)
    if lm:
        login_route = urljoin(source_url, lm.group(1))
    single_dispatch = bool(re.search(r'parseInt\(count\)\s*==\s*1.*?downloadBySingleCount\(controlNo\)', body, re.I | re.S))
    return {
        'source': source_url,
        'requiresLogin': requires_login,
        'loginRoute': login_route,
        'singleCountDispatchesToDownloadBySingleCount': single_dispatch,
        'executed': False,
        'reason': 'download path is not replayed because public site code requires login' if requires_login else None,
    }


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'observe and replay only exact public NANET target-specific viewer contract; no login, DRM, or access-control bypass',
        'target': {'author': AUTHOR, 'controlNo': CONTROL},
        'surfaces': [],
        'surfaceAvailable': False,
        'surfaceUnavailable': False,
        'viewerContractObservedThisRun': False,
        'pageCalls': [],
        'scriptUrls': [],
        'sources': [],
        'viewerContract': None,
        'viewerAttempt': None,
        'viewerPdfPrivateFile': None,
        'downloadBoundary': None,
    }

    source_texts: list[tuple[str, str]] = []
    for url in (DETAIL, DETAIL_ALT):
        meta, text = fetch(opener, url)
        report['surfaces'].append(meta)
        if not text:
            continue
        # A successful but wrong/changed page is not a network boundary.
        assert CONTROL in text, 'successful NANET surface no longer identifies target control number'
        assert AUTHOR in text or TITLE_SIGNAL in text or '적천수' in text, 'successful NANET surface no longer corroborates target identity'
        source_url = meta.get('finalUrl') or url
        source_texts.append((source_url, text))
        for call in page_calls(text):
            if call not in report['pageCalls']:
                report['pageCalls'].append(call)
        for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
            script_url = urljoin(source_url, html.unescape(raw))
            if same_host(script_url) and script_url not in report['scriptUrls']:
                report['scriptUrls'].append(script_url)

    report['surfaceAvailable'] = bool(source_texts)
    report['surfaceUnavailable'] = not report['surfaceAvailable']

    for source_url, text in list(source_texts):
        rec = inspect_source(source_url, text)
        if rec['definitions']:
            report['sources'].append(rec)
        if report['viewerContract'] is None:
            report['viewerContract'] = exact_public_viewer_contract(source_url, text)
        if report['downloadBoundary'] is None:
            report['downloadBoundary'] = download_login_boundary(source_url, text)

    script_successes = 0
    script_failures = 0
    for url in report['scriptUrls'][:120]:
        meta, text = fetch(opener, url, DETAIL)
        if not text:
            script_failures += 1
            continue
        script_successes += 1
        if not any(fn.lower() in text.lower() for fn in FUNCTIONS):
            continue
        source_url = meta.get('finalUrl') or url
        rec = inspect_source(source_url, text)
        rec['meta'] = meta
        if rec['definitions']:
            report['sources'].append(rec)
        if report['viewerContract'] is None:
            report['viewerContract'] = exact_public_viewer_contract(source_url, text)
        if report['downloadBoundary'] is None:
            report['downloadBoundary'] = download_login_boundary(source_url, text)

    report['scriptFetchSummary'] = {
        'attempted': len(report['scriptUrls'][:120]),
        'succeeded': script_successes,
        'failed': script_failures,
    }
    report['viewerContractObservedThisRun'] = report['viewerContract'] is not None

    # The target page emits viewDoc(..., '1'). Execute only the exact public
    # single-count viewer GET recovered in this same run from site-owned code.
    if report['viewerContract']:
        vm, vb, _vt = fetch_bytes(opener, report['viewerContract']['url'], DETAIL)
        report['viewerAttempt'] = vm
        if vb.startswith(b'%PDF-'):
            private_pdf = PRIVATE / 'nanet-public-viewer.pdf'
            private_pdf.write_bytes(vb)
            report['viewerPdfPrivateFile'] = {
                'file': private_pdf.name,
                'bytes': len(vb),
                'sha256': hashlib.sha256(vb).hexdigest(),
            }

    path = OUT / 'nanet-dispatcher.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')

    focused = {
        'target': report['target'],
        'surfaceAvailable': report['surfaceAvailable'],
        'surfaceUnavailable': report['surfaceUnavailable'],
        'surfaces': report['surfaces'],
        'pageCalls': report['pageCalls'],
        'viewerContractObservedThisRun': report['viewerContractObservedThisRun'],
        'viewerContract': report['viewerContract'],
        'viewerAttempt': report['viewerAttempt'],
        'viewerPdfPrivateFile': report['viewerPdfPrivateFile'],
        'downloadBoundary': report['downloadBoundary'],
        'scriptFetchSummary': report['scriptFetchSummary'],
        'scriptUrls': report['scriptUrls'],
        'sources': [
            {
                'source': src['source'],
                'functions': [
                    {
                        'function': d['function'],
                        'routeLiterals': d['routeLiterals'],
                    }
                    for d in src['definitions']
                ],
            }
            for src in report['sources']
        ],
    }
    print(json.dumps(focused, ensure_ascii=False, indent=2))

    if report['surfaceUnavailable']:
        print('NANET public surfaces unavailable after bounded retries; no contract disappearance or semantic conclusion is inferred.')
        return 0

    assert any('viewDoc' in x and CONTROL in x for x in report['pageCalls']), 'target public viewDoc call disappeared from a successfully fetched target surface'
    assert any('downloadDoc' in x and CONTROL in x for x in report['pageCalls']), 'target public downloadDoc call disappeared from a successfully fetched target surface'

    # If some public scripts were unavailable, absence of a contract is an
    # availability boundary rather than proof that the dispatcher disappeared.
    if not report['viewerContract'] and script_failures:
        print('NANET dispatcher scripts were partially unavailable; viewer contract absence is evidence-neutral for this run.')
        return 0

    assert report['viewerContract'], 'public single-count viewer contract disappeared from successfully fetched public source code'
    assert report['downloadBoundary'] and report['downloadBoundary']['requiresLogin'], 'expected public download login boundary disappeared'
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
