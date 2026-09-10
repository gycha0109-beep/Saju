#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import http.cookiejar
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path('acquisition-jo-manseop-2007')
TITLE = '명리이론과 궁합의 상관관계 연구'
AUTHOR = '조만섭'
YEAR = 2007
CONTROL = 'KDMT1200725555'
LANDING = f'https://dl.nanet.go.kr/detail/{CONTROL}'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(JAR))


def fetch(url: str, referer: str | None = None, max_bytes: int = 25_000_000) -> dict:
    headers = {'User-Agent': UA, 'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6'}
    if referer:
        headers['Referer'] = referer
    with OPENER.open(urllib.request.Request(url, headers=headers), timeout=60) as response:
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
            'body': body,
        }


def decode(body: bytes, content_type: str) -> str:
    match = re.search(r'charset=([\w.-]+)', content_type or '', re.I)
    for encoding in ([match.group(1)] if match else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return body.decode(encoding)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def extract_function(source: str, name: str) -> str | None:
    match = re.search(rf'\bfunction\s+{re.escape(name)}\s*\([^)]*\)\s*\{{', source)
    if not match:
        return None
    start = match.start()
    brace = source.find('{', match.start())
    depth = 0
    quote = None
    escape = False
    line_comment = False
    block_comment = False
    index = brace
    while index < len(source):
        ch = source[index]
        nxt = source[index + 1] if index + 1 < len(source) else ''
        if line_comment:
            if ch == '\n':
                line_comment = False
            index += 1
            continue
        if block_comment:
            if ch == '*' and nxt == '/':
                block_comment = False
                index += 2
                continue
            index += 1
            continue
        if quote:
            if escape:
                escape = False
            elif ch == '\\':
                escape = True
            elif ch == quote:
                quote = None
            index += 1
            continue
        if ch in ('"', "'", '`'):
            quote = ch
            index += 1
            continue
        if ch == '/' and nxt == '/':
            line_comment = True
            index += 2
            continue
        if ch == '/' and nxt == '*':
            block_comment = True
            index += 2
            continue
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                return source[start:index + 1]
        index += 1
    return None


def authored_targets(text: str, base: str) -> list[dict[str, str]]:
    targets = []
    seen = set()
    for attr in ('href', 'src', 'action'):
        for raw in re.findall(rf'(?is)\b{attr}\s*=\s*["\']([^"\']+)["\']', text):
            raw = html.unescape(raw.strip())
            if not raw or raw.lower().startswith(('javascript:', 'data:', '#')):
                continue
            url = urllib.parse.urljoin(base, raw)
            key = (attr, url)
            if key not in seen:
                seen.add(key)
                targets.append({'kind': attr, 'raw': raw, 'url': url})
    return targets


report_path = ROOT / 'report.json'
report = json.loads(report_path.read_text(encoding='utf-8'))
assert report['candidate']['nanetControl'] == CONTROL
assert report['policy']['guessedOpaqueIdentifierCount'] == 0

sources = []
for path in sorted(ROOT.glob('nanet-script-*.js')):
    text = path.read_text(encoding='utf-8', errors='replace')
    sources.append((path, text))

view_single = None
download_top = None
for path, source in sources:
    if view_single is None:
        found = extract_function(source, 'viewDocBySingleCount')
        if found:
            view_single = {'path': str(path), 'source': found}
    if download_top is None:
        found = extract_function(source, 'downloadDoc')
        if found:
            download_top = {'path': str(path), 'source': found}

assert view_single is not None, 'viewDocBySingleCount was not recovered from page-authored scripts'
assert download_top is not None, 'downloadDoc was not recovered from page-authored scripts'
assert 'if(!isLogin)' in download_top['source'].replace(' ', ''), 'download login guard not preserved'
assert '/view/callViewer.do?controlNo=' in view_single['source'], 'viewer route not authored by viewDocBySingleCount'
assert '&orgId=dl&linkSysId=NADL' in view_single['source'], 'viewer constants not authored by viewDocBySingleCount'

landing = fetch(LANDING)
landing_body = landing.pop('body')
landing_text = decode(landing_body, landing['contentType'])
visible = re.sub(r'\s+', ' ', html.unescape(re.sub(r'(?s)<[^>]+>', ' ', landing_text)))
assert TITLE in visible and AUTHOR in visible and str(YEAR) in visible

viewer_url = urllib.parse.urljoin(landing['finalUrl'], '/view/callViewer.do') + '?' + urllib.parse.urlencode([
    ('controlNo', CONTROL),
    ('orgId', 'dl'),
    ('linkSysId', 'NADL'),
])
viewer = fetch(viewer_url, referer=landing['finalUrl'])
body = viewer.pop('body')
is_pdf = body.startswith(b'%PDF-')
if is_pdf:
    saved = ROOT / 'nanet-viewer.pdf'
    saved.write_bytes(body)
    (ROOT / 'candidate.pdf').write_bytes(body)
    report['fullLengthPdfAcquired'] = True
    report['pdfSha256'] = hashlib.sha256(body).hexdigest()
    report['pdfBytes'] = len(body)
    report['semanticDisposition'] = 'DIRECT_BODY_READY_FOR_RENDER_REVIEW'
    targets = []
else:
    saved = ROOT / 'nanet-viewer.html'
    saved.write_bytes(body)
    text = decode(body, viewer['contentType'])
    targets = authored_targets(text, viewer['finalUrl'])
    report['semanticDisposition'] = 'PUBLIC_VIEWER_RESPONSE_DISCOVERED_NO_BODY_LEVEL_DECISION'

report['viewerContract'] = {
    'downloadLoginRequiredByPageAuthoredFunction': True,
    'downloadRouteExecuted': False,
    'viewDocBySingleCountSourcePath': view_single['path'],
    'viewDocBySingleCountSource': view_single['source'],
    'requestedViewerUrl': viewer_url,
    'viewerResponse': {**viewer, 'isPdf': is_pdf, 'saved': str(saved), 'authoredTargets': targets},
}
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
interesting = [target for target in targets if any(token in target['url'].lower() for token in ('pdf', 'viewer', 'file', 'stream', 'content', 'view'))]
print(json.dumps({
    'viewerUrl': viewer_url,
    'viewerStatus': viewer['status'],
    'viewerFinalUrl': viewer['finalUrl'],
    'viewerContentType': viewer['contentType'],
    'viewerBytes': viewer['bytes'],
    'viewerSha256': viewer['sha256'],
    'viewerIsPdf': is_pdf,
    'interestingAuthoredTargets': interesting[:100],
    'semanticDisposition': report['semanticDisposition'],
}, ensure_ascii=False, indent=2))
