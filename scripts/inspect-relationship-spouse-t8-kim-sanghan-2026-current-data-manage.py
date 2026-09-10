#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

OUT = Path('acquisition-kim-sanghan-2026-recheck')
OUT.mkdir(exist_ok=True)
BASE = 'https://brhistory.re.kr'
ENTRY = BASE + '/subList/32000003815'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Kim-Sanghan-2026-current-data-manage)'
ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()))


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def fetch(url: str, *, data: dict[str, str] | None = None, referer: str | None = None, timeout: int = 30, max_bytes: int = 8_000_000):
    assert (urlparse(url).hostname or '').lower() in {'brhistory.re.kr', 'www.brhistory.re.kr'}
    payload = urlencode(data).encode('utf-8') if data is not None else None
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/json,application/javascript,*/*;q=0.8'}
    if data is not None:
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        headers['X-Requested-With'] = 'XMLHttpRequest'
    if referer:
        headers['Referer'] = referer
    with opener.open(Request(url, data=payload, headers=headers), timeout=timeout) as resp:
        body = resp.read(max_bytes + 1)
        assert len(body) <= max_bytes
        return {
            'requestedUrl': url,
            'method': 'POST' if data is not None else 'GET',
            'finalUrl': resp.geturl(),
            'status': getattr(resp, 'status', None),
            'contentType': resp.headers.get('Content-Type', ''),
            'bytes': len(body),
            'sha256': sha256(body),
        }, body


def decode(data: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return data.decode(enc)
        except Exception:
            pass
    return data.decode('utf-8', errors='replace')


def literal_links(base: str, text: str) -> list[str]:
    out = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        u = urljoin(base, raw)
        if u not in out:
            out.append(u)
    return out


def contexts(text: str, tokens: list[str]) -> dict[str, list[str]]:
    result: dict[str, list[str]] = {}
    for token in tokens:
        windows = []
        for m in re.finditer(re.escape(token), text, re.I):
            w = re.sub(r'\s+', ' ', text[max(0, m.start() - 2500): min(len(text), m.end() + 4500)]).strip()
            if w not in windows:
                windows.append(w[:7000])
            if len(windows) >= 8:
                break
        result[token] = windows
    return result


entry_meta, entry_body = fetch(ENTRY)
entry_text = decode(entry_body, entry_meta['contentType'])
(OUT / 'current-publisher-entry-v2.html').write_text(entry_text, encoding='utf-8')

# Current page directly calls fnTabLink('dataManage','N','005') and directly authors the POST route/data.
assert re.search(r"fnTabLink\(\s*['\"]dataManage['\"]\s*,\s*['\"]N['\"]\s*,\s*['\"]005['\"]\s*\)", entry_text)
assert '/module/thesis/selectKyoboThesisNttListAjax.ink' in entry_text
route_pos = entry_text.find('/module/thesis/selectKyoboThesisNttListAjax.ink')
route_window = entry_text[max(0, route_pos - 4500): route_pos + 8000]
assert re.search(r"type\s*:\s*['\"]POST['\"]", route_window, re.I)
assert re.search(r"sysmoduleSeq\s*:\s*['\"]10000000221['\"]", route_window)
assert re.search(r"pubcNumYsno\s*:\s*pubcNumYsno", route_window)
assert re.search(r"var\s+journalCd\s*=\s*['\"]['\"]", route_window)

first_form = {
    'journalCd': '',
    'sysmoduleSeq': '10000000221',
    'pubcNumYsno': 'N',
}
first_url = BASE + '/module/thesis/selectKyoboThesisNttListAjax.ink'
first_meta, first_body = fetch(first_url, data=first_form, referer=entry_meta['finalUrl'])
first_text = decode(first_body, first_meta['contentType'])
(OUT / 'current-data-manage.html').write_text(first_text, encoding='utf-8')

# Fetch only scripts literally referenced by the current returned fragment.
script_fetches = []
union = first_text
for i, u in enumerate(literal_links(first_meta['finalUrl'], first_text), start=1):
    host = (urlparse(u).hostname or '').lower()
    if host not in {'brhistory.re.kr', 'www.brhistory.re.kr'} or not (u.lower().endswith('.js') or '.js?' in u.lower()):
        continue
    try:
        sm, sb = fetch(u, referer=first_meta['finalUrl'], timeout=20, max_bytes=3_000_000)
        st = decode(sb, sm['contentType'])
        union += '\n' + st
        script_fetches.append({**sm, 'sourceUrl': u, 'error': None})
        if any(x in st for x in ['selectKyoboThesisBookListAjax.ink', 'selectKyoboThesisNttListAjax.ink', 'fnViewPdf', 'builderDownload']):
            (OUT / f'current-data-script-{i:02d}.txt').write_text(st, encoding='utf-8')
    except Exception as exc:
        script_fetches.append({'sourceUrl': u, 'error': f'{type(exc).__name__}: {exc}'})

signals = [
    'selectKyoboThesisBookListAjax.ink',
    'selectKyoboThesisNttListAjax.ink',
    'selectKyoboThesisNttListPubcNumAjax.ink',
    'fnViewPdf',
    'builderDownload',
    'journalCd',
    'bookYear',
    'bookCd',
    'trgtIsuInsttCd',
    'trgtUseLangCode',
    'searchCd',
    'searchCondition',
    'reFlag',
    'strQuery',
    '3444',
    '20885',
    'SC00000016',
    '2026',
    '33',
    '제33호',
    '명리 고전 여명론',
    '김상한',
]
report = {
    'entry': entry_meta,
    'currentFirstStageContract': {
        'route': '/module/thesis/selectKyoboThesisNttListAjax.ink',
        'method': 'POST',
        'form': first_form,
        'directlyObservedOnCurrentEntry': True,
    },
    'firstStageResponse': first_meta,
    'scriptFetches': script_fetches,
    'signalCounts': {token: union.count(token) for token in signals},
    'contexts': contexts(union, signals),
    'contentActionExecuted': False,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'disposition': 'CURRENT_DATA_MANAGE_FRAGMENT_INSPECTED_READY_FOR_EXACT_DEEPER_CONTRACT_REVIEW',
}
(OUT / 'current-data-manage-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({
    'firstStageResponse': first_meta,
    'signalCounts': report['signalCounts'],
    'disposition': report['disposition'],
}, ensure_ascii=False, indent=2))

assert report['contentActionExecuted'] is False
assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
