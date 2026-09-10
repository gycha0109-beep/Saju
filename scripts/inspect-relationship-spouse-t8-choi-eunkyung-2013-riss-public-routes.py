#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

ROOT = Path('acquisition-choi-eunkyung-2013')
REPORT = ROOT / 'report.json'
EXPECTED_CONTROL = 'a2d2aa37279fbaaaffe0bdc3ef48d419'
EXPECTED_RISS_ID = 'T13097800'
AUTHOR = '최은경'
TITLE_SIGNALS = ('傷官', '六親論')
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Choi-Eunkyung-2013-public-routes)'

ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()))


def sha(body: bytes) -> str:
    return hashlib.sha256(body).hexdigest()


def decode(body: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def fetch(url: str, referer: str | None = None, timeout: int = 30, max_bytes: int = 5_000_000):
    assert (urlparse(url).hostname or '').lower() in {'www.riss.kr', 'riss.kr'}
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/json,*/*;q=0.8'}
    if referer:
        headers['Referer'] = referer
    with opener.open(Request(url, headers=headers), timeout=timeout) as resp:
        body = resp.read(max_bytes + 1)
        assert len(body) <= max_bytes
        return {'requestedUrl': url, 'finalUrl': resp.geturl(), 'status': getattr(resp, 'status', None), 'contentType': resp.headers.get('Content-Type', ''), 'bytes': len(body), 'sha256': sha(body)}, body


def links(base: str, text: str) -> list[str]:
    out: list[str] = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        u = urljoin(base, raw)
        if u not in out:
            out.append(u)
    return out


j = json.loads(REPORT.read_text(encoding='utf-8'))
row = j['resolvedExactRow']
assert row['control'] == EXPECTED_CONTROL
assert row['rissId'] == EXPECTED_RISS_ID
assert row['identityObserved'] is True
url = row['detailUrl']
meta, body = fetch(url)
text = decode(body, meta['contentType'])
(ROOT / 'riss-detail.html').write_text(text, encoding='utf-8')
assert AUTHOR in text and EXPECTED_RISS_ID in text and all(sig in text for sig in TITLE_SIGNALS)
expected_tuple = row['fulltextTuple']
assert expected_tuple['control_no'] == EXPECTED_CONTROL

script_urls: list[str] = []
for u in links(meta['finalUrl'], text):
    host = (urlparse(u).hostname or '').lower()
    if host in {'www.riss.kr', 'riss.kr'} and (u.lower().endswith('.js') or '.js?' in u.lower()) and u not in script_urls:
        script_urls.append(u)

union = text
fetches = []
material = []
for i, u in enumerate(script_urls[:45], 1):
    try:
        sm, sb = fetch(u, meta['finalUrl'], 20, 3_000_000)
        st = decode(sb, sm['contentType'])
        union += '\n' + st
        fetches.append({**sm, 'sourceUrl': u, 'error': None})
        if 'fulltextDownload' in st or 'originalCheck' in st:
            fn = ROOT / f'riss-script-{i:02d}.txt'
            fn.write_text(st, encoding='utf-8')
            material.append(fn.name)
    except Exception as exc:
        fetches.append({'sourceUrl': u, 'error': f'{type(exc).__name__}: {exc}'})

site_dispatch = 'function fulltextDownload()' in union and '/search/download/FullTextDownload.do?' in union and 'jQuery(form).serialize()' in union
out = {
    'candidate': j['candidate'],
    'exactRow': {'control': EXPECTED_CONTROL, 'rissId': EXPECTED_RISS_ID, 'fulltextTuple': expected_tuple},
    'detail': meta,
    'rissStaticInspection': {
        'referencedScriptCount': len(script_urls),
        'scriptFetches': fetches,
        'siteAuthoredDispatcherImplementationObserved': site_dispatch,
        'originalCheckContractObserved': 'originalCheck.do' in union and 'controlNo' in union,
        'materialScriptFiles': material,
    },
    'fullLengthPdfAcquired': False,
    'contentDownloadExecuted': False,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'crossSourceSemanticStitching': False,
    'semanticDisposition': 'RISS_EXACT_DISPATCHER_READY_FOR_SINGLE_REPLAY' if site_dispatch else 'NO_SITE_AUTHORED_DISPATCHER_STOP',
}
(ROOT / 'public-route-report.json').write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(out, ensure_ascii=False, indent=2))
assert site_dispatch, out['semanticDisposition']
assert out['guessedOpaqueIdentifierCount'] == 0
assert out['loginBypass'] is False and out['institutionAuthBypass'] is False and out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False and out['decryptionActionExecuted'] is False
