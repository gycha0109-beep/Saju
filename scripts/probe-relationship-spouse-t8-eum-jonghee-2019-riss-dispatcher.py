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

OUT = Path('acquisition-eum-jonghee-2019')
OUT.mkdir(exist_ok=True)

AUTHOR = '음종희'
TITLE = '四柱命理 宮星에 관한 硏究 : 宮에 따른 十星작용을 중심으로'
TITLE_SIGNAL = '宮星'
CONTROL_NO = 'b3c06fb77553c27dffe0bdc3ef48d419'
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
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/16.0; public-resource-verification)'
MAX = 10 * 1024 * 1024

PATTERNS = (
    r'fulltextDownload\s*:\s*function\s*\([^)]*\)',
    r'function\s+fulltextDownload\s*\([^)]*\)',
    r'function\s+openFulltext\s*\([^)]*\)',
    r'function\s+originalCheck\s*\([^)]*\)',
    r'/detail/originalCheck\.do',
    r'FullTextDownload\.do',
    r'redirectURL',
    r'document\.f',
    r'\.submit\s*\(',
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
    except Exception as exc:
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b''


def windows(text: str, pattern: str, *, before: int = 1000, after: int = 4200, cap: int = 8) -> list[str]:
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
        r'ButtonSet\.fulltextDownload\s*\([^;]{0,1200}\)',
        r'fulltextDownload\s*\([^;]{0,1200}\)',
        r'originalCheck\s*\([^;]{0,1200}\)',
        r'openFulltext\s*\([^;]{0,1200}\)',
    ):
        for m in re.finditer(pattern, text, re.I | re.S):
            call = compact(m.group(0), 2200)
            if call not in target_calls:
                target_calls.append(call)
    return {'source': source, 'matches': matches, 'targetCalls': target_calls[:40]}


def target_windows(text: str) -> list[str]:
    out: list[str] = []
    decoded = html.unescape(text)
    for token in (CONTROL_NO, 'ButtonSet.fulltextDownload', 'id="controlNo"', 'id="docType"', 'originalCheck'):
        for m in re.finditer(re.escape(token), decoded, re.I):
            value = compact(decoded[max(0, m.start() - 1200): min(len(decoded), m.start() + 3200)], 4800)
            if value not in out:
                out.append(value)
            if len(out) >= 30:
                return out
    return out


def hidden_value(text: str, element_id: str) -> str | None:
    for tag in re.findall(r'<input\b[^>]*>', text, re.I | re.S):
        if not re.search(rf'\bid\s*=\s*["\']{re.escape(element_id)}["\']', tag, re.I):
            continue
        m = re.search(r'\bvalue\s*=\s*["\']([^"\']*)["\']', tag, re.I)
        if m:
            return html.unescape(m.group(1))
    return None


def original_check_endpoint(source_url: str, text: str) -> str | None:
    m = re.search(r'(?:(?:https?:)?//www\.riss\.kr)?(/detail/originalCheck\.do)', text, re.I)
    return urljoin(source_url, m.group(1)) if m else None


