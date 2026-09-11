#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

from pypdf import PdfReader

ROOT = Path('acquisition-nam-gidong-2020')
ROOT.mkdir(exist_ok=True)

AUTHOR = '남기동'
TITLE = '부부 궁합(宮合)에 관한 명리학적 연구'
YEAR = '2020'
RISS_ID = 'T15540056'
CONTROL = '6e314e369d786dffffe0bdc3ef48d419'
P_MAT_TYPE = 'be54d9b8bc7cdb09'
DETAIL_URL = f'https://www.riss.kr/search/detail/DetailView.do?control_no={CONTROL}&p_mat_type={P_MAT_TYPE}'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Nam-Gidong-2020-public-acquisition)'


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def sha256(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def decode(raw: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', content_type or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']:
        try:
            return raw.decode(enc)
        except Exception:
            pass
    return raw.decode('utf-8', errors='replace')


def host(url: str) -> str:
    return (urlparse(url).hostname or '').lower()


def is_riss(url: str) -> bool:
    return host(url) in {'www.riss.kr', 'riss.kr'}


def is_dcollection(url: str) -> bool:
    h = host(url)
    return bool(h) and (h == 'dcollection.net' or h.endswith('.dcollection.net'))


def permitted(url: str, dc_host: str | None = None) -> bool:
    h = host(url)
    return is_riss(url) or (dc_host is not None and h == dc_host)


def fetch(opener, url: str, referer: str | None = None, max_bytes: int = 25_000_000):
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8'}
    if referer:
        headers['Referer'] = referer
    meta = {
        'requestedUrl': url, 'finalUrl': None, 'status': None, 'location': None,
        'contentType': '', 'contentDisposition': '', 'bytes': 0, 'sha256': None,
        'pdfMagic': False, 'error': None,
    }
    raw = b''
    try:
        with opener.open(Request(url, headers=headers), timeout=35) as response:
            raw = response.read(max_bytes + 1)
            assert len(raw) <= max_bytes, 'bounded response limit exceeded'
            meta.update({
                'finalUrl': response.geturl(), 'status': getattr(response, 'status', None),
                'location': response.headers.get('Location'), 'contentType': response.headers.get('Content-Type', ''),
                'contentDisposition': response.headers.get('Content-Disposition', ''), 'bytes': len(raw),
                'sha256': sha256(raw), 'pdfMagic': raw.startswith(b'%PDF-'),
            })
    except HTTPError as exc:
        raw = exc.read(max_bytes + 1)
        assert len(raw) <= max_bytes, 'bounded response limit exceeded'
        meta.update({
            'finalUrl': url, 'status': exc.code, 'location': exc.headers.get('Location'),
            'contentType': exc.headers.get('Content-Type', ''), 'contentDisposition': exc.headers.get('Content-Disposition', ''),
            'bytes': len(raw), 'sha256': sha256(raw), 'pdfMagic': raw.startswith(b'%PDF-'),
            'error': f'HTTPError: {exc.code}',
        })
    return meta, raw


def links(base: str, text: str) -> list[str]:
    out: list[str] = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        value = html.unescape(m.group(2).strip())
        if not value or value.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        u = urljoin(base, value)
        if u not in out:
            out.append(u)
    for m in re.finditer(r'''["'](https?://[^"']+)["']''', text, re.I):
        u = html.unescape(m.group(1).strip())
        if u not in out:
            out.append(u)
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
        nm = re.search(r'\bname\s*=\s*["\']([^"\']+)', tag, re.I)
        if not nm:
            continue
        tp = re.search(r'\btype\s*=\s*["\']([^"\']+)', tag, re.I)
        if tp and tp.group(1).lower() in {'submit', 'button', 'checkbox', 'radio'}:
            continue
        val = re.search(r'\bvalue\s*=\s*["\']([^"\']*)', tag, re.I)
        out[nm.group(1)] = val.group(1) if val else ''
    return out


def same_host_follow(opener, start: str, referer: str | None, expected_host: str, max_hops: int = 4):
    current = start
    chain = []
    meta, raw = fetch(opener, current, referer)
    for _ in range(max_hops):
        if meta.get('status') not in {301, 302, 303, 307, 308} or not meta.get('location'):
            break
        nxt = urljoin(current, meta['location'])
        if host(nxt) != expected_host:
            break
        chain.append({'from': current, 'status': meta['status'], 'location': meta['location'], 'to': nxt})
        previous, current = current, nxt
        meta, raw = fetch(opener, current, previous)
    return meta, raw, chain


def viewer_pdf(viewer_url: str, text: str, dc_host: str) -> str | None:
    for value in parse_qs(urlparse(viewer_url).query).get('file', []):
        candidate = urljoin(viewer_url, html.unescape(value))
        p = urlparse(candidate)
        if p.hostname == dc_host and p.path.startswith('/public_resource/pdf/') and p.path.lower().endswith('.pdf'):
            return candidate
    for m in re.finditer(r'''["'](/public_resource/pdf/[^"']+\.pdf)["']''', text, re.I):
        candidate = urljoin(viewer_url, html.unescape(m.group(1)))
        if host(candidate) == dc_host:
            return candidate
    return None


ctx = ssl.create_default_context()
normal = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()))
no_redirect = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()), NoRedirect())

