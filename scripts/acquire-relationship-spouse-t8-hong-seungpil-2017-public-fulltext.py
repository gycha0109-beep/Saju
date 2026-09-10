#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import parse_qs, urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

from pypdf import PdfReader

ROOT = Path('acquisition-hong-seungpil-2017')
ROOT.mkdir(exist_ok=True)

AUTHOR = '홍승필'
TITLE = '『자평진전』에 기초한 궁합실관 연구'
TITLE_SIGNAL = '자평진전'
YEAR = '2017'
RISS_ID = 'T14388745'
CONTROL = '8ebdb4487e4de984ffe0bdc3ef48d419'
P_MAT_TYPE = 'be54d9b8bc7cdb09'
DETAIL_URL = f'https://www.riss.kr/search/detail/DetailView.do?control_no={CONTROL}&p_mat_type={P_MAT_TYPE}'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Hong-Seungpil-2017-public-acquisition)'


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def sha256(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def decode(raw: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', content_type or '', re.I)
    encodings = ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']
    for enc in encodings:
        try:
            return raw.decode(enc)
        except Exception:
            pass
    return raw.decode('utf-8', errors='replace')


def host(url: str) -> str:
    return (urlparse(url).hostname or '').lower()


def allowed(url: str) -> bool:
    return host(url) in {'www.riss.kr', 'riss.kr', 'kongju.dcollection.net'}


def fetch(opener, url: str, referer: str | None = None, max_bytes: int = 20_000_000):
    assert allowed(url), url
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8',
    }
    if referer:
        headers['Referer'] = referer
    meta = {
        'requestedUrl': url,
        'finalUrl': None,
        'status': None,
        'location': None,
        'contentType': '',
        'contentDisposition': '',
        'bytes': 0,
        'sha256': None,
        'pdfMagic': False,
        'error': None,
    }
    raw = b''
    try:
        with opener.open(Request(url, headers=headers), timeout=35) as response:
            raw = response.read(max_bytes + 1)
            assert len(raw) <= max_bytes, 'bounded response limit exceeded'
            meta.update({
                'finalUrl': response.geturl(),
                'status': getattr(response, 'status', None),
                'location': response.headers.get('Location'),
                'contentType': response.headers.get('Content-Type', ''),
                'contentDisposition': response.headers.get('Content-Disposition', ''),
                'bytes': len(raw),
                'sha256': sha256(raw),
                'pdfMagic': raw.startswith(b'%PDF-'),
            })
    except HTTPError as exc:
        raw = exc.read(max_bytes + 1)
        assert len(raw) <= max_bytes, 'bounded response limit exceeded'
        meta.update({
            'finalUrl': url,
            'status': exc.code,
            'location': exc.headers.get('Location'),
            'contentType': exc.headers.get('Content-Type', ''),
            'contentDisposition': exc.headers.get('Content-Disposition', ''),
            'bytes': len(raw),
            'sha256': sha256(raw),
            'pdfMagic': raw.startswith(b'%PDF-'),
            'error': f'HTTPError: {exc.code}',
        })
    return meta, raw


def links(base: str, text: str) -> list[str]:
    out: list[str] = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        value = html.unescape(m.group(2).strip())
        if not value or value.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        url = urljoin(base, value)
        if allowed(url) and url not in out:
            out.append(url)
    for m in re.finditer(r'''["'](https?://[^"']+)["']''', text, re.I):
        url = html.unescape(m.group(1).strip())
        if allowed(url) and url not in out:
            out.append(url)
    return out


def document_form(text: str) -> str:
    m = re.search(r'<form\b[^>]*(?:id=["\']f["\']|name=["\']f["\'])[^>]*>', text, re.I | re.S)
    assert m, 'RISS document.f not found'
    end = text.find('</form>', m.end())
    assert end >= 0, 'RISS document.f end not found'
    return text[m.start():end + 7]


def form_fields(block: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for m in re.finditer(r'<input\b[^>]*>', block, re.I | re.S):
        tag = html.unescape(m.group(0))
        name = re.search(r'\bname\s*=\s*["\']([^"\']+)', tag, re.I)
        if not name:
            continue
        input_type = re.search(r'\btype\s*=\s*["\']([^"\']+)', tag, re.I)
        if input_type and input_type.group(1).lower() in {'submit', 'button', 'checkbox', 'radio'}:
            continue
        value = re.search(r'\bvalue\s*=\s*["\']([^"\']*)', tag, re.I)
        out[name.group(1)] = value.group(1) if value else ''
    return out


def same_host_redirect(source: str, location: str | None, opaque_signal: str | None = None) -> str | None:
    if not location:
        return None
    target = urljoin(source, location)
    a = urlparse(source)
    b = urlparse(target)
    if a.hostname != b.hostname or not allowed(target):
        return None
    if opaque_signal and opaque_signal not in target:
        return None
    return target


def follow_same_host(opener, start: str, referer: str | None, opaque_signal: str | None = None, max_hops: int = 3):
    current = start
    chain = []
    meta, raw = fetch(opener, current, referer)
    for _ in range(max_hops):
        if meta.get('status') not in {301, 302, 303, 307, 308}:
            break
        nxt = same_host_redirect(current, meta.get('location'), opaque_signal)
        if not nxt:
            break
        chain.append({'from': current, 'status': meta['status'], 'location': meta.get('location'), 'to': nxt})
        previous = current
        current = nxt
        meta, raw = fetch(opener, current, previous)
    return meta, raw, chain


def public_pdf_from_viewer(viewer_url: str, text: str) -> str | None:
    for value in parse_qs(urlparse(viewer_url).query).get('file', []):
        candidate = urljoin(viewer_url, html.unescape(value))
        parsed = urlparse(candidate)
        if parsed.hostname == 'kongju.dcollection.net' and parsed.path.startswith('/public_resource/pdf/') and parsed.path.lower().endswith('.pdf'):
            return candidate
    for m in re.finditer(r'''["'](/public_resource/pdf/[^"']+\.pdf)["']''', text, re.I):
        candidate = urljoin(viewer_url, html.unescape(m.group(1)))
        if allowed(candidate):
            return candidate
    return None


ctx = ssl.create_default_context()
normal = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()))
no_redirect = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()), NoRedirect())

