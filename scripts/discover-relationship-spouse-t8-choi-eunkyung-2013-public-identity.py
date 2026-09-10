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

ROOT = Path('acquisition-choi-eunkyung-2013')
ROOT.mkdir(exist_ok=True)
AUTHOR = '최은경'
TITLE = '命理學 六親論의 傷官에 관한 硏究'
TITLE_VARIANTS = [TITLE, '명리학 육친론의 상관에 관한 연구', '命理學 六親論의 傷官에 관한 硏究']
EXPECTED_YEAR = '2013'
EXPECTED_CONTROL = 'a2d2aa37279fbaaaffe0bdc3ef48d419'
EXPECTED_RISS_ID = 'T13097800'
EXPECTED_INSTITUTION_TOKENS = ('원광대학교', '圓光大學校')
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Choi-Eunkyung-2013-discovery)'

ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()))


def fetch(url: str, timeout: int = 35, max_bytes: int = 8_000_000):
    req = Request(url, headers={'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8'})
    with opener.open(req, timeout=timeout) as resp:
        body = resp.read(max_bytes + 1)
        assert len(body) <= max_bytes, 'bounded response limit exceeded'
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


def normalize(text: str) -> str:
    return re.sub(r'[\s·‧ㆍ・:：()（）『』「」\[\]學学六六親論傷官硏研]', '', html.unescape(text)).lower()


def title_match(text: str) -> bool:
    n = normalize(text)
    return ('명리' in n or '命理' in text) and ('상관' in n or '傷官' in text) and ('연구' in n or '硏究' in text)


def detail_candidates(text: str) -> list[dict[str, str]]:
    decoded = html.unescape(text)
    out: list[dict[str, str]] = []
    pat = re.compile(r'''(?:href\s*=\s*["']|["'])([^"']*DetailView\.do\?[^"']*control_no=([0-9a-f]{16,64})[^"']*)''', re.I)
    for m in pat.finditer(decoded):
        rec = {'href': m.group(1), 'control': m.group(2).lower()}
        if rec not in out:
            out.append(rec)
    return out


def document_form(text: str) -> str:
    m = re.search(r'<form\b[^>]*(?:id=["\']f["\']|name=["\']f["\'])[^>]*>', text, re.I | re.S)
    assert m, 'document.f not found'
    end = text.find('</form>', m.end())
    assert end >= 0
    return text[m.start():end + 7]


def hidden_fields(block: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for m in re.finditer(r'<input\b[^>]*>', block, re.I | re.S):
        tag = html.unescape(m.group(0))
        nm = re.search(r'\bname\s*=\s*["\']([^"\']+)', tag, re.I)
        if not nm:
            continue
        vm = re.search(r'\bvalue\s*=\s*["\']([^"\']*)', tag, re.I)
        out[nm.group(1)] = vm.group(1) if vm else ''
    return out


report = {
    'candidate': {
        'author': AUTHOR,
        'title': TITLE,
        'year': 2013,
        'institution': '원광대학교 동양학대학원',
        'rissId': EXPECTED_RISS_ID,
        'expectedControl': EXPECTED_CONTROL,
    },
    'searches': [],
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

observed_rows: list[dict[str, str]] = []
for i, variant in enumerate(TITLE_VARIANTS, 1):
    q = urlencode({'colName': 'bib_t', 'isDetailSearch': 'Y', 'queryText': f'znTitle,{variant}', 'searchGubun': 'true'})
    url = 'https://www.riss.kr/search/Search.do?' + q
    try:
        meta, body = fetch(url)
        text = decode(body, meta['contentType'])
        (ROOT / f'riss-title-search-{i}.html').write_text(text, encoding='utf-8')
        rows = detail_candidates(text)
        exact = [r for r in rows if r['control'] == EXPECTED_CONTROL]
        report['searches'].append({**meta, 'queryTitle': variant, 'authorObserved': AUTHOR in text, 'titleObserved': title_match(text), 'expectedControlObserved': bool(exact), 'detailCandidateCount': len(rows)})
        for r in exact:
            if r not in observed_rows:
                observed_rows.append(r)
    except Exception as exc:
        report['searches'].append({'queryTitle': variant, 'error': f'{type(exc).__name__}: {exc}'})

assert observed_rows, 'expected exact RISS control not observed from current public title search'
row = observed_rows[0]
detail_url = urljoin('https://www.riss.kr/search/', row['href'])
meta, body = fetch(detail_url)
text = decode(body, meta['contentType'])
(ROOT / 'riss-detail.html').write_text(text, encoding='utf-8')
identity_ok = AUTHOR in text and EXPECTED_YEAR in text and EXPECTED_RISS_ID in text and any(tok in text for tok in EXPECTED_INSTITUTION_TOKENS)
assert identity_ok, 'exact detail identity mismatch'
fields = hidden_fields(document_form(text))
fulltext_tuple = {k: fields.get(k) for k in ['control_no', 'p_mat_type', 'p_submat_type', 'fulltext_kind']}
assert fulltext_tuple['control_no'] == EXPECTED_CONTROL, fulltext_tuple
assert all(fulltext_tuple[k] for k in ['p_mat_type', 'p_submat_type', 'fulltext_kind']), fulltext_tuple

report['resolvedExactRow'] = {
    'control': EXPECTED_CONTROL,
    'rissId': EXPECTED_RISS_ID,
    'detailUrl': detail_url,
    **meta,
    'identityObserved': True,
    'fulltextTuple': fulltext_tuple,
    'originalCheckContractObserved': 'originalCheck' in text,
    'fulltextDownloadSignals': len(re.findall(r'fulltextDownload', text, re.I)),
}
report['disposition'] = 'EXACT_RISS_IDENTITY_RESOLVED_READY_FOR_PUBLIC_ROUTE_INSPECTION'
(ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))

assert report['contentDownloadExecuted'] is False
assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
assert report['drmRequestExecuted'] is False
assert report['decryptionActionExecuted'] is False
assert report['crossSourceSemanticStitching'] is False
