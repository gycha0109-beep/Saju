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
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

OUT = Path('acquisition-park-hyeyoung-2018')
OUT.mkdir(exist_ok=True)
TITLE = '명리학 통변의 다양성 모색에 관한 연구 : 육친론을 중심으로'
AUTHOR = '박혜영'
YEAR = '2018.2'

# Public NANET entry point. Prime this first so the subsequent same-origin AJAX
# result request gets the ordinary anonymous session cookies authored by NANET.
ENTRY_URL = 'https://dl.nanet.go.kr/'

# Public NANET institution-search result URL surfaced for 경기대학교 예술대학원,
# page 6. The visible result row contains Park Hyeyoung as item 58 with
# 전자자료 / 원문보기 / 다운로드. This URL is not an opaque record identifier.
SEARCH_URL = (
    'https://dl.nanet.go.kr/search/searchInnerList.do?'
    'bestMeterialSearchQuery=%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90+%EC%98%88%EC%88%A0%EB%8C%80%ED%95%99%EC%9B%90%3AALL_NI_TOC%3AAND'
    '&branchCode=ALL&dpBranch=ALL&hanjaYn=Y&navigationSize=5&nopMenu=REFD&orderBy=WEIGHT'
    '&pageNum=6&pageSize=10'
    '&queryText=%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90+%EC%98%88%EC%88%A0%EB%8C%80%ED%95%99%EC%9B%90%3APUB_WS%5EDP_PUB_WS%3AAND'
    '&refineSearchYn=N&resultType=INNER_SEARCH_LIST&searchClass=S'
    '&searchQuery=%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90+%EC%98%88%EC%88%A0%EB%8C%80%ED%95%99%EC%9B%90'
    '&searchType=INNER_SEARCH&seqNo=0&totalSize=95&totalSizeByMenu=95&userClass=0&zone=PUB_WS%5EDP_PUB_WS'
)
UA = 'Mozilla/5.0 (compatible; Saju-Research-Acquisition/2.1; Park-Hyeyoung-NANET-public-only)'
ALLOWED_HOSTS = {'dl.nanet.go.kr', 'docviewer.nanet.go.kr'}
MAX = 10 * 1024 * 1024