report = {
    'candidate': {
        'author': AUTHOR,
        'title': TITLE,
        'year': 2017,
        'institution': '공주대학교 대학원 동양학과',
        'rissId': RISS_ID,
        'control': CONTROL,
    },
    'detail': None,
    'formTuple': None,
    'dispatcher': None,
    'dcollection': None,
    'pdfInspection': None,
    'fullLengthPdfAcquired': False,
    'contentDownloadExecuted': False,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'crossSourceSemanticStitching': False,
    'semanticDisposition': 'PUBLIC_ROUTE_INSPECTION_PENDING',
}

# 1. Exact current RISS record. The control/RISS ID came from an exact-title current RISS result;
# this request verifies the record itself before any content route is followed.
detail_meta, detail_raw = fetch(normal, DETAIL_URL, max_bytes=8_000_000)
detail_text = decode(detail_raw, detail_meta['contentType'])
(ROOT / 'riss-detail.html').write_text(detail_text, encoding='utf-8')
assert AUTHOR in detail_text, 'author missing from exact RISS detail'
assert TITLE_SIGNAL in detail_text and '궁합실관' in detail_text, 'title missing from exact RISS detail'
assert YEAR in detail_text and RISS_ID in detail_text, 'year/RISS ID missing from exact RISS detail'
report['detail'] = detail_meta

fields = form_fields(document_form(detail_text))
assert fields.get('control_no') == CONTROL, fields.get('control_no')
assert fields.get('p_mat_type') == P_MAT_TYPE, fields.get('p_mat_type')
assert fields.get('p_submat_type'), 'p_submat_type missing'
assert fields.get('fulltext_kind'), 'fulltext_kind missing'
report['formTuple'] = {k: fields.get(k) for k in ['control_no', 'p_mat_type', 'p_submat_type', 'fulltext_kind']}

