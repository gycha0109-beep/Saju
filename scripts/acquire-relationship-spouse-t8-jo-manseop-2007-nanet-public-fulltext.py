#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import http.cookiejar
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path('acquisition-jo-manseop-2007')
ROOT.mkdir(parents=True, exist_ok=True)
TITLE = '명리이론과 궁합의 상관관계 연구'
AUTHOR = '조만섭'
YEAR = 2007
CONTROL = 'KDMT1200725555'
LANDING_URL = f'https://dl.nanet.go.kr/detail/{CONTROL}'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(JAR))


def fetch(url: str, *, referer: str | None = None, timeout: int = 25, max_bytes: int = 25_000_000, attempts: int = 3):
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    last_error: Exception | None = None
    for attempt in range(1, attempts + 1):
        try:
            request = urllib.request.Request(url, headers=headers)
            with OPENER.open(request, timeout=timeout) as response:
                body = response.read(max_bytes + 1)
                if len(body) > max_bytes:
                    raise RuntimeError('bounded response limit exceeded')
                return {
                    'ok': True,
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
                'ok': False,
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
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            last_error = exc
            if attempt == attempts:
                raise
            time.sleep(attempt * 2)
    raise RuntimeError(f'unreachable fetch state: {last_error}')


def decode(body: bytes, content_type: str = '') -> str:
    match = re.search(r'charset=([\w.-]+)', content_type or '', re.I)
    for encoding in ([match.group(1)] if match else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return body.decode(encoding)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def visibleish(text: str) -> str:
    text = re.sub(r'(?is)<script\b.*?</script>', ' ', text)
    text = re.sub(r'(?is)<style\b.*?</style>', ' ', text)
    text = re.sub(r'(?s)<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()


def save(name: str, response: dict, body: bytes) -> str:
    content_type = str(response.get('contentType') or '').lower()
    if body.startswith(b'%PDF-'):
        suffix = 'pdf'
    elif 'html' in content_type or b'<html' in body[:4096].lower() or b'<!doctype' in body[:4096].lower():
        suffix = 'html'
    elif 'javascript' in content_type or name.endswith('inner'):
        suffix = 'js'
    else:
        suffix = 'bin'
    path = ROOT / f'{name}.{suffix}'
    path.write_bytes(body)
    return str(path)


def fulltext_controls(text: str) -> list[dict[str, object]]:
    controls = []
    for match in re.finditer(r'(?is)<button\b([^>]*)>(.*?)</button>', text):
        attrs, inner = match.group(1), match.group(2)
        onclick = re.search(r'\bonclick\s*=\s*(["\'])(.*?)\1', attrs, re.I | re.S)
        if not onclick:
            continue
        code = re.sub(r'\s+', ' ', html.unescape(onclick.group(2))).strip()
        call = re.match(r'^(viewDoc|downloadDoc)\s*\((.*)\)\s*;?$', code, re.I | re.S)
        if not call:
            continue
        title = re.search(r'\btitle\s*=\s*(["\'])(.*?)\1', attrs, re.I | re.S)
        label = re.sub(r'\s+', ' ', html.unescape(re.sub(r'(?s)<[^>]+>', ' ', inner))).strip()
        args = re.findall(r'["\']([^"\']*)["\']', call.group(2))
        controls.append({
            'function': call.group(1),
            'label': label,
            'title': html.unescape(title.group(2)) if title else '',
            'onclick': code,
            'quotedArgs': args,
            'exactControlPresent': CONTROL in args,
        })
    return controls


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
    out = []
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
                out.append({'kind': attr, 'raw': raw, 'url': url})
    return out


report: dict[str, object] = {
    'candidate': {
        'title': TITLE,
        'author': AUTHOR,
        'year': YEAR,
        'institution': '경기대학교 국제·문화대학원',
        'degree': '석사',
        'nanetControl': CONTROL,
        'extent': 'vi, 135 p.',
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlyPageAuthoredPublicRoutesInspected': True,
        'downloadLoginRequirementPreserved': True,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'accessControlBypass': False,
    },
    'hops': [],
    'fullLengthPdfAcquired': False,
    'semanticDisposition': 'PENDING_PUBLIC_VIEWER_RESPONSE',
}

landing = fetch(LANDING_URL, timeout=25, max_bytes=10_000_000, attempts=3)
landing_body = landing.pop('body')
landing_saved = save('nanet-detail', landing, landing_body)
landing_text = decode(landing_body, str(landing.get('contentType') or ''))
landing_visible = visibleish(landing_text)
assert TITLE in landing_visible and AUTHOR in landing_visible and str(YEAR) in landing_visible, 'exact NANET identity not observed'
controls = fulltext_controls(landing_text)
assert any(c['function'] == 'viewDoc' and c['exactControlPresent'] for c in controls), 'exact viewDoc control not observed'
assert any(c['function'] == 'downloadDoc' and c['exactControlPresent'] for c in controls), 'exact downloadDoc control not observed'
landing_final = str(landing.get('finalUrl') or LANDING_URL)
script_urls = []
for raw in re.findall(r'(?is)<script\b[^>]*\bsrc=["\']([^"\']+)["\']', landing_text):
    url = urllib.parse.urljoin(landing_final, html.unescape(raw.strip()))
    if urllib.parse.urlsplit(url).hostname == urllib.parse.urlsplit(landing_final).hostname:
        script_urls.append(url)
inner_urls = [url for url in script_urls if urllib.parse.urlsplit(url).path == '/script/search/inner.js']
assert len(inner_urls) == 1, f'exact page-authored inner.js not uniquely observed: {inner_urls}'
report['hops'].append({'name': 'nanetDetail', **landing, 'saved': landing_saved, 'fulltextControls': controls, 'pageAuthoredInnerScript': inner_urls[0]})

inner = fetch(inner_urls[0], referer=landing_final, timeout=20, max_bytes=5_000_000, attempts=3)
inner_body = inner.pop('body')
inner_saved = save('nanet-inner', inner, inner_body)
inner_text = decode(inner_body, str(inner.get('contentType') or ''))
functions = {name: extract_function(inner_text, name) for name in ('viewDoc', 'downloadDoc', 'viewDocBySingleCount', 'downloadBySingleCount')}
assert all(functions.values()), 'required page-authored fulltext function definition missing'
assert 'if(!isLogin)' in functions['downloadDoc'].replace(' ', ''), 'download login guard not preserved'
assert '/file/fileDownload.do' in functions['downloadBySingleCount'], 'download endpoint definition not preserved'
assert '/view/callViewer.do?controlNo=' in functions['viewDocBySingleCount'], 'viewer endpoint not authored by function'
assert '&orgId=dl&linkSysId=NADL' in functions['viewDocBySingleCount'], 'viewer constants not authored by function'
report['hops'].append({'name': 'nanetInnerScript', **inner, 'saved': inner_saved, 'functions': functions})

viewer_url = urllib.parse.urljoin(landing_final, '/view/callViewer.do') + '?' + urllib.parse.urlencode([
    ('controlNo', CONTROL),
    ('orgId', 'dl'),
    ('linkSysId', 'NADL'),
])
viewer = fetch(viewer_url, referer=landing_final, timeout=25, max_bytes=25_000_000, attempts=3)
viewer_body = viewer.pop('body')
viewer_saved = save('nanet-viewer', viewer, viewer_body)
viewer_is_pdf = viewer_body.startswith(b'%PDF-')
viewer_targets: list[dict[str, str]] = []
if viewer_is_pdf:
    (ROOT / 'candidate.pdf').write_bytes(viewer_body)
    report['fullLengthPdfAcquired'] = True
    report['pdfSha256'] = hashlib.sha256(viewer_body).hexdigest()
    report['pdfBytes'] = len(viewer_body)
    report['semanticDisposition'] = 'DIRECT_BODY_READY_FOR_RENDER_REVIEW'
else:
    viewer_text = decode(viewer_body, str(viewer.get('contentType') or ''))
    viewer_targets = authored_targets(viewer_text, str(viewer.get('finalUrl') or viewer_url))
    report['semanticDisposition'] = 'PUBLIC_VIEWER_RESPONSE_DISCOVERED_NO_BODY_LEVEL_DECISION'
report['hops'].append({'name': 'publicViewer', **viewer, 'requestedUrl': viewer_url, 'saved': viewer_saved, 'isPdf': viewer_is_pdf, 'authoredTargets': viewer_targets})
report['viewerContract'] = {
    'downloadLoginRequiredByPageAuthoredFunction': True,
    'downloadRouteExecuted': False,
    'publicViewerRouteDerivedOnlyFromPageAuthoredFunctionAndExactButtonControl': True,
    'requestedViewerUrl': viewer_url,
}

(ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
interesting = [target for target in viewer_targets if any(token in target['url'].lower() for token in ('pdf', 'viewer', 'file', 'stream', 'content', 'view'))]
print(json.dumps({
    'candidate': report['candidate'],
    'landingAttempt': landing.get('attempt'),
    'innerScript': inner_urls[0],
    'controls': controls,
    'downloadLoginGuard': True,
    'downloadRouteExecuted': False,
    'viewerUrl': viewer_url,
    'viewerStatus': viewer.get('status'),
    'viewerFinalUrl': viewer.get('finalUrl'),
    'viewerContentType': viewer.get('contentType'),
    'viewerBytes': viewer.get('bytes'),
    'viewerSha256': viewer.get('sha256'),
    'viewerIsPdf': viewer_is_pdf,
    'interestingAuthoredTargets': interesting[:100],
    'semanticDisposition': report['semanticDisposition'],
}, ensure_ascii=False, indent=2))
