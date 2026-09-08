#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import quote, urlencode, urljoin
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-lee-sangcheon-2017')
OUT.mkdir(exist_ok=True)

AUTHOR = '이상천'
TITLE = '『적천수천미』 「육친론」에 관한 연구'
TITLE_SIGNAL = '육친론'
CONTROL_NO = '7dedd951a2b45b77ffe0bdc3ef48d419'
P_MAT_TYPE = 'be54d9b8bc7cdb09'
P_SUBMAT_TYPE = 'f1a8c7a1de0e08b8'
FULLTEXT_KIND = 'a8cb3aaead67ab5b'
SEARCH = (
    'https://www.riss.kr/search/Search.do?isDetailSearch=N&searchGubun=true&viewYn=OP&'
    f'query={quote(TITLE)}&queryText=&iStartCount=0&iGroupView=5&colName=bib_t'
)
DETAIL = (
    'https://www.riss.kr/search/detail/DetailView.do?'
    f'p_mat_type={P_MAT_TYPE}&control_no={CONTROL_NO}'
)
ORIGINAL_CHECK = 'https://www.riss.kr/detail/originalCheck.do'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/14.1; public-resource-verification)'
MAX = 10 * 1024 * 1024
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
        r'fulltextDownload\s*\([^;]{0,1600}\)',
        r'openFulltext\s*\([^;]{0,1600}\)',
        r'alertFullTextLayer\s*\([^;]{0,1600}\)',
        r'ButtonSet\.fulltextDownload\s*\([^;]{0,1600}\)',
    ):
        for m in re.finditer(pattern, text, re.I | re.S):
            call = compact(m.group(0), 2600)
            if call not in target_calls:
                target_calls.append(call)
    return {'source': source, 'matches': matches, 'targetCalls': target_calls[:40]}


def target_call_windows(text: str) -> list[str]:
    out: list[str] = []
    decoded = html.unescape(text)
    for token in (CONTROL_NO, 'ButtonSet.fulltextDownload', 'fulltextDownload('):
        for m in re.finditer(re.escape(token), decoded, re.I):
            value = compact(decoded[max(0, m.start() - 1200): min(len(decoded), m.start() + 2600)], 4200)
            if value not in out:
                out.append(value)
            if len(out) >= 30:
                return out
    return out


def extract_doc_control_no(text: str) -> str | None:
    # Accept only a value explicitly emitted by the target detail page.
    patterns = (
        r"originalCheck\s*\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]T['\"]",
        r"docControlNo\s*[:=]\s*['\"]([^'\"]+)['\"]",
        r"doc_control_no\s*[:=]\s*['\"]([^'\"]+)['\"]",
    )
    for pattern in patterns:
        m = re.search(pattern, text, re.I)
        if m:
            return m.group(1)
    return None


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report: dict = {
        'purpose': 'exact RISS public dispatcher inspection; no endpoint synthesis and no access-control bypass',
        'target': {
            'author': AUTHOR,
            'controlNo': CONTROL_NO,
            'pMatType': P_MAT_TYPE,
            'pSubmatType': P_SUBMAT_TYPE,
            'fulltextKind': FULLTEXT_KIND,
        },
        'searchUrl': SEARCH,
        'detailUrl': DETAIL,
        'originalCheckUrl': ORIGINAL_CHECK,
        'search': {},
        'detail': {},
        'searchTargetWindows': [],
        'detailTargetWindows': [],
        'scriptUrls': [],
        'sources': [],
        'tuplePresentOnSearchSurface': False,
        'docControlNo': None,
        'originalCheck': None,
        'originalCheckBody': None,
    }

    smeta, sbody = fetch(opener, SEARCH)
    report['search'] = smeta
    search_text = decode(sbody) if sbody else ''
    report['searchTargetWindows'] = target_call_windows(search_text)
    search_joined = ' '.join(report['searchTargetWindows'])
    expected_tuple = (CONTROL_NO, P_MAT_TYPE, P_SUBMAT_TYPE, FULLTEXT_KIND)
    report['tuplePresentOnSearchSurface'] = all(v in search_joined for v in expected_tuple)
    report['sources'].append(inspect_source(smeta.get('finalUrl') or SEARCH, search_text))

    meta, body = fetch(opener, DETAIL, referer=SEARCH)
    report['detail'] = meta
    text = decode(body) if body else ''
    assert CONTROL_NO in text
    assert P_MAT_TYPE in text
    assert AUTHOR in text or TITLE_SIGNAL in text or '적천수' in text
    report['detailTargetWindows'] = target_call_windows(text)
    report['sources'].append(inspect_source(meta.get('finalUrl') or DETAIL, text))

    script_urls: list[str] = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        url = urljoin(meta.get('finalUrl') or DETAIL, html.unescape(raw))
        if url not in script_urls:
            script_urls.append(url)
    report['scriptUrls'] = script_urls

    for url in script_urls[:100]:
        jm, jb = fetch(opener, url, referer=DETAIL)
        if not jb:
            continue
        jt = decode(jb)
        low = jt.lower()
        if not any(k in low for k in ('fulltextdownload', 'openfulltext', 'originalcheck', '/search/download/')):
            continue
        rec = inspect_source(jm.get('finalUrl') or url, jt)
        rec['meta'] = jm
        report['sources'].append(rec)

    doc_control_no = extract_doc_control_no(text)
    report['docControlNo'] = doc_control_no
    if doc_control_no:
        payload = urlencode({'controlNo': doc_control_no, 'docType': 'T'}).encode('ascii')
        om, ob = fetch(opener, ORIGINAL_CHECK, data=payload, referer=DETAIL)
        report['originalCheck'] = om
        report['originalCheckBody'] = compact(decode(ob), 4000) if ob else None

    path = OUT / 'riss-dispatcher.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')

    focused = {
        'target': report['target'],
        'search': report['search'],
        'detail': report['detail'],
        'tuplePresentOnSearchSurface': report['tuplePresentOnSearchSurface'],
        'searchTargetWindows': report['searchTargetWindows'],
        'detailTargetWindows': report['detailTargetWindows'],
        'docControlNo': report['docControlNo'],
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

    # Search surface is expected to expose the exact tuple discovered in the prior run;
    # this assertion is now correctly scoped to that surface rather than the detail wrapper.
    assert report['tuplePresentOnSearchSurface'], 'exact target fulltext tuple disappeared from RISS search surface'
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