class RedirectRecorder(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append({'code': code, 'url': newurl})
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def decode(b: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return b.decode(enc)
        except UnicodeDecodeError:
            pass
    return b.decode('utf-8', errors='replace')


def sha256(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def allowed(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() in ALLOWED_HOSTS


def fetch(opener, rr, url: str, *, referer: str | None = None, limit: int = MAX):
    assert allowed(url), url
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/javascript,text/javascript,application/json,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9',
        'Connection': 'close',
    }
    if '/search/searchInnerList.do' in url:
        # This is the site's normal same-origin AJAX result fragment request.
        headers['Accept'] = 'text/html, */*; q=0.01'
        headers['X-Requested-With'] = 'XMLHttpRequest'
    if referer:
        headers['Referer'] = referer
    last = None
    for attempt in range(1, 4):
        rr.chain.clear()
        meta = {
            'requestedUrl': url,
            'status': None,
            'finalUrl': None,
            'redirectChain': [],
            'contentType': None,
            'bytes': 0,
            'sha256': None,
            'attempt': attempt,
            'error': None,
        }
        try:
            with opener.open(Request(url, headers=headers), timeout=40) as resp:
                b = resp.read(limit)
                meta.update(
                    status=getattr(resp, 'status', None),
                    finalUrl=resp.geturl(),
                    redirectChain=list(rr.chain),
                    contentType=resp.headers.get('Content-Type', ''),
                    bytes=len(b),
                    sha256=sha256(b),
                )
                return meta, b, decode(b)
        except Exception as exc:
            meta['error'] = f'{type(exc).__name__}: {exc}'
            last = meta
            time.sleep(attempt)
    return last, b'', ''


def script_urls(text: str, base: str, host: str) -> list[str]:
    out = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        u = urljoin(base, html.unescape(raw))
        if (urlparse(u).hostname or '').lower() == host and u not in out:
            out.append(u)
    return out[:30]


def row_contexts(text: str) -> list[dict]:
    occurrences = []
    pos = 0
    while True:
        i = text.find(TITLE, pos)
        if i < 0:
            break
        # Prefer a DOM result-container boundary over a blind fixed window.
        starts = [text.rfind(tag, max(0, i - 30000), i) for tag in ('<li', '<tr', '<div')]
        start = max([x for x in starts if x >= 0], default=max(0, i - 12000))
        ends = [x for x in (text.find('</li>', i), text.find('</tr>', i)) if x >= 0 and x - i < 40000]
        end = min(ends, default=min(len(text), i + 20000))
        frag = text[start:end + 6]
        controls = sorted(set(re.findall(r'KDMT\d+', frag)))
        calls = []
        for pat in [
            r'viewDoc\([^\)]{0,800}\)',
            r'downloadDoc\([^\)]{0,800}\)',
            r'goDetail\([^\)]{0,800}\)',
            r'detailView\([^\)]{0,800}\)',
        ]:
            calls += re.findall(pat, frag, re.I | re.S)
        occurrences.append({
            'offset': i,
            'authorObserved': AUTHOR in frag,
            'yearObserved': YEAR in frag or '2018' in frag,
            'controls': controls,
            'calls': [re.sub(r'\s+', ' ', c).strip()[:1200] for c in calls[:20]],
            'snippet': re.sub(r'\s+', ' ', html.unescape(frag)).strip()[:12000],
        })
        pos = i + len(TITLE)
    return occurrences


def main():
    jar = CookieJar()
    rr = RedirectRecorder()
    opener = build_opener(HTTPCookieProcessor(jar), rr)
    rep = {
        'candidate': {'title': TITLE, 'author': AUTHOR, 'year': 2018},
        'entryUrl': ENTRY_URL,
        'searchUrl': SEARCH_URL,
        'guessedOpaqueIdentifierCount': 0,
        'contentAssetActionExecuted': False,
        'drmRequestExecuted': False,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'entry': {},
        'search': {},
        'detail': {},
        'innerJs': {},
        'viewer': {},
        'docviewer': {},
        'fullLengthPdfAcquired': False,
    }

    # 0) Establish only the ordinary anonymous NANET session. No login/auth call.
    em, eb, et = fetch(opener, rr, ENTRY_URL, limit=750_000)
    rep['entry'] = {
        'meta': em,
        'cookieNames': sorted({c.name for c in jar}),
    }

    # 1) Fetch the exact public institution-search result fragment as a normal
    # same-origin AJAX call using the anonymous session established above.
    sm, sb, st = fetch(opener, rr, SEARCH_URL, referer=ENTRY_URL)
    if st:
        (OUT / 'nanet-search.html').write_text(st, encoding='utf-8')
    occ = row_contexts(st) if st else []
    (OUT / 'nanet-occurrence-contexts.json').write_text(
        json.dumps(occ, ensure_ascii=False, indent=2), encoding='utf-8'
    )
    exact = [o for o in occ if o['authorObserved'] and o['yearObserved']]
    controls = sorted(set(c for o in exact for c in o['controls']))
    search_fetch_succeeded = bool(sm and sm.get('status') == 200 and st)
    rep['search'] = {
        'meta': sm,
        'fetchSucceeded': search_fetch_succeeded,
        'titleOccurrenceCount': len(occ),
        'exactRowOccurrenceCount': len(exact),
        'exactRowControls': controls,
        'exactRowCalls': [c for o in exact for c in o['calls']],
    }

    # Never equate transport failure with absence of a public target/control.
    if not search_fetch_succeeded:
        rep['exactControl'] = None
        rep['controlResolutionDisposition'] = 'PUBLIC_SEARCH_FETCH_UNAVAILABLE'
    elif len(controls) == 1:
        rep['exactControl'] = controls[0]
        rep['controlResolutionDisposition'] = 'EXACT_PUBLIC_SEARCH_ROW_CONTROL_RESOLVED'
    else:
        rep['exactControl'] = None
        rep['controlResolutionDisposition'] = 'NO_UNIQUE_EXACT_PUBLIC_SEARCH_ROW_CONTROL'

    # 2) Only a unique control visibly co-located with title+author+year is
    # admissible for target detail/viewer navigation.
    if rep['exactControl']:
        control = rep['exactControl']
        detail_url = f'https://dl.nanet.go.kr/detail/{control}'
        dm, db, dt = fetch(opener, rr, detail_url, referer=SEARCH_URL)
        if dt:
            (OUT / 'nanet-detail.html').write_text(dt, encoding='utf-8')
        view_pat = rf"viewDoc\([^\)]*['\"]{re.escape(control)}['\"][^\)]*['\"]1['\"]"
        down_pat = rf"downloadDoc\([^\)]*['\"]{re.escape(control)}['\"][^\)]*['\"]1['\"]"
        rep['detail'] = {
            'url': detail_url,
            'meta': dm,
            'titleObserved': TITLE in dt or '명리학 통변의 다양성 모색에 관한 연구' in dt,
            'authorObserved': AUTHOR in dt,
            'controlObserved': control in dt,
            'viewButtonObserved': bool(re.search(view_pat, dt, re.I)),
            'downloadButtonObserved': bool(re.search(down_pat, dt, re.I)),
        }

        # Only current public NANET-owned dispatcher source.
        inner = 'https://dl.nanet.go.kr/script/search/inner.js'
        im, ib, it = fetch(opener, rr, inner, referer=detail_url, limit=4_000_000)
        if it:
            (OUT / 'nanet-inner.js').write_text(it, encoding='utf-8')
        dispatcher = bool(
            'viewDocBySingleCount' in it
            and '/view/callViewer.do' in it
            and 'orgId=dl' in it
            and 'linkSysId=NADL' in it
        )
        login_gate = bool(
            'downloadDoc' in it
            and ('!isLogin' in it or 'isLogin' in it)
            and '/login.do' in it
        )
        rep['innerJs'] = {
            'meta': im,
            'viewerDispatcherObserved': dispatcher,
            'downloadLoginGateObserved': login_gate,
        }

        # Never execute download. Anonymous viewer bootstrap only if detail
        # authors the exact view button and current dispatcher is explicit.
        if (
            rep['detail']['titleObserved']
            and rep['detail']['authorObserved']
            and rep['detail']['viewButtonObserved']
            and dispatcher
        ):
            vu = (
                'https://dl.nanet.go.kr/view/callViewer.do?'
                f'controlNo={control}&orgId=dl&linkSysId=NADL'
            )
            vm, vb, vt = fetch(opener, rr, vu, referer=detail_url, limit=2_000_000)
            if vt:
                (OUT / 'nanet-viewer-bootstrap.html').write_text(vt, encoding='utf-8')
            hops = []
            for pat in [
                r"location\.replace\(\s*['\"]([^'\"]+)",
                r"location\.href\s*=\s*['\"]([^'\"]+)",
            ]:
                for raw in re.findall(pat, vt, re.I):
                    u = urljoin(vm.get('finalUrl') or vu, html.unescape(raw))
                    if u not in hops:
                        hops.append(u)
            rep['viewer'] = {'url': vu, 'meta': vm, 'nextHops': hops}
            dv = [u for u in hops if (urlparse(u).hostname or '').lower() == 'docviewer.nanet.go.kr']
            if dv:
                du = dv[0]
                xm, xb, xt = fetch(opener, rr, du, referer=vu, limit=3_000_000)
                if xt:
                    (OUT / 'docviewer-bootstrap.html').write_text(xt, encoding='utf-8')
                union = xt
                fetched_scripts = []
                for su in script_urls(xt, xm.get('finalUrl') or du, 'docviewer.nanet.go.kr'):
                    jm, jb, jt = fetch(opener, rr, su, referer=du, limit=8_000_000)
                    fetched_scripts.append(jm)
                    if jt:
                        union += '\n' + jt
                signals = []
                for token in [
                    'VUE_APP_MORE_PATH',
                    'VUE_APP_USE_SEC',
                    'drm',
                    'aes-256-cbc',
                    '/docinfo/',
                    '/page/',
                    '/pagec/',
                    '/regDoc',
                ]:
                    if token.lower() in union.lower():
                        signals.append(token)
                protected = any(
                    x.lower() in {'vue_app_more_path', 'vue_app_use_sec', 'drm', 'aes-256-cbc'}
                    for x in signals
                )
                rep['docviewer'] = {
                    'url': du,
                    'meta': xm,
                    'scriptFetches': fetched_scripts,
                    'protectedContentSignals': signals,
                    'disposition': (
                        'DRM_OR_DEDICATED_VIEWER_SIGNAL_OBSERVED_STOP_NO_REPLAY'
                        if protected
                        else 'PUBLIC_VIEWER_STATIC_ONLY_NO_CONTENT_REPLAY'
                    ),
                }

    (OUT / 'nanet-report.json').write_text(
        json.dumps(rep, ensure_ascii=False, indent=2), encoding='utf-8'
    )
    print(json.dumps({
        'entryStatus': rep.get('entry', {}).get('meta', {}).get('status'),
        'entryCookieNames': rep.get('entry', {}).get('cookieNames', []),
        'searchFetchSucceeded': rep['search'].get('fetchSucceeded'),
        'searchError': rep['search'].get('meta', {}).get('error'),
        'titleOccurrenceCount': rep['search'].get('titleOccurrenceCount'),
        'exactRowOccurrenceCount': rep['search'].get('exactRowOccurrenceCount'),
        'exactRowControls': rep['search'].get('exactRowControls'),
        'exactControl': rep.get('exactControl'),
        'controlResolutionDisposition': rep.get('controlResolutionDisposition'),
        'detail': rep.get('detail'),
        'innerJs': rep.get('innerJs'),
        'viewerNextHops': rep.get('viewer', {}).get('nextHops', []),
        'docviewerDisposition': rep.get('docviewer', {}).get('disposition'),
        'protectedContentSignals': rep.get('docviewer', {}).get('protectedContentSignals', []),
        'contentAssetActionExecuted': False,
        'drmRequestExecuted': False,
        'guessedOpaqueIdentifierCount': 0,
    }, ensure_ascii=False, indent=2))

    assert rep['guessedOpaqueIdentifierCount'] == 0
    assert rep['contentAssetActionExecuted'] is False
    assert rep['drmRequestExecuted'] is False
    assert rep['loginBypass'] is False
    assert rep['institutionAuthBypass'] is False
    assert rep['paywallBypass'] is False
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