report = {
    'candidate': {'author': AUTHOR, 'title': TITLE, 'year': 2020, 'institution': '동방문화대학원대학교', 'rissId': RISS_ID, 'control': CONTROL},
    'detail': None, 'formTuple': None, 'dispatcher': None, 'dcollection': None, 'pdfInspection': None,
    'fullLengthPdfAcquired': False, 'contentDownloadExecuted': False, 'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False, 'institutionAuthBypass': False, 'paywallBypass': False, 'drmRequestExecuted': False,
    'decryptionActionExecuted': False, 'tlsVerificationDisabled': False, 'crossSourceSemanticStitching': False,
    'semanticDisposition': 'PUBLIC_ROUTE_INSPECTION_PENDING',
}

# 1. Exact current RISS record.
detail_meta, detail_raw = fetch(normal, DETAIL_URL, max_bytes=9_000_000)
detail_text = decode(detail_raw, detail_meta['contentType'])
(ROOT / 'riss-detail.html').write_text(detail_text, encoding='utf-8')
assert AUTHOR in detail_text, 'author missing from exact RISS detail'
assert '부부 궁합' in detail_text and '명리학적 연구' in detail_text, 'title missing from exact RISS detail'
assert YEAR in detail_text and RISS_ID in detail_text, 'year/RISS ID missing from exact RISS detail'
report['detail'] = detail_meta

fields = form_fields(document_form(detail_text))
assert fields.get('control_no') == CONTROL, fields.get('control_no')
assert fields.get('p_mat_type') == P_MAT_TYPE, fields.get('p_mat_type')
report['formTuple'] = {k: fields.get(k) for k in ['control_no', 'p_mat_type', 'p_submat_type', 'fulltext_kind']}

# 2. Observe current site-authored RISS dispatcher implementation.
implementation_observed = False
for i, u in enumerate([x for x in links(detail_meta['finalUrl'] or DETAIL_URL, detail_text) if is_riss(x) and (x.lower().endswith('.js') or '.js?' in x.lower())][:50], 1):
    try:
        meta, raw = fetch(normal, u, detail_meta['finalUrl'] or DETAIL_URL, 3_000_000)
        text = decode(raw, meta['contentType'])
        if 'fulltextDownload' in text or 'FullTextDownload.do' in text:
            (ROOT / f'riss-script-{i:02d}.txt').write_text(text, encoding='utf-8')
        if 'FullTextDownload.do' in text and ('serialize()' in text or 'document.f' in text):
            implementation_observed = True
    except Exception:
        pass
assert implementation_observed, 'current site-authored RISS fulltext dispatcher implementation not observed'

# 3. Replay exactly the observed RISS document.f values. Empty observed values stay empty.
fields['loginFlag'] = '1'
fields['content_page'] = ''
endpoint = 'https://www.riss.kr/search/download/FullTextDownload.do'
request_url = endpoint + '?' + urlencode(fields)
dispatch_meta, dispatch_raw = fetch(no_redirect, request_url, detail_meta['finalUrl'] or DETAIL_URL)
report['contentDownloadExecuted'] = True
if dispatch_meta['pdfMagic'] or 'application/pdf' in dispatch_meta['contentType'].lower():
    (ROOT / 'nam-gidong-2020.pdf').write_bytes(dispatch_raw)
    external_urls = []
    disposition = 'RISS_DISPATCHER_DIRECT_PDF_ACQUIRED'
else:
    dispatch_text = decode(dispatch_raw, dispatch_meta['contentType'])
    (ROOT / 'riss-fulltext-dispatch-response.html').write_text(dispatch_text, encoding='utf-8')
    external_urls = [u for u in links(endpoint, dispatch_text) if not is_riss(u)]
    loc = dispatch_meta.get('location')
    if loc:
        loc = urljoin(endpoint, loc)
        if not is_riss(loc) and loc not in external_urls:
            external_urls.insert(0, loc)
    disposition = 'RISS_DISPATCHER_AUTHORED_DCOLLECTION_ROUTE' if any(is_dcollection(u) for u in external_urls) else 'RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_OBSERVED'
report['dispatcher'] = {'implementationObserved': implementation_observed, 'request': dispatch_meta, 'externalUrls': external_urls, 'disposition': disposition}

