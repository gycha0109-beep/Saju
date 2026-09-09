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

OUT = Path('acquisition-jung-jaeheon-2012')
OUT.mkdir(exist_ok=True)

AUTHOR = '정재헌'
TITLE = '명리학의 육친론 연구 : 가족관계 변동을 중심으로'
TITLE_STEM = '명리학의 육친론 연구'
TITLE_VARIANTS = [
    TITLE,
    '명리학의 육친론 연구: 가족관계 변동을 중심으로',
    TITLE_STEM,
]
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Jung-Jaeheon-Yukchin-discovery)'

ctx = ssl.create_default_context()
jar = CookieJar()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(jar))


def fetch(url: str, *, timeout: int = 30):
    req = Request(url, headers={'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8'})
    with opener.open(req, timeout=timeout) as resp:
        body = resp.read(8_000_001)
        assert len(body) <= 8_000_000, 'bounded response limit exceeded'
        return {
            'requestedUrl': url,
            'finalUrl': resp.geturl(),
            'status': getattr(resp, 'status', None),
            'contentType': resp.headers.get('Content-Type', ''),
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
        }, body


def decode(body: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 30000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def row_contexts(text: str) -> list[str]:
    decoded = html.unescape(text)
    positions = []
    for token in [TITLE, TITLE_STEM, AUTHOR]:
        for m in re.finditer(re.escape(token), decoded, re.I):
            positions.append(m.start())
    out = []
    for pos in sorted(set(positions))[:30]:
        ctx = decoded[max(0, pos - 9000): min(len(decoded), pos + 16000)]
        c = compact(ctx)
        if c not in out:
            out.append(c)
    return out


def parse_fulltext_tuples(text: str) -> list[dict[str, str]]:
    out = []
    pat = re.compile(
        r"ButtonSet\.fulltextDownload\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]",
        re.I,
    )
    for m in pat.finditer(text):
        rec = {
            'control_no': m.group(1),
            'p_mat_type': m.group(2),
            'p_submat_type': m.group(3),
            'fulltext_kind': m.group(4),
        }
        if rec not in out:
            out.append(rec)
    return out


def ids_from_context(ctx: str) -> list[str]:
    ids = []
    for pat in [r'(?:www\.riss\.kr/)?link\?id=(T\d+)', r'\bid=(T\d+)\b', r"['\"](T\d+)['\"]"]:
        for m in re.finditer(pat, ctx, re.I):
            v = m.group(1).upper()
            if v not in ids:
                ids.append(v)
    return ids


def controls_from(text: str) -> list[str]:
    out = []
    for m in re.finditer(r'control_no=([0-9a-f]{16,64})', text, re.I):
        v = m.group(1).lower()
        if v not in out:
            out.append(v)
    return out


def observed_links(base: str, text: str) -> list[str]:
    out = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        if raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        u = urljoin(base, raw)
        if u not in out:
            out.append(u)
    return out


report = {
    'candidate': {
        'author': AUTHOR,
        'title': TITLE,
        'titleStem': TITLE_STEM,
        'reportedYearVariantsInLaterCitations': [2011, 2012],
        'reportedInstitution': '동방대학원대학교',
    },
    'searches': [],
    'candidateRissIds': [],
    'uniqueRissId': None,
    'detail': None,
    'fullLengthPdfAcquired': False,
    'contentDownloadExecuted': False,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'crossSourceSemanticStitching': False,
    'disposition': 'PUBLIC_IDENTITY_DISCOVERY_PENDING',
}

candidate_ids = []
all_contexts = []
for i, query_title in enumerate(TITLE_VARIANTS, start=1):
    q = urlencode({
        'colName': 'bib_t',
        'isDetailSearch': 'Y',
        'queryText': f'znTitle,{query_title}',
        'searchGubun': 'true',
    })
    url = 'https://www.riss.kr/search/Search.do?' + q
    try:
        meta, body = fetch(url)
        text = decode(body, meta['contentType'])
        (OUT / f'riss-title-search-{i}.html').write_text(text, encoding='utf-8')
        contexts = row_contexts(text)
        all_contexts.extend(contexts)
        row_ids = []
        for c in contexts:
            if TITLE_STEM in c and AUTHOR in c:
                for rid in ids_from_context(c):
                    if rid not in row_ids:
                        row_ids.append(rid)
                    if rid not in candidate_ids:
                        candidate_ids.append(rid)
        report['searches'].append({
            **meta,
            'queryTitle': query_title,
            'titleStemObserved': TITLE_STEM in text,
            'authorObserved': AUTHOR in text,
            'rowContextCount': len(contexts),
            'rowScopedRissIds': row_ids,
            'allFulltextTuples': parse_fulltext_tuples(text)[:40],
        })
    except Exception as exc:
        report['searches'].append({'queryTitle': query_title, 'error': f'{type(exc).__name__}: {exc}'})

(OUT / 'riss-row-contexts.json').write_text(json.dumps(all_contexts, ensure_ascii=False, indent=2), encoding='utf-8')
report['candidateRissIds'] = candidate_ids

if len(candidate_ids) == 1:
    rid = candidate_ids[0]
    report['uniqueRissId'] = rid
    link = f'https://www.riss.kr/link?id={rid}'
    try:
        meta, body = fetch(link)
        text = decode(body, meta['contentType'])
        (OUT / 'riss-detail.html').write_text(text, encoding='utf-8')
        observed_external = []
        for u in observed_links(meta['finalUrl'], text):
            host = (urlparse(u).hostname or '').lower()
            if any(token in host for token in ['dcollection', 'dongbang', 'nld.go.kr', 'nanet.go.kr']):
                if u not in observed_external:
                    observed_external.append(u)
        report['detail'] = {
            **meta,
            'rissId': rid,
            'titleStemObserved': TITLE_STEM in text,
            'authorObserved': AUTHOR in text,
            'controlCandidates': controls_from(meta['finalUrl'] + '\n' + text),
            'fulltextTuples': parse_fulltext_tuples(text),
            'originalCheckContractObserved': 'originalCheck.do' in text,
            'observedInstitutionalOrLibraryLinks': observed_external,
            'yearSignals': sorted(set(int(x) for x in re.findall(r'\b(2011|2012)\b', text))),
        }
        if report['detail']['titleStemObserved'] and report['detail']['authorObserved']:
            report['disposition'] = 'UNIQUE_RISS_IDENTITY_RESOLVED_READY_FOR_BOUNDED_FULLTEXT_ROUTE_INSPECTION'
        else:
            report['disposition'] = 'UNIQUE_RISS_ID_RESOLVED_BUT_DETAIL_IDENTITY_MISMATCH_STOP'
    except Exception as exc:
        report['detail'] = {'rissId': rid, 'error': f'{type(exc).__name__}: {exc}'}
        report['disposition'] = 'UNIQUE_RISS_ID_RESOLVED_DETAIL_FETCH_UNAVAILABLE'
elif len(candidate_ids) == 0:
    report['disposition'] = 'NO_UNIQUE_EXACT_RISS_ID_OBSERVED_FROM_CURRENT_PUBLIC_TITLE_SEARCH'
else:
    report['disposition'] = 'MULTIPLE_ROW_SCOPED_RISS_IDS_REQUIRE_MANUAL_IDENTITY_REVIEW'

(OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))

assert report['guessedOpaqueIdentifierCount'] == 0
assert report['contentDownloadExecuted'] is False
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
assert report['drmRequestExecuted'] is False
assert report['decryptionActionExecuted'] is False