def has_original_check_contract(text: str) -> bool:
    normalized = re.sub(r'\s+', '', text)
    return (
        'functionoriginalCheck(goOri)' in normalized
        and 'data:{controlNo:controlNo,docType:docType}' in normalized
        and 'url:goOri' in normalized
    )


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
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
        'search': {},
        'detail': {},
        'searchTargetWindows': [],
        'detailTargetWindows': [],
        'scriptUrls': [],
        'sources': [],
        'pageAuthoredFulltextCalls': [],
        'tuplePresentOnSearchSurface': False,
        'docControlNo': None,
        'docType': None,
        'originalCheckUrl': None,
        'originalCheckContractFound': False,
        'originalCheck': None,
        'originalCheckBody': None,
    }

    smeta, sbody = fetch(opener, SEARCH)
    search_text = decode(sbody) if sbody else ''
    report['search'] = smeta
    report['searchTargetWindows'] = target_windows(search_text)
    joined = ' '.join(report['searchTargetWindows'])
    report['tuplePresentOnSearchSurface'] = all(v in joined for v in (CONTROL_NO, P_MAT_TYPE, P_SUBMAT_TYPE, FULLTEXT_KIND))
    report['sources'].append(inspect_source(smeta.get('finalUrl') or SEARCH, search_text))

    dmeta, dbody = fetch(opener, DETAIL, referer=SEARCH)
    detail_text = decode(dbody) if dbody else ''
    report['detail'] = dmeta
    assert CONTROL_NO in detail_text, 'target RISS detail no longer contains public control number'
    assert P_MAT_TYPE in detail_text, 'target RISS detail no longer contains material type'
    assert AUTHOR in detail_text or TITLE_SIGNAL in detail_text, 'target RISS detail identity mismatch'
    report['detailTargetWindows'] = target_windows(detail_text)
    report['sources'].append(inspect_source(dmeta.get('finalUrl') or DETAIL, detail_text))

    calls: list[str] = []
    for source_text in (search_text, detail_text):
        for pattern in (
            r'ButtonSet\.fulltextDownload\s*\([^;]{0,1000}\)',
            r'onclick=["\'][^"\']*fulltextDownload\s*\([^"\']*\)[^"\']*["\']',
        ):
            for m in re.finditer(pattern, html.unescape(source_text), re.I | re.S):
                call = compact(m.group(0), 1800)
                if call not in calls:
                    calls.append(call)
    report['pageAuthoredFulltextCalls'] = calls[:30]

    script_urls: list[str] = []
    for page_base, page_text in ((smeta.get('finalUrl') or SEARCH, search_text), (dmeta.get('finalUrl') or DETAIL, detail_text)):
        for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', page_text, re.I):
            url = urljoin(page_base, html.unescape(raw))
            if url not in script_urls:
                script_urls.append(url)
    report['scriptUrls'] = script_urls

    source_texts: list[tuple[str, str]] = [
        (smeta.get('finalUrl') or SEARCH, search_text),
        (dmeta.get('finalUrl') or DETAIL, detail_text),
    ]
    dispatcher_tokens = ('fulltextdownload', 'openfulltext', 'originalcheck', '/search/download/', 'redirecturl', 'document.f', '.submit(')
    for url in script_urls[:160]:
        meta, body = fetch(opener, url, referer=DETAIL)
        if not body:
            continue
        text = decode(body)
        if not any(k in text.lower() for k in dispatcher_tokens):
            continue
        rec = inspect_source(meta.get('finalUrl') or url, text)
        rec['meta'] = meta
        report['sources'].append(rec)
        source_texts.append((meta.get('finalUrl') or url, text))

    report['docControlNo'] = hidden_value(detail_text, 'controlNo')
    report['docType'] = hidden_value(detail_text, 'docType')

    endpoint = None
    contract_found = False
    for source_url, source_text in source_texts:
        contract_found = contract_found or has_original_check_contract(source_text)
        if endpoint is None:
            endpoint = original_check_endpoint(source_url, source_text)
    report['originalCheckContractFound'] = contract_found
    report['originalCheckUrl'] = endpoint

    if endpoint and contract_found and report['docControlNo'] and report['docType']:
        payload = urlencode({'controlNo': report['docControlNo'], 'docType': report['docType']}).encode('ascii')
        meta, body = fetch(opener, endpoint, data=payload, referer=DETAIL)
        report['originalCheck'] = meta
        report['originalCheckBody'] = compact(decode(body), 4000) if body else None

    path = OUT / 'riss-dispatcher.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({
        'target': report['target'],
        'tuplePresentOnSearchSurface': report['tuplePresentOnSearchSurface'],
        'pageAuthoredFulltextCalls': report['pageAuthoredFulltextCalls'],
        'docControlNo': report['docControlNo'],
        'docType': report['docType'],
        'originalCheckUrl': report['originalCheckUrl'],
        'originalCheckContractFound': report['originalCheckContractFound'],
        'originalCheck': report['originalCheck'],
        'originalCheckBody': report['originalCheckBody'],
        'scriptUrls': report['scriptUrls'],
        'sources': [{'source': x['source'], 'targetCalls': x['targetCalls'], 'patterns': [m['pattern'] for m in x['matches']]} for x in report['sources']],
    }, ensure_ascii=False, indent=2))

    assert report['tuplePresentOnSearchSurface'], 'exact target fulltext tuple disappeared from RISS search surface'
    assert report['docControlNo'], 'target detail page no longer exposes doc control number'
    assert report['docType'], 'target detail page no longer exposes doc type'
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
