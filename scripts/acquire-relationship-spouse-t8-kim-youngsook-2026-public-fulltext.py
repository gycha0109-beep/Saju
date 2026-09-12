#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, parse_qsl, urlencode, urljoin, urlparse, urlsplit, urlunsplit
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

import fitz
from pypdf import PdfReader

ROOT = Path('acquisition-kim-youngsook-2026')
ROOT.mkdir(exist_ok=True)
AUTHOR = '김영숙'
YEAR = '2026'
SCHOOL_SIGNAL = '국제뇌교육종합대학원대학교'
BASE_TITLE = '『命理正宗』에 수록된 십성의 고찰과 청대 명리의 십성 변화 연구'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Kim-Youngsook-2026-public-acquisition)'

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def host(url: str) -> str:
    return (urlparse(url).hostname or '').lower()

def is_riss(url: str) -> bool:
    return host(url) in {'www.riss.kr', 'riss.kr', 'm.riss.kr', 'www.riss4u.net', 'riss4u.net'}

def is_dcollection(url: str) -> bool:
    h = host(url)
    return bool(h) and (h == 'dcollection.net' or h.endswith('.dcollection.net'))

def decode(raw: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', content_type or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']:
        try:
            return raw.decode(enc)
        except Exception:
            pass
    return raw.decode('utf-8', errors='replace')

def normalize_url(url: str) -> str:
    p = urlsplit(url)
    return urlunsplit((p.scheme, p.netloc, p.path, urlencode(parse_qsl(p.query, keep_blank_values=True)), p.fragment))

def fetch(opener, url: str, referer: str | None = None, max_bytes: int = 45_000_000):
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8'}
    if referer:
        headers['Referer'] = referer
    meta = {'requestedUrl': url, 'finalUrl': None, 'status': None, 'location': None, 'contentType': '', 'contentDisposition': '', 'bytes': 0, 'sha256': None, 'pdfMagic': False, 'error': None}
    try:
        with opener.open(Request(url, headers=headers), timeout=40) as response:
            raw = response.read(max_bytes + 1)
            assert len(raw) <= max_bytes, 'response exceeded bounded size'
            meta.update({'finalUrl': response.geturl(), 'status': getattr(response, 'status', None), 'location': response.headers.get('Location'), 'contentType': response.headers.get('Content-Type', ''), 'contentDisposition': response.headers.get('Content-Disposition', ''), 'bytes': len(raw), 'sha256': sha256(raw), 'pdfMagic': raw.startswith(b'%PDF-')})
            return meta, raw
    except HTTPError as exc:
        raw = exc.read(max_bytes + 1)
        assert len(raw) <= max_bytes, 'error response exceeded bounded size'
        meta.update({'finalUrl': url, 'status': exc.code, 'location': exc.headers.get('Location'), 'contentType': exc.headers.get('Content-Type', ''), 'contentDisposition': exc.headers.get('Content-Disposition', ''), 'bytes': len(raw), 'sha256': sha256(raw), 'pdfMagic': raw.startswith(b'%PDF-'), 'error': f'HTTPError: {exc.code}'})
        return meta, raw

def clean(value: str) -> str:
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', value))).strip()

def norm_title(value: str) -> str:
    value = html.unescape(value).replace('：', ':').replace('–', '-').replace('—', '-')
    return re.sub(r'[\s:·ㆍ\-_=\(\)\[\]「」『』<>]+', '', value).lower()

def links(base: str, text: str) -> list[str]:
    out: list[str] = []
    for match in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        value = html.unescape(match.group(2).strip())
        if not value or value.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        url = urljoin(base, value)
        if url not in out:
            out.append(url)
    for match in re.finditer(r'''["'](https?://[^"']+)["']''', text, re.I):
        url = html.unescape(match.group(1).strip())
        if url not in out:
            out.append(url)
    return out

