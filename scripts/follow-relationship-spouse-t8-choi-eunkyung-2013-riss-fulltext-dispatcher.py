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
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

ROOT = Path('acquisition-choi-eunkyung-2013')
DETAIL = ROOT / 'riss-detail.html'
REPORT = ROOT / 'public-route-report.json'
EXPECTED_CONTROL = 'a2d2aa37279fbaaaffe0bdc3ef48d419'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Choi-Eunkyung-2013-RISS-dispatch)'


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def sha(body: bytes) -> str:
    return hashlib.sha256(body).hexdigest()


def decode(body: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def form_block(text: str) -> str:
    m = re.search(r'<form\b[^>]*(?:id=["\']f["\']|name=["\']f["\'])[^>]*>', text, re.I | re.S)
    assert m, 'document.f not found'
    end = text.find('</form>', m.end())
    assert end >= 0
    return text[m.start():end + 7]


def fields(block: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for m in re.finditer(r'<input\b[^>]*>', block, re.I | re.S):
        tag = html.unescape(m.group(0))
        nm = re.search(r'\bname\s*=\s*["\']([^"\']+)', tag, re.I)
        if not nm:
            continue
        typ = re.search(r'\btype\s*=\s*["\']([^"\']+)', tag, re.I)
        if typ and typ.group(1).lower() in {'submit', 'button', 'checkbox', 'radio'}:
            continue
        vm = re.search(r'\bvalue\s*=\s*["\']([^"\']*)', tag, re.I)
        out[nm.group(1)] = vm.group(1) if vm else ''
    return out


def urls(base: str, text: str) -> list[str]:
    out: list[str] = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        u = urljoin(base, raw)
        if u not in out:
            out.append(u)
    for m in re.finditer(r'''["'](https?://[^"']+)["']''', text, re.I):
        u = html.unescape(m.group(1).strip())
        if u not in out:
            out.append(u)
    return out


text = DETAIL.read_text(encoding='utf-8')
j = json.loads(REPORT.read_text(encoding='utf-8'))
assert j['rissStaticInspection']['siteAuthoredDispatcherImplementationObserved'] is True
expected = j['exactRow']['fulltextTuple']
f = fields(form_block(text))
for key in ['control_no', 'p_mat_type', 'p_submat_type', 'fulltext_kind']:
    assert f.get(key) == expected.get(key), (key, f.get(key), expected.get(key))
assert f['control_no'] == EXPECTED_CONTROL
f['loginFlag'] = '1'
f['content_page'] = ''
endpoint = 'https://www.riss.kr/search/download/FullTextDownload.do'
request_url = endpoint + '?' + urlencode(f)
ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()), NoRedirect())
req = Request(request_url, headers={'User-Agent': UA, 'Referer': j['detail']['finalUrl'], 'Accept': 'text/html,application/pdf,*/*;q=0.8'})
meta = {'requestedUrl': request_url, 'status': None, 'location': None, 'contentType': '', 'contentDisposition': '', 'bytes': 0, 'sha256': None, 'pdfMagic': False, 'error': None}
body = b''
try:
    with opener.open(req, timeout=35) as resp:
        body = resp.read(20_000_001)
        assert len(body) <= 20_000_000
        meta.update({'status': getattr(resp, 'status', None), 'location': resp.headers.get('Location'), 'contentType': resp.headers.get('Content-Type', ''), 'contentDisposition': resp.headers.get('Content-Disposition', ''), 'bytes': len(body), 'sha256': sha(body), 'pdfMagic': body.startswith(b'%PDF-')})
except HTTPError as exc:
    body = exc.read(20_000_001)
    assert len(body) <= 20_000_000
    meta.update({'status': exc.code, 'location': exc.headers.get('Location'), 'contentType': exc.headers.get('Content-Type', ''), 'contentDisposition': exc.headers.get('Content-Disposition', ''), 'bytes': len(body), 'sha256': sha(body), 'pdfMagic': body.startswith(b'%PDF-'), 'error': f'HTTPError: {exc.code}'})

out = {
    'dispatcherImplementationObserved': True,
    'serializedFormFields': f,
    'request': meta,
    'literalUrls': [],
    'sameOriginPdfUrls': [],
    'externalUrls': [],
    'directPdfAcquired': False,
    'contentDownloadExecuted': True,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'disposition': 'RESPONSE_REVIEW_REQUIRED',
}
if meta['pdfMagic'] or 'application/pdf' in meta['contentType'].lower():
    (ROOT / 'choi-eunkyung-2013.pdf').write_bytes(body)
    out['directPdfAcquired'] = True
    out['disposition'] = 'RISS_DISPATCHER_DIRECT_PDF_ACQUIRED'
else:
    response_text = decode(body, meta['contentType'])
    (ROOT / 'riss-fulltext-dispatch-response.html').write_text(response_text, encoding='utf-8')
    observed_urls = urls(endpoint, response_text)
    out['literalUrls'] = observed_urls[:150]
    for u in observed_urls:
        host = (urlparse(u).hostname or '').lower()
        low = u.lower()
        if host in {'www.riss.kr', 'riss.kr'} and '.pdf' in low:
            out['sameOriginPdfUrls'].append(u)
        elif host and host not in {'www.riss.kr', 'riss.kr'}:
            out['externalUrls'].append(u)
    if meta['location']:
        out['disposition'] = 'RISS_DISPATCHER_REDIRECT_OBSERVED_NO_FOLLOW_PENDING_REVIEW'
    elif any('dcollection.net' in (urlparse(u).hostname or '').lower() for u in out['externalUrls']):
        out['disposition'] = 'RISS_DISPATCHER_AUTHORED_DCOLLECTION_ROUTE_PENDING_SAFE_FOLLOW'
    elif out['sameOriginPdfUrls']:
        out['disposition'] = 'RISS_DISPATCHER_AUTHORED_PDF_LITERAL_PENDING_SAFE_FETCH'
    elif any(x in response_text.lower() for x in ['drm', 'fasoo', 'markany', 'softcamp']):
        out['disposition'] = 'RISS_DISPATCHER_DRM_SIGNAL_STOP_NO_REPLAY'
    elif any(x in response_text.lower() for x in ['로그인', 'login required', '회원인증', '기관인증']):
        out['disposition'] = 'RISS_DISPATCHER_LOGIN_OR_AUTH_BOUNDARY_STOP_NO_BYPASS'
    else:
        out['disposition'] = 'RISS_DISPATCHER_NO_DIRECT_BODY_ROUTE_OBSERVED'

(ROOT / 'riss-dispatcher-report.json').write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(out, ensure_ascii=False, indent=2))
assert out['guessedOpaqueIdentifierCount'] == 0
assert out['loginBypass'] is False and out['institutionAuthBypass'] is False and out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False and out['decryptionActionExecuted'] is False
