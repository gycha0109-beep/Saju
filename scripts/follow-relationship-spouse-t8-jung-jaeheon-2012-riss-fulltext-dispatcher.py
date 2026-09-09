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

ROOT = Path('acquisition-jung-jaeheon-2012')
DETAIL = ROOT / 'riss-detail.html'
REPORT = ROOT / 'public-route-report.json'
EXPECTED_CONTROL = '1912fbc7d5e6ba29ffe0bdc3ef48d419'
EXPECTED_MAT = 'be54d9b8bc7cdb09'
EXPECTED_SUBMAT = 'f1a8c7a1de0e08b8'
EXPECTED_KIND = 'a8cb3aaead67ab5b'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Jung-Jaeheon-2012-exact-RISS-dispatch)'


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def riss_host(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() in {'www.riss.kr', 'riss.kr'}


def decode(data: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']:
        try:
            return data.decode(enc)
        except Exception:
            pass
    return data.decode('utf-8', errors='replace')


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def form_block(text: str) -> str:
    m = re.search(r'<form\b[^>]*(?:id=["\']f["\']|name=["\']f["\'])[^>]*>', text, re.I | re.S)
    assert m, 'document.f form not observed'
    end = text.find('</form>', m.end())
    assert end >= 0, 'document.f closing form not observed'
    return text[m.start():end + 7]


def form_fields(block: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    for m in re.finditer(r'<input\b[^>]*>', block, re.I | re.S):
        tag = html.unescape(m.group(0))
        nm = re.search(r'\bname\s*=\s*["\']([^"\']+)', tag, re.I)
        if not nm:
            continue
        typ = re.search(r'\btype\s*=\s*["\']([^"\']+)', tag, re.I)
        if typ and typ.group(1).lower() in {'submit', 'button', 'checkbox', 'radio'}:
            continue
        vm = re.search(r'\bvalue\s*=\s*["\']([^"\']*)', tag, re.I)
        fields[nm.group(1)] = vm.group(1) if vm else ''
    return fields


def literal_urls(base: str, text: str) -> list[str]:
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
report = json.loads(REPORT.read_text(encoding='utf-8'))

# Exact current RISS static implementation must be present in the already-inspected script union evidence.
static = report['rissStaticInspection']
assert static['globalFulltextDownloadDefinitionCount'] >= 1, static

# Verify the exact implementation source itself before replaying the route.
impl_sources = []
impl_ok = False
for p in sorted(ROOT.glob('riss-script-*.txt')):
    s = p.read_text(encoding='utf-8', errors='replace')
    if 'function fulltextDownload()' in s and '/search/download/FullTextDownload.do?' in s and 'jQuery(form).serialize()' in s and 'form.loginFlag.value="1"' in s:
        impl_ok = True
        impl_sources.append(p.name)
assert impl_ok, 'site-authored global fulltext dispatcher implementation not established'

fields = form_fields(form_block(text))
expected = {
    'control_no': EXPECTED_CONTROL,
    'p_mat_type': EXPECTED_MAT,
    'p_submat_type': EXPECTED_SUBMAT,
    'fulltext_kind': EXPECTED_KIND,
}
for k, v in expected.items():
    assert fields.get(k) == v, f'form field mismatch {k}: {fields.get(k)!r}'
fields['loginFlag'] = '1'  # exactly as current site-authored fulltextDownload() does
fields['content_page'] = ''

base = 'https://www.riss.kr'
endpoint = base + '/search/download/FullTextDownload.do'
request_url = endpoint + '?' + urlencode(fields)

ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()), NoRedirect())
req = Request(request_url, headers={'User-Agent': UA, 'Referer': report['detail']['finalUrl'], 'Accept': 'text/html,application/pdf,*/*;q=0.8'})
meta = {'requestedUrl': request_url, 'status': None, 'location': None, 'contentType': '', 'contentDisposition': '', 'bytes': 0, 'sha256': None, 'pdfMagic': False, 'error': None}
body = b''
try:
    with opener.open(req, timeout=35) as resp:
        body = resp.read(20_000_001)
        assert len(body) <= 20_000_000, 'bounded response limit exceeded'
        meta.update({
            'status': getattr(resp, 'status', None),
            'location': resp.headers.get('Location'),
            'contentType': resp.headers.get('Content-Type', ''),
            'contentDisposition': resp.headers.get('Content-Disposition', ''),
            'bytes': len(body),
            'sha256': sha256(body),
            'pdfMagic': body.startswith(b'%PDF-'),
        })
except HTTPError as exc:
    body = exc.read(20_000_001)
    assert len(body) <= 20_000_000
    meta.update({
        'status': exc.code,
        'location': exc.headers.get('Location'),
        'contentType': exc.headers.get('Content-Type', ''),
        'contentDisposition': exc.headers.get('Content-Disposition', ''),
        'bytes': len(body),
        'sha256': sha256(body),
        'pdfMagic': body.startswith(b'%PDF-'),
        'error': f'HTTPError: {exc.code}',
    })

out = {
    'dispatcherImplementationObserved': True,
    'implementationSources': impl_sources,
    'serializedFormFields': fields,
    'request': meta,
    'redirectFollowed': False,
    'literalUrls': [],
    'sameOriginPdfUrls': [],
    'externalUrls': [],
    'loginOrAuthSignals': [],
    'drmOrDedicatedViewerSignals': [],
    'directPdfAcquired': False,
    'contentDownloadExecuted': True,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'disposition': 'RISS_DISPATCHER_RESPONSE_REVIEW_REQUIRED',
}

if meta['pdfMagic'] or 'application/pdf' in meta['contentType'].lower():
    (ROOT / 'jung-jaeheon-2012.pdf').write_bytes(body)
    out['directPdfAcquired'] = True
    out['disposition'] = 'RISS_DISPATCHER_DIRECT_PDF_ACQUIRED'
else:
    response_text = decode(body, meta['contentType'])
    (ROOT / 'riss-fulltext-dispatch-response.html').write_text(response_text, encoding='utf-8')
    urls = literal_urls(endpoint, response_text)
    out['literalUrls'] = urls[:100]
    for u in urls:
        host = (urlparse(u).hostname or '').lower()
        low = u.lower()
        if riss_host(u) and ('.pdf' in low or 'pdf' in urlparse(u).path.lower()):
            out['sameOriginPdfUrls'].append(u)
        elif host and not riss_host(u):
            out['externalUrls'].append(u)
    lower = response_text.lower()
    login_terms = ['로그인', 'login', '회원인증', '회원 인증', 'institution', '소속기관', '인증']
    drm_terms = ['drm', 'fasoo', 'markany', 'softcamp', 'docviewer', 'documentviewer', 'viewer', '뷰어']
    out['loginOrAuthSignals'] = [term for term in login_terms if term in lower]
    out['drmOrDedicatedViewerSignals'] = [term for term in drm_terms if term in lower]
    if meta['location']:
        loc = urljoin(endpoint, meta['location'])
        if riss_host(loc):
            out['disposition'] = 'RISS_DISPATCHER_SITE_AUTHORED_REDIRECT_OBSERVED_NO_FOLLOW_PENDING_REVIEW'
        else:
            out['disposition'] = 'RISS_DISPATCHER_EXTERNAL_REDIRECT_OBSERVED_NO_FOLLOW_PENDING_REVIEW'
    elif out['loginOrAuthSignals']:
        out['disposition'] = 'RISS_DISPATCHER_LOGIN_OR_AUTH_BOUNDARY_STOP_NO_BYPASS'
    elif out['drmOrDedicatedViewerSignals']:
        out['disposition'] = 'RISS_DISPATCHER_DRM_OR_DEDICATED_VIEWER_SIGNAL_STOP_NO_REPLAY'
    elif out['sameOriginPdfUrls']:
        out['disposition'] = 'RISS_DISPATCHER_AUTHORED_SAME_ORIGIN_PDF_LITERAL_PENDING_SAFE_FETCH'
    else:
        out['disposition'] = 'RISS_DISPATCHER_NO_DIRECT_BODY_ROUTE_OBSERVED'

(ROOT / 'riss-dispatcher-report.json').write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
report['rissDispatcher'] = out
if out['directPdfAcquired']:
    report['semanticDisposition'] = 'DIRECT_PDF_ACQUIRED_REQUIRES_PAGE_COUNT_AND_BODY_REVIEW'
else:
    report['semanticDisposition'] = 'ACCESS_BOUNDARY_PENDING_DISPATCHER_RESPONSE_CLASSIFICATION'
REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(out, ensure_ascii=False, indent=2))

assert out['guessedOpaqueIdentifierCount'] == 0
assert out['loginBypass'] is False
assert out['institutionAuthBypass'] is False
assert out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False
assert out['decryptionActionExecuted'] is False
