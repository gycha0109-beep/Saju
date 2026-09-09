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
TITLE_STEM = '명리학의 육친론 연구'
EXPECTED_CONTROL = '1912fbc7d5e6ba29ffe0bdc3ef48d419'
EXPECTED_MAT = 'be54d9b8bc7cdb09'
EXPECTED_SUBMAT = 'f1a8c7a1de0e08b8'
EXPECTED_KIND = 'a8cb3aaead67ab5b'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Jung-Jaeheon-2012-public-routes)'

ctx = ssl.create_default_context()
jar = CookieJar()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(jar))

ALLOWED_EXTERNAL_TOKENS = ('dcollection', 'dongbang', 'nld.go.kr', 'nanet.go.kr', 'k-knowledge.kr')


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def decode(data: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']:
        try:
            return data.decode(enc)
        except Exception:
            pass
    return data.decode('utf-8', errors='replace')


def host_allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return host.endswith('riss.kr') or any(tok in host for tok in ALLOWED_EXTERNAL_TOKENS)


def fetch(url: str, *, data: dict[str, str] | None = None, referer: str | None = None, timeout: int = 30, max_bytes: int = 10_000_000):
    assert host_allowed(url), f'outside bounded public host allowlist: {url}'
    payload = urlencode(data).encode('utf-8') if data is not None else None
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/json,application/pdf,*/*;q=0.8'}
    if data is not None:
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    if referer:
        headers['Referer'] = referer
    with opener.open(Request(url, data=payload, headers=headers), timeout=timeout) as resp:
        body = resp.read(max_bytes + 1)
        assert len(body) <= max_bytes, 'bounded response limit exceeded'
        final = resp.geturl()
        assert host_allowed(final), f'cross-boundary redirect rejected: {final}'
        return {
            'requestedUrl': url,
            'finalUrl': final,
            'status': getattr(resp, 'status', None),
            'contentType': resp.headers.get('Content-Type', ''),
            'contentDisposition': resp.headers.get('Content-Disposition', ''),
            'bytes': len(body),
            'sha256': sha256(body),
            'pdfMagic': body.startswith(b'%PDF-'),
        }, body


def extract_links(base: str, text: str) -> list[str]:
    out = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        u = urljoin(base, raw)
        if u not in out:
            out.append(u)
    return out


def parse_tuples(text: str) -> list[dict[str, str]]:
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


def first_match(patterns: list[str], text: str) -> str | None:
    for pat in patterns:
        m = re.search(pat, text, re.I | re.S)
        if m:
            return html.unescape(m.group(1)).strip()
    return None


def exact_row_records(text: str) -> list[dict]:
    decoded = html.unescape(text)
    records = []
    for m in re.finditer(r'<li\b[^>]*>(.*?)</li>', decoded, re.I | re.S):
        block = m.group(1)
        if AUTHOR not in block or '가족관계 변동을 중심으로' not in block:
            continue
        dm = re.search(r'href=["\']([^"\']*DetailView\.do\?[^"\']*control_no=([0-9a-f]{16,64})[^"\']*)["\']', block, re.I | re.S)
        if not dm:
            continue
        tuples = parse_tuples(block)
        rec = {
            'detailHref': html.unescape(dm.group(1)),
            'control': dm.group(2).lower(),
            'year': first_match([r'<span>\s*(2011|2012)\s*</span>'], block),
            'institution': first_match([r'class=["\']assigned["\'][^>]*>.*?<a[^>]*>(.*?)</a>'], block),
            'tuples': tuples,
        }
        if rec not in records:
            records.append(rec)
    return records


def direct_pdf_urls(base: str, text: str) -> list[str]:
    out = []
    for raw in re.findall(r'''(?:href|src)\s*=\s*(["'])([^"']+\.pdf(?:\?[^"']*)?)\1''', text, re.I | re.S):
        u = urljoin(base, html.unescape(raw[1].strip()))
        if host_allowed(u) and u not in out:
            out.append(u)
    for raw in re.findall(r'https?://[^\s"\'<>]+\.pdf(?:\?[^\s"\'<>]*)?', text, re.I):
        u = html.unescape(raw.rstrip('),.;'))
        if host_allowed(u) and u not in out:
            out.append(u)
    return out


report = {
    'candidate': {'author': AUTHOR, 'titleStem': TITLE_STEM, 'year': 2012, 'institution': '동방대학원대학교'},
    'exactRow': None,
    'detail': None,
    'rissStaticInspection': {},
    'originalCheck': None,
    'externalPublicPages': [],
    'pdfCandidates': [],
    'fullLengthPdfAcquired': False,
    'pdf': None,
    'contentDownloadExecuted': False,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'crossSourceSemanticStitching': False,
    'semanticDisposition': 'PENDING_DIRECT_BODY_OR_ACCESS_BOUNDARY',
}

# Re-fetch the exact-title public search. The row itself, not a guessed T-id, is authority.
query_title = '명리학의 육친론 연구 : 가족관계 변동을 중심으로'
q = urlencode({'colName': 'bib_t', 'isDetailSearch': 'Y', 'queryText': f'znTitle,{query_title}', 'searchGubun': 'true'})
search_url = 'https://www.riss.kr/search/Search.do?' + q
sm, sb = fetch(search_url)
st = decode(sb, sm['contentType'])
(OUT / 'riss-exact-title-current.html').write_text(st, encoding='utf-8')
rows = exact_row_records(st)
unique_controls = sorted(set(r['control'] for r in rows))
assert unique_controls == [EXPECTED_CONTROL], f'exact row control mismatch: {unique_controls}'
row = next(r for r in rows if r['control'] == EXPECTED_CONTROL)
assert row['year'] == '2012', row
assert row['tuples'], 'exact row did not author a fulltext tuple'
assert any(t == {'control_no': EXPECTED_CONTROL, 'p_mat_type': EXPECTED_MAT, 'p_submat_type': EXPECTED_SUBMAT, 'fulltext_kind': EXPECTED_KIND} for t in row['tuples'])
report['exactRow'] = row

# Follow the exact row-authored RISS detail href only.
detail_url = urljoin(sm['finalUrl'], row['detailHref'])
dm, db = fetch(detail_url, referer=sm['finalUrl'])
dt = decode(db, dm['contentType'])
(OUT / 'riss-detail.html').write_text(dt, encoding='utf-8')
assert AUTHOR in dt and ('命理學의 六親論 硏究' in dt or TITLE_STEM in dt), 'detail identity mismatch'
assert EXPECTED_CONTROL in (dm['finalUrl'] + '\n' + dt), 'detail control mismatch'

doc_control = first_match([
    r'name=["\']docControlNo["\'][^>]*value=["\'](\d+)["\']',
    r'value=["\'](\d+)["\'][^>]*name=["\']docControlNo["\']',
    r'\bdocControlNo\b\s*[:=]\s*["\']?(\d+)',
], dt)
uci = first_match([r'(I804:[0-9A-Za-z:-]+)'], dt)
national_bib = first_match([r'name=["\']nationalLibraryLocalBibno["\'][^>]*value=["\']([^"\']+)', r'nationalLibraryLocalBibno\s*[:=]\s*["\']([^"\']+)'], dt)
external = []
for u in extract_links(dm['finalUrl'], dt):
    host = (urlparse(u).hostname or '').lower()
    if any(tok in host for tok in ALLOWED_EXTERNAL_TOKENS) and u not in external:
        external.append(u)
report['detail'] = {
    **dm,
    'docControlNo': doc_control,
    'uci': uci,
    'nationalLibraryLocalBibno': national_bib,
    'fulltextTuples': [t for t in parse_tuples(dt) if t['control_no'] == EXPECTED_CONTROL],
    'observedInstitutionalOrLibraryLinks': external,
}

# Inspect only same-origin RISS static scripts to determine the public dispatcher/originalCheck contracts.
script_urls = [u for u in extract_links(dm['finalUrl'], dt) if (urlparse(u).hostname or '').lower().endswith('riss.kr') and (u.lower().endswith('.js') or '.js?' in u.lower())]
script_fetches = []
union = dt
for i, u in enumerate(script_urls[:45], start=1):
    try:
        meta, body = fetch(u, referer=dm['finalUrl'], timeout=20, max_bytes=3_000_000)
        txt = decode(body, meta['contentType'])
        union += '\n' + txt
        script_fetches.append({**meta, 'sourceUrl': u, 'error': None})
        if 'fulltextDownload' in txt or 'originalCheck' in txt:
            (OUT / f'riss-script-{i:02d}.txt').write_text(txt, encoding='utf-8')
    except Exception as exc:
        script_fetches.append({'sourceUrl': u, 'error': f'{type(exc).__name__}: {exc}'})

global_defs = len(re.findall(r'(?:function\s+fulltextDownload\s*\(|\bfulltextDownload\s*[:=]\s*function\s*\()', union, re.I))
button_wrappers = len(re.findall(r'ButtonSet\.fulltextDownload\s*\(', union, re.I))
original_contract = 'originalCheck.do' in union and 'controlNo' in union and 'docType' in union
report['rissStaticInspection'] = {
    'referencedScriptCount': len(script_urls),
    'scriptFetches': script_fetches,
    'globalFulltextDownloadDefinitionCount': global_defs,
    'buttonSetFulltextDownloadOccurrenceCount': button_wrappers,
    'originalCheckContractObserved': original_contract,
}

# originalCheck is a current site-authored metadata contract; invoke only if the exact detail itself exposes numeric docControlNo.
if original_contract and doc_control:
    om, ob = fetch('https://www.riss.kr/detail/originalCheck.do', data={'controlNo': doc_control, 'docType': 'T'}, referer=dm['finalUrl'])
    ot = decode(ob, om['contentType'])
    (OUT / 'riss-original-check.txt').write_text(ot, encoding='utf-8')
    report['originalCheck'] = {**om, 'body': ot.strip()[:2000]}

# Follow only external public pages literally authored by the exact detail. No synthesized institutional URL.
pdf_candidates = []
for i, u in enumerate(external[:15], start=1):
    try:
        em, eb = fetch(u, referer=dm['finalUrl'], timeout=25)
        if em['pdfMagic'] or 'application/pdf' in em['contentType'].lower():
            pdf_candidates.append({'url': em['finalUrl'], 'source': 'direct-detail-link', 'body': eb, 'meta': em})
            report['externalPublicPages'].append({**em, 'sourceUrl': u, 'directPdf': True})
            continue
        et = decode(eb, em['contentType'])
        (OUT / f'external-{i:02d}.html').write_text(et, encoding='utf-8')
        identity = AUTHOR in et or TITLE_STEM in et or '가족관계 변동을 중심으로' in et
        rec = {**em, 'sourceUrl': u, 'identitySignalObserved': identity, 'directPdf': False}
        report['externalPublicPages'].append(rec)
        if identity:
            for pu in direct_pdf_urls(em['finalUrl'], et):
                if pu not in [x['url'] for x in pdf_candidates]:
                    pdf_candidates.append({'url': pu, 'source': em['finalUrl'], 'body': None, 'meta': None})
    except Exception as exc:
        report['externalPublicPages'].append({'sourceUrl': u, 'error': f'{type(exc).__name__}: {exc}'})

report['pdfCandidates'] = [{'url': x['url'], 'source': x['source']} for x in pdf_candidates]

# Fetch only a page-authored direct PDF candidate. Never replay a viewer/DRM endpoint.
for cand in pdf_candidates[:4]:
    try:
        if cand['body'] is None:
            pm, pb = fetch(cand['url'], referer=cand['source'], timeout=35, max_bytes=20_000_000)
        else:
            pm, pb = cand['meta'], cand['body']
        if pb.startswith(b'%PDF-') or 'application/pdf' in pm['contentType'].lower():
            (OUT / 'jung-jaeheon-2012.pdf').write_bytes(pb)
            report['fullLengthPdfAcquired'] = True
            report['pdf'] = {**pm, 'source': cand['source']}
            report['contentDownloadExecuted'] = True
            report['semanticDisposition'] = 'DIRECT_PDF_ACQUIRED_REQUIRES_PAGE_COUNT_AND_BODY_REVIEW'
            break
    except Exception:
        continue

if not report['fullLengthPdfAcquired']:
    report['semanticDisposition'] = 'PUBLIC_RISS_ROUTE_INSPECTED_NO_DIRECT_BODY_YET'

(OUT / 'public-route-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))

assert report['exactRow']['control'] == EXPECTED_CONTROL
assert report['exactRow']['year'] == '2012'
assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
assert report['drmRequestExecuted'] is False
assert report['decryptionActionExecuted'] is False
assert report['crossSourceSemanticStitching'] is False