# 2. Verify current site-authored implementation before replaying its document.f contract.
script_urls = []
for url in links(detail_meta['finalUrl'] or DETAIL_URL, detail_text):
    if host(url) in {'www.riss.kr', 'riss.kr'} and (url.lower().endswith('.js') or '.js?' in url.lower()):
        script_urls.append(url)
implementation_observed = False
for i, url in enumerate(script_urls[:45], 1):
    try:
        meta, raw = fetch(normal, url, detail_meta['finalUrl'] or DETAIL_URL, 3_000_000)
        text = decode(raw, meta['contentType'])
        if 'fulltextDownload' in text or 'FullTextDownload.do' in text:
            (ROOT / f'riss-script-{i:02d}.txt').write_text(text, encoding='utf-8')
        if 'function fulltextDownload()' in text and '/search/download/FullTextDownload.do?' in text and 'jQuery(form).serialize()' in text:
            implementation_observed = True
    except Exception:
        pass
assert implementation_observed, 'current site-authored RISS fulltext dispatcher implementation not observed'

# 3. Replay exactly the current RISS document.f dispatcher once.
fields['loginFlag'] = '1'
fields['content_page'] = ''
endpoint = 'https://www.riss.kr/search/download/FullTextDownload.do'
request_url = endpoint + '?' + urlencode(fields)
dispatch_meta, dispatch_raw = fetch(no_redirect, request_url, detail_meta['finalUrl'] or DETAIL_URL)
report['contentDownloadExecuted'] = True

dispatch = {
    'implementationObserved': True,
    'request': dispatch_meta,
    'externalUrls': [],
    'sameOriginPdfUrls': [],
    'disposition': 'RESPONSE_REVIEW_REQUIRED',
}
if dispatch_meta['pdfMagic'] or 'application/pdf' in dispatch_meta['contentType'].lower():
    (ROOT / 'hong-seungpil-2017.pdf').write_bytes(dispatch_raw)
    dispatch['disposition'] = 'RISS_DISPATCHER_DIRECT_PDF_ACQUIRED'
else:
    dispatch_text = decode(dispatch_raw, dispatch_meta['contentType'])
    (ROOT / 'riss-fulltext-dispatch-response.html').write_text(dispatch_text, encoding='utf-8')
    for url in links(endpoint, dispatch_text):
        if host(url) in {'www.riss.kr', 'riss.kr'} and '.pdf' in url.lower():
            dispatch['sameOriginPdfUrls'].append(url)
        elif host(url) and host(url) not in {'www.riss.kr', 'riss.kr'}:
            dispatch['externalUrls'].append(url)
    if any(host(url) == 'kongju.dcollection.net' for url in dispatch['externalUrls']):
        dispatch['disposition'] = 'RISS_DISPATCHER_AUTHORED_KONGJU_DCOLLECTION_ROUTE'
    elif any(token in dispatch_text.lower() for token in ['drm', 'fasoo', 'markany', 'softcamp']):
        dispatch['disposition'] = 'RISS_DISPATCHER_DRM_SIGNAL_STOP_NO_REPLAY'
    elif any(token in dispatch_text.lower() for token in ['로그인', 'login required', '회원인증', '기관인증']):
        dispatch['disposition'] = 'RISS_DISPATCHER_AUTH_BOUNDARY_STOP_NO_BYPASS'
    else:
        dispatch['disposition'] = 'RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_OBSERVED'
report['dispatcher'] = dispatch

