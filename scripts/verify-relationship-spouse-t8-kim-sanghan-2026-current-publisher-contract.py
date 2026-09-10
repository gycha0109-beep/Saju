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

OUT = Path('acquisition-kim-sanghan-2026-recheck')
OUT.mkdir(exist_ok=True)
BASE = 'https://brhistory.re.kr'
PAGE = BASE + '/subList/32000003815'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Kim-Sanghan-current-contract-preflight)'
ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()))


def fetch(url: str, *, referer: str | None = None, timeout: int = 25, max_bytes: int = 3_000_000):
    assert (urlparse(url).hostname or '').lower() in {'brhistory.re.kr', 'www.brhistory.re.kr'}
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/javascript,*/*;q=0.8'}
    if referer:
        headers['Referer'] = referer
    with opener.open(Request(url, headers=headers), timeout=timeout) as resp:
        body = resp.read(max_bytes + 1)
        assert len(body) <= max_bytes
        return {
            'url': url,
            'finalUrl': resp.geturl(),
            'status': getattr(resp, 'status', None),
            'contentType': resp.headers.get('Content-Type', ''),
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
        }, body


def decode(data: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return data.decode(enc)
        except Exception:
            pass
    return data.decode('utf-8', errors='replace')


def links(base: str, text: str) -> list[str]:
    out = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        u = urljoin(base, raw)
        if u not in out:
            out.append(u)
    return out


def named_value(text: str, name: str) -> str | None:
    for pat in [
        rf'<input\b[^>]*(?:name|id)=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)',
        rf'<input\b[^>]*value=["\']([^"\']*)["\'][^>]*(?:name|id)=["\']{re.escape(name)}["\']',
        rf'\b{re.escape(name)}\b\s*[:=]\s*["\']([^"\']+)["\']',
    ]:
        m = re.search(pat, text, re.I | re.S)
        if m:
            return html.unescape(m.group(1)).strip()
    return None


def post_observed(text: str, endpoint: str) -> bool:
    for m in re.finditer(re.escape(endpoint), text, re.I):
        window = text[max(0, m.start() - 2500): min(len(text), m.end() + 2500)]
        if re.search(r'(?:type|method)\s*[:=]\s*["\']POST["\']', window, re.I):
            return True
    return False


meta, body = fetch(PAGE)
text = decode(body, meta['contentType'])
(OUT / 'current-publisher-contract-entry.html').write_text(text, encoding='utf-8')
union = text
scripts = []
for u in links(meta['finalUrl'], text):
    host = (urlparse(u).hostname or '').lower()
    if host in {'brhistory.re.kr', 'www.brhistory.re.kr'} and (u.lower().endswith('.js') or '.js?' in u.lower()):
        try:
            sm, sb = fetch(u, referer=meta['finalUrl'])
            st = decode(sb, sm['contentType'])
            union += '\n' + st
            scripts.append({**sm, 'sourceUrl': u})
        except Exception as exc:
            scripts.append({'sourceUrl': u, 'error': f'{type(exc).__name__}: {exc}'})

book_ep = '/module/thesis/selectKyoboThesisBookListAjax.ink'
article_ep = '/module/thesis/selectKyoboThesisNttListAjax.ink'
values = {k: named_value(union, k) for k in [
    'journalCd', 'trgtIsuInsttCd', 'trgtUseLangCode', 'searchCd', 'searchCondition', 'reFlag', 'strQuery'
]}
report = {
    'entry': meta,
    'scriptCount': len(scripts),
    'scripts': scripts,
    'bookListEndpointObserved': book_ep in union,
    'bookListPostObserved': post_observed(union, book_ep),
    'articleListEndpointObserved': article_ep in union,
    'articleListPostObserved': post_observed(union, article_ep),
    'fnViewPdfObserved': 'fnViewPdf' in union,
    'builderDownloadObserved': 'builderDownload' in union,
    'values': values,
    'allRequiredCurrentValuesObserved': all(values.values()),
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
}
(OUT / 'current-publisher-contract-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({k: report[k] for k in [
    'bookListEndpointObserved', 'bookListPostObserved', 'articleListEndpointObserved',
    'articleListPostObserved', 'fnViewPdfObserved', 'builderDownloadObserved',
    'values', 'allRequiredCurrentValuesObserved'
]}, ensure_ascii=False, indent=2))

assert report['bookListEndpointObserved'] is True
assert report['bookListPostObserved'] is True
assert report['articleListEndpointObserved'] is True
assert report['articleListPostObserved'] is True
assert report['allRequiredCurrentValuesObserved'] is True
assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
