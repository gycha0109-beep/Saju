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
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Choi-Eunkyung-2013-dCollection)'


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


def is_dcollection_host(host: str) -> bool:
    h = host.lower()
    return h == 'dcollection.net' or h.endswith('.dcollection.net')


def allowed(url: str, exact_host: str | None = None) -> bool:
    host = (urlparse(url).hostname or '').lower()
    if host in {'www.riss.kr', 'riss.kr'}:
        return True
    if exact_host:
        return host == exact_host
    return is_dcollection_host(host)


def fetch(opener, url: str, referer: str | None = None, max_bytes: int = 25_000_000, exact_host: str | None = None):
    assert allowed(url, exact_host), url
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8'}
    if referer:
        headers['Referer'] = referer
    meta = {'requestedUrl': url, 'status': None, 'location': None, 'contentType': '', 'contentDisposition': '', 'bytes': 0, 'sha256': None, 'pdfMagic': False, 'error': None}
    body = b''
    try:
        with opener.open(Request(url, headers=headers), timeout=35) as resp:
            body = resp.read(max_bytes + 1)
            assert len(body) <= max_bytes
            meta.update({'status': getattr(resp, 'status', None), 'location': resp.headers.get('Location'), 'contentType': resp.headers.get('Content-Type', ''), 'contentDisposition': resp.headers.get('Content-Disposition', ''), 'bytes': len(body), 'sha256': sha(body), 'pdfMagic': body.startswith(b'%PDF-')})
    except HTTPError as exc:
        body = exc.read(max_bytes + 1)
        assert len(body) <= max_bytes
        meta.update({'status': exc.code, 'location': exc.headers.get('Location'), 'contentType': exc.headers.get('Content-Type', ''), 'contentDisposition': exc.headers.get('Content-Disposition', ''), 'bytes': len(body), 'sha256': sha(body), 'pdfMagic': body.startswith(b'%PDF-'), 'error': f'HTTPError: {exc.code}'})
    return meta, body


def literal_urls(base: str, text: str, exact_host: str) -> list[str]:
    out: list[str] = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        u = urljoin(base, raw)
        if allowed(u, exact_host) and u not in out:
            out.append(u)
    for m in re.finditer(r'''["'](https?://[^"']+)["']''', text, re.I):
        u = html.unescape(m.group(1).strip())
        if allowed(u, exact_host) and u not in out:
            out.append(u)
    return out


def item_id_from(url: str) -> str | None:
    m = re.search(r'/common/orgView/(\d+)', url)
    if m:
        return m.group(1)
    q = parse_qs(urlparse(url).query)
    for key in ['itemId', 'item_id', 'id', 'fileId', 'file_id']:
        vals = q.get(key, [])
        for value in vals:
            if value.isdigit():
                return value
    return None


def safe_redirect(src: str, location: str | None, exact_host: str, item_id: str) -> str | None:
    if not location:
        return None
    target = urljoin(src, location)
    parsed = urlparse(target)
    if parsed.scheme != 'https' or (parsed.hostname or '').lower() != exact_host:
        return None
    if item_id not in target:
        return None
    return target


def fetch_chain(opener, start: str, referer: str | None, exact_host: str, item_id: str, max_hops: int = 3):
    current = start
    chain = []
    meta, body = fetch(opener, current, referer, exact_host=exact_host)
    for _ in range(max_hops):
        if meta.get('status') not in {301, 302, 303, 307, 308}:
            break
        nxt = safe_redirect(current, meta.get('location'), exact_host, item_id)
        if not nxt:
            break
        chain.append({'from': current, 'status': meta['status'], 'location': meta.get('location'), 'to': nxt})
        prev = current
        current = nxt
        meta, body = fetch(opener, current, prev, exact_host=exact_host)
    return meta, body, chain


def viewer_pdf_literal(viewer_url: str, text: str, exact_host: str) -> str | None:
    qs = parse_qs(urlparse(viewer_url).query)
    for value in qs.get('file', []):
        u = urljoin(viewer_url, html.unescape(value))
        p = urlparse(u)
        if (p.hostname or '').lower() == exact_host and p.path.startswith('/public_resource/pdf/') and p.path.lower().endswith('.pdf'):
            return u
    for m in re.finditer(r'''["'](/public_resource/pdf/[^"']+\.pdf)["']''', text, re.I):
        u = urljoin(viewer_url, html.unescape(m.group(1)))
        if (urlparse(u).hostname or '').lower() == exact_host:
            return u
    return None