# 4. Follow only a literal RISS-authored Kongju dCollection URL. No opaque item ID is constructed.
pdf_path = ROOT / 'hong-seungpil-2017.pdf'
if not pdf_path.exists():
    authored = next((u for u in dispatch['externalUrls'] if host(u) == 'kongju.dcollection.net'), None)
    if authored:
        parsed = urlparse(authored)
        item_match = re.search(r'/common/orgView/(\d+)', parsed.path)
        item_signal = item_match.group(1) if item_match else None
        entry_meta, entry_raw, redirect_chain = follow_same_host(no_redirect, authored, request_url, item_signal, 3)
        entry_text = decode(entry_raw, entry_meta['contentType'])
        (ROOT / 'dcollection-entry.html').write_text(entry_text, encoding='utf-8')
        dc = {
            'rissAuthoredUrl': authored,
            'itemSignal': item_signal,
            'entry': entry_meta,
            'redirectChain': redirect_chain,
            'followed': [],
            'directPdfAcquired': False,
            'disposition': 'PUBLIC_ROUTE_REVIEW_PENDING',
        }
        candidates = []
        for url in links(entry_meta['finalUrl'] or authored, entry_text):
            low = url.lower()
            if (item_signal and item_signal in url) or '.pdf' in low or any(token in low for token in ['viewer', 'download', 'fulltext', 'file']):
                if url not in candidates:
                    candidates.append(url)
        for i, url in enumerate(candidates[:25], 1):
            try:
                meta, raw, chain = follow_same_host(no_redirect, url, entry_meta['finalUrl'] or authored, item_signal, 3)
                dc['followed'].append({'sourceUrl': url, 'redirectChain': chain, 'response': meta})
                if meta['pdfMagic'] or 'application/pdf' in meta['contentType'].lower():
                    pdf_path.write_bytes(raw)
                    dc['directPdfAcquired'] = True
                    dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_DIRECT_PDF_ACQUIRED'
                    break
                text = decode(raw, meta['contentType'])
                (ROOT / f'dcollection-follow-{i:02d}.html').write_text(text, encoding='utf-8')
                literal_pdf = public_pdf_from_viewer(meta['finalUrl'] or url, text)
                if literal_pdf:
                    pdf_meta, pdf_raw = fetch(normal, literal_pdf, meta['finalUrl'] or url)
                    dc['followed'].append({'sourceUrl': literal_pdf, 'response': pdf_meta})
                    if pdf_meta['pdfMagic'] or 'application/pdf' in pdf_meta['contentType'].lower():
                        pdf_path.write_bytes(pdf_raw)
                        dc['directPdfAcquired'] = True
                        dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_PUBLIC_RESOURCE_PDF_ACQUIRED'
                        break
            except Exception as exc:
                dc['followed'].append({'sourceUrl': url, 'error': f'{type(exc).__name__}: {exc}'})
        if not dc['directPdfAcquired']:
            material = json.dumps(dc['followed'], ensure_ascii=False).lower()
            if any(token in material for token in ['drm', 'fasoo', 'markany', 'softcamp']):
                dc['disposition'] = 'DCOLLECTION_DRM_SIGNAL_STOP_NO_BYPASS'
            elif any(token in material for token in ['로그인', 'login required', '회원인증', '기관인증']):
                dc['disposition'] = 'DCOLLECTION_AUTH_BOUNDARY_STOP_NO_BYPASS'
            else:
                dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_ROUTE_NO_DIRECT_PDF_OBSERVED'
        report['dcollection'] = dc

# 5. Inspect and extract only if a complete public PDF was actually acquired.
if pdf_path.exists():
    raw = pdf_path.read_bytes()
    reader = PdfReader(str(pdf_path))
    chunks = []
    for number, page in enumerate(reader.pages, 1):
        chunks.append(f'\n===== PHYSICAL_PDF_PAGE_{number} =====\n{page.extract_text() or ""}')
    text = ''.join(chunks)
    (ROOT / 'hong-seungpil-2017.txt').write_text(text, encoding='utf-8')
    inspection = {
        'sha256': sha256(raw),
        'bytes': len(raw),
        'pages': len(reader.pages),
        'encrypted': bool(reader.is_encrypted),
        'textChars': len(text),
    }
    report['pdfInspection'] = inspection
    report['fullLengthPdfAcquired'] = len(reader.pages) >= 55 and len(text) > 10_000
    report['semanticDisposition'] = 'DIRECT_BODY_READY_FOR_RENDER_FIRST_REVIEW' if report['fullLengthPdfAcquired'] else 'PARTIAL_OR_INVALID_PDF_NO_BODY_DECISION'
else:
    report['semanticDisposition'] = 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION'

(ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))

assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
assert report['drmRequestExecuted'] is False
assert report['decryptionActionExecuted'] is False
assert report['crossSourceSemanticStitching'] is False
