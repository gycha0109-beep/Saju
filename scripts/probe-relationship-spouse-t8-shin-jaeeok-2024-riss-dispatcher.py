#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-shin-jaeeok-2024')
OUT.mkdir(exist_ok=True)

CONTROL_NO = '49df877f9b4f8a08ffe0bdc3ef48d419'
DOC_CONTROL_NO = '16939654'
P_MAT_TYPE = 'be54d9b8bc7cdb09'
DETAIL = f'https://www.riss.kr/search/detail/DetailView.do?p_mat_type={P_MAT_TYPE}&control_no={CONTROL_NO}'
ORIGINAL_CHECK = 'https://www.riss.kr/detail/originalCheck.do'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/9.3; public-resource-verification)'
MAX = 8 * 1024 * 1024
PATTERNS = (
    r'function\s+fulltextDownload\s*\([^)]*\)',
    r'fulltextDownload\s*=\s*function\s*\([^)]*\)',
    r'fulltextDownload\s*:\s*function\s*\([^)]*\)',
    r'function\s+openFulltext\s*\([^)]*\)',
    r'function\s+urlDownload\s*\([^)]*\)',
    r'function\s+publicUrlDownload\s*\([^)]*\)',
    r'function\s+originalCheck\s*\([^)]*\)',
    r'/search/download/[A-Za-z0-9_.?=&/+%-]+',
)


def decode(data: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            pass
    return data.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 14000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def fetch(opener, url: str, *, data: bytes | None = None, referer: str | None = None) -> tuple[dict, bytes]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/javascript,application/json,*/*;q=0.5',
    }
    if referer:
        headers['Referer'] = referer
    if data is not None:
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        headers['X-Requested-With'] = 'XMLHttpRequest'
    meta = {
        'requestedUrl': url,
        'method': 'POST' if data is not None else 'GET',
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'bytes': 0,
        'sha256': None,
        'error': None,
    }
    try:
        with opener.open(Request(url, data=data, headers=headers), timeout=35) as r:
            body = r.read(MAX)
            meta.update({
                'status': getattr(r, 'status', None),
                'finalUrl': r.geturl(),
                'contentType': r.headers.get('Content-Type'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
            })
            return meta, body
    except Exception as e:
        meta['error'] = f'{type(e).__name__}: {e}'
        return meta, b''


def windows(text: str, pattern: str, *, before: int = 1200, after: int = 9000, cap: int = 12) -> list[str]:
    out: list[str] = []
    for m in re.finditer(pattern, text, re.I | re.S):
        value = compact(text[max(0, m.start() - before): min(len(text), m.start() + after)])
        if value not in out:
            out.append(value)
        if len(out) >= cap:
            break
    return out


def inspect_source(source: str, text: str) -> dict:
    matches: list[dict] = []
    for pattern in PATTERNS:
        contexts = windows(text, pattern)
        if contexts:
            matches.append({'pattern': pattern, 'contexts': contexts})
    target_calls: list[str] = []
    for pattern in (
        r'fulltextDownload\s*\([^;]{0,1200}\)',
        r'openFulltext\s*\([^;]{0,1200}\)',
        r'alertFullTextLayer\s*\([^;]{0,1200}\)',
        r'ButtonSet\.fulltextDownload\s*\([^;]{0,1200}\)',
    ):
        for m in re.finditer(pattern, text, re.I | re.S):
            call = compact(m.group(0), 2200)
            if call not in target_calls:
                target_calls.append(call)
    return {
        'source': source,
        'matches': matches,
        'targetCalls': target_calls[:30],
    }


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report: dict = {
        'purpose': 'exact RISS public dispatcher inspection; read-only GET plus the site-authored originalCheck POST only',
        'detailUrl': DETAIL,
        'originalCheckUrl': ORIGINAL_CHECK,
        'detail': {},
        'scriptUrls': [],
        'sources': [],
        'originalCheck': {},
        'originalCheckBody': None,
    }

    meta, body = fetch(opener, DETAIL)
    report['detail'] = meta
    text = decode(body) if body else ''
    assert CONTROL_NO in text
    assert 'onclick="javascript:fulltextDownload();"' in text or "onclick='javascript:fulltextDownload();'" in text
    report['sources'].append(inspect_source(meta.get('finalUrl') or DETAIL, text))

    script_urls: list[str] = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        url = urljoin(meta.get('finalUrl') or DETAIL, html.unescape(raw))
        if url not in script_urls:
            script_urls.append(url)
    report['scriptUrls'] = script_urls

    for url in script_urls[:80]:
        sm, sb = fetch(opener, url, referer=DETAIL)
        if not sb:
            continue
        st = decode(sb)
        low = st.lower()
        if not any(k in low for k in ('fulltextdownload', 'openfulltext', 'originalcheck', '/search/download/')):
            continue
        rec = inspect_source(sm.get('finalUrl') or url, st)
        rec['meta'] = sm
        report['sources'].append(rec)

    payload = urlencode({'controlNo': DOC_CONTROL_NO, 'docType': 'T'}).encode('ascii')
    om, ob = fetch(opener, ORIGINAL_CHECK, data=payload, referer=DETAIL)
    report['originalCheck'] = om
    report['originalCheckBody'] = compact(decode(ob), 4000) if ob else None

    path = OUT / 'riss-dispatcher.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')

    focused = {
        'detail': report['detail'],
        'originalCheck': report['originalCheck'],
        'originalCheckBody': report['originalCheckBody'],
        'sources': [
            {
                'source': x['source'],
                'targetCalls': x['targetCalls'],
                'patterns': [m['pattern'] for m in x['matches']],
            }
            for x in report['sources']
        ],
    }
    print(json.dumps(focused, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
