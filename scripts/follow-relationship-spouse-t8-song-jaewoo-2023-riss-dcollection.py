#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import http.cookiejar
import json
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path('acquisition-song-jaewoo-2023')
REPORT_PATH = ROOT / 'report.json'
EXPECTED_CONTROL = '105b810f6d2f3decffe0bdc3ef48d419'
EXPECTED_ITEM = '200000668457'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()
COOKIE_JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(
    urllib.request.HTTPCookieProcessor(COOKIE_JAR),
    urllib.request.HTTPSHandler(context=CTX),
)


def fetch(url: str, timeout: int = 90, referer: str | None = None) -> dict[str, object]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    req = urllib.request.Request(url, headers=headers)
    try:
        with OPENER.open(req, timeout=timeout) as resp:
            body = resp.read()
            return {
                'ok': True,
                'status': getattr(resp, 'status', 200),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type', ''),
                'contentDisposition': resp.headers.get('Content-Disposition', ''),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'body': body,
            }
    except urllib.error.HTTPError as exc:
        body = exc.read()
        return {
            'ok': False,
            'status': exc.code,
            'finalUrl': exc.geturl(),
            'contentType': exc.headers.get('Content-Type', '') if exc.headers else '',
            'contentDisposition': exc.headers.get('Content-Disposition', '') if exc.headers else '',
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
            'body': body,
            'error': f'HTTPError: {exc}',
        }


def decode(body: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([\w-]+)', content_type, re.I)
    for enc in [m.group(1) if m else None, 'utf-8', 'euc-kr', 'cp949']:
        if not enc:
            continue
        try:
            return body.decode(enc)
        except (UnicodeDecodeError, LookupError):
            pass
    return body.decode('utf-8', errors='replace')


def visibleish(html: str) -> str:
    text = re.sub(r'(?is)<script\b.*?</script>', ' ', html)
    text = re.sub(r'(?is)<style\b.*?</style>', ' ', text)
    text = re.sub(r'(?s)<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', unescape(text)).strip()


def js_value(html: str, name: str) -> str | None:
    patterns = [
        rf'(?is)\bvar\s+{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\b{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\bname=["\']{re.escape(name)}["\'][^>]*\bvalue=["\']([^"\']*)["\']',
    ]
    for pattern in patterns:
        m = re.search(pattern, html)
        if m:
            return unescape(m.group(1))
    return None


def pdf_path(html: str) -> str | None:
    for pattern in [
        r'(?is)location\.replace\(\s*context\s*\+\s*["\']([^"\']*/public_resource/pdf/[^"\']+\.pdf)["\']\s*\)',
        r'(?is)["\'](/public_resource/pdf/[^"\']+\.pdf)["\']',
    ]:
        m = re.search(pattern, html)
        if m:
            return unescape(m.group(1))
    return None


report = json.loads(REPORT_PATH.read_text(encoding='utf-8'))
assert report['exactRissIdentityConfirmed'] is True
assert report['recoveredRissControl'] == EXPECTED_CONTROL
riss_downloading = report.get('rissDownloading') or {}
targets = riss_downloading.get('navigationTargets') or []
authored_target = next(
    (
        str(t.get('absoluteUrl') or '')
        for t in targets
        if 'ube.dcollection.net/common/orgView/' in str(t.get('absoluteUrl') or '')
    ),
    '',
)
assert authored_target
m = re.search(r'/common/orgView/([0-9]+)(?:$|[/?#])', authored_target)
assert m and m.group(1) == EXPECTED_ITEM
item_url = authored_target.replace('http://', 'https://', 1)
item_result = fetch(item_url, 90, referer=str(riss_downloading.get('finalUrl') or ''))
item_body = item_result.pop('body')
(ROOT / 'dcollection-item-exact-riss-authored.html').write_bytes(item_body)
item_html = decode(item_body, str(item_result.get('contentType') or ''))
path = pdf_path(item_html)
drm = js_value(item_html, 'drm')
agree = js_value(item_html, 'agree')
file_real_name = js_value(item_html, 'fileRealName')
file_size_raw = js_value(item_html, 'fileSize')
file_size = int(file_size_raw) if file_size_raw and file_size_raw.isdigit() else None
report['dcollection'] = {
    'requestedUrl': item_url,
    'provenance': 'EXACT_RISS_DOWNLOADING_AUTHORED_AFTER_EXACT_RISS_IDENTITY',
    **item_result,
    'saved': str(ROOT / 'dcollection-item-exact-riss-authored.html'),
    'kind': 'html',
    'itemId': EXPECTED_ITEM,
    'exactItemIdentityVerifiedBeforePdfFollow': True,
    'identityBinding': {
        'exactRissControl': EXPECTED_CONTROL,
        'rissAuthoredTarget': authored_target,
        'targetItemId': EXPECTED_ITEM,
    },
    'sourceContract': {
        'drm': drm,
        'agree': agree,
        'fileRealName': file_real_name,
        'expectedFileSize': file_size,
        'authoredPublicPdfPath': path,
    },
    'boundedText': visibleish(item_html)[:10000],
}
report['exactDcollectionIdentityConfirmed'] = True

if path:
    public_pdf_url = urllib.parse.urljoin(str(item_result.get('finalUrl') or item_url), path)
    pdf_result = fetch(public_pdf_url, 180, referer=str(item_result.get('finalUrl') or item_url))
    body = pdf_result.pop('body')
    saved = ROOT / 'song-jaewoo-2023-fulltext.pdf'
    saved.write_bytes(body)
    report['publicPdf'] = {
        **pdf_result,
        'saved': str(saved),
        'kind': 'pdf' if body[:5] == b'%PDF-' else 'bin',
        'isPdf': bool(body[:5] == b'%PDF-'),
        'pdfHeader': body[:8].decode('latin-1', errors='replace') if body else '',
        'sourceContract': {
            'itemId': EXPECTED_ITEM,
            'authoredPublicPdfPath': path,
            'authoredPublicPdfUrl': public_pdf_url,
            'expectedFileSize': file_size,
            'sizeMatchesServerMetadata': bool(file_size is not None and len(body) == file_size),
        },
    }
    report['publicPdfAcquired'] = bool(body[:5] == b'%PDF-')
else:
    report['publicPdf'] = None
    report['publicPdfAcquired'] = False

report['fulltextDisposition'] = (
    'PUBLIC_PDF_ACQUIRED_FROM_EXACT_RISS_AUTHORED_DCOLLECTION_ITEM'
    if report['publicPdfAcquired']
    else 'EXACT_RISS_AUTHORED_DCOLLECTION_ITEM_CONFIRMED_NO_PUBLIC_PDF_BODY'
)
REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(REPORT_PATH.read_text(encoding='utf-8'))
