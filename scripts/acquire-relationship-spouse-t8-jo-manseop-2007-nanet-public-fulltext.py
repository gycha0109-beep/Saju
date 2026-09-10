#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import http.cookiejar
import json
import re
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path('acquisition-jo-manseop-2007')
ROOT.mkdir(parents=True, exist_ok=True)
TITLE = '명리이론과 궁합의 상관관계 연구'
AUTHOR = '조만섭'
YEAR = 2007
NANET_CONTROL = 'KDMT1200725555'
NANET_URL = f'https://dl.nanet.go.kr/detail/{NANET_CONTROL}'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(JAR))
MAX_PAGE_AUTHORED_SCRIPTS = 40


def fetch(url: str, *, referer: str | None = None, timeout: int = 60, max_bytes: int = 10_000_000):
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    req = urllib.request.Request(url, headers=headers)
    try:
        with OPENER.open(req, timeout=timeout) as resp:
            body = resp.read(max_bytes + 1)
            if len(body) > max_bytes:
                raise RuntimeError('bounded response limit exceeded')
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
        body = exc.read(max_bytes + 1)
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
    match = re.search(r'charset=([\w.-]+)', content_type or '', re.I)
    encodings = ([match.group(1)] if match else []) + ['utf-8', 'euc-kr', 'cp949']
    for encoding in encodings:
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


def save(name: str, meta: dict, body: bytes) -> tuple[str, str]:
    content_type = str(meta.get('contentType') or '').lower()
    if body.startswith(b'%PDF-'):
        suffix = 'pdf'
    elif 'html' in content_type or b'<html' in body[:4096].lower() or b'<!doctype' in body[:4096].lower():
        suffix = 'html'
    elif 'javascript' in content_type or name.startswith('nanet-script-'):
        suffix = 'js'
    else:
        suffix = 'bin'
    path = ROOT / f'{name}.{suffix}'
    path.write_bytes(body)
    return str(path), suffix


def strip_tags(fragment: str) -> str:
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'(?s)<[^>]+>', ' ', fragment))).strip()


def normalize_js(code: str) -> str:
    return re.sub(r'\s+', ' ', html.unescape(code)).strip()


def page_fulltext_controls(text: str) -> list[dict[str, object]]:
    controls: list[dict[str, object]] = []
    for match in re.finditer(r'(?is)<(?:button|a|input)\b([^>]*)>(.*?)</(?:button|a)>|<input\b([^>]*)/?>', text):
        attrs = match.group(1) or match.group(3) or ''
        inner = match.group(2) or ''
        onclick = re.search(r'\bonclick\s*=\s*(["\'])(.*?)\1', attrs, re.I | re.S)
        if not onclick:
            continue
        code = normalize_js(onclick.group(2))
        function_match = re.match(r'^(viewDoc|downloadDoc)\s*\((.*)\)\s*;?$', code, re.I | re.S)
        if not function_match:
            continue
        title = re.search(r'\btitle\s*=\s*(["\'])(.*?)\1', attrs, re.I | re.S)
        value = re.search(r'\bvalue\s*=\s*(["\'])(.*?)\1', attrs, re.I | re.S)
        label = strip_tags(inner) or (html.unescape(value.group(2)) if value else '')
        args = [html.unescape(arg) for arg in re.findall(r'["\']([^"\']*)["\']', function_match.group(2))]
        controls.append({
            'function': function_match.group(1),
            'label': label,
            'title': html.unescape(title.group(2)) if title else '',
            'onclick': code,
            'quotedArgs': args,
            'exactControlPresent': NANET_CONTROL in args,
        })
    return controls


def script_sources(text: str, base: str) -> list[str]:
    urls: list[str] = []
    base_host = urllib.parse.urlsplit(base).hostname
    for raw in re.findall(r'(?is)<script\b[^>]*\bsrc=["\']([^"\']+)["\']', text):
        raw = html.unescape(raw.strip())
        if not raw or raw.lower().startswith(('javascript:', 'data:')):
            continue
        url = urllib.parse.urljoin(base, raw)
        if urllib.parse.urlsplit(url).hostname != base_host:
            continue
        if url not in urls:
            urls.append(url)
    return urls


def extract_named_function(source: str, name: str) -> str | None:
    match = re.search(rf'\bfunction\s+{re.escape(name)}\s*\([^)]*\)\s*\{{', source)
    if not match:
        return None
    start = match.start()
    brace_start = source.find('{', match.start())
    if brace_start < 0:
        return None
    depth = 0
    quote: str | None = None
    escape = False
    line_comment = False
    block_comment = False
    index = brace_start
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
        if quote is not None:
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


