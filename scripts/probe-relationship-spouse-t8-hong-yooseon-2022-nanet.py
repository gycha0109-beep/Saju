#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import math
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-hong-yooseon-2022')
OUT.mkdir(exist_ok=True)

AUTHOR = '홍유선'
TITLE = '이데올로기적 접근을 통한 육친 간 상극관계 해석'
TITLE_ANCHOR = '이데올로기적 접근'
PUBLISHER = '아시아문화콘텐츠연구소'
ISSUE = '제2권 제2호'
PAGES = '75-89'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/18.2; public-resource-verification)'
MAX = 8 * 1024 * 1024
PAGE_SIZE = 10
# The indexed public search surface reported totalSize=36. Four normal public
# result pages therefore exhaust the result set without guessing any record id.
INDEXED_TOTAL_SIZE = 36
MAX_PUBLIC_PAGES = math.ceil(INDEXED_TOTAL_SIZE / PAGE_SIZE)

BASE_SEARCH_PARAMS = {
    'bestMeterialSearchQuery': f'{PUBLISHER}:ALL_NI_TOC:AND',
    'branchCode': 'ALL',
    'dpBranch': 'ALL',
    'hanjaYn': 'Y',
    'navigationSize': '5',
    'nopMenu': 'REFD',
    'orderBy': 'WEIGHT',
    'pageSize': str(PAGE_SIZE),
    'queryText': f'{PUBLISHER}:PUB^PUB_WS^DP_PUB_WS:AND',
    'refineSearchYn': 'N',
    'resultType': 'INNER_SEARCH_LIST',
    'rspTime': '0.612',
    'searchClass': 'S',
    'searchQuery': PUBLISHER,
    'searchType': 'INNER_SEARCH',
    'seqNo': '0',
    'totalSize': str(INDEXED_TOTAL_SIZE),
    'totalSizeByMenu': str(INDEXED_TOTAL_SIZE),
    'userClass': '0',
    'zone': 'PUB^PUB_WS^DP_PUB_WS',
}


def search_url(page_num: int) -> str:
    params = {**BASE_SEARCH_PARAMS, 'pageNum': str(page_num)}
    return 'https://dl.nanet.go.kr/search/searchInnerList.do?' + urlencode(params)


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 20000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def fetch(opener, url: str, referer: str | None = None) -> tuple[dict, str]:
    host = (urlparse(url).hostname or '').lower()
    assert host == 'dl.nanet.go.kr' or host.endswith('.nanet.go.kr'), f'outside NANET boundary: {url}'
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/json,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
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
        with opener.open(Request(url, headers=headers), timeout=40) as resp:
            body = resp.read(MAX)
            meta.update({
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
            })
            return meta, decode(body)
    except Exception as exc:
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, ''


def target_window(text: str) -> str:
    for needle in (TITLE, TITLE_ANCHOR):
        idx = text.find(needle)
        if idx >= 0:
            return text[max(0, idx - 22000):min(len(text), idx + 42000)]
    return ''


def target_observed(text: str) -> bool:
    if not text:
        return False
    normalized = compact(text, len(text))
    if TITLE_ANCHOR not in normalized:
        return False
    tw = compact(target_window(text), 64000)
    return (
        AUTHOR in tw
        and ('75-89' in tw or '75~89' in tw or '75 - 89' in tw)
        and ('문화' in tw or PUBLISHER in tw)
    )


def observed_routes(window: str, base: str) -> list[dict]:
    found: dict[str, set[str]] = {}

    def add(raw: str, basis: str) -> None:
        raw = html.unescape(raw).strip().rstrip(').,;')
        if not raw:
            return
        url = urljoin(base, raw)
        host = (urlparse(url).hostname or '').lower()
        if not (host == 'dl.nanet.go.kr' or host.endswith('.nanet.go.kr')):
            return
        found.setdefault(url, set()).add(basis)

    for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', window, re.I):
        add(raw, 'target-window-html-attribute')
    for raw in re.findall(r'''["']([^"'\r\n]{1,1800})["']''', window):
        if raw.startswith('/') or raw.startswith('http'):
            if re.search(r'detail|searchdetail|original|download|viewer|view|file|content|login', raw, re.I):
                add(raw, 'target-window-script-literal')

    return [
        {'url': url, 'basis': sorted(bases)}
        for url, bases in sorted(found.items())
    ]


def extract_calls(window: str) -> list[str]:
    calls: list[str] = []
    for m in re.finditer(r'([A-Za-z_$][\w$]{1,80})\s*\(([^;\n]{0,1200})\)', window):
        name = m.group(1)
        args = m.group(2)
        if re.search(r'original|download|view|detail|article|content|login|file', name + ' ' + args, re.I):
            value = compact(m.group(0), 1600)
            if value not in calls:
                calls.append(value)
        if len(calls) >= 100:
            break
    return calls


def access_signals(text: str) -> dict:
    return {
        'login': bool(re.search(r'로그인|login|로그인 후|회원', text, re.I)),
        'onsite': bool(re.search(r'서울관|전자자료|정기간행물실|국회도서관 내|도서관 내|관내', text, re.I)),
        'institution': bool(re.search(r'협정기관|기관.*인증|소속기관', text, re.I)),
        'downloadLabel': '다운로드' in text,
        'originalViewLabel': '원문보기' in text,
        'drmOrViewer': bool(re.search(r'DRM|전용.?뷰어|viewer|ezPDF|Fasoo', text, re.I)),
    }


