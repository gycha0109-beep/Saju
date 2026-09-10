#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path('acquisition-jo-manseop-2007')
CONTROL = 'KDMT1200725555'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'


def fetch(url: str, *, referer: str | None = None, attempts: int = 3, timeout: int = 25, max_bytes: int = 25_000_000):
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/json,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    for attempt in range(1, attempts + 1):
        try:
            request = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(request, timeout=timeout) as response:
                body = response.read(max_bytes + 1)
                if len(body) > max_bytes:
                    raise RuntimeError('bounded response limit exceeded')
                return {
                    'status': getattr(response, 'status', 200),
                    'finalUrl': response.geturl(),
                    'contentType': response.headers.get('Content-Type', ''),
                    'contentDisposition': response.headers.get('Content-Disposition', ''),
                    'bytes': len(body),
                    'sha256': hashlib.sha256(body).hexdigest(),
                    'attempt': attempt,
                    'body': body,
                }
        except urllib.error.HTTPError as exc:
            body = exc.read(max_bytes + 1)
            return {
                'status': exc.code,
                'finalUrl': exc.geturl(),
                'contentType': exc.headers.get('Content-Type', '') if exc.headers else '',
                'contentDisposition': exc.headers.get('Content-Disposition', '') if exc.headers else '',
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'attempt': attempt,
                'error': f'HTTPError: {exc}',
                'body': body,
            }
        except (urllib.error.URLError, TimeoutError, OSError):
            if attempt == attempts:
                raise
            time.sleep(attempt * 2)
    raise RuntimeError('unreachable fetch state')


def decode(body: bytes, content_type: str) -> str:
    match = re.search(r'charset=([\w.-]+)', content_type or '', re.I)
    for encoding in ([match.group(1)] if match else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return body.decode(encoding)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def authored_targets(text: str, base: str):
    out = []
    seen = set()
    patterns = [
        ('href', r'(?is)\bhref\s*=\s*["\']([^"\']+)["\']'),
        ('src', r'(?is)\bsrc\s*=\s*["\']([^"\']+)["\']'),
        ('action', r'(?is)\baction\s*=\s*["\']([^"\']+)["\']'),
        ('location-replace', r'(?is)location\.replace\(\s*["\']([^"\']+)["\']\s*\)'),
        ('window-open', r'(?is)window\.open\(\s*["\']([^"\']+)["\']'),
    ]
    for kind, pattern in patterns:
        for raw in re.findall(pattern, text):
            raw = html.unescape(raw.strip())
            if not raw or raw.lower().startswith(('javascript:', 'data:', '#')):
                continue
            url = urllib.parse.urljoin(base, raw)
            key = (kind, url)
            if key not in seen:
                seen.add(key)
                out.append({'kind': kind, 'raw': raw, 'url': url})
    return out


report_path = ROOT / 'report.json'
viewer_path = ROOT / 'nanet-viewer.html'
assert report_path.exists() and viewer_path.exists(), 'prior exact NANET viewer evidence missing'
report = json.loads(report_path.read_text(encoding='utf-8'))
assert report['candidate']['nanetControl'] == CONTROL
assert report['policy']['guessedOpaqueIdentifierCount'] == 0
assert report['viewerContract']['downloadRouteExecuted'] is False
viewer_text = viewer_path.read_text(encoding='utf-8', errors='replace')
reader_targets = re.findall(r'(?is)location\.replace\(\s*["\']([^"\']+)["\']\s*\)', viewer_text)
reader_targets = [html.unescape(value.strip()) for value in reader_targets]
assert len(reader_targets) == 1, f'expected exactly one viewer-authored reader target: {reader_targets}'
reader_url = reader_targets[0]
parsed = urllib.parse.urlsplit(reader_url)
assert parsed.scheme == 'https'
assert parsed.hostname == 'docviewer.nanet.go.kr'
assert re.fullmatch(r'/reader/[0-9a-f]{32}', parsed.path), 'reader target shape not directly recognized'
viewer_url = report['viewerContract']['requestedViewerUrl']

reader = fetch(reader_url, referer=viewer_url, attempts=3, timeout=25, max_bytes=25_000_000)
body = reader.pop('body')
is_pdf = body.startswith(b'%PDF-')
if is_pdf:
    saved = ROOT / 'nanet-reader.pdf'
    saved.write_bytes(body)
    (ROOT / 'candidate.pdf').write_bytes(body)
    targets = []
    report['fullLengthPdfAcquired'] = True
    report['pdfSha256'] = hashlib.sha256(body).hexdigest()
    report['pdfBytes'] = len(body)
    report['semanticDisposition'] = 'DIRECT_BODY_READY_FOR_RENDER_REVIEW'
else:
    saved = ROOT / 'nanet-reader.html'
    saved.write_bytes(body)
    text = decode(body, str(reader.get('contentType') or ''))
    targets = authored_targets(text, str(reader.get('finalUrl') or reader_url))
    report['semanticDisposition'] = 'PUBLIC_READER_RESPONSE_DISCOVERED_NO_BODY_LEVEL_DECISION'

report['readerContract'] = {
    'readerUrlAuthoredByViewerResponse': True,
    'readerUrl': reader_url,
    'opaqueReaderIdGuessed': False,
    'response': {**reader, 'saved': str(saved), 'isPdf': is_pdf, 'authoredTargets': targets},
}
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({
    'readerUrl': reader_url,
    'readerStatus': reader.get('status'),
    'readerFinalUrl': reader.get('finalUrl'),
    'readerContentType': reader.get('contentType'),
    'readerBytes': reader.get('bytes'),
    'readerSha256': reader.get('sha256'),
    'readerIsPdf': is_pdf,
    'authoredTargets': targets[:150],
    'semanticDisposition': report['semanticDisposition'],
}, ensure_ascii=False, indent=2))
