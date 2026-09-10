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
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

ROOT = Path('acquisition-choi-eunkyung-2013')
REPORT = ROOT / 'riss-dispatcher-report.json'
OUT = ROOT / 'riss-downloading-report.json'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Choi-Eunkyung-2013-RISS-downloading)'


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def digest(body: bytes) -> str:
    return hashlib.sha256(body).hexdigest()


def decode(body: bytes, ctype: str = '') -> str:
    match = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([match.group(1)] if match else []) + ['utf-8', 'cp949', 'euc-kr']:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def is_riss(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() in {'www.riss.kr', 'riss.kr'}


def fetch(opener, url: str, referer: str | None = None, max_bytes: int = 25_000_000):
    assert is_riss(url), url
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8'}
    if referer:
        headers['Referer'] = referer
    meta = {'requestedUrl': url, 'status': None, 'location': None, 'contentType': '', 'contentDisposition': '', 'bytes': 0, 'sha256': None, 'pdfMagic': False, 'error': None}
    body = b''
    try:
        with opener.open(Request(url, headers=headers), timeout=35) as resp:
            body = resp.read(max_bytes + 1)
            assert len(body) <= max_bytes
            meta.update({'status': getattr(resp, 'status', None), 'location': resp.headers.get('Location'), 'contentType': resp.headers.get('Content-Type', ''), 'contentDisposition': resp.headers.get('Content-Disposition', ''), 'bytes': len(body), 'sha256': digest(body), 'pdfMagic': body.startswith(b'%PDF-')})
    except HTTPError as exc:
        body = exc.read(max_bytes + 1)
        assert len(body) <= max_bytes
        meta.update({'status': exc.code, 'location': exc.headers.get('Location'), 'contentType': exc.headers.get('Content-Type', ''), 'contentDisposition': exc.headers.get('Content-Disposition', ''), 'bytes': len(body), 'sha256': digest(body), 'pdfMagic': body.startswith(b'%PDF-'), 'error': f'HTTPError: {exc.code}'})
    return meta, body


def same_origin_literals(base: str, text: str) -> list[str]:
    out: list[str] = []
    for match in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(match.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        url = urljoin(base, raw)
        if is_riss(url) and url not in out:
            out.append(url)
    return out


source = json.loads(REPORT.read_text(encoding='utf-8'))
candidates = []
for url in source.get('literalUrls', []):
    parsed = urlparse(url)
    if is_riss(url) and parsed.path == '/search/download/Downloading.do':
        candidates.append(url)
assert len(candidates) == 1, {'rissAuthoredDownloadingCandidates': candidates}
start = candidates[0]
ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()), NoRedirect())
out = {'rissAuthoredDownloadingUrl': start, 'requests': [], 'directPdfAcquired': False, 'externalRedirectObserved': None, 'contentDownloadExecuted': True, 'guessedOpaqueIdentifierCount': 0, 'loginBypass': False, 'institutionAuthBypass': False, 'paywallBypass': False, 'drmRequestExecuted': False, 'decryptionActionExecuted': False, 'disposition': 'RESPONSE_REVIEW_REQUIRED'}
current = start
referer = source['request']['requestedUrl']
body = b''
meta = None
for _ in range(3):
    meta, body = fetch(opener, current, referer)
    out['requests'].append(meta)
    if meta['pdfMagic'] or 'application/pdf' in meta['contentType'].lower():
        (ROOT / 'choi-eunkyung-2013.pdf').write_bytes(body)
        out['directPdfAcquired'] = True
        out['disposition'] = 'RISS_AUTHORED_DOWNLOADING_DIRECT_PDF_ACQUIRED'
        break
    if meta.get('status') not in {301, 302, 303, 307, 308} or not meta.get('location'):
        break
    target = urljoin(current, meta['location'])
    if not is_riss(target):
        out['externalRedirectObserved'] = target
        out['disposition'] = 'RISS_AUTHORED_DOWNLOADING_EXTERNAL_REDIRECT_STOP_PENDING_SEPARATE_REVIEW'
        break
    referer, current = current, target

if not out['directPdfAcquired'] and body and meta and 'text/html' in meta['contentType'].lower():
    text = decode(body, meta['contentType'])
    (ROOT / 'riss-downloading-response.html').write_text(text, encoding='utf-8')
    pdf_literals = [url for url in same_origin_literals(meta['requestedUrl'], text) if urlparse(url).path.lower().endswith('.pdf')]
    if len(pdf_literals) == 1:
        pdf_meta, pdf_body = fetch(opener, pdf_literals[0], meta['requestedUrl'])
        out['requests'].append(pdf_meta)
        if pdf_meta['pdfMagic'] or 'application/pdf' in pdf_meta['contentType'].lower():
            (ROOT / 'choi-eunkyung-2013.pdf').write_bytes(pdf_body)
            out['directPdfAcquired'] = True
            out['disposition'] = 'RISS_AUTHORED_DOWNLOADING_PDF_LITERAL_ACQUIRED'
    elif out['disposition'] == 'RESPONSE_REVIEW_REQUIRED':
        low = text.lower()
        if any(token in low for token in ['drm', 'fasoo', 'markany', 'softcamp']):
            out['disposition'] = 'RISS_DOWNLOADING_DRM_SIGNAL_STOP_NO_REPLAY'
        elif any(token in low for token in ['로그인', 'login required', '회원인증', '기관인증']):
            out['disposition'] = 'RISS_DOWNLOADING_AUTH_BOUNDARY_STOP_NO_BYPASS'
        else:
            out['disposition'] = 'RISS_AUTHORED_DOWNLOADING_NO_DIRECT_PDF_OBSERVED'

OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(out, ensure_ascii=False, indent=2))
assert out['guessedOpaqueIdentifierCount'] == 0
assert out['loginBypass'] is False and out['institutionAuthBypass'] is False and out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False and out['decryptionActionExecuted'] is False