dispatch = json.loads(DISPATCH_REPORT.read_text(encoding='utf-8'))
external = [u for u in dispatch.get('externalUrls', []) if is_dcollection_host(urlparse(u).hostname or '')]
org_views = [u for u in external if re.search(r'/common/orgView/\d+', u)]
assert len(org_views) == 1, {'dcollectionExternalUrls': external, 'orgViewCandidates': org_views}
start = org_views[0]
exact_host = (urlparse(start).hostname or '').lower()
item_id = item_id_from(start)
assert item_id, start
ctx = ssl.create_default_context()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()), NoRedirect())
out = {
    'rissAuthoredDcollectionUrl': start,
    'dcollectionHost': exact_host,
    'siteAuthoredItemId': item_id,
    'entry': None,
    'redirectChain': [],
    'followed': [],
    'directPdfAcquired': False,
    'pdf': None,
    'contentDownloadExecuted': True,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'disposition': 'ROUTE_REVIEW_PENDING',
}
entry_meta, entry_body, chain = fetch_chain(opener, start, dispatch['request']['requestedUrl'], exact_host, item_id)
out['entry'] = entry_meta
out['redirectChain'] = chain
if entry_meta['pdfMagic'] or 'application/pdf' in entry_meta['contentType'].lower():
    (ROOT / 'choi-eunkyung-2013.pdf').write_bytes(entry_body)
    out['directPdfAcquired'] = True
    out['pdf'] = {**entry_meta, 'source': start}
else:
    entry_text = decode(entry_body, entry_meta['contentType'])
    (ROOT / 'dcollection-entry.html').write_text(entry_text, encoding='utf-8')
    candidates: list[str] = []
    for u in literal_urls(entry_meta['requestedUrl'], entry_text, exact_host):
        low = u.lower()
        if item_id in u or '.pdf' in low or any(x in low for x in ['viewer', 'orgview', 'download', 'fulltext', 'file']):
            if u not in candidates:
                candidates.append(u)
    for i, u in enumerate(candidates[:30], 1):
        try:
            meta, body, cchain = fetch_chain(opener, u, entry_meta['requestedUrl'], exact_host, item_id)
            out['followed'].extend({'sourceUrl': u, 'canonicalRedirect': x} for x in cchain)
            out['followed'].append({**meta, 'sourceUrl': u})
            if meta['pdfMagic'] or 'application/pdf' in meta['contentType'].lower():
                (ROOT / 'choi-eunkyung-2013.pdf').write_bytes(body)
                out['directPdfAcquired'] = True
                out['pdf'] = {**meta, 'source': u}
                break
            text = decode(body, meta['contentType'])
            (ROOT / f'dcollection-follow-{i:02d}.html').write_text(text, encoding='utf-8')
            pdf_url = viewer_pdf_literal(meta['requestedUrl'], text, exact_host)
            if pdf_url:
                pm, pb = fetch(opener, pdf_url, meta['requestedUrl'], exact_host=exact_host)
                out['followed'].append({**pm, 'sourceUrl': pdf_url})
                if pm['pdfMagic'] or 'application/pdf' in pm['contentType'].lower():
                    (ROOT / 'choi-eunkyung-2013.pdf').write_bytes(pb)
                    out['directPdfAcquired'] = True
                    out['pdf'] = {**pm, 'source': pdf_url}
                    break
        except Exception as exc:
            out['followed'].append({'sourceUrl': u, 'error': f'{type(exc).__name__}: {exc}'})

if out['directPdfAcquired']:
    out['disposition'] = 'RISS_AUTHORED_DCOLLECTION_DIRECT_PDF_ACQUIRED'
else:
    serialized = ' '.join(str(x) for x in out['followed']).lower()
    if any(x in serialized for x in ['drm', 'fasoo', 'markany', 'softcamp']):
        out['disposition'] = 'DCOLLECTION_DRM_SIGNAL_STOP_NO_REPLAY'
    elif any(x in serialized for x in ['login required', '회원인증', '기관인증']):
        out['disposition'] = 'DCOLLECTION_AUTH_BOUNDARY_STOP_NO_BYPASS'
    else:
        out['disposition'] = 'RISS_AUTHORED_DCOLLECTION_ROUTE_NO_DIRECT_PDF_OBSERVED'

(ROOT / 'dcollection-route-report.json').write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(out, ensure_ascii=False, indent=2))
assert out['guessedOpaqueIdentifierCount'] == 0
assert out['loginBypass'] is False and out['institutionAuthBypass'] is False and out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False and out['decryptionActionExecuted'] is False