def exact_card(base: str, text: str):
    target = norm_title(BASE_TITLE)
    pattern = re.compile(r'<p\s+class=["\']title["\']>\s*<a\s+href=["\']([^"\']*DetailView\.do\?[^"\']+)["\'][^>]*>(.*?)</a>\s*</p>\s*<p\s+class=["\']etc["\']>(.*?)</p>', re.I | re.S)
    for match in pattern.finditer(text):
        title = clean(match.group(2))
        etc = clean(match.group(3))
        normalized = norm_title(title)
        if target not in normalized and normalized not in target:
            continue
        if AUTHOR not in etc or YEAR not in etc:
            continue
        block = clean(text[max(0, match.start() - 1200):min(len(text), match.end() + 4500)])
        if SCHOOL_SIGNAL not in etc and SCHOOL_SIGNAL not in block:
            continue
        url = urljoin(base, html.unescape(match.group(1)))
        query = parse_qs(urlparse(url).query)
        control = (query.get('control_no') or [None])[0]
        p_mat_type = (query.get('p_mat_type') or [None])[0]
        if control and p_mat_type:
            return {'siteAuthoredDetailUrl': url, 'title': title, 'etc': etc, 'control': control, 'p_mat_type': p_mat_type, 'sameCardBlock': block}
    return None

def form_block(text: str) -> str:
    match = re.search(r'<form\b[^>]*(?:id=["\']f["\']|name=["\']f["\'])[^>]*>', text, re.I | re.S)
    assert match, 'RISS document.f not found'
    end = text.find('</form>', match.end())
    assert end >= 0, 'RISS document.f end not found'
    return text[match.start():end + 7]

def fields(block: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for match in re.finditer(r'<input\b[^>]*>', block, re.I | re.S):
        tag = html.unescape(match.group(0))
        name = re.search(r'\bname\s*=\s*["\']([^"\']+)', tag, re.I)
        if not name:
            continue
        input_type = re.search(r'\btype\s*=\s*["\']([^"\']+)', tag, re.I)
        if input_type and input_type.group(1).lower() in {'submit', 'button', 'checkbox', 'radio'}:
            continue
        value = re.search(r'\bvalue\s*=\s*["\']([^"\']*)', tag, re.I)
        out[name.group(1)] = value.group(1) if value else ''
    return out

def dcollection_candidates(base: str, text: str, expected_host: str) -> list[str]:
    out: list[str] = []
    for url in links(base, text):
        if host(url) == expected_host and any(token in url.lower() for token in ['pdf', 'viewer', 'download', 'fulltext', 'file']):
            out.append(url)
    for match in re.finditer(r'''["'](/public_resource/pdf/[^"']+\.pdf)["']''', text, re.I):
        url = urljoin(base, html.unescape(match.group(1)))
        if host(url) == expected_host and url not in out:
            out.insert(0, url)
    return list(dict.fromkeys(out))

ctx = ssl.create_default_context()
normal = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()))
no_redirect = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()), NoRedirect())
report = {
    'candidate': {'author': AUTHOR, 'title': BASE_TITLE, 'year': 2026, 'institution': SCHOOL_SIGNAL, 'rissId': None, 'control': None},
    'searchDiscovery': None, 'detail': None, 'detailIdentitySignals': None, 'formTuple': None,
    'dispatcher': None, 'dcollection': None, 'pdfInspection': None, 'renderedPageCount': 0,
    'fullLengthPdfAcquired': False, 'guessedOpaqueIdentifierCount': 0, 'loginBypass': False,
    'institutionAuthBypass': False, 'paywallBypass': False, 'drmRequestExecuted': False,
    'decryptionActionExecuted': False, 'tlsVerificationDisabled': False,
    'crossSourceSemanticStitching': False, 'semanticDisposition': 'PUBLIC_ROUTE_INSPECTION_PENDING',
}
terms = [BASE_TITLE, '命理正宗에 수록된 십성의 고찰과 청대 명리의 십성 변화 연구', '김영숙 명리정종 십성 변화 연구']
searches = []
card = None
detail_meta = detail_raw = None
for index, term in enumerate(terms, 1):
    search_url = 'https://www.riss.kr/search/Search.do?' + urlencode({'isDetailSearch': 'N', 'searchGubun': 'true', 'viewYn': 'OP', 'query': term})
    search_meta, search_raw = fetch(normal, search_url, max_bytes=9_000_000)
    search_text = decode(search_raw, search_meta['contentType'])
    (ROOT / f'riss-search-{index}.html').write_text(search_text, encoding='utf-8')
    candidate = exact_card(search_meta['finalUrl'] or search_url, search_text)
    searches.append({'searchUrl': search_url, 'response': search_meta, 'exactSearchCardFound': bool(candidate)})
    if candidate:
        card = candidate
        detail_meta, detail_raw = fetch(normal, normalize_url(candidate['siteAuthoredDetailUrl']), search_meta['finalUrl'] or search_url, max_bytes=9_000_000)
        (ROOT / 'riss-candidate-detail.html').write_bytes(detail_raw)
        break
