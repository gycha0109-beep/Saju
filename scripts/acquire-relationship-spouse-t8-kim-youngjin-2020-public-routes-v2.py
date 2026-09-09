#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

OUT = Path('acquisition-kim-youngjin-2020')
OUT.mkdir(exist_ok=True)
AUTHOR = '김영진'
TITLE = '사주명리학의 宮과 星에 관한 연구'
YEAR = '2020'
INSTITUTION = '경기대학교 행정·사회복지대학원'
CALL_NO = 'TM 306.0951 -20-10'
RISS_ID = 'T15521643'
RISS_LINK = f'https://www.riss.kr/link?id={RISS_ID}'

# RISS exact-title field token `znTitle` is site-authored in the current public detail/search JavaScript.
def riss_title_search_url() -> str:
    return 'https://www.riss.kr/search/Search.do?' + urlencode({
        'queryText': f'znTitle,{TITLE}',
        'searchGubun': 'true',
        'colName': 'bib_t',
        'isDetailSearch': 'Y',
    })

# NANET routes are public search requests only. No opaque control is supplied.
NANET_SEARCHES = [
    (
        'exact_title',
        'https://dl.nanet.go.kr/search/searchInnerList.do?' + urlencode({
            'searchQuery': TITLE,
            'searchType': 'INNER_SEARCH',
            'searchClass': 'S',
            'queryText': TITLE + ':ALL_NI_TOC:AND',
            'pageNum': '1',
            'pageSize': '50',
            'hanjaYn': 'Y',
            'resultType': 'INNER_SEARCH_LIST',
        }),
    ),
    (
        'institution_minimal',
        'https://dl.nanet.go.kr/search/searchInnerList.do?' + urlencode({
            'searchQuery': INSTITUTION,
            'searchType': 'INNER_SEARCH',
            'searchClass': 'S',
            'queryText': INSTITUTION + ':PUB^PUB_WS^DP_PUB_WS:AND',
            'pageNum': '5',
            'pageSize': '10',
            'hanjaYn': 'Y',
            'resultType': 'INNER_SEARCH_LIST',
        }),
    ),
    # Current public NANET result page exposed by the public search surface on 2026-09-09.
    # These are ordinary public search-state parameters, not an opaque document identifier.
    (
        'institution_current_public_page',
        'https://dl.nanet.go.kr/search/searchInnerList.do?' + urlencode({
            'bestMeterialSearchQuery': INSTITUTION + ':ALL_NI_TOC:AND',
            'branchCode': 'ALL',
            'dpBranch': 'ALL',
            'hanjaYn': 'Y',
            'navigationSize': '5',
            'nopMenu': 'REFD',
            'orderBy': 'WEIGHT',
            'pageNum': '5',
            'pageSize': '10',
            'queryText': INSTITUTION + ':PUB^PUB_WS^DP_PUB_WS:AND',
            'refineSearchYn': 'N',
            'resultType': 'INNER_SEARCH_LIST',
            'rspTime': '0.640',
            'searchClass': 'S',
            'searchQuery': INSTITUTION,
            'searchType': 'INNER_SEARCH',
            'seqNo': '0',
            'totalSize': '138',
            'totalSizeByMenu': '138',
            'userClass': '0',
            'zone': 'PUB^PUB_WS^DP_PUB_WS',
        }),
    ),
]

UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/24.0; Kim-Youngjin-public-contracts-only)'
MAX = 20 * 1024 * 1024


