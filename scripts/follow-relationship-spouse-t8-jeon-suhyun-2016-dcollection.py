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

ROOT = Path('acquisition-jeon-suhyun-2016')
SOURCE_REPORT = ROOT / 'follow-report.json'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()
JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(
    urllib.request.HTTPCookieProcessor(JAR),
    urllib.request.HTTPSHandler(context=CTX),
)


def fetch(url: str, referer: str | None = None, timeout: int = 60) -> dict[str, object]:
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
    except Exception as exc:  # noqa: BLE001
        return {
            'ok': False,
            'status': None,
            'finalUrl': url,
            'contentType': '',
            'contentDisposition': '',
            'bytes': 0,
            'sha256': None,
            'body': b'',
            'error': f'{type(exc).__name__}: {exc}',
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


def navigation_targets(html: str, base: str) -> list[dict[str, str]]:
    specs = [
        ('document.location.href', r'(?is)document\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('window.location.href', r'(?is)window\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('location.href', r'(?is)(?<!document\.)(?<!window\.)location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('window.open', r'(?is)window\.open\s*\(\s*["\']([^"\']+)["\']'),
        ('meta-refresh', r'(?is)<meta[^>]+http-equiv=["\']?refresh["\']?[^>]+content=["\'][^"\']*url=([^"\';>]+)'),
        ('iframe-src', r'(?is)<iframe[^>]+src=["\']([^"\']+)["\']'),
        ('frame-src', r'(?is)<frame[^>]+src=["\']([^"\']+)["\']'),
    ]
    out: list[dict[str, str]] = []
    seen: set[str] = set()
    for kind, pat in specs:
        for raw in re.findall(pat, html):
            raw = unescape(raw.strip())
            if not raw or raw.lower().startswith(('javascript:', '#')):
                continue
            absolute = urllib.parse.urljoin(base, raw)
            if absolute in seen:
                continue
            seen.add(absolute)
            out.append({'kind': kind, 'raw': raw, 'absoluteUrl': absolute})
    return out


def authored_links(html: str, base: str) -> list[dict[str, str]]:
    out: list[dict[str, str]] = []
    seen: set[str] = set()
    for attrs, inner in re.findall(r'(?is)<a\b([^>]*)>(.*?)</a>', html):
        href_m = re.search(r'(?is)\bhref\s*=\s*["\']([^"\']+)["\']', attrs)
        onclick_m = re.search(r'(?is)\bonclick\s*=\s*["\']([^"\']+)["\']', attrs)
        href = unescape(href_m.group(1)).strip() if href_m else ''
        onclick = unescape(onclick_m.group(1)).strip() if onclick_m else ''
        text = visibleish(inner)[:500]
        hay = f'{text} {href} {onclick}'.lower()
        if not any(k in hay for k in ('원문', 'pdf', 'download', '다운로드', 'viewer', 'view', 'file', 'thesis')):
            continue
        absolute = urllib.parse.urljoin(base, href) if href and not href.lower().startswith(('javascript:', '#', 'mailto:')) else ''
        key = f'{absolute}|{onclick}|{text}'
        if key in seen:
            continue
        seen.add(key)
        out.append({'text': text, 'href': href, 'absoluteUrl': absolute, 'onclick': onclick})
    return out[:200]


def forms(html: str, base: str) -> list[dict[str, object]]:
    out: list[dict[str, object]] = []
    for attrs, body in re.findall(r'(?is)<form\b([^>]*)>(.*?)</form>', html):
        action_m = re.search(r'(?is)\baction\s*=\s*["\']([^"\']*)["\']', attrs)
        method_m = re.search(r'(?is)\bmethod\s*=\s*["\']([^"\']*)["\']', attrs)
        action = unescape(action_m.group(1)).strip() if action_m else ''
        fields: dict[str, str] = {}
        for tag in re.findall(r'(?is)<input\b[^>]*>', body):
            nm = re.search(r'(?is)\bname\s*=\s*["\']([^"\']+)["\']', tag)
            if not nm:
                continue
            vm = re.search(r'(?is)\bvalue\s*=\s*["\']([^"\']*)["\']', tag)
            fields[unescape(nm.group(1))] = unescape(vm.group(1)) if vm else ''
        out.append({
            'action': action,
            'absoluteAction': urllib.parse.urljoin(base, action) if action else base,
            'method': (method_m.group(1).upper() if method_m else 'GET'),
            'fields': fields,
        })
    return out[:50]


previous = json.loads(SOURCE_REPORT.read_text(encoding='utf-8'))
downloading = next(h for h in previous['hops'] if h['name'] == 'downloading')
targets = downloading.get('navigationTargets') or []
assert targets, 'RISS Downloading hop did not provide a target'
target = targets[0]['absoluteUrl']
parsed = urllib.parse.urlparse(target)
assert parsed.hostname == 'dcollection.kyonggi.ac.kr', f'unexpected target host: {parsed.hostname}'
assert parsed.path.endswith('/jsp/common/DcLoOrgPer.jsp'), f'unexpected target path: {parsed.path}'
assert urllib.parse.parse_qs(parsed.query).get('sItemId') == ['000000043819'], 'unexpected server-authored item id'

result = fetch(target, referer=str(downloading.get('finalUrl') or ''), timeout=60)
body = result.pop('body')
is_pdf = body[:5] == b'%PDF-'
ctype = str(result.get('contentType') or '').lower()
if is_pdf:
    kind = 'pdf'
elif 'html' in ctype or b'<html' in body[:4096].lower() or b'<!doctype' in body[:4096].lower():
    kind = 'html'
else:
    kind = 'bin'
path = ROOT / f'dcollection-item-response.{kind}'
if body:
    path.write_bytes(body)

html = decode(body, str(result.get('contentType') or '')) if body and kind == 'html' else ''
base = str(result.get('finalUrl') or target)
report = {
    'sourceProvenance': {
        'fromRissDownloadingResponse': True,
        'target': target,
        'itemId': '000000043819',
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlyServerAuthoredTargetFollowed': True,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
    },
    'fetch': {**result, 'saved': str(path), 'kind': kind, 'isPdf': is_pdf},
    'navigationTargets': navigation_targets(html, base) if html else [],
    'authoredLinks': authored_links(html, base) if html else [],
    'forms': forms(html, base) if html else [],
    'accessMarkers': {
        'login': '로그인' in visibleish(html) if html else False,
        'download': '다운로드' in visibleish(html) if html else False,
        'originalView': '원문' in visibleish(html) if html else False,
        'copyright': '저작권' in visibleish(html) if html else False,
    },
    'boundedText': visibleish(html)[:20000] if html else '',
}
report['dcollectionHopFetched'] = bool(result.get('ok'))
report['publicPdfAcquired'] = is_pdf
report['disposition'] = 'PUBLIC_PDF_ACQUIRED' if is_pdf else 'DCOLLECTION_ITEM_REACHED_PENDING_VIEWER_CONTRACT_REVIEW'
out = ROOT / 'dcollection-report.json'
out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(out.read_text(encoding='utf-8'))