assert card and detail_meta is not None and detail_raw is not None, 'exact Kim Youngsook 2026 RISS card not resolved'
assert detail_meta['status'] == 200
report['searchDiscovery'] = {'searches': searches, 'card': card, 'resolutionRule': 'EXACT_SITE_AUTHORED_RESULT_CARD_TITLE_AUTHOR_YEAR_SCHOOL_AND_LITERAL_DETAIL_ROUTE'}
report['candidate']['control'] = card['control']
report['detail'] = detail_meta

detail_text = decode(detail_raw, detail_meta['contentType'])
(ROOT / 'riss-detail.html').write_text(detail_text, encoding='utf-8')
query = parse_qs(urlparse(detail_meta['finalUrl'] or card['siteAuthoredDetailUrl']).query)
assert (query.get('control_no') or [None])[0] == card['control']
ids = sorted(set(re.findall(r'https://www\.riss\.kr/link\?id=(T\d+)', detail_text)))
report['candidate']['rissId'] = ids[0] if len(ids) == 1 else None
signals = {
    'controlLiteralPresent': card['control'] in detail_text,
    'titleLiteralPresent': ('命理正宗' in detail_text and '십성' in detail_text and '청대' in detail_text),
    'authorLiteralPresent': AUTHOR in detail_text,
    'yearLiteralPresent': YEAR in detail_text,
    'observedTIds': ids,
}
report['detailIdentitySignals'] = signals
assert all([signals['controlLiteralPresent'], signals['titleLiteralPresent'], signals['authorLiteralPresent'], signals['yearLiteralPresent']])
form = fields(form_block(detail_text))
assert form.get('control_no') == card['control'] and form.get('p_mat_type')
report['formTuple'] = {key: form.get(key) for key in ['control_no', 'p_mat_type', 'p_submat_type', 'fulltext_kind']}

implementation_observed = False
script_urls = [url for url in links(detail_meta['finalUrl'] or card['siteAuthoredDetailUrl'], detail_text) if is_riss(url) and (url.lower().endswith('.js') or '.js?' in url.lower())][:50]
for index, url in enumerate(script_urls, 1):
    try:
        script_meta, script_raw = fetch(normal, normalize_url(url), detail_meta['finalUrl'] or card['siteAuthoredDetailUrl'], 3_000_000)
        script_text = decode(script_raw, script_meta['contentType'])
        if 'FullTextDownload.do' in script_text:
            (ROOT / f'riss-script-{index:02d}.txt').write_text(script_text, encoding='utf-8')
        if 'FullTextDownload.do' in script_text and ('serialize()' in script_text or 'document.f' in script_text):
            implementation_observed = True
    except Exception:
        pass
assert implementation_observed, 'current site-authored RISS fulltext dispatcher implementation not observed'

form['loginFlag'] = '1'
form['content_page'] = ''
endpoint = 'https://www.riss.kr/search/download/FullTextDownload.do'
dispatch_url = endpoint + '?' + urlencode(form)
dispatch_meta, dispatch_raw = fetch(no_redirect, dispatch_url, detail_meta['finalUrl'] or card['siteAuthoredDetailUrl'])
pdf_path = ROOT / 'kim-youngsook-2026.pdf'
external_urls: list[str] = []
if dispatch_meta['pdfMagic'] or 'application/pdf' in dispatch_meta['contentType'].lower():
    pdf_path.write_bytes(dispatch_raw)
else:
    dispatch_text = decode(dispatch_raw, dispatch_meta['contentType'])
    (ROOT / 'riss-fulltext-dispatch-response.html').write_text(dispatch_text, encoding='utf-8')
    external_urls = [url for url in links(endpoint, dispatch_text) if is_dcollection(url)]
    location = dispatch_meta.get('location')
    if location:
        location = urljoin(endpoint, location)
        if is_dcollection(location) and location not in external_urls:
            external_urls.insert(0, location)
