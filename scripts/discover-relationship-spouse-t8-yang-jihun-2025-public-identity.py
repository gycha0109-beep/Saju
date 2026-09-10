#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

OUT = Path('acquisition-yang-jihun-2025')
OUT.mkdir(exist_ok=True)

AUTHOR = '양지훈'
TITLE = '명리학 곤명(坤命) 길흉(吉凶)에 대한 연구 : 『연해자평』을 중심으로'
TITLE_VARIANTS = [
    TITLE,
    '명리학 곤명(坤命) 길흉(吉凶)에 대한 연구(『연해자평』을 중심으로)',
    '명리학 곤명 길흉에 대한 연구 연해자평을 중심으로',
]
EXPECTED_YEAR = '2025'
EXPECTED_INSTITUTION_TOKENS = ('국제뇌교육종합대학원대학교', '國際腦敎育綜合大學院大學校')
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Yang-Jihun-2025-discovery)'

ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()))


def fetch(url: str, timeout: int = 35):
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


def normalized(text: str) -> str:
    return re.sub(r'[\s·‧ㆍ・:：()（）『』「」\[\]]+', '', html.unescape(text)).lower()


def title_match(text: str) -> bool:
    n = normalized(text)
    return '명리학곤명' in n and '길흉' in n and '연해자평' in n and '연구' in n


def contexts(text: str) -> list[str]:
    decoded = html.unescape(text)
    positions = []
    for token in [AUTHOR, '곤명', '연해자평', '길흉']:
        positions.extend(m.start() for m in re.finditer(re.escape(token), decoded, re.I))
    out = []
    for pos in sorted(set(positions))[:80]:
        c = decoded[max(0, pos - 12000): min(len(decoded), pos + 22000)]
        if AUTHOR in c and title_match(c):
            c = re.sub(r'\s+', ' ', c).strip()[:50000]
            if c not in out:
                out.append(c)
    return out


def detail_candidates(text: str) -> list[dict[str, str]]:
    out = []
    decoded = html.unescape(text)
    pat = re.compile(r'''(?:href\s*=\s*["']|["'])([^"']*DetailView\.do\?[^"']*control_no=([0-9a-f]{16,64})[^"']*)''', re.I)
    for m in pat.finditer(decoded):
        rec = {'href': m.group(1), 'control': m.group(2).lower()}
        if rec not in out:
            out.append(rec)
    return out


def fulltext_tuples(text: str) -> list[dict[str, str]]:
    out = []
    pat = re.compile(
        r"ButtonSet\.fulltextDownload\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]",
        re.I,
    )
    for m in pat.finditer(text):
        rec = {'control_no': m.group(1), 'p_mat_type': m.group(2), 'p_submat_type': m.group(3), 'fulltext_kind': m.group(4)}
        if rec not in out:
            out.append(rec)
    return out


report = {
    'candidate': {
        'author': AUTHOR,
        'title': TITLE,
        'year': 2025,
        'institution': '국제뇌교육종합대학원대학교 동양학과 실용명리전공',
        'nanetControl': 'KDMT12025000053655',
    },
    'searches': [],
    'exactRowCandidates': [],
    'resolvedExactRow': None,
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

all_rows = []
for i, query_title in enumerate(TITLE_VARIANTS, start=1):
    q = urlencode({'colName': 'bib_t', 'isDetailSearch': 'Y', 'queryText': f'znTitle,{query_title}', 'searchGubun': 'true'})
    url = 'https://www.riss.kr/search/Search.do?' + q
    try:
        meta, body = fetch(url)
        text = decode(body, meta['contentType'])
        (OUT / f'riss-title-search-{i}.html').write_text(text, encoding='utf-8')
        cs = contexts(text)
        scoped = []
        for c in cs:
            if EXPECTED_YEAR not in c or not any(tok in c for tok in EXPECTED_INSTITUTION_TOKENS):
                continue
            for rec in detail_candidates(c):
                if rec not in scoped:
                    scoped.append(rec)
                if rec not in all_rows:
                    all_rows.append(rec)
        report['searches'].append({
            **meta,
            'queryTitle': query_title,
            'titleObserved': title_match(text),
            'authorObserved': AUTHOR in text,
            'contextCount': len(cs),
            'rowScopedDetailCandidates': scoped,
            'allFulltextTuples': fulltext_tuples(text)[:50],
        })
    except Exception as exc:
        report['searches'].append({'queryTitle': query_title, 'error': f'{type(exc).__name__}: {exc}'})

report['exactRowCandidates'] = all_rows
unique_controls = sorted({r['control'] for r in all_rows})
if len(unique_controls) == 1:
    control = unique_controls[0]
    row = next(r for r in all_rows if r['control'] == control)
    detail_url = urljoin('https://www.riss.kr/search/', row['href'])
    try:
        meta, body = fetch(detail_url)
        text = decode(body, meta['contentType'])
        (OUT / 'riss-detail.html').write_text(text, encoding='utf-8')
        identity_ok = title_match(text) and AUTHOR in text and EXPECTED_YEAR in text and any(tok in text for tok in EXPECTED_INSTITUTION_TOKENS)
        report['resolvedExactRow'] = {
            'control': control,
            'detailUrl': detail_url,
            **meta,
            'identityObserved': identity_ok,
            'fulltextTuples': fulltext_tuples(text),
            'originalCheckContractObserved': 'originalCheck' in text,
            'nationalLibraryLocalBibnoCandidates': sorted(set(re.findall(r'KDM\d{6,}', text))),
            'fulltextDownloadSignals': len(re.findall(r'fulltextDownload', text, re.I)),
            'dcollectionSignals': sorted(set(re.findall(r'https?://[^\"\'<>\s]*dcollection[^\"\'<>\s]*', text, re.I)))[:20],
        }
        report['disposition'] = 'EXACT_RISS_IDENTITY_RESOLVED_READY_FOR_PUBLIC_ROUTE_INSPECTION' if identity_ok else 'EXACT_CONTROL_RESOLVED_BUT_DETAIL_IDENTITY_MISMATCH_STOP'
    except Exception as exc:
        report['resolvedExactRow'] = {'control': control, 'detailUrl': detail_url, 'error': f'{type(exc).__name__}: {exc}'}
        report['disposition'] = 'EXACT_CONTROL_RESOLVED_DETAIL_FETCH_UNAVAILABLE'
elif not unique_controls:
    report['disposition'] = 'NO_EXACT_RISS_CONTROL_OBSERVED_FROM_CURRENT_PUBLIC_TITLE_SEARCH'
else:
    report['disposition'] = 'MULTIPLE_EXACT_ROW_CONTROLS_REQUIRE_MANUAL_REVIEW'

(OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))

assert report['contentDownloadExecuted'] is False
assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
assert report['drmRequestExecuted'] is False
assert report['decryptionActionExecuted'] is False
assert report['crossSourceSemanticStitching'] is False
