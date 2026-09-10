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
from urllib.parse import parse_qs, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

ROOT = Path('acquisition-choi-eunkyung-2013')
DISPATCH_REPORT = ROOT / 'riss-dispatcher-report.json'
EXPECTED = 'http://wonkwang.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000001991979'
HOST = 'wonkwang.dcollection.net'
ITEM = '000001991979'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Choi-Eunkyung-2013-Wonkwang)'


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


def allowed(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() == HOST


def fetch(opener, url: str, referer: str | None = None, max_bytes: int = 25_000_000):
    assert allowed(url), url
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


def same_item_https(src: str, location: str | None) -> str | None:
    if not location:
        return None
    target = urljoin(src, location)
    parsed = urlparse(target)
    if parsed.scheme != 'https' or (parsed.hostname or '').lower() != HOST or ITEM not in target:
        return None
    return target


def fetch_chain(opener, start: str, referer: str | None, max_hops: int = 3):
    current = start
    chain = []
    meta, body = fetch(opener, current, referer)
    for _ in range(max_hops):
        if meta.get('status') not in {301, 302, 303, 307, 308}:
            break
        nxt = same_item_https(current, meta.get('location'))
        if not nxt:
            break
        chain.append({'from': current, 'status': meta['status'], 'location': meta.get('location'), 'to': nxt})
        previous = current
        current = nxt
        meta, body = fetch(opener, current, previous)
    return meta, body, chain


def literal_urls(base: str, text: str) -> list[str]:
    out: list[str] = []
    for match in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(match.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        url = urljoin(base, raw)
        if allowed(url) and url not in out:
            out.append(url)
    for match in re.finditer(r'''["'](https?://[^"']+)["']''', text, re.I):
        url = html.unescape(match.group(1).strip())
        if allowed(url) and url not in out:
            out.append(url)
    return out


def viewer_pdf_literal(viewer_url: str, text: str) -> str | None:
    for value in parse_qs(urlparse(viewer_url).query).get('file', []):
        url = urljoin(viewer_url, html.unescape(value))
        parsed = urlparse(url)
        if (parsed.hostname or '').lower() == HOST and parsed.path.startswith('/public_resource/pdf/') and parsed.path.lower().endswith('.pdf'):
            return url
    for match in re.finditer(r'''["'](/public_resource/pdf/[^"']+\.pdf)["']''', text, re.I):
        url = urljoin(viewer_url, html.unescape(match.group(1)))
        if allowed(url):
            return url
    return None


dispatch = json.loads(DISPATCH_REPORT.read_text(encoding='utf-8'))
assert EXPECTED in dispatch.get('externalUrls', []), dispatch.get('externalUrls', [])
ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()), NoRedirect())
out = {'rissAuthoredDcollectionUrl': EXPECTED, 'dcollectionHost': HOST, 'siteAuthoredItemId': ITEM, 'entry': None, 'redirectChain': [], 'followed': [], 'directPdfAcquired': False, 'pdf': None, 'contentDownloadExecuted': True, 'guessedOpaqueIdentifierCount': 0, 'loginBypass': False, 'institutionAuthBypass': False, 'paywallBypass': False, 'drmRequestExecuted': False, 'decryptionActionExecuted': False, 'disposition': 'ROUTE_REVIEW_PENDING'}
entry_meta, entry_body, chain = fetch_chain(opener, EXPECTED, dispatch['request']['requestedUrl'])
out['entry'] = entry_meta
out['redirectChain'] = chain
if entry_meta['pdfMagic'] or 'application/pdf' in entry_meta['contentType'].lower():
    (ROOT / 'choi-eunkyung-2013.pdf').write_bytes(entry_body)
    out['directPdfAcquired'] = True
    out['pdf'] = {**entry_meta, 'source': EXPECTED}
else:
    entry_text = decode(entry_body, entry_meta['contentType'])
    (ROOT / 'dcollection-entry.html').write_text(entry_text, encoding='utf-8')
    candidates = []
    for url in literal_urls(entry_meta['requestedUrl'], entry_text):
        low = url.lower()
        if ITEM in url or '.pdf' in low or any(token in low for token in ['viewer', 'orgview', 'download', 'fulltext', 'file']):
            if url not in candidates:
                candidates.append(url)
    for index, url in enumerate(candidates[:30], 1):
        try:
            meta, body, redirects = fetch_chain(opener, url, entry_meta['requestedUrl'])
            out['followed'].extend({'sourceUrl': url, 'canonicalRedirect': redirect} for redirect in redirects)
            out['followed'].append({**meta, 'sourceUrl': url})
            if meta['pdfMagic'] or 'application/pdf' in meta['contentType'].lower():
                (ROOT / 'choi-eunkyung-2013.pdf').write_bytes(body)
                out['directPdfAcquired'] = True
                out['pdf'] = {**meta, 'source': url}
                break
            text = decode(body, meta['contentType'])
            (ROOT / f'dcollection-follow-{index:02d}.html').write_text(text, encoding='utf-8')
            pdf_url = viewer_pdf_literal(meta['requestedUrl'], text)
            if pdf_url:
                pdf_meta, pdf_body = fetch(opener, pdf_url, meta['requestedUrl'])
                out['followed'].append({**pdf_meta, 'sourceUrl': pdf_url})
                if pdf_meta['pdfMagic'] or 'application/pdf' in pdf_meta['contentType'].lower():
                    (ROOT / 'choi-eunkyung-2013.pdf').write_bytes(pdf_body)
                    out['directPdfAcquired'] = True
                    out['pdf'] = {**pdf_meta, 'source': pdf_url}
                    break
        except Exception as exc:
            out['followed'].append({'sourceUrl': url, 'error': f'{type(exc).__name__}: {exc}'})

if out['directPdfAcquired']:
    out['disposition'] = 'RISS_AUTHORED_WONKWANG_DIRECT_PDF_ACQUIRED'
else:
    serialized = ' '.join(str(item) for item in out['followed']).lower()
    if any(token in serialized for token in ['drm', 'fasoo', 'markany', 'softcamp']):
        out['disposition'] = 'DCOLLECTION_DRM_SIGNAL_STOP_NO_REPLAY'
    elif any(token in serialized for token in ['login required', '회원인증', '기관인증']):
        out['disposition'] = 'DCOLLECTION_AUTH_BOUNDARY_STOP_NO_BYPASS'
    else:
        out['disposition'] = 'RISS_AUTHORED_WONKWANG_ROUTE_NO_DIRECT_PDF_OBSERVED'

(ROOT / 'dcollection-route-report.json').write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(out, ensure_ascii=False, indent=2))
assert out['guessedOpaqueIdentifierCount'] == 0
assert out['loginBypass'] is False and out['institutionAuthBypass'] is False and out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False and out['decryptionActionExecuted'] is False