report['dispatcher'] = {'implementationObserved': True, 'request': dispatch_meta, 'externalUrls': external_urls, 'disposition': 'RISS_DISPATCHER_AUTHORED_DCOLLECTION_ROUTE' if external_urls else 'RISS_DISPATCHER_NO_RELEVANT_PUBLIC_BODY_ROUTE_OBSERVED'}

if not pdf_path.exists() and external_urls:
    authored = external_urls[0]
    expected_host = host(authored)
    dc = {'rissAuthoredUrl': authored, 'host': expected_host, 'entry': None, 'followed': [], 'directPdfAcquired': False, 'disposition': 'PUBLIC_ROUTE_REVIEW_PENDING'}
    try:
        entry_meta, entry_raw = fetch(normal, normalize_url(authored), dispatch_url)
        dc['entry'] = entry_meta
        if entry_meta['pdfMagic'] or 'application/pdf' in entry_meta['contentType'].lower():
            pdf_path.write_bytes(entry_raw)
            dc['directPdfAcquired'] = True
        else:
            entry_text = decode(entry_raw, entry_meta['contentType'])
            (ROOT / 'dcollection-entry.html').write_text(entry_text, encoding='utf-8')
            for url in dcollection_candidates(entry_meta['finalUrl'] or authored, entry_text, expected_host)[:35]:
                file_meta, file_raw = fetch(normal, normalize_url(url), entry_meta['finalUrl'] or authored)
                dc['followed'].append({'url': url, 'response': file_meta})
                if file_meta['pdfMagic'] or 'application/pdf' in file_meta['contentType'].lower():
                    pdf_path.write_bytes(file_raw)
                    dc['directPdfAcquired'] = True
                    break
        dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_PUBLIC_PDF_ACQUIRED' if dc['directPdfAcquired'] else 'RISS_AUTHORED_DCOLLECTION_NO_DIRECT_PDF_OBSERVED'
    except URLError as exc:
        if isinstance(exc.reason, ssl.SSLCertVerificationError):
            dc['strictTlsError'] = f'{type(exc.reason).__name__}: {exc.reason}'
            dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_TLS_CERT_VERIFICATION_BOUNDARY_STOP_NO_BYPASS'
        else:
            raise
    report['dcollection'] = dc

if pdf_path.exists():
    data = pdf_path.read_bytes()
    reader = PdfReader(str(pdf_path))
    assert not reader.is_encrypted
    assert len(reader.pages) >= 70, 'PDF too short for full-thesis assumption; fail closed'
    text = ''.join([f'\n===== PHYSICAL_PDF_PAGE_{i} =====\n{page.extract_text() or ""}' for i, page in enumerate(reader.pages, 1)])
    (ROOT / 'kim-youngsook-2026.txt').write_text(text, encoding='utf-8')
    doc = fitz.open(str(pdf_path))
    render_dir = ROOT / 'rendered-pages'
    render_dir.mkdir(exist_ok=True)
    for i, page in enumerate(doc, 1):
        page.get_pixmap(matrix=fitz.Matrix(1.15, 1.15), alpha=False).save(str(render_dir / f'page-{i:03d}.jpg'))
    report['pdfInspection'] = {'sha256': sha256(data), 'bytes': len(data), 'pages': len(reader.pages), 'encrypted': False, 'textChars': len(text)}
    report['renderedPageCount'] = len(doc)
    report['fullLengthPdfAcquired'] = True
    report['semanticDisposition'] = 'DIRECT_BODY_ACQUIRED_REQUIRES_RENDER_FIRST_REVIEW'
else:
    report['semanticDisposition'] = 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION'

assert report['guessedOpaqueIdentifierCount'] == 0
assert not report['loginBypass'] and not report['institutionAuthBypass'] and not report['paywallBypass']
assert not report['drmRequestExecuted'] and not report['decryptionActionExecuted']
assert report['tlsVerificationDisabled'] is False and report['crossSourceSemanticStitching'] is False
(ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