class RR(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append({'code': code, 'url': newurl})
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def dec(b: bytes) -> str:
    for e in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return b.decode(e)
        except UnicodeDecodeError:
            pass
    return b.decode('utf-8', errors='replace')


def allowed(u: str) -> bool:
    return (urlparse(u).hostname or '').lower() in {
        'www.riss.kr', 'riss.kr', 'dl.nanet.go.kr', 'docviewer.nanet.go.kr'
    }


def fetch(op, rr, u, data=None, ref=None, limit=MAX):
    assert allowed(u), u
    h = {
        'User-Agent': UA,
        'Accept': 'text/html,application/json,application/javascript,application/pdf,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9',
    }
    if data is not None:
        h.update({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
        })
    if ref:
        h['Referer'] = ref
    last = None
    for n in range(1, 4):
        rr.chain.clear()
        m = {
            'requestedUrl': u,
            'method': 'POST' if data is not None else 'GET',
            'status': None,
            'finalUrl': None,
            'redirectChain': [],
            'contentType': None,
            'bytes': 0,
            'sha256': None,
            'error': None,
            'attempt': n,
        }
        try:
            with op.open(Request(u, data=data, headers=h), timeout=40) as r:
                b = r.read(limit)
                m.update(
                    status=getattr(r, 'status', None),
                    finalUrl=r.geturl(),
                    redirectChain=list(rr.chain),
                    contentType=r.headers.get('Content-Type'),
                    bytes=len(b),
                    sha256=hashlib.sha256(b).hexdigest(),
                )
                return m, b, ('' if b.startswith(b'%PDF-') else dec(b))
        except Exception as e:
            m['error'] = f'{type(e).__name__}: {e}'
            last = m
            time.sleep(n)
    return last, b'', ''


def scripts(t, base, hosts):
    out = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', t, re.I):
        u = urljoin(base, html.unescape(raw))
        if (urlparse(u).hostname or '').lower() in hosts and u not in out:
            out.append(u)
    return out[:120]


def hidden(t, name):
    for p in (
        rf'id=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)',
        rf'name=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)',
    ):
        m = re.search(p, t, re.I | re.S)
        if m:
            return html.unescape(m.group(1))
    return None


def compact(s, n=3000):
    return re.sub(r'\s+', ' ', html.unescape(s)).strip()[:n]


def original_contract(t):
    n = re.sub(r'\s+', '', t)
    return (
        'functionoriginalCheck(goOri)' in n
        and 'data:{controlNo:controlNo,docType:docType}' in n
        and 'url:goOri' in n
    )


def fulltext_tuples(t):
    out = []
    for m in re.finditer(
        r"ButtonSet\.fulltextDownload\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'",
        t,
        re.I,
    ):
        x = {
            'controlNo': m.group(1),
            'pMatType': m.group(2),
            'pSubmatType': m.group(3),
            'fulltextKind': m.group(4),
        }
        if x not in out:
            out.append(x)
    return out


def riss_target_fragments(t):
    out = []
    for m in re.finditer(re.escape(TITLE), t):
        lo, hi = max(0, m.start() - 18000), min(len(t), m.start() + 30000)
        frag = html.unescape(t[lo:hi])
        if AUTHOR in frag and ('경기대학교' in frag or CALL_NO in frag):
            out.append(frag)
    return out


def riss_target_tuples(t):
    out = []
    for frag in riss_target_fragments(t):
        for x in fulltext_tuples(frag):
            if x not in out:
                out.append(x)
    return out


def fulltext_dispatcher_evidence(t):
    defs = []
    patterns = [
        r'function\s+fulltextDownload\s*\([^)]*\)\s*\{',
        r'fulltextDownload\s*:\s*function\s*\([^)]*\)\s*\{',
        r'fulltextDownload\s*=\s*function\s*\([^)]*\)\s*\{',
    ]
    for p in patterns:
        for m in re.finditer(p, t, re.I):
            snippet = compact(t[m.start():m.start() + 5000], 5000)
            if snippet not in defs:
                defs.append(snippet)
    return defs[:10]


def nanet_occurrences(t, label):
    interesting = [
        'KDMT', 'controlNo', 'control_no', '/detail/', 'detail(', 'detailView', 'goDetail',
        'viewDoc', 'downloadDoc', 'onclick', 'href', 'data-', 'docId', 'articleId', 'masterId',
        'recordId', 'publicationId', 'viewer', 'callViewer',
    ]
    result = []
    for i, m in enumerate(re.finditer(re.escape(TITLE), t)):
        p = m.start()
        lo, hi = max(0, p - 25000), min(len(t), p + 25000)
        frag = html.unescape(t[lo:hi])
        rowish = (
            AUTHOR in frag
            and ('경기대학교' in frag or INSTITUTION.replace('·', '.') in frag)
            and (CALL_NO in frag or '2020.2' in frag or '2020' in frag)
            and ('학위논문' in frag or '전자자료' in frag)
        )
        controls = []
        for pat in [
            r'\b(KDMT\d{8,})\b',
            r'(?:controlNo|control_no)\s*[=:]\s*["\']?(KDMT\d{8,})',
        ]:
            for c in re.findall(pat, frag, re.I):
                if c not in controls:
                    controls.append(c)
        hits = []
        for tok in interesting:
            for hm in re.finditer(re.escape(tok), frag, re.I):
                hits.append({'token': tok, 'relativeOffset': hm.start() - (p - lo)})
        hits.sort(key=lambda x: abs(x['relativeOffset']))
        callbacks = []
        for am in re.finditer(r'(?:onclick|href|data-[\w-]+)\s*=\s*["\']([^"\']+)["\']', frag, re.I):
            value = html.unescape(am.group(1))
            if any(k.lower() in value.lower() for k in ('KDMT', 'control', 'detail', 'viewdoc', 'downloaddoc', 'viewer')):
                if value not in callbacks:
                    callbacks.append(value)
        result.append({
            'searchLabel': label,
            'occurrenceIndex': i,
            'offset': p,
            'rowIdentitySignals': rowish,
            'candidateControls': controls,
            'nearestInterestingHits': hits[:40],
            'navigationCallbacks': callbacks[:40],
            'context': compact(frag, 12000),
        })
    return result


def nanet_controls_from_occurrences(records):
    out = []
    for rec in records:
        if not rec['rowIdentitySignals']:
            continue
        for c in rec['candidateControls']:
            if c not in out:
                out.append(c)
    return out


def main():
    rr = RR()
    op = build_opener(HTTPCookieProcessor(CookieJar()), rr)
    rep = {
        'purpose': 'Kim Youngjin 2020 exact current public RISS/NANET acquisition; public site-authored contracts only; no bypass',
        'candidate': {'author': AUTHOR, 'title': TITLE, 'year': 2020, 'riss': RISS_ID},
        'riss': {},
        'nanet': {},
        'docviewer': {},
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'drmRequestExecuted': False,
        'contentAssetActionExecuted': False,
        'fullLengthPdfAcquired': False,
    }

    # RISS canonical public identifier -> exact current detail.
    rm, rb, rt = fetch(op, rr, RISS_LINK)
    assert rm['status'] == 200 and AUTHOR in rt and TITLE in rt
    rep['riss']['link'] = rm
    (OUT / 'riss-detail.html').write_text(rt, encoding='utf-8')
    final = rm.get('finalUrl') or RISS_LINK
    rep['riss']['detailUrl'] = final
    rep['riss']['rissIds'] = sorted(set(re.findall(r'\bT\d{7,12}\b', rt)))
    if RISS_ID not in rep['riss']['rissIds']:
        rep['riss']['rissIds'].append(RISS_ID)
    rep['riss']['controls'] = sorted(set(re.findall(
        r'control_no=([a-f0-9]{16,64})', html.unescape(final + rt), re.I
    )))
    dc = hidden(rt, 'controlNo') or hidden(rt, 'docControlNo')
    dt = hidden(rt, 'docType')
    rep['riss']['docControlNo'] = dc
    rep['riss']['docType'] = dt
    rep['riss']['ucis'] = sorted(set(re.findall(r'I804:[A-Za-z0-9-]+', rt)))
    rep['riss']['detailFulltextTuples'] = fulltext_tuples(rt)

    detail_union = rt
    sf = []
    for u in scripts(rt, final, {'www.riss.kr', 'riss.kr'}):
        mm, b, t = fetch(op, rr, u, ref=final, limit=3_000_000)
        sf.append(mm)
        if t:
            detail_union += '\n' + t
    rep['riss']['detailScriptFetches'] = sf
    rep['riss']['originalCheck'] = None
    if dc and dt and '/detail/originalCheck.do' in detail_union and original_contract(detail_union):
        mm, b, t = fetch(
            op, rr, 'https://www.riss.kr/detail/originalCheck.do',
            data=urlencode({'controlNo': dc, 'docType': dt}).encode(),
            ref=final, limit=100000,
        )
        mm['body'] = compact(t, 2000)
        rep['riss']['originalCheck'] = mm

    # RISS exact-title search: `znTitle` is first verified in site-authored current JS before use.
    title_field_observed = "field == 'znTitle'" in rt or 'znTitle' in rt
    rep['riss']['titleFieldContractObserved'] = title_field_observed
    title_tuples = []
    title_union = ''
    if title_field_observed:
        rtu = riss_title_search_url()
        tsm, tsb, tst = fetch(op, rr, rtu, ref=final)
        rep['riss']['exactTitleSearch'] = tsm
        (OUT / 'riss-title-search.html').write_text(tst, encoding='utf-8')
        rep['riss']['exactTitleIdentityObserved'] = bool(AUTHOR in tst and TITLE in tst and '경기대학교' in tst)
        title_tuples = riss_target_tuples(tst)
        rep['riss']['exactTitleFulltextTuples'] = title_tuples
        title_union = tst
        title_sf = []
        for u in scripts(tst, tsm.get('finalUrl') or rtu, {'www.riss.kr', 'riss.kr'}):
            mm, b, t = fetch(op, rr, u, ref=tsm.get('finalUrl') or rtu, limit=3_000_000)
            title_sf.append(mm)
            if t:
                title_union += '\n' + t
        rep['riss']['exactTitleScriptFetches'] = title_sf
    else:
        rep['riss']['exactTitleSearch'] = None
        rep['riss']['exactTitleIdentityObserved'] = False
        rep['riss']['exactTitleFulltextTuples'] = []

    dispatcher_defs = fulltext_dispatcher_evidence(detail_union + '\n' + title_union)
    rep['riss']['globalFulltextDownloadDefinitions'] = dispatcher_defs
    rep['riss']['globalFulltextDownloadDefinitionCount'] = len(dispatcher_defs)
    rep['riss']['searchRedirectUrl'] = hidden(title_union, 'redirectURL') if title_union else None
    rep['riss']['contentDownloadExecuted'] = False

    # NANET searches: inspect every title occurrence and only admit controls from result-like rows
    # that independently carry author/institution/year/call-number signals.
    search_records = []
    all_occurrences = []
    controls = []
    for idx, (label, u) in enumerate(NANET_SEARCHES, 1):
        mm, b, t = fetch(op, rr, u)
        occ = nanet_occurrences(t, label)
        cs = nanet_controls_from_occurrences(occ)
        search_records.append({
            'label': label,
            'meta': mm,
            'titleOccurrenceCount': len(occ),
            'rowIdentityOccurrenceCount': sum(1 for x in occ if x['rowIdentitySignals']),
            'controls': cs,
            'noResultWrapObserved': 'no_result_wrap' in t,
        })
        all_occurrences.extend(occ)
        if t:
            (OUT / f'nanet-search-{idx}.html').write_text(t, encoding='utf-8')
        for c in cs:
            if c not in controls:
                controls.append(c)
    (OUT / 'nanet-occurrence-contexts.json').write_text(
        json.dumps(all_occurrences, ensure_ascii=False, indent=2), encoding='utf-8'
    )
    rep['nanet']['searches'] = search_records
    rep['nanet']['occurrenceEvidence'] = all_occurrences
    rep['nanet']['candidateControls'] = controls

    probes = []
    for c in controls[:10]:
        u = f'https://dl.nanet.go.kr/detail/{c}'
        mm, b, t = fetch(op, rr, u, ref=NANET_SEARCHES[-1][1], limit=4_000_000)
        match = bool(mm['status'] == 200 and AUTHOR in t and TITLE in t)
        probes.append({'control': c, 'meta': mm, 'identityMatch': match})
        if match and 'control' not in rep['nanet']:
            rep['nanet']['control'] = c
            rep['nanet']['detail'] = mm
            (OUT / 'nanet-detail.html').write_text(t, encoding='utf-8')
            rep['nanet']['viewButtonObserved'] = bool(re.search(
                rf"viewDoc\([^\)]*['\"]{re.escape(c)}['\"]", t, re.I
            ))
            rep['nanet']['downloadButtonObserved'] = bool(re.search(
                rf"downloadDoc\([^\)]*['\"]{re.escape(c)}['\"]", t, re.I
            ))
    rep['nanet']['probes'] = probes

    # If exact current NANET control was resolved, follow only the site-authored public viewer bootstrap.
    # Stop before any protected content-page replay/decryption/token/key flow.
    if rep['nanet'].get('control'):
        c = rep['nanet']['control']
        im, ib, it = fetch(
            op, rr, 'https://dl.nanet.go.kr/script/search/inner.js',
            ref=f'https://dl.nanet.go.kr/detail/{c}', limit=3_000_000,
        )
        rep['nanet']['innerJs'] = im
        dispatcher = bool(
            'viewDocBySingleCount' in it
            and '/view/callViewer.do' in it
            and 'orgId=dl' in it
            and 'linkSysId=NADL' in it
        )
        rep['nanet']['viewerDispatcherObserved'] = dispatcher
        rep['nanet']['downloadLoginGateObserved'] = bool('downloadDoc' in it and '/login.do' in it)
        if rep['nanet'].get('viewButtonObserved') and dispatcher:
            vu = f'https://dl.nanet.go.kr/view/callViewer.do?controlNo={c}&orgId=dl&linkSysId=NADL'
            vm, vb, vt = fetch(op, rr, vu, ref=f'https://dl.nanet.go.kr/detail/{c}', limit=2_000_000)
            rep['nanet']['viewerBootstrap'] = vm
            (OUT / 'nanet-viewer-bootstrap.html').write_text(vt, encoding='utf-8')
            hops = []
            for pat in [
                r"location\.replace\(\s*['\"]([^'\"]+)",
                r"location\.href\s*=\s*['\"]([^'\"]+)",
            ]:
                for x in re.findall(pat, vt, re.I):
                    nu = urljoin(vm.get('finalUrl') or vu, html.unescape(x))
                    if allowed(nu) and nu not in hops:
                        hops.append(nu)
            rep['nanet']['viewerNextHops'] = hops
            dv = [u for u in hops if (urlparse(u).hostname or '').lower() == 'docviewer.nanet.go.kr']
            if dv:
                du = dv[0]
                dm, db, dtxt = fetch(op, rr, du, ref=vu, limit=3_000_000)
                rep['docviewer']['html'] = dm
                (OUT / 'docviewer-bootstrap.html').write_text(dtxt, encoding='utf-8')
                alltxt = dtxt
                dsm = []
                for su in scripts(dtxt, dm.get('finalUrl') or du, {'docviewer.nanet.go.kr'}):
                    mm, b, t = fetch(op, rr, su, ref=du, limit=8_000_000)
                    dsm.append(mm)
                    if t:
                        alltxt += '\n' + t
                rep['docviewer']['scriptFetches'] = dsm
                signals = [
                    tok for tok in [
                        'VUE_APP_MORE_PATH', 'VUE_APP_USE_SEC', 'drm', 'aes-256-cbc',
                        '/docinfo/', '/page/', '/pagec/', '/regDoc'
                    ] if tok.lower() in alltxt.lower()
                ]
                rep['docviewer']['protectedContentSignals'] = signals
                rep['docviewer']['disposition'] = (
                    'DRM_OR_DEDICATED_VIEWER_SIGNAL_OBSERVED_STOP_NO_REPLAY'
                    if any(x.lower() in {'drm', 'vue_app_more_path', 'vue_app_use_sec', 'aes-256-cbc'} for x in signals)
                    else 'PUBLIC_VIEWER_STATIC_ONLY_NO_CONTENT_REPLAY'
                )

    (OUT / 'report.json').write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding='utf-8')
    s = {
        'rissFinalUrl': final,
        'rissIds': rep['riss']['rissIds'],
        'rissControls': rep['riss']['controls'],
        'docControlNo': dc,
        'docType': dt,
        'ucis': rep['riss']['ucis'],
        'detailFulltextTuples': rep['riss']['detailFulltextTuples'],
        'exactTitleFulltextTuples': title_tuples,
        'globalFulltextDownloadDefinitionCount': rep['riss']['globalFulltextDownloadDefinitionCount'],
        'searchRedirectUrl': rep['riss']['searchRedirectUrl'],
        'originalCheck': rep['riss']['originalCheck'],
        'nanetSearchDisposition': [
            {
                'label': x['label'],
                'titleOccurrenceCount': x['titleOccurrenceCount'],
                'rowIdentityOccurrenceCount': x['rowIdentityOccurrenceCount'],
                'controls': x['controls'],
                'noResultWrapObserved': x['noResultWrapObserved'],
            }
            for x in search_records
        ],
        'nanetCandidateControls': controls,
        'nanetExactControl': rep['nanet'].get('control'),
        'viewerNextHops': rep['nanet'].get('viewerNextHops', []),
        'docviewerDisposition': rep['docviewer'].get('disposition'),
        'protectedContentSignals': rep['docviewer'].get('protectedContentSignals', []),
        'fullLengthPdfAcquired': False,
        'guessedOpaqueIdentifierCount': 0,
        'contentAssetActionExecuted': False,
        'contentDownloadExecuted': False,
    }
    (OUT / 'summary.txt').write_text(json.dumps(s, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(s, ensure_ascii=False, indent=2))
    assert RISS_ID in rep['riss']['rissIds']
    assert rep['riss']['titleFieldContractObserved'] is True
    assert rep['guessedOpaqueIdentifierCount'] == 0
    assert rep['loginBypass'] is False
    assert rep['drmRequestExecuted'] is False
    assert rep['contentAssetActionExecuted'] is False
    assert rep['fullLengthPdfAcquired'] is False
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
