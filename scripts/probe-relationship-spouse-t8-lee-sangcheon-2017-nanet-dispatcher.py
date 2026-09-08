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

OUT = Path('acquisition-lee-sangcheon-2017')
OUT.mkdir(exist_ok=True)

AUTHOR = '이상천'
TITLE_SIGNAL = '육친론'
CONTROL = 'KDMT1201802346'
DETAIL = f'https://dl.nanet.go.kr/SearchDetailView.do?cn={CONTROL}'
DETAIL_ALT = f'https://dl.nanet.go.kr/detail/{CONTROL}'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/15.0; public-resource-verification)'
MAX = 8 * 1024 * 1024
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


def fetch(opener, url: str, referer: str | None = None) -> tuple[dict, str]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/javascript,*/*;q=0.5',
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
        'error': None,
    }
    try:
        with opener.open(Request(url, headers=headers), timeout=40) as r:
            body = r.read(MAX)
            meta.update({
                'status': getattr(r, 'status', None),
                'finalUrl': r.geturl(),
                'contentType': r.headers.get('Content-Type'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
            })
            return meta, decode(body)
    except Exception as e:
        meta['error'] = f'{type(e).__name__}: {e}'
        return meta, ''


def same_host(url: str) -> bool:
    p = urlparse(url)
    return p.scheme in ('http', 'https') and p.hostname == 'dl.nanet.go.kr'


def contexts(text: str, token: str, before: int = 1800, after: int = 14000, cap: int = 12) -> list[str]:
    out: list[str] = []
    for m in re.finditer(re.escape(token), text, re.I):
        value = compact(text[max(0, m.start() - before): min(len(text), m.start() + after)])
        if value not in out:
            out.append(value)
        if len(out) >= cap:
            break
    return out


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


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'observe public NANET target-specific fulltext dispatcher only; no login, DRM, or access-control bypass',
        'target': {'author': AUTHOR, 'controlNo': CONTROL},
        'surfaces': [],
        'pageCalls': [],
        'scriptUrls': [],
        'sources': [],
    }

    source_texts: list[tuple[str, str]] = []
    for url in (DETAIL, DETAIL_ALT):
        meta, text = fetch(opener, url)
        report['surfaces'].append(meta)
        if not text:
            continue
        assert CONTROL in text
        assert AUTHOR in text or TITLE_SIGNAL in text or '적천수' in text
        source_url = meta.get('finalUrl') or url
        source_texts.append((source_url, text))
        for call in page_calls(text):
            if call not in report['pageCalls']:
                report['pageCalls'].append(call)
        for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
            script_url = urljoin(source_url, html.unescape(raw))
            if same_host(script_url) and script_url not in report['scriptUrls']:
                report['scriptUrls'].append(script_url)

    for source_url, text in list(source_texts):
        rec = inspect_source(source_url, text)
        if rec['definitions']:
            report['sources'].append(rec)

    for url in report['scriptUrls'][:120]:
        meta, text = fetch(opener, url, DETAIL)
        if not text:
            continue
        if not any(fn.lower() in text.lower() for fn in FUNCTIONS):
            continue
        rec = inspect_source(meta.get('finalUrl') or url, text)
        rec['meta'] = meta
        if rec['definitions']:
            report['sources'].append(rec)

    path = OUT / 'nanet-dispatcher.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')

    focused = {
        'target': report['target'],
        'surfaces': report['surfaces'],
        'pageCalls': report['pageCalls'],
        'scriptUrls': report['scriptUrls'],
        'sources': [
            {
                'source': src['source'],
                'functions': [
                    {
                        'function': d['function'],
                        'routeLiterals': d['routeLiterals'],
                        'windows': d['windows'],
                    }
                    for d in src['definitions']
                ],
            }
            for src in report['sources']
        ],
    }
    print(json.dumps(focused, ensure_ascii=False, indent=2))

    assert any('viewDoc' in x and CONTROL in x for x in report['pageCalls']), 'target public viewDoc call disappeared'
    assert any('downloadDoc' in x and CONTROL in x for x in report['pageCalls']), 'target public downloadDoc call disappeared'
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