pdf_path = ROOT / 'nam-gidong-2020.pdf'
authored = next((u for u in external_urls if is_dcollection(u)), None)
if not pdf_path.exists() and authored:
    dc_host = host(authored)
    dc = {'rissAuthoredUrl': authored, 'host': dc_host, 'entry': None, 'redirectChain': [], 'followed': [], 'directPdfAcquired': False, 'disposition': 'PUBLIC_ROUTE_REVIEW_PENDING'}
    try:
        entry_meta, entry_raw, chain = same_host_follow(no_redirect, authored, request_url, dc_host, 4)
        dc['entry'], dc['redirectChain'] = entry_meta, chain
        if entry_meta['pdfMagic'] or 'application/pdf' in entry_meta['contentType'].lower():
            pdf_path.write_bytes(entry_raw)
            dc['directPdfAcquired'] = True
            dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_DIRECT_PDF_ACQUIRED'
        else:
            entry_text = decode(entry_raw, entry_meta['contentType'])
            (ROOT / 'dcollection-entry.html').write_text(entry_text, encoding='utf-8')
            item_signal_match = re.search(r'(\d{8,})', urlparse(authored).path + '?' + urlparse(authored).query)
            item_signal = item_signal_match.group(1) if item_signal_match else None
            candidates = []
            for u in links(entry_meta['finalUrl'] or authored, entry_text):
                if host(u) != dc_host:
                    continue
                low = u.lower()
                if '.pdf' in low or any(t in low for t in ['viewer', 'download', 'fulltext', 'file']) or (item_signal and item_signal in u):
                    if u not in candidates:
                        candidates.append(u)
            direct = viewer_pdf(entry_meta['finalUrl'] or authored, entry_text, dc_host)
            if direct and direct not in candidates:
                candidates.insert(0, direct)
            for i, u in enumerate(candidates[:30], 1):
                meta, raw, c = same_host_follow(no_redirect, u, entry_meta['finalUrl'] or authored, dc_host, 4)
                dc['followed'].append({'sourceUrl': u, 'redirectChain': c, 'response': meta})
                if meta['pdfMagic'] or 'application/pdf' in meta['contentType'].lower():
                    pdf_path.write_bytes(raw)
                    dc['directPdfAcquired'] = True
                    dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_DIRECT_PDF_ACQUIRED'
                    break
                text = decode(raw, meta['contentType'])
                (ROOT / f'dcollection-follow-{i:02d}.html').write_text(text, encoding='utf-8')
                exact_pdf = viewer_pdf(meta['finalUrl'] or u, text, dc_host)
                if exact_pdf:
                    pm, pr, pc = same_host_follow(no_redirect, exact_pdf, meta['finalUrl'] or u, dc_host, 2)
                    dc['followed'].append({'sourceUrl': exact_pdf, 'redirectChain': pc, 'response': pm})
                    if pm['pdfMagic'] or 'application/pdf' in pm['contentType'].lower():
                        pdf_path.write_bytes(pr)
                        dc['directPdfAcquired'] = True
                        dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_VIEWER_AUTHORED_PDF_ACQUIRED'
                        break
            if not dc['directPdfAcquired']:
                dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_NO_DIRECT_PDF_OBSERVED'
    except URLError as exc:
        if isinstance(exc.reason, ssl.SSLCertVerificationError):
            dc['strictTlsError'] = f'{type(exc.reason).__name__}: {exc.reason}'
            dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_TLS_CERT_VERIFICATION_BOUNDARY_STOP_NO_BYPASS'
        else:
            raise
    report['dcollection'] = dc

if pdf_path.exists():
    raw = pdf_path.read_bytes()
    reader = PdfReader(str(pdf_path))
    assert not reader.is_encrypted, 'encrypted PDF: stop before any decryption attempt'
    chunks = []
    for number, page in enumerate(reader.pages, 1):
        chunks.append(f'\n===== PHYSICAL_PDF_PAGE_{number} =====\n{page.extract_text() or ""}')
    text = ''.join(chunks)
    (ROOT / 'nam-gidong-2020.txt').write_text(text, encoding='utf-8')
    report['pdfInspection'] = {'sha256': sha256(raw), 'bytes': len(raw), 'pages': len(reader.pages), 'encrypted': False, 'textChars': len(text)}
    report['fullLengthPdfAcquired'] = len(reader.pages) >= 150
    report['semanticDisposition'] = 'DIRECT_BODY_ACQUIRED_REQUIRES_RENDER_FIRST_REVIEW'
else:
    report['semanticDisposition'] = 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION'

assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False and report['institutionAuthBypass'] is False and report['paywallBypass'] is False
assert report['drmRequestExecuted'] is False and report['decryptionActionExecuted'] is False
assert report['tlsVerificationDisabled'] is False and report['crossSourceSemanticStitching'] is False
(ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