report: dict[str, object] = {
    'candidate': {
        'title': TITLE,
        'author': AUTHOR,
        'year': YEAR,
        'institution': '경기대학교 국제·문화대학원',
        'degree': '석사',
        'nanetControl': NANET_CONTROL,
        'extent': 'vi, 135 p.',
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlyPageAuthoredPublicRoutesInspected': True,
        'pageAuthoredDynamicControlArgumentsMayBePairedOnlyWithPageAuthoredFunctionDefinitions': True,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'accessControlBypass': False,
    },
    'hops': [],
    'fulltextControls': [],
    'functionDefinitions': [],
    'fullLengthPdfAcquired': False,
    'semanticDisposition': 'PAGE_AUTHORED_FULLTEXT_CONTROL_AND_FUNCTION_DISCOVERY_ONLY',
}

landing = fetch(NANET_URL, timeout=45, max_bytes=10_000_000)
landing_body = landing.pop('body')
landing_saved, landing_kind = save('nanet-detail', landing, landing_body)
landing_url = str(landing.get('finalUrl') or NANET_URL)
landing_text = decode(landing_body, str(landing.get('contentType') or ''))
visible = visibleish(landing_text)
identity_observed = TITLE in visible and AUTHOR in visible and str(YEAR) in visible
assert identity_observed, 'exact NANET title/author/year identity not observed on fetched landing page'

controls = page_fulltext_controls(landing_text)
view_controls = [control for control in controls if str(control['function']).lower() == 'viewdoc']
download_controls = [control for control in controls if str(control['function']).lower() == 'downloaddoc']
assert any(control['exactControlPresent'] for control in view_controls), 'exact page-authored viewDoc control not observed'
assert any(control['exactControlPresent'] for control in download_controls), 'exact page-authored downloadDoc control not observed'
report['fulltextControls'] = controls

scripts = script_sources(landing_text, landing_url)
assert 0 < len(scripts) <= MAX_PAGE_AUTHORED_SCRIPTS, f'unexpected page-authored script count: {len(scripts)}'
report['pageAuthoredScriptCount'] = len(scripts)
report['pageAuthoredScripts'] = scripts
report['hops'].append({
    'name': 'nanetDetail',
    **landing,
    'saved': landing_saved,
    'kind': landing_kind,
    'identityObserved': identity_observed,
    'pageAuthoredScriptCount': len(scripts),
    'fulltextControlCount': len(controls),
})

function_definitions: list[dict[str, object]] = []
for index, js_url in enumerate(scripts, start=1):
    js = fetch(js_url, referer=landing_url, timeout=30, max_bytes=5_000_000)
    js_body = js.pop('body')
    js_saved, js_kind = save(f'nanet-script-{index:02d}', js, js_body)
    js_text = decode(js_body, str(js.get('contentType') or ''))
    found_names: list[str] = []
    for function_name in ('viewDoc', 'downloadDoc'):
        function_source = extract_named_function(js_text, function_name)
        if function_source is None:
            continue
        found_names.append(function_name)
        function_definitions.append({
            'name': function_name,
            'scriptUrl': js_url,
            'scriptSha256': js.get('sha256'),
            'source': function_source,
        })
    report['hops'].append({
        'name': f'nanetScript{index}',
        **js,
        'saved': js_saved,
        'kind': js_kind,
        'url': js_url,
        'fulltextFunctionsFound': found_names,
    })

report['functionDefinitions'] = function_definitions
report['viewDocDefinitionCount'] = sum(1 for item in function_definitions if item['name'] == 'viewDoc')
report['downloadDocDefinitionCount'] = sum(1 for item in function_definitions if item['name'] == 'downloadDoc')
assert report['viewDocDefinitionCount'] >= 1, 'page-authored viewDoc definition not recovered'
assert report['downloadDocDefinitionCount'] >= 1, 'page-authored downloadDoc definition not recovered'

(ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({
    'candidate': report['candidate'],
    'pageAuthoredScriptCount': report['pageAuthoredScriptCount'],
    'fulltextControls': report['fulltextControls'],
    'viewDocDefinitionCount': report['viewDocDefinitionCount'],
    'downloadDocDefinitionCount': report['downloadDocDefinitionCount'],
    'functionDefinitions': function_definitions,
    'semanticDisposition': report['semanticDisposition'],
}, ensure_ascii=False, indent=2))