def detail_candidates(routes: list[dict]) -> list[str]:
    out: list[str] = []
    for item in routes:
        url = item['url']
        low = url.lower()
        # Metadata/detail navigation only. Never execute original/download/viewer/content actions.
        if ('searchdetailview.do' in low or '/detail/' in low) and not re.search(r'original|download|viewer|file|content', low, re.I):
            if url not in out:
                out.append(url)
    return out[:10]


def observed_ids(window: str) -> list[str]:
    ids: set[str] = set()
    for pat in (
        r'\b(KINX\d{6,})\b',
        r'\b(KDMT\d{6,})\b',
        r'\b(MONO\d{6,})\b',
        r'[?&](?:cn|controlNo|control_no|sysid|articleId|article_id)=([A-Za-z0-9._:-]{5,120})',
    ):
        ids.update(re.findall(pat, window, re.I))
    return sorted(ids)


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'National Assembly Library public pagination and exact-record/control inspection for Hong Yooseon 2022; no protected content action or authentication bypass',
        'candidate': {
            'author': AUTHOR,
            'title': TITLE,
            'publisher': PUBLISHER,
            'issue': ISSUE,
            'printedPages': PAGES,
        },
        'indexedPublicSearchContract': {
            'indexedTotalSize': INDEXED_TOTAL_SIZE,
            'pageSize': PAGE_SIZE,
            'pagesExhaustivelyScanned': MAX_PUBLIC_PAGES,
        },
        'searchPages': [],
        'searchTargetObserved': False,
        'targetSearchPage': None,
        'targetWindow': None,
        'targetRoutes': [],
        'targetCalls': [],
        'searchAccessSignals': None,
        'detailProbes': [],
        'observedOpaqueIdentifiers': [],
        'liveSearchDisposition': 'TARGET_NOT_REPRODUCED_ON_CURRENT_LIVE_PUBLIC_PAGINATION',
        'guessedOpaqueIdentifierCount': 0,
        'contentActionExecuted': False,
    }

    target_html = ''
    target_meta = None
    target_page = None

    for page_num in range(1, MAX_PUBLIC_PAGES + 1):
        url = search_url(page_num)
        sm, st = fetch(opener, url)
        page_rec = {
            'pageNum': page_num,
            'meta': sm,
            'targetObserved': target_observed(st),
        }
        report['searchPages'].append(page_rec)
        if st:
            (OUT / f'nanet-search-page-{page_num}.html').write_text(st[:4_000_000], encoding='utf-8')
        if page_rec['targetObserved'] and not target_html:
            target_html = st
            target_meta = sm
            target_page = page_num

    if target_html:
        report['searchTargetObserved'] = True
        report['targetSearchPage'] = target_page
        report['liveSearchDisposition'] = 'TARGET_REPRODUCED_ON_CURRENT_LIVE_PUBLIC_PAGINATION'
        tw = target_window(target_html)
        report['targetWindow'] = compact(tw, 36000)
        report['targetRoutes'] = observed_routes(tw, target_meta.get('finalUrl') or search_url(target_page))
        report['targetCalls'] = extract_calls(tw)
        report['searchAccessSignals'] = access_signals(tw)
        report['observedOpaqueIdentifiers'] = observed_ids(tw)
        (OUT / 'nanet-target-window.txt').write_text(tw, encoding='utf-8')

        for url in detail_candidates(report['targetRoutes']):
            dm, dt = fetch(opener, url, target_meta.get('finalUrl') or search_url(target_page))
            dt_norm = compact(dt, len(dt)) if dt else ''
            rec = {
                'meta': dm,
                'targetIdentityObserved': bool(dt_norm and TITLE_ANCHOR in dt_norm and AUTHOR in dt_norm),
                'accessSignals': access_signals(dt) if dt else None,
                'routes': observed_routes(target_window(dt) if dt else '', dm.get('finalUrl') or url) if dt else [],
                'calls': extract_calls(target_window(dt) if dt else '') if dt else [],
            }
            report['detailProbes'].append(rec)
            if dt and rec['targetIdentityObserved']:
                (OUT / f'nanet-detail-{len(report["detailProbes"]):02d}.html').write_text(dt[:2_500_000], encoding='utf-8')

    (OUT / 'nanet-probe.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({
        'indexedPublicSearchContract': report['indexedPublicSearchContract'],
        'searchPages': report['searchPages'],
        'searchTargetObserved': report['searchTargetObserved'],
        'targetSearchPage': report['targetSearchPage'],
        'liveSearchDisposition': report['liveSearchDisposition'],
        'searchAccessSignals': report['searchAccessSignals'],
        'observedOpaqueIdentifiers': report['observedOpaqueIdentifiers'],
        'targetRoutes': report['targetRoutes'],
        'targetCalls': report['targetCalls'],
        'detailProbes': report['detailProbes'],
        'guessedOpaqueIdentifierCount': report['guessedOpaqueIdentifierCount'],
        'contentActionExecuted': report['contentActionExecuted'],
    }, ensure_ascii=False, indent=2))

    assert len(report['searchPages']) == MAX_PUBLIC_PAGES
    assert all(x['meta']['status'] == 200 for x in report['searchPages']), 'one or more NANET public pagination requests failed'
    assert report['guessedOpaqueIdentifierCount'] == 0
    assert report['contentActionExecuted'] is False
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
